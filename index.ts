import mapboxgl from 'mapbox-gl';
import $ from 'jquery';
import './assets/js/bootstrap3-typeahead.min.js';
import { Branding } from './branding/bike4brussels/branding';
import GlobalSvg from './assets/img/*.svg';

var jQuery = $;

var branding = new Branding();

// constants.js

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

const production_urls = {
    mapStyle: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    network: 'https://cyclenetworks.osm.be/brumob/data/network.geojson',
    //route: 'https://cycling-backend.anyways.eu/api',
    route: 'https://routing.anyways.eu/api',
    geocoder: `https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?` +
        `access_token=${mapboxAccessCode}&proximity=5.5196%2c50.9612` +
        'country=BE&' +
        'bbox=5.3%2C50.70%2C5.7%2C51.1&' +
        'limit=5&' +
        'types=place,locality,neighborhood,address,poi',
    reverseGeocoder: 'https://api.mapbox.com/geocoding/v5/mapbox.places/{0},{1}.json?limit=1&access_token=' + mapboxAccessCode
};

const test_urls = {
    mapStyle: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    network: 'https://cyclenetworks.osm.be/brumob/data/network.geojson',
    route: 'http://localhost:5000/route',
    geocoder: `https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?` +
        `access_token=${mapboxAccessCode}&proximity=5.5196%2c50.9612` +
        'country=BE&' +
        'bbox=5.3%2C50.70%2C5.7%2C51.1&' +
        'limit=5&' +
        'types=place,locality,neighborhood,address,poi',
    reverseGeocoder: 'https://api.mapbox.com/geocoding/v5/mapbox.places/{0},{1}.json?limit=1&access_token=' + mapboxAccessCode
};

var urls = production_urls;

// bike4brussels brandedScript.js

document.title = "Bike for Brussels | Routeplanner";

var mapboxAccessCode = "pk.eyJ1IjoiYmVuLWFueXdheXMiLCJhIjoiY2szdWhla3R5MGNoajN1cHMyZG51aXF3byJ9.kcM0vy7kDdugKiur9g6lWw";

var initialMap = {
    center: [4.3555, 50.8371],
    zoom: 11.54,
    style: 'https://api.maptiler.com/maps/3327a63f-c15d-462a-9f23-ebf73a14254a/style.json?key=jwL83LCYXcsbjHQxJcVH'
};

var urls = {
    mapStyle: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    network: 'https://cyclenetworks.osm.be/brumob/data/network.geojson',
    route: 'https://routing.anyways.eu/api/route?',
    geocoder: `https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?` +
        `access_token=${mapboxAccessCode}&proximity=5.5196%2c50.9612` +
        'country=BE&' +
        'bbox=4.22%2C50.76%2C4.52%2C50.93&' +
        'limit=5&' +
        'types=place,locality,neighborhood,address,poi',
    reverseGeocoder: 'https://api.mapbox.com/geocoding/v5/mapbox.places/{0},{1}.json?limit=1&access_token=' + mapboxAccessCode
};

var selectedProfile = 'profile1';

var anywaysConfigs = {
    apiKey: "mwK4irCD1whXx1XEpLQN6qotuM6P-Rh8"
};

// browserSpecifics.js

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older
        return true;
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11
        return true;
    }
    return false;
}

/*
 * The 'Global state' of the application which is shared between multiple modules
 */
// state.js
var state = {
    routes: {

    },
    location1: undefined, // The 'From'-location
    location1Marker: undefined,
    location2: undefined, // The 'To'-location
    location2Marker: undefined,
    routeRequests: {},
    sideBarIsOpen: undefined
};

// routeplanning.js
let language = "nl";

// TODO: label layers can be diffent per stylesheet, create a function to find them.
//var labelLayer = "road-label";
//var labelLayer = "waterway-label";
//var labelLayer = "highway_name_other";
//var labelLayer = "water_name_line";
var labelLayer = "waterway-name";



// defines the available profiles.
const availableProfiles = ["profile1", "profile2", "profile3"];
// the configuration of the profiles.



/**
 * Map containing the html id's of the profile buttons
 * @type {{"fastest-route": string, "relaxed-route": string, "other-route": string}}
 */
const profileButtonIds = {
    "network-genk-route": "profile1",
    "fastest-route": "profile2",
    "network-route": "profile3"

};


if (selectedProfile === undefined) {
    selectedProfile = "profile1";
}
console.log(selectedProfile);

mapboxgl.accessToken = mapboxAccessCode;
if (!initialMap) {
    initialMap = {
        center: [4.426690, 50.842000],
        zoom: 11.03,
        style: 'https://api.maptiler.com/maps/3327a63f-c15d-462a-9f23-ebf73a14254a/style.json?key=jwL83LCYXcsbjHQxJcVH'
    };
}
var map = new mapboxgl.Map({
    container: 'map',
    style: initialMap.style,
    center: initialMap.center,
    zoom: initialMap.zoom,
    preserveDrawingBuffer: true,
    attributionControl: false,
});

map.addControl(new mapboxgl.NavigationControl());





