import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacityBase,
} from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import axios from "axios";

// /user/search
// /ad/sort

const Search = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      console.log(1);
      const response = await axios.post(
        "https://syma-projet.herokuapp.com/user/search",
        {
          username: username,
        }
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
        {/* <TextInput
          style={styles.input}
          placeholder="Rechercher un article"
          placeholderTextColor="#78244d"
          onChangeText={(text) => setArticle(text)}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Rechercher un membre"
          placeholderTextColor="#78244d"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <TouchableOpacity style={styles.btnSearch} onPress={fetchData}>
        <Text style={styles.btnSearchText}>Rechercher</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.recherche}>
        {/* <TextInput
          style={styles.input}
          placeholder="Rechercher un article"
          placeholderTextColor="#78244d"
          onChangeText={(text) => setArticle(text)}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Rechercher un membre"
          placeholderTextColor="#78244d"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <TouchableOpacity style={styles.btnSearch} onPress={fetchData}>
        <Text style={styles.btnSearchText}>Rechercher</Text>
      </TouchableOpacity>
      {/* {data.length > 0 ? (
        <View style={styles.result}>
          <Text>{data.username}</Text>
          <Text>{data.description}</Text>
          <Image style={styles.imgProfile} source={{ uri: data.picture[0] }} /> 

          <TouchableOpacity>
            <Text>Voir le profile</Text>
          </TouchableOpacity>
        </View>
      ) : null} */}
      <View style={styles.result}>
        <Text>{data.username}</Text>
        <Text>{data.description}</Text>
        {/* requete pour aller voir le profil  */}
        {/* <TouchableOpacity>
            <Text>Voir le profile</Text>
          </TouchableOpacity> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 5,
    paddingRight: 5,
  },
  recherche: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 5,
    marginTop: 10,
    width: 170,
    height: 40,
    borderColor: "#78244d",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnSearch: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 5,
    marginTop: 10,
    width: 170,
    height: 40,
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
  imgProfile: {
    width: 40,
    height: 40,
  },
});

export default Search;
