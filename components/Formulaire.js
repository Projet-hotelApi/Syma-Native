import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

const Formulaire = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigation = useNavigation();

  const submit = () => {
    if (email && message && subject && firstName && lastName) {
      alert("Votre message a bien été envoyé");
      navigation.navigate("Home");
    } else {
      alert("Merci de remplir tous les champs");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        value={firstName}
        placeholderTextColor="#78244d"
        placeholder="Votre prénom"
        style={styles.input}
        onChangeText={(text) => {
          setFirstName(text);
        }}
      />
      <TextInput
        autoCapitalize="none"
        value={lastName}
        placeholderTextColor="#78244d"
        placeholder="Votre nom"
        style={styles.input}
        onChangeText={(text) => {
          setLastName(text);
        }}
      />
      <TextInput
        autoCapitalize="none"
        value={email}
        placeholderTextColor="#78244d"
        placeholder="Votre adresse mail"
        style={styles.input}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        autoCapitalize="none"
        value={subject}
        placeholderTextColor="#78244d"
        placeholder="Sujet"
        style={styles.input}
        onChangeText={(text) => {
          setSubject(text);
        }}
      />
      <TextInput
        autoCapitalize="none"
        value={message}
        multiline={true}
        numberOfLines={50}
        maxLength={5000}
        placeholderTextColor="#78244d"
        placeholder="Votre message"
        style={styles.inputDescription}
        onChangeText={(text) => {
          setMessage(text);
        }}
      />
      <TouchableOpacity style={styles.btn} onPress={() => submit()}>
        <Text style={styles.btnText}>Envoyer</Text>
      </TouchableOpacity>
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
  input: {
    borderColor: "#78244d",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 5,
  },
  inputDescription: {
    borderColor: "#78244d",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    height: 200,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 5,
  },
  btn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    width: 170,
    height: 45,
    backgroundColor: "#78244d",
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
});
export default Formulaire;
