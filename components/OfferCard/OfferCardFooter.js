import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function OfferCardFooter({ title, avatarLink, ratingValue, reviewsCount }) {
  function starsGenerator() {
    let rv = Math.trunc(ratingValue);
    let starsArray = [];
    let startSize = 17;
    let startRightMargin = 5;
    for (let i = 0; i < 5; i++) {
      if (i + 1 <= rv) {
        starsArray.push(
          <View style={{ marginRight: startRightMargin }} key={i}>
            <Ionicons
              name="ios-star"
              size={startSize}
              color="#FFB000"
              iconStyle={{ marginLeft: 10 }}
            />
          </View>
        );
      } else {
        starsArray.push(
          <View style={{ marginRight: startRightMargin }} key={i}>
            <Ionicons name="ios-star" size={startSize} color="#BBBBBB" />
          </View>
        );
      }
    }

    return starsArray;
  }
  return (
    <View style={Style.mainContainer}>
      <View style={Style.description}>
        <Text style={Style.offerTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={Style.scoreContainer}>
          <View style={Style.starsContainer}>{starsGenerator()}</View>

          <Text style={Style.reviewsText}>Ici les reviews</Text>
        </View>
      </View>

      {/* Niveau 3 : Colonne pour l'avatar de l'utilisateur */}
      <View style={Style.avatarContainer}>
        {/* <Text>Avatar</Text> */}
        <Image source={{ uri: avatarLink }} style={Style.avatar}></Image>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: "3%",
  },
  description: {
    flex: 3.5,
    // backgroundColor: "rgba(1,100,100,1)",
    justifyContent: "space-around",
    paddingRight: "3%",
  },
  offerTitle: {
    color: "black",
    fontWeight: "400",
    fontSize: 25,
  },
  scoreContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "rgba(200,100,100,1)",
  },
  starsContainer: {
    // flex: 1,
    flexDirection: "row",
  },
  Ionicons: {
    marginRight: 10,
  },
  reviewsText: {
    color: "#BBBBBB",
    marginLeft: 10,
  },
  avatarContainer: {
    flex: 1,
    // backgroundColor: "rgba(100,100,100, 1)",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  avatar: {
    width: "100%",

    height: "100%",
    aspectRatio: 1,
    // width: 20,
    // height: 20,
    borderRadius: 200,
    // backgroundColor: "blue",
  },
});

export default OfferCardFooter;
