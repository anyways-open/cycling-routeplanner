let language = "nl";

// TODO: label layers can be diffent per stylesheet, create a function to find them.
//var labelLayer = "road-label";
//var labelLayer = "waterway-label";
//var labelLayer = "highway_name_other";
//var labelLayer = "water_name_line";
var labelLayer = "waterway-name";

var state = {
    routes: {

    },
    location1: undefined,
    location1Marker: undefined,
    location2: undefined,
    location2Marker: undefined,
    routeRequests: {}
}

// defines the available profiles.
const availableProfiles = ["network-genk", "network", "fastest"];
// the configuration of the profiles.

var profileConfigs = {
    "network-genk": {
        profileDivId: "network-genk-instruction",
        summaryDivId: "network-genk-summary",
        backendName: "bicycle.genk",
        layers: {
            "cyclenetworks": {
                "default": {
                    "line-opacity": 1
                },
                "route": {
                    "line-opacity": 0.3
                }
            },
            "cyclenetwork-tiles": false,
            "cyclenetwork-tiles-high": false,
            "cyclenodes-circles": false,
            "cyclenodes-circles-high": false,
            "cyclenodes-circles-center": false,
            "cyclenodes-labels": false,
            "cyclenodes-labels-high": false
        },
        routecolor: {
            backend: true,
            color: "#2D495A"
        },
        instructions: false
    },
    "network": {
        profileDivId: "network-instruction",
        summaryDivId: "network-summary",
        backendName:  "bicycle.networks",
        layers: {
            "cyclenetworks": false,
            "cyclenetwork-tiles": {
                "default": {
                    "line-opacity": 1
                },
                "route": {
                    "line-opacity": 0.5
                }
            },
            "cyclenetwork-tiles-high": {
                "default": {
                    "line-opacity": 1
                },
                "route": {
                    "line-opacity": 0.5
                }
            },
            "cyclenodes-circles": true,
            "cyclenodes-circles-high": true,
            "cyclenodes-circles-center": true,
            "cyclenodes-labels": true,
            "cyclenodes-labels-high": true
        },
        routecolor: {
            backend: false,
            color: "#2D495A"
        },
        instructions: false
    },
    "fastest": {
        profileDivId: "fastest-instruction",
        summaryDivId: "fastest-summary",
        backendName: "bicycle.shortest",
        layers: {
            "cyclenetworks": false,
            "cyclenetwork-tiles": false,
            "cyclenetwork-tiles-high": false,
            "cyclenodes-circles": false,
            "cyclenodes-circles-high": false,
            "cyclenodes-circles-center": false,
            "cyclenodes-labels": false,
            "cyclenodes-labels-high": false
        },
        routecolor: {
            backend: false,
            color: "#2D495A"
        },
        instructions: false
    }
};

/**
 * Map containing the html id's of the profile buttons
 * @type {{"fastest-route": string, "relaxed-route": string, "other-route": string}}
 */
const profileButtonIds = {
    "fastest-route": "fastest",
    "network-route": "network",
    "network-genk-route": "network-genk"
};

let selectedProfile = "network-genk";












//set the corect language
var userLang = navigator.language || navigator.userLanguage;
if (userLang === 'nl' || userLang === 'fr') {
    language = userLang;
}
// Check browser support
if (typeof(Storage) !== "undefined") {
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
        return '1min';
    }
    if (s < 3600) {
        return `${Math.round(s / 60)}`;
    }
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    return `${h} uur, ${m}`;
}

/**
 * Round number to 3 decimals
 * @param num
 * @returns {number}
 */
