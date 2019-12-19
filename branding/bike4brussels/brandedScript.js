document.title = "Bike for Brussels | Routeplanner";

var initialMap = {
    center: [4.426690, 50.842000],
    zoom: 11.03,
    style: 'https://api.maptiler.com/maps/3327a63f-c15d-462a-9f23-ebf73a14254a/style.json?key=jwL83LCYXcsbjHQxJcVH'
};

var anywaysConfigs = {
    apiKey: "mwK4irCD1whXx1XEpLQN6qotuM6P-Rh8"
};

var profileConfigs = {
    "profile1": {
        backendName: "bicycle.comfort_safety_speed",
        frontendName: {"nl": "Gebalanceerd", "en": "Balanced", "fr": "Équilibrée"},
        frontendSubtitle: {"nl": "Een gebalanceerd profiel", "en": "A balanced profile", "fr": "Une route équilibrée"},
        frontendExplanation: {
            "nl": "Een profiel gemaakt voor de dagelijkse pendelaar, die de voorkeur geeft aan veilige, comfortabele wegen zonder veel tijd in te boeten",
            "en": "A safe and comfortable route without losing to much time",
            "fr": "Ce profil évite les plus grandes rues et préfère les pistes cyclables."
        },
        frontendLogo: "./branding/anyways/bird.svg",

        layers: {
            "cyclenetworks": {
                "default": {
                    "line-opacity": 1
                },
                "route": {
                    "line-opacity": 0.3
                }
            },
            "cyclenetworks": false,
            "cyclenetwork-tiles": false,
            "cyclenetwork-tiles-high": false,
            "cyclenodes-circles": false,
            "cyclenodes-circles-high": false,
            "cyclenodes-circles-center": false,
            "cyclenodes-labels": false,
            "cyclenodes-labels-high": false,
            "cyclenetworks-brussels": false,
            "cyclenetworks-brussels-shields": false
        },
        routecolor: {
            backend: false,
            color: "#d9a300"
        }
    },
    "profile2": {
        backendName: "bicycle.brussels",
        frontendName: {"nl": "Netwerk", "en": "Network", "fr": "Réseau"},
        frontendSubtitle: {
            "nl": "Een route via het Brusselse fietsnetwerk",
            "en": "A route via the Brussels cycling network",
            "fr": "Une route via le réseau cyclable de Bruxelles"
        },
        frontendExplanation:
            {
                "nl": "Een profiel gemaakt om de veilige en comfortabele routes van het Brusselse fietsroutenetwerk te gebruiken",
                "en": "A safe and comfortable route which follows the Brussels cycling network",
                "fr": "Une route via le réseau Bruxellois sûr et comfortable"
            },
        frontendLogo: "./assets/img/network.svg",
        layers: {
            "cyclenetworks": false,
            "cyclenetwork-tiles": false,
            "cyclenetwork-tiles-high": false,
            "cyclenodes-circles": false,
            "cyclenodes-circles-high": false,
            "cyclenodes-circles-center": false,
            "cyclenodes-labels": false,
            "cyclenodes-labels-high": false,
            "cyclenetworks-brussels": true,
            "cyclenetworks-brussels-shields": true
        },
        routecolor: {
            backend: true,
            color: "#000"
        }
    },
    "profile3": {
        backendName: "bicycle.fastest",
        frontendName: {"nl": "Snelst", "en": "Fastest", "fr": "Vite"},
        frontendSubtitle: {
            "nl": "De snelste route naar je bestemming",
            "en": "The fastest route to your destination",
            "fr": "La route le plus vite vers vortre destination"
        },
        frontendExplanation:
            {
                "nl": "Enkel voor echte snelheidsduivels voor wie iedere minuut telt. Gaat vaak langs drukke banen",
                "en": "Only for real speed devils for whom every minute counts. Might take busy roads",
                "fr": "Uniquement pour quand chaque minute compte."
            },
        frontendLogo: "./assets/img/fast.svg",
        layers: {
            "cyclenetworks": false,
            "cyclenetwork-tiles": false,
            "cyclenetwork-tiles-high": false,
            "cyclenodes-circles": false,
            "cyclenodes-circles-high": false,
            "cyclenodes-circles-center": false,
            "cyclenodes-labels": false,
            "cyclenodes-labels-high": false,
            "cyclenetworks-brussels": false,
            "cyclenetworks-brussels-shields": false
        },
        routecolor: {
            backend: false,
            color: "#d9a300"
        }
    }
};

// TODO: also set custom start location.
//8.64&lat=50.813588&lng=4.868640

// What languages should the interface be shown in?
// If only one: language button will dissappear
const supportedLanguages = ["nl", "fr", "en"];

// Leftover strings. The format is {'elementId' --> {'language' --> text to show}}
const translatedStrings = {
    "document.title": { 
        nl: "Bike for Brussels | Routeplanner",
        fr: "Bike for Brussels | Planificateur d'itinéraire",
        en: "Bike for Brussels | Routeplanner"
    },
    "fromInput.placeholder": {"nl": "Van", "en": "From", "fr": "De"},
    "toInput.placeholder": {"nl": "Naar", "en": "To", "fr": "À"}
};


function applyBrand() {

}


function branding() {

}
branding.prototype.addLayers = function(map) {
    var me = this;

    // get lowest label and road.
    var style = map.getStyle();
    var lowestRoad = undefined;
    var lowestLabel = undefined;
    for (var l = 0; l < style.layers.length; l++) {
        var layer = style.layers[l];

        if (layer && layer["source-layer"] === "transportation") {
            if (!lowestRoad) {
                lowestRoad = layer.id;
            }
        }

        if (layer && layer["type"] === "symbol") {
            if (!lowestLabel) {
                lowestLabel = layer.id;
            }
        }
    }

    map.addLayer({
        "id": "cyclenetworks-brussels",
        "type": "line",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenetwork",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": ['get', 'colour'],
            "line-width": 4
          },
          "filter": [
            "all",
            [
              "==",
              "operator",
              "Brussels Mobility"
            ]
          ]
    }, lowestLabel);

    map.addLayer({
        "id": "cyclenetworks-brussels-shields",
        "type": "symbol",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenetwork",
        "minzoom": 10,
        "maxzoom": 24,
        "layout": {
          "icon-image": "us-state_{ref_length}",
          "icon-rotation-alignment": "viewport",
          "icon-size": 1,
          "symbol-placement": {
            "base": 1,
            "stops": [
              [
                10,
                "point"
              ],
              [
                11,
                "line"
              ]
            ]
          },
          "symbol-spacing": 200,
          "text-field": "{ref}",
          "text-font": [
            "Noto Sans Regular"
          ],
          "text-rotation-alignment": "viewport",
          "text-size": 10
        },
        "filter": [
          "all",
          [
            "==",
            "operator",
            "Brussels Mobility"
          ]
        ]
      });
};

var brand = new branding();