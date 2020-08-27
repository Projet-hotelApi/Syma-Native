import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Annonces = ({ data, id }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.annonces}>
        <View style={styles.creatorAnnonce}>
          {data.creator.picture[0] ? (
            <Image
              style={styles.imgProfile}
              source={{ uri: data.creator.picture[0] }}
            />
          ) : null}
          <Text style={styles.creator}>{data.creator.username}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Annonce", { id: id });
          }}
        >
          <Image style={styles.imgAnnonce} source={{ uri: data.picture[0] }} />
        </TouchableOpacity>
        <View style={styles.infoDiv}>
          <Text>{data.price} €</Text>
          <TouchableOpacity
            // Parse = tableau
            // stock dans Async => string donc stringifyé
            onPress={async () => {
              // check les favoris
              //let remove = await AsyncStorage.removeItem("favoris");
              let currentFav = await AsyncStorage.getItem("favoris");
              console.log("currentFav", currentFav);
              if (currentFav === null) {
                let currentFavTab = [];
                currentFavTab.push(data);
                let currentFavTabStringifié = JSON.stringify(currentFavTab);
                await AsyncStorage.setItem("favoris", currentFavTabStringifié);
                alert("Annonce ajoutée aux favoris");
              } else {
                let currentFavTab = JSON.parse(currentFav);
                //console.log("currentFavTab1", currentFavTab);
                let isAlreadyFav = false;
                // check si quand on clic, on l'a deja dans les fav
                for (let i = 0; i < currentFavTab.length; i++) {
                  if (currentFavTab[i]._id === data._id) {
                    isAlreadyFav = true;
                  }
                }
                if (isAlreadyFav === false) {
                  currentFavTab.push(data);
                  console.log("currentFavTab2", currentFavTab);
                  currentFavTab = JSON.stringify(currentFavTab);
                  console.log("stringifié", currentFavTab);
                  await AsyncStorage.setItem("favoris", currentFavTab);
                  alert("Annonce ajoutée aux favoris");
                }
              }
            }}
          >
            <AntDesign name="hearto" size={18} color="#78244d" />
          </TouchableOpacity>
        </View>

        <View style={styles.informationsDiv}>
          <Text style={styles.titleAnnonce}>
            {data.title.length <= 20
              ? data.title
              : data.title.substring(0, 20) + " ..."}
          </Text>

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
    marginBottom: 25,
    width: "100%",
    height: 250,
  },
  creator: {
    paddingLeft: 10,
    paddingBottom: 5,
  },
  creatorAnnonce: {
    paddingLeft: 10,
    paddingBottom: 5,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  imgProfile: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  imgAnnonce: {
    width: "80%",
    height: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  infoDiv: {
    flexDirection: "row",
    marginTop: -25,
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