// urlhash.js
var urlhash = {
    updateHash: function (state) {
        location.hash = urlhash.formatHash(state);

        // also update all geo links.
        var locationHash = urlhash.formatHash(state, false);
        $('.geolink').each(function (geoLink) {
            var href = this.href;
            var i = href.indexOf('#');
            if (i >= 0) {
                href = href.substr(0, i);
            }
            this.href = href + locationHash;
        });


        // update the 'edit' button
        try {

            document.getElementById("edit-button-link").href
                = "https://www.openstreetmap.org/edit#map=" + (map.getZoom() + 1) + "/" + map.getCenter().lat + "/" + map.getCenter().lng;
        } catch (e) {
            // Oops, not initialized yet
            console.log("Could not update edit link", e)
        }
    },

    formatHash: function (args, doQuery = true) {
        var center, zoom, query;

        zoom = args.zoom;
        center = args.center;
        query = args.query;

        var precision = urlhash.zoomPrecision(zoom);
        var hash = '#' + zoom.toFixed(2) +
            '/' + center.lat.toFixed(precision) +
            '/' + center.lng.toFixed(precision);
        hash += "?sb=" + state.sideBarIsOpen;
        if (query && doQuery) {
            hash += '&' + urlhash.toQueryString(query);
        }
        return hash;
    },

    parseHash: function (url) {
        var args = {};

        let urlSplitQM = url.split("?");
        if (urlSplitQM.length > 1) {
            url = urlSplitQM[0];
            let queryString = urlSplitQM[1];
            args.query = {};

            let parts = queryString.split("&");
            for (let j = 0; j < parts.length; j++) {
                let [key, value] = parts[j].split('=');
                args.query[key] = value;
            }
        }


        let urlSplitHash = url.split("#");
        if (urlSplitHash.length > 1) {
            var coordinates = urlSplitHash[1];


            let splitBySlash = coordinates.split('/');
            let zoom = parseFloat(splitBySlash[0]);
            let lat = parseFloat(splitBySlash[1]);
            let lng = parseFloat(splitBySlash[2]);

            if (!isNaN(zoom) && !isNaN(lat) && !isNaN(lng)) {
                args.center = {
                    lat: lat,
                    lng: lng
                };
                args.zoom = zoom;
            }

        }
        return args;
    },

    toQueryString: function (paramsObject) {
        return Object
            .keys(paramsObject)
            .map(key => `${encodeURIComponent(key)}=${paramsObject[key]}`)
            .join('&');
    },


    zoomPrecision: function (zoom) {
        return Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
    }
};





//set the corect language
var userLang = navigator.language || navigator.userLanguage;
if (userLang === 'nl' || userLang === 'fr') {
    language = userLang;
}
// Check browser support
if (typeof (Storage) !== "undefined") {
    let temp_lang = localStorage.getItem("lang");
    if (temp_lang) {
        language = temp_lang;
    }
} else {
    console.log("Sorry, your browser does not support Web Storage.");
}



/**
 * Convert the time returned by the routing api to a string representation readable for humans
 * @param s
 * @returns {string}
 */
function timeToText(s) {
    if (s < 60) {
        return '1';
    }
    if (s < 3600) {
        return `${Math.round(s / 60)}`;
    }
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    return `${h} uur, ${m}`;
}

/**
 * Calculates all routes and shows it on the map
 * @param {[int, int]} origin - The LatLng Coords
 * @param {[int, int]} destination - The LatLng Coords
 * @param {[String]} profiles - for every profile, a route will be requested
 * @param {String} lang - en/nl/fr select the language for the instructions
 */
function calculateAllRoutes(origin, destination, profiles = availableProfiles) {
    $(".route-instructions ul").html("");
    $(`.route-instructions .elevation-info`).html("<img src='./img/Loading.gif' style='width: 100%;'  alt=\"Loading...\" />");
    state.routes = {};
    removeAllRoutesFromMap();
    profiles.forEach(function (profile) {
        calculateRoute(origin, destination, profile);
    });
    //fitToBounds(origin, destination);
}

/**
 * Calculates a route and shows it on the map
 * @param {[int, int]} origin - The LatLng Coords
 * @param {[int, int]} destination - The LatLng Coords
 * @param {String} profile - The routing profile
 * @param {String} lang - en/nl/fr select the language for the instructions
 */
