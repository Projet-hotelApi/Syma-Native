import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

const Evaluations = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* TERNAIRE : */}
      {/* SI pas de evaluation => afficher pas de Evaluations en cours */}
      {/* SI evaluation => afficher Evaluations */}
      <Text>Mes Evaluations</Text>
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
export default Evaluations;
