import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const QandA = ({ qna }) => {
  const navigation = useNavigation();

  return (
    <View style={{}}>
      {qna?.data?.questions?.map((data, key) =>
        key < 2 ? (
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
              <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "800" }}>
                {data?.question}
              </Text>
              {!data?.answers.length !== 0 ? (
                data?.answers?.map((data, key) => (
                  <View
                    style={{ flexDirection: "row", marginTop: 10 }}
                    key={key}
                  >
                    <View
                      style={{
                        backgroundColor: "#08A882",
                        height: "100%",
                        width: 2,
                        marginRight: 20,
                      }}
                    ></View>
                    <View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
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
                          fontWeight: "700",
                        }}
                      >
                        {data?.answer}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <></>
              )}
            </View>
            {key !== 1 ? (
              <Divider width={1} style={{ marginVertical: 10 }} />
            ) : (
              <></>
            )}
          </View>
        ) : (
          <View key={key}></View>
        )
      )}
      <TouchableOpacity
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
        }}
        onPress={() => {
          navigation.navigate("QandA");
        }}
      >
        <Text
          style={{
            borderWidth: 2,
            borderColor: "#08A882",
            borderRadius: 25,
            fontWeight: "700",
            fontSize: 18,
            paddingVertical: 10,
            width: "60%",
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          View All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QandA;

const styles = StyleSheet.create({});
