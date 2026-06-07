import { create } from "zustand";

interface SettingState {
  isDarkMode: boolean;
  isActiveNotification: boolean;
  setDarkMode: (darkMode: boolean) => void;
  setActiveNotification: (activeNotification: boolean) => void;
}

export const useSettingsStore = create<SettingState>()((set) => ({
  isDarkMode: true,
  isActiveNotification: true,
  setDarkMode: (darkMode) => set(() => ({ isDarkMode: darkMode })),
  setActiveNotification: (activeNotification) =>
    set(() => ({ isActiveNotification: activeNotification })),
}));
