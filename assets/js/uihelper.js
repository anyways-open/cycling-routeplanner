let windowLoaded = false;


/**
 * Do stuff when the window is done loading, such as interpreting the URL parameters
 */
window.onload = function () {
    
    sidebarDisplayProfile(selectedProfile);

    let urlparams = getAllUrlParams();
    
    if (urlparams.loc1) {
        // Note: the definition of 'state' can be found in 'state.js'
        state.location1 = urlparams.loc1;
    } else {
        if (!(typeof (Storage) !== "undefined" && 
            new Date(localStorage.getItem("geolocation.permission.denieddate")).addDays(7) > new Date())) {
            setTimeout(function () {
                useCurrentLocation();
            }, 2000);
        }
    }
    if (urlparams.loc2) {
        state.location2 = urlparams.loc2;
    }

    if (urlparams.p) {
        if (urlparams.p != selectedProfile) {
            sidebarDisplayProfile(urlparams.p);
        }
    }

    
    
    if (state.location1) {
        reverseGeocode(state.location1, function (adress) {
            $("#fromInput").val(adress);
        });
        $("#useLocationInputFieldButton").hide();
        $("#clearInputFieldFromButton").show();
    }
    if (state.location2) {
        reverseGeocode(state.location2, function (adress) {
            $("#toInput").val(adress);
        });
        $("#clearInputFieldToButton").show();
    }
    
    
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }), 'top-left');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-left');

    if (urlparams.zoom) {
        map.setZoom(urlparams.zoom);
    }
    if (urlparams.lat !== undefined && urlparams.lng !== undefined) {
        map.setCenter({ lat: urlparams.lat, lng: urlparams.lng })
    }


    windowLoaded = true;
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }
};




/*********** MISC helper functions **************/

/**
 * Replace all SVG images with inline SVG, so they can be styled
 */
function inlineAllSvgs(){
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });
}

function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function formatDistance(distance) {
    if (distance < 1000) {
        return Math.round(distance) + 'm';
    }
    return (distance / 1000).toFixed(1) + 'km';
}
