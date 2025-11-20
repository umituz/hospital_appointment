# CLAUDE.md - App Factory Development Standards

## ⛔️ IMPORT PATHS - ABSOLUTE ONLY

**RULE:** Use config-defined aliases (@domains/*, @/*, @umituz/*), NEVER relative paths (../, ./)

**FORBIDDEN:**
- `../hooks/useHook`
- `../../components/Component`
- `./LocalComponent`

**REQUIRED:**
- `@umituz/react-native-design-system` for design system
- `@domains/*` for domain imports
- `@/*` for app imports

**WHY:** Refactoring safe, no manual path calculation, clean readable imports

---

## ⛔️ RESPONSIVE CALCULATIONS - CENTRALIZED ONLY

**RULE:** ALL responsive logic in `responsive.ts`, components ONLY consume via `useResponsive()` hook

**FORBIDDEN:**
- Device checks in component styles (`isTablet ? x : y`)
- Calculations in component logic
- `tokens.spacing.*` arithmetic in components

**REQUIRED:**
- Define calculation functions in `responsive.ts`
- Pre-calculate in `useResponsive()` hook
- Components consume pre-calculated values

**WHY:** DRY principle, one fix benefits 100+ apps, performance, testability

---

## ⛔️ DESIGN SYSTEM IMPORTS

**RULE:** Import from `@umituz/react-native-design-system` NPM package

**FORBIDDEN:**
- `@domains/design-system` (removed from factory)
- Deep imports to package internals

**REQUIRED:**
- Barrel imports from NPM package
- All components, hooks, tokens from single source

**WHY:** Clean dependency management, published package, version control

---

## ⛔️ NPM PACKAGE DOMAINS

**RULE:** The following domains are now NPM packages, NOT local domains

**NPM Packages (use `@umituz/react-native-*`):**
- `@umituz/react-native-design-system` (was `@domains/design-system`)
- `@umituz/react-native-design-system-theme` (was `@domains/theme`)
- `@umituz/react-native-localization` (was `@domains/localization`)
- `@umituz/react-native-toast` (was `@domains/toast`)
- `@umituz/react-native-loading` (was `@domains/loading`)
- `@umituz/react-native-alert` (was `@domains/alert`)
- `@umituz/react-native-storage` (was `@domains/storage`)
- `@umituz/react-native-exception` (was `@domains/exception`)
- `@umituz/react-native-cache` (was `@domains/cache`)
- `@umituz/react-native-timer` (was `@domains/timer`)
- `@umituz/react-native-animation` (was `@domains/animation`)
- `@umituz/react-native-timezone` (was `@domains/timezone`)
- `@umituz/react-native-onboarding` (was `@domains/onboarding`)

**Local Domains (use `@domains/*`):**
- And other app-specific domains

**NPM Packages (use `@umituz/react-native-*`):**
- `@umituz/react-native-about` (was `@domains/about`)
- `@umituz/react-native-admob` (was `@domains/admob`)
- `@umituz/react-native-audio` (was `@domains/audio`)
- `@umituz/react-native-camera` (was `@domains/camera`)
- `@umituz/react-native-code-editor` (was `@domains/code-editor`)
- `@umituz/react-native-donation` (was `@domains/donation`)
- `@umituz/react-native-image` (was `@domains/image`)
- `@umituz/react-native-legal` (was `@domains/legal`)
- `@umituz/react-native-settings` (was `@domains/settings`)
- `@umituz/react-native-avatar` (was `@domains/avatar`)
- `@umituz/react-native-gamification` (was `@domains/gamification`)
- `@umituz/react-native-rating` (was `@domains/rating`)
- `@umituz/react-native-media` (was `@domains/media`)
- `@umituz/react-native-contacts` (was `@domains/contacts`)
- `@umituz/react-native-filesystem` (was `@domains/filesystem`)
- `@umituz/react-native-navigation` (was `src/utils/navigation.ts` + `core/navigation/NavigationTheme.tsx`) - Navigation utilities and theme helpers
- `@umituz/react-native-tabs-bottom-navigator` - Tab and stack navigators (bottom tabs, stack navigation)
- `@umituz/react-native-offline` - Network connectivity state management

**WHY:** Centralized packages reduce code duplication, improve maintainability, and ensure consistency across all apps

---

## ⛔️ COMPONENT STANDARDS

**AtomicText:** Use `type` prop (NOT `variant`)
**Icon System:** Import from `@umituz/react-native-design-system` (Lucide icons, PascalCase names)
**Settings Screens:** Use `AtomicList` component
**Forms:** Wrap with `KeyboardAvoidingView` + `ScrollView`
**List Items:** Use `SwipeableItem` for delete/archive/edit actions
**Modals:** Use `BottomSheet` component (NOT React Native Modal)

---

## ⛔️ NAVIGATION

**RULE:** Use `AppNavigation` utility class, NEVER direct `navigation.navigate()`

**FORBIDDEN:**
- `navigation.navigate('Screen' as never)`
- `navigation.getParent()?.navigate()`
- Direct navigation prop usage

**REQUIRED:**
- `AppNavigation.navigate('Screen')`
- `AppNavigation.navigateToParent('Modal')`
- `AppNavigation.goToSettings()` (predefined routes)

**WHY:** Centralized, type-safe, semantic, maintainable

---

## ⛔️ LOGGING

**RULE:** ZERO logging in production code

**FORBIDDEN:**
- `console.log()`, `console.error()`, `console.warn()`
- Custom loggers (`AppLogger`, etc.)
- Conditional logging (`if (__DEV__)`)

**REQUIRED:**
- Silent try-catch blocks
- No error logging

**WHY:** Professional production code, no console spam, performance

---

## ⛔️ STYLING

**Colors:** Use `tokens.colors.backgroundPrimary` (NOT `.background`)
**Shadows:** FORBIDDEN (React Native Web incompatible)
**Conditional Styles:** Use ternary `condition ? style : undefined` (NOT `condition && style`)
**Type Safety:** Use `StyleProp<ViewStyle>` for all style props (NOT plain `ViewStyle`)

---

## ⛔️ PLATFORM CODE

**RULE:** Write universal code, NEVER platform-specific checks

**FORBIDDEN:**
- `Platform.OS === 'web'`
- `Platform.select()`
- `window.*` (use `DeviceEventEmitter`)
- `document.*`
- `localStorage` (use `AsyncStorage`)

**WHY:** One codebase, all platforms (iOS, Android, Web)

---

## ⛔️ REACT VERSION

**RULE:** React 18.3.1 (NOT React 19.x)

**WHY:** React Native Web compatibility, proven stability

---

## ⛔️ STATE MANAGEMENT

**FORBIDDEN:**
- Context API for state
- Custom Providers
- TanStack Query (offline apps don't need server state)

**REQUIRED:**
- Zustand for global state
- `@umituz/react-native-storage` for all storage operations
- useState for local state

---

## ⛔️ OFFLINE ARCHITECTURE

**RULE:** ALL apps are 100% offline-only

**REQUIRED:**
- Zustand for all state management
- `@umituz/react-native-storage` for all storage operations (AsyncStorage wrapper)
- `@umituz/react-native-offline` for network detection (UI only)
- NO backend, NO auth, NO remote syncing
- NO TanStack Query (offline apps don't need server state management)

---

## ⛔️ LOCALIZATION

**Device Locale:** Auto-detect via `expo-localization` (NO selection screen)
**File Naming:** Full locale format (`en-US.json`, NOT `en.json`)
**Default Values:** FORBIDDEN (`defaultValue` hides missing translations)
**Language:** English-only code, Turkish ONLY in `.json` files

---

## ⛔️ DOMAIN TEMPLATES

**RULE:** Domain screens are GLOBAL (settings, onboarding, theme, localization)

**FORBIDDEN:**
- App-specific versions of domain screens
- Domain templates in app directories

**REQUIRED:**
- Conditional rendering via Handlebars
- Separate `.offline.tsx.template` for offline mode

**WHY:** One template serves 100+ apps, consistency, DRY principle

---

## ⛔️ TEMPLATE-FIRST WORKFLOW

**RULE:** NEVER modify generated apps, ALWAYS fix templates and regenerate

**WORKFLOW:**
1. Find template source
2. Fix template
3. Delete generated app
4. Regenerate with fixed template
5. Verify fix worked

**FORBIDDEN:**
- Editing files in `/mobile/react-native/`
- Running automated fixes in generated apps
- Committing generated code to git

**WHY:** One fix benefits 100+ apps, factory-first philosophy

---

## ⛔️ ERROR RESOLUTION PRIORITY

**STRATEGY:** Fix SIMPLE errors first (highest ROI)

**SIMPLE (5-10 min):** Import paths, type annotations, StyleProp patterns
**MEDIUM (15-30 min):** Component interfaces, conditional rendering
**COMPLEX (30-60+ min):** Navigation typing, circular dependencies
**INTENTIONAL:** Document and accept

**WHY:** Maximize errors fixed per time unit

---

## ⛔️ CODE QUALITY

**File Sizes:** Screen <200 lines, Component <150 lines, Function <30 lines
**Extraction:** Extract when >30 lines, reused 2+ times, >5 state variables, >4 nesting levels
**SOLID Principles:** Single responsibility, open/closed, Liskov, interface segregation, dependency inversion
**Naming:** Descriptive names (NO "data", "temp", "handle" without context)

---

## ⛔️ MANUAL EDITING ONLY

**FORBIDDEN:**
- `sed`, `awk`, bulk find-replace tools
- `find -exec sed`, `grep | xargs sed`
- Automated text replacement scripts

**REQUIRED:**
- Manual file-by-file editing with Read/Edit tools
- One file at a time, verify each change

**WHY:** Bulk replacements cause catastrophic syntax errors (proven by production incidents)

---

## ⛔️ PULL TO REFRESH

**RULE:** ALL list/feed screens MUST support pull-to-refresh

**REQUIRED:**
- `RefreshControl` on FlatList/ScrollView
- `useState` for refreshing state
- `useCallback` for onRefresh handler
- Theme-aware colors (`tokens.colors.primary`)

---

## ⛔️ SECURITY

**NPM Packages:** Use Expo SDK-compatible versions (tilde ~ for Expo, caret ^ for utilities)
**Secrets:** NO `.env`, `credentials.json` in commits
**Dependencies:** Run `npm run security:scan` regularly

---

## ⛔️ METADATA

**Global Defaults:** All apps inherit from `apps/_global/defaults/app.default.yaml`
**Auto-Generated URLs:** Use `{{APP_ID}}` template (contact@{{APP_ID}}.app)

---

## ⛔️ SCREEN YAML

**REQUIRED:** Every screen YAML MUST have:
- `template.base` (custom, list_screen, grid_screen, detail_screen)
- `template.output_path`
- `template.source` (if base: custom)

**FORBIDDEN:** YAML for global domain screens (inherited automatically)

---

## ⛔️ PATH MANAGEMENT

**RULE:** ALWAYS use `PathResolver` utility (NEVER manual path calculations)

**FORBIDDEN:**
- `os.path.dirname(__file__)`
- `os.path.join()`
- `"../../apps"` patterns

**WHY:** DRY, single source of truth, eliminates `../` errors

---

## ⛔️ NEW DOMAIN REGISTRATION

**RULE:** New domain MUST be registered in `apps/_global/domains.yaml`

**STEPS:**
1. Create domain structure in `templates/domains/{name}/`
2. Add to `domains.yaml`: `{domain_name}: true`
3. Add alias to `babel.config.js.template`
4. Add path to `tsconfig.json.template`

**CONSEQUENCE:** Domain NOT in domains.yaml = Silent skip, bundling crashes

---

## ⛔️ FLOATING ACTION BUTTON (FAB)

**POSITION:** Fixed bottom-right, 90px from bottom, 56x56px (Material Design 3)
**FORBIDDEN:** Left position, not fixed, below 70px, not 56x56px, top-right

---

## ⛔️ MOBILE DIRECTORY STRUCTURE

**SACRED PATH:**
```
/Users/umituz/Desktop/Github/umituz/
├── mobile/                    # ✅ MOBILE APPS HERE
└── app_factory/              # ✅ FACTORY INFRASTRUCTURE
```

**NEVER:** `/app_factory/mobile/` (WRONG!)

---

## ⛔️ HOOK COMPOSITION

**RULE:** ALWAYS verify function signatures when composing hooks

**REQUIRED:**
- Find hook definition
- Read function signature
- Count parameters
- Pass EXACTLY matching arguments

**WHY:** Prevents "Expected X arguments but got Y" errors

---

## ⛔️ PACKAGE VERSIONS

**STRATEGY:**
- **Design System:** `latest` (always latest published version)
- **Expo packages:** Tilde `~54.0.0` (SDK compatibility)
- **RN Community:** Exact or tilde `9.0.0`
- **React Navigation:** Caret `^6.1.18`
- **Utilities:** Caret `^5.0.2`
- **Backend SDKs:** Latest (no native dependencies)

**FORBIDDEN:** `latest` for Expo-managed packages
**EXCEPTION:** `@umituz/react-native-design-system` MUST be `latest`

---

## ⛔️ NAVIGATION TYPING

**PATTERN:**
- Same navigator, no params: `navigation.navigate('Screen' as never)`
- Same navigator, with params: `navigation.navigate('Screen', { id })`
- Parent navigator, no params: `navigation.getParent()?.navigate('Screen' as never)`
- Parent navigator, with params: `(navigation.getParent() as any)?.navigate('Screen', { id })`

---

## ⛔️ FILE NAMING

**FORBIDDEN:** Advanced, Enhanced, Improved, Dashboard, Super, Ultimate, Master, Pro, Main

**REQUIRED:** Descriptive names (SettingsScreen, ProfileScreen, HomeScreen)

---

## ⛔️ TRANSLATION FILES

**FORBIDDEN:**
- URLs/links in `.json` files
- Emojis in `.json` files
- HTML tags or Markdown

**REQUIRED:**
- URLs in `src/constants/urls.ts`
- Emojis directly in JSX
- Plain translatable text only

---

## ⛔️ CATEGORY-BASED iPAD SUPPORT

**STRATEGY:** iPad support determined by app category via `tablet_support.yaml`

**HIGH (Enabled):** creative_design, education, AI, development, finance
**LOW (Disabled):** health_fitness, mindset_psychology, communication

---

## ⛔️ OFFLINE-COMPATIBLE UTILITIES

**RULE:** Utility files MUST work for both online and offline apps

**FORBIDDEN:**
- Backend imports in generic utilities
- Backend-specific types in generic utilities

**REQUIRED:**
- Local type definitions
- Backend-agnostic implementations
- Conditional generation for backend-specific utilities

---

## 📚 COMPREHENSIVE GUIDES

**Generator System:** `docs/generator/GENERATOR_COMPLETE_GUIDE.md`
**Design Tokens:** `docs/design/DESIGN_SYSTEM_COMPLETE_GUIDE.md`
**React Native Platform:** `docs/platform/REACT_NATIVE_COMPLETE_GUIDE.md`
**iOS Publishing:** `docs/platform/IOS_PUBLISHING_COMPLETE_GUIDE.md`
**Apple Store Guidelines:** `docs/publishing/APPLE_STORE_COMPLETE_GUIDE.md`
**Lessons Learned:** `docs/development/LESSONS_LEARNED.md`
**Quality Assurance:** `docs/development/QUALITY_ASSURANCE.md`
**Testing Infrastructure:** `docs/development/TESTING_INFRASTRUCTURE.md`

---

**PRINCIPLE:** Factory-First - One template fix benefits 100+ apps. Never modify generated apps, always improve templates.
