import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import Activity from "../components/Activity";
import Annonces from "./Annonces";

const Home = ({ favoris, setFavoris }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://syma-projet.herokuapp.com/ad");
      //console.log("RESPONSE ====", response.data);
      //console.log(response.data.creator.picture[0]);
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
      <FlatList
        data={data}
        numColumns={2}
        // contentContainerStyle={styles.list}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.navigate("Annonce", { id: item._id });
            //   }}
            // >
            <Annonces
              data={item}
              id={item._id}
              favoris={favoris}
              setFavoris={setFavoris}
            />
            // </TouchableOpacity>
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
    paddingLeft: 5,
    paddingRight: 5,
    // flexDirection: "row",
    // justifyContent: "center",
  },
  // list: {
  //   justifyContent: "center",
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  // },
});

export default Home;
