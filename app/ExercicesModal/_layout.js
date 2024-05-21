import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function ExerciceModalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="ExerModal"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
