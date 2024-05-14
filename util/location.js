const GOOGLE_API_KEY = "AIzaSyDHr4Tmdb6QYNtb6b5ZsdEXq4-xw489_BQ";

export function getMapPreview(lat, long) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:C%7C${lat},${long}
    &key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat, lang) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&key=${GOOGLE_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
