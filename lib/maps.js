const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const baseUrl = 'https://maps.googleapis.com/maps/api';

async function getSuggestion(partialAddress) {
  const offset = partialAddress.length - 1;

  let url = `${baseUrl}/place/autocomplete/json?input=${encodeURIComponent(
    partialAddress
  )}&offset=${offset}&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);
  return await response.json();
}

async function getCoordinatesFromPlaceID(placeId) {
  const url = `${baseUrl}/geocode/json?key=${GOOGLE_MAPS_API_KEY}&place_id=${placeId}`;
  const response = await fetch(url);
  return await response.json();
}

async function getCoordinatesFromAddress(address) {
  const url = `${baseUrl}/geocode/json?key=${GOOGLE_MAPS_API_KEY}&address=${encodeURIComponent(address)}`;
  const response = await fetch(url);
  return await response.json();
}

function withinDistance(coord_1, coord_2, needed_distance) {
  const ipLat = (parseFloat(coord_1[0]) * Math.PI) / 180;
  const ipLog = (parseFloat(coord_1[1]) * Math.PI) / 180;

  const gpsLat = (parseFloat(coord_2[0]) * Math.PI) / 180;
  const gpsLog = (parseFloat(coord_2[1]) * Math.PI) / 180;

  const deltaLong = gpsLog - ipLog;
  const deltaLat = gpsLat - ipLat;
  const sinD =
    Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(ipLat) * Math.cos(gpsLat) * Math.pow(Math.sin(deltaLong / 2), 2);
  const angluarDistance = 2 * Math.asin(Math.sqrt(sinD));

  const distance = angluarDistance * RADIUS;

  const response = distance < needed_distance ? true : false;
  return response;
}

export { getSuggestion, getCoordinatesFromPlaceID, getCoordinatesFromAddress, withinDistance };
