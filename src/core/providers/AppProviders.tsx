import React, { ReactNode } from 'react';
import { ErrorBoundary } from '@umituz/react-native-exception';

/**
 * App Providers
 *
 * ARCHITECTURE: Zustand for all state management (NO Context Providers for state)
 *
 * ✅ ErrorBoundary - Global error boundary from @umituz/react-native-exception
 * ✅ PaperProvider - In App.tsx with dynamic theme injection (MD3DarkTheme/MD3LightTheme)
 * ❌ NO QueryClientProvider - Offline apps use Zustand + @umituz/react-native-storage
 * ❌ NO LanguageProvider - Localization uses Zustand (global state)
 * ❌ NO ThemeProvider - Theme uses Zustand (global state)
 * ❌ NO OfflineProvider - Offline detection uses Zustand (global state)
 *
 * All state management uses Zustand stores initialized in appInitializer.ts
 * All storage operations use @umituz/react-native-storage
 *
 * CRITICAL: PaperProvider is in App.tsx (not here) to access theme hook and
 * inject dynamic theme based on themeMode (dark/light).
 *
 * @see CLAUDE.md - CONTEXT API FORBIDDEN FOR STATE
 */

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
};
