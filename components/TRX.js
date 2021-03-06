import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import Filter from "../components/filter";
import Sections from "./Sections";
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

const TRX = () => {
  const { error, loading, data } = useQuery(GetTrans);
  console.log(error);

  const Datta = [];

  const [loaded] = useFonts({
    Montserrat: require("../assets/fonts/Oxanium-SemiBold.ttf"),
    PoppinsM: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsR: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded ) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={"white"} />
      </View>
    );
  }
  if (!data) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={"white"} />
      </View>
    );
  } else {
    const Array = data.dates;
    Datta.splice(0, Datta.length, ...Array);
    console.log(Array);
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
          <Sections data={Datta} />
        </View>
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
});

export default TRX;
