/*
 * This javascript only handles the different extra layers that have to be added onto the map
 */ 

function AddMapLayers(){
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
            "line-color": ['get', 'cycle_network_colour'],
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
    
    if (typeof(brand) !== 'undefined') {
        brand.addLayers(map);
    }
}

function showLayersForProfile(selectedProfile) {
    var localConfig = profileConfigs[selectedProfile];
    if (localConfig && localConfig.layers) {

        availableProfiles.forEach(function (profile) {
            if (map.getLayer(profile)) {
                map.setLayoutProperty(profile, 'visibility', 'none');
                map.setPaintProperty(profile, 'line-opacity', routeOpacityAltnerative);
                map.setPaintProperty(profile + '-casing', 'line-opacity', routeOpacityAltnerative);
            }    
        });

        if (map.getLayer(selectedProfile)) {
            map.setLayoutProperty(selectedProfile, 'visibility', 'visible');
            map.setPaintProperty(selectedProfile, 'line-opacity', routeOpacityMain);
            map.setPaintProperty(selectedProfile + '-casing', 'line-opacity', routeOpacityMain);
        }

        for (var layerId in localConfig.layers) {
            if (localConfig.layers.hasOwnProperty(layerId)) {
                var layer = map.getLayer(layerId);
                if (layer) {
                    var styleConfig = localConfig.layers[layerId];
                    if (styleConfig) {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');

                        if (state.location1 && state.location2) {
                            if (styleConfig.route) {
                                if (styleConfig.route["line-opacity"]) {
                                    map.setPaintProperty(layerId, 'line-opacity', styleConfig.route["line-opacity"]);
                                }
                            }
                        } else {
                            if (styleConfig.default) {
                                if (styleConfig.default["line-opacity"]) {
                                    map.setPaintProperty(layerId, 'line-opacity', styleConfig.default["line-opacity"]);
                                }
                            }
                        }
                    } else {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    }
                }
            }
        }
    }
}
