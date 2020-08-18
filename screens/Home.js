import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  // Requete Axios à faire
  // return FlatList
  // onPress sur une annonce => Annonce (component)
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.annonceContainer}>
            <Text>Robe à fleurs</Text>
            <Image
              style={styles.imageAnnonce}
              source={require("../assets/robe-essai.jpg")}
            />
            <View style={styles.informations}>
              <View style={styles.informationsText}>
                <Text>30€</Text>
                <Text>Size</Text>
              </View>
              <Text>Mon Pseudo</Text>
            </View>
          </View>
          <View style={styles.annonceContainer}>
            <Text>Robe à fleurs</Text>
            <Image
              style={styles.imageAnnonce}
              source={require("../assets/robe-essai.jpg")}
            />

            <View>
              <View>
                <Text>30€</Text>
                <Text>Size</Text>
              </View>
              <Text>Mon Pseudo</Text>
            </View>
          </View>
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
  annonceContainer: {
    width: "50%",
    height: 250,
    borderColor: "red",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageAnnonce: {
    width: 150,
    height: 150,
  },
  informations: {
    flexDirection: "row",
  },
  informationsText: {
    flexDirection: "row",
  },
});

export default Home;
