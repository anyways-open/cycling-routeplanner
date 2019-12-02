function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older
            return true;
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11
            return true;
        }
        return false;
} 

/*Add an 'app-like' button, mobile browsers only*/
function addToHomeScreen(){
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can add to home screen
        if (deferredPrompt) {
            //$("#btnAddToHomescreen").show();
            document.getElementById("btnAddToHomescreen").style.display = 'block';
        }
    });

    document.getElementById("btnAddToHomescreen").addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        document.getElementById("btnAddToHomescreen").style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
    });
}
