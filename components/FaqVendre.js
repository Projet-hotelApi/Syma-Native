import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

const FaqVendre = () => {
  const navigation = useNavigation();

  // PAS FINI

  return (
    <View style={styles.container}>
      <View>
        <Text>Comment vendre sur Vinted ?</Text>
        <Text>1. Ajoute une photo de bonne qualité</Text>
        <Text>2. Ajoute un titre et une description</Text>
        <Text>
          3. Renseigne la marque, la condition, la taille de ton article
        </Text>
        <Text>4. Fixe un prix attractif</Text>
        <Text>5. </Text>
      </View>
      <View>
        <Text>Comment envoyer un article ?</Text>
        <Text>
          Chez SyMa, afin de satisfaire nos clientes, nous avons eu l'idée de
          fixer un frais de port quelque soit la taille de ton colis, que ton
          article fasse 1 kg ou 5 kg, les frais de vente sont de 3,20€,
          seulement !
        </Text>
        <Text>Les frais de port sont payés par l'acheteur</Text>
        <Text>
          N'oublie pas de soigneusement emballer ton colis, utilise un emballage
          rigide et choisis la bonne taille du colis. Si les articles sont
          fragiles, sécurise les bien en utilisant du papier bulle par exemple.
        </Text>
        <Text>
          Colle correctement le bordereau sur ton colis, tu ne voudrais pas que
          ton colis te revienne si il est impossible de lire l'adresse de
          livraison
        </Text>
      </View>
      <View>
        <Text>Comment suivre un colis ?</Text>
        <Text>
          Nous travaillons uniquement avec un seul transporteur en France
          Métropolitaine, c'est grâce à ce partenariat que nous pouvons vous
          offrir un tarif de livraison unique
        </Text>
      </View>
      <View>
        <Text>Combien de temps prend la livraison ?</Text>
        <Text>
          Le temps de livraison d'un colis dépend de plusieurs facteurs tel que
          le temps de traitement du vendeur
        </Text>
        <Text>Le vendeur à jusqu'à 5 jours ouvrés pour envoyer l'article.</Text>
        <Text>
          Le temps de livraison varie selon la destination du colis, en général,
          la livraison nationale prend entre 2 et 5 jours ouvrés. Pour certaines
          raisons, il est possible que la livraison prenne parfois plus
          longtemps. Les samedis, dimanches, et les jours fériés ne sont en
          général pas inclus dans l’estimation du temps de livraison.{" "}
        </Text>
        <Text></Text>
      </View>
      <View>
        <Text>Paiement sécurisé</Text>
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
});
export default FaqVendre;
