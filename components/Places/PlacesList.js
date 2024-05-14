import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

// local imports
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

const PlacesList = ({ places }) => {
  const { navigate } = useNavigation();

  if (!places || places.length === 0)
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet</Text>
      </View>
    );
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onPress={(id) => navigate("PlaceDetails", { placeId: id })}
        />
      )}
      style={styles.list}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
