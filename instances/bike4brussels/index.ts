import { BrandingBase } from "../brandingBase";
import { ProfileConfig } from "../profileConfig";
import LocalSvg from "./assets/img/*.svg";
import GlobalSvg from "../../assets/img/*.svg";
import logo from "./assets/img/favicon-96.png";
import { IDictionary, Dictionary } from "../../Dictionary";
import { TranslatedString } from "../translatedString";

export class Branding extends BrandingBase {
    constructor() {
        super();

        this.logo = logo;
        this.title = "Bike for Brussels | Routeplanner";
        this.mapCenter = [4.3555, 50.8371];
        this.mapStyle = 'https://api.maptiler.com/maps/32498a28-6ce3-40c5-bbb6-cb0d3374a9a2/style.json?key=63xcUNTjl3MuHvlfctw0';
        this.mapZoom = 11.54;
        this.selectedProfile = 'profile1';

       this.geocoder =  'https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?' +
           'proximity=5.5196%2c50.9612&' +
           'country=BE&' +
           'bbox=4.22%2C50.76%2C4.52%2C50.93&' +
           'limit=5&' +
           'types=place,locality,neighborhood,address,poi';
        
        this.profile1 = {
            backend: null,
            showHeight: true,
            backendName: "bicycle.brussels",
            frontendName: {
                nl: "Netwerk",
                en: "Network",
                fr: "Réseau"
            },
            frontendSubtitle: {
                nl: "Een route via het Brusselse fietsnetwerk",
                en: "A route via the Brussels cycling network",
                fr: "Une route via le réseau cyclable de Bruxelles"
            },
            frontendExplanation:
                {
                    nl: "Een profiel gemaakt om de veilige en comfortabele routes van het Brusselse fietsroutenetwerk te gebruiken",
                    en: "A safe and comfortable route which follows the Brussels cycling network",
                    fr: "Une route sûre et comfortable via le réseau Bruxellois"
                },
            frontendLogo: GlobalSvg["network"],
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
        };
        this.profile2 = {
            backend: null,
            showHeight: true,
            backendName: "bicycle.comfort_safety",
            frontendName: {
                nl: "Recreatief",
                en: "Recreational",
                fr: "Loisir"
            },
            frontendSubtitle: {
                nl: "Een recreatief profiel",
                en: "A recreational profile",
                fr: "Un profil pour le loisir"
            },
            frontendExplanation: {
                nl: "Een profiel gemaakt voor de recreatieve fietser, die de voorkeur geeft aan veilige, comfortabele wegen.",
                en: "A profile for recreational cycling with safe and comfortable route.",
                fr: "Ce profil est fait pour le cyclisme de loisir, priorité aux routes sûres et confortable."
            },
            frontendLogo: LocalSvg["bird"],
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
                "cyclenodes-labels-high": false,
                "cyclenetworks-brussels": false,
                "cyclenetworks-brussels-shields": false
            },
            routecolor: {
                backend: false,
                color: "#d9a300"
            }
        };
        this.profile3 = {
            backend: null,
            showHeight: true,
            backendName: "bicycle.commute",
            frontendName: {
                nl: "Woon-werk",
                en: "Commute",
                fr: "Navette"
            },
            frontendSubtitle: {
                nl: "Een route voor woon-werk.",
                en: "A route for commuting.",
                fr: "Une route pour votre trajet maison-travail."
            },
            frontendExplanation:
            {
                nl: "Een route voor woon-werk.",
                en: "A route for commuting.",
                fr: "Une route pour votre trajet maison-travail."
            },
            frontendLogo: GlobalSvg["fast"],
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
        };

        this.languages = ["en", "nl", "fr"];
        this.translations = new Dictionary<TranslatedString>();
        this.translations.add("document.title", {
            nl: "Bike for Brussels | Routeplanner",
            fr: "Bike for Brussels | Planificateur d'itinéraire",
            en: "Bike for Brussels | Routeplanner"
        });
        this.translations.add("fromInput.placeholder", {
            nl: "Van",
            en: "From",
            fr: "De"
        });
        this.translations.add("toInput.placeholder", {
            nl: "Naar",
            en: "To",
            fr: "À"
        });
    }

    addLayers(map: import("mapbox-gl").Map): void {

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
                "line-width": [
                    'interpolate', ['linear'], ['zoom'],
                    10, 1,
                    13, 2,
                    16, 4
                ],
                "line-opacity": 0.7
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


        (function (f, a, t, h, o, m) {
            a[h] = a[h] || function () {
                (a[h].q = a[h].q || []).push(arguments)
            };
            o = f.createElement('script'),
                m = f.getElementsByTagName('script')[0];
            o.async = 1; o.src = t; o.id = 'fathom-script';
            m.parentNode.insertBefore(o, m)
        })(document, window, 'https://cdn.usefathom.com/tracker.js', 'fathom');
        fathom('set', 'siteId', 'VZYSYDVC');
        fathom('trackPageview');
    }
}
