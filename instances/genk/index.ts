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
        this.apiKey = "Vc32GLKD1wjxyiloWhlcFReFor7aAAOz";
        this.title = "Genk | Fietsrouteplanner";
        this.mapCenter = [5.5063, 50.9625];
        this.mapStyle = 'https://api.maptiler.com/maps/3327a63f-c15d-462a-9f23-ebf73a14254a/style.json?key=jwL83LCYXcsbjHQxJcVH';
        this.mapZoom = 12.82;
        this.selectedProfile = 'profile1';
        this.profile1 = {
            backendName: "bicycle.genk",
            frontendName: { nl: "Fietsnet Genk" },
            frontendSubtitle: { nl: "Fietsnet Genk bestaat uit routes die je aangenaam en snel naar je bestemming brengen. " },
            frontendExplanation: { nl: "Fietsnet Genk bestaat uit routes die je aangenaam en snel naar je bestemming brengen. " },
            frontendLogo: LocalSvg["genk-networks"],

            layers: {
                "cyclenetworks": false,
                "cyclenetwork-tiles": false,
                "cyclenetwork-tiles-high": false,
                "cyclenodes-circles": false,
                "cyclenodes-circles-high": false,
                "cyclenodes-circles-center": false,
                "cyclenodes-labels": false,
                "cyclenodes-labels-high": false,
                "cyclenetworks-genk": true,
                "cyclenetworks-genk-shields": true
            },
            routecolor: {
                backend: true,
                color: "#2D4959"
            }
        };
        this.profile2 = {
            backendName: "bicycle.networks",
            frontendName: { nl: "Knooppunten" },
            frontendSubtitle: { nl: "Dit is het bekende toeristische fietsknoopuntennetwerk. Je rijdt via de genummerde knooppunten." },
            frontendExplanation: { nl: "Dit is het bekende toeristische fietsknoopuntennetwerk. Je rijdt via de genummerde knooppunten." },
            frontendLogo: GlobalSvg["network"],

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
                "cyclenodes-labels-high": true,
                "cyclenetworks-genk": false,
                "cyclenetworks-genk-shields": false
            },
            routecolor: {
                backend: false,
                color: "#2D4959"
            }
        };
        this.profile3 = {
            backendName: "bicycle.shortest",
            frontendName: { nl: "Snelst" },
            frontendSubtitle: { nl: "Dit is de snelste route" },
            frontendExplanation: { nl: "Enkel voor echte snelheidsduivels voor wie iedere minuut telt. Gaat vaak langs drukke banen" },
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
                "cyclenetworks-genk": false,
                "cyclenetworks-genk-shields": false
            },
            routecolor: {
                backend: false,
                color: "#2D4959"
            }
        };

        this.languages = ["nl"];
        this.translations = new Dictionary<TranslatedString>();
        this.translations.add("document.title", {
            nl: "Genk | Fietsrouteplanner"
        });
        this.translations.add("fromInput.placeholder", {
            nl: "Van"
        });
        this.translations.add("toInput.placeholder", {
            nl: "Naar"
        });
    }

    apply(): void {
        super.apply();

        function addLegendEntriesTo(pane){
       
            var element = document.getElementById(pane);
        
            // The data to add. Eventually, this can be changed to an overpass-query or external data set someday
            var routes = [{ref: 1, name: "Industrie-Zuid – C-mine", colour: "#fce34b"}, // The yellow is darkened a little for readability
                {ref: 2, name: "Vallei-route", colour: "#35b1f4"},
                {ref: 3, name: "Bokrijk - Kattevennen", colour: "#24ef15"},
                {ref: 4, name: "Industrie-Noord – Gelieren", colour: "#efa639"},
                {ref: 5, name: "Nieuwe Kempen – Sledderlo", colour: "#d8863e"},
                {ref: 6, name: "Zwartberg - Centrum", colour: "#9837C1"},
                {ref: 7, name: "Genkerring", colour: "#b81e54"}];
        
            var contents = "<div class='container'>";
           
            for (var i in routes) {
                var route = routes[i];
                contents += "<div class='row mb-2'>";

                contents += "<div class='col-2'>";
                contents += "<div class='legend-ref' style='background-color:" + route.colour + "'>" + route.ref + "</div>";
                contents += "</div>"

                contents += "<div class='col-8'>";
                contents += "<h5 class='legend-text'>" + route.name + "</h5>";
                contents += "</div>"

                contents += "</div>"
            }

            contents += "</div>";
        
            // var contents = "<table class='table table-sm table-borderless'><tbody>";
        
        
            // for (var i in routes) {
            //     var route = routes[i];
            //     contents += "<tr><td><div class='legend-ref' style='background-color:" + route.colour + "'>" + route.ref + "</div></td><td><div class='legend-text'>" + route.name + "</div></td>"
            // }
        
            // contents += "</tbody></table>";
            element.innerHTML = "<div>" + contents + "</div>";
        }

        addLegendEntriesTo("profile1-summary-extra");
        addLegendEntriesTo("profile1-instruction-extra");
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
            "id": "cyclenetworks-genk",
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
                    16, 6
                ],
                "line-opacity": 0.5
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "all",
                    [
                        "==",
                        "operator",
                        "Stad Genk"
                    ]
                ]
            ]
        }, lowestLabel);

        map.addLayer({
            "id": "cyclenetworks-genk-shields",
            "type": "symbol",
            "source": "cyclenetworks-tiles",
            "source-layer": "cyclenetwork",
            "minzoom": 10,
            "maxzoom": 24,
            "layout": {
                "icon-image": "us-state_1",
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
                    "$type",
                    "LineString"
                ],
                [
                    "all",
                    [
                        "==",
                        "operator",
                        "Stad Genk"
                    ]
                ]
            ]
        });
    }
}