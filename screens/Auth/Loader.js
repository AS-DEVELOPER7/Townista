import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
const Loader = ({ navigation }) => {
  return (
    <View style={{ height: "100%", width: "100%", position: "relative" }}>
      {/* <StatusBar barStyle={"default"} /> */}
      <Image
        resizeMode="cover"
        style={{ height: "100%", width: "100%", zIndex: 1 }}
        source={require("../../assets/loader.png")}
      />
      <Image
        source={require("../../assets/3.png")}
        resizeMode="contain"
        style={{
          width: "100%",
          height: 500,
          zIndex: 10,
          position: "absolute",
          top: 0,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 100,
          zIndex: 10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ width: "70%" }}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text
            style={{
              backgroundColor: "#08A882",
              width: "100%",
              paddingVertical: 15,
              textAlign: "center",
              color: "white",
              fontWeight: "900",
              borderRadius: 20,
              fontSize: 17,
            }}
          >
            LOGIN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ width: "70%", marginTop: 20 }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text
            style={{
              backgroundColor: "white",
              width: "100%",
              paddingVertical: 15,
              textAlign: "center",
              color: "#08A882",
              fontWeight: "900",
              borderRadius: 20,
              fontSize: 17,
            }}
          >
            SIGN UP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
