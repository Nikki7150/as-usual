import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import AppTabs from "@/components/app-tabs";
import { useAuthStore } from "@/store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from '../../firebaseConfig';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      useAuthStore.getState().setAuth(firebaseUser, false);
    });
    return unsubscribe;
  }, []);
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppTabs />
    </ThemeProvider>
  );
}
