import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import io from "socket.io-client";
import { useRouter } from "expo-router";
import { hp, wp } from "../../../helpers/common";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "../../../constants/theme";
import { Drawer } from "expo-router/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const socket = io("http://192.168.43.50:3003");

const EnvScreen = () => {
  const [data, setData] = useState({ temperature: null, humidity: null });
  useEffect(() => {
    const fetchData = () => {
      fetch("http://192.168.43.50:3003/get")
        .then((response) => response.json())
        .then((newData) => {
          setData(newData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    socket.on("update_data", () => {
      fetchData();
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

  return (
    <View style={styles.container}>
      <StatusBar style="light"></StatusBar>
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
        <Text style={styles.label}>Co2:</Text>
      </View>
    </View>
  );
};

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
});

export default EnvScreen;
