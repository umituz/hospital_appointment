import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SettingsScreen as PackageSettingsScreen } from "@umituz/react-native-settings";
import type { CustomSettingsSection } from "@umituz/react-native-settings";
import { SettingItem, DisclaimerSetting } from "@umituz/react-native-settings";
import { Palette } from "lucide-react-native";
import { useLocalization } from "@umituz/react-native-localization";

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useLocalization();

  const customSections: CustomSettingsSection[] = [
    {
      title: t("settings.sections.app.title"),
      order: 1,
      content: (
        <>
          <DisclaimerSetting />
          <SettingItem
            icon={Palette}
            title={t("settings.appearance.title")}
            value={t("settings.appearance.description")}
            onPress={() => navigation.navigate("Appearance" as never)}
          />
          <SettingItem
            icon={Palette}
            title={t("settings.appearance.title")}
            value={t("settings.appearance.description")}
            onPress={() => navigation.navigate("Appearance" as never)}
            isLast={true}
          />
        </>
      ),
    },
  ];

  return (
    <PackageSettingsScreen
      showUserProfile={false}
      customSections={customSections}
      config={{
        appearance: false,
      }}
      showCloseButton={false}
    />
  );
};
