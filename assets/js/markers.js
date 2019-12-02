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
function fromFieldInputDetected(el) {
    if (!el.value || el.value === "") {
        //show location button
        $("#clearInputFieldFromButton").hide();
        $("#useLocationInputFieldButton").show();
        if (windowLoaded) {
            console.log("setting location 1 to undef");
            state.location1 = undefined;
            showLocationsOnMap();
        }
    } else {
        //show empty button
        $("#clearInputFieldFromButton").show();
        $("#useLocationInputFieldButton").hide();
    }
}

/**
 * Method that gets called when input is detected in the Endpoint input field
 * @param el - The input field itself
 */
function toFieldInputDetected(el) {
    if (!el.value || el.value === "") {
        //show location button
        $("#clearInputFieldToButton").hide();
        state.location2 = undefined;
        showLocationsOnMap();
    } else {
        //show empty button
        $("#clearInputFieldToButton").show();
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
