import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";

const FaqAcheter = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          Comment chercher un article sur Vinted ?
        </Text>
        <Text>
          Rien de plus simple, rends toi dans la section "Recherche", décris ce
          que tu voudrais avoir et les recherches apparaitront.
        </Text>
        <Text>Tu n'auras plus qu'à faire ton choix</Text>
      </View>
      <View>
        <Text style={styles.title}>Comment négocier un article ? </Text>
        <Text>
          Tu as la possibilité de contacter le vendeur par messagerie sur notre
          site, tu pourras lui faire une offre directement.
        </Text>
        <Text>Les frais de port sont payés par l'acheteur</Text>
      </View>
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
});
export default FaqAcheter;
