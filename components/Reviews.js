import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { Divider } from "@rneui/themed";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const Reviews = ({ reviews }) => {
  const navigation = useNavigation();
  // const data = [
  //   { quarter: "5 stars", earnings: 13000 },
  //   { quarter: "4 stars", earnings: 16500 },
  //   { quarter: "3 stars", earnings: 14250 },
  //   { quarter: "2 stars", earnings: 19000 },
  // ];
  // const [readMore, setReadMore] = useState(false);
  return (
    <View>
      {/* <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
        style={{
          parent: {
            border: "1px solid #ccc",
          },
        }}
      >
        <VictoryBar
          data={data}
          x="quarter"
          // y="earnings"
          horizontal={true}
          style={{ data: { fill: "#08A882" } }}
          animate={{
            duration: 2000,
            // onLoad: { duration: 1000 },
          }}
          cornerRadius={{ topLeft: ({ datum }) => datum.x * 5 }}
        />
      </VictoryChart> */}

      <View style={{ backgroundColor: "black" }} />
      {reviews?.data?.data?.map((data, key) => {
        return key < 2 ? (
          <View key={key}>
            <View style={{ width: "85%", paddingVertical: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 10,
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40 / 2,
                    marginRight: 10,
                  }}
                  source={{ uri: data?.user?.avatar?.small?.url }}
                />
                <View>
                  <Text style={{ fontWeight: "700", fontSize: 16 }}>
                    {data?.title}
                  </Text>
                  <View style={{ marginTop: 2, flexDirection: "row" }}>
                    <Rating
                      readonly
                      startingValue={data?.rating}
                      minValue={0}
                      ratingCount={5}
                      ratingColor="#08A882"
                      // ratingBackgroundColor="#08A882"
                      imageSize={14}
                      type="custom"
                    />
                    <Text
                      style={{
                        fontWeight: "800",
                        fontSize: 12,
                        marginLeft: 10,
                        color: "#71797E",
                      }}
                    >
                      by {data?.user?.username}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ paddingLeft: 20, marginTop: 10 }}>
                <Text numberOfLines={15}>{data?.text}</Text>
              </View>
            </View>
            {key != 1 ? (
              <Divider width={1} style={{ marginVertical: 10 }} />
            ) : (
              <></>
            )}
          </View>
        ) : (
          <View key={key}></View>
        );
      })}
      <TouchableOpacity
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
        }}
        onPress={() => {
          navigation.navigate("Reviews");
        }}
      >
        <Text
          style={{
            borderWidth: 2,
            borderColor: "#08A882",
            borderRadius: 25,
            fontWeight: "700",
            fontSize: 18,
            paddingVertical: 10,
            width: "60%",
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          View All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({});
