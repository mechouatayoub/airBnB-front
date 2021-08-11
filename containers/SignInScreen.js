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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function authenticateUser() {
    // console.log(email, ",", password);

    setIsLoading(true);
    try {
      let response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        { email: email, password: password }
      );

      if (response.data.token) {
        // navigation.navigate("SignUp");
        // Alert.alert("Success", "You are connected", [{ text: "Ok" }]);
        setToken(response.data.token);
      }
    } catch (error) {
      console.log("Axios error:", error.message);
      Alert.alert(
        "Unknown user",
        "Wrong password or e-mail not found. Please register, if you aren't yet.",
        [
          { text: "Cancel" },
          {
            text: "Sign up",
            onPress: () => {
              navigation.navigate("SignUp");
            },
          },
        ]
      );
    }

    setIsLoading(false);
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
          <Text style={Style.screenTitle}>Sign in</Text>
        </View>
        {/* Inputs 2 : mail and password */}
        <View style={Style.inputsContainer}>
          <TextInput
            style={Style.emailInput}
            placeholder="Email"
            onChangeText={(input) => {
              setEmail(input);
              if (input !== "" && password !== "") {
                setDisabledButton(false);
              } else {
                setDisabledButton(true);
              }
              console.log(input);
            }}
          ></TextInput>

          <View style={Style.passwordContainer}>
            <TextInput
              style={Style.passwordInput}
              placeholder="Password"
              secureTextEntry={passwordHidden ? true : false}
              onChangeText={(input) => {
                setPassword(input);

                if (input !== "" && email !== "") {
                  setDisabledButton(false);
                } else {
                  setDisabledButton(true);
                }
                console.log(input, email);
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
        </View>
        {/* Button and a redirect */}
        <View style={Style.footerContainer}>
          <Text
            style={
              email === "" || password === ""
                ? Style.alertTextVisible
                : Style.alertTextHidden
            }
          >
            Please fill all fields
          </Text>
          <TouchableOpacity
            style={Style.signInButton}
            onPress={authenticateUser}
            disabled={disabledButton}
          >
            <Text style={Style.signInText}>Sign in</Text>
          </TouchableOpacity>
          <View style={Style.registerRedirection}>
            <Text style={Style.registerText}>No account? </Text>
            <TouchableOpacity>
              <Text
                style={Style.registerRedirectionText}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                Sign up
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
    alignItems: "stretch",
    justifyContent: "center",
    marginVertical: "10%",
  },

  emailInput: {
    height: 40,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
  },
  footerContainer: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  alertTextVisible: {
    color: "#EB5A62",
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
    height: "30%",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  passwordInput: {
    height: 40,
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
