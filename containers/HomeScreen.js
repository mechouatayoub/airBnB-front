import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import OfferCard from "../components/OfferCard/OfferCard";

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
      setIsLoadingData(false);
    }
    loadData();
  }, []);

  return (
    <View style={Style.viewContainer}>
      {isLoadingData ? (
        <Text> Loading data</Text>
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
    // backgroundColor: "white",
    flex: 1,
    paddingHorizontal: "3%",
  },
  flatListStyle: {
    // backgroundColor: "pink",
  },
});
