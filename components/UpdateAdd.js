import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/core";

const UpdateAdd = ({ id }) => {
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [condition, setCondition] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [picture, setPicture] = useState(null);
  const { params } = useRoute();

  const updateAdd = async () => {
    const token = await AsyncStorage.getItem("userToken");

    try {
      const response = await axios.get(
        "http://syma-projet.herokuapp.com/ad/publish/update/" + params.id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text> Update </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 100,
    paddingLeft: 10,
  },
});

export default UpdateAdd;
