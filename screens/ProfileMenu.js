import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

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
        <AntDesign name="profile" size={40} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnProfileMenu}
        onPress={() => {
          navigation.navigate("Commandes");
        }}
      >
        <Text style={styles.btnProfileMenuText}>Mes commandes</Text>
        <AntDesign
          name="shoppingcart"
          size={40}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnProfileMenu}
        onPress={() => {
          navigation.navigate("Ventes");
        }}
      >
        <Text style={styles.btnProfileMenuText}>Mes ventes</Text>
        <Entypo
          name="shopping-basket"
          size={40}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnProfileMenu}
        onPress={() => {
          navigation.navigate("Dressing");
        }}
      >
        <Text style={styles.btnProfileMenuText}>Mon dressing</Text>
        <MaterialCommunityIcons
          name="dresser"
          size={40}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnProfileMenu}
        onPress={() => {
          navigation.navigate("Evaluations");
        }}
      >
        <Text style={styles.btnProfileMenuText}>Mes évaluations</Text>
        <MaterialIcons
          name="rate-review"
          size={40}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnProfileMenu}
        onPress={() => {
          navigation.navigate("Favoris");
        }}
      >
        <Text style={styles.btnProfileMenuText}>Mes Favoris</Text>
        <MaterialIcons
          name="favorite"
          size={40}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnProfileMenu}
        onPress={() => {
          navigation.navigate("FAQ");
        }}
      >
        <Text style={styles.btnProfileMenuText}>FAQ</Text>
        <AntDesign
          name="questioncircleo"
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
  },
  icon: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 10,
  },
});
export default ProfileMenu;
