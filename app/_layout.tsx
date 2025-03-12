import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";

import "./../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Inter-Light": require("@/assets/fonts/InterLight.ttf"),
    "Inter-Regular": require("@/assets/fonts/InterRegular.ttf"),
    "Inter-Medium": require("@/assets/fonts/InterMedium.ttf"),
    "Inter-SemiBold": require("@/assets/fonts/InterSemiBold.ttf"),
    "Inter-Bold": require("@/assets/fonts/InterBold.ttf"),
    "Inter-ExtraBold": require("@/assets/fonts/InterExtraBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen name="add" options={{ headerTitle: "Add New Todo" }} />

      <Stack.Screen name="details" options={{ headerTitle: "Details" }} />
    </Stack>
  );
}
