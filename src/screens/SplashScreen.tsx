/**
 * Splash Screen - hospital_appointment
 *
 * App-specific wrapper around generic @umituz/react-native-splash
 */

import React from "react";
import { SplashScreen as GenericSplashScreen } from "@umituz/react-native-splash";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { AtomicText } from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";
import { DeviceEventEmitter } from "react-native";

/**
 * Splash Screen Component
 */
export const SplashScreen: React.FC = () => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  const handleReady = () => {
    // Emit event to notify AppNavigator that splash is ready
    DeviceEventEmitter.emit("splash-ready");
  };

  return (
    <GenericSplashScreen
      appName={t("branding.appName", "Hospitalointment")}
      tagline={t("branding.tagline", "Manage hospital appointments, track doctors, and organize medical visits")}
      logo="Calendar"
      backgroundColor={tokens.colors.primary}
      loadingText={t("general.loading", "Loading...")}
      showLoading={true}
      minimumDisplayTime={1500}
      onReady={handleReady}
      renderFooter={() => (
        <AtomicText type="bodySmall" style={{ color: tokens.colors.textSecondary, textAlign: 'center', marginTop: 16 }}>
          {t("branding.poweredBy", "Powered by UmitUZ App Factory")}
        </AtomicText>
      )}
    />
  );
};

export default SplashScreen;

