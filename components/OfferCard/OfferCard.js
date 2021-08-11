import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import PricedImage from "./PricedImage";
import OfferCardFooter from "./OfferCardFooter";

function OfferCard({ item }) {
  return (
    // Niveau 1 : le conteneur
    <View style={Style.mainViewContainer}>
      {/* Niveau 2 : image plus prix */}
      <PricedImage
        height="70%"
        price={item.price}
        imagesLink={item.photos}
        data={item}
      ></PricedImage>
      {/* Niveau 2 : conteneur de description */}
      <View style={Style.descriptionContainer}>
        {/* Niveau 3 : Colonne pour la description */}
        <OfferCardFooter
          title={item.title}
          avatarLink={item.user.account.photo.url}
          ratingValue={item.ratingValue}
          reviewsCount={item.reviews}
        />
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  mainViewContainer: {
    height: 300,
    // backgroundColor: "red",
    borderBottomWidth: 0.3,
    borderBottomColor: "#BBBBBB",
    marginTop: "5%",
  },
  descriptionContainer: {
    // backgroundColor: "yellow",
    flex: 1,
    // flexDirection: "row",
    paddingBottom: "3%",
  },
});

export default OfferCard;
