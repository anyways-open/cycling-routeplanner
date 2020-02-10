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
        if (query && doQuery) {
            var queryHash = urlhash.toQueryString(query);
            if (queryHash) {
                hash = hash + '?' + urlhash.toQueryString(query);
            }
        }
        return hash;
    },
    
    parseHash: function (hash) {
        var args = {};

        var i = hash.indexOf('#');
        if (i < 0) {
            return args;
        }

        hash = hash.substr(i + 1);

        var q = hash.indexOf('?');
        if (q >= 0) {
            var queryString = hash.substr(q + 1);
            args.query = urlhash.fromQueryString(queryString);
        }

        var map = (hash || '').split('/'),
            zoom = parseFloat(map[0]),
            lat = parseFloat(map[1]),
            lng = parseFloat(map[2]);

        if (!isNaN(zoom) && !isNaN(lat) && !isNaN(lng)) {
            args.center = { 
                lat: lat,
                lng: lng
            };
            args.zoom = zoom;
        }

        return args;  
    },

    toQueryString: function (paramsObject) {
        return Object
            .keys(paramsObject)
            .map(key => `${encodeURIComponent(key)}=${paramsObject[key]}`)
            .join('&');
    },

    fromQueryString: function (queryString ) {
        var params = {}, temp, i, l;
    
        if (!queryString) {
            return null;
        }
        if (!queryString.includes("=")) {
            return null;
        }
        if (queryString.startsWith("?")) {
            queryString = queryString.substr(1);
        }
    
        // Split into key/value pairs
        var queries = queryString.split("&");
        // Convert the array of strings into an object
        for ( i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }
        return params;
    },

    zoomPrecision: function (zoom) {
        return Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
    }
};