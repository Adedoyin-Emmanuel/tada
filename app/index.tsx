import "./../global.css";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    afacadFlux: require("@/assets/fonts/AfacadFlux-Regular.ttf"),
  });

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
