import {
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { hp, wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import { useRouter } from "expo-router";
import { ExercicesDetails } from "../../../constants/ExercicesDetails";
const Exercice = () => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.FlatListStyle}
        data={ExercicesDetails}
        numColumns={1}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
        renderItem={({ item, index }) => (
          <ExerciceCard index={index} item={item} />
        )}
      />
    </View>
  );
};

const ExerciceCard = ({ item, index }) => {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.ImageContainer}
        onPress={() => {
          console.log("Selected Item:", item);
          router.push({
            pathname: "/ExercicesModal/ExerModal",
            params: item,
          });
        }}
      >
        <Image
          source={item.image}
          resizeMode="cover"
          style={styles.stretchingImage}
        />
      </TouchableOpacity>
    </View>
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
    justifyContent: "center",
    alignItems: "center",
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
  FlatListStyle: { marginTop: hp(10) },
});

export default Exercice;
