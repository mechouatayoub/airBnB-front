import React from "react";
// import { useRoute } from "@react-navigation/core";
import {
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";

export default function ProfileScreen({ setToken }) {
  let navigation = useNavigation();
  let [isLoading, setIsLoading] = React.useState(true);
  let [avatarLink, setAvatarLink] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [userName, setUserName] = React.useState("");
  let [defaultAvatarSize, setDefaultAvatarSize] = React.useState(30);
  let [defaultCameraButtonSize, setDefaultCameraButtonSize] =
    React.useState(20);
  let [newAvatarExtension, setNewAvatarExtension] = React.useState("");
  let [newAvatar, setNewAvatar] = React.useState("");

  React.useEffect(() => {
    async function getUserId() {
      // await AsyncStorage.removeItem("userToken");
      try {
        // 1 - Récupérer le token de l'utilisateur
        let userId = await AsyncStorage.getItem("userId");
        let userToken = await AsyncStorage.getItem("userToken");
        if (userId) {
          // 2 - Récupérer les données actuelles de l'utilisateur
          let response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/user/${userId}`,
            { headers: { authorization: "Bearer " + userToken } }
          );
          // console.log(response.data);
          setUserName(response.data.username);
          setEmail(response.data.email);
          setDescription(response.data.description);
          setAvatarLink(response.data.photo[0].url);
          setIsLoading(false);
        } else {
          console.log("My user Id: none");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserId();
  }, []);

  async function takePicture() {
    try {
      // 1- acces à l'appareil photo
      // si acceptation alors lancer l'appareil
      // sinon terminer la fonction
      let cameraAccessPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      // console.log(cameraAccessPermission);
      if (cameraAccessPermission.status === "granted") {
        // console.log("hello");
        let camera = await ImagePicker.launchCameraAsync();

        if (!camera.cancelled) {
          setNewAvatar(camera.uri);
          setNewAvatarExtension(camera.uri.split(".").pop());
          // console.log("." + camera.uri.split(".").pop());
          // console.log(camera.uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function choosePicture() {
    try {
      // Demander la permission d'acéder aux photos
      let picLibraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (picLibraryPermission.status === "granted") {
        // console.log("picking image granted");
        let userActionResult = await ImagePicker.launchImageLibraryAsync();
        //si l'utilisateur sélectionne une image
        if (!userActionResult.cancelled) {
          // console.log("imagePicked:", userActionResult.uri);
          // console.log(
          //   "image extension:",
          //   "." + userActionResult.uri.split(".").pop()
          // );
          setNewAvatar(userActionResult.uri);
          setNewAvatarExtension(userActionResult.uri.split(".").pop());
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function sendData() {
    try {
      // envoie des données brutes
      let userToken = await AsyncStorage.getItem("userToken");
      let response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update",
        { username: userName, description: description, email: email },
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      console.log("response on sent data");
      setUserName(response.data.username);
      setEmail(response.data.email);
      setDescription(response.data.description);
      console.log(response.data);
      // envoie de l'image
      console.log("sending a picture");
      let photoData = new FormData();
      photoData.append("photo", {
        uri: newAvatar,
        name: "photo." + newAvatarExtension,
        type: "image/" + newAvatarExtension,
      });
      console.log("form data:", photoData);
      console.log("user token:", userToken);
      let responseAvatar = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        photoData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(responseAvatar.data.photo[0].url);
      setAvatarLink(responseAvatar.data.photo[0].url);
      // setAvatarLink(response.data);
    } catch (error) {
      // console.log("here:", Object.keys(error));
      console.log("here error:", error.response);
    }
  }

  async function logOut() {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userId");
    // navigation.navigate("SignIn");
    setToken(null);
  }
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollerContainer}>
      <View style={styles.headerContainer}>
        {/* Picture container */}
        <View
          style={{
            height: "70%",
            // backgroundColor: "green",
            alignItems: "center",
            margin: "2%",
          }}
          onLayout={(event) => {
            setDefaultAvatarSize(
              Math.min(
                event.nativeEvent.layout.height,
                event.nativeEvent.layout.width
              )
            );
          }}
        >
          <View
            style={{
              height: defaultAvatarSize,
              width: defaultAvatarSize,
              alignItems: "center",
              borderWidth: 2,
              borderColor: "#EB5A62",
              borderRadius: defaultAvatarSize,
              overflow: "hidden",
            }}
          >
            {newAvatar ? (
              <Image
                source={{ uri: newAvatar }}
                style={{ height: "100%", width: "100%" }}
              />
            ) : avatarLink ? (
              <Image
                source={{ uri: avatarLink }}
                style={{ height: "100%", width: "100%" }}
              />
            ) : (
              <FontAwesome
                name="user"
                size={defaultAvatarSize}
                color="#EB5A62"
              />
              // <Text>Avatar found</Text>
            )}
          </View>
        </View>
        {/* Buttons main containers */}
        <View
          style={{
            // backgroundColor: "white",
            flex: 1,
            margin: "2%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onLayout={(event) => {
            setDefaultCameraButtonSize(
              Math.min(
                event.nativeEvent.layout.height,
                event.nativeEvent.layout.width
              )
            );
          }}
        >
          <Ionicons
            name="ios-camera"
            size={defaultCameraButtonSize}
            color="#EB5A62"
            style={{ marginHorizontal: "5%" }}
            onPress={() => {
              takePicture();
            }}
          />
          <Ionicons
            name="images-sharp"
            size={defaultCameraButtonSize}
            color="#EB5A62"
            style={{ marginHorizontal: "5%" }}
            onPress={() => {
              choosePicture();
            }}
          />
        </View>
      </View>

      <View>
        <Text>email</Text>
        <TextInput
          style={styles.regularTextInput}
          placeholder="Email"
          onChangeText={(input) => {
            setEmail(input);
            console.log(input);
          }}
        >
          {email}
        </TextInput>
      </View>
      <View>
        <Text>userName container</Text>
        <TextInput
          style={styles.regularTextInput}
          placeholder="User name"
          onChangeText={(input) => {
            setUserName(input);
            console.log(input);
          }}
        >
          {userName}
        </TextInput>
      </View>
      <View>
        <TextInput
          style={styles.descriptionTextInput}
          multiline={true}
          placeholder="Describe yourself in few words ..."
          onChangeText={(input) => {
            setDescription(input);
            console.log(input);
          }}
        >
          {description}
        </TextInput>
      </View>
      <View style={styles.actions}>
        {/* <Text>actions container</Text> */}
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            sendData();
          }}
        >
          <Text style={styles.updateText}>Update profile</Text>
        </TouchableOpacity>
        {/* <Text>actions container</Text> */}
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={() => {
            logOut();
          }}
        >
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollerContainer: {
    flex: 1,
    padding: "2%",
    backgroundColor: "white",
  },
  headerContainer: {
    height: "35%",
    // backgroundColor: "orange",
    padding: "2%",
  },
  regularTextInput: {
    height: 40,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    justifyContent: "flex-end",
    textAlignVertical: "bottom",
    marginBottom: "1%",
  },
  descriptionTextInput: {
    height: 100,
    borderColor: "#FFBAC0",
    borderWidth: 2,
    borderRadius: 5,
  },

  updateButton: {
    borderColor: "#EB5A62",
    borderWidth: 2,
    borderRadius: 100,
    backgroundColor: "#EB5A62",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "3%",
  },
  updateText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  logOutButton: {
    borderColor: "#EB5A62",
    borderWidth: 2,
    borderRadius: 100,
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "3%",
  },
  logOutText: {
    color: "#EB5A62",
    fontSize: 18,
    fontWeight: "700",
  },
  actions: {
    justifyContent: "flex-end",
    height: "30%",
  },
});
