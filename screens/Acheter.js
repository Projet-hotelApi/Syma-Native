import React, { useEffect, useState } from "react";
import { Text, View, AsyncStorage } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/core";
import Activity from "../components/Activity";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";

const Acheter = ({ id, title, username, price }) => {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [title, setTitle] = useState("");
  // const [price, setPrice] = useState("");
  // const [username, setUsername] = useState("");

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      Stripe.setOptionsAsync({
        publishableKey:
          "pk_test_51HKK1nKaVfgIv2VzrB2yOesQgjuzKh1vNBznGtZHOzCSCVm0qkszj79wNmpgzJjevsCNvDsRVqCMBhOzwz0T0LvD000U24AkEI",
      });
      const optionsCard = {
        number: "4242424242424242",
        expMonth: 11,
        expYear: 21,
        cvc: "424",
      };
      console.log("option", optionsCard);
      const tokenStripe = await Stripe.createTokenWithCardAsync(optionsCard);
      console.log(tokenStripe);
      const response = await axios.post(
        //"http://localhost:3000/payment/" + params.id,
        "http://syma-projet.herokuapp.com/payment/" + params.id,
        {
          options: {
            title: title,
            // price : amount => can't find amount
            price: price,
            username: username,
            currency: "eur",
            token: tokenStripe,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      //console.log("RESPONSE", response.data);
      //console.log(response.data._id);
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
    <View>
      <Text>Acheter</Text>
      <Text>{title}</Text>
    </View>
  );
};
export default Acheter;
