import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const Sections = (props) => {
  const SECTIONS = props.data;
  return (
    <View>
      <SectionList
        style={{ height: "90%" }}
        keyExtractor={(item, index) => index.toString()}
        stickySectionHeadersEnabled={true}
        sections={SECTIONS}
        renderItem={({ item }) => (
          <View>
            <View style={styles.v1}>
              <View
                style={[styles.Avatar, { backgroundColor: generateColor() }]}
              >
                <Text style={{ color: "white", fontSize: 17 }}>{item.AV}</Text>
              </View>

              <View style={styles.v2}>
                <View>
                  <Text style={{ fontSize: 16 }}>{item.name}</Text>
                  <Text style={{ marginTop: 5, color: "grey", fontSize: 13 }}>
                    {item.category}
                  </Text>
                </View>
                <View>
                  <View style={{ width: 90 }}>
                    <Text
                      style={[
                        {
                          color: item.type === "Debit" ? "#B22222" : "green",
                        },
                        styles.text_red,
                      ]}
                    >
                      ₦{item.amount}.00
                    </Text>
                  </View>
                  <Text
                    style={[
                      {
                        color: item.type === "Debit" ? "#B22222" : "green",
                      },
                      styles.text_green,
                    ]}
                  >
                    {item.type}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={({ section }) => (
          <View style={{ backgroundColor: "white", height: 500 }} />
            
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sticky}>
            <Text style={{ fontSize: 13, fontFamily: "PoppinsM" }}>
              {section.title}
            </Text>
            <View
              style={{
                height: 0.5,
                backgroundColor: "grey",
                width: "100%",
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 8,
              }}
            />
          </View>
        )}
      ></SectionList>
    </View>
  );
};

const styles = StyleSheet.create({
  v1: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  v2: {
    width: "85%",
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text_red: {
    fontSize: 14,
    fontFamily: "PoppinsM",
  },
  text_green: { marginTop: 5, fontSize: 13 },
  sticky: {
    backgroundColor: "white",
    paddingHorizontal: 5,
    width: "150%",
    paddingTop: 5,
  },
  Avatar: {
    height: 45,
    width: 45,
    elevation: 3,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Sections;
