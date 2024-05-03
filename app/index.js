import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { hp, wp } from "../helpers/common";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "../constants/theme";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="light"></StatusBar>
      <Image
        source={require("../assets/images/5595248.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {/* linear gradient */}
      <Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        ></LinearGradient>
        {/* content */}
        <View style={styles.contentContainer}>
          <View style={styles.logoContainerRight}>
            <Image
              source={require("../assets/images/orange.png")}
              style={styles.logoOrange}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={styles.logoContainerLeft}>
            <Image
              source={require("../assets/images/sofr.png")}
              style={styles.logoSofrecom}
              resizeMode="contain"
            ></Image>
          </View>
          <Animated.Image
            source={require("../assets/images/file.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={styles.title}
          >
            Smart Cushion
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).springify()}
            style={styles.punchline}
          >
            To make your back pain go away
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable
              onPress={() => router.push("home")}
              style={styles.startButton}
            >
              <Text style={styles.startText}>Get Started</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
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
  gradient: {
    width: wp(100),
    height: wp(65),
    bottom: 0,
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
  },
  title: {
    fontSize: hp(6),
    color: theme.colors.neutral(0.9),
    fontWeight: theme.fontWeights.bold,
  },
  punchline: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: theme.fontWeights.medium,
  },
  startButton: {
    marginBottom: 50,
    backgroundColor: theme.colors.neutral(0.9),
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(3),
    fontWeight: theme.fontWeights.medium,
    letterSpacing: 1,
  },
  logo: {
    width: wp(65),
    height: hp(50),
    position: "relative",
  },
  logoContainerRight: {
    position: "absolute",
    top: hp(5),
    right: wp(5),
  },
  logoOrange: {
    width: 50,
    height: 50,
  },
  logoSofrecom: {
    width: 70,
    height: 70,
  },
  logoContainerLeft: {
    position: "absolute",
    top: hp(5),
    left: wp(5),
  },
});

export default WelcomeScreen;
