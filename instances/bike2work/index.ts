import {BrandingBase} from "../brandingBase";
import {ProfileConfig} from "../profileConfig";
import logo from "./assets/img/logo.svg";
import GlobalSvg from "../../assets/img/*.svg";
import LocalSvg from "./assets/img/*.svg";

import {IDictionary, Dictionary} from "../../Dictionary";
import {TranslatedString} from "../translatedString";

export class Branding extends BrandingBase {
    constructor() {
        super();

        this.logo = logo;
        this.title = "Bike 2 work | Testrouteplanner";
        this.mapCenter = [4.3555, 50.8371];
        this.mapStyle = 'https://api.maptiler.com/maps/3327a63f-c15d-462a-9f23-ebf73a14254a/style.json?key=jwL83LCYXcsbjHQxJcVH';
        this.mapZoom = 11.54;
        this.selectedProfile = 'profile1';
        this.profile1 = {
            backendName: "bicycle.commute",
            frontendName: {"nl": "Woon-Werk"},
            frontendSubtitle: {
                "nl": "Een gebalanceerd profiel",
            },
            frontendExplanation: {
                "nl": "Een profiel gemaakt voor de dagelijkse pendelaar, die de voorkeur geeft aan veilige, comfortabele wegen zonder veel tijd in te boeten",
            },
            frontendLogo: LocalSvg["bird"],

            layers: {
                "cyclenetworks": false,
                "cyclenetwork-tiles": false,
                "cyclenetwork-tiles-high": false,
                "cyclenodes-circles": false,
                "cyclenodes-circles-high": false,
                "cyclenodes-circles-center": false,
                "cyclenodes-labels": false,
                "cyclenodes-labels-high": false
            },
            routecolor: {
                backend: false, // set to true if 'cycle_network_colour'-attribute should be used (thus if cycle networks should be rendered)
                color: "#d9a300" // default colour
            }
        };

        this.profile2 = {
            backendName: "bicycle.comfort_safety",
            frontendName: {"nl": "Veilig & comfortabel"},
            frontendSubtitle: {
                "nl": "Een veilige, comfortabele route",
            },
            frontendExplanation:
                {
                    "nl": "Een profiel gemaakt om veilige, comfortabele routes te verkiezen. Ideaal om naar school te gaan",
                },
            frontendLogo: GlobalSvg["relaxed"],

            layers: {
                "cyclenetworks": false,
                "cyclenetwork-tiles": false,
                "cyclenodes-circles": false,
                "cyclenodes-circles-high": false,
                "cyclenodes-circles-center": false,
                "cyclenodes-labels": false,
                "cyclenodes-labels-high": false
            },
            routecolor: {
                backend: false,
                color: "#d9a300"
            }
        };
        this.profile3 = {
            backendName: "bicycle.fastest",
            frontendName: {"nl": "Snelst"},
            frontendSubtitle: {
                "nl": "De snelste route naar je bestemming",
            },
            frontendExplanation:
                {
                    "nl": "Enkel voor echte snelheidsduivels voor wie iedere minuut telt. Gaat vaak langs drukke banen",
                },
            frontendLogo: GlobalSvg["fast"],
            layers: {
                "cyclenetworks": false,
                "cyclenetwork-tiles": false,
                "cyclenetwork-tiles-high": false,
                "cyclenodes-circles": false,
                "cyclenodes-circles-high": false,
                "cyclenodes-circles-center": false,
                "cyclenodes-labels": false,
                "cyclenodes-labels-high": false
            },
            routecolor: {
                backend: false,
                color: "#d9a300"
            }
        };

        this.languages = ["nl"];
        this.translations = new Dictionary<TranslatedString>();
        this.translations.add("document.title", {
            nl: "Bike to Work | Testrouteplanner",
        });
        this.translations.add("fromInput.placeholder", {
            nl: "Van",
        });
        this.translations.add("toInput.placeholder", {
            nl: "Naar",
        });
    }

}
