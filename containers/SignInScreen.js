import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
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
// import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={[Style.mainContainer]}>
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
          <TextInput style={Style.textInput} placeholder="Email"></TextInput>
          <TextInput
            style={Style.textInput}
            placeholder="Password"
            secure={true}
          ></TextInput>
          {/* <View style={Style.passwordContainer}> */}

          {/* <Feather
            name="eye"
            size={24}
            color="black"
            style={Style.revealPasswordIcon}
          /> */}
          {/* <Feather name="eye-off" size={24} color="black" /> */}
          {/* </View> */}
        </View>
        {/* Button and a redirect */}
        <View style={Style.footerContainer}>
          <Text style={Style.alertText}>Please fill all fields</Text>
          <TouchableOpacity style={Style.signInButton}>
            <Text style={Style.signInText}>Sign in</Text>
          </TouchableOpacity>
          <Text style={Style.registerText}>No account? Register</Text>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const Style = StyleSheet.create({
  mainContainer: {
    margin: "4%",
    // backgroundColor: "blue", // pourquoi ca descend jusqu'en bas ??
    flex: 1,
    // alignItems: "stretch",
  },
  header: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
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
    flex: 0.6,
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  footerContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: "30%",
    // backgroundColor: "blue",
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    // flex: 1,
  },
  alertText: {
    color: "#EB5A62",
  },
  signInButton: {
    borderColor: "#EB5A62",
    borderWidth: 2,
    borderRadius: 100,
    height: "20%",
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
  // passwordContainer: {
  //   flex: 1,
  //   // alignItems: "center",
  //   // backgroundColor: "blue",
  //   // flexDirection: "row",
  // },
  revealPasswordIcon: { color: "grey" },
});
