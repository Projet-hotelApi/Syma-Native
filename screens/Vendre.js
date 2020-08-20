import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  AsyncStorage,
  ActionSheetIOS,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";

import axios from "axios";

const Vendre = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [condition, setCondition] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [picture, setPicture] = useState("");

  // if condition !!!
  // PUSH articles dans user => back end
  // insérer image
  // setCondition/condition + size/setSize à insérer dans RNPickerSelect +

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await axios.post(
        "https://syma-projet.herokuapp.com/ad/publish",
        {
          title: title,
          price: price,
          picture: picture,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Prendre une photo", // index0
          "Acceder à ma galerie de photos", // index1
          "Retour", // index2
        ],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          takeAPicture();
        }
        if (buttonIndex === 1) {
          accessLibrary();
        }
      }
    );

  const takeAPicture = async () => {
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    const cameraRollPerm = await ImagePicker.requestCameraRollPermissionsAsync();
    if (
      cameraPerm.status === "granted" &&
      cameraRollPerm.status === "granted"
    ) {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      // fetchData(pickerResult); // appeler la fonction pour photo !!
      setPicture(pickerResult.uri);
    }
  };

  const accessLibrary = async () => {
    const cameraRollPerm = await ImagePicker.requestCameraRollPermissionsAsync();
    if (cameraRollPerm.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      // handleImagePicked(pickerResult); // appeler la fonction pour photo !!
      setPicture(pickerResult.uri);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={onPress}>
            <Text>Choisir une photo pour mon article</Text>
            <Text>Minimum 1 photo et 5 photos maximum</Text>
          </TouchableOpacity>

          <Text style={styles.textVendre}>Titre</Text>
          <TextInput
            value={title}
            placeholder="ex : Veste en cuir noir"
            style={styles.input}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />
        </View>
        <View>
          <Text style={styles.textVendre}>Décris ton article</Text>
          <TextInput
            value={description}
            multiline={true}
            numberOfLines={10}
            maxLength={1000}
            placeholder="ex : porté quelques fois, taille correctement"
            style={styles.inputDescription}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>
        <View style={styles.price}>
          <Text style={styles.textVendre}>Prix sans les frais de port</Text>
          <TextInput
            value={price}
            style={styles.input}
            onChangeText={(text) => {
              setPrice(text);
            }}
          />
        </View>

        <View>
          <Text style={styles.textVendre}>Condition</Text>
          <RNPickerSelect
            style={styles.choice}
            // https://www.npmjs.com/package/react-native-picker-select
            // onValueChange={(value) => console.log(value)}
            onValueChange={(value) => setCondition(value)}
            items={[
              { label: "Neuf avec étiquette", value: "Neuf avec étiquette" },
              { label: "Neuf sans étiquette", value: "Neuf sans étiquette" },
              { label: "Très bon état", value: "Très bon état" },
              { label: "Bon état", value: "Bon état" },
              { label: "Satisfaisant", value: "Satisfaisant" },
            ]}
          />
        </View>
        <View>
          <Text style={styles.textVendre}>Marque</Text>
          <RNPickerSelect
            style={styles.choice}
            // onValueChange={(value) => console.log(value)}
            onValueChange={(value) => setBrand(value)}
            items={[
              { label: "Autres", value: "Autres" },
              { label: "Bash", value: "Bash" },
              { label: "Bérénice", value: "Bérénice" },
              { label: "Desigual", value: "Desigual" },
              { label: "H&M", value: "H&M" },
              { label: "Lacoste", value: "Lacoste" },
              { label: "Levis", value: "Levis" },
              { label: "Pull&Bear", value: "Pull&Bear" },
              { label: "Mango", value: "Mango" },
              { label: "Stradivarius", value: "Stradivarius" },
              { label: "The Kooples", value: "The Kooples" },
              { label: "Zara", value: "Zara" },
            ]}
          />
        </View>
        <View>
          <Text style={styles.textVendre}>Taille</Text>
          <RNPickerSelect
            //  onValueChange={(value) => console.log(value)}
            onValueChange={(value) => setSize(value)}
            items={[
              { label: "32", value: "32" },
              { label: "34", value: "34" },
              { label: "36", value: "36" },
              { label: "38", value: "38" },
              { label: "40", value: "40" },
              { label: "42", value: "42" },
              { label: "44", value: "44" },
              { label: "46", value: "46" },
              { label: "48", value: "48" },
              { label: "50", value: "50" },
              { label: "Autre", value: "Autre" },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.btnVendre} onPress={handleSubmit}>
          <Text style={styles.btnVendreText}>Ajouter mon article</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textVendre: {
    color: "#78244d",
    textAlign: "center",
    marginTop: 10,
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
    width: 350,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 5,
  },
  btnVendre: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    width: 180,
    height: 50,
    backgroundColor: "#78244d",
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnVendreText: {
    color: "white",
    fontSize: 18,
  },
});

export default Vendre;
