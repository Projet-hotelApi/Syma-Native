import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

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
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnFAQ}>
        <Text style={styles.btnFAQText}>Acheter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnFAQ}>
        <Text style={styles.btnFAQText}>Confiance et sécurité</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnFAQ}>
        <Text style={styles.btnFAQText}>Vendre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnFAQ}>
        <Text style={styles.btnFAQText}>Communauté</Text>
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
});
export default FAQ;
