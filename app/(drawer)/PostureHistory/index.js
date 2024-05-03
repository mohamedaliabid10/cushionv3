import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import React from "react";

const PostureHistoryScreen = () => {
  const renderLegend = (text, color) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || "white",
          }}
        />
        <Text style={{ color: "white", fontSize: 14 }}>{text || ""}</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FF8C42",
      }}
    >
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
        {/*********************    Custom Header component      ********************/}
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
        {/****************************************************************************/}

        <PieChart
          strokeColor="white"
          strokeWidth={4}
          donut
          data={[
            { value: 30, color: "rgb(84,219,234)", textColor: "black" },
            { value: 40, color: "lightgreen", textColor: "black" },
            { value: 20, color: "#8FB3AB", textColor: "black" },
          ]}
          innerCircleColor="#414141"
          innerCircleBorderWidth={4}
          innerCircleBorderColor={"white"}
          showValuesAsLabels={true}
          showText
          textSize={18}
          showTextBackground={true}
          centerLabelComponent={() => {
            return (
              <View>
                <Text style={{ color: "white", fontSize: 36 }}>90</Text>
                <Text style={{ color: "white", fontSize: 18 }}>Total</Text>
              </View>
            );
          }}
        />

        {/*********************    Custom Legend component      ********************/}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          {renderLegend("Posture 1", "rgb(84,219,234)")}
          {renderLegend("Posture 2", "lightgreen")}
          {renderLegend("Posture 3", "#8FB3AB")}
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          {renderLegend("Posture 4", "rgb(84,219,234)")}
          {renderLegend("Posture 5", "lightgreen")}
          {renderLegend("Posture 6", "#8FB3AB")}
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          {renderLegend("Posture 7", "rgb(84,219,234)")}
          {renderLegend("Posture 8", "lightgreen")}
          {renderLegend("Posture 9", "#8FB3AB")}
        </View>

        {/****************************************************************************/}
      </View>
    </View>
  );
};

export default PostureHistoryScreen;
