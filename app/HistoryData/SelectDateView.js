import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { hp, wp } from "../../helpers/common";
import { useRouter } from "expo-router";
import Anticons from "react-native-vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";

const PostureHistoryScreen = () => {
  const router = useRouter();
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

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

  const formatDate = (date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://192.168.43.79:3003/history/range?date_range=${encodeURIComponent(
            `${formatDate(startDate)} to ${formatDate(endDate)}`
          )}`
        );
        const json = await response.json();
        if (response.ok) {
          const processedData = json.data.map((item) => ({
            value: item.count,
            color: getColorForPosture(item.posture),
            textColor: "black",
          }));
          setPieData(processedData);
          setDateRange(json.date_range);
        } else {
          throw new Error(json.error || "Failed to load data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

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

  const showPicker = (pickerType) => {
    if (pickerType === "start") {
      setShowStartPicker(true);
    } else {
      setShowEndPicker(true);
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FF8C42",
      }}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <Anticons name="closecircle" size={hp(3.5)} color="#8B0000" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => showPicker("start")}
        style={styles.button2}
      >
        <Text style={styles.buttonText}>Select Start Date</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          testID="startDatePicker"
          value={startDate}
          mode="date"
          display="default"
          onChange={onChangeStartDate}
        />
      )}

      <TouchableOpacity
        onPress={() => showPicker("end")}
        style={styles.button2}
      >
        <Text style={styles.buttonText}>Select End Date</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          testID="endDatePicker"
          value={endDate}
          mode="date"
          display="default"
          onChange={onChangeEndDate}
        />
      )}

      {/* <Text style={styles.dateDisplay}>{dateRange}</Text> */}

      <Text
        style={{
          color: "black",
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 12,
          alignSelf: "center",
          marginTop: -20,
          marginBottom: -36,
        }}
      >
        Date Range
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
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  button2: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center", // Center button horizontally
    width: "80%", // Set width to make buttons look uniform
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16, // Optional: Adjust font size for better readability
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
  },
  dateDisplay: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20, // Add more space below the date range text
  },
});

export default PostureHistoryScreen;
