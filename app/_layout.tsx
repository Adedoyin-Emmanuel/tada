import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
        }}
      />
      <Stack.Screen name="add" options={{ headerTitle: "Add New Todo" }} />

      <Stack.Screen name="details" options={{ headerTitle: "Details" }} />
    </Stack>
  );
}
