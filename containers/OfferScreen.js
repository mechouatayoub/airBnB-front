import React from "react";
import PricedImage from "../components/OfferCard/PricedImage";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OfferCardFooter from "../components/OfferCard/OfferCardFooter";
import { AntDesign } from "@expo/vector-icons";

function OfferScreen({ route }) {
  let [isFullDescription, setIsFullDescription] = React.useState(false);

  let userData = route.params.userData;
  return (
    <View style={Style.mainContainer}>
      <PricedImage
        height="40%"
        price={userData.price}
        imagesLink={userData.photos}
        data={userData}
      ></PricedImage>
      <View style={Style.descriptionContainer}>
        <OfferCardFooter
          title={userData.title}
          avatarLink={userData.user.account.photo.url}
          ratingValue={userData.ratingValue}
          reviewsCount={userData.reviews}
        ></OfferCardFooter>
      </View>
      <View style={Style.fullDescriptionContainer}>
        {isFullDescription ? (
          <Text>{userData.description}</Text>
        ) : (
          <Text numberOfLines={3}>{userData.description}</Text>
        )}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            paddingVertical: "3%",
            alignItems: "center",
          }}
          onPress={() => setIsFullDescription(!isFullDescription)}
        >
          <Text
            style={{
              color: "#BBBBBB",
              marginRight: "2%",
            }}
          >
            {isFullDescription ? "Show less" : "Show more"}
          </Text>
          {isFullDescription ? (
            <AntDesign name="caretup" size={18} color="#BBBBBB" />
          ) : (
            <AntDesign name="caretdown" size={18} color="#BBBBBB" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  descriptionContainer: {
    marginVertical: "3%",
    height: "12%",
    paddingHorizontal: "5%",
  },
  fullDescriptionContainer: {
    paddingHorizontal: "5%",
  },
});

export default OfferScreen;
