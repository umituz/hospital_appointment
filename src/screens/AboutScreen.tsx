import React from "react";
import { ScrollView, Linking, StyleSheet } from "react-native";
import {
  ScreenLayout,
  AtomicText,
  AtomicButton,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { useNavigation } from "@react-navigation/native";

export const AboutScreen: React.FC = () => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const navigation = useNavigation();

  const handlePrivacyPolicy = () => {
    Linking.openURL(
      "https://umituz.com/projects/health-wellness/hospital-appointment/privacy",
    );
  };

  const handleTermsOfUse = () => {
    Linking.openURL(
      "https://umituz.com/projects/health-wellness/hospital-appointment/terms",
    );
  };

  return (
    <ScreenLayout scrollable={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AtomicText
          type="headlineLarge"
          color="textPrimary"
          style={styles.title}
        >
          {t("settings.about.appInfo")}
        </AtomicText>

        <AtomicText
          type="bodyLarge"
          color="textSecondary"
          style={styles.description}
        >
          {t("settings.about.description")}
        </AtomicText>

        <AtomicText
          type="headlineSmall"
          color="textPrimary"
          style={styles.sectionTitle}
        >
          {t("settings.about.appVersion")}
        </AtomicText>

        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.version}
        >
          {t("settings.about.versionNumber")}
        </AtomicText>

        <AtomicText
          type="headlineSmall"
          color="textPrimary"
          style={styles.sectionTitle}
        >
          {t("settings.about.contact")}
        </AtomicText>

        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.contact}
        >
          For questions or support, please visit our website or contact us at
          privacy@umituz.com
        </AtomicText>

        <AtomicButton
          variant="outline"
          onPress={handlePrivacyPolicy}
          style={styles.button}
        >
          Privacy Policy
        </AtomicButton>

        <AtomicButton
          variant="outline"
          onPress={handleTermsOfUse}
          style={styles.button}
        >
          Terms of Use
        </AtomicButton>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    marginTop: 24,
  },
  version: {
    marginBottom: 16,
  },
  contact: {
    marginBottom: 32,
    lineHeight: 20,
  },
  button: {
    marginBottom: 12,
  },
});

export default AboutScreen;
