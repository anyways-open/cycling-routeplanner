

var mapboxAccessCode = "pk.eyJ1IjoiYmVuLWFueXdheXMiLCJhIjoiY2szdWhla3R5MGNoajN1cHMyZG51aXF3byJ9.kcM0vy7kDdugKiur9g6lWw";


var urls = {
    mapStyle: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    network: 'https://cyclenetworks.osm.be/brumob/data/network.geojson',
    route: 'https://routing.anyways.eu/api/route?',
    geocoder: `https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?`+
                `access_token=${mapboxAccessCode}&proximity=5.5196%2c50.9612`+
                'country=BE&'+
                'bbox=4.22%2C50.76%2C4.52%2C50.93&'+
                'limit=5&'+
                'types=place,locality,neighborhood,address,poi',
    reverseGeocoder: 'https://api.mapbox.com/geocoding/v5/mapbox.places/{0},{1}.json?limit=1&access_token=' + mapboxAccessCode
};

var anywaysConfigs = {
    apiKey: "mwK4irCD1whXx1XEpLQN6qotuM6P-Rh8"
};
