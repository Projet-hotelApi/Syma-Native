import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

const Favoris = ({ favoris, setFavoris }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const favorite = async () => {
    try {
      let fav = await AsyncStorage.getItem("favoris");
      //console.log("fav", fav);
      let favTab = JSON.parse(fav);
      console.log("favTab", favTab);
      setData(favTab);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    favorite();
  }, []);

  // const remove = () => {}

  return isLoading ? (
    <Text>Favoris en cours chargement</Text>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          //console.log(item);
          return (
            <TouchableOpacity
              style={styles.annonces}
              onPress={() => {
                navigation.navigate("Annonce", { id: item._id });
              }}
            >
              <Text style={styles.creator}>{item.creator.username}</Text>
              {item.picture[0] && (
                <Image
                  style={styles.imgProfile}
                  source={{ uri: item.creator.picture[0] }}
                />
              )}
              <Image
                style={styles.imgAnnonce}
                source={{ uri: item.picture[0] }}
              />
              <View style={styles.infoDiv}>
                <Text>{item.price} €</Text>
              </View>
              <View style={styles.informationsDiv}>
                <Text style={styles.titleAnnonce}>
                  {item.title.length <= 20
                    ? item.title
                    : item.title.substring(0, 20) + " ..."}
                </Text>

                <Text style={styles.informationsDivText}>
                  {item.brand} / {item.size}
                </Text>
              </View>
            </TouchableOpacity>
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
    paddingLeft: 10,
    paddingRight: 10,
  },
  annonces: {
    marginBottom: 50,
    width: "100%",
    height: 250,
  },
  creator: {
    paddingLeft: 10,
    paddingBottom: 5,
  },
  imgProfile: {
    width: 20,
    width: 20,
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
export default Favoris;
