import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";

// local imports
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { getAddress, getMapPreview } from "../../util/location";

const LocationPicker = ({ onPickLocation }) => {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  const { navigate } = useNavigation();
  const { params } = useRoute();

  const [pickedLocation, setPickedLocation] = useState();

  useEffect(() => {
    if (params)
      setPickedLocation({ lat: params.pickedLat, long: params.pickedLong });
  }, [params]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.long
        );
        onPickLocation({ ...pickedLocation, address });
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermission() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permission = await requestPermission();
      return permission.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permission",
        "You need to grant location permission to use the app"
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigate("Map");
  }

  let locationPreview = <Text>No location picked yet</Text>;
  if (pickedLocation)
    locationPreview = (
      <Image
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.long),
        }}
        style={styles.mapPreviewImage}
      />
    );

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
