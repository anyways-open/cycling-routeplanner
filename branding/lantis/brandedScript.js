document.title = "LANTIS | Cycling Route Planner";

var urls = production_urls;

var anywaysConfigs = {
    apiKey: "a-non-operational-key"
};
var selectedProfile = "profile1";

var initialMap = {
    center: [4.3387,50.8435],
    zoom: 7,
    style: 'https://api.maptiler.com/maps/3327a63f-c15d-462a-9f23-ebf73a14254a/style.json?key=jwL83LCYXcsbjHQxJcVH'
};



const profileConfigs = {
    "profile1": {
        backendName: "bicycle.genk", // TODO The lantis network in shortcut is mapped as 'operator=Stad Genk' in order to reuse the Genk-specific profile. This should be fixed one day 
        backend: "https://api.anyways.eu/publish/opa/lantis/antwerpen/1/routing?", // overwrites the default backend endpoint
        format: "latlon", // shortcut still uses lat,lon as format
        frontendName: {"nl": "Lantis-fietsneterk", "en": "Lantis network", "fr": "Équilibrée"},
        frontendSubtitle: {"nl": "Lantis-netwerk (Shortcut)", "en": "Lantis network", "fr": "Reseau Lantis"},
        frontendExplanation: {
            "nl": "Volgt het lantis fietsnetwerk, gebaseerd op de aangepaste shortcut van Lantis",
            "en": "",
            "fr": ""
        },
        frontendLogo: "./branding/anyways/bird.svg",

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
            backend: false, // set to true if 'cycle_network_colour'-attribute should be used (thus if cycle networks should be rendered)
            color: "#d9a300" // default colour
        }
    },
    "profile2": {
        backendName: "bicycle.networks",
        frontendName: {"nl":"Knooppunten (OSM)", "en":"Node Network", "fr":""},
        frontendSubtitle: {"nl": "De knooppuntennetwerken", "en": "Follows the node networks", "fr": ""},
        frontendExplanation:
            {
                "nl": "Volgt de knooppuntennetwerk. Gebaseerd op OpenStreetMap.",
                "en": "Follows the node networks. Based on current OSM",
                "fr": ""
            },
        frontendLogo: "./assets/img/network.svg",

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
            color: "#d9a300"
        }
    },
    "profile3": {
        backendName: "bicycle.fastest",
        frontendName: {"nl":"Snelst", "en":"Fastest","fr":""},
        frontendSubtitle:{"nl": "De snelste route (OSM)", "en":"", "fr":""},
        frontendExplanation:
            {
                "nl": "De snelste route. Gebaseerd op OpenStreetMap",
                "en": "The fastest route, based on current OSM",
                "fr": ""
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
            "cyclenodes-labels-high": false
        },
        routecolor: {
            backend: false,
            color: "#d9a300"
        }
    }
};


// What languages should the interface be shown in?
// If only one: language button will dissappear
const supportedLanguages = ["nl", "fr", "en"];

// Leftover strings. The format is {'elementId' --> {'language' --> text to show}}
const translatedStrings = {
    "fromInput.placeholder": {"nl": "Van", "en": "From", "fr": "De"},
    "toInput.placeholder": {"nl": "Naar", "en": "To", "fr": "À"}
};



function applyBrand(){
}
