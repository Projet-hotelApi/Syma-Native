import React, { useState, useCallback } from "react";
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
import * as Permissions from "expo-permissions";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

const Vendre = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [condition, setCondition] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [picture, setPicture] = useState(null);
  const [uploading, setUploading] = useState(false);

  // if condition !!!
  // insérer image

  // const handleSubmit = async () => {
  //   const token = await AsyncStorage.getItem("userToken");
  //   try {
  //     const response = await axios.post(
  //       "https://syma-projet.herokuapp.com/ad/publish",
  //       {
  //         price: price,
  //         description: description,
  //         title: title,
  //         picture: picture,
  //         condition: condition,
  //         brand: brand,
  //         size: size,
  //       },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

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

  //   <Button
  //   onPress={async () => {
  //     const cameraRollPerm = await ImagePicker.requestCameraRollPermissionsAsync();
  //     // only if user allows permission to camera roll
  //     if (cameraRollPerm.status === "granted") {
  //       const pickerResult = await ImagePicker.launchImageLibraryAsync({
  //         allowsEditing: true,
  //         aspect: [4, 3],
  //       });
  //       handleImagePicked(pickerResult);
  //     }
  //   }}
  //   title="Pick an image from camera roll"
  // />

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
      setPicture(pickerResult.uri);
    }
  };

  const handleImagePicked = useCallback(async (pickerResult) => {
    const token = await AsyncStorage.getItem("userToken");
    //console.log("despair ===>", pickerResult);
    let uploadResponse, uploadResult;
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        const uri = pickerResult;
        //console.log(uri);
        //         // Pour isoler l'extension du fichier, afin de connaitre son type (jpg, png...)
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
        uploadResponse = await axios.post(
          //           // Ici, il faut envoyer l'id du user en query
          //           // id rentré en dur dans l'exemple, mais doit être dynamique dans votre code
          "http://syma-projet.herokuapp.com/ad/publish",
          // "https://express-airbnb-api.herokuapp.com/user/upload_picture/" +
          //   "5f3510145bc5310017cdf279",
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,

              // headers: {
              //   Authorization:
              //     "Bearer ev5BO5RfKqrCW4mTCt3GNxDo8Zdgt6WG5gSVskqDfyOnPZcnt7AHlc5uvBqAxUfm",
              //   Accept: "application/json",
              //   "Content-Type": "multipart/form-data",
            },
          }
        );
        //console.log(uploadResponse.data.picture[0]);
        if (
          Array.isArray(uploadResponse.data.picture) === true &&
          uploadResponse.data.picture.length > 0
        ) {
          alert("Ton article sera bientôt mis en ligne");
          navigation.navigate("Dressing");
        }
      } else {
      }
    } catch (e) {
      // console.log({ uploadResponse });
      // console.log({ uploadResult });
      // console.log({ e });
      alert(
        "Afin de poster une annonce, merci de sélectionner une photo, renseigner un titre, une description, un prix, la condition, la taille ainsi que la marque de l'article"
      );
    } finally {
      setUploading(false);
    }
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {/* <Text style={styles.exampleText}>
            Example: Upload ImagePicker result
          </Text>
          <Button
            onPress={async () => {
              const cameraRollPerm = await ImagePicker.requestCameraRollPermissionsAsync();
              // only if user allows permission to camera roll
              if (cameraRollPerm.status === "granted") {
                const pickerResult = await ImagePicker.launchImageLibraryAsync({
                  allowsEditing: true,
                  aspect: [4, 3],
                });
                handleImagePicked(pickerResult);
              }
            }}
            title="Pick an image from camera roll"
          />
          <Button
            onPress={async () => {
              const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
              const cameraRollPerm = await ImagePicker.requestCameraRollPermissionsAsync();
              // only if user allows permission to camera AND camera roll
              if (
                cameraPerm.status === "granted" &&
                cameraRollPerm.status === "granted"
              ) {
                const pickerResult = await ImagePicker.launchCameraAsync({
                  allowsEditing: true,
                  aspect: [4, 3],
                });
                handleImagePicked(pickerResult);
              }
            }}
            title="Take a photo"
          /> */}

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
              { label: "Abercombie & Fitch", value: "Abercombie & Fitch" },
              { label: "Adidas", value: "Adidas" },
              { label: "Aigle", value: "Aigle" },
              { label: "American Apparel", value: "American Apparel" },
              { label: "American Retro", value: "American Retro" },
              { label: "American Vintage", value: "American Vintage" },
              { label: "Asics", value: "Asics" },
              { label: "Ba&Sh", value: "Ba&Sh" },
              { label: "Balenciaga", value: "Balenciaga" },
              { label: "Balmain", value: "Balmain" },
              { label: "Benetton", value: "Benetton" },
              { label: "Bershka", value: "Bershka" },
              { label: "Billabong", value: "Billabong" },
              { label: "Burberry", value: "Burberry" },
              { label: "Burton", value: "Burton" },
              { label: "C&A", value: "C&A" },
              { label: "Cacharel", value: "Cacharel" },
              { label: "Cache Cache", value: "Cache Cache" },
              { label: "Calvin Klein", value: "Calvin Klein" },
              { label: "Camaïeu", value: "Camaïeu" },
              { label: "Carnet de Vol", value: "Carnet de Vol" },
              { label: "Caroll", value: "Caroll" },
              { label: "Chanel", value: "Chanel" },
              { label: "Chipie", value: "Chipie" },
              { label: "Chloé", value: "Chloé" },
              {
                label: "Comptoir des Cotonniers",
                value: "Comptoir des Cotonniers",
              },
              { label: "Cop.Copine", value: "Cop.Copine" },
              { label: "Desigual", value: "Desigual" },
              { label: "Esprit", value: "Esprit" },
              { label: "Etam", value: "Etam" },
              { label: "Fenti", value: "Fenti" },
              { label: "G-Star", value: "G-Star" },
              { label: "Gap", value: "Gap" },
              { label: "Grain de Malie", value: "Grain de Malie" },
              { label: "Guess", value: "Guess" },
              { label: "H&M", value: "H&M" },
              { label: "Hollister", value: "Hollister" },
              { label: "Ikks", value: "Ikks" },
              { label: "Jack&Jones", value: "Jack&Jones" },
              { label: "Kaporal", value: "Kaporal" },
              { label: "Karen Miller", value: "Karen Miller" },
              { label: "Karl Largerfeld", value: "Karl Largerfeld" },
              { label: "Kenzo", value: "Kenzo" },
              { label: "Kookai", value: "Kookai" },
              { label: "Lacoste", value: "Lacoste" },
              { label: "Le coq sportif", value: "Le coq sportif" },
              { label: "Le Temps des Cerises", value: "Le Temps des Cerises" },
              { label: "Lee", value: "Lee" },
              { label: "Lee Cooper", value: "Lee Cooper" },
              { label: "Levi's", value: "Levi's" },
              { label: "Little Marcel", value: "Little Marcel" },
              { label: "Lulu Castagnette", value: "Lulu Castagnette" },
              { label: "Mango", value: "Mango" },
              { label: "Marc Jacobs", value: "Marc Jacobs" },
              { label: "Morgan", value: "Morgan" },
              { label: "Naf Naf", value: "Naf Naf" },
              { label: "New Balance", value: "New Balance" },
              { label: "New Look", value: "New Look" },
              { label: "New Yorker", value: "New Yorker" },
              { label: "Nike", value: "Nike" },
              { label: "Nina Ricci", value: "Nina Ricci" },
              { label: "O'Neil", value: "O'Neil" },
              { label: "Oakwood", value: "Oakwood" },
              { label: "Paul & Joe", value: "Paul & Joe" },
              { label: "Pepe Jeans", value: "Pepe Jeans" },
              { label: "Petit Bateau", value: "Petit Bateau" },
              { label: "Pull and Bear", value: "Pull and Bear" },
              { label: "Puma", value: "Puma" },
              { label: "Promod", value: "Promod" },
              { label: "Quicksilver", value: "Quicksilver" },
              { label: "Ralph Lauren", value: "Ralph Lauren" },
              { label: "Reebook", value: "Reebook" },
              { label: "Roxy", value: "Roxy" },
              { label: "Stradivarius", value: "Stradivarius" },
              { label: "Ted Baker", value: "Ted Baker" },
              { label: "Teddy Smith", value: "Teddy Smith" },
              { label: "The Kooples", value: "The Kooples" },
              { label: "The North Face", value: "The North Face" },
              { label: "Timberland", value: "Timberland" },
              { label: "Tommy Hilfilger", value: "Tommy Hilfilger" },
              { label: "Top Shop", value: "Top Shop" },
              { label: "Valentino", value: "Valentino" },
              { label: "Zara", value: "Aara" },
              { label: "Autre", value: "Autre" },
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
        <TouchableOpacity
          style={styles.btnVendre}
          onPress={() => {
            handleImagePicked(picture);
          }}
        >
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
