## Checkpoint-3: Greenie

` Swanand Wagh and Azmeen Kausar`

### Basic Functionality of the Greenie: (things implemented till now):
- Users can Signup and Login.
- Users can search for an address & fetch the results from the Google Maps API (address line, city, state, country, postal code, landmark) along with suggested addresses.
- User can see an interactive map with the fetched address.
- The address data is stored in a proper format in a reactive state.

### Proper state management  
- If the state is "inactive" or "paused", the user should not be able to interact & will be logged out.

###  Remaining work to be completed for the next phase of the project ("Beta")
- Get coordinates of the fetched address (address which user entered).
- Add a "Capture Location" button to capture the current location of the user using the geolocation API.
- Write a function to calculate the distance between the two locations (current location and fetched address).
- If the locations are within a certain distance, display verified location card.
- If time permits, do the peer-peer work verification.

