/*
 * Sets and read the URL parameters
 */ 



/**
 * Get the parameters that are encoded in the given url
 * @param url
 */
function getAllUrlParams(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            //var paramValue = a[1];
            let paramValue;
            if (typeof (a[1]) === 'undefined') {
                paramValue = true;
            } else {
                paramValue = a[1].toLowerCase();
                //check if the value is a comma sepperated list
                var b = paramValue.split(',');
                paramValue = typeof (b[1]) === 'undefined' ? b[0] : b;
            }

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();


            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                // if array index number specified...
                else {
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
            // if param name doesn't exist yet, set it
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;
}

/**
 * Set the current url, so that refreshing the page will take you to the same locations.
 * @param params - map containing the parameters to encode (in this case probably loc1 and loc2)
 */
function setCurrentUrl(params) {
    currentUrl = window.location.href;
    currentUrl = currentUrl.split('?')[0] + '?';  //remove current parameters (if any)
    for (var i in params) {
        currentUrl += i + '=' + params[i] + "&";
    }
    //window.location.href = currentUrl;
    window.history.pushState("object or string", "Title", currentUrl);
}
