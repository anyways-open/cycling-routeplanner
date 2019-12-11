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
            "cyclenodes-labels-high": false
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
            backend: true,
            color: "#d9a300"
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
            "cyclenodes-labels-high": false
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
    "fromInput.placeholder": {"nl": "Van", "en": "From", "fr": "De"},
    "toInput.placeholder": {"nl": "Naar", "en": "To", "fr": "À"}
};


function applyBrand() {

}
