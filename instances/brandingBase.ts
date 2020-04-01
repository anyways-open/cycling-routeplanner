import { ProfileConfig } from "./profileConfig";
import { Map } from "mapbox-gl";
import { TranslatedString } from "./translatedString";
import { IDictionary } from "../Dictionary";

export class BrandingBase {
    title: string;
    logo: string;
    mapCenter: number[];
    mapStyle: string;
    mapZoom: number;
    profile1: ProfileConfig;
    profile2: ProfileConfig;
    profile3: ProfileConfig;
    selectedProfile: string;
    translations: IDictionary<TranslatedString>;
    languages: string[];

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