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
  const [favorite, setFavorite] = useState({});

  // CHECKER PHOTO
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
          <TouchableOpacity
            onPress={() => {
              let newFavorite = [...favorite];
              newFavorite.push(id);
              setFavorite(newFavorite);
              alert("Annonce ajoutée aux favoris");
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
