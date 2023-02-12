import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { Rating } from "react-native-ratings";
import { useStateContext } from "../context/StateContext";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
const SearchResults = ({ data }) => {
  const navigation = useNavigation();
  const { setLocationID } = useStateContext();
  const handleSearchValue = (locationid, type) => {
    setLocationID(locationid);
    // console.log(locationid);
    {
      type == "lodging"
        ? navigation.navigate("HotelDetails")
        : type === "restaurants"
        ? navigation.navigate("RestaurantDetails")
        : navigation.navigate("TouristDetails");
    }
    // navigation.navigate("Details");
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        handleSearchValue(data?.result_object?.location_id, data?.result_type)
      }
      style={{
        flexDirection: "row",
        width: "100%",
        height: 150,
        alignItems: "flex-start",
        marginBottom: 30,
        borderRadius: 30,
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <Image
        resizeMode="cover"
        style={{ height: 150, width: 150 }}
        source={{
          uri: data?.result_object?.photo?.images?.medium?.url,
        }}
      />
      <View
        style={{
          padding: 5,
          alignItems: "flex-start",
          width: "70%",
          justifyContent: "space-evenly",
          height: 150,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            borderWidth: 1,
            borderColor: "#08A882",
            padding: 5,
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          {data?.result_type == "lodging"
            ? "Hotels"
            : data?.result_type === "geos"
            ? "location"
            : data?.result_type === "things_to_do"
            ? "Tourist Place"
            : data?.result_type === "restaurants"
            ? "Restaurants"
            : ""}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "800",
            width: 170,
            // backgroundColor: "black",
          }}
          numberOfLines={2}
        >
          {data?.result_object?.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Rating
            readonly
            startingValue={data?.result_object?.rating}
            minValue={0}
            ratingCount={5}
            ratingColor="#08A882"
            // ratingBackgroundColor="#08A882"
            imageSize={12}
            type="custom"
          />
          <Text style={{ marginLeft: 10, fontWeight: "700" }}>
            {data?.result_object?.num_reviews}
          </Text>
        </View>
        {data?.result_object?.geo_description ? (
          <Text numberOfLines={3} style={{ width: 170 }}>
            {data?.result_object?.geo_description}
          </Text>
        ) : (
          <Text numberOfLines={3} style={{ width: 160 }}>
            {data?.result_object?.location_string}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
