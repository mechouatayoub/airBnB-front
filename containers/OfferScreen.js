import React from "react";
import PricedImage from "../components/OfferCard/PricedImage";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OfferCardFooter from "../components/OfferCard/OfferCardFooter";
import { AntDesign } from "@expo/vector-icons";
import MapView from "react-native-maps";
const cLat = 49.8480923;
const cLon = 2.3215788;

function OfferScreen({ route }) {
  // console.log("offer screen:", route);
  let [isFullDescription, setIsFullDescription] = React.useState(false);

  let userData = route.params.userData;
  console.log("userData:", userData);
  let price = userData.price;
  let photos = userData.photos;
  let title = userData.title;
  let ratingValue = userData.ratingValue;
  let reviews = userData.reviews;
  let description = userData.description;
  let avatar = null;
  let location = userData.location;
  console.log(location);

  if (userData.user.account) {
    console.log("a un compte");
    avatar = userData.user.account.photo.url;
  } else {
    console.log("n'a pas de compte");
    avatar = null;
  }

  return (
    <View style={Style.mainContainer}>
      <PricedImage
        height="40%"
        price={price}
        imagesLink={photos}
        data={userData}
      ></PricedImage>
      <View style={Style.descriptionContainer}>
        <OfferCardFooter
          title={title}
          avatarLink={description}
          ratingValue={ratingValue}
          reviewsCount={reviews}
        ></OfferCardFooter>
      </View>
      <View style={Style.fullDescriptionContainer}>
        {isFullDescription ? (
          <Text>{userData.description}</Text>
        ) : (
          <Text numberOfLines={3}>{description}</Text>
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
      <View style={Style.mapContainer}>
        <MapView
          region={{
            latitude: location[1],
            longitude: location[0],
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          style={{ flex: 1 }}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{ latitude: location[1], longitude: location[0] }}
          ></MapView.Marker>
        </MapView>
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
  mapContainer: {
    flex: 1,
    backgroundColor: "blue",
  },
});

export default OfferScreen;
