import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function HistoryDataLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="DailyView"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="WeeklyView"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="MonthlyView"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="SelectDateView"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
