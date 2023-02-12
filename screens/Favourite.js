import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Image } from "react-native";
import { Rating } from "react-native-ratings";
import { useStateContext } from "../context/StateContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { Grid } from "react-native-animated-spinkit";

const Favourite = ({ navigation }) => {
  // const navigation = u seNavigation();
  const [querySnapshot, setQuerySnapshot] = useState();
  const auth = getAuth();
  const user = auth.currentUser;
  const { setLocationID } = useStateContext();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  // this function runs everytym we go to favorite screen and it gets data from firebase
  useEffect(() => {
    getDocs(collection(db, user.uid)).then((data) => {
      setQuerySnapshot(data);
    });
  }, [isFocused]);
  useEffect(() => {
    querySnapshot ? setLoading(false) : setLoading(true);
  });
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("tabPress", (e) => {
  //     // Prevent default behavior
  //     e.preventDefault();

  //     alert("Default behavior prevented");
  //     // Do something manually
  //     // ...
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  // console.log(isFocused);
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
    <View
      style={{
        height: "100%",
        backgroundColor: "#f5f5f5",
        // alignItems: "center",
        // position: "relative",
        padding: 15,
        alignItems: "center",
      }}
    >
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <Text
        style={{
          fontWeight: "900",
          fontSize: 23,
          alignSelf: "flex-start",
          marginBottom: 10,
        }}
      >
        Favorites
      </Text>
      {loading ? (
        <View
          style={{
            height: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <AnimatedLoader
            visible={true}
            overlayColor="rgba(255,255,255,0)"
            source={require("../assets/worldmapLoader.json")}
            animationStyle={styles.lottie}
            speed={1}
          /> */}
          <Grid animating={true} size={80} color="#08A882" />
        </View>
      ) : querySnapshot?.docs.length !== 0 ? (
        <View style={{ height: "90%" }}>
          <ScrollView scrollEnabled={true}>
            {querySnapshot?.docs?.map((datas, key) => {
              const data = datas?._document?.data?.value?.mapValue?.fields;
              // console.log(data?.type?.stringValue);
              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.5}
                  onPress={() =>
                    handleSearchValue(
                      data?.locationID.stringValue,
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
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
            })}
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            height: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "900", fontSize: 22, letterSpacing: 2 }}>
            No favorites yet!
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({});
