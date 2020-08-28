import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, AsyncStorage, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import axios from "axios";
import Activity from "../components/Activity";
import { SafeAreaView } from "react-native-safe-area-context";

const Ventes = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        "http://syma-projet.herokuapp.com/user/mes-ventes",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("VENTES", response.data.ventes);
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
    <ScrollView>
      <SafeAreaView>
        <View>
          {data.ventes.length === 0 ? (
            <View>
              <Text> Aucune commande a affiché</Text>
            </View>
          ) : (
            <FlatList
              data={data.ventes}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.vente}>
                    <Image
                      style={styles.imgAnnonce}
                      source={{ uri: item.picture[0] }}
                    />
                    <View style={styles.ventesInfos}>
                      <Text>{item.brand}</Text>
                      <Text>{item.title}</Text>
                      <Text>{item.condition}</Text>
                      <Text>{item.description}</Text>
                      <Text>{item.price}</Text>
                      <Text>{item.size}</Text>
                    </View>
                  </View>
                );
              }}
            />
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
  vente: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  imgAnnonce: {
    width: "80%",
    height: 300,
    marginLeft: "auto",
    marginRight: "auto",
  },
  ventesInfos: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
export default Ventes;
