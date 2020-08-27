import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, AsyncStorage, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native-gesture-handler";
import axios from "axios";
import Activity from "../components/Activity";
import { SafeAreaView } from "react-native-safe-area-context";

const Commandes = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        "http://syma-projet.herokuapp.com/user/mes-commandes",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      //console.log(response.data.commandes);
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
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View>
          <FlatList
            data={data.commandes}
            // contentContainerStyle={styles.list}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProfileVendeur", {
                      id: item.creator._id,
                    });
                  }}
                >
                  <View style={styles.commande}>
                    <Image
                      style={styles.imgAnnonce}
                      source={{ uri: item.picture[0] }}
                    />
                    <View style={styles.commandesInfos}>
                      <Text style={styles}>{item.brand}</Text>
                      <Text style={styles.text}>{item.title}</Text>
                    </View>
                    <View style={styles.creatorInfos}>
                      <Text style={styles.creator}>
                        {item.creator.username}
                      </Text>
                      {item.creator.picture[0] ? (
                        <Image
                          style={styles.imgProfile}
                          source={{ uri: item.creator.picture[0] }}
                        />
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
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
  commande: {
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
  commandesInfos: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },
  creatorInfos: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
  },
  imgProfile: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
export default Commandes;
