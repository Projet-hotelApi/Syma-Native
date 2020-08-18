import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Vendre = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [condition, setCondition] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [picture, setPicture] = useState("");

  // if condition !!!

  return (
    // IMAGEEEEEE
    <View style={styles.container}>
      <View>
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
        <Text style={styles.textVendre}>Decris ton article</Text>
        <TextInput
          value={description}
          placeholder="ex : porté quelques fois, taille correctement"
          style={styles.input}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
      </View>
      <View>
        <Text style={styles.textVendre}>Prix</Text>
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

        {/* FORM SELECT OPTION */}
      </View>
      <View>
        <Text style={styles.textVendre}>Marque</Text>
        {/* FORM SELECT OPTION */}
      </View>
      <View>
        <Text style={styles.textVendre}>Taille</Text>
        {/* FORM SELECT OPTION */}
      </View>
      <TouchableOpacity style={styles.btnVendre}>
        {/* onPress={handleSubmit} */}
        <Text style={styles.btnVendreText}>Ajouter mon article</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textVendre: {
    color: "#C63E81",
  },
  btnVendre: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    width: 180,
    height: 50,
    backgroundColor: "#C63E81",
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
