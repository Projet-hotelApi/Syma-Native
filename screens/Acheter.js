import React, { useEffect, useState } from "react";
import { Text, View, AsyncStorage } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/core";
//import { PaymentsStripe as Stripe } from "expo-payments-stripe";

// Stripe.setOptionsAsync({
//   publishableKey:
//     "pk_test_51HKK1nKaVfgIv2VzrB2yOesQgjuzKh1vNBznGtZHOzCSCVm0qkszj79wNmpgzJjevsCNvDsRVqCMBhOzwz0T0LvD000U24AkEI",
// });

const Acheter = ({ id }) => {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [username, setUsername] = useState("");

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await axios.post(
        "http://localhost:3000/payment/" + params.id,
        // "http://syma-projet.herokuapp.com/payment/" + params.id,
        {
          options: {
            title: title,
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
      const tokenStripe = await Stripe.paymentRequestWithCardFormAsync(options);
      //console.log(tokenStripe);
      console.log("RESPONSE", response.data);
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
    <View>
      <Text>Acheter</Text>
    </View>
  ) : (
    <View>
      <Text>ebvovnzoivbzeovboezvbo</Text>
    </View>
  );
};
export default Acheter;
