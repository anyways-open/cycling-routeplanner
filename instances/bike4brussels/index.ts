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
        this.mapStyle = 'https://api.maptiler.com/maps/3327a63f-c15d-462a-9f23-ebf73a14254a/style.json?key=jwL83LCYXcsbjHQxJcVH';
        this.mapZoom = 11.54;
        this.selectedProfile = 'profile1';
        this.profile1 = {
            backend: null,
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
            backendName: "bicycle.comfort_safety_speed",
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
            backendName: "bicycle.fastest",
            frontendName: {
                nl: "Woon-werk",
                en: "Commute",
                fr: "Navette"
            },
            frontendSubtitle: {
                nl: "De snelste route naar je bestemming",
                en: "The fastest route to your destination",
                fr: "La route la plus rapide vers votre destination"
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

        this.languages = [ "en", "nl", "fr" ];
        this.translations = new Dictionary<TranslatedString>();
        this.translations.add("document.title",{ 
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
    }
}
