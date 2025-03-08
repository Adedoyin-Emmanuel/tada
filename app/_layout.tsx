import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "My Todos" }} />
      <Stack.Screen name="add" options={{ title: "Add New Todo" }} />
    </Stack>
  );
}
