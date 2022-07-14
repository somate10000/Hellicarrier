import React, { useEffect } from "react";
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
import { useFonts } from "expo-font";
import SECTIONS from "./MOCK_API";

const Filter = [
  "Name",
  "Date",
  "Type",
  "Status",
  "5k - 10k",
  "10k - 50k",
  "50k - 100k",
];

export default function QApp() {
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

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{ fontFamily: "Montserrat", fontSize: 20, color: "orange" }}
        >
          Helli<Text style={{ color: "black" }}>carrier</Text>
        </Text>
        <Image
          source={require("../assets/h1.jpg")}
          style={{
            height: 42,
            width: 42,
            borderRadius: 42,
          }}
        />
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
          <Text style={{ marginVertical: 5, fontFamily: "PoppinsR" }}>
            {" "}
            Transactions
          </Text>

          <SectionList
            style={{ height: "90%" }}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={true}
            sections={SECTIONS}
            renderItem={({ item }) => (
              <View>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <View
                    style={[
                      styles.Avatar,
                      { backgroundColor: generateColor() },
                    ]}
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
                      <Text
                        style={{ marginTop: 5, color: "grey", fontSize: 13 }}
                      >
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
              <View style={{ backgroundColor: "white", width: "150%" }}>
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
      </View>
    </SafeAreaView>
  );
}

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
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
