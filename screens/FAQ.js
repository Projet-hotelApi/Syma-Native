import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const FAQ = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnFAQ}
        onPress={() => {
          navigation.navigate("FaqVendre");
        }}
      >
        <Text style={styles.btnFAQText}>Vendre</Text>
        <AntDesign name="skin" size={40} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnFAQ}
        onPress={() => {
          navigation.navigate("FaqAcheter");
        }}
      >
        <Text style={styles.btnFAQText}>Acheter</Text>
        <Octicons
          name="credit-card"
          size={40}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnFAQ}
        onPress={() => {
          navigation.navigate("FaqCommunaute");
        }}
      >
        <Text style={styles.btnFAQText}>Communauté</Text>
        <MaterialCommunityIcons
          name="google-circles-communities"
          size={40}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "center",
  },
  btnFAQ: {
    borderColor: "#78244d",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#78244d",
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
    height: 100,
  },
  btnFAQText: {
    color: "white",
    paddingTop: 5,
    textAlign: "center",
  },
  icon: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 10,
  },
});
export default FAQ;
