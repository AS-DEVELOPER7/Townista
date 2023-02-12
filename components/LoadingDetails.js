import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";

const LoadingDetails = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        borderRadius: 10,
        height: "100%",
        backgroundColor: "white",
        // alignItems: "center",
        // position: "relative",
      }}
    >
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View
        style={{
          borderRadius: 10,
          height: "90%",
        }}
      >
        <ScrollView scrollEnabled={true}>
          {/* //--------------------
        //back and favourite button
        //-------------------- */}

          <View
            style={{
              borderRadius: 10,
              position: "relative",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderRadius: 10,
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
              >
                <MaterialIcons
                  name="favorite-outline"
                  size={27}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            {/* //-----------
          // top image
          //---------- */}
            <View
              style={{
                borderRadius: 10,
                width: "100%",
                height: 250,
                backgroundColor: "#E5E4E2",
              }}
            />
          </View>
          {/* //---------
        //rating, name,ranking container
        //------------ */}
          <View
            style={{
              borderRadius: 10,
              alignItems: "flex-start",
              width: "100%",
              padding: 15,
              height: 100,
              justifyContent: "space-evenly",
              // backgroundColor: "black",
            }}
          >
            <View
              style={{
                borderRadius: 10,
                width: "95%",
                backgroundColor: "#E5E4E2",
                height: 25,
                borderRadius: 5,
              }}
            />

            <View
              style={{
                borderRadius: 10,
                width: 200,
                height: 20,
                backgroundColor: "#E5E4E2",
              }}
            />
          </View>
          {/* //----------
        //close and open now container 
        //----------- */}

          <View
            style={{
              borderRadius: 10,
              width: "100%",
              justifyContent: "space-evenly",
              height: 100,
            }}
          >
            <Divider color="#08A882" width={1} />
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "#E5E4E2",
                width: 100,
                height: 15,
              }}
            />

            <Divider color="#08A882" width={1} />
          </View>

          {/* //-------------
        //Description container
        //------------- */}
          <View
            style={{
              borderRadius: 10,
              padding: 15,
            }}
          >
            {/* <Text
            style={{
                borderRadius:10,
              textAlign: "center",
              fontWeight: "900",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            ABOUT US
          </Text> */}

            <View
              style={{
                borderRadius: 10,
                marginBottom: 10,
                backgroundColor: "#E5E4E2",
                height: 20,
                width: 150,
              }}
            />
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "#E5E4E2",
                height: 200,
                width: "95%",
              }}
            />
          </View>
          <Divider color="#08A882" width={1} />

          {/* //----------------
          //contact container
          //---------------- */}
          <View
            style={{
              borderRadius: 10,
              width: "100%",
              padding: 15,
            }}
          >
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "#E5E4E2",
                width: "95%",
                height: 20,
              }}
            />
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "#E5E4E2",
                width: "95%",
                height: 20,
                marginVertical: 15,
              }}
            />
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "#E5E4E2",
                width: "95%",
                height: 20,
              }}
            />

            <View
              style={{
                width: "100%",
                height: 200,
                borderRadius: 20,
                overflow: "hidden",
                marginTop: 20,
                backgroundColor: "#E5E4E2",
              }}
            />
          </View>
          <Divider color="#08A882" width={1} />
          {/* //--------------
        //Q&A and Review container
        //--------------------- */}
          <View
            style={{
              borderRadius: 10,
              padding: 15,
            }}
          >
            <View
              style={{
                borderRadius: 10,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#E5E4E2",
                  height: 20,
                  width: 100,
                  marginRight: 20,
                }}
              />
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#E5E4E2",
                  height: 20,
                  width: 100,
                }}
              />
            </View>
            <View
              style={{
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#E5E4E2",
                  width: "95%",
                  height: 150,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LoadingDetails;

const styles = StyleSheet.create({});