function calculateRoute(origin, destination, profile = "bicycle.fastest") {


    var apiKey = "";
    if (anywaysConfigs) {
        apiKey = anywaysConfigs.apiKey;
    }

    // get the routing profile.
    var profileConfig = branding.getProfileConfig(profile);
    let profile_url = profileConfig.backendName;

    const prof = (profile_url === "" ? "" : `&profile=${profile_url}`);

    let endpoint = urls.route;
    if (profileConfig.backend != null) {
        endpoint = profileConfig.backend;
    }

    let originS = origin;
    let destinationS = destination;

    // if (profileConfig.format === "latlon") {
    //     originS = swapArrayValues(origin);
    //     destinationS = swapArrayValues(destination);
    // }

    var url = `${endpoint}loc=${originS}&loc=${destinationS}${prof}`;
    if (apiKey) {
        url = url + "&api-key=" + apiKey;
    }
    state.routes[profile] = [];

    if (state.routeRequests[profile]) {
        try {
            state.routeRequests[profile].abort();
        } catch (e) {
            console.warn(e, state.routeRequests[profile]);
        }
    }

    // send api-call via ajax
    state.routeRequests[profile] = $.ajax({
        dataType: "json",
        url: url,
        success: success,
        error: requestError
    });

    // method to be executed on successfull ajax call (we have a route now)
    function success(json) {
        var routeColor = profileConfig.routecolor.color;

        if (profile === selectedProfile) {
            sidebarDisplayProfile(selectedProfile);
        }

        let routeStops = [];
        let heightInfo = [];

        var route = json.features;

        var popularColors = {};
        for (let i in route) {
            if (route[i].properties === undefined ||
                route[i].properties.cycle_network_colour === undefined) {
                // nothing to see here.
            } else if (route[i].properties.cycle_network_colour.length === 7) {
                // exactly one color.
                var c = popularColors[route[i].properties.cycle_network_colour];
                if (c !== undefined) {
                    c++;
                } else {
                    c = 0;
                }
                popularColors[route[i].properties.cycle_network_colour] = c;
            } else {
                let colors = route[i].properties.cycle_network_colour.split(',');
                colors.forEach(function (color) {
                    let c = popularColors[color];
                    if (c !== undefined) {
                        c++;
                    } else {
                        c = 0;
                    }
                    popularColors[color] = c;
                });
            }
        }

        for (let i in route) {
            if (route[i].name === "Stop") {
                routeStops.push(route[i]);
            }
            if (route[i].properties.cycle_network_colour === undefined) {
                route[i].properties.cycle_network_colour = routeColor;
            } else if (route[i].properties.cycle_network_colour.length !== 7) {
                if (route[i].properties.cycle_network_colour.length > 7) {
                    var colors = route[i].properties.cycle_network_colour.split(',');
                    // choose most popular color.
                    var popularity = 0;
                    var chosen = colors[0];
                    colors.forEach(function (color) {
                        var c = popularColors[color];
                        if (c > popularity) {
                            chosen = color;
                            popularity = c;
                        }
                    });
                    route[i].properties.cycle_network_colour = chosen;
                } else {
                    route[i].properties.cycle_network_colour = routeColor;
                }
            }
            try {
                heightInfo.push(route[i].geometry.coordinates[0][2]);
            } catch (e) {
                console.log("Failed to read height info", e);
            }
        }
        state.routes[profile] = route;
        if (json.instructions) {
            //addInstructions(json.instructions, profile);
        }
        var profileDivId = profile + "-instruction";
        if (routeStops.length === 2) {
            let totaltimeElectr = timeToText(routeStops[1].properties.time * 15 / 20);
            $(`#${profileDivId} .distance`).html(`${formatDistance(routeStops[1].properties.distance)}`);
            $(`#${profileDivId} .time`).html(`${timeToText(routeStops[1].properties.time)} min`);
            $(`#${profileDivId} .time-electric`).html(`${totaltimeElectr} min`);
            //$instrResume.html(`<div></div><div>min<br><div><img class="electricity" src="assets/img/electricity.svg"/>  </div></div>`);
        }

        // Check if profile already exists
        const calculatedRoute = map.getSource(profile + "-source");
        if (calculatedRoute) {
            // Just set the data
            calculatedRoute.setData(json.route);
        } else {
            // Add a new layer
            map.addSource(profile + "-source", {
                type: 'geojson',
                data: json
            });
            //console.log(json.route)

            var opacity = routeOpacityAltnerative;
            var width = routeWidthMain;

            if (profile === selectedProfile) {
                width = routeWidthMain;
                opacity = routeOpacityMain;
            }
            // create the outline of the route
            map.addLayer({
                id: profile + '-casing',
                type: 'line',
                source: profile + "-source",
                paint: {
                    'line-color': "#FFFFFF",
                    'line-width': width * 1.9,
                    'line-opacity': opacity
                },
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round'
                }
            }, labelLayer);
            if (profileConfig.routecolor.backend) {
                // create the actual colored line using the colors coming from the API.
                map.addLayer({
                    id: profile,
                    type: 'line',
                    source: profile + "-source",
                    paint: {
                        'line-color':
                        {   // always use the colors of the cycling network
                            type: 'identity',
                            property: 'cycle_network_colour'
                        }
                        ,
                        'line-width': width,
                        'line-opacity': opacity
                    },
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round'
                    }
                }, labelLayer);
            } else {
                map.addLayer({
                    id: profile,
                    type: 'line',
                    source: profile + "-source",
                    paint: {
                        'line-color': profileConfig.routecolor.color,
                        'line-width': width,
                        'line-opacity': opacity
                    },
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round'
                    }
                }, labelLayer);
            }

        }
        //fitToBounds(origin, destination);   //Called again to make sure the start or endpoint are not hidden behind sidebar
    }

    // Request failed, cleanup nicely
    function requestError(jqXHR, textStatus, errorThrown) {
        if (textStatus !== "abort") {
            if (map.getLayer(profile)) {
                map.removeLayer(profile);
            }
            if (map.getSource(profile)) {
                map.removeSource(profile);
            }
            console.warn('Problem calculating route: ', errorThrown, textStatus, jqXHR);
        }
    }
}

var warningOpen = false;

/**
 * Removes routes from map.. obviously
 */
function removeAllRoutesFromMap() {
    sidebarDisplayProfile(selectedProfile);
    for (let i in availableProfiles) {
        var profile = availableProfiles[i];
        if (map.getLayer(profile)) {
            map.removeLayer(profile);
        }
        if (map.getLayer(profile + "-casing")) {
            map.removeLayer(profile + "-casing");
        }
        if (map.getSource(profile + "-source")) {
            map.removeSource(profile + "-source");
        }
    }
}

/**
 * Method to refresh / set markers on the map. Will also start route calculation if 2 locations are present
 */
