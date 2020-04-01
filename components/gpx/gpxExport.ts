export class GpxExporter {

    exportRoute(route: any) {
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

        var exported = this.buildGpx(startpoint, endpoint, routepoints);
        if (exported) {
            this.download(exported, "route.gpx", ".gpx");
        }
    }

    buildGpx(startpoint: any, endpoint: any, routepoints: any): string {
        let gpx = '<?xml version="1.0" encoding="UTF-8"?><gpx xmlns="http://www.topografix.com/GPX/1/1" creator="RouteYou" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">';
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
                <name>BikeForBrussels Export</name>
                <desc>Route exported using the Bike For Brussels Routeplaner.</desc>
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
        //console.log(gpx);
        return gpx;
    }

    download(data: any, filename: any, type: any): void {
        var file = new Blob([data], { type: type });
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
}