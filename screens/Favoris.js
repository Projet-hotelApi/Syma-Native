import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, AsyncStorage, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

const Favoris = ({ favoris, setFavoris }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // const favorite = async () => {
  //   try {
  //     let fav = await AsyncStorage.getItem("favoris");
  //     console.log("fav", fav);
  //     let favTab = JSON.parse(fav);
  //     console.log("favTab", favTab);
  //     setData(favTab);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   favorite();
  // }, []);

  // const remove = () => {}

  return isLoading ? (
    <Text>Favoris en cours chargement</Text>
  ) : (
    <View style={styles.container}>
      <Text>Mes favoris</Text>
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          //console.log("brand", item.brand);
          return (
            <View>
              <Text>{item.brand}</Text>
            </View>
          );
        }}
      /> */}
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
export default Favoris;
