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
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
      //console.log("favTab", favTab);
      setData(favTab);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    favorite();
  }, []);

  const remove = () => {
    //console.log(item._id);
    alert("Remove");
  };

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
            <View style={styles.annonces}>
              <Text style={styles.creator}>{item.creator.username}</Text>
              {item.picture[0] && (
                <Image
                  style={styles.imgProfile}
                  source={{ uri: item.creator.picture[0] }}
                />
              )}
              <TouchableOpacity
                style={styles.btnAnnonce}
                onPress={() => {
                  navigation.navigate("Annonce", { id: item._id });
                }}
              >
                <Image
                  style={styles.imgAnnonce}
                  source={{ uri: item.picture[0] }}
                />
              </TouchableOpacity>
              <View style={styles.infoDiv}>
                <Text>{item.price} €</Text>
                <TouchableOpacity
                  onPress={async () => {
                    console.log(item._id);
                    await AsyncStorage.removeItem(item._id);
                  }}
                >
                  <MaterialCommunityIcons
                    name="heart-broken"
                    size={24}
                    color="#78244d"
                  />
                </TouchableOpacity>
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
    paddingLeft: 10,
    paddingRight: 10,
  },
  annonces: {
    marginBottom: 50,
    width: "100%",
    height: 270,
  },
  imgProfile: {
    width: 20,
    width: 20,
    borderRadius: 50,
  },
  btnAnnonce: {
    width: "90%",
    height: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  imgAnnonce: {
    width: "90%",
    height: "90%",
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
export default Favoris;
