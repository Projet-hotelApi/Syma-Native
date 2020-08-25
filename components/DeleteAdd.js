import React, { useState } from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/core";

const DeleteAdd = ({ id }) => {
  const [data, setData] = useState({});
  const { params } = useRoute();
  const navigation = useNavigation();

  const deleteAdd = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await axios.get(
        "http://syma-projet.herokuapp.com/ad/delete/" + params.id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      alert("Votre annonce a été supprimée");
      if (response.data.message === "Ad deleted") {
        navigation.navigate("ProfileMenu");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text>
        En supprimant cet article, tu confirmes ne pas l'avoir vendu sur SyMa et
        renonce à la garantie SyMa
      </Text>
      <TouchableOpacity onPress={deleteAdd} style={styles.deleteBtn}>
        <Text style={styles.deleteBtnText}>Je supprime mon article</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 100,
    paddingLeft: 10,
  },
  deleteBtn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    width: 200,
    height: 45,
    backgroundColor: "#78244d",
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtnText: {
    color: "white",
  },
});
export default DeleteAdd;

// ROUTE POUR SUPPRIMER UNE ANNONCE
//  `http://syma-projet.herokuapp.com/ad/delete/${id}`,
//   router.get("/ad/delete/:id", isAuthenticated, async (req, res) => {
//     try {
//       if (req.params.id) {
//         const ad = await Ad.findById(req.params.id);
//         await ad.deleteOne();
//         res.status(200).json({ message: "Ad deleted" });
//     } else {
//       res.status(400).json({ message: "Missing parameter" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ message: error.message });
//   }
// });
