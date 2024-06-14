import "react-native-gesture-handler";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { hp, wp } from "../../../helpers/common";
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import { theme } from "../../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import io from "socket.io-client";

const socket = io("http://192.168.43.134:3003");

const HomeScreen = () => {
  const router = useRouter();
  const [fsrData, setFsrData] = useState({ fsr_sum: null, elapsed_time: null });
  const [status, setStatus] = useState("Empty");
  const [lastEmptyAlertTime, setLastEmptyAlertTime] = useState(null);
  const [lastOccupiedAlertTime, setLastOccupiedAlertTime] = useState(null);
  const [lastStateChangeTime, setLastStateChangeTime] = useState(
    new Date().getTime()
  );

  const checkAlerts = () => {
    const now = new Date().getTime();

    if (status === "Empty" && fsrData.elapsed_time > 60) {
      if (!lastEmptyAlertTime || now - lastEmptyAlertTime >= 120000) {
        // 2 minutes
        Alert.alert("Notification", "You need to come back");
        setLastEmptyAlertTime(now);
      }
    }

    if (status === "Occupied" && fsrData.elapsed_time > 90) {
      if (!lastOccupiedAlertTime || now - lastOccupiedAlertTime >= 120000) {
        // 2 minutes
        Alert.alert("Notification", "You need to take a break");
        setLastOccupiedAlertTime(now);
      }
    }
  };

  useEffect(() => {
    const fetchData = () => {
      fetch("http://192.168.43.134:3003/get")
        .then((response) => response.json())
        .then((newData) => {
          setFsrData(newData.fsr);
          const newStatus = newData.fsr.fsr_sum > 100 ? "Occupied" : "Empty";
          if (newStatus !== status) {
            setLastStateChangeTime(new Date().getTime());
          }
          setStatus(newStatus);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    socket.on("update_data", (newData) => {
      setFsrData(newData.fsr);
      const newStatus = newData.fsr.fsr_sum > 100 ? "Occupied" : "Empty";
      if (newStatus !== status) {
        setLastStateChangeTime(new Date().getTime());
      }
      setStatus(newStatus);
    });

    socket.on("connect", () => {
      fetchData();
    });

    return () => {
      socket.off("update_data");
      socket.off("connect");
    };
  }, [status]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      if (now - lastStateChangeTime >= 5000) {
        // 5 seconds delay after state change
        checkAlerts();
      }
    }, 1000); // Check every second

    return () => {
      clearInterval(intervalId);
    };
  }, [fsrData.elapsed_time, status, lastStateChangeTime]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
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
          source={
            status === "Occupied"
              ? require("../../../assets/images/posture.png")
              : require("../../../assets/images/korsi.png")
          }
          style={styles.logo}
          resizeMode="contain"
        />
        {/* <View style={styles.textContainer}>
          <View style={styles.TempButton}>
            <Text style={styles.TempText}>27 </Text>
            <MaterialCommunityIcons
              name="temperature-celsius"
              size={16}
              color="white"
            />
          </View>
        </View> */}
        <View style={styles.textContainer}>
          <View style={styles.StatusButton}>
            <Text
              style={[
                styles.StatusText,
                {
                  color:
                    status === "Occupied"
                      ? theme.colors.active
                      : theme.colors.inactive,
                },
              ]}
            >
              {status}
            </Text>
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
  StatusButton: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(40),
    flexDirection: "row",
    backgroundColor: theme.colors.neutral(0.8),
    padding: 17,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    marginTop: 100,
  },
  StatusText: {
    color: theme.colors.white,
    fontSize: hp(2),
    fontWeight: theme.fontWeights.medium,
    letterSpacing: 1,
  },
});

export default HomeScreen;
