// Polyfill for crypto.getRandomValues() (required for uuid)
import "react-native-get-random-values";

import React, { useRef, useMemo } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import { AppProviders } from "./src/core/providers/AppProviders";
import { AppNavigator } from "./src/core/navigation/AppNavigator";
import {
  AppNavigation,
  createNavigationTheme,
} from "@umituz/react-native-navigation";
import { AppStatusBar } from "./src/core/components/AppStatusBar";
import { SplashScreen } from "@umituz/react-native-splash";
import {
  useTheme,
  useAppDesignTokens,
} from "@umituz/react-native-design-system-theme";
import { useAppInitialization } from "./src/core/hooks/useAppInitialization";
import { useLocalization } from "@umituz/react-native-localization";

// Ignore i18n missing translation warnings in development
// Ignore synthetic event pooling warnings (React Native internal issue)
LogBox.ignoreLogs([
  "Missing translation",
  "[i18n]",
  "This synthetic event is reused for performance reasons",
]);

const ThemedApp: React.FC<{
  isReady: boolean;
  navigationRef: React.MutableRefObject<any>;
}> = ({ isReady, navigationRef }) => {
  const { themeMode } = useTheme();
  const tokens = useAppDesignTokens(); // Get design tokens from design system
  const { t } = useLocalization();
  const navigationTheme = createNavigationTheme(tokens.colors, themeMode);

  // Create React Native Paper theme with our custom colors
  const paperTheme = useMemo(() => {
    const baseTheme = themeMode === "dark" ? MD3DarkTheme : MD3LightTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: tokens.colors.primary,
        secondary: tokens.colors.secondary,
        surface: tokens.colors.surface,
        surfaceVariant: tokens.colors.surfaceSecondary,
        background: tokens.colors.backgroundPrimary,
        error: tokens.colors.error,
        onSurface: tokens.colors.textPrimary,
        onSurfaceVariant: tokens.colors.textSecondary,
      },
    };
  }, [themeMode, tokens.colors]);

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        onReady={() => AppNavigation.setNavigationRef(navigationRef.current)}
      >
        <AppStatusBar />
        {isReady && <AppNavigator />}
        {!isReady && (
          <SplashScreen
            appName={t("branding.appName")}
            tagline={t("branding.tagline")}
            logo="Calendar"
            backgroundColor={tokens.colors.primary}
            visible={!isReady}
            showLoading={true}
          />
        )}
        <Toast />
      </NavigationContainer>
    </PaperProvider>
  );
};

const App: React.FC = () => {
  const navigationRef = useRef(null);
  const { isReady } = useAppInitialization();

  return (
    <AppProviders>
      <ThemedApp isReady={isReady} navigationRef={navigationRef} />
    </AppProviders>
  );
};

export default App;
