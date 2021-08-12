import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import OfferCard from "../components/OfferCard/OfferCard";
import LottieView from "lottie-react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [offers, setOffers] = React.useState([]);

  React.useEffect(() => {
    async function loadData() {
      setIsLoadingData(true);
      try {
        let response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setOffers(response.data);
      } catch (error) {
        //s'il y'a une erreur dans le retour de la requête
        console.log("my error:", error.message);
      }
      setTimeout(() => {
        setIsLoadingData(false);
      }, 3000);
      // setIsLoadingData(false);
    }
    loadData();
  }, []);

  return (
    <View style={Style.viewContainer}>
      {isLoadingData ? (
        <LottieView
          source={require("../assets/113-muzli-beacon.json")}
          // style={{ backgroundColor: "blue" }}
          loop
          autoPlay
        />
      ) : (
        <FlatList
          data={offers}
          keyExtractor={(item) => item._id}
          renderItem={render}
          style={Style.flatListStyle}
        />
      )}
    </View>
  );
}

function render({ item }) {
  return <OfferCard item={item}></OfferCard>;
}
const Style = StyleSheet.create({
  viewContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // paddingHorizontal: "3%",
  },
  flatListStyle: {
    // backgroundColor: "pink",
    paddingHorizontal: "3%",
  },
});
