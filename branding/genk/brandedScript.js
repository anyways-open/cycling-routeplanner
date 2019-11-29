

 // This scripts add the legend entries on the span with ID 'legend'"
function addLegendEntries(){
       
    var element = document.getElementById("legend");

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
