export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
  Legal: undefined;
  About: undefined;
  AppointmentDetail: undefined;
  CreateDoctor: undefined;
  EditDoctor: { doctorId: string };
  DoctorDetail: { doctorId: string };
  CreateHospital: undefined;
  EditHospital: { hospitalId: string };
  HospitalDetail: { hospitalId: string };
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
