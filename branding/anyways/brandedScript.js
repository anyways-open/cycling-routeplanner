
var profileConfigs = {
    "profile1": {
        backendName: "bicycle.commute",
        frontendName: "Pendelen",
        frontendSubtitle: "Een profiel gemaakt voor de dagelijkse pendelaar",
        frontendExplanation: "Een profiel gemaakt voor de dagelijkse pendelaar, die de voorkeur geeft aan veilige, verharde wegen",
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
            color: "#d9a300"
        }
    },
    "profile2": {
        backendName:  "bicycle.networks",
        frontendName: "Knooppunten",
        frontendSubtitle: "Volgt het recreatieve knooppuntennetwerk",
        frontendExplanation: "Een profiel gemaakt voor zondagse recreant, langs de mooie knooppuntennetwerken",
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
        backendName: "bicycle.shortest",
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




function applyBrand(){
}
