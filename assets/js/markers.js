/*
 * This javascript handles:
 * - Placing and removing markers
 * - Reverse geocoding them when placed on click
 * - Geocoding text input from the fields and placing them on the map
 */ 


/**
 * Method that gets called when input is detected in the Startpoint input field
 * @param el - The input field itself
 */
function fromFieldInputDetected() {
    var el = document.getElementById("fromInput");
    
    if ((!el.value || el.value === "")) {
        //show location button
         if (windowLoaded) {
            console.log("setting location 1 to undef");
            state.location1 = undefined;
            showLocationsOnMap();
        }
    } 
    
    showOrHideClearButtons();
}

/**
 * Method that gets called when input is detected in the Endpoint input field
 * @param el - The input field itself
 */
function toFieldInputDetected() {
    var el = document.getElementById("toInput");
    if ((!el.value || el.value === "")) {
        //show location button
        state.location2 = undefined;
        showLocationsOnMap();
    } 
    showOrHideClearButtons();
}

// Deducts which clear crosses have to be shown, and shows them
function showOrHideClearButtons(){
    
    let frm = document.getElementById("fromInput");
    let showFromClear = (frm.value !== undefined && frm.value !== "") || state.location1 !== undefined;
    
    if(showFromClear){
        $("#clearInputFieldFromButton").show();
        $("#useLocationInputFieldButton").hide();
    }else{
        $("#clearInputFieldFromButton").hide();
        $("#useLocationInputFieldButton").show();
    }
    
    let to = document.getElementById("toInput");
    let showToClear = (to.value !== undefined && to.value !== "") || state.location2 !== undefined;
    
    if(showToClear){
        $("#clearInputFieldToButton").show();
    }else{
        $("#clearInputFieldToButton").hide();
    }
}

/**
 * Empty the contents of the startpoint input field
 */
function clearInputFieldFrom() {
    $("#fromInput").val("");
    state.location1 = undefined;
    showLocationsOnMap();
    fromFieldInputDetected(document.getElementById("fromInput"));
}

/**
 * Empty the contents of the endpoint input field
 */
function clearInputFieldTo() {
    $("#toInput").val("");
    state.location2 = undefined;
    showLocationsOnMap();
    toFieldInputDetected(document.getElementById("toInput"));
}


/**
 * Convert a location to an adress.
 * @param location LatLng of the location to be converted.
 * @param callback Function to be called when conversion is complete
 */
function reverseGeocode(location, callback) {
    var lng = location[0];
    var lat = location[1];
    $.getJSON(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=0`, function (data) {   
        callback(data.display_name);
    });
    /*/
    $.getJSON(urls.reverseGeocoder.format(lng, lat), function (data) { 
        callback(data.features[0].text + " (" + data.features[0].place_name + ")");
    });
    //*/
}
