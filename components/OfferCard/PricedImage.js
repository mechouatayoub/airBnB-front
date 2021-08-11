import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
// import axios from "axios";
import { SwiperFlatList } from "react-native-swiper-flatlist";

function PricedImage({ height, price, imagesLink, data }) {
  let navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ height: height }}
      onPress={() => {
        navigation.navigate("Offer", { userData: data }); // TOD : router vers la page room
      }}
    >
      <View style={[Style.mainContainer]}>
        <Image
          source={{ uri: imagesLink[0].url }}
          style={[Style.image]}
        ></Image>

        <View style={Style.priceContainer}>
          <Text style={Style.price}>{price} €</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const Style = StyleSheet.create({
  mainContainer: {
    // backgroundColor: "blue",
    marginBottom: "2%",
    position: "relative",
  },
  image: {
    // backgroundColor: "pink",
    height: "100%",
    width: "100%",
    // position: "absolute",
  },
  priceContainer: {
    position: "absolute",
    // backgroundColor: "pink",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    paddingBottom: "5%",
  },
  price: {
    color: "white",
    fontSize: 20,
    padding: "3%",
    width: "25%",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});

export default PricedImage;
