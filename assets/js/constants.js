var mapboxAccessCode = "pk.eyJ1IjoiYmVuLWFueXdheXMiLCJhIjoiY2szdWhla3R5MGNoajN1cHMyZG51aXF3byJ9.kcM0vy7kDdugKiur9g6lWw";

const routeWidthMain = 8;
const routeOpacityMain = 1;
const routeOpacityAltnerative = 0.0;

String.prototype.format = function () {
    let a = this;
    for (let k in arguments) {
        a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
    }
    return a
};


const test_urls = {
    mapStyle: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    network: 'https://cyclenetworks.osm.be/brumob/data/network.geojson',
    route: 'http://localhost:5000/route',
    geocoder: `https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?`+
                `access_token=${mapboxAccessCode}&proximity=5.5196%2c50.9612`+
                'country=BE&'+
                'bbox=5.3%2C50.70%2C5.7%2C51.1&'+
                'limit=5&'+
                'types=place,locality,neighborhood,address,poi',
    reverseGeocoder: 'https://api.mapbox.com/geocoding/v5/mapbox.places/{0},{1}.json?limit=1&access_token=' + mapboxAccessCode
};