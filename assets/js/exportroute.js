
/**
 * Utility method to start exporting the current route as a .GPX file.
 */
function exportRoute(route, name) {
    let startpoint, endpoint;
    let routepoints = [];
    for (let i in route) {
        if (route[i].name === "Stop") {
            if (startpoint) {
                endpoint = route[i].geometry.coordinates;
            } else {
                startpoint = route[i].geometry.coordinates;
            }
        } else if (route[i].geometry.type === "LineString") {
            for (let j in route[i].geometry.coordinates) {
                routepoints.push(route[i].geometry.coordinates[j]);
            }
        }
    }
    exported = exportRouteFromTo(startpoint, endpoint, routepoints, name);
    if (exported) {
        download(exported, name+".gpx", ".gpx");
    }
}

/**
 * Construct a .GPX file from the given startpoint, endpoint and routepoints
 * @param startpoint LatLng of the startpoint
 * @param endpoint LatLng of the endpoint
 * @param routepoints collection of routepoints
 * @returns {string} The .gpx file
 */
function exportRouteFromTo(startpoint, endpoint, routepoints, name) {
    if (!routepoints || !(startpoint && endpoint)) {
        alert(getString("routeMissing", language));
    } else {
    
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    
        let gpx = '<?xml version="1.0" encoding="UTF-8"?><gpx xmlns="http://www.topografix.com/GPX/1/1" creator="genk.anyways.eu" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">';
        gpx +=
            `<wpt lat="${startpoint[1]}" lon="${startpoint[0]}">
            <name>Start</name>
            <desc>Startpoint route</desc>
            <type>Marker</type>
        </wpt>
        <wpt lat="${endpoint[1]}" lon="${endpoint[0]}">
            <name>End</name>
            <desc>Endpoint route</desc>
            <type>Marker</type>
        </wpt>`;
        gpx +=
            `\n\t\t<trk>
            <name>`+name+`</name>
            <desc>Route exported using the Genk Routeplaner by Anyways. Created on `+datetime+`</desc>
            <trkseg>`;
        for (var i in routepoints) {
            gpx +=
                `\n\t\t\t\t<trkpt lat="${routepoints[i][1]}" lon="${routepoints[i][0]}">
                    <ele>${routepoints[i][2]}</ele>
                </trkpt>`;
        }
        gpx +=
            `\n\t\t\t</trkseg>
        </trk>
    </gpx>`;
        return gpx;
    }
}

/**
 * Function to download data as a file
 */
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

