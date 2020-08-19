import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActionSheetIOS,
  AsyncStorage,
} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";

const Profile = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Requete update user
  // /user/update-account/:id
  // et au moment de submit, faire un comparatif des input pour n'envoyer que ceux qui ont été modifiés

  // const updateProfile = async () => {
  //   const token = await AsyncStorage.getItem("userToken");
  //   const id = await AsyncStorage.getItem("userId");
  //   try {
  //     const response = await axios.post();
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <ScrollView>
      <TouchableOpacity>
        {/* onPress={xxx} */}
        {/* {data.photo.length === 0 && setUpLoading === false ? (
          <Image style={styles.image} />
        ) : (
          <Image style={styles.image} source={{ uri: imageProfile }} />
        )} */}
      </TouchableOpacity>
      <TextInput
        autoCapitalize="none"
        // defaultValue={data.email}
        defaultValue={email}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        autoCapitalize="none"
        defaultValue={username}
        // defaultValue={data.username}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.textDescription}
        autoCapitalize="none"
        // defaultValue={data.description}
        defaultValue={description}
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        autoCapitalize="none"
        // defaultValue={data.name}
        defaultValue={firstName}
        placeholder="First-name"
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        autoCapitalize="none"
        defaultValue={lastName}
        // defaultValue={data.name}
        placeholder="Last-name"
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        autoCapitalize="none"
        defaultValue={postalCode}
        // defaultValue={data.name}
        placeholder="Code Postal"
        onChangeText={(text) => setPostalCode(text)}
      />
      <TextInput
        autoCapitalize="none"
        defaultValue={city}
        // defaultValue={data.name}
        placeholder="Ville"
        onChangeText={(text) => setCity(text)}
      />
      <TextInput
        autoCapitalize="none"
        defaultValue={address}
        // defaultValue={data.name}
        placeholder="Adresse"
        onChangeText={(text) => setAddress(text)}
      />
      <TouchableOpacity>
        {/* onPress={xxx} = requete /user/update-account/:id*/}
        <Text>Mettre à jour</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setToken(null);
          setId(null);
        }}
      >
        <Text>Se déconnecter</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        {/* requete xx=supprimer mon comte : user/delete, mettre une alerte : "attention définitif ..." */}
        <Text>Supprimer mon compte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Profile;
