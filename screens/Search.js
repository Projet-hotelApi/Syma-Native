import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import axios from "axios";

const Search = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.post(
      "https://syma-projet.herokuapp.com/user/search" + username
    );
    console.log(response.data);
    setData(response.data);
  };

  return (
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
      <TouchableOpacity style={styles.btnSearch}>
        <Text style={styles.btnSearchText}>Rechercher</Text>
      </TouchableOpacity>
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
});

export default Search;
