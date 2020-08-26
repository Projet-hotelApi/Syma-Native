import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, AsyncStorage } from "react-native";
import {
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native-gesture-handler";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

// REQUETE POUR AFFICHER ARTICLE

const Search = () => {
  const [article, setArticle] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState({});
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://syma-projet.herokuapp.com/ad/sort?title=" +
          article +
          "&priceMin=" +
          priceMin +
          "&priceMax=" +
          priceMax
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <View style={styles.container}>
      <View style={styles.recherche}>
        <TextInput
          style={styles.input}
          placeholder="ex : Veste en cuir"
          placeholderTextColor="#78244d"
          onChangeText={(text) => setArticle(text)}
        />
        <View style={styles.searchPrice}>
          <TextInput
            style={styles.inputPrice}
            placeholder="Prix Minimum"
            placeholderTextColor="#78244d"
            onChangeText={(text) => setPriceMin(text)}
          />
          <TextInput
            style={styles.inputPrice}
            placeholder="Prix Maximum"
            placeholderTextColor="#78244d"
            onChangeText={(text) => setPriceMax(text)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.btnSearch} onPress={fetchData}>
        <Text style={styles.btnSearchText}>Rechercher</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.recherche}>
        <TextInput
          style={styles.input}
          placeholder="Article par titre"
          placeholderTextColor="#78244d"
          onChangeText={(text) => setArticle(text)}
        />
        <View style={styles.searchPrice}>
          <TextInput
            style={styles.inputPrice}
            placeholder="Prix Minimum"
            placeholderTextColor="#78244d"
            onChangeText={(text) => setPriceMin(text)}
          />
          <TextInput
            style={styles.inputPrice}
            placeholder="Prix Maximum"
            placeholderTextColor="#78244d"
            onChangeText={(text) => setPriceMax(text)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.btnSearch} onPress={fetchData}>
        <Text style={styles.btnSearchText}>Rechercher</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View style={styles.result}>
              <View style={styles.creator}>
                <Text>{item.creator.username}</Text>
                <Image
                  style={styles.imgCreator}
                  source={{ uri: item.creator.picture[0] }}
                />
              </View>
              <Image
                style={styles.imgArticle}
                source={{ uri: item.picture[0] }}
              />

              <View style={styles.infoDiv}>
                <Text>{item.price} €</Text>
              </View>
              <TouchableOpacity
                style={styles.div}
                onPress={() => {
                  navigation.navigate("Annonce", { id: item._id });
                }}
              >
                <Text style={styles.titleAnnonce}>
                  {item.title.length <= 15
                    ? item.title
                    : item.title.substring(0, 15) + " ..."}
                </Text>
                <Text style={styles.informationsDivText}>
                  {item.size} - {item.brand}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchPrice: {
    flexDirection: "row",
    marginLeft: 40,
    marginRight: 40,
    justifyContent: "space-between",
  },
  input: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 10,
    marginTop: 10,
    width: 200,
    height: 30,
    borderColor: "#78244d",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inputPrice: {
    marginTop: 5,
    width: 130,
    paddingLeft: 10,
    height: 30,
    borderColor: "#78244d",
    borderWidth: 1,
    borderRadius: 15,
  },
  btnSearch: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 5,
    marginTop: 10,
    width: 170,
    height: 30,
    backgroundColor: "#78244d",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnSearchText: {
    color: "white",
  },
  creator: {
    paddingLeft: 15,
    paddingBottom: 5,
  },
  imgProfile: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  imgCreator: {
    width: 20,
    width: 20,
    borderRadius: 50,
  },
  result: {
    width: "50%",
    marginTop: 20,
    height: 250,
  },
  imgArticle: {
    width: "80%",
    height: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  infoDiv: {
    flexDirection: "row",
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: "space-between",
  },
  div: {
    paddingLeft: 15,
  },
  informationsDiv: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  informationsDivText: {
    fontSize: 12,
  },
});

export default Search;
