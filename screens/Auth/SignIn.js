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
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Toast from "react-native-simple-toast";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHide, setPasswordHide] = useState(true);
  // const provider = new GoogleAuthProvider();

  const handleEmailPassSignin = () => {
    setEmailError(false);
    setPasswordError(false);
    if (email === "") {
      setEmailError(true);
    } else {
    }
    if (password == "") {
      setPasswordError(true);
      // setEmailError(false);
    } else {
    }

    if (!emailError && !passwordError) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          Toast.show("Login Successfull", Toast.SHORT, Toast.TOP);
          console.log(user);
          setEmailError(false);
          setPasswordError(false);
          setEmail("");
          setPassword("");
          navigation.navigate("TabNavigator");
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
        LOGIN
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
            {/*--------------------
            Email container
            -----------------------
             */}
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
            {/*--------------------
            password container
            -----------------------
             */}
            <View style={{ width: "80%", marginVertical: 40 }}>
              <Text style={styles.input_heading}>Password</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  value={password}
                  style={styles.input_text}
                  secureTextEntry={passwordHide}
                  onChangeText={(e) => setPassword(e)}
                  keyboardType="default"
                />
                <TouchableOpacity
                  onPress={() => setPasswordHide(!passwordHide)}
                >
                  {!passwordHide ? (
                    <Entypo name="eye" size={24} color="black" />
                  ) : (
                    <Entypo name="eye-with-line" size={24} color="black" />
                  )}
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={{ color: "red", fontWeight: "600" }}>
                  Please Enter Password
                </Text>
              ) : (
                <></>
              )}
              <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={{ fontWeight: "800" }}>Forgot Password ?</Text>
              </TouchableOpacity>
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
                }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 40, fontSize: 16 }}>
              Don't have any account?&nbsp;&nbsp;
              <Text
                style={{ fontWeight: "700" }}
                onPress={() => navigation.navigate("SignUp")}
              >
                SignUp
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  input_text: {
    borderColor: "#bcbcbc",
    borderBottomWidth: 1,
    height: 40,
    fontSize: 18,
    width: "97%",
  },
  input_heading: {
    fontSize: 18,
    fontWeight: "900",
  },
});
