import "./../global.css";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Alert } from "react-native";

const Home = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    afacadFlux: require("@/assets/fonts/AfacadFlux-Regular.ttf"),
  });

  const handleButtonClick = () => {
    Alert.alert("Hello", "You clicked the button", [
      {
        text: "Ok",
        onPress: () => console.log("Hello, wa"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>

      <Text className="py-3 text-sky-500">Hello tailwindcss</Text>

      <TouchableOpacity
        className="py-3  bg-sky-500 w-10/12 rounded-md"
        activeOpacity={0.8}
        onPress={handleButtonClick}
      >
        <Text className="text-white text-center">Click me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "black",
    width: 200,
    padding: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontFamily: "afacadFlux",
  },
});
