import React from "react";
import { TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";

function PasswordField() {
  return (
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
  );
}

const Style = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flex: 1,
  },
  header: {
    flex: 1.5,
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
    flex: 0.6,
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  footerContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  emailInput: {
    height: "30%",
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
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
  passwordContainer: {
    height: "30%",
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
});

export default PasswordField;
