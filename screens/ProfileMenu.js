import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileMenu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnProfileMenu}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Text style={styles.btnProfileMenuText}>Mon Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnProfileMenu}
        onPress={() => {
          navigation.navigate("Commandes");
        }}
      >
        <Text style={styles.btnProfileMenuText}>Mes commandes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnProfileMenu}
        onPress={() => {
          navigation.navigate("Dressing");
        }}
      >
        <Text style={styles.btnProfileMenuText}>Mon dressing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnProfileMenu}
        onPress={() => {
          navigation.navigate("Evaluations");
        }}
      >
        <Text style={styles.btnProfileMenuText}>Mes évaluations</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnProfileMenu}
        onPress={() => {
          navigation.navigate("FAQ");
        }}
      >
        <Text style={styles.btnProfileMenuText}>FAQ</Text>
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
  btnProfileMenu: {
    borderColor: "#78244d",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#78244d",
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
    height: 100,
  },
  btnProfileMenuText: {
    color: "white",
    paddingTop: 5,
    textAlign: "center",
    // textAlignVertical: "center",
  },
});
export default ProfileMenu;
