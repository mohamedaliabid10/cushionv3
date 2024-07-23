import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import { theme } from "../../../constants/theme";
import { hp, wp } from "../../../helpers/common";

const PostureHistoryScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/HistoryData/DailyView",
              })
            }
            style={styles.Button}
          >
            <Text style={styles.Text}>Daily</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/HistoryData/WeeklyView",
              })
            }
            style={styles.Button}
          >
            <Text style={styles.Text}>Weekly</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/HistoryData/MonthlyView",
              })
            }
            style={styles.Button}
          >
            <Text style={styles.Text}>Monthly</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/HistoryData/SelectDateView",
              })
            }
            style={styles.Button}
          >
            <Text style={styles.Text}>Select Date</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8C42",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF", // iOS blue
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    backgroundColor: theme.colors.neutral(0.8),
    padding: 17,
    paddingHorizontal: 60,
    marginVertical: 10,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    marginTop: 14,
  },
  Text: {
    color: theme.colors.white,
    fontSize: hp(2),
    fontWeight: theme.fontWeights.medium,
    letterSpacing: 1,
    alignSelf: "center",
  },
});

export default PostureHistoryScreen;
