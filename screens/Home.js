// flat list sur les annonces
// onPress sur une annonce on rejoint Annonce via id

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
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

export default Home;