function roundToThree(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

/**
 * Calculates all routes and shows it on the map
 * @param {[int, int]} origin - The LatLng Coords
 * @param {[int, int]} destination - The LatLng Coords
 * @param {[String]} profiles - for every profile, a route will be requested
 * @param {String} lang - en/nl/fr select the language for the instructions
 */
function calculateAllRoutes(origin, destination, profiles = availableProfiles, lang = language) {
    $(".route-instructions ul").html("");
    $(`.route-instructions .elevation-info`).html("<img src='./img/Loading.gif' style='width: 100%;'  alt=\"Loading...\" />");
    routes = {};
    removeAllRoutesFromMap();
    profiles.forEach(function (profile) {
        calculateRoute(origin, destination, profile, lang);
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
function calculateRoute(origin, destination, profile = "genk", lang = 'en') {
    // Swap around values for the API
    const originS = origin; // swapArrayValues(origin);
    const destinationS = destination; //swapArrayValues(destination);

    // get the routing profile.
    var profileConfig = profileConfigs[profile];
    var instructions = profileConfig.instructions;
    let profile_url =profileConfig.backendName;
    const prof = (profile_url === "" ? "" : `&profile=${profile_url}`);
    const url = `${urls.route}/route?turn_by_turn=${instructions}&lang=${lang}${prof}&loc=${originS}&loc=${destinationS}`;
    routes[profile] = [];

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

        if (profile == selectedProfile) {
            sidebarDisplayProfile(selectedProfile);
        }

        let routeStops = [];
        let heightInfo = [];

        route = json.features;

        var popularColors = {};
        for (let i in route) {
            if (route[i].properties === undefined ||
                route[i].properties.cyclecolour === undefined) {
                // nothing to see here.
            } else if (route[i].properties.cyclecolour.length === 7) {
                // exactly one color.
                var c = popularColors[route[i].properties.cyclecolour];
                if (c !== undefined) {
                    c++;
                } else {
                    c = 0;
                }
                popularColors[route[i].properties.cyclecolour] = c;
            } else {
                var colors = route[i].properties.cyclecolour.split(',');
                colors.forEach(function(color) {
                    var c = popularColors[color];
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
            if (route[i].properties.cyclecolour === undefined) {
                route[i].properties.cyclecolour = routeColor;
            } else if (route[i].properties.cyclecolour.length !== 7) {
                if (route[i].properties.cyclecolour.length > 7) {
                    var colors = route[i].properties.cyclecolour.split(',');
                    // choose most popular color.
                    var popularity = 0;
                    var chosen = colors[0];
                    colors.forEach(function(color) {
                        var c = popularColors[color];
                        if (c > popularity) {
                            chosen = color;
                            popularity = c;
                        }
                    });
                    route[i].properties.cyclecolour = chosen;
                } else {
                    route[i].properties.cyclecolour = routeColor;
                }
            }
            try {
                heightInfo.push(route[i].geometry.coordinates[0][2]);
            } catch (e) {
                console.log("Failed to read height info", e);
            }
        }
        routes[profile] = route;
        if (json.instructions) {
            addInstructions(json.instructions, profile);
        }

        var localConfig = profileConfigs[profile];
        var profileDivId = localConfig.profileDivId;
        if (routeStops.length === 2) {
            let totaltimeElectr =  timeToText(routeStops[1].properties.time * 15 / 20 );
            $(`#${profileDivId} .distance`).html(`${roundToThree(routeStops[1].properties.distance / 1000)} km`);
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
                        'line-width': width*1.5,
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
                                    property: 'cyclecolour'
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
            $(`#${profileHtmlId[profile]} .elevation-info`).html(language === "en" ? "Error :(" : language === 'fr' ? "Erreur :(" : "Fout :(");

            if (map.getLayer(profile)) {
                map.removeLayer(profile);
            }
            if (map.getSource(profile)) {
                map.removeSource(profile);
            }
            console.warn('Problem calculating route: ', errorThrown, textStatus, jqXHR);
            if(!warningOpen){
                warningOpen = true;
                alert("De route kon niet worden berekend. Mogelijk is een vertrek- of eindpunt te ver van de openbare weg.")
                warningOpen = false;
            }
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
        profile = availableProfiles[i];
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
            me.showLocationsOnMap();
            // Update 'from'-textfield
           
            $.getJSON(urls.reverseGeocoder.format(latLng.lng,latLng.lat), function(data){
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
            me.showLocationsOnMap();
            // Update 'to'-textfield
            $.getJSON(urls.reverseGeocoder.format(latLng.lng,latLng.lat), function(data){
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
function updateUrlParams(){
    var params = {};
    if (state.location1) {
        params.loc1 = [Number(state.location1[0]).toFixed(6), Number(state.location1[1]).toFixed(6)];
    }
    if(state.location2){
        params.loc2 = [Number(state.location2[0]).toFixed(6), Number(state.location2[1]).toFixed(6)];
    }
    params.zoom = map.getZoom().toFixed(2);
    params.lat = map.getCenter().lat.toFixed(6);
    params.lng = map.getCenter().lng.toFixed(6);
    params.p=selectedProfile;
    
    setCurrentUrl(params);
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
    // map.addSource('dem', {
    //     "type": "raster-dem",
    //     "url": "mapbox://mapbox.terrain-rgb"
    // });
    // map.addLayer({
    //     "id": "hillshading",
    //     "source": "dem",
    //     "type": "hillshade"
    //     // insert below waterway-river-canal-shadow;
    //     // where hillshading sits in the Mapbox Outdoors style
    // }, );//'waterway-river-canal-shadow');

    map.addSource('cyclenetworks-tiles', { 
        type: 'vector',
        // url: 'https://localhost:5001/cyclenetworks/mvt.json' /*/
        url: 'https://routing.anyways.eu/vector-tiles/cyclenetworks-test/mvt.json' //*/ 
    });

    map.addLayer({
        "id": "cyclenetworks",
        "type": "line",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenetwork-genk",
        "layout": {
            "visibility": "none",
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": ['get', 'cyclecolour'],
            "line-width": 4
          }
    }, labelLayer);
    
    
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
            "line-color": "#2D495A",
            "line-width": 2,
            "line-dasharray": [2, 2]
          }
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
            "line-color": "#2D495A",
            "line-width": 1
          }
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
            "circle-stroke-color": "#2D495A",
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

            // Nominatim Geocoder
            //$.getJSON(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&polygon=0&addressdetails=0&countrycodes=BE`/*bounded=1&viewbox=4.239465,50.930741,4.501558,50.784803`*/, function (data) {
            /*    var resArray = [];
                for (var feature in data) {
                    resArray.push({name: data[feature].display_name, loc: [data[feature].lon, data[feature].lat]});
                }
                callback(resArray);
            });*/

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
 * Convert a location to an adress.
 * @param location LatLng of the location to be converted.
 * @param callback Function to be called when conversion is complete
 */
function reverseGeocode(location, callback) {
    var lng = location[0];
    var lat = location[1];
    //$.getJSON(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=0`, function (data) {
    $.getJSON(urls.reverseGeocoder.format(lng, lat), function (data) {
        callback(data.features[0].text + " (" + data.features[0].place_name + ")");
        //fromFieldInputDetected(document.getElementById("fromInput"));
        //toFieldInputDetected(document.getElementById("toInput"));
    });
}

/**
 * Use the current user location as a startpoint.
 */
function useCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, locationFetchFailed);
        if(typeof(Storage) !== "undefined") {
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
Date.prototype.addDays = function(days) {
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
        if (typeof(Storage) !== "undefined") {
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

