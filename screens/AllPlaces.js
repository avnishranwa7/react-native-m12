import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

// local imports
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

const AllPlaces = () => {
  const isFocused = useIsFocused();

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function getPlaces() {
      const fetchedPlaces = await fetchPlaces();
      setPlaces(fetchedPlaces);
    }

    if (isFocused) getPlaces();
  }, [isFocused]);

  return <PlacesList places={places} />;
};

export default AllPlaces;
