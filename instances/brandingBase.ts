import { ProfileConfig } from "./profileConfig";
import { Map } from "mapbox-gl";
import { TranslatedString } from "./translatedString";
import { IDictionary } from "../Dictionary";

export class BrandingBase {
    /**
     * The title of this branded version, which is used as HTML-title
     */
    title: string;
    /**
     * The logo to show in the upper left, a link to preferably an svg
     */
    logo: string;
    /**
     * Initial map location
     */
    mapCenter: number[];
    /**
     * The map style, a link to maptiler
     */
    mapStyle: string;
    /**
     * Initial default zoom level
     */
    mapZoom: number;
    /**
     * Anyways API-key for this instance
     */
    apiKey: string;

    profile1: ProfileConfig;
    profile2: ProfileConfig;
    profile3: ProfileConfig;
    /**
     * Default selected profile, often 'profile1'
     */
    selectedProfile: string;

    /**
     * Supported languages. Set to only a single (or no) language to hide the language control buttons
     */
    languages: string[];
    /**
     * String translation pieces, translating e.g. "document.title", "fromInput.placeholder", ... into dicts as {nl: "Naar", en: "To", ...}
     */
    translations: IDictionary<TranslatedString>;


    /**
     * The geocoder to use by default. {0} is replaced by the search term
     * By adding an area or a hint, one can steer where to search by default, ...
     *
     * There is no need to add the access token here, this one is added by 'index.ts'
     */
    geocoder: string =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?' +
        'country=BE&' +
        'limit=5&' +
        'types=place,locality,neighborhood,address,poi';

    apply(): void {
        // set icon.
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link'),
            oldLink = document.getElementById('dynamic-favicon');
        link.id = 'dynamic-favicon';
        link.rel = 'shortcut icon';
        link.href = this.logo;
        if (oldLink) {
            head.removeChild(oldLink);
        }
        head.appendChild(link);
    }

    addLayers(map: Map): void {

    }

    getProfileConfig(profile: string): ProfileConfig {
        if (profile == "profile1") {
            return this.profile1;
        } else if (profile == "profile2") {
            return this.profile2;
        } else {
            return this.profile3;
        }
    }
}