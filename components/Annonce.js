// button Acheter qui renvoie composant / screen acheter
// moment => date
// creator

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Activity from "./Activity";
import Carousel from "react-native-snap-carousel";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";

import moment from "moment";
require("moment/locale/fr");

// CAROUSSEL !!!!!!! update plusieurs photos !!

const Annonce = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState(false);
  const { params } = useRoute();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://syma-projet.herokuapp.com/ad/informations/" + params.id
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console;
      log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <Activity />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: data.picture[0] }} />
        <View style={styles.creator}>
          <Text>Photo + creator</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionTitle}>{data.title}</Text>
          <Text>
            {data.size} - {data.condition} - {data.brand}
          </Text>
          <Text>{data.price} € </Text>
        </View>
        <TouchableOpacity style={styles.btnAcheter}>
          <Text style={styles.btnAcheterText}>Acheter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFavoris}>
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
    marginTop: 5,
    width: "100%",
    height: 50,
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
