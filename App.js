import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Import des composants :
import Home from "./screens/Home";
import Login from "./screens/Login";
import Message from "./screens/Message";
import ProfileMenu from "./screens/ProfileMenu";
import Profile from "./screens/Profile";
import Search from "./screens/Search";
import Signup from "./screens/Signup";
import Annonce from "./components/Annonce";
import Acheter from "./screens/Acheter";
import ProfileVendeur from "./screens/ProfileVendeur";
import Vendre from "./screens/Vendre";
import DeleteAccount from "./components/DeleteAccount";
import Commandes from "./screens/Commandes";
import Dressing from "./screens/Dressing";
import Evaluations from "./screens/Evaluations";
import Favoris from "./screens/Favoris";
import FAQ from "./screens/FAQ";
import FaqVendre from "./components/FaqVendre";
import FaqAcheter from "./components/FaqAcheter";
import FaqCommunaute from "./components/FaqCommunaute";
import DeleteAdd from "./components/DeleteAdd";
import UpdateAdd from "./components/UpdateAdd";
// Fin Import des composants

export default function App() {
  const [isLoading, setisLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  const setId = async (id) => {
    if (id) {
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userId");
    }
    setUserId(id);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setisLoading(false);
      setUserToken(userToken);
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? (
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {() => <Login setId={setId} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="Signup">
            {() => <Signup setId={setId} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Menu"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  style: {
                    backgroundColor: "white",
                    height: "14%",
                  },
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: () => (
                      <Ionicons name={"ios-home"} size={32} color="#C63E81" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        options={{
                          title: "Fil d'actualité",
                          headerShown: true,
                        }}
                        name="Home"
                      >
                        {() => <Home />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Annonce"
                        options={{
                          title: "Annonce",
                          headerShown: true,
                        }}
                      >
                        {() => <Annonce />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Acheter"
                        options={{
                          title: "Acheter",
                          headerShown: true,
                        }}
                      >
                        {() => <Acheter />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="ProfileVendeur"
                        options={{
                          title: "Profil du vendeur",
                          headerShown: true,
                        }}
                      >
                        {() => <ProfileVendeur />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Vendre"
                  options={{
                    tabBarLabel: "Vendre",
                    tabBarIcon: () => (
                      <AntDesign name="pluscircleo" size={30} color="#C63E81" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Vendre"
                        options={{
                          title: "Vendre un article",
                          headerShown: true,
                        }}
                      >
                        {() => <Vendre />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Profile"
                  options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: () => (
                      <Ionicons name={"ios-person"} size={40} color="#C63E81" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="ProfileMenu"
                        options={{
                          title: "Mon Profile",
                          headerShown: true,
                        }}
                      >
                        {() => (
                          <ProfileMenu setId={setId} setToken={setToken} />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Mes informations personnelles",
                          headerShown: true,
                        }}
                      >
                        {() => <Profile setId={setId} setToken={setToken} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="DeleteAccount"
                        options={{
                          title: "Supprimer mon compte",
                          headerShown: true,
                        }}
                      >
                        {() => (
                          <DeleteAccount setId={setId} setToken={setToken} />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Commandes"
                        options={{
                          title: "Mes commandes",
                          headerShown: true,
                        }}
                      >
                        {() => <Commandes setId={setId} setToken={setToken} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Dressing"
                        options={{
                          title: "Mon Dressing",
                          headerShown: true,
                        }}
                      >
                        {() => <Dressing setId={setId} setToken={setToken} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="DeleteAdd"
                        options={{
                          title: "Supprimer une annonce",
                          headerShown: true,
                        }}
                      >
                        {() => <DeleteAdd />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="UpdateAdd"
                        options={{
                          title: "Modifier une annonce",
                          headerShown: true,
                        }}
                      >
                        {() => <UpdateAdd />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Evaluations"
                        options={{
                          title: "Mes évaluations",
                          headerShown: true,
                        }}
                      >
                        {() => (
                          <Evaluations setId={setId} setToken={setToken} />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Favoris"
                        options={{
                          title: "Mes favoris",
                          headerShown: true,
                        }}
                      >
                        {() => <Favoris setId={setId} setToken={setToken} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="FAQ"
                        options={{
                          title: "Comment est ce que ça marche ?",
                          headerShown: true,
                        }}
                      >
                        {() => <FAQ />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="FaqVendre"
                        options={{
                          title: "Comment vendre mon article ?",
                          headerShown: true,
                        }}
                      >
                        {() => <FaqVendre />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="FaqAcheter"
                        options={{
                          title: "Comment acheter un article ?",
                          headerShown: true,
                        }}
                      >
                        {() => <FaqAcheter />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="FaqCommunaute"
                        options={{
                          title: "La communauté SyMa",
                          headerShown: true,
                        }}
                      >
                        {() => <FaqCommunaute />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Message"
                  options={{
                    tabBarLabel: "Message",
                    tabBarIcon: () => (
                      <FontAwesome
                        name="envelope-o"
                        size={30}
                        color="#C63E81"
                      />
                    ),
                  }}
                >
                  {() => <Message />}
                </Tab.Screen>
                <Tab.Screen
                  name="Search"
                  options={{
                    tabBarLabel: "Search",
                    tabBarIcon: () => (
                      <FontAwesome name="search" size={30} color="#C63E81" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Search"
                        options={{
                          title: "Rechercher",
                          headerShown: true,
                        }}
                      >
                        {() => <Search />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="ProfileVendeur"
                        options={{
                          title: "Profil du vendeur",
                          headerShown: true,
                        }}
                      >
                        {() => <ProfileVendeur />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
