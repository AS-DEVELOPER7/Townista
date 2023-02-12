import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAnswersQuery } from "../app/services";
import { Image } from "react-native";
import { Divider } from "@rneui/themed";

const Answers = ({ id }) => {
  const answers = useAnswersQuery(id);
  console.log(answers);
  return (
    <View>
      {!answers?.data?.answers.length !== 0 ? (
        answers?.data?.answers?.map((data, key) => (
          <View key={key}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View
                style={{
                  backgroundColor: "#08A882",
                  height: "100%",
                  width: 2,
                  marginRight: 20,
                }}
              />
              <View>
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
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {data?.answer}
                </Text>
              </View>
            </View>
            {answers?.data?.answers?.length - 1 !== key ? (
              <Divider width={1} style={{ marginVertical: 10 }} />
            ) : (
              <></>
            )}
          </View>
        ))
      ) : (
        <></>
      )}
    </View>
  );
};

export default Answers;

const styles = StyleSheet.create({});
