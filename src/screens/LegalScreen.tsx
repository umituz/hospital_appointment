import React from "react";
import { ScrollView, Linking, StyleSheet } from "react-native";
import {
  ScreenLayout,
  AtomicText,
  AtomicButton,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

export const LegalScreen: React.FC = () => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

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
          {t("settings.legal.title")}
        </AtomicText>

        <AtomicText
          type="bodyLarge"
          color="textSecondary"
          style={styles.description}
        >
          {t("settings.legal.description")}
        </AtomicText>

        <AtomicText
          type="headlineSmall"
          color="textPrimary"
          style={styles.sectionTitle}
        >
          Privacy Policy
        </AtomicText>

        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.policyText}
        >
          Hospital Appointment is designed as a completely offline application.
          We do not collect, transmit, store, or process any of your personal
          data on external servers. All your healthcare information remains
          exclusively on your device. Read our complete Privacy Policy for
          detailed information about how we protect your data.
        </AtomicText>

        <AtomicButton
          variant="outline"
          onPress={handlePrivacyPolicy}
          style={styles.button}
        >
          Read Privacy Policy
        </AtomicButton>

        <AtomicText
          type="headlineSmall"
          color="textPrimary"
          style={styles.sectionTitle}
        >
          Terms of Use
        </AtomicText>

        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.policyText}
        >
          These terms and conditions outline the rules and regulations for the
          use of Hospital Appointment mobile application. By using this app, you
          agree to be bound by these terms. Read our complete Terms of Use for
          detailed information about app usage and limitations.
        </AtomicText>

        <AtomicButton
          variant="outline"
          onPress={handleTermsOfUse}
          style={styles.button}
        >
          Read Terms of Use
        </AtomicButton>

        <AtomicText
          type="headlineSmall"
          color="textPrimary"
          style={styles.sectionTitle}
        >
          Medical Disclaimer
        </AtomicText>

        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.disclaimer}
        >
          {t("settings.disclaimer.shortMessage")}

          {t("settings.disclaimer.message")}
        </AtomicText>
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
    marginBottom: 12,
    marginTop: 24,
  },
  policyText: {
    marginBottom: 16,
    lineHeight: 20,
  },
  disclaimer: {
    marginBottom: 16,
    lineHeight: 20,
    fontStyle: "italic",
  },
  button: {
    marginBottom: 12,
  },
});

export default LegalScreen;
