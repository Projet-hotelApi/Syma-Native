import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

const FaqCommunaute = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Comment partagé mon retour d'expérience ?
      </Text>
      <Text>
        Nous aimerions en savoir plus sur les choses que tu aimes chez SyMa et
        sur ce que tu aimerais améliorer. Tes retours d'expérience nous aident à
        faire les améliorations dont nos membres ont le plus besoin.{" "}
      </Text>
      <Text style={styles.retour}>
        Si tu as une suggestion d’amélioration pour faire de SyMa une meilleure
        plateforme ou si tu veux partager ton avis sur une de nos
        fonctionnalités, partage ton retour d’expérience en nous contactant
        directement à
      </Text>
      <TouchableOpacity
        style={styles.formulaire}
        onPress={() => {
          navigation.navigate("Formulaire");
        }}
      >
        <Text style={styles.formulaireText}>ce formulaire.</Text>
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
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  retour: {
    paddingTop: 10,
  },
  formulaire: {
    width: 100,
    fontWeight: "bold",
  },
  formulaireText: {
    fontWeight: "bold",
  },
});
export default FaqCommunaute;
