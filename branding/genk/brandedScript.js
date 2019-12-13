document.title = "Genk | Fietsrouteplanner";

var initialMap = {
    center: [5.515377, 50.962004],
    zoom: 13.33,
    style: 'https://api.maptiler.com/maps/3327a63f-c15d-462a-9f23-ebf73a14254a/style.json?key=jwL83LCYXcsbjHQxJcVH'
};

var profileConfigs = {
    "profile1": {
        backendName: "bicycle.genk",
        frontendName: "Fietsnet Genk",
        frontendSubtitle: "Fietsnet Genk bestaat uit routes die je aangenaam en snel naar je bestemming brengen. ",
        frontendExplanation: "Fietsnet Genk bestaat uit routes die je aangenaam en snel naar je bestemming brengen. ",
        frontendLogo: "./branding/genk/genk-networks.svg",
        
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
    },
    "profile2": {
        backendName:  "bicycle.networks",
        frontendName: "Knooppunten",
        frontendSubtitle: "Dit is het bekende toeristische fietsknoopuntennetwerk. Je rijdt via de genummerde knooppunten.",
        frontendExplanation: "Dit is het bekende toeristische fietsknoopuntennetwerk. Je rijdt via de genummerde knooppunten.",
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
            "cyclenodes-labels-high": true,
            "cyclenetworks-genk": false,
            "cyclenetworks-genk-shields": false
        },
        routecolor: {
            backend: false,
            color: "#2D4959"
        }
    },
    "profile3": {
        backendName: "bicycle.shortest",
        frontendName: "Kortst",
        frontendSubtitle: "Dit is de korste route",
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
            "cyclenodes-labels-high": false,
            "cyclenetworks-genk": false,
            "cyclenetworks-genk-shields": false
        },
        routecolor: {
            backend: false,
            color: "#2D4959"
        }
    }
};


 // This scripts add the legend entries on the span with ID 'legend'"
function addLegendEntries(){
       
    var element = document.getElementById("profile1-summary-extra");

    // The data to add. Eventually, this can be changed to an overpass-query or external data set someday
    var routes = [{ref: 1, name: "Termien - Centrum - C-mine", colour: "#fce34b"}, // The yellow is darkened a little for readability
        {ref: 2, name: "Hasselt - Bokrijk - Centrum", colour: "#35b1f4"},
        {ref: 3, name: "Bokrijk - Hasseltweg - Centrum - Synaps Park - Molenblook - Kattevennen", colour: "#24ef15"},
        {ref: 4, name: "Winterslag (Industrie) - C-mine - Bret - Gelieren - Wiemesmeer", colour: "#efa639"},
        {ref: 5, name: "LABIOMISTA - Driehoeven - Winterslag - Kolderbos - Sledderlo - Industrie-Zuid", colour: "#d8863e"},
        {ref: 6, name: "Zwartberg - SportinGenk park - Campus Bret - Centrum", colour: "#9837C1"},
        {ref: 7, name: "Cirkellijn", colour: "#b81e54"}];


    function routeinfo(routeRef) {
        console.log("Clicked route information for " + routeRef);
    }


    var contents = "<table class='table table-sm table-borderless'><tbody>";


    for (var i in routes) {
        var route = routes[i];
        contents += "<tr onclick='routeinfo(" + route.ref + ")'><td><div class='legend-ref' style='background-color:" + route.colour + "'>" + route.ref + "</div></td><td><div class='legend-text'>" + route.name + "</div></td>"
    }

    contents += "</tbody></table>";
    element.innerHTML = "<h5>" + contents + "</h5>";
}


function applyBrand(){
    addLegendEntries();
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
        "id": "cyclenetworks-genk",
        "type": "line",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenetwork-genk",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": ['get', 'cyclecolour'],
            "line-width": 4
          }
    }, lowestLabel);

    map.addLayer({
        "id": "cyclenetworks-genk-shields",
        "type": "symbol",
        "source": "cyclenetworks-tiles",
        "source-layer": "cyclenetwork-genk",
        "minzoom": 10,
        "maxzoom": 24,
        "layout": {
          "icon-image": "us-state_2",
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
          "text-field": "{cycleref}",
          "text-font": [
            "Noto Sans Regular"
          ],
          "text-rotation-alignment": "viewport",
          "text-size": 10
        }
      });
};

var brand = new branding();