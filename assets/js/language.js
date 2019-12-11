/*
 * This script runs _after_ the branded script.
 * If it detects support for multiple languages, it'll show the language buttons and apply necessary translations
 */

// Global variable containing the current language
var currentLanguage = "nl";
if (supportedLanguages !== undefined) {
    currentLanguage = supportedLanguages[0]
}


function initLanguageControls() {
    if (supportedLanguages === undefined) {
        return;
    }
    if (supportedLanguages.length === 1) {
        return;
    }

    let container = document.getElementById("language-buttons");

    var elements = "";
    for (var i in supportedLanguages) {
        let lng = supportedLanguages[i];
        let Lng = lng.toUpperCase();
        let el = "<label class='btn btn-warning lang_label' onclick='applyLanguage(\"" + lng + "\");'> <input type='radio' name='options' autocomplete='off' checked> " + Lng + " </label>";
        elements += el;
    }
    container.innerHTML = elements;

    container.classList.remove("hidden");


}

function applyLanguage(newLanguage) {

    if (supportedLanguages === undefined) {
        return;
    }
    if (!supportedLanguages.includes(newLanguage)) {
        return;
    }

    currentLanguage = newLanguage;
    loadBrandedTexts(); // or rather - reload them

    if (translatedStrings === undefined) {
        return;
    }

    for (var key in translatedStrings) {

        let text = translatedStrings[key][currentLanguage];

        let splt = key.split('.');
        let elementId = splt[0];
        let elementAttribute = "innerHTML";
        if (splt.length === 2) {
            elementAttribute = splt[1];
        }
        let element = document.getElementById(elementId);
        element[elementAttribute] = text;
    }

}


/*
 * Gets the right term.
 * Input: either a string or a dictionary of the format {'languagecode' --> 'term'}
 * Returns: the input string or the right term according to the current language
 */
function getTerm(languageDictionary) {
    if (typeof languageDictionary === "string") {
        return languageDictionary;
    }
    var term = languageDictionary[currentLanguage];

    if (term === undefined) {
        console.log("Untranslated text for language", currentLanguage, languageDictionary);
    }

    return term;
}


function applyNavigatorLanguage() {
    let lng = navigator.language.split("-")[0];
    applyLanguage(lng);
}