function showLocationsOnMap() {
    var me = this;

    if (state.location1 === undefined || state.location2 === undefined) {
        removeAllRoutesFromMap();
    }
    if (state.location1Marker !== undefined) {
        state.location1Marker.remove();
    }
    if (state.location1 !== undefined) {
        state.location1Marker = createMarker(state.location1, '<span class="marker-text">A</span>');
        state.location1Marker.on('dragend', function () {
            var latLng = state.location1Marker.getLngLat();
            state.location1 = [latLng.lng, latLng.lat];
            showLocationsOnMap();
            // Update 'from'-textfield

            $.getJSON(urls.reverseGeocoder.format(latLng.lng, latLng.lat), function (data) {
                let address = data.features[0].place_name;
                let field = document.getElementById('fromInput');
                field.value = address;
            });


        });
    }
    if (state.location2Marker !== undefined) {
        state.location2Marker.remove();
    }
    if (state.location2 !== undefined) {
        state.location2Marker = createMarker(state.location2, '<span class="marker-text">B</span>');
        state.location2Marker.on('dragend', function () {
            var latLng = state.location2Marker.getLngLat();
            state.location2 = [latLng.lng, latLng.lat];
            showLocationsOnMap();
            // Update 'to'-textfield
            $.getJSON(urls.reverseGeocoder.format(latLng.lng, latLng.lat), function (data) {
                let address = data.features[0].place_name;
                let field = document.getElementById('toInput');
                field.value = address;
            });
        });
    }
    if (state.location1 !== undefined && state.location2 !== undefined) {
        calculateAllRoutes(state.location1, state.location2);
    }
    updateUrlParams();
}

// Sets the latitude, longitude, zoom level and router points as params in the url
function updateUrlParams() {
    var params = {};
    params.zoom = map.getZoom();
    params.center = map.getCenter();

    params.query = {};
    if (state.location1) {
        params.query.o = "" + state.location1[0].toFixed(7) + "," + state.location1[1].toFixed(7);
    }
    if (state.location2) {
        params.query.d = "" + state.location2[0].toFixed(7) + "," + state.location2[1].toFixed(7);
    }
    params.query.p = selectedProfile;

    urlhash.updateHash(params);
}

/**
 * Create a marker to be shown on the map.
 * @param loc Location of the marker (LngLat)
 * @param color The color of the marker
 * @returns {*} A marker
 */
function createMarker(loc, label) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.innerHTML = label;
    el.className = 'marker';

    // make a marker for each feature and add to the map
    return new mapboxgl.Marker({
        element: el,
        draggable: true,
        offset: [0, -20]
    })
        .setLngLat(loc)
        .addTo(map);
}

/**
 * Add hillshades to the map once it's loaded
 */
map.on('load', function () {

    AddMapLayers();
    sidebarDisplayProfile(selectedProfile);
    if (state.location1 || state.location2) {
        showLocationsOnMap();
    }
});

/**
 * Detect clicks on the map. If you click on a route it gets selected, if not on a route, set new location
 * (start or end, depending on whether there already is a start).
 */
map.on('click', function (e) {
    console.log('click');
    var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
    var features = map.queryRenderedFeatures(
        bbox,
        {
            //options (none)
        }
    );
    let profile_found;
    for (let i in features) {
        if ($.inArray(features[i].layer.id, availableProfiles) !== -1) {
            if (!profile_found) {
                profile_found = features[i].layer.id;
            }
        }
    }
    if (profile_found) {    // select route
        sidebarDisplayProfile(profile_found);
    } else {                // set new location
        var lngLatArray = [e.lngLat.lng, e.lngLat.lat];
        if (state.location1 === undefined) {
            state.location1 = lngLatArray;
            reverseGeocode(state.location1, function (adress) {
                $("#fromInput").val(adress);
                fromFieldInputDetected(document.getElementById("fromInput"));
            });
        } else {
            state.location2 = lngLatArray;
            reverseGeocode(state.location2, function (adress) {
                $("#toInput").val(adress);
                toFieldInputDetected(document.getElementById("toInput"));
            });
        }
        showLocationsOnMap();
    }
    showOrHideClearButtons();
});
// Whenever we move around, update this in the URL
map.on('dragend', updateUrlParams);
map.on('moveend', updateUrlParams);
map.on('zoomend', updateUrlParams);

/**
 * Initialise the geocoders for the input fields.
 */
function initInputGeocoders() {
    $('.geocoder-input').typeahead({
        source: function (query, callback) {
            // MapBox Geocoder:
            $.getJSON(urls.geocoder.format(query)/*`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxAccessCode}&proximity=50.861%2C4.356&country=BE&bbox=3.9784240723%2C50.6485897217%2C4.7282409668%2C51.0552073386&limit=5`*/,
                function (data) {
                    var resArray = [];
                    for (var feature in data.features) {
                        resArray.push({
                            name: data.features[feature].text + " (" + data.features[feature].place_name + ")",
                            loc: data.features[feature].center
                        });
                    }
                    callback(resArray);
                    fromFieldInputDetected(document.getElementById("fromInput"));
                    toFieldInputDetected(document.getElementById("toInput"));
                });
        },
        matcher: function (s) {   //Fix display results when query contains space
            return true;
        },
        afterSelect: function (activeItem) {
            var id = this.$element.attr('id');
            if (id == "fromInput") {
                //set the origin, add to the map
                state.location1 = activeItem.loc;
            } else if (id == "toInput") {
                //set the destination, add to the map
                state.location2 = activeItem.loc;
            } else {
                //fout
                console.warn("FIELD NOT FOUND!");
            }
            showLocationsOnMap();

            if (state.location1 && state.location2) {
                fitToBounds(state.location1, state.location2);
            } else if (state.location1) {
                map.jumpTo({
                    center: state.location1,
                    zoom: 15
                });
            } else if (state.location2) {
                map.jumpTo({
                    center: state.location2,
                    zoom: 15
                });
            }
        }
    });
}


/**
 * Use the current user location as a startpoint.
 */
function useCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, locationFetchFailed);
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem("geolocation.permission.denieddate");
        }
    } else {
        console.warn("Geolocation is not supported by this browser.");
    }
}

