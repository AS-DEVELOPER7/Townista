import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Rating } from "react-native-ratings";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useStateContext } from "../context/StateContext";

const FavoriteResults = ({ data }) => {
  const { setLocationID } = useStateContext();
  const handleSearchValue = (locationid, type) => {
    setLocationID(locationid);
    // console.log(locationid);
    // navigation.navigate("FavoriteHotelDetails");
    type == "Hotel"
      ? navigation.navigate("HotelDetails")
      : type === "Restaurant"
      ? navigation.navigate("RestaurantDetails")
      : navigation.navigate("TouristDetails");
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        handleSearchValue(
          data?.locationID?.stringValue,
          data?.type?.stringValue
        )
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
          uri: data?.image?.stringValue,
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
          {data?.type?.stringValue == "Hotel"
            ? "Hotels"
            : data?.type?.stringValue === "Attraction"
            ? "Tourist Place"
            : "Restaurants"}
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
          {data?.name?.stringValue}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Rating
            readonly
            stringValue={data?.rating?.stringValue}
            minValue={0}
            ratingCount={5}
            ratingColor="#08A882"
            // ratingBackgroundColor="#08A882"
            imageSize={12}
            type="custom"
          />
          <Text style={{ marginLeft: 10, fontWeight: "700" }}>
            {data?.reviews?.stringValue}
          </Text>
        </View>
        <Text numberOfLines={3} style={{ width: 160 }}>
          {data?.address?.stringValue}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteResults;

const styles = StyleSheet.create({});
