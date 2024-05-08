import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import React from "react";
import { hp, wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
const Exercice = () => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.TextView}>
        <Text style={styles.Title}>Stretching Exercices</Text>
      </View>
      <View style={{ marginTop: hp(12) }}>
        <Image
          source={require("../../../assets/images/stretching1.gif")}
          style={styles.stretchingImage1}
        />
      </View>
      <View>
        <Image
          source={require("../../../assets/images/stretching2.gif")}
          style={styles.stretchingImage}
        />
      </View>
      <View>
        <Image
          source={require("../../../assets/images/stretching3.gif")}
          style={styles.stretchingImage}
        />
      </View>
      <View>
        <Image
          source={require("../../../assets/images/stretching4.gif")}
          style={styles.stretchingImage}
        />
      </View>
      <View>
        <Image
          source={require("../../../assets/images/stretching5.gif")}
          style={styles.stretchingImage}
        />
      </View>
      <View>
        <Image
          source={require("../../../assets/images/stretching6.gif")}
          style={styles.stretchingImage}
        />
      </View>
      <View>
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
  },
  stretchingImage: {
    width: wp(100),
    height: hp(40),
    borderRadius: 50,
    marginTop: hp(2),
  },
  stretchingImage1: {
    width: wp(100),
    height: hp(40),
    borderRadius: 50,
  },
  TextView: {
    marginTop: hp(7),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginBottom: hp(-8),
  },
  Title: {
    color: "black",
  },
});

export default Exercice;
