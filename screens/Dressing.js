import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

const Dressing = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* TERNAIRE : */}
      {/* SI pas de dressing => afficher pas de dressing en cours */}
      {/* SI dressing => afficher dressing */}
      <Text>Mon dressing</Text>
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
export default Dressing;
