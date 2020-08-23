import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import Activity from "../components/Activity";

const Dressing = ({ setId, setToken }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const id = await AsyncStorage.getItem("userId");
    try {
      const response = await axios.get(
        `http://syma-projet.herokuapp.com/user/informations/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      );
      //console.log(response.data);
      //console.log("essai", response.data.articles);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <Activity />
  ) : (
    <View style={styles.container}>
      {data.articles === 0 ? (
        <Text style={styles.dressingVide}>Votre dressing est vide</Text>
      ) : (
        <FlatList
          data={data.articles}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            //console.log("item", item._id);
            return (
              <View style={styles.monDressing}>
                <Image
                  style={styles.imgDressing}
                  source={{ uri: item.picture[0] }}
                />
                <View style={styles.dressingInfo}>
                  <View style={styles.descriptionAnnonce}>
                    <Text style={styles.titre}>Titre : </Text>
                    <Text> {item.title} </Text>
                  </View>
                  <View style={styles.descriptionAnnonce}>
                    <Text style={styles.titre}>Description : </Text>
                    <Text> {item.description} </Text>
                  </View>
                  <View style={styles.descriptionAnnonce}>
                    <Text style={styles.titre}>Marque : </Text>
                    <Text>{item.brand}</Text>
                  </View>
                  <View style={styles.descriptionAnnonce}>
                    <Text style={styles.titre}>Prix : </Text>
                    <Text>{item.price} €</Text>
                  </View>
                  <View style={styles.descriptionAnnonce}>
                    <Text style={styles.titre}>Condition : </Text>
                    <Text>{item.condition}</Text>
                  </View>
                  <View style={styles.descriptionAnnonce}>
                    <Text style={styles.titre}>Taille : </Text>
                    <Text>{item.size}</Text>
                  </View>
                </View>
                <View style={styles.btnAnnonce}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      navigation.navigate("DeleteAdd", { id: item._id });
                    }}
                  >
                    <Text style={styles.btnText}>Supprimer </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      navigation.navigate("UpdateAdd", { id: item._id });
                    }}
                  >
                    <Text style={styles.btnText}>Modifier </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
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
  dressingVide: {
    fontSize: 16,
    marginTop: 30,
    marginLeft: 10,
  },
  monDressing: {
    marginTop: 5,
    marginBottom: 15,
    width: "100%",
    borderColor: "transparent",
    borderWidth: 1,
  },
  imgDressing: {
    width: "40%",
    height: 250,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 5,
  },
  dressingInfo: {
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "space-evenly",
  },
  descriptionAnnonce: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  titre: {
    textDecorationLine: "underline",
    paddingRight: 10,
  },
  btnAnnonce: {
    flexDirection: "row",
  },
  btn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    width: 110,
    height: 45,
    backgroundColor: "#78244d",
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: "white",
  },
});
export default Dressing;
