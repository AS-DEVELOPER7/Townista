import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { Image } from "react-native";
import { Divider } from "@rneui/themed";

import Toast from "react-native-simple-toast";
import { useIsFocused } from "@react-navigation/native";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";
const Account = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const storageref = ref(storage, user.uid);
  const focused = useIsFocused();
  const [image, setImage] = useState();
  // console.log(user);
  const handleSingout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        Toast.show("Logout successfully!", Toast.SHORT);
      })
      .catch((error) => {
        // An error happened.
        Toast.show(
          "Something went wrong. Please try again later!",
          Toast.SHORT
        );
      });
  };
  const info = [
    {
      icon: Feather,
      iconName: "user",
      title: user.displayName,
      subject: "Username",
    },
    {
      icon: Ionicons,
      iconName: "mail-outline",
      title: user.email,
      subject: "Email",
    },
  ];

  useEffect(() => {
    // this function runs everytym we go to account screen and gets user profile image
    getDownloadURL(storageref).then((data) => {
      setImage(data);
      // console.log(data);
    });
  }, [focused]);
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        padding: 15,
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Text style={{ fontWeight: "900", fontSize: 18, letterSpacing: 2 }}>
          My profile
        </Text>

        <TouchableOpacity
          style={{
            // backgroundColor: "black",
            position: "absolute",
            right: 0,
          }}
          onPress={() => navigation.navigate("AccountEdit")}
        >
          <AntDesign name="edit" size={24} color="#08A882" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        {!user.photoURL ? (
          <Image
            source={require("../assets/blank-profile-picture.png")}
            resizeMode="contain"
            style={{ height: 80, width: 80, borderRadius: 80 / 2 }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={{ height: 80, width: 80, borderRadius: 80 / 2 }}
          />
        )}
        <Text style={{ marginLeft: 20, fontWeight: "700", fontSize: 15 }}>
          {user.displayName}
        </Text>
      </View>
      <Text style={{ fontWeight: "900", fontSize: 18, marginVertical: 10 }}>
        Personal Info
      </Text>
      <View style={{ marginVertical: 20 }}>
        {info.map((data, key) => (
          <View key={key}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <data.icon name={data.iconName} size={25} color="#08A882" />
              <View style={{ alignItems: "flex-start", marginLeft: 20 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#71797E",
                    marginBottom: 5,
                  }}
                >
                  {data.subject}
                </Text>
                <Text style={{ fontWeight: "700", fontSize: 16 }}>
                  {data.title}
                </Text>
              </View>
            </View>
            {key == 0 ? (
              <Divider width={1} style={{ marginVertical: 15 }} />
            ) : (
              <></>
            )}
          </View>
        ))}
      </View>
      {/* <Text style={{ fontWeight: "900", fontSize: 18, marginVertical: 10 }}>
        Preference
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
      >
        <MaterialCommunityIcons name="currency-eth" size={25} color="#08A882" />
        <View style={{ alignItems: "flex-start", marginLeft: 20 }}>
          <Text
            style={{
              fontWeight: "600",
              color: "#71797E",
              marginBottom: 5,
            }}
          >
            Currency
          </Text>
          <Text style={{ fontWeight: "700", fontSize: 16 }}>INR</Text>
        </View>
      </View> */}
      <Divider width={1} style={{ marginBottom: 15 }} />
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => handleSingout()}
      >
        <MaterialIcons name="logout" size={24} color="#08A882" />
        <Text style={{ fontWeight: "700", fontSize: 18, marginLeft: 20 }}>
          Logout
        </Text>
      </TouchableOpacity>
      {/* <Divider width={1} style={{ marginVertical: 15 }} /> */}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
