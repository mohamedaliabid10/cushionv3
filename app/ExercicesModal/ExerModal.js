import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import React from "react";
import { hp, wp } from "../../helpers/common";
import { useLocalSearchParams } from "expo-router";

const ExerModal = () => {
  const item = useLocalSearchParams();
  console.log("Exercice:", item); // Log msg
  return (
    <View style={styles.container}>
      {/* <Image
        source={exercice ? exercice.image : null}
        resizeMode="cover"
        style={styles.stretchingImage}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({});
export default ExerModal;