/**
 * Utility method to add days to a date object
 * @param days The number of days to add
 * @returns {Date} The calculated date
 */
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

/**
 * Set location1 to the specified position, show it on the map and fill in the adress in the input field
 * @param position the position to be set (LatLng)
 */
function showPosition(position) {
    state.location1 = [position.coords.longitude, position.coords.latitude];
    showLocationsOnMap();
    reverseGeocode(state.location1, function (adress) {
        $("#fromInput").val(adress);
        fromFieldInputDetected(document.getElementById("fromInput"));
    });
}

/**
 * Function that is called when geolocation failed. Sets value in localstorage so that the next time the page loads this can be taken into account.
 * @param error
 */
function locationFetchFailed(error) {
    if (error.code === error.PERMISSION_DENIED) {
        console.log("Geolocation permission denied");
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("geolocation.permission.denieddate", new Date());
        }
    } else {
        console.warn("Accessing geolocation failed.", error);
    }
}

/**
 * Zoom the map to the given 2 points.
 * @param origin
 * @param destination
 */
function fitToBounds(origin, destination) {
    let bounds = new mapboxgl.LngLatBounds();
    bounds.extend(origin);
    bounds.extend(destination);
    // Fit the map to the route
    let paddingRight = 50;
    if (!sidebarIsClosed()) {
        paddingRight += $("#sidebar-right-container").width();
    }

    if (window.innerWidth <= 767) {
        map.fitBounds(bounds, {
            padding: {
                top: 0,
                right: 10,
                bottom: 0,
                left: 10
            }
        });
    } else {
        map.fitBounds(bounds, {
            padding: {
                top: 75,
                right: paddingRight,
                bottom: 150,
                left: 50
            }
        });
    }
}

/**
 * Make location1 location2 and location2 location1.
 */
function swapOriginDestination() {
    var locTemp = state.location1;
    state.location1 = state.location2;
    state.location2 = locTemp;

    var fromInput = $("#fromInput");
    var toInput = $("#toInput");

    var adress1 = fromInput.val();
    fromInput.val(toInput.val());
    toInput.val(adress1);

    showLocationsOnMap();
}

/**
 * Utility method to swap 2 array values (usefull for LatLng <=> LngLat)
 * @param array
 * @returns {Array}
 */
function swapArrayValues(array) {
    var newArray = [];
    newArray[0] = array[1];
    newArray[1] = array[0];
    /*const temp = array[1];
    array[1] = array[0];
    array[0] = temp;*/
    return newArray;
}

// initialise the geocoders already
initInputGeocoders();

// sidebar.js
/*
 * All the handling of the sidebar
 * - Showing/Hiding
 * - Highlighting the selected profile
 */
function toggleSidebar() {
    var isClosed = sidebarIsClosed();
    if (isClosed) {
        openSidebar();
    } else {
        closeSidebar();
    }
    updateUrlParams();
}

function sidebarIsClosed() {
    var container = $("#sidebar-right-container");
    return container.hasClass("hidden-sidebar");
}

/**
 * Closes the sidebar visible/invisible
 */
function closeSidebar() {
    var container = $("#sidebar-right-container");

    container.addClass('hidden-sidebar');

    var bar = $("#content-pane");
    bar.removeClass('col-lg-9');
    bar.addClass('col-lg-12');

    var mobileButtons = $(".mobile-buttons");
    mobileButtons.removeClass('hidden');

    var buttons = document.getElementsByClassName("sidebar-toggle-button");
    for (var i in buttons) {
        if (buttons[i] &&
            buttons[i].classList) {
            buttons[i].classList.remove('sidebar-toggle-button-close');
        }
    }
    state.sideBarIsOpen = false;
}

/**
 * Opens the sidebar.
 */
function openSidebar() {
    var container = $("#sidebar-right-container");
    container.removeClass('hidden-sidebar');

    var bar = $("#content-pane");
    bar.removeClass('col-lg-12');
    bar.addClass('col-lg-9');

    var mobileButtons = $(".mobile-buttons");
    mobileButtons.addClass('hidden');

    var buttons = document.getElementsByClassName("sidebar-toggle-button");
    for (var i in buttons) {
        if (buttons[i] &&
            buttons[i].classList) {
            buttons[i].classList.add('sidebar-toggle-button-close');
        }
    }
    state.sideBarIsOpen = true;
}


/**
 * Select a profile with the given button id 9 + updates the url parameters
 * Called from the HTML it
 * @param id
 */
function sidebarDisplayProfileHtmlId(profile) {
    sidebarDisplayProfile(profile);
    updateUrlParams();
}

/**
 * Select the profile
 * @param profile
 */
function sidebarDisplayProfile(profile) {

    for (var k in profileButtonIds) {
        // Reset all buttons to the default style
        var kprofile = profileButtonIds[k];
        var buttons = document.getElementsByClassName(kprofile + "-button");
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            btn.classList.remove("profile-selection-button-active");
            btn.classList.add("profile-selection-button-non-active");
        }
    }
    var profileButtons = document.getElementsByClassName(profile + "-button");
    for (var j = 0; j < profileButtons.length; j++) {
        var pbtn = profileButtons[j];
        pbtn.classList.remove("profile-selection-button-non-active");
        pbtn.classList.add("profile-selection-button-active");
    }

    selectedProfile = profile;
    $(".route-instructions").addClass("height-zero");
    $(".profile-summary").addClass("height-zero");
    $("#sidebar-top>span").removeClass("active");
    $("#top-overlay-profile-buttons-mobile>span").removeClass("active");

    let profileButtonId = Object.keys(profileButtonIds).find(key => profileButtonIds[key] === profile);


    $(`#${profileButtonId}`).addClass("active");
    $(`#${profileButtonId}-mobile`).addClass("active");


    if (state.location1 && state.location2) {
        var profileDivId = profile + "-instruction";
        $(`#${profileDivId}`).removeClass("height-zero");
    } else {
        var summaryDivId = profile + "-summary";
        $(`#${summaryDivId}`).removeClass("height-zero");
    }

    showLayersForProfile(selectedProfile);
}

