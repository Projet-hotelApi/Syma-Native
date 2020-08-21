import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

const Favoris = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* TERNAIRE : */}
      {/* SI pas de favoris => afficher pas de favoris en cours */}
      {/* SI favoris => afficher favoris */}
      <Text>Mes favoris</Text>
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
export default Favoris;
