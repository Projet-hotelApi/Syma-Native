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
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Activity from "../components/Activity";

// Apparaitre photo dans BDD => Attention Array !!
// Updater les infos compte user
// et au moment de submit, faire un comparatif des input pour n'envoyer que ceux qui ont été modifiés

const Profile = ({ setId, setToken }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [upLoading, setUpLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [pictureProfile, setPictureProfile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const userFounded = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const id = await AsyncStorage.getItem("userId");
      try {
        const response = await axios.get(
          `https://syma-projet.herokuapp.com/user/informations/${id}`,
          { headers: { Authorization: "Bearer " + token } }
        );
        //console.log(response.data);// OK
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        alert("Authentification failed, please try again");
      }
    };
    userFounded();
  }, []);

  // const updateUser = async () => {
  //   const token = await AsyncStorage.getItem("userToken");
  //   const id = await AsyncStorage.getItem("userId");
  //   try {
  //     const response = await axios.post(
  //       `https://syma-projet.herokuapp.com/user/update-account/${id}`,
  //       {
  //         email: email,
  //         username: username,
  //         postalCode: postalCode,
  //         city: city,
  //         address: address,
  //         description: description,
  //         picture: pictureProfile,
  //       },
  //       { headers: { Authorization: "Bearer " + token } }
  //     );
  //     console.log(response.data);
  //     // Faire comparatif input
  //     // if (response.data !== input ??)
  //     setData(response.data);
  //     alert("Changes updated");
  //   } catch (error) {
  //     console.log(error.message);
  //     alert("Please try again");
  //   }
  // };

  // UPDATER Photo
  const handleImagePicked = useCallback(async (pickerResult) => {
    const token = await AsyncStorage.getItem("userToken");
    const id = await AsyncStorage.getItem("userId");
    try {
      setUpLoading(true);
      if (!pickerResult.cancelled) {
        const uri = pickerResult.uri;
        console.log("pick", pickerResult);
        console.log("uri", uri);
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const formData = new FormData();
        formData.append("photo", {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
        console.log("formData", formData);
        const response = await axios.post(
          `https://syma-projet.herokuapp.com/user/update-account/${id}`,
          formData,
          {
            email: email,
            username: username,
            description: description,
            picture: pictureProfile,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            postalCode: postalCode,
          },
          { headers: { Authorization: "Bearer " + token } }
        );
        console.log(response.data);
        if (
          Array.isArray(uploadResponse.data.photo) === true &&
          uploadResponse.data.photo !== ""
        ) {
          console.log("uploadResponse.data.photo", uploadResponse.data.photo);
          // et au moment de submit, faire un comparatif des input pour n'envoyer que ceux qui ont été modifiés
          setData(response.data);
          alert("Changes updated");
          setPictureProfile(uploadResponse.data.photo.url);
          //setData(uploadResponse.data)
        }
      }
    } catch (error) {
      console.log(error.message);
      alert("Please try again");
    } finally {
      setUpLoading(false);
    }
  });

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Take a Picture", "Access to my library", "Cancel"],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          takeAPicture();
        }
        if (buttonIndex === 1) {
          takeLibraryImage();
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
      // handleImagePicked(pickerResult);
      setPictureProfile(pickerResult.uri);
    }
  };

  const takeLibraryImage = async () => {
    const cameraRollPerm = await ImagePicker.requestCameraRollPermissionsAsync();
    if (cameraRollPerm.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      //handleImagePicked(pickerResult);
      setPictureProfile(pickerResult);
    }
  };

  return (
    <ScrollView>
      {isLoading ? (
        <Activity />
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress}>
            {pictureProfile ? (
              <Image
                style={styles.image}
                source={{ uri: pictureProfile.uri }}
              />
            ) : data.picture ? (
              <Image style={styles.image} source={{ uri: data.picture }} />
            ) : (
              <Text style={styles.pictureDiv}>
                Ajouter / changer ma photo de profil
              </Text>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={data.email}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={data.username}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.textDescription}
            multiline={true}
            numberOfLines={10}
            maxLength={1000}
            autoCapitalize="none"
            placeholder="Description"
            onChangeText={(text) => setDescription(text)}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            defaultValue={data.personnal.firstName}
            placeholder="First-name"
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            defaultValue={data.personnal.lastName}
            placeholder="Last-name"
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={String(data.personnal.postalCode)}
            keyboardType={"numeric"}
            placeholder="Code Postal"
            onChangeText={(text) => setPostalCode(text)}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            defaultValue={data.personnal.city}
            placeholder="Ville"
            onChangeText={(text) => setCity(text)}
          />
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            defaultValue={data.personnal.address}
            placeholder="Adresse"
            onChangeText={(text) => setAddress(text)}
          />
          <TouchableOpacity
            onPress={() => {
              handleImagePicked(pictureProfile);
            }}
            style={styles.btnProfile}
          >
            <Text style={styles.btnProfileText}>Mettre à jour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnProfile}
            onPress={() => {
              setToken(null);
              setId(null);
            }}
          >
            <Text style={styles.btnProfileText}>Se déconnecter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnProfile}>
            {/* requete xx=supprimer mon comte : user/delete, mettre une alerte : "attention définitif ..." */}
            <Text style={styles.btnProfileText}>Supprimer mon compte</Text>
          </TouchableOpacity>
        </View>
      )}
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
  btnProfileText: {
    color: "white",
  },
});

export default Profile;
