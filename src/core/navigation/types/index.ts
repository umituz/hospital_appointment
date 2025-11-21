export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
  Legal: undefined;
  About: undefined;
  AppointmentDetail: undefined;
  CreateDoctor: undefined;
  EditDoctor: { doctorId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Appointments: undefined;
  Hospitals: undefined;
  Doctors: undefined;
  SettingsStack: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
  Appearance: undefined;
  LanguageSelection: undefined;
  About: undefined;
  Legal: undefined;
};
