import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";

// ENVOYER SETOTKEN + SET ID
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
        "http://syma-projet.herokuapp.com/user/delete",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      //console.log(response.data);
      alert("Votre compte a été supprimé");
      setToken(null);
      setId(null);
    } catch (error) {
      // if (error.response.status === 401) {
      //   alert("Wrong username and/or password");
      // }
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   deleteAccount();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.deleteText}>
        Attention : Vos annonces seront également supprimées.
      </Text>
      <Text style={styles.deleteText}>
        Souhaitez vous supprimer définitivement votre compte ?{" "}
      </Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="Renseigner votre username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        secureTextEntry={true}
        autoCapitalize="none"
        style={styles.input}
        placeholder="Renseigner votre mot de passe"
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.btnDeleteText}>
            {" "}
            Non, je ne souhaite pas supprimer mon compte
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={deleteAccount}>
          <Text style={styles.btnDeleteText}>
            {" "}
            Oui, je souhaite supprimer mon compte
          </Text>
        </TouchableOpacity>
      </View>
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
  deleteText: {
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    borderColor: "#78244d",
    marginTop: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    marginTop: 30,
    flexDirection: "row",
  },
  btnDelete: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 170,
    height: 55,
    backgroundColor: "#78244d",
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnDeleteText: {
    color: "white",
  },
});
export default DeleteAccount;
