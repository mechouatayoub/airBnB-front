import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import LottieView from "lottie-react-native";
const cLat = 49.8480923;
const cLon = 2.3215788;

function AroundMeScreen() {
  let navigation = useNavigation();

  let [isLoading, setIsLoading] = React.useState(true);
  let [offers, setOffers] = React.useState([]);
  let [currentLongitude, setCurrentLongitude] = React.useState(0);
  let [currentLatitude, setCurrentLatitude] = React.useState(0);
  //   let [currentLocation, setCurrentLocation] = React.useState({
  //     longitudes: 0,
  //     latitudes: 0,
  //   });

  React.useEffect(() => {
    async function getCurrentLocation() {
      try {
        // let currentPosition = null;
        let nearOffersUrl =
          "https://express-airbnb-api.herokuapp.com/rooms/around";
        let response = await Location.requestForegroundPermissionsAsync();
        // console.log(response);
        if (response.status === "granted") {
          let currentPosition = await Location.getCurrentPositionAsync();
          //   console.log(currentPosition);
          setCurrentLatitude(currentPosition.coords.latitude);
          setCurrentLongitude(currentPosition.coords.longitude);
          nearOffersUrl += `?longitude=${currentPosition.coords.longitude}&latitude=${currentPosition.coords.latitude}`;
          //   console.log(currentLocation);
        }
        console.log("hear url:", nearOffersUrl);

        let axiosResponse = await axios.get(nearOffersUrl);
        setOffers(axiosResponse.data);
        // console.log(isLoading);
        // console.log(axiosResponse.data);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    getCurrentLocation();
  }, []);
  return (
    <View style={Style.mainContainer}>
      {isLoading ? (
        <LottieView
          source={require("../assets/113-muzli-beacon.json")}
          loop
          autoPlay
        />
      ) : (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: currentLatitude, // impossible de passer des variables
            longitude: currentLongitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
        >
          <Text>Latitude: {currentLatitude}</Text>
          <Text>Longitude: {currentLongitude}</Text>

          {offers.map((offer) => {
            return (
              <MapView.Marker
                coordinate={{
                  latitude: offer.location[1],
                  longitude: offer.location[0],
                }}
                key={offer._id}
                onPress={() => {
                  navigation.navigate("Offer", { userData: offer });
                }}
              ></MapView.Marker>
            );
          })}
        </MapView>
      )}
    </View>
  );
}

const Style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default AroundMeScreen;

// Le comportement dynamique avec resize des simulateurs
// Type de device / Iphone / andoird / quel modèle ?
