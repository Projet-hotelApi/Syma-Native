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
      console.log(response.data.commandes);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      <Text>Mes ventes</Text>
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
});
export default Ventes;
