import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";

// ENVOYER SETOTKEN + SET ID
// intégrer la route dans App.js
// PAS TERMINER

const DeleteAccount = ({ setId, setToken }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const deleteAccount = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const id = await AsyncStorage.getItem("userId");
    try {
      const response = await axios.post(
        "http://syma-projet.herokuapp.com/user/update-account/user/delete",
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <Text>
        Souhaitez vous vraiment supprimer définitivement votre compte ?{" "}
      </Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Renseigner votre username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text> Non, je ne souhaite pas supprimer mon compte</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteAccount}>
        <Text> Oui, je souhaite supprimer mon compte</Text>
      </TouchableOpacity>
    </View>
  );
};
export default DeleteAccount;
