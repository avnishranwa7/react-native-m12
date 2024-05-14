import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// local imports
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

const PlaceDetails = ({ navigation, route }) => {
  const [place, setPlace] = useState();

  useEffect(() => {
    async function fetchPlace() {
      const placeId = route.params.placeId;
      const place = await fetchPlaceDetails(placeId);
      navigation.setOptions({ title: place.title });
      setPlace(place);
    }

    fetchPlace();
  }, [route.params]);

  function showOnMapHandler() {
    navigation.navigate("Map", { lat: place.lat, long: place.lang });
  }

  if (!place)
    return (
      <View style={styles.fallback}>
        <Text>Loading place...</Text>
      </View>
    );

  return (
    <ScrollView>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
