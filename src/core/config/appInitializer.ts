import { useLocalizationStore } from '@umituz/react-native-localization';
import { useTheme } from '@umituz/react-native-design-system-theme';
import { useOnboardingStore } from '@umituz/react-native-onboarding';

/**
 * App Initialization (Offline Mode)
 *
 * CRITICAL: This function MUST initialize ALL persistence layers
 * to ensure data survives app restarts in offline mode.
 *
 * Initialization strategy:
 * Parallel store initialization (Theme, Localization, Onboarding)
 *
 * Performance: Stores initialize in parallel for 3x faster startup
 *
 * NOTE: 
 * - @umituz/react-native-timezone is available via timezoneService
 *   but doesn't require explicit initialization - it auto-detects device timezone
 * - @umituz/react-native-design-system-theme and @umituz/react-native-localization
 *   provide initialize() methods for store initialization
 * - @umituz/react-native-storage handles all AsyncStorage operations
 */
export const initializeApp = async () => {
  // ✅ PARALLEL INITIALIZATION: Independent stores load simultaneously
  await Promise.all([
    useTheme.getState().initialize(),
    useLocalizationStore.getState().initialize(),
    useOnboardingStore.getState().initialize(),
  ]);

  return { success: true };
};
