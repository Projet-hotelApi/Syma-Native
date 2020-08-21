import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const FAQ = () => {
  return (
    <View style={styles.container}>
      <Text>Présentation de l'entreprise .... frais de port etc cf Vinted</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default FAQ;
