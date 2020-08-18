import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
