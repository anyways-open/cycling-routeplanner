import { TranslatedString } from './translatedString';

export interface ProfileConfig {
    readonly backend?: string,
    readonly backendName: string,
    readonly frontendName: TranslatedString,
    readonly frontendSubtitle: TranslatedString,
    readonly frontendExplanation: TranslatedString,
    readonly frontendLogo: string,
    readonly layers: any,
    readonly routecolor: {backend: boolean, color: string}
}