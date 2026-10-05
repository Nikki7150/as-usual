import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { useAuthStore } from "@/store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from '../../firebaseConfig';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const {user, isLoading} = useAuthStore();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      useAuthStore.getState().setAuth(firebaseUser, false);
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    if (!isLoading) SplashScreen.hideAsync();
  }, [isLoading]);
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {user ? (
          <Stack.Screen name="(app)" />
        ) : (
          <Stack.Screen name='(auth)' />
        )}
      </Stack>
    </ThemeProvider>
  );
}