/* The branded script contains all the profiles, with texts and images.
 * This piece of javascript adjust the image sources and text to load the branded versions
 */
function loadBrandedTexts() {

    for (var profile of availableProfiles) {
        var profileConfig = branding.getProfileConfig(profile);

        document.getElementById(profile + "-small-logo").src = getTerm(profileConfig.frontendLogo);
        document.getElementById(profile + "-small-logo-bottom").src = getTerm(profileConfig.frontendLogo);

        document.getElementById(profile + "-icon").src = getTerm(profileConfig.frontendLogo);

        document.getElementById(profile + "-button-text").innerHTML = getTerm(profileConfig.frontendName);
        document.getElementById(profile + "-button-text-bottom").innerHTML = getTerm(profileConfig.frontendName);
        document.getElementById(profile + "-subtitle").innerHTML = getTerm(profileConfig.frontendSubtitle);
        document.getElementById(profile + "-paragraph").innerHTML = getTerm(profileConfig.frontendExplanation);
    }
}


// markers.js
/*
 * This javascript handles:
 * - Placing and removing markers
 * - Reverse geocoding them when placed on click
 * - Geocoding text input from the fields and placing them on the map
 */


/**
 * Method that gets called when input is detected in the Startpoint input field
 * @param el - The input field itself
 */
function fromFieldInputDetected() {
    var el = document.getElementById("fromInput");

    if ((!el.value || el.value === "")) {
        //show location button
        if (windowLoaded) {
            console.log("setting location 1 to undef");
            state.location1 = undefined;
            showLocationsOnMap();
        }
    }

    showOrHideClearButtons();
}

/**
 * Method that gets called when input is detected in the Endpoint input field
 * @param el - The input field itself
 */
function toFieldInputDetected() {
    var el = document.getElementById("toInput");
    if ((!el.value || el.value === "")) {
        //show location button
        state.location2 = undefined;
        showLocationsOnMap();
    }
    showOrHideClearButtons();
}

// Deducts which clear crosses have to be shown, and shows them
function showOrHideClearButtons() {

    let frm = document.getElementById("fromInput");
    let showFromClear = (frm.value !== undefined && frm.value !== "") || state.location1 !== undefined;

    if (showFromClear) {
        $("#clearInputFieldFromButton").show();
        $("#useLocationInputFieldButton").hide();
    } else {
        $("#clearInputFieldFromButton").hide();
        $("#useLocationInputFieldButton").show();
    }

    let to = document.getElementById("toInput");
    let showToClear = (to.value !== undefined && to.value !== "") || state.location2 !== undefined;

    if (showToClear) {
        $("#clearInputFieldToButton").show();
    } else {
        $("#clearInputFieldToButton").hide();
    }
}

/**
 * Empty the contents of the startpoint input field
 */
function clearInputFieldFrom() {
    $("#fromInput").val("");
    state.location1 = undefined;
    showLocationsOnMap();
    fromFieldInputDetected(document.getElementById("fromInput"));
}

/**
 * Empty the contents of the endpoint input field
 */
function clearInputFieldTo() {
    $("#toInput").val("");
    state.location2 = undefined;
    showLocationsOnMap();
    toFieldInputDetected(document.getElementById("toInput"));
}


/**
 * Convert a location to an adress.
 * @param location LatLng of the location to be converted.
 * @param callback Function to be called when conversion is complete
 */
