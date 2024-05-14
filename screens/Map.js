import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

// local imports
import IconButton from "../components/UI/IconButton";

const MapScreen = ({ navigation, route }) => {
  const region = {
    latitude: route.params?.lat ?? 37.78825,
    longitude: route.params?.long ?? -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [selectedLocation, setSelectedLocation] = useState(
    route.params
      ? { lat: route.params.lat, long: route.params.long }
      : undefined
  );

  function selectLocationHandler(event) {
    if (route.params) return;

    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, long });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "You have to pick a location by tapping on map first"
      );
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLong: selectedLocation.long,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (!route.params)
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconButton
            name="save"
            color={tintColor}
            size={24}
            onPress={savePickedLocationHandler}
          />
        ),
      });
  }, [navigation, savePickedLocationHandler, route.params]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.long,
          }}
        />
      )}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
