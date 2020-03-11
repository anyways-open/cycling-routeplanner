urlhash = {


    updateHash: function (state) {
        location.hash = urlhash.formatHash(state);  
        
        // also update all geo links.
        var locationHash = urlhash.formatHash(state, false);
        $('.geolink').each(function(geoLink){
            var href = this.href;
            var i = href.indexOf('#');
            if (i >= 0) {
                href = href.substr(0, i);
            }
            this.href = href + locationHash;
        });
    },
    
    formatHash: function (args, doQuery = true) {
        var center, zoom, query;
        
        zoom = args.zoom;
        center = args.center;
        query = args.query;
        
        var precision = urlhash.zoomPrecision(zoom);        
        var hash = '#' + zoom.toFixed(2) +
            '/' + center.lat.toFixed(precision) +
            '/' + center.lng.toFixed(precision);
        hash += "?sb=" + state.sideBarIsOpen;
        if (query && doQuery) {
            hash += '&' + urlhash.toQueryString(query);
        }
        return hash;
    },

    parseHash: function (url) {
        var args = {};

        let urlSplitQM = url.split("?");
        if (urlSplitQM.length > 1) {
            url = urlSplitQM[0];
            let queryString = urlSplitQM[1];
            args.query = {};

            let parts = queryString.split("&");
            for (let j = 0; j < parts.length; j++) {
                let [key, value] = parts[j].split('=');
                args.query[key] = value;
            }
        }


        let urlSplitHash = url.split("#");
        if (urlSplitHash.length > 1) {
            var coordinates = urlSplitHash[1];


            let splitBySlash = coordinates.split('/');
            let zoom = parseFloat(splitBySlash[0]);
            let lat = parseFloat(splitBySlash[1]);
            let lng = parseFloat(splitBySlash[2]);

            if (!isNaN(zoom) && !isNaN(lat) && !isNaN(lng)) {
                args.center = {
                    lat: lat,
                    lng: lng
                };
                args.zoom = zoom;
            }

        }
        return args;  
    },

    toQueryString: function (paramsObject) {
        return Object
            .keys(paramsObject)
            .map(key => `${encodeURIComponent(key)}=${paramsObject[key]}`)
            .join('&');
    },


    zoomPrecision: function (zoom) {
        return Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
    }
};