import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { hp, wp } from "../../../helpers/common";
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import { theme } from "../../../constants/theme";
import io from "socket.io-client";
import * as Notifications from "expo-notifications";

const socket = io("http://192.168.43.134:3003");

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen = () => {
  const router = useRouter();
  const [fsrData, setFsrData] = useState({ fsr_sum: null, elapsed_time: null });
  const [status, setStatus] = useState("Empty");
  const [lastEmptyAlertTime, setLastEmptyAlertTime] = useState(null);
  const [lastOccupiedAlertTime, setLastOccupiedAlertTime] = useState(null);
  const [lastStateChangeTime, setLastStateChangeTime] = useState(
    new Date().getTime()
  );
  const [posture, setPosture] = useState(1); // Initial posture set to 1
  const [badPostureStartTime, setBadPostureStartTime] = useState(null);
  const [updatePosture, setUpdatePosture] = useState(false); // State to start updating posture after 33 seconds

  // Request notification permissions
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert(
          "You need to enable notifications permissions to use this feature."
        );
      }
    };
    getPermissions();
  }, []);

  const scheduleNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: "default",
      },
      trigger: null,
    });
  };

  const checkAlerts = () => {
    const now = new Date().getTime();

    if (status === "Empty" && fsrData.elapsed_time > 3600) {
      if (!lastEmptyAlertTime || now - lastEmptyAlertTime >= 120000) {
        scheduleNotification("Notification", "You need to come back");
        setLastEmptyAlertTime(now);
      }
    }

    if (status === "Occupied" && fsrData.elapsed_time > 3600) {
      if (!lastOccupiedAlertTime || now - lastOccupiedAlertTime >= 120000) {
        scheduleNotification("Notification", "You need to take a break");
        setLastOccupiedAlertTime(now);
      }
    }

    if (status === "Occupied" && posture !== 1) {
      if (badPostureStartTime === null) {
        setBadPostureStartTime(now);
      } else if (now - badPostureStartTime >= 30000) {
        // 1 hour in milliseconds
        scheduleNotification(
          "Posture Alert",
          "You have been sitting in a bad posture for an hour. Please fix your posture."
        );
        setBadPostureStartTime(now);
      }
    } else {
      setBadPostureStartTime(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.43.134:3003/get");
        const newData = await response.json();
        setFsrData(newData.fsr);
        const newPosture = newData.posture.posture;
        if (updatePosture) {
          // Only update posture if the flag is true
          setPosture(newPosture);
        }
        const newStatus = newData.fsr.fsr_sum > 300 ? "Occupied" : "Empty";
        if (newStatus !== status) {
          setLastStateChangeTime(new Date().getTime());
        }
        setStatus(newStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    socket.on("update_data", (newData) => {
      setFsrData(newData.fsr);
      const newPosture = newData.posture.posture;
      if (updatePosture) {
        // Only update posture if the flag is true
        setPosture(newPosture);
      }
      const newStatus = newData.fsr.fsr_sum > 300 ? "Occupied" : "Empty";
      if (newStatus !== status) {
        setLastStateChangeTime(new Date().getTime());
      }
      setStatus(newStatus);
    });

    socket.on("connect", fetchData);

    return () => {
      socket.off("update_data");
      socket.off("connect");
    };
  }, [status, updatePosture]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      if (now - lastStateChangeTime >= 5000) {
        checkAlerts();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    fsrData.elapsed_time,
    status,
    lastStateChangeTime,
    posture,
    badPostureStartTime,
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setUpdatePosture(true);
    }, 33000); // 33 seconds

    return () => clearTimeout(timeoutId);
  }, []);

  const getPostureImage = (posture) => {
    switch (posture) {
      case 1:
        return require("../../../assets/images/posture1.png");
      case 2:
        return require("../../../assets/images/posture2.png");
      case 3:
        return require("../../../assets/images/posture3.png");
      case 4:
        return require("../../../assets/images/posture4.png");
      case 5:
        return require("../../../assets/images/posture5.png");
      case 6:
        return require("../../../assets/images/posture6.png");
      case 7:
        return require("../../../assets/images/posture7.png");
      case 8:
        return require("../../../assets/images/posture8.png");
      default:
        return require("../../../assets/images/korsi.png");
    }
  };

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
              ? getPostureImage(posture)
              : require("../../../assets/images/korsi.png")
          }
          style={styles.logo}
          resizeMode="contain"
        />
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
