import {
  Alert,
  BackHandler,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps/lib/ProviderConstants";
import {
  useHotels_by_locationQuery,
  useRestaurant_by_locationQuery,
  useTourist_place_by_locationQuery,
} from "../app/services";
// import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
// import { MapMarker } from "react-native-maps/lib/MapMarker";
import { useStateContext } from "../context/StateContext";
// import AnimatedLoader from "react-native-animated-loader";
import { useIsFocused } from "@react-navigation/native";
import { Grid } from "react-native-animated-spinkit";
const Home = ({ navigation }) => {
  // const [location, setLocation] = useState("null");
  const [select, setSelect] = useState("Restaurants");
  const [latitude, setLatitude] = useState(24.57127);
  const [longitude, setLongitude] = useState(73.691544);
  const [loading, setLoading] = useState(true);
  const { setLocationID } = useStateContext();
  const [region, setRegion] = useState();

  // const [errorMsg, setErrorMsg] = useState(false);
  const restaurants = useRestaurant_by_locationQuery({
    lat: latitude,
    lang: longitude,
  });
  const hotels = useHotels_by_locationQuery({
    lat: latitude,
    lang: longitude,
  });
  const attractions = useTourist_place_by_locationQuery({
    lat: latitude,
    lang: longitude,
  });
  // console.log(hotels);
  const focused = useIsFocused();
  const options = [
    {
      title: "Restaurants",
      icon: Ionicons,
      iconName: "restaurant-outline",
    },
    {
      title: "Hotels",
      icon: Ionicons,
      iconName: "bed-outline",
    },
    {
      title: "Tourist Attractions",
      icon: MaterialIcons,
      iconName: "attractions",
    },
  ];
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        // setErrorMsg(true);

        return ({ status } =
          await Location.requestForegroundPermissionsAsync());
      }

      await Location.getCurrentPositionAsync({}).then((data) => {
        // setLocation(JSON.stringify(data));
        setLatitude(Number(JSON.stringify(data?.coords?.latitude)));
        setLongitude(Number(JSON.stringify(data.coords.longitude)));
        setLoading(false);

        console.log(loading);
        setRegion({
          latitude: Number(JSON.stringify(data?.coords?.latitude)),
          longitude: Number(JSON.stringify(data?.coords?.longitude)),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      });
    })();
  }, [focused]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      // Prevent default behavior
      e.preventDefault();

      alert("Default behavior prevented");
      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [navigation]);

  const handleHotelValue = (locationID) => {
    setLocationID(locationID);

    navigation.navigate("HotelDetails");
  };
  const handleRestaurantValue = (locationID) => {
    setLocationID(locationID);

    navigation.navigate("RestaurantDetails");
  };
  const handleAttractionValue = (locationID) => {
    setLocationID(locationID);

    navigation.navigate("TouristDetails");
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        padding: 10,
        // overflow: "hidden",
        // marginBottom: 100,
      }}
    >
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Text style={{ fontSize: 30, fontWeight: "900" }}>Explore</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        {options.map((data, key) => (
          <TouchableOpacity
            key={key}
            style={{
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              padding: 10,
              borderRadius: 10,
              width: 100,
              height: 80,
              justifyContent: "space-around",
            }}
            onPress={() => setSelect(data.title)}
          >
            <data.icon
              name={data.iconName}
              size={24}
              color={data.title === select ? "#08A882" : "black"}
            />
            <Text
              style={[
                { fontSize: 14, fontWeight: "600", textAlign: "center" },
                data.title === select
                  ? { color: "#08A882" }
                  : { color: "black" },
              ]}
            >
              {data.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <Text style={styles.paragraph}>{location}</Text> */}
      {loading ? (
        <View
          style={{
            height: "70%",
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
      ) : (
        <View
          style={{
            height: "70%",
            // flex: 1,
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: 50,
            // backgroundColor: "black",
          }}
        >
          <MapView
            style={{ width: "100%", height: "100%" }}
            //specify our coordinates.
            initialRegion={region}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            //onRegionChangeComplete runs when the user stops dragging MapView
            onRegionChangeComplete={(region) => setRegion(region)}
            userInterfaceStyle="dark"
            mapType="standard"
          >
            {select === "Restaurants"
              ? restaurants?.data?.data?.map((data, key) => (
                  <Marker
                    key={key}
                    coordinate={{
                      latitude: data?.latitude ? Number(data?.latitude) : 0,
                      longitude: data?.longitude ? Number(data?.longitude) : 0,
                    }}
                    // title="sdasdsdsda"
                    tappable={true}
                    title={data?.name}
                    onCalloutPress={() =>
                      handleRestaurantValue(data?.location_id)
                    }
                    // onPress={() => navigation.navigate("Details")}
                    // icon={require("../assets/bed.png")}
                  >
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 30,
                        width: 30,
                      }}
                      source={require("../assets/restaurant.png")}
                    />
                  </Marker>
                ))
              : select === "Hotels"
              ? hotels?.data?.data?.map((data, key) => (
                  <Marker
                    key={key}
                    coordinate={{
                      latitude: data?.latitude ? Number(data?.latitude) : 0,
                      longitude: data?.longitude ? Number(data?.longitude) : 0,
                    }}
                    // title="sdasdsdsda"
                    tappable={true}
                    title={data?.name}
                    onCalloutPress={() => handleHotelValue(data?.location_id)}
                    // icon={require("../assets/bed.png")}
                  >
                    <View>
                      <Image
                        resizeMode="cover"
                        style={{
                          height: 45,
                          width: 45,
                        }}
                        source={require("../assets/hotel.png")}
                      />
                    </View>
                  </Marker>
                ))
              : attractions?.data?.data?.map((data, key) => (
                  <Marker
                    key={key}
                    coordinate={{
                      latitude: data?.latitude ? Number(data?.latitude) : 0,
                      longitude: data?.longitude ? Number(data?.longitude) : 0,
                    }}
                    onCalloutPress={() =>
                      handleAttractionValue(data?.location_id)
                    }
                    // title="sdasdsdsda"
                    tappable={true}
                    title={data?.name}
                    // icon={require("../assets/bed.png")}
                  >
                    <View>
                      <Image
                        resizeMode="cover"
                        style={{
                          height: 45,
                          width: 45,
                        }}
                        source={require("../assets/attraction.png")}
                      />
                    </View>
                  </Marker>
                ))}
          </MapView>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  arrowDown: {
    borderTopWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 0,
    borderLeftWidth: 20,
    borderTopColor: "white",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
  lottie: {
    width: "100%",
    height: 200,
  },
});
