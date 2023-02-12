import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Toast from "react-native-simple-toast";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  // const provider = new GoogleAuthProvider();

  const handleEmailPassSignin = () => {
    setEmailError(false);

    if (email === "") {
      setEmailError(true);
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Toast.show("Check your email", Toast.SHORT, Toast.TOP);

          setEmailError(false);

          setEmail("");

          navigation.navigate("SignIn");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.group("error code", errorCode);
          console.group("error message", errorMessage);
          Toast.show("Please check Your email and password", Toast.SHORT);
        });
    }
  };
  // const handleGoogleSignin = () => {
  //   signInWithPopup(auth, new GoogleAuthProvider())
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.group("user", user);
  //       console.group("token", token);
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };
  return (
    <View
      style={{
        backgroundColor: "#08A882",
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
      }}
    >
      <StatusBar backgroundColor="#08A882" />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "white",
          padding: 10,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50 / 2,
          position: "absolute",
          top: 10,
          left: 10,
        }}
      >
        <Ionicons name="chevron-back" size={24} color="#08A882" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "900",
          color: "white",
          letterSpacing: 25,
          textAlign: "center",
          marginBottom: 55,
        }}
      >
        Fogot Password
      </Text>
      <View
        style={{
          backgroundColor: "white",
          height: "70%",
          width: "100%",
          borderTopStartRadius: 50,
          padding: 20,
        }}
      >
        <ScrollView style={{ height: "100%" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <View style={{ width: "80%" }}>
              <Text style={styles.input_heading}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                // placeholder="xyz@gmail.com"
                keyboardType="email-address"
                style={styles.input_text}
              />
              {emailError ? (
                <Text style={{ color: "red", fontWeight: "600" }}>
                  Please Enter email Id
                </Text>
              ) : (
                <></>
              )}
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{ width: "70%" }}
              onPress={() => handleEmailPassSignin()}
              // disabled={isDisabled}
            >
              <Text
                style={{
                  backgroundColor: "#08A882",
                  width: "100%",
                  paddingVertical: 15,
                  textAlign: "center",
                  color: "white",
                  fontWeight: "900",
                  borderBottomRightRadius: 20,
                  borderTopLeftRadius: 20,
                  fontSize: 17,
                  marginTop: 40,
                }}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  input_text: {
    borderColor: "#bcbcbc",
    borderBottomWidth: 1,
    height: 40,
    fontSize: 18,
    width: "100%",
  },
  input_heading: {
    fontSize: 18,
    fontWeight: "900",
  },
});
