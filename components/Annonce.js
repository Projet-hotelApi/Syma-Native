// CAROUSSEL !!!!!!! update plusieurs photos !!

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Activity from "./Activity";
import Carousel from "react-native-snap-carousel";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

import moment from "moment";
require("moment/locale/fr");

const Annonce = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState(false);
  const { params } = useRoute();
  const [favoris, setFavoris] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://syma-projet.herokuapp.com/ad/informations/" + params.id
      );
      //console.log("RESPONSE", response.data);
      //console.log(response.data._id); OK
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reviewsTotal = () => {
    let rating = 0;
    for (let i = 0; i < data.creator.reviews.length; i++) {
      rating += data.creator.reviews[i].ratingNumber;
    }
    rating = rating / data.creator.reviews.length;
    rating = Number(rating.toFixed());
    let starsTab = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starsTab.push(
          <Ionicons key={i} name="ios-star" size={20} color="#78244d" />
        );
      } else {
        starsTab.push(
          <Ionicons key={i} name="ios-star" size={20} color="grey" />
        );
      }
    }
    return starsTab;
  };

  return isLoading ? (
    <Activity />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        {/* <ImageBackground style={styles.image} source={{ uri: data.picture[0] }}>
          <View style={styles.favorisDiv}>
            <AntDesign name="heart" size={40} color="black" />
          </View>
        </ImageBackground> */}
        <Image style={styles.image} source={{ uri: data.picture[0] }} />
        <TouchableOpacity
          style={styles.creator}
          onPress={() => {
            navigation.navigate("ProfileVendeur", {
              id: data.creator._id,
            });
          }}
        >
          {data.picture[0] ? (
            <Image
              style={styles.imgCreator}
              source={{ uri: data.creator.picture[0] }}
            />
          ) : null}
          <View style={styles.infoUser}>
            <Text style={styles.creatorProfile}>{data.creator.username}</Text>
            {data.creator.reviews.length === 0 ? (
              <Text>Pas d'évaluations</Text>
            ) : (
              <Text>{reviewsTotal()}</Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.description}>
          <Text style={styles.descriptionTitle}>{data.title}</Text>
          <Text>
            {data.size} - {data.condition} - {data.brand}
          </Text>
          <Text>{data.price} € </Text>
        </View>
        <TouchableOpacity
          style={styles.btnAcheter}
          onPress={() => {
            navigation.navigate("Acheter", {
              id: data._id,
              title: data.title,
              username: data.creator.username,
              price: data.price,
            });
          }}
        >
          <Text style={styles.btnAcheterText}>Acheter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnAcheter}
          onPress={() => {
            navigation.navigate("Message", { id: data.creator._id });
          }}
        >
          <Text style={styles.btnAcheterText}>Contacter le vendeur</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnFavoris}
          onPress={async () => {
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
              //console.log("currentFavTab1", currentFavTab); //OK
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
          <View style={styles.btnFavorisView}>
            <AntDesign name="hearto" size={18} color="#78244d" />
            <Text style={styles.btnFavorisText}>Favoris</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.presentation}
          onPress={() => {
            setDescription(!description);
          }}
        >
          <Text style={styles.presentationText}>
            {" "}
            PRESENTATION DE L'ARTICLE
          </Text>
          <Text numberOfLines={description ? null : 5}>{data.description}</Text>
        </TouchableOpacity>
        <View style={styles.created}>
          <Text> Ajouté le : </Text>
          <Text>{moment(data.created).format("DD-MM-YYYY")}</Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: "100%",
    height: 400,
  },
  creator: {
    marginLeft: 10,
    marginRight: 10,
    width: "40%",
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  creatorProfile: {
    fontWeight: "bold",
  },
  imgCreator: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  infoUser: {
    paddingLeft: 10,
  },
  description: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderColor: "transparent",
    justifyContent: "space-between",
  },
  descriptionTitle: {
    fontWeight: "bold",
  },
  btnAcheter: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    width: 200,
    height: 40,
    backgroundColor: "#78244d",
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAcheterText: {
    color: "white",
    fontSize: 18,
  },
  btnFavorisView: {
    flexDirection: "row",
    width: 80,
    height: 30,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    borderColor: "transparent",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  presentation: {
    marginTop: 15,
    width: "100%",
    height: 100,
  },
  presentationText: {
    fontSize: 12,
    marginBottom: 5,
  },
  created: {
    flexDirection: "row",
    width: 100,
  },
});
export default Annonce;

// Object {
//   "creator": "5f3c246dba424b00177c6e31",
// }
