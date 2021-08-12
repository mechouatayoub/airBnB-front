import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Alert,
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function validateDataBeforeSend({
    emailC,
    userNameC,
    passwordC,
    password2C,
  }) {
    if (!emailC) {
      return "An e-mail address is required";
    } else if (!userNameC) {
      return "A user name is required";
    } else if (!passwordC) {
      return "A password is required";
    } else if (!password2C) {
      return "A password confirmation is required";
    } else if (passwordC !== password2C) {
      return "Password and password confirmation are not compliant";
    } else {
      return null;
    }
  }

  async function authenticateUser() {
    // console.log(email, ",", password);

    setIsLoading(true);
    try {
      let response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        {
          email: email,
          username: userName,
          description: description,
          password: password,
        }
      );
      if (response.data.token) {
        Alert.alert("Success", "You are registered", [{ text: "Ok" }]);
        setToken(response.data.token);
      }
    } catch (error) {
      console.log("Axios error:", error.message);
      Alert.alert(
        "User registered",
        "Pleased browse to the Sign in page to log in.",
        [
          { text: "Cancel" },
          {
            text: "Sign in",
            onPress: () => {
              navigation.navigate("SignIn");
            },
          },
        ]
      );
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }
  return (
    <SafeAreaView style={[Style.mainContainer]}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          padding: "10%",
        }}
      >
        {isLoading && (
          <ActivityIndicator
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              height: "110%",
              width: "110%",
              opacity: 0.5,
              backgroundColor: "white",
            }}
          />
        )}
        {/* Header : icon + screen Name */}
        <View style={Style.header}>
          {/* Business logo */}
          <Image
            source={require("../assets/airBnBLogo.png")}
            style={Style.logo}
            resizeMode="contain" // pq un pbm dà aller tout en bas ?
          />
          {/* Text Logo */}
          <Text style={Style.screenTitle}>Sign up</Text>
        </View>
        {/* Inputs 5 : mail, username, description password and password confirmation */}
        <View style={Style.inputsContainer}>
          <TextInput
            style={Style.regularTextInput}
            placeholder="Email"
            onChangeText={(input) => {
              setEmail(input);

              let checkMessage = validateDataBeforeSend({
                emailC: input,
                userNameC: userName,
                passwordC: password,
                password2C: password2,
              });
              console.log(checkMessage);
              if (checkMessage) {
                setDisabledButton(true);
              } else {
                setDisabledButton(false);
              }
            }}
          ></TextInput>
          {/* Username input */}
          <TextInput
            style={Style.regularTextInput}
            placeholder="User name"
            onChangeText={(input) => {
              setUserName(input);

              let checkMessage = validateDataBeforeSend({
                emailC: email,
                userNameC: input,
                passwordC: password,
                password2C: password2,
              });
              console.log(checkMessage);
              if (checkMessage) {
                setDisabledButton(true);
              } else {
                setDisabledButton(false);
              }
            }}
          ></TextInput>
          {/* Description input */}
          <TextInput
            style={Style.descriptionTextInput}
            multiline={true}
            placeholder="Describe yourself in few words ..."
            onChangeText={(input) => {
              setDescription(input);
            }}
          ></TextInput>
          {/* Password input */}
          <View style={Style.passwordContainer}>
            <TextInput
              style={Style.passwordInput}
              placeholder="Password"
              secureTextEntry={passwordHidden ? true : false}
              autoCompleteType="off"
              onChangeText={(input) => {
                setPassword(input);

                let checkMessage = validateDataBeforeSend({
                  emailC: email,
                  userNameC: userName,
                  passwordC: input,
                  password2C: password2,
                });
                console.log(checkMessage);
                if (checkMessage) {
                  setDisabledButton(true);
                } else {
                  setDisabledButton(false);
                }
              }}
            ></TextInput>
            {passwordHidden ? (
              <Feather
                name="eye"
                size={24}
                color="black"
                style={Style.revealPasswordIcon}
                onPress={() => {
                  setPasswordHidden(false);
                }}
              />
            ) : (
              <Feather
                name="eye-off"
                size={24}
                color="black"
                style={Style.revealPasswordIcon}
                onPress={() => {
                  setPasswordHidden(true);
                }}
              />
            )}
          </View>
          {/* Passeword confirmation */}
          <View style={Style.passwordContainer}>
            <TextInput
              style={Style.passwordInput}
              placeholder="Password confirmation"
              secureTextEntry={passwordHidden ? true : false}
              autoCompleteType="off"
              onChangeText={(input) => {
                setPassword2(input);

                let checkMessage = validateDataBeforeSend({
                  emailC: email,
                  userNameC: userName,
                  passwordC: password,
                  password2C: input,
                });
                console.log(checkMessage);
                if (checkMessage) {
                  setDisabledButton(true);
                } else {
                  setDisabledButton(false);
                }
              }}
            ></TextInput>
          </View>
        </View>
        {/* Button and a redirect */}
        <View style={Style.footerContainer}>
          <Text
            style={
              validateDataBeforeSend({
                emailC: email,
                userNameC: userName,
                passwordC: password,
                password2C: password2,
              })
                ? Style.alertTextVisible
                : Style.alertTextHidden
            }
          >
            {validateDataBeforeSend({
              emailC: email,
              userNameC: userName,
              passwordC: password,
              password2C: password2,
            })}
          </Text>
          <TouchableOpacity
            style={Style.signInButton}
            onPress={authenticateUser}
            disabled={disabledButton}
          >
            <Text style={Style.signInText}>Sign up</Text>
          </TouchableOpacity>
          <View style={Style.registerRedirection}>
            <Text style={Style.registerText}>Already have an account? </Text>
            <TouchableOpacity>
              <Text
                style={Style.registerRedirectionText}
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flex: 1,
  },
  header: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: "60%",
    width: "60%",
    marginVertical: "5%",
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#717171",
  },
  inputsContainer: {
    flex: 1,
    marginVertical: "10%",
    alignItems: "stretch",
    justifyContent: "space-between",
    // backgroundColor: "orange",
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
  footerContainer: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  alertTextVisible: {
    color: "#EB5A62",
    textAlign: "center",
  },
  alertTextHidden: {
    opacity: 0,
  },
  signInButton: {
    borderColor: "#EB5A62",
    borderWidth: 2,
    borderRadius: 100,
    height: "30%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "3%",
  },
  signInText: {
    color: "#717171",
    fontSize: 18,
    fontWeight: "700",
  },
  registerText: {
    color: "#717171",
  },
  passwordContainer: {
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  passwordInput: {
    height: "100%",
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    flex: 1,
  },
  revealPasswordIcon: { color: "grey", position: "absolute", right: 0 },
  registerRedirection: {
    flexDirection: "row",
  },
  registerRedirectionText: {
    color: "#EB5A62",
    textDecorationColor: "#EB5A62",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
});
