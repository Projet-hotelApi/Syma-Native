import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import ActivityIndicator from "../components/ActivityIndicator";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://syma-projet.herokuapp.com/ad");
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    // fetchData();
    console.log("coucou");
  }, []);
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Coucou</Text>

          {/* <FlatList
              data={data.ad}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                <Text>{item.ad.title}</Text>;
              }}
            /> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: "row",
  },
  // annonceContainer: {
  //   width: "50%",
  //   height: 250,
  //   borderColor: "red",
  //   borderWidth: 1,
  //   paddingLeft: 10,
  //   paddingRight: 10,
  // },
  // imageAnnonce: {
  //   width: 150,
  //   height: 150,
  // },
  // informations: {
  //   flexDirection: "row",
  // },
  // informationsText: {
  //   flexDirection: "row",
  // },
});

export default Home;
