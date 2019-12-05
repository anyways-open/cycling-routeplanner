
var profileConfigs = {
    "profile1": {
        backendName: "bicycle2.comfort_safety_speed",
        frontendName: "Gebalanceerd",
        frontendSubtitle: "Een gebalanceerd profiel",
        frontendExplanation: "Een profiel gemaakt voor de dagelijkse pendelaar, die de voorkeur geeft aan veilige, comfortabele wegen zonder veel tijd in te boeten",
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
        backendName:  "bicycle2.comfort_safety",
        frontendName: "Veilig",
        frontendSubtitle: "Een veilige, comfortabele route",
        frontendExplanation: "Een profiel gemaakt om veilige, comfortabele routes te verkiezen. Ideaal om naar school te gaan",
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
        backendName: "bicycle2.shortest",
        frontendName: "Kortst",
        frontendSubtitle: "De korste route waar gefietst kan worden",
        frontendExplanation: "Enkel voor echte snelheidsduivels voor wie iedere minuut telt. Gaat vaak langs drukke banen",
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




function applyBrand(){
    
    console.log("WARNING: monkey patching the endpoint to use staging")
    production_urls.route = "https://staging.anyways.eu/routing-api"
    
    
}
