let windowLoaded = false;


/**
 * Do stuff when the window is done loading, such as interpreting the URL parameters
 */
window.onload = function () {
    let urlparams = urlhash.parseHash(location.hash);
    
    if(selectedProfile === undefined){
        selectedProfile = "profile1";
    }
    
    sidebarDisplayProfile(selectedProfile);

    state.sideBarIsOpen = urlparams.query.sb !== "false";
    if(state.sideBarIsOpen){
        openSidebar();
    }else{
        closeSidebar();
    }
    
    
    console.log(location.hash, state, "Sidebar is ", state.sideBarIsOpen);
    if (urlparams.query && urlparams.query.o) {
        // Note: the definition of 'state' can be found in 'state.js'
        var c = urlparams.query.o.split(',');
        state.location1 = [ parseFloat(c[0]), parseFloat(c[1]) ];
    } else {
        if (!(typeof (Storage) !== "undefined" && 
            new Date(localStorage.getItem("geolocation.permission.denieddate")).addDays(7) > new Date())) {
            setTimeout(function () {
                useCurrentLocation();
            }, 2000);
        }
    }
    if (urlparams.query && urlparams.query.d) {
        var c = urlparams.query.d.split(',');
        state.location2 = [ parseFloat(c[0]), parseFloat(c[1]) ];
    }

    if (urlparams.query && urlparams.query.p) {
        if (urlparams.query.p !== selectedProfile) {
            sidebarDisplayProfile(urlparams.query.p);
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
    
    
    
    let attributionControl = new mapboxgl.AttributionControl({compact:false, customAttribution:
            "<a id=\"edit-button-link\" href=\"https://openStreetMap.org\" target=\"_blank\">\n" +
            "<img src=\"assets/img/edit.svg\" alt=\"Edit OSM here\"/> </a>"})
    map.addControl(attributionControl)
    
    if (urlparams.zoom) {
        // jump to view.
        map.jumpTo({
            center: urlparams.center,
            zoom: urlparams.zoom
        });
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
        var imgOnClick = $img.attr('onclick');

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
            
            // Add replaced image's actions to the new svg
            if (typeof imgOnClick !== 'undefined') {
                $svg = $svg.attr('onclick', imgOnClick);
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });
}
/**
 * Formats the distance, given in meters
 * @param distance
 * @returns {string}
 */
function formatDistance(distance) {
    console.log(distance)
    if (distance < 1000) {
        return Math.round(distance) + ' m';
    }
    return ((distance / 1000).toFixed(2) + ' km').replace('.', ",");
}
