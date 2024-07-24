import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { hp, wp } from "../../helpers/common";
import { useRouter } from "expo-router";
import Anticons from "react-native-vector-icons/AntDesign";

const PostureHistoryScreen = () => {
  const router = useRouter();
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("");

  const renderLegend = (text, imageSource, PostureColor) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={imageSource}
          style={{
            height: hp(3),
            width: wp(3),
            marginRight: 10,
          }}
        />
        <Text style={{ color: PostureColor, fontSize: 14 }}>{text || ""}</Text>
      </View>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.43.79:3003/history/weekly"
        );
        const { data, date_range } = await response.json(); // Destructure to get date_range

        const processedData = data.map((item) => ({
          value: item.count,
          color: getColorForPosture(item.posture),
          textColor: "black",
        }));

        setPieData(processedData);
        setDateRange(date_range); // Set the date range from the response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const getColorForPosture = (posture) => {
    const colors = [
      "lightgreen", // Posture 1
      "rgb(84,219,234)", // Posture 2
      "#363636", // Posture 3
      "#dc2f2f", // Posture 4
      "#155263", // Posture 5
      "#ff6f3c", // Posture 6
      "#ffc93c", // Posture 7
      "#fafcb4", // Posture 8
      // Add more colors as needed
    ];
    return colors[posture - 1] || "grey";
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FF8C42",
        }}
      >
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FF8C42",
      }}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <Anticons name="closecircle" size={hp(3.5)} color="#8B0000"></Anticons>
      </TouchableOpacity>

      <Text
        style={{
          color: "black",
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 12,
          alignSelf: "center",
          marginTop: 80,
          marginBottom: -36,
        }}
      >
        Weekly
      </Text>
      <Text
        style={{
          color: "black",
          fontSize: 20,
          fontWeight: "light",
          marginBottom: 12,
          alignSelf: "center",
          marginTop: 40,
          marginBottom: -60,
        }}
      >
        {dateRange}
      </Text>

      <View
        style={{
          marginVertical: 100,
          marginHorizontal: 30,
          borderRadius: 10,
          paddingVertical: 50,
          backgroundColor: "#5B7C99",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Posture History
        </Text>

        <PieChart
          strokeColor="white"
          strokeWidth={4}
          donut
          data={pieData}
          innerCircleColor="#414141"
          innerCircleBorderWidth={4}
          innerCircleBorderColor={"white"}
          showValuesAsLabels={true}
          showTextBackground={true}
          centerLabelComponent={() => {
            return (
              <View>
                <Text style={{ color: "white", fontSize: 12 }}>Percentage</Text>
              </View>
            );
          }}
        />

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          {renderLegend(
            "Sitting \nupright",
            require("../../assets/images/posture1.png"),
            "lightgreen"
          )}
          {renderLegend(
            "Leaning \nbackward",
            require("../../assets/images/posture2.png"),
            "rgb(84,219,234)"
          )}
          {renderLegend(
            "Leaning \nright",
            require("../../assets/images/posture3.png"),
            "#363636"
          )}
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          {renderLegend(
            "Leaning \nleft",
            require("../../assets/images/posture4.png"),
            "#dc2f2f"
          )}
          {renderLegend(
            "Sitting on \nthe edge",
            require("../../assets/images/posture5.png"),
            "#155263"
          )}
          {renderLegend(
            "Leaning \nforward",
            require("../../assets/images/posture6.png"),
            "#ff6f3c"
          )}
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          {renderLegend(
            "Left leg \ncrossed",
            require("../../assets/images/posture7.png"),
            "#ffc93c"
          )}
          {renderLegend(
            "Right leg \ncrossed",
            require("../../assets/images/posture8.png"),
            "#fafcb4"
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 2,
    borderRadius: 5,
    marginTop: hp(10),
    marginBottom: hp(-8),
    left: wp(90),
  },
});

export default PostureHistoryScreen;
