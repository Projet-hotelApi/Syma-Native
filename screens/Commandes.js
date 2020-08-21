import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

const Commandes = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* TERNAIRE : */}
      {/* SI pas de commande => afficher pas de commandes en cours */}
      {/* SI commande => afficher commandes */}
      <Text>Mes commandes</Text>
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
export default Commandes;
