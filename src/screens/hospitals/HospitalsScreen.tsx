import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout } from "@umituz/react-native-design-system";
import { AtomicFab } from "@umituz/react-native-design-system-atoms";
import { SearchBar } from "@umituz/react-native-search";
import { FilterSheet } from "@umituz/react-native-filter";
import { InfiniteScrollList } from "@umituz/react-native-infinite-scroll";
import { useLocalization } from "@umituz/react-native-localization";
import {
  useHospitalsList,
  useHospitalNavigation,
  useDeleteHospital,
} from "@/domains/hospitals";
import {
  getHospitalsPage,
  hasMoreHospitals,
} from "@/domains/hospitals/utils/pagination";
import {
  HospitalCard,
  HospitalsListHeader,
} from "@/domains/hospitals/presentation/components";
import { FilterIndicator } from "@/domains/doctors/presentation/components";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import type { Hospital } from "@/domains/hospitals/types";

export const HospitalsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const { navigateToCreate, navigateToEdit, navigateToDetail } =
    useHospitalNavigation();
  const { deleteHospital } = useDeleteHospital();

  const {
    hospitals,
    isLoading,
    refetch,
    query,
    setQuery,
    selectedCity,
    cityFilterVisible,
    cityOptions,
    filterLabels,
    hasActiveFilter,
    openCityFilter,
    closeCityFilter,
    handleCitySelect,
    handleClearCity,
    handleClearAllFilters,
  } = useHospitalsList();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HospitalsListHeader
          hasActiveFilter={hasActiveFilter}
          onCityPress={openCityFilter}
          onFilterPress={() => {
            if (cityOptions.length > 0) {
              openCityFilter();
            }
          }}
        />
      ),
    });
  }, [navigation, hasActiveFilter, cityOptions.length, openCityFilter]);

  const handleDelete = async (hospitalId: string) => {
    Alert.alert(
      t("general.confirm") || "Confirm",
      t("hospitals.messages.deleteConfirm") ||
        "Are you sure you want to delete this hospital?",
      [
        {
          text: t("general.cancel") || "Cancel",
          style: "cancel",
        },
        {
          text: t("general.delete") || "Delete",
          style: "destructive",
          onPress: async () => {
            const success = await deleteHospital(hospitalId);
            if (success) {
              await refetch();
            }
          },
        },
      ],
    );
  };

  const fetchHospitalsPage = async (
    page: number,
    pageSize: number,
  ): Promise<Hospital[]> => {
    if (!hospitals.length && isLoading) {
      await refetch();
    }
    return getHospitalsPage(hospitals, page, pageSize);
  };

  const renderItem = (hospital: Hospital) => (
    <HospitalCard
      hospital={hospital}
      onEditProfile={() => navigateToEdit(hospital.id)}
      onShowDetails={() => navigateToDetail(hospital.id)}
      onDelete={() => handleDelete(hospital.id)}
    />
  );

  if (isLoading && hospitals.length === 0) {
    return (
      <ScreenLayout scrollable={false}>
        <View style={styles.container}>
          <LoadingState icon="Building2" />
        </View>
      </ScreenLayout>
    );
  }

  const listHeader = (
    <View style={styles.headerContainer}>
      <View style={styles.searchWrapper}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={
            t("hospitals.search.placeholder") ||
            "Search by name, address, phone..."
          }
          style={styles.searchBar}
        />
      </View>

      {hasActiveFilter && (
        <FilterIndicator
          filterLabels={filterLabels}
          onClear={handleClearAllFilters}
        />
      )}
    </View>
  );

  return (
    <ScreenLayout scrollable={false}>
      <View style={styles.container}>
        <InfiniteScrollList
          key={`${selectedCity}-${query}`}
          config={{
            pageSize: 20,
            threshold: 5,
            fetchData: fetchHospitalsPage,
            getItemKey: (hospital) => hospital.id,
            hasMore: (lastPage: Hospital[], allPages: Hospital[][]) => {
              const loadedHospitals = allPages.flat();
              return hasMoreHospitals(hospitals, loadedHospitals);
            },
          }}
          renderItem={renderItem}
          emptyComponent={
            <EmptyState
              icon="Search"
              title="hospitals.search.noResults"
              description="hospitals.search.noResultsDescription"
            />
          }
          ListHeaderComponent={listHeader}
          flatListProps={{
            contentContainerStyle: styles.list,
            showsVerticalScrollIndicator: false,
          }}
        />

        <AtomicFab
          icon="Plus"
          onPress={navigateToCreate}
          variant="primary"
          size="md"
          testID="create-hospital-fab"
        />

        <FilterSheet
          visible={cityFilterVisible}
          options={cityOptions}
          selectedIds={selectedCity ? [selectedCity] : []}
          onFilterPress={handleCitySelect}
          onClearFilters={handleClearCity}
          onClose={closeCityFilter}
          title={t("hospitals.filters.city") || "City"}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchBar: {
    borderRadius: 16,
    elevation: 0,
    shadowOpacity: 0,
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
});

export default HospitalsScreen;