function reverseGeocode(location, callback) {
    var lng = location[0];
    var lat = location[1];
    $.getJSON(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=0`, function (data) {
        callback(data.display_name);
    });
    /*/
    $.getJSON(urls.reverseGeocoder.format(lng, lat), function (data) { 
        callback(data.features[0].text + " (" + data.features[0].place_name + ")");
    });
    //*/
}

// layercontrol.js

/*
 * This javascript only handles the different extra layers that have to be added onto the map
 */

function AddMapLayers() {
    map.resize();

    map.addSource('cyclenetworks-tiles', {
        type: 'vector',
        // url: 'https://localhost:5001/cyclenetworks/mvt.json' /*/
        // url: 'https://routing.anyways.eu/vector-tiles/cyclenetworks-test/mvt.json' //*/ 
        url: 'https://staging.anyways.eu/api/vector-tiles/cyclenetworks/mvt.json',
    });

    map.addLayer({
        "id": "cyclenetwork-tiles",
        "type": "line",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenetwork",
        "minzoom": 11,
        "layout": {
            "visibility": "none",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#0ea9b7",
            "line-width": 2,
            "line-dasharray": [2, 2]
        },
        "filter": [
            "all",
            [
                "!=",
                "brussels",
                "yes"
            ]
        ]
    }, labelLayer);

    map.addLayer({
        "id": "cyclenetwork-tiles-high",
        "type": "line",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenetwork",
        "maxzoom": 11,
        "layout": {
            "visibility": "visible",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#0ea9b7",
            "line-width": 1
        },
        "filter": [
            "all",
            [
                "!=",
                "brussels",
                "yes"
            ]
        ]
    }, labelLayer);

    map.addLayer({
        "id": "cyclenodes-circles",
        "type": "circle",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenodes",
        "minzoom": 11,
        "layout": {
            "visibility": "none"
        },
        "paint": {
            "circle-stroke-width": 2,
            "circle-stroke-color": "#0ea9b7",
            "circle-radius": 10,
            "circle-color": "#000000",
            "circle-opacity": 0
        }
    });

    map.addLayer({
        "id": "cyclenodes-circles-high",
        "type": "circle",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenodes",
        "maxzoom": 11,
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "circle-stroke-width": 1,
            "circle-stroke-color": "#2D495A",
            "circle-radius": 7,
            "circle-color": "#FFFFFF"
        }
    });

    map.addLayer({
        "id": "cyclenodes-circles-center",
        "type": "circle",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenodes",
        "minzoom": 11,
        "layout": {
            "visibility": "none"
        },
        "paint": {
            "circle-radius": 10,
            "circle-color": "#FFFFFF"
        }
    });

    map.addLayer({
        "id": "cyclenodes-labels-high",
        "type": "symbol",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenodes",
        "maxzoom": 11,
        "layout": {
            "visibility": "none",
            "text-field": "{rcn_ref}",
            "text-size": 7
        },
        "paint": {
            "text-color": "#2D495A",
            "text-halo-color": "#FFFFFF",
            "text-halo-width": 2,
            "text-halo-blur": 0
        }
    });

    map.addLayer({
        "id": "cyclenodes-labels",
        "type": "symbol",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenodes",
        "minzoom": 11,
        "layout": {
            "visibility": "none",
            "text-field": "{rcn_ref}",
            "text-size": 13
        },
        "paint": {
            "text-color": "#2D495A",
            "text-halo-color": "#FFFFFF",
            "text-halo-width": 2,
            "text-halo-blur": 0
        }
    });

    branding.addLayers(map);
}

function showLayersForProfile(selectedProfile) {
    var localConfig = branding.getProfileConfig(selectedProfile);
    if (localConfig && localConfig.layers) {

        availableProfiles.forEach(function (profile) {
            if (map.getLayer(profile)) {
                map.setLayoutProperty(profile, 'visibility', 'none');
                map.setPaintProperty(profile, 'line-opacity', routeOpacityAltnerative);
                map.setPaintProperty(profile + '-casing', 'line-opacity', routeOpacityAltnerative);
            }
        });

        if (map.getLayer(selectedProfile)) {
            map.setLayoutProperty(selectedProfile, 'visibility', 'visible');
            map.setPaintProperty(selectedProfile, 'line-opacity', routeOpacityMain);
            map.setPaintProperty(selectedProfile + '-casing', 'line-opacity', routeOpacityMain);
        }

        for (var layerId in localConfig.layers) {
            if (localConfig.layers.hasOwnProperty(layerId)) {
                var layer = map.getLayer(layerId);
                if (layer) {
                    var styleConfig = localConfig.layers[layerId];
                    if (styleConfig) {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');

                        if (state.location1 && state.location2) {
                            if (styleConfig.route) {
                                if (styleConfig.route["line-opacity"]) {
                                    map.setPaintProperty(layerId, 'line-opacity', styleConfig.route["line-opacity"]);
                                }
                            }
                        } else {
                            if (styleConfig.default) {
                                if (styleConfig.default["line-opacity"]) {
                                    map.setPaintProperty(layerId, 'line-opacity', styleConfig.default["line-opacity"]);
                                }
                            }
                        }
                    } else {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    }
                }
            }
        }
    }
}

// uihelper.js

let windowLoaded = false;


/**
 * Do stuff when the window is done loading, such as interpreting the URL parameters
 */
window.onload = function () {
    let urlparams = urlhash.parseHash(location.hash);

    if (selectedProfile === undefined) {
        selectedProfile = "profile1";
    }

    sidebarDisplayProfile(selectedProfile);

    if (urlparams.query) {
        state.sideBarIsOpen = urlparams.query.sb !== "false";
        if (state.sideBarIsOpen) {
            openSidebar();
        } else {
            closeSidebar();
        }
    }

    //console.log(location.hash, state, "Sidebar is ", state.sideBarIsOpen);
    if (urlparams.query && urlparams.query.o) {
        // Note: the definition of 'state' can be found in 'state.js'
        var c = urlparams.query.o.split(',');
        state.location1 = [parseFloat(c[0]), parseFloat(c[1])];
    } else {
        if (!(typeof (Storage) !== "undefined" &&
            new Date(localStorage.getItem("geolocation.permission.denieddate")).addDays(7) > new Date())) {
            setTimeout(function () {
                useCurrentLocation();
            }, 2000);
        }
    }
    if (urlparams.query && urlparams.query.d) {
        var c = urlparams.query.d.split(',');
        state.location2 = [parseFloat(c[0]), parseFloat(c[1])];
    }

    if (urlparams.query && urlparams.query.p) {
        if (urlparams.query.p !== selectedProfile) {
            sidebarDisplayProfile(urlparams.query.p);
        }
    }

    if (state.location1) {
        reverseGeocode(state.location1, function (adress) {
            $("#fromInput").val(adress);
        });
        $("#useLocationInputFieldButton").hide();
        $("#clearInputFieldFromButton").show();
    }
    if (state.location2) {
        reverseGeocode(state.location2, function (adress) {
            $("#toInput").val(adress);
        });
        $("#clearInputFieldToButton").show();
    }


    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }), 'top-left');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-left');


    let startLink = "https://www.openstreetmap.org/edit#map=" + (map.getZoom() + 1) + "/" + map.getCenter().lat + "/" + map.getCenter().lng;
    let attributionControl = new mapboxgl.AttributionControl({
        compact: false, customAttribution:
            "<a id=\"edit-button-link\" href=\"" + startLink + "\" target=\"_blank\">\n" +
            "<img src=\"" + GlobalSvg["edit"] + "\" alt=\"Edit OSM here\"/> </a>"
    });
    map.addControl(attributionControl)

    if (urlparams.zoom) {
        // jump to view.
        map.jumpTo({
            center: urlparams.center,
            zoom: urlparams.zoom
        });
    }

    windowLoaded = true;
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker.register('service-worker.js');
    // }
};




/*********** MISC helper functions **************/

/**
 * Replace all SVG images with inline SVG, so they can be styled
 */
function inlineAllSvgs() {
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        var imgOnClick = $img.attr('onclick');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Add replaced image's actions to the new svg
            if (typeof imgOnClick !== 'undefined') {
                $svg = $svg.attr('onclick', imgOnClick);
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });
}
/**
 * Formats the distance, given in meters
 * @param distance
 * @returns {string}
 */
function formatDistance(distance) {
    console.log(distance)
    if (distance < 1000) {
        return Math.round(distance) + ' m';
    }
    return ((distance / 1000).toFixed(2) + ' km').replace('.', ",");
}

// language.js

/*
 * This script runs _after_ the branded script.
 * If it detects support for multiple languages, it'll show the language buttons and apply necessary translations
 */

// Global variable containing the current language
var currentLanguage = "en";
if (branding.languages !== null) {
    currentLanguage = branding.languages[0];
}
var languageButtons: HTMLLabelElement[] = [];

function initLanguageControls() {
    var supportedLanguages = branding.languages;
    if (supportedLanguages == null) {
        return;
    }
    if (supportedLanguages.length === 1) {
        return;
    }

    let container = document.getElementById("language-buttons");
    for (var i in supportedLanguages) {
        let lng = supportedLanguages[i];
        let Lng = lng.toUpperCase();
        var langButton = document.createElement("label");
        langButton.className = "btn language-button";   
        langButton.id = "lang-" + lng;     
        langButton.addEventListener("click", (ev) => {
            applyLanguage(lng);
        });
        if (lng == currentLanguage) {
            langButton.className = "btn language-button active";
        }
        langButton.innerHTML = Lng;
        container.appendChild(langButton);

        languageButtons.push(langButton);
    }

    container.classList.remove("hidden");
}

function applyLanguage(newLanguage) {
    var supportedLanguages = branding.languages;
    var translatedStrings = branding.translations;

    if (supportedLanguages === undefined) {
        return;
    }
    if (!supportedLanguages.includes(newLanguage)) {
        return;
    }

    currentLanguage = newLanguage;
    loadBrandedTexts(); // or rather - reload them

    languageButtons.forEach(lb => {
       if (lb.id == "lang-" + currentLanguage){
        lb.className = "btn language-button active";
       } else {
        lb.className = "btn language-button";  
       }
    });

    if (translatedStrings === undefined) {
        return;
    }

    for (var key in translatedStrings.keys) {

        let text = translatedStrings[key][currentLanguage];

        if (key === 'document.title') {
            document.tile = text;
        } else {
            let splt = key.split('.');
            let elementId = splt[0];
            let elementAttribute = "innerHTML";
            if (splt.length === 2) {
                elementAttribute = splt[1];
            }
            let element = document.getElementById(elementId);
            element[elementAttribute] = text;
        }
    }
}


/*
 * Gets the right term.
 * Input: either a string or a dictionary of the format {'languagecode' --> 'term'}
 * Returns: the input string or the right term according to the current language
 */
function getTerm(languageDictionary) {
    if (typeof languageDictionary === "string") {
        return languageDictionary;
    }
    var term = languageDictionary[currentLanguage];

    if (term === undefined) {
        console.log("Untranslated text for language", currentLanguage, languageDictionary);
    }

    return term;
}


function applyNavigatorLanguage() {
    let lng = navigator.language.split("-")[0];
    applyLanguage(lng);
}

// index.html
// inline scripts

if (detectIE()) {
    alert("Het programma dat je gebruikt om op het internet te gaan is te oud. Gelieve een andere browser te installeren. We sturen je door...");
    window.location.replace("https://www.mozilla.org/en-US/firefox/new/");
}

document.getElementById("sidebarHamburger").addEventListener("click", toggleSidebar);
document.getElementById("toggleSidebarFull").addEventListener("click", toggleSidebar);
document.getElementById("profile1").addEventListener("click", (ev) => {
    sidebarDisplayProfileHtmlId('profile1');
});
document.getElementById("profile1-full").addEventListener("click", (ev) => {
    sidebarDisplayProfileHtmlId('profile1');
});
document.getElementById("profile2").addEventListener("click", (ev) => {
    sidebarDisplayProfileHtmlId('profile2');
});
document.getElementById("profile2-full").addEventListener("click", (ev) => {
    sidebarDisplayProfileHtmlId('profile2');
});
document.getElementById("profile3").addEventListener("click", (ev) => {
    sidebarDisplayProfileHtmlId('profile3');
});
document.getElementById("profile3-full").addEventListener("click", (ev) => {
    sidebarDisplayProfileHtmlId('profile3');
});
document.getElementById("useLocationInputFieldButton").addEventListener("click", useCurrentLocation);


if (window.innerWidth <= 767) {
    closeSidebar();
} else {
    openSidebar();
}

// TODO: move all branding specifics here!
branding.apply();

loadBrandedTexts();
inlineAllSvgs();
showOrHideClearButtons();
initLanguageControls();
applyNavigatorLanguage();