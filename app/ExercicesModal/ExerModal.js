import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { hp, wp } from "../../helpers/common";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { Route } from "expo-router/build/Route";
// import { Image } from "expo-image";
import Anticons from "react-native-vector-icons/AntDesign";

const ExerModal = () => {
  const item = useLocalSearchParams();
  const router = useRouter();
  // console.log("Exercice:", item); // Log msg
  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        <Image
          source={item.image}
          resizeMode="cover"
          style={styles.stretchingImage}
        />
      </View>
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <Anticons name="closecircle" size={hp(3.5)} color="#8B0000"></Anticons>
      </TouchableOpacity>
      <ScrollView style={styles.ScrollContainer}>
        <Text style={styles.TitleName}>{item.name}</Text>

        <Text style={styles.Text}>{item.instruction}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  stretchingImage: {
    width: wp(100),
    alignSelf: "center",
    height: wp(100),
    borderRadius: hp(2.5),
  },
  button: {
    marginHorizontal: 2,
    position: "absolute",
    borderRadius: 9999,
    marginTop: 4,
    right: 3,
  },
  ScrollContainer: {
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 8,
  },
  TitleName: {
    fontWeight: "600",
    color: "#2d3748",
    letterSpacing: 1,
    fontSize: hp(3),
  },
  Text: {
    fontWeight: "600",
    color: "#4a5568",
    letterSpacing: 1,
    fontSize: hp(2),
    marginTop: 15,
  },
});
export default ExerModal;
