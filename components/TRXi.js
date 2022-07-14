import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import Filter from "../components/filter";
import SECTIONS from "../components/MOCK_API";
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TextInput,
  StyleSheet,
  ScrollView,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import { GetTrans } from "../GraphQL/Queries";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const TRX = () => {
  const { error, loading, data } = useQuery(GetTrans);
  const [users, setUsers] = useState("");
  const [users1, setUsers1] = useState({});

  const Datta = [];
  useEffect(() => {
    data.dates.map((data) => {
      Datta.push(data);
    });
    setUsers(Datta);

    users.map((ma) => {
      ma.books.map((datas) => {
        setUsers1(datas);
      });
    });

    console.log(users1);
  }, [data]);

  const [loaded] = useFonts({
    Montserrat: require("../assets/fonts/Oxanium-SemiBold.ttf"),
    PoppinsM: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsR: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={"pink"} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={"pink"} />
      </View>
    );
  } else {
    () => setUsers(data.dates);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{ fontFamily: "Montserrat", fontSize: 20, color: "orange" }}
        >
          Helli<Text style={{ color: "black" }}>carrier</Text>
        </Text>
        <Image source={require("../assets/h1.jpg")} style={styles.img} />
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.input}>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="Search your History"
            style={{ fontFamily: "PoppinsR" }}
            onChangeText={(value) => searchCampaign(value)}
          />
        </View>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ height: 40 }}
          >
            {Filter.map((filter, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => listed(filter)}>
                  <View style={styles.filter}>
                    <Text>{filter}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ marginVertical: 5, fontFamily: "PoppinsR" }}>
              Transactions
            </Text>
            <Text>
              Last 7 days <Text>▾</Text>
            </Text>
          </View>
        </View>
        <View style={{ height: 100, width: 100, backgroundColor: "pink" }}>
          {users.map((ma) => {
            return (
              <View>
                <Text>{ma.id}</Text>
                {ma.books.map((ig) => {
                  return (
                    <View>
                      <Text>{ig.name}</Text>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
        <SectionList
          style={{ height: "90%" }}
          keyExtractor={(item, index) => index.toString()}
          stickySectionHeadersEnabled={true}
          sections={users1}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 6,
                  marginBottom: 15,
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={[styles.Avatar, { backgroundColor: generateColor() }]}
                >
                  <Text style={{ color: "white", fontSize: 17 }}>
                    {item.AV}
                  </Text>
                </View>

                <View
                  style={{
                    width: "85%",
                    marginLeft: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ marginTop: 5, color: "grey", fontSize: 13 }}>
                      {item.category}
                    </Text>
                  </View>
                  <View>
                    <View style={{ width: 90 }}>
                      <Text
                        style={{
                          color: item.type === "Debit" ? "#B22222" : "green",
                          fontSize: 14,
                          fontFamily: "PoppinsM",
                        }}
                      >
                        ₦{item.amount}.00
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: item.type === "Debit" ? "#B22222" : "green",
                        marginTop: 5,
                        fontSize: 13,
                      }}
                    >
                      {item.type}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={({ section }) => (
            <View style={{ backgroundColor: "green", height: 800 }}>
              <Text>vkuyfkufkufuk</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: 5,
                width: "150%",
              }}
            >
              <Text style={{ fontSize: 13, fontFamily: "PoppinsM" }}>
                {section.title}
              </Text>
              <View
                style={{
                  height: 0.5,
                  backgroundColor: "grey",
                  width: "100%",
                  alignSelf: "center",
                  marginVertical: 10,
                }}
              />
            </View>
          )}
        ></SectionList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ffffff50",
  },
  header: {
    height: "10%",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  img: {
    height: 42,
    width: 42,
    borderRadius: 42,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 1,
    justifyContent: "center",
    padding: 10,
    borderWidth: 0.5,
    borderColor: "grey",
  },
  filter: {
    backgroundColor: "white",
    elevation: 2,
    height: 30,
    width: 70,
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  Avatar: {
    height: 45,
    width: 45,
    elevation: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TRX;
