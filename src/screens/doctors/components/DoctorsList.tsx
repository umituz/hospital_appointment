import React from "react";
import { RefreshControl } from "react-native";
import { InfiniteScrollList } from "@umituz/react-native-infinite-scroll";
import {
  getDoctorsPage,
  hasMoreDoctors,
} from "@/domains/doctors/utils/pagination";
import { DoctorCard } from "@/domains/doctors/presentation/components";
import { EmptyState } from "@/components/common/EmptyState";
import type { Doctor } from "@/domains/doctors/types";

interface DoctorsListProps {
  doctors: Doctor[];
  isLoading: boolean;
  refetch: () => void;
  onEditProfile: (id: string) => void;
  onShowDetails: (id: string) => void;
  onDelete: (id: string) => void;
}

export const DoctorsList: React.FC<DoctorsListProps> = ({
  doctors,
  isLoading,
  refetch,
  onEditProfile,
  onShowDetails,
  onDelete,
}) => {
  const fetchDoctorsPage = async (
    page: number,
    pageSize: number,
  ): Promise<Doctor[]> => {
    if (!doctors.length && isLoading) {
      await refetch();
    }
    return getDoctorsPage(doctors, page, pageSize);
  };

  const renderItem = (doctor: Doctor) => (
    <DoctorCard
      doctor={doctor}
      onEditProfile={() => onEditProfile(doctor.id)}
      onShowDetails={() => onShowDetails(doctor.id)}
      onDelete={() => onDelete(doctor.id)}
    />
  );

  return (
    <InfiniteScrollList
      config={{
        pageSize: 20,
        threshold: 5,
        fetchData: fetchDoctorsPage,
        getItemKey: (doctor) => doctor.id,
        hasMore: (lastPage: Doctor[], allPages: Doctor[][]) => {
          const loadedDoctors = allPages.flat();
          return hasMoreDoctors(doctors, loadedDoctors);
        },
      }}
      renderItem={renderItem}
      emptyComponent={
        <EmptyState
          icon="User"
          title="doctors.empty.title"
          description="doctors.empty.description"
        />
      }
      flatListProps={{
        showsVerticalScrollIndicator: false,
        refreshControl: (
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        ),
      }}
    />
  );
};
