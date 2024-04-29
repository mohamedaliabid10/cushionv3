import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { hp, wp } from "../../../helpers/common";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "../../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const HomeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="light"></StatusBar>
      <Image
        source={require("../../../assets/images/v915-wit-010-d.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Animated.View>
            <Pressable
              onPress={() => router.push("EnvData")}
              style={styles.EnvButton}
            >
              <Text style={styles.EnvText}>Environmental Data</Text>
            </Pressable>
          </Animated.View>
        </View>
        <Animated.Image
          source={require("../../../assets/images/posture.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <View style={styles.TempButton}>
            <Text style={styles.TempText}>27 </Text>
            <MaterialCommunityIcons
              name="temperature-celsius"
              size={16}
              color="white"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginBottom: 20,
  },
  EnvButton: {
    backgroundColor: theme.colors.neutral(0.8),
    padding: 17,
    paddingHorizontal: 60,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    marginTop: 14,
  },
  EnvText: {
    color: theme.colors.white,
    fontSize: hp(2),
    fontWeight: theme.fontWeights.medium,
    letterSpacing: 1,
  },
  logo: {
    width: wp(70),
    height: hp(40),
    marginTop: 50,
  },
  TempButton: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: theme.colors.neutral(0.8),
    padding: 17,
    paddingHorizontal: 40,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    marginTop: 100,
  },
  TempText: {
    color: theme.colors.white,
    fontSize: hp(2),
    fontWeight: theme.fontWeights.medium,
    letterSpacing: 1,
  },
});

export default HomeScreen;
