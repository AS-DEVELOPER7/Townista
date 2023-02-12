import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "@rneui/themed";
import { Image } from "react-native";
import { useAnswersQuery, useQuestionsQuery } from "../app/services";
import { useStateContext } from "../context/StateContext";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Answers from "../components/Answers";

const QandA = ({ navigation }) => {
  const { locationID } = useStateContext();
  const questions = useQuestionsQuery(locationID);
  console.log(questions);
  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 15,
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={27} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            marginLeft: 20,
            color: "#08A882",
          }}
        >
          Q & A
        </Text>
      </View>
      <View style={{ height: "85%", paddingBottom: 20 }}>
        <ScrollView>
          {questions?.data?.questions?.map((data, key) => (
            <View key={key} style={{ marginBottom: 15 }}>
              <View style={{ width: "90%", marginLeft: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 40 / 2,
                      marginRight: 10,
                    }}
                    source={{ uri: data?.member?.avatar_url }}
                  />
                  <Text style={{ fontWeight: "800" }}>
                    {data?.member?.display_name}
                  </Text>
                </View>
                <Text
                  style={{ marginTop: 10, fontSize: 16, fontWeight: "800" }}
                >
                  {data?.question}
                </Text>

                <Answers id={data?.id} />
              </View>
              {questions?.data?.questions?.length - 1 !== key ? (
                <Divider width={1} style={{ marginVertical: 10 }} />
              ) : (
                <></>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default QandA;

const styles = StyleSheet.create({});
