import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./../global.css";

SplashScreen.preventAutoHideAsync();

const Home = () => {
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
    <SafeAreaView className="bg-sky-500 h-full">
      <ScrollView>
        <View className="w-full">
          <Text>
            Today <Text>26 Dec</Text>
          </Text>
        </View>
      </ScrollView>

      <StatusBar />
    </SafeAreaView>
  );
};

export default Home;
