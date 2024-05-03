import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../helpers/common";
import { MaterialIcons } from "@expo/vector-icons";
export default function CustomDrawerContent(props) {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: "#353839" }}
      >
        <View style={{ padding: 26, margin: -13 }}>
          <Image
            source={require("../assets/images/me.jpg")}
            style={{
              width: 142,
              height: 142,
              alignSelf: "center",
              borderRadius: 70,
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "500",
              fontSize: 18,
              paddingTop: 15,
              color: "white",
            }}
          >
            Mohamed Ali Abid
          </Text>
        </View>
        <View style={{ backgroundColor: "white", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopColor: "#dde3fe",
          borderTopWidth: 1,
          padding: 10,
          paddingBottom: 0 + bottom,
        }}
      >
        <DrawerItem
          label={"Logout"}
          onPress={() => router.replace("/")}
          icon={() => <MaterialIcons name="logout" size={24} color="black" />}
        />
      </View>
    </View>
  );
}
