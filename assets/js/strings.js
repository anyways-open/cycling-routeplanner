const dict = {
    locationMissing: {  //Currently not used
        en: "Please enter at least 2 locations before continuing.",
        fr: "Veuillez entrer au moins deux endroits avant de continuer.",
        nl: "Gelieve minstens 2 locaties op te geven alvorens verder te gaan."
    },
    routeMissing: {
        en: "No route found for the given selections.",
        fr: "Aucun itinéraire trouvé pour les sélections données.",
        nl: "Er is geen route gevonden voor de gegevens selecties."
    },
    instructionsCollapseButton: {
        en: "Instructions",
        fr: "Instructions",
        nl: "Instructies"
    },
    fromInputPlaceholder: {
        en: "From",
        fr: "De",
        nl: "Van"
    },
    toInputPlaceholder: {
        en: "To",
        fr: "À",
        nl: "Naar"
    },
    profileNameFast: {
        en: "Fast",
        fr: "Rapide",
        nl: "Snel"
    },
    profileNameBalanced: {
        en: "Balanced",
        fr: "Équilibré",
        nl: "Gebalanceerd"
    },
    profileNameRelaxed: {
        en: "Relaxed",
        fr: "Détendu",
        nl: "Ontspannen"
    },
    profileNameNetworks: {
        en: "Networks",
        fr: "Réseaux",
        nl: "Netwerk"
    },
    profileDescriptionFast: {
      en: "This profile minimizes the time to destination.",
      fr: "Ce profil minimise le temps de destination.",
      nl: "Dit profiel minimaliseert de tijd naar uw bestemming.",
    },
    profileDescriptionBalanced: {
      en: "This profile avoids the biggest streets and prefers cycleways.",
      fr: "Ce profil évite les plus grandes rues et préfère les pistes cyclables.",
      nl: "Dit profiel vermijdt de grote wegen en verkiest het fietsnetwerk."
    },
    profileDescriptionRelaxed: {
      en: "This profile avoids big roads, highly prefers cycleways, avoids uncomfortable surfaces such as cobblestones, and avoids streets with parallel parked cars.",
      fr: "Ce profil évite les grandes routes, privilégie fortement les pistes cyclables, évite les surfaces inconfortables telles que les pavés, et évite les rues avec des voitures en stationnement parallèles.",
      nl: "Dit profiel vermijdt grote wegen en verkiest fietspaden. Het schenk geen extra aandacht aan fietsnetwerken."
    },
    profileDescriptionNetworks: {
      en: "This profile heavily prefers the cycling network.",
      fr: "Ce profil privilégie fortement les réseaux cyclables.",
      nl: "Dit profiel verkiest de fietsnetwerken."
    },
    profileTitleFast: {
      en: "This is the FAST route",
      fr: "C'est la route la plus RAPIDE.",
      nl: "Dit is de SNELSTE route.",
    },
    profileTitleBalanced: {
      en: "This is the BALANCED route",
      fr: "C'est la route ÉQUILIBRÉE.",
      nl: "Dit is de GEBLANCEERDE route"
    },
    profileTitleRelaxed: {
      en: "This is the RELAXED route",
      fr: "C'est la route RELAXÉE",
      nl: "Dit is de ONTSPANNEN route"
    },
    profileTitleNetwork: {
      en: "This is the NETWORK route",
      fr: "C'est la route avec le RÉSEAU CYCLABLE",
      nl: "Dit is de NETWERK route"
    },
    profileProposal: {
      en: "Proposed route for you",
      fr: "C'est la route proposée pour vous",
      nl: "Dit is de voorgestelde route"
    },
    exportOptionsTitle: {
      en: "Export Options",
      fr: "Options d'exportation",
      nl: "Exporteer opties"
    },
    exportgeneralexplanation: {
        en: "Please select a method to export your route.",
        fr: "Veuillez sélectionner une méthode pour exporter votre itinéraire.",
        nl: "Selecteer een manier om uw route te exporteren."
    },
    exportgpxexplanation: {
        en: "You can export .gpx files to navigation applications and GPS devices.",
        fr: "Vous pouvez exporter des fichiers .gpx vers des applications de navigation et des appareils GPS",
        nl: "U kan de route exporteren naar een .gpx bestand. Dit kan geopend worden door navigatie applicaties en gps toestellen."
    },
    exportprintexplanation: {
        en: "Not into digital? Print it out!",
        fr: "Not into digital? Print it out!",
        nl: "Houdt u niet van digitaal? Print uw route op papier!"
    },
    exportgpxbutton: {
        en: "Export as .gpx file",
        fr: "Exporter au format .gpx",
        nl: "Exporteer als .gpx bestand"
    },
    exportprintbutton: {
        en: "Print",
        fr: "Imprimer",
        nl: "Afdrukken"
    },
    close: {
        en: "Close",
        fr: "Fermer",
        nl: "Sluit"
    }
};

function getString(stringId, lang){
    return dict[stringId][lang];
}
