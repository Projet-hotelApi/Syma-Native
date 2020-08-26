import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import Activity from "../components/Activity";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ProfileVendeur = () => {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://syma-projet.herokuapp.com/ad/user/" + params.id
      );
      //console.log("response", response.data);
      //console.log(response.data.articles[0]._id); // OK
      //console.log(response.data.articles.title); // NON
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const reviewsTotal = () => {
  //   let rating = 0;
  //   for (let i = 0; i < data.reviews.length; i++) {
  //     rating += data.reviews[i].ratingNumber;
  //   }
  //   rating = rating / data.reviews.length;
  //   rating = Number(rating.toFixed());
  //   let starsTab = [];
  //   for (let i = 0; i < 5; i++) {
  //     if (i < rating) {
  //       starsTab.push(
  //         <Ionicons key={i} name="ios-star" size={20} color="#78244d" />
  //       );
  //     } else {
  //       starsTab.push(
  //         <Ionicons key={i} name="ios-star" size={20} color="grey" />
  //       );
  //     }
  //   }
  //   return starsTab;
  // };

  return isLoading ? (
    <Activity />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.vendeurInfo}>
          <Image style={styles.imgProfile} source={{ uri: data.picture[0] }} />
          <View>
            <Text style={styles.vendeurUsername}>{data.username}</Text>
            {/* {data.reviews.length === 0 ? (
              <Text>Pas d'évaluations</Text>
            ) : (
              <Text>{reviewsTotal()}</Text>
            )} */}
          </View>
        </View>
        <View style={styles.vendeurVille}>
          <Text>Ville : {data.personnal.city} </Text>
          <TouchableOpacity
            style={styles.contacter}
            onPress={() => {
              navigation.navigate("Message", { id: data._id });
            }}
          >
            <Text style={styles.contacterText}>Contacter {data.username}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.dressing}>Dressing</Text>

          <FlatList
            data={data.articles}
            keyExtractor={(item) => item._id}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <View style={styles.annonces}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Annonce", { id: item._id });
                    }}
                  >
                    <Image
                      style={styles.imageArticle}
                      source={{ uri: item.picture[0] }}
                    />
                  </TouchableOpacity>
                  <View style={styles.caracteristique}>
                    <View>
                      <Text style={styles.price}>{item.price} €</Text>
                      <Text style={styles.divers}>
                        {" "}
                        {item.brand.length <= 13
                          ? item.brand
                          : item.brand.substring(0, 13) + " ..."}
                      </Text>
                      <Text style={styles.divers}>{item.size} </Text>
                    </View>
                    <View>
                      <AntDesign name="hearto" size={18} color="#78244d" />
                    </View>
                  </View>
                </View>
              );
            }}
          />
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
  vendeurInfo: {
    marginTop: 10,
    width: "100%",
    height: 80,
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 10,
  },
  imgProfile: {
    width: 70,
    height: 70,
    marginRight: 20,
    borderRadius: 50,
  },
  vendeurUsername: {
    fontWeight: "bold",
  },
  vendeurVille: {
    marginTop: 10,
    width: "100%",
    height: 80,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  contacter: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    width: 250,
    height: 40,
    backgroundColor: "#78244d",
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
  contacterText: {
    color: "white",
  },
  dressing: {
    marginTop: 5,
    marginBottom: 15,
  },
  imageArticle: {
    width: "90%",
    height: 200,
    marginLeft: "auto",
    marginRight: "auto",
  },
  caracteristique: {
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  price: {
    fontWeight: "bold",
    paddingLeft: 10,
  },
  divers: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  annonces: {
    marginBottom: 25,
    width: "45%",
    height: 250,
  },
});
export default ProfileVendeur;
