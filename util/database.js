import * as SQLite from "expo-sqlite";

export async function init() {
  const database = await SQLite.openDatabaseAsync("places.db");
  return await database.execAsync(`CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    imageUri TEXT NOT NULL,
    address TEXT NOT NULL,
    lat REAL NOT NULL,
    lang REAL NOT NULL
  )`);
}

export async function insertPlace(place) {
  const database = await SQLite.openDatabaseAsync("places.db");
  return await database.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lang) VALUES ('${place.title}', '${place.imageUri}', '${place.address}', ${place.location.lat}, ${place.location.long})`
  );
}

export async function fetchPlaces() {
  const database = await SQLite.openDatabaseAsync("places.db");
  return await database.getAllAsync(`SELECT * FROM places`);
}

export async function fetchPlaceDetails(id) {
  const database = await SQLite.openDatabaseAsync("places.db");
  return await database.getFirstAsync(`SELECT * FROM places WHERE id=${id}`);
}
