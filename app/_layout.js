import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="ExercicesModal"
        options={{ presentation: "modal", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="HistoryData"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
