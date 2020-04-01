import { ProfileConfig } from "./profileConfig";
import { Map } from "mapbox-gl";
import { TranslatedString } from "./translatedString";
import { IDictionary } from "../Dictionary";

export class BrandingBase {
    title: string;
    mapCenter: number[];
    mapStyle: string;
    mapZoom: number;
    profile1: ProfileConfig;
    profile2: ProfileConfig;
    profile3: ProfileConfig;
    selectedProfile: string;
    translations: IDictionary<TranslatedString>;
    languages: string[];
    
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