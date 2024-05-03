import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { hp, wp } from "../../helpers/common";
import { Drawer } from "expo-router/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import CustomDrawerContent from "../../components/CustomDrawerContent";
const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerHideStatusBarOnOpen: true,
          drawerActiveBackgroundColor: "#e5e5e5",
          drawerActiveTintColor: "#0e1111",
          drawerLabelStyle: { marginLeft: -20 },
        }}
      >
        <Drawer.Screen
          name="home/index"
          options={{
            headerTintColor: "black",
            headerTransparent: true,
            headerTitleStyle: { display: "none" },
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
            headerTitleStyle: { display: "none" },
            drawerLabel: "Env Data",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="forest" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="PostureHistory/index"
          options={{
            headerTintColor: "black",
            headerTransparent: true,
            headerTitleStyle: { display: "none" },
            drawerLabel: "Posture History",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="history" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Exercices/index"
          options={{
            headerTintColor: "black",
            headerTransparent: true,
            headerTitleStyle: { display: "none" },
            drawerLabel: "Stretching Exercices",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons
                name="sports-gymnastics"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
