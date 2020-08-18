import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Profile = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // #F35960
    backgroundColor: "white",
  },
});

export default Profile;
