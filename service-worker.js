// Simply put: this script makes sure no serviceworkers are registered as we had many problems with them

if (navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(

        function (registrations) {

            for (let registration of registrations) {
                registration.unregister();

            }

        });
}
