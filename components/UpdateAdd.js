import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  TextInput,
  Image,
  ActionSheetIOS,
} from "react-native";
import axios from "axios";
import Swiper from "react-native-swiper"; // carroussel images

import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/core";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";

const UpdateAdd = ({ id }) => {
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [condition, setCondition] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [picture, setPicture] = useState(null);
  const { params } = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

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
  const handleImagePicked = useCallback(async (pickerResult) => {
    const token = await AsyncStorage.getItem("userToken");
    //console.log("despair ===>", pickerResult);
    let uploadResponse, uploadResult;
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        const uri = pickerResult.uri;
        //console.log(uri);
        //
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        //         // FormData() va nous servir à envoyer un fichier en body de la requête
        const formData = new FormData();
        // console.log(formData);
        //         // On ajoute à l'object formData une clé photo
        formData.append("picture", {
          uri,
          name: `picture.${fileType}`,
          type: `picture/${fileType}`, // la clé type doit être obligatoirement précisée en React Native
        });
        formData.append("price", price);
        formData.append("description", description);
        formData.append("title", title);
        formData.append("condition", condition);
        formData.append("brand", brand);
        formData.append("size", size);
        //console.log("el formdata ===>", formData);
        //         // La requête pour envoyer l'image au serveur
        // console.log("coucou=====>", id);
        console.log("coucou=====>", params.id);
        uploadResponse = await axios.post(
          //           // Ici, il faut envoyer l'id du user en query
          //           // id rentré en dur dans l'exemple, mais doit être dynamique dans votre code

          "http://syma-projet.herokuapp.com/ad/publish/update/" + params.id,

          formData,
          {
            headers: {
              Authorization: "Bearer " + token,

              //   headers: {
              //     Authorization:
              //       "Bearer ev5BO5RfKqrCW4mTCt3GNxDo8Zdgt6WG5gSVskqDfyOnPZcnt7AHlc5uvBqAxUfm",
              //     Accept: "application/json",
              //     "Content-Type": "multipart/form-data",
            },
          }
        );

        // console.log(uploadResponse.data.picture[0]);

        if (
          Array.isArray(uploadResponse.data.picture) === true &&
          uploadResponse.data.picture.length > 0
        ) {
          alert("Ton article a été modifie");
        }
      }
    } catch (e) {
      // console.log({ uploadResponse });
      // console.log({ uploadResult });
      // console.log({ e });
      alert(e.message);
    } finally {
      setUploading(false);
    }
  });

  const accessLibrary = async () => {
    const cameraRollPerm = await ImagePicker.requestCameraRollPermissionsAsync();
    if (cameraRollPerm.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      // appeler la fonction pour photo !!
      setPicture(pickerResult.uri);
      console.log(pickerResult.uri);
    }
  };

  useEffect(() => {
    const addFounded = async () => {
      const token = await AsyncStorage.getItem("userToken");
      try {
        const response = await axios.get(
          "http://syma-projet.herokuapp.com/ad/informations/" + params.id,
          { headers: { Authorization: "Bearer " + token } }
        );
        // console.log(response.data);
        setData(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPrice(String(response.data.price));
        setCondition(response.data.condition);
        setBrand(response.data.brand);
        setSize(String(response.data.size));
        setPicture(response.data.picture[0]);
        setIsLoading(false);
        console.log(response.data.picture);
      } catch (error) {
        console.log(error.message);
      }
    };
    addFounded();
  }, []);
  console.log(picture);

  // UPDATER ANNONCE
  const updateAdd = async () => {
    const token = await AsyncStorage.getItem("userToken");

    try {
      setIsLoading(true);
      const uri = picture;

      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      let formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("picture", {
        uri,
        name: `picture.${fileType}`,
        type: `picture/${fileType}`, // la clé type doit être obligatoirement précisée en React Native
      });
      // console.log(id);

      const response = await axios.post(
        `http://syma-projet.herokuapp.com/ad/publish/update/${params.id}`,
        formData,
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
      alert("Please try again!!!!!");
    } finally {
      setIsLoading(false);
      alert("Annonce mise a jour");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading === false ? (
          <View>
            <Text> Update annonce</Text>

            <TouchableOpacity onPress={onPress}>
              {data.picture.length > 0 ? (
                <Image
                  style={styles.imgDressing}
                  source={{ uri: picture || data.picture[0].url }}
                />
              ) : (
                <Ionicons name="ios-person" size={140} />
              )}
              <Text>Choisir une photo pour mon article</Text>
              <Text>Minimum 1 photo et 5 photos maximum</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              // defaultValue={data.title}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={description}
              placeholder="Description de l'annonce"
              onChangeText={(text) => setDescription(text)}
            />
            <TextInput
              // keyboardType="numeric"
              style={styles.input}
              autoCapitalize="none"
              value={price}
              placeholder="prix de l'annonce"
              onChangeText={(text) => setPrice(text)}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              // defaultValue={data.condition}
              value={condition}
              onChangeText={(text) => setCondition(text)}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              // defaultValue={data.brand}
              value={brand}
              // placeholder="brand de l'annonce"
              onChangeText={(text) => setBrand(text)}
            />
            <RNPickerSelect
              style={styles.choice}
              defaultValue={data.size}
              // onValueChange={(value) => console.log(value)}
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
            <TextInput
              // keyboardType="numeric"
              style={styles.input}
              autoCapitalize="none"
              // defaultValue={String(data.size)}
              value={size}
              placeholder="size de l'article"
              onChangeText={(text) => setSize(text)}
            />
            <TouchableOpacity
              onPress={() => {
                updateAdd();
                navigation.navigate("Dressing");
              }}
              style={styles.btnProfile}
            >
              <Text style={styles.btnProfileText}>
                Mettre à jour votre annonce
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>En chargement...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
  },
  pictureDiv: {
    width: "70%",
    height: 100,
    borderColor: "#78244d",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  input: {
    borderColor: "#78244d",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 5,
  },
  textDescription: {
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
  btnProfile: {
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
  imgDressing: {
    width: "40%",
    height: 250,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 5,
  },
  btnProfileText: {
    color: "white",
  },
});
export default UpdateAdd;
