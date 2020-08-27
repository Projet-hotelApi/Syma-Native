import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";

const FaqVendre = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Comment vendre sur Vinted ?</Text>
          <Text style={styles.retour}>
            1. Ajoute une photo de bonne qualité
          </Text>
          <Text style={styles.retour}>
            2. Ajoute un titre et une description
          </Text>
          <Text style={styles.retour}>
            3. Renseigne la marque, la condition, la taille de ton article
          </Text>
          <Text style={styles.retour}>4. Fixe un prix attractif</Text>
          <Text style={styles.retour}>5. Le tour est joué</Text>
          <Text style={styles.informations}>
            Tu ne peux vendre des articles contrefaits, des échantillons, des
            uniformes officiels, des articles autographiés ou tout autre objet
            n'ayant aucun rapport avec l'habillement
          </Text>
        </View>
        <View>
          <Text style={styles.title}>Comment envoyer un article ?</Text>
          <Text>
            Chez SyMa, afin de satisfaire nos clientes, nous avons eu l'idée de
            fixer un frais de port quelque soit la taille de ton colis, que ton
            article fasse 1 kg ou 5 kg, les frais de vente sont de 3€, seulement
            !
          </Text>
          <Text>Les frais de port sont payés par l'acheteur</Text>
          <Text style={styles.retour}>
            N'oublie pas de soigneusement emballer ton colis, utilise un
            emballage rigide et choisis la bonne taille du colis. Si les
            articles sont fragiles, sécurise les bien en utilisant du papier
            bulle par exemple.
          </Text>
          <Text style={styles.retour}>
            Colle correctement le bordereau sur ton colis, tu ne voudrais pas
            que ton colis te revienne si il est impossible de lire l'adresse de
            livraison
          </Text>
        </View>
        <View>
          <Text style={styles.title}>Comment suivre un colis ?</Text>
          <Text>
            Nous travaillons uniquement avec un seul transporteur en France
            Métropolitaine, c'est grâce à ce partenariat que nous pouvons vous
            offrir un tarif de livraison unique
          </Text>
        </View>
        <View>
          <Text style={styles.title}>
            Combien de temps prend la livraison ?
          </Text>
          <Text style={styles.retour}>
            Le temps de livraison d'un colis dépend de plusieurs facteurs tel
            que le temps de traitement du vendeur
          </Text>
          <Text style={styles.retour}>
            Le vendeur à jusqu'à 5 jours ouvrés pour envoyer l'article.
          </Text>
          <Text style={styles.retour}>
            Le temps de livraison varie selon la destination du colis, en
            général, la livraison nationale prend entre 2 et 5 jours ouvrés.
            Pour certaines raisons, il est possible que la livraison prenne
            parfois plus longtemps. Les samedis, dimanches, et les jours fériés
            ne sont en général pas inclus dans l’estimation du temps de
            livraison.{" "}
          </Text>
          <Text></Text>
        </View>
        <View>
          <Text style={styles.title}>Comment évaluer un vendeur ?</Text>
          <Text>
            Lors de la réception de ta commande, tu auras le choix de laisser ou
            non un commentaire à l'acheteur. Ce dernier sera visible de tous et
            tu évalueras le vendeur.{" "}
          </Text>
          <Text style={styles.retour}>
            Par exemple 1-2 étoiles indiquera que tu as été totalement
            insatisfait, 3 étoiles sera la moyenne (neutre), certains aspects
            auraient pu être améliorés. Et enfin 4-5 étoiles correspondra à ta
            pleine satisfaction, tout était décris comme dans la description.
          </Text>
        </View>
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
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  informations: {
    marginTop: 5,
    fontSize: 12,
  },
  retour: {
    paddingTop: 10,
  },
});
export default FaqVendre;
