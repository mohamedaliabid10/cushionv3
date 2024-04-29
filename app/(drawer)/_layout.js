import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="home/index"
          options={{
            headerTintColor: "black",
            headerTransparent: true,
            headerTitle: "",
            drawerLabel: "Home",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="EnvData/index"
          options={{
            headerTintColor: "black",
            headerTransparent: true,
            headerTitle: "",
            drawerLabel: "Env",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="forest" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
