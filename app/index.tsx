import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  const handleAddButtonClick = () => {
    router.push("/add");
  };

  const handleDetailsButtonClick = () => {
    router.push("/details");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index..</Text>

      <Button title="Go to add " onPress={handleAddButtonClick} />
      <Button title="Go to details" onPress={handleDetailsButtonClick} />
    </View>
  );
};

export default Home;
