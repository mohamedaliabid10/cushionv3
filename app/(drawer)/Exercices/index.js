import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "react-native";
import React from "react";
import { hp, wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import { useRouter } from "expo-router";
const Exercice = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.TextView}>
        <Text style={styles.Title}>Stretching Exercices</Text>
      </View>
      <TouchableOpacity
        style={styles.ImageContainer}
        onPress={() =>
          router.push({
            pathname: "/ExercicesModal",
          })
        }
      >
        <Image
          source={require("../../../assets/images/stretching1.gif")}
          style={styles.stretchingImage}
        />
      </TouchableOpacity>
      <View style={styles.ImageContainer}>
        <Image
          source={require("../../../assets/images/stretching2.gif")}
          style={styles.stretchingImage}
        />
      </View>
      <View style={styles.ImageContainer}>
        <Image
          source={require("../../../assets/images/stretching3.gif")}
          style={styles.stretchingImage}
        />
      </View>
      <View style={styles.ImageContainer}>
        <Image
          source={require("../../../assets/images/stretching4.gif")}
          style={styles.stretchingImage}
        />
      </View>
      <View style={styles.ImageContainer}>
        <Image
          source={require("../../../assets/images/stretching5.gif")}
          style={styles.stretchingImage}
        />
      </View>
      <View style={styles.ImageContainer}>
        <Image
          source={require("../../../assets/images/stretching6.gif")}
          style={styles.stretchingImage}
        />
      </View>
      <View style={styles.ImageContainer}>
        <Image
          source={require("../../../assets/images/stretching7.gif")}
          style={styles.stretchingImage}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#df9953",
  },
  stretchingImage: {
    width: wp(97),
    alignSelf: "center",
    height: hp(40),
    borderRadius: hp(8),
    marginVertical: hp(0.7),
    borderWidth: wp(0.8),
  },
  TextView: {
    marginTop: hp(6.5),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginBottom: hp(1),
  },
  Title: {
    color: "#000000",
    fontSize: hp(3),
    fontWeight: theme.fontWeights.medium,
  },
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
});

export default Exercice;
