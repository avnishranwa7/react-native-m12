export default class Place {
  constructor(title, imageUri, location) {
    this.id = new Date().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, long: location.long }; // {lat: 76.454, lng: 73.343}
  }
}
