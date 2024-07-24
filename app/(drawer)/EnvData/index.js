import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import io from "socket.io-client";
import { hp, wp } from "../../../helpers/common";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const socket = io("http://192.168.43.79:3003"); //flask api

const EnvScreen = () => {
  const [data, setData] = useState({
    temperature: null,
    humidity: null,
    voc_index: null,
  });
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received: ", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response: ", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://192.168.43.79:3003/get")
        .then((response) => response.json())
        .then((newData) => {
          if (newData.dht11) {
            setData(newData.dht11);
            checkForAlerts(newData.dht11);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    socket.on("update_data", (newData) => {
      if (newData.dht11) {
        setData(newData.dht11);
        checkForAlerts(newData.dht11);
      }
    });

    socket.on("connect", () => {
      // When connected, fetch initial data
      fetchData();
    });

    // Clean up event listeners
    return () => {
      socket.off("update_data");
      socket.off("connect");
    };
  }, []);

  const checkForAlerts = (newData) => {
    if (newData.humidity > 70) {
      sendNotification(
        "High Humidity Alert",
        `Humidity is at ${newData.humidity}%`
      );
    }
    if (newData.voc_index > 300) {
      sendNotification(
        "High VOC Alert",
        `VOC level is at ${newData.voc_index}`
      );
    }
  };

  const sendNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: "default",
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <Image
        source={require("../../../assets/images/tempbg.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.TempText}>
        <FontAwesome5 name="temperature-high" size={22} color="black" />
        <Text style={styles.label}>Temperature: {data.temperature}°C</Text>
      </View>
      <View style={styles.HumidText}>
        <MaterialCommunityIcons name="water-percent" size={30} color="black" />
        <Text style={styles.label}>Humidity: {data.humidity}%</Text>
      </View>
      <View style={styles.HumidText}>
        <FontAwesome5 name="radiation-alt" size={24} color="black" />
        <Text style={styles.label}>
          Voc: {data.voc_index && data.voc_index.toFixed(0)}
        </Text>
      </View>
      <View>
        <Image
          source={require("../../../assets/images/voc.png")}
          style={styles.voc_image}
        ></Image>
      </View>
    </View>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: "black",
    marginLeft: 12,
  },
  backgroundImage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  TempText: {
    alignItems: "center",
    flexDirection: "row",
  },
  HumidText: {
    alignItems: "center",
    flexDirection: "row",
  },
  voc_image: {
    width: wp(100),
    height: 60,
    marginTop: 50,
  },
});

export default EnvScreen;
