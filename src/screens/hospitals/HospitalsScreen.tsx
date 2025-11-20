import React from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { ScreenLayout, AtomicText, AtomicIcon, useAppDesignTokens } from '@umituz/react-native-design-system';
import { useLocalization } from '@umituz/react-native-localization';
import { useHospitals } from '@/domains/hospitals';

export const HospitalsScreen: React.FC = () => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { hospitals, isLoading, refetch } = useHospitals();

  const handleRefresh = async () => {
    await refetch();
  };

  const renderItem = ({ item }: { item: typeof hospitals[0] }) => (
    <View style={[styles.card, { backgroundColor: tokens.colors.surface }]}>
      <AtomicText type="headlineSmall" style={{ color: tokens.colors.textPrimary }}>
        {item.name}
      </AtomicText>
      {item.address && (
        <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
          {item.address}
        </AtomicText>
      )}
      {item.phone && (
        <AtomicText type="bodySmall" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
          {item.phone}
        </AtomicText>
      )}
    </View>
  );

  if (isLoading && hospitals.length === 0) {
    return (
      <ScreenLayout>
        <View style={styles.container}>
          <View style={styles.emptyState}>
            <AtomicIcon name="Building2" size="xxl" color="secondary" />
            <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 16 }}>
              {t('general.loading')}
            </AtomicText>
          </View>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <View style={styles.container}>
        {hospitals.length === 0 ? (
          <View style={styles.emptyState}>
            <AtomicIcon name="Building2" size="xxl" color="secondary" />
            <AtomicText type="headlineSmall" style={{ color: tokens.colors.textSecondary, marginTop: 16 }}>
              {t('hospitals.empty.title')}
            </AtomicText>
            <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 8 }}>
              {t('hospitals.empty.description')}
            </AtomicText>
          </View>
        ) : (
          <FlatList
            data={hospitals}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
            }
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
});

export default HospitalsScreen;

