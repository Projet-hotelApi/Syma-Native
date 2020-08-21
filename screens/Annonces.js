import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Annonces = ({ data, id }) => {
  const navigation = useNavigation();

  // CHECKER PHOTO
  // title ternaire + 20 caractères
  return (
    <View style={styles.container}>
      <View style={styles.annonces}>
        <Text style={styles.creator}>{data.creator.username}</Text>
        {data.picture[0] && (
          <Image style={styles.imgProfile} source={{ uri: data.picture[0] }} />
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Annonce", { id: id });
          }}
        >
          <Image style={styles.imgAnnonce} source={{ uri: data.picture[0] }} />
        </TouchableOpacity>
        <View style={styles.infoDiv}>
          <Text>{data.price} €</Text>
          <TouchableOpacity>
            {/* onPress=> Ajout favoris */}
            <AntDesign name="hearto" size={18} color="#78244d" />
          </TouchableOpacity>
        </View>

        <View style={styles.informationsDiv}>
          {/* {data.title.length <= 20 ?} */}
          {/* moment date */}
          <Text style={styles.titleAnnonce}>{data.title}</Text>
          <Text style={styles.informationsDivText}>
            {data.brand} / {data.size}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annonces: {
    borderColor: "red",
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    height: 300,
    justifyContent: "space-between",
  },
  creator: {
    paddingLeft: 10,
    paddingBottom: 5,
  },
  imgProfile: {
    width: 10,
    width: 10,
  },
  imgAnnonce: {
    width: "80%",
    height: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  infoDiv: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
  },
  informationsDiv: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  informationsDivText: {
    fontSize: 12,
  },
});
export default Annonces;
