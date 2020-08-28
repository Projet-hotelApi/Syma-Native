import React, { useState, useEffect } from "react";
import { Text, View, AsyncStorage, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Evaluations = ({ setId, setToken }) => {
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
      console.log(response.data);
      //console.log("reviews", response.data.reviews);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  let starsTab = [];
  for (let i = 0; i < 5; i++) {
    if (i < data.reviews.ratingNumber) {
      starsTab.push(
        <Ionicons key={i} name="ios-star" size={20} color="#78244d" />
      );
    } else {
      starsTab.push(
        <Ionicons key={i} name="ios-star" size={20} color="#78244d" />
      );
    }
  }

  const ratingValue = () => {
    let rating = 0;
    for (let i = 0; i < data.reviews.length; i++) {
      rating += data.reviews[i].ratingNumber;
    }
    rating = rating / data.reviews.length;
    console.log(rating);
    rating = Number(rating.toFixed());
    console.log(rating);
    return rating;
  };

  return isLoading ? (
    <View style={styles.container}>
      <Text>Mes Evaluations</Text>
    </View>
  ) : (
    <ScrollView>
      <SafeAreaView>
        <View>
          {data.reviews.length < 0 ? (
            <View>
              <Text> Aucune évaluation a affiché</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.note}>
                {" "}
                Ma note générale est de : {ratingValue()}
              </Text>
              <FlatList
                data={data.reviews}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.evaluations}>
                      <Text>{starsTab}</Text>
                      <Text>{item.description}</Text>
                    </View>
                  );
                }}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
  },
  evaluations: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  note: {
    marginTop: 10,
    paddingLeft: 15,
    marginBottom: 15,
  },
});
export default Evaluations;
