import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/core";

const Message = () => {
  const { params } = useRoute();
  // console.log(id);
  return (
    <View style={styles.container}>
      <Text>Messagerie en construction, merci de patienter!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // #F35960
    backgroundColor: "white",
  },
});

export default Message;
