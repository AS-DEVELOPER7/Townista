import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import {
  useHotel_detailsQuery,
  useQuestionsQuery,
  useReviewsQuery,
  useTipsQuery,
} from "../app/services";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import Toast from "react-native-simple-toast";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { Divider } from "@rneui/themed";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Reviews from "../components/Reviews";
import QandA from "../components/QandA";
import LoadingDetails from "../components/LoadingDetails";

const HotelDetails = ({ navigation }) => {
  const { locationID } = useStateContext();
  const details = useHotel_detailsQuery(locationID);

  const qna = useQuestionsQuery(locationID);
  const reviews = useReviewsQuery(locationID);
  const tips = useTipsQuery(locationID);
  console.log(tips);
  const [readMore, setReadMore] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [choose, setChoose] = useState("Reviews");
  const [region, setRegion] = useState({});
  const auth = getAuth();
  const user = auth.currentUser;

  const options = [
    {
      title: "Reviews",
    },
    { title: "Q & A" },
  ];
  // console.log(details);
  // console.log(auth);
  useEffect(() => {
    if (details?.data) {
      setLoading(false);
      setRegion({
        latitude: Number(details?.data?.data[0]?.latitude),
        longitude: Number(details?.data?.data[0]?.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      favouritehandle();
    } else {
      setLoading(true);
    }
  }, [details]);
  const favouritehandle = async () => {
    const docRef = doc(db, user.uid, details?.data?.data[0]?.name);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setFavourite(true);
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
      setFavourite(false);
    }
  };
  const handleFavourite = () => {
    if (!favourite) {
      setDoc(doc(db, user?.uid, details?.data?.data[0]?.name), {
        locationID: details?.data?.data[0]?.location_id,
        image: details?.data?.data[0]?.photo?.images?.medium?.url,
        name: details?.data?.data[0]?.name,
        rating: details?.data?.data[0]?.rating,
        type: details?.data?.data[0]?.category.name,
        reviews: details?.data?.data[0]?.num_reviews,
        address: details?.data?.data[0]?.location_string,
      });
      setFavourite(true);
      Toast.show("Favourite is added Successfully!", Toast.SHORT);
    } else {
      deleteDoc(doc(db, user?.uid, details?.data?.data[0]?.name));
      setFavourite(false);
      Toast.show("Favourite is removed successfully", Toast.SHORT);
    }
  };
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "white",
        // alignItems: "center",
        // position: "relative",
      }}
    >
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {!loading ? (
        <View style={{ height: "90%" }}>
          <ScrollView scrollEnabled={true}>
            {/* //--------------------
        //back and favourite button
        //-------------------- */}

            <View style={{ position: "relative", alignItems: "center" }}>
              <View
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  position: "absolute",
                  top: 10,
                  zIndex: 10,

                  // marginHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#08A882",
                    padding: 10,
                    height: 50,
                    width: 70,
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                  activeOpacity={0.7}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={27} color="white" />
                </TouchableOpacity>

                {favourite ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#08A882",
                      padding: 10,
                      height: 50,
                      width: 70,
                      borderTopLeftRadius: 30,
                      borderBottomLeftRadius: 30,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                    activeOpacity={0.7}
                    onPress={() => handleFavourite()}
                  >
                    <MaterialIcons name="favorite" size={27} color="white" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#08A882",
                      padding: 10,
                      height: 50,
                      width: 70,
                      borderTopLeftRadius: 30,
                      borderBottomLeftRadius: 30,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                    activeOpacity={0.7}
                    onPress={() => handleFavourite()}
                  >
                    <MaterialIcons
                      name="favorite-outline"
                      size={27}
                      color="white"
                    />
                  </TouchableOpacity>
                )}
              </View>
              {/* //-----------
          // top image
          //---------- */}
              <Image
                resizeMode="cover"
                // resizeMethod="auto"
                source={{
                  uri: details?.data?.data[0]?.photo?.images?.large?.url,
                }}
                style={{ width: "95%", height: 250, borderRadius: 20 }}
              />
            </View>
            {/* //---------
        //rating, name,ranking container
        //------------ */}
            <View
              style={{
                alignItems: "flex-start",
                width: "100%",
                padding: 15,
                minHeight: 200,
                MaxHeight: 300,
                justifyContent: "space-evenly",
                // backgroundColor: "black",
              }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "900", letterSpacing: 3 }}
              >
                {details?.data?.data[0]?.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Rating
                  readonly
                  startingValue={details?.data?.data[0]?.rating}
                  minValue={0}
                  ratingCount={5}
                  ratingColor="#08A882"
                  // ratingBackgroundColor="#08A882"

                  imageSize={18}
                  type="custom"
                  style={{ marginVertical: 5 }}
                />
                <Text style={{ marginLeft: 20, fontWeight: "700" }}>
                  {details?.data?.data[0]?.num_reviews} Reviews
                </Text>
              </View>
              <Text
                style={{ fontWeight: "800", letterSpacing: 1, marginBottom: 5 }}
              >
                {details?.data?.data[0]?.ranking}
              </Text>
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  width: "100%",
                  // justifyContent: "space-around",`
                  alignItems: "center",
                }}
              >
                {details?.data?.data[0]?.amenities?.map((data, key) => {
                  return key < 10 ? (
                    <Text
                      key={key}
                      style={{
                        fontWeight: "700",
                        borderWidth: 2,
                        borderColor: "#08A882",
                        color: "#08A882",
                        borderRadius: 20,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        textAlign: "center",
                        marginTop: 10,
                        marginRight: 10,
                      }}
                    >
                      {data.name}
                    </Text>
                  ) : (
                    <></>
                  );
                })}
              </View>
            </View>

            <Divider color="#08A882" width={1} />

            {/* //-------------
        //Description container
        //------------- */}
            {details?.data?.data[0]?.description ? (
              <View style={{ padding: 15 }}>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: "800",
                    marginBottom: 10,
                  }}
                >
                  Description
                </Text>
                <Text
                  style={{ color: "#71797E", fontWeight: "700" }}
                  numberOfLines={readMore ? 50 : 4}
                >
                  {details?.data?.data[0]?.description}
                </Text>
                <Text
                  style={{ fontWeight: "900", marginTop: 5, fontSize: 15 }}
                  onPress={() => setReadMore(!readMore)}
                >
                  {readMore ? "Read less" : "Read more"}
                </Text>

                <Divider color="#08A882" width={1} />
              </View>
            ) : (
              <></>
            )}

            {/* //----------------
          //contact container
          //---------------- */}
            <View style={{ width: "100%", padding: 15 }}>
              {details?.data?.data[0]?.address ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "90%",
                  }}
                >
                  <Entypo name="address" size={24} color="#08A882" />
                  <Text style={{ marginLeft: 10, fontWeight: "600" }}>
                    {details?.data?.data[0]?.address}
                  </Text>
                </View>
              ) : (
                <></>
              )}

              {details?.data?.data[0]?.email ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  <Ionicons name="md-mail-outline" size={24} color="#08A882" />
                  <Text style={{ marginLeft: 10, fontWeight: "600" }}>
                    {details?.data?.data[0]?.email}
                  </Text>
                </View>
              ) : (
                <></>
              )}

              {details?.data?.data[0]?.phone ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name="call" size={24} color="#08A882" />
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `tel:${details?.data?.data[0]?.phone
                          .toString()
                          .replaceAll(/\s/g, "")}`
                      )
                    }
                  >
                    <Text style={{ marginLeft: 10, fontWeight: "600" }}>
                      {details?.data?.data[0]?.phone}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
              {details?.data?.data[0]?.web_url ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Entypo name="link" size={24} color="#08A882" />
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(details?.data?.data[0]?.web_url)
                    }
                  >
                    <Text
                      numberOfLines={1}
                      style={{ marginLeft: 10, fontWeight: "600" }}
                    >
                      {details?.data?.data[0]?.web_url}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
              <View
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 20,
                  overflow: "hidden",
                  marginTop: 10,
                }}
              >
                {!loading ? (
                  <MapView
                    style={{ width: "100%", height: 200, borderRadius: 20 }}
                    //specify our coordinates.
                    initialRegion={region}
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    loadingEnabled={true}
                    //onRegionChangeComplete runs when the user stops dragging MapView
                    // onRegionChangeComplete={(region) => setRegion(region)}
                    userInterfaceStyle="dark"
                    mapType="standard"
                  >
                    <Marker
                      coordinate={{
                        latitude: Number(details?.data?.data[0]?.latitude),
                        longitude: Number(details?.data?.data[0]?.longitude),
                      }}
                      image={require("../assets/hotel.png")}
                    />
                  </MapView>
                ) : (
                  <Text>loading</Text>
                )}
              </View>
            </View>
            <Divider color="#08A882" width={1} />
            {/* //--------------
        //tips container
    //--------------------- */}
            {tips?.data?.data ? (
              <>
                <View style={{ padding: 15, width: "100%" }}>
                  <Text
                    style={{
                      fontWeight: "800",
                      fontSize: 19,
                      letterSpacing: 2,
                      marginBottom: 10,
                    }}
                  >
                    Tips
                  </Text>
                  <View>
                    <ScrollView horizontal={true}>
                      {tips?.data?.data?.map((data, key) => (
                        <View
                          style={[
                            {
                              backgroundColor: "#E5E4E2",
                              width: 200,
                              height: 150,
                              paddingHorizontal: 20,
                              paddingVertical: 10,
                              borderRadius: 15,
                            },
                            key === tips?.data?.data?.length - 1
                              ? {}
                              : { marginRight: 20 },
                          ]}
                          key={key}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginBottom: 15,
                            }}
                          >
                            <Image
                              resizeMode="contain"
                              style={{
                                height: 30,
                                width: 30,
                                borderRadius: 30 / 2,
                                marginRight: 10,
                              }}
                              source={{ uri: data?.user?.avatar?.small?.url }}
                            />
                            <Text style={{ fontWeight: "700" }}>
                              {data?.user?.username}
                            </Text>
                          </View>
                          <Text style={{ fontWeight: "700", fontSize: 13 }}>
                            {data?.text}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </View>
                <Divider color="#08A882" width={1} />
              </>
            ) : (
              <></>
            )}
            {/* //--------------
        //Q&A and Review container
        //--------------------- */}
            <View style={{ padding: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {options.map((data, key) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => setChoose(data.title)}
                  >
                    <Text
                      style={[
                        { fontWeight: "800", fontSize: 23, marginRight: 15 },
                        choose === data.title
                          ? {
                              borderBottomWidth: 3,
                              borderColor: "#08A882",
                              color: "#08A882",
                            }
                          : { color: "black" },
                      ]}
                    >
                      {data.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {choose === "Reviews" ? (
              reviews?.data?.data ? (
                <Reviews reviews={reviews} details={details} />
              ) : (
                <View
                  style={{
                    height: 200,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "800", fontSize: 15 }}>
                    Sorry! there are no reviews
                  </Text>
                </View>
              )
            ) : qna?.data?.questions ? (
              <QandA qna={qna} />
            ) : (
              <View
                style={{
                  height: 200,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "800", fontSize: 15 }}>
                  Sorry! there are no Q & A
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <LoadingDetails />
      )}
    </View>
  );
};

export default HotelDetails;

const styles = StyleSheet.create({});
