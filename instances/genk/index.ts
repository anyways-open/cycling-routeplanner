import { BrandingBase } from "../brandingBase";
import { ProfileConfig } from "../profileConfig";
import LocalSvg from "./assets/img/*.svg";
import LocalPng from "./assets/img/*.png";
import GlobalSvg from "../../assets/img/*.svg";
import Partials from "../../partials/*.html";
import LocalPartials from "./partials/*.html";
import logo from "./assets/img/favicon-96.png";
import { IDictionary, Dictionary } from "../../Dictionary";
import { TranslatedString } from "../translatedString";

export class Branding extends BrandingBase {
    constructor() {
        super();

        this.logo = logo;
        this.apiKey = "Vc32GLKD1wjxyiloWhlcFReFor7aAAOz";
        this.title = "Genk | Fietsnet";
        this.mapCenter = [5.5063, 50.9625];
        this.mapStyle = 'https://api.maptiler.com/maps/3327a63f-c15d-462a-9f23-ebf73a14254a/style.json?key=4GEuYRy0C8pjLa3x1u8M';
        this.mapZoom = 12.82;

        this.geocoder =
            'https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?' +
            'proximity=5.5196%2c50.9612&' +
            'country=BE&' +
            'bbox=5.35%2C50.88%2C5.62%2C51.09&' +
            'limit=5&' +
            'types=place,locality,neighborhood,address,poi';

    
        var aCircle = Partials["circle-a"];
        var bCircle = Partials["circle-b"];

        var frontendExplanation = "Fiets gemakkelijk van " + aCircle +  " naar " + bCircle + " met de gekleurde routes van het Genkse fietsnet. Volg de zwarte route om aan te sluiten op dit net."

        this.selectedProfile = 'profile1';
        this.profile1 = {
            backendName: "bicycle.genk",
            frontendName: { nl: "Fietsnet Genk" },
            frontendSubtitle: { nl: frontendExplanation },
            frontendExplanation: { nl: frontendExplanation },
            frontendLogo: LocalSvg["genk-networks"],

            layers: {
                "cyclenetworks": false,
                "cyclenetwork-tiles": false,
                "cyclenetwork-tiles-high": false,
                "cyclenodes-circles": false,
                "cyclenodes-circles-high": false,
                "cyclenodes-circles-center": false,
                "cyclenodes-labels": false,
                "cyclenodes-labels-high": false,
                "cyclenetworks-genk": {
                    "default": {
                        "visible": true
                    },
                    "route": {
                        "visible": false
                    }
                },
                "cyclenetworks-genk-shields": {
                    "default": {
                        "visible": true
                    },
                    "route": {
                        "visible": false
                    }
                },
                "cyclenetworks-genk-shields-endpoints": {
                    "default": {
                        "visible": true
                    },
                    "route": {
                        "visible": false
                    }
                }
            },
            routecolor: {
                backend: true,
                color: "#000000"
            },
            showHeight: false
        };
        this.profile2 = {
            backendName: "bicycle.networks",
            frontendName: { nl: "Knooppunten" },
            frontendSubtitle: { nl: "Dit is het bekende toeristische fietsknoopuntennetwerk. Je rijdt via de genummerde knooppunten." },
            frontendExplanation: { nl: "Dit is het bekende toeristische fietsknoopuntennetwerk. Je rijdt via de genummerde knooppunten." },
            frontendLogo: GlobalSvg["network"],

            layers: {
                "cyclenetworks": false,
                "cyclenetwork-tiles": {
                    "default": {
                        "line-opacity": 1
                    },
                    "route": {
                        "line-opacity": 0.75
                    }
                },
                "cyclenetwork-tiles-high": {
                    "default": {
                        "line-opacity": 1
                    },
                    "route": {
                        "line-opacity": 0.75
                    }
                },
                "cyclenodes-circles": true,
                "cyclenodes-circles-high": true,
                "cyclenodes-circles-center": true,
                "cyclenodes-labels": true,
                "cyclenodes-labels-high": true,
                "cyclenetworks-genk": false,
                "cyclenetworks-genk-shields": false,
                "cyclenetworks-genk-shields-endpoints": false
            },
            routecolor: {
                backend: false,
                color: "#000000"
            },
            showHeight: false
        };
        this.profile3 = {
            backendName: "bicycle.shortest",
            frontendName: { nl: "Snelst" },
            frontendSubtitle: { nl: "Dit is de snelste route" },
            frontendExplanation: { nl: "Enkel voor echte snelheidsduivels voor wie iedere minuut telt. Gaat vaak langs drukke banen" },
            frontendLogo: GlobalSvg["fast"],
            layers: {
                "cyclenetworks": false,
                "cyclenetwork-tiles": false,
                "cyclenetwork-tiles-high": false,
                "cyclenodes-circles": false,
                "cyclenodes-circles-high": false,
                "cyclenodes-circles-center": false,
                "cyclenodes-labels": false,
                "cyclenodes-labels-high": false,
                "cyclenetworks-genk": false,
                "cyclenetworks-genk-shields": false,
                "cyclenetworks-genk-shields-endpoints": false
            },
            routecolor: {
                backend: false,
                color: "#000000"
            },
            showHeight: false
        };

        this.languages = ["nl"];
        this.translations = new Dictionary<TranslatedString>();
        this.translations.add("document.title", {
            nl: "Genk | Fietsrouteplanner"
        });
        this.translations.add("fromInput.placeholder", {
            nl: "Van"
        });
        this.translations.add("toInput.placeholder", {
            nl: "Naar"
        });
    }

    apply(): void {
        super.apply();

        function addLegendEntriesTo(pane) {

            var element = document.getElementById(pane);

            // The data to add. Eventually, this can be changed to an overpass-query or external data set someday
            var routes = [
                { ref: 1, name: "Industrie-Zuid – C-mine", colour: "#fdc300" }, // The yellow is darkened a little for readability
                { ref: 2, name: "Bokrijk - Thor Park", colour: "#2c89c2" },
                { ref: 3, name: "Bokrijk - Kattevennen", colour: "#e84c0a" },
                { ref: 4, name: "Industrie Noord - Gelieren", colour: "#873e0a" },
                { ref: 5, name: "Nieuwe Kempen - Caetsbeek", colour: "#ecafb5" },
                { ref: 6, name: "Zwartberg - Genk Centrum", colour: "#c9328b" },
                { ref: 7, name: "Genkerring", colour: "#4faf47" }
            ];

            var contents = "<div class='container'>";

            for (var i in routes) {
                var route = routes[i];
                contents += "<div class='row mb-2'>";

                contents += "<div class='col-4'>";
                // contents += "<div class='legend-ref' style='background-color:" + route.colour + "'>" + route.ref + "</div>";
                contents += "<div class='network-icon'><img class='svg' src='" + LocalSvg["network" + route.ref] + "'></div>";
                contents += "</div>"

                contents += "<div class='col'>";
                contents += "<h5 class='legend-text'>" + route.name + "</h5>";
                contents += "</div>"

                contents += "</div>"
            }

            contents += "</div>";

            // var contents = "<table class='table table-sm table-borderless'><tbody>";


            // for (var i in routes) {
            //     var route = routes[i];
            //     contents += "<tr><td><div class='legend-ref' style='background-color:" + route.colour + "'>" + route.ref + "</div></td><td><div class='legend-text'>" + route.name + "</div></td>"
            // }

            // contents += "</tbody></table>";
            element.innerHTML = "<div>" + contents + "</div>";
        }

        addLegendEntriesTo("profile1-summary-extra");
        // addLegendEntriesTo("profile1-instruction-extra");

        function replaceProfile1Instruction() {
            var element = document.getElementById("profile1-instruction");
            element.innerHTML = LocalPartials["profile1-instruction"];
        }
        replaceProfile1Instruction();
    }

    addLayers(map: import("mapbox-gl").Map): void {
        // get lowest label and road.
        var style = map.getStyle();
        var lowestRoad = undefined;
        var lowestLabel = undefined;
        for (var l = 0; l < style.layers.length; l++) {
            var layer = style.layers[l];

            if (layer && layer["source-layer"] === "transportation") {
                if (!lowestRoad) {
                    lowestRoad = layer.id;
                }
            }

            if (layer && layer["type"] === "symbol") {
                if (!lowestLabel) {
                    lowestLabel = layer.id;
                }
            }
        }

        map.addSource('genk-network-endpoints', {
            'type': 'geojson',
            'data': {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 6
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.531406998634338,
                                51.02788336448483
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 6
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.531460642814636,
                                51.026020929624984
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 6
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.5020153522491455,
                                50.96622133414664
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 7
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.4959481954574585,
                                50.947234254497545
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 7
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.50786256790161,
                                50.98025644396389
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 5
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.494628548622131,
                                51.00875610650817
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 5
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.516574382781982,
                                50.9085264799737
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 4
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.559457540512085,
                                50.95254019924865
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 4
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.441402792930603,
                                50.995604071551796
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 3
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.554414987564086,
                                50.94229276002834
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 3
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.411732196807861,
                                50.964552377107246
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 2
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.404356122016907,
                                50.943823935884616
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 2
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.534834861755371,
                                50.99434808676594
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 1
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.448676943778992,
                                50.922460660995284
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "ref": 1
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                5.488438010215759,
                                50.97822997532682
                            ]
                        }
                    }
                ]
            }
        })

        map.addSource('genk', {
            'type': 'geojson',
            'data': { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[5.3843163, 50.959488699], [5.3872989, 50.957163999], [5.3918908, 50.955082499], [5.3947447, 50.953771299], [5.3974484, 50.953879399], [5.3984998, 50.953933499], [5.4004739, 50.954149799], [5.4015683, 50.953352299], [5.4025034, 50.953035599], [5.4033078, 50.952299299], [5.4050055, 50.950891999], [5.411825, 50.945754899], [5.4129408, 50.944957299], [5.4149391, 50.943699899], [5.4158655, 50.944187299], [5.4159668, 50.944207999], [5.4184431, 50.945954999], [5.4184833, 50.946047899], [5.4185517, 50.946101799], [5.4214357, 50.947635899], [5.4222062, 50.947758099], [5.4235607, 50.948356299], [5.4237483, 50.948404199], [5.4245532, 50.948552299], [5.425562, 50.948928999], [5.4260337, 50.949064399], [5.4258674, 50.949348299], [5.4260364, 50.949496999], [5.4261813, 50.949586499], [5.4263529, 50.949669299], [5.4265085, 50.949703099], [5.4266962, 50.949687899], [5.4269913, 50.949802799], [5.4272354, 50.949865299], [5.4273614, 50.949980199], [5.4276993, 50.950071499], [5.427812, 50.950062999], [5.4280039, 50.950007899], [5.4287133, 50.950128899], [5.4289708, 50.950216799], [5.4292577, 50.950267099], [5.4293758, 50.950309799], [5.4307544, 50.950585199], [5.4311918, 50.950702299], [5.4310829, 50.949005299], [5.4325837, 50.948072399], [5.4327401, 50.948028899], [5.4357782, 50.946199999], [5.4398026, 50.943792099], [5.4407666, 50.943239499], [5.4410722, 50.943226099], [5.4425903, 50.943369799], [5.4459347, 50.943654899], [5.4523063, 50.940355899], [5.4522795, 50.940301799], [5.4533202, 50.939767699], [5.4532934, 50.939625699], [5.4573918, 50.937597499], [5.465672, 50.933455499], [5.4697835, 50.931292499], [5.4704085, 50.930991499], [5.4777756, 50.923841899], [5.478604, 50.923155199], [5.4785185, 50.923096799], [5.4786426, 50.923038099], [5.4787029, 50.923020299], [5.4787237, 50.922997499], [5.4787224, 50.922966199], [5.4787017, 50.922937999], [5.4789698, 50.922844499], [5.4790808, 50.922634799], [5.4797118, 50.922555399], [5.4809553, 50.922414399], [5.4812172, 50.922432299], [5.4814341, 50.922367499], [5.481355, 50.922271099], [5.481478, 50.922217399], [5.4816735, 50.922220599], [5.4817197, 50.922206999], [5.4817888, 50.922152099], [5.4818827, 50.922099699], [5.4820094, 50.922044699], [5.4822884, 50.921874799], [5.4822642, 50.921813099], [5.4822642, 50.921776699], [5.4822716, 50.921761499], [5.482281, 50.921748399], [5.4822904, 50.921738699], [5.4823125, 50.921725999], [5.482336, 50.921714599], [5.4823635, 50.921706599], [5.4824406, 50.921696399], [5.4825566, 50.921674399], [5.4826143, 50.921651999], [5.4826578, 50.921622399], [5.4826739, 50.921572599], [5.48268, 50.921514699], [5.48269, 50.921486299], [5.4827169, 50.921455899], [5.4827423, 50.921437299], [5.4827658, 50.921426299], [5.4827859, 50.921420399], [5.4828107, 50.921416599], [5.4828282, 50.921417899], [5.4828751, 50.921428799], [5.4829147, 50.921433099], [5.4829804, 50.921419999], [5.4829864, 50.921356599], [5.483869, 50.920701899], [5.4846239, 50.920123499], [5.4851107, 50.919758699], [5.4856928, 50.919342699], [5.4858564, 50.919176199], [5.485957, 50.919055299], [5.4862922, 50.918635899], [5.4867402, 50.918132899], [5.4870144, 50.917803199], [5.4870459, 50.917775699], [5.4870801, 50.917754499], [5.4871224, 50.917734699], [5.4882087, 50.917313599], [5.4884353, 50.917235599], [5.4885302, 50.917204799], [5.4887193, 50.917140499], [5.4887602, 50.917125499], [5.488785, 50.917114099], [5.4888296, 50.917088499], [5.488892, 50.917042599], [5.4909479, 50.915422599], [5.491257, 50.915165799], [5.4914642, 50.915008299], [5.4915688, 50.914923599], [5.4916432, 50.914876399], [5.4916885, 50.914834999], [5.4917184, 50.914819199], [5.4917455, 50.914812999], [5.4917723, 50.914811299], [5.4918307, 50.914807699], [5.4919785, 50.914799499], [5.4925824, 50.914746399], [5.492693, 50.914738199], [5.4928217, 50.914730999], [5.4929046, 50.914728299], [5.4930876, 50.914727399], [5.4931848, 50.914722799], [5.4933297, 50.914706499], [5.4933843, 50.914691899], [5.4934081, 50.914682399], [5.4934279, 50.914671799], [5.4934866, 50.914647099], [5.4936345, 50.914608199], [5.4938152, 50.914565299], [5.4939302, 50.914535499], [5.4941518, 50.914468699], [5.4946091, 50.914344399], [5.4946929, 50.914324699], [5.4947449, 50.914312899], [5.4948445, 50.914293199], [5.495161, 50.914248199], [5.4954225, 50.914207599], [5.4955063, 50.914196399], [5.4956418, 50.914178199], [5.4957299, 50.914164899], [5.4959308, 50.914137899], [5.4960944, 50.914118999], [5.4962737, 50.914091099], [5.496325, 50.914085199], [5.4964468, 50.914067299], [5.4965276, 50.914053099], [5.4965621, 50.914046699], [5.4966114, 50.914033899], [5.4966664, 50.914024999], [5.4966962, 50.914021799], [5.4967649, 50.914018199], [5.4968199, 50.914013099], [5.4969346, 50.913993499], [5.4970077, 50.913984799], [5.497121, 50.913971099], [5.4972353, 50.913955199], [5.4973684, 50.913941299], [5.4974791, 50.913926899], [5.4977584, 50.913883799], [5.4978157, 50.913878299], [5.4979176, 50.913864499], [5.4979692, 50.913853499], [5.4980329, 50.913836399], [5.4980567, 50.913830899], [5.4980903, 50.913828399], [5.4981885, 50.913826299], [5.4982247, 50.913824799], [5.4982646, 50.913820399], [5.498326, 50.913810399], [5.4984437, 50.913796299], [5.4984879, 50.913786699], [5.498557, 50.913766699], [5.4985851, 50.913761799], [5.4986183, 50.913759299], [5.498681, 50.913760299], [5.4987095, 50.913758399], [5.498736, 50.913753099], [5.4987833, 50.913739999], [5.4988024, 50.913737099], [5.4988343, 50.913733499], [5.4988819, 50.913733699], [5.4989037, 50.913732199], [5.4990012, 50.913717599], [5.4990545, 50.913712799], [5.499086, 50.913707699], [5.4991286, 50.913704499], [5.4992104, 50.913692299], [5.4992855, 50.913674499], [5.4993117, 50.913670699], [5.4993539, 50.913672799], [5.4994223, 50.913670299], [5.4994807, 50.913661799], [5.5005556, 50.913548499], [5.501377, 50.913484699], [5.5019751, 50.913440699], [5.5021642, 50.913432199], [5.5024338, 50.913414499], [5.5029581, 50.913385699], [5.5032009, 50.913376899], [5.5033209, 50.913377299], [5.5034644, 50.913375599], [5.5035958, 50.913364599], [5.5036917, 50.913353599], [5.5038708, 50.913345199], [5.5041014, 50.913341799], [5.504149, 50.913336699], [5.5042483, 50.913318899], [5.5042798, 50.913315999], [5.5044193, 50.913311799], [5.50454, 50.913306299], [5.5047888, 50.913282999], [5.5049095, 50.913277499], [5.505059, 50.913273699], [5.5051106, 50.913268199], [5.5051629, 50.913260999], [5.5052105, 50.913257199], [5.5053815, 50.913253399], [5.5055358, 50.913247499], [5.5055659, 50.913244099], [5.5056518, 50.913228899], [5.5056806, 50.913225099], [5.5057349, 50.913219999], [5.5058107, 50.913216599], [5.5060373, 50.913195899], [5.5065255, 50.913178999], [5.5065932, 50.913172699], [5.5066703, 50.913169699], [5.5067327, 50.913163799], [5.5068252, 50.913147299], [5.506954, 50.913134599], [5.507017, 50.913135499], [5.5070713, 50.913141799], [5.5071189, 50.913144299], [5.5071786, 50.913135499], [5.507312, 50.913111799], [5.507357, 50.913105899], [5.5074656, 50.913107999], [5.507528, 50.913106299], [5.5076218, 50.913098699], [5.5077332, 50.913094899], [5.5078438, 50.913085099], [5.5079229, 50.913075799], [5.5079471, 50.913074999], [5.5080644, 50.913077499], [5.5080919, 50.913077999], [5.5081516, 50.913073699], [5.5082723, 50.913060999], [5.5083447, 50.913057199], [5.5084533, 50.913049199], [5.5084922, 50.913049199], [5.508517, 50.913053399], [5.5085345, 50.913060199], [5.5085512, 50.913072499], [5.5085599, 50.913082599], [5.5086384, 50.913220899], [5.5086531, 50.913255899], [5.5086565, 50.913282599], [5.5086498, 50.913300799], [5.5086411, 50.913314299], [5.5086055, 50.913341299], [5.5085915, 50.913354499], [5.5085807, 50.913371399], [5.5085754, 50.913392099], [5.508576, 50.913422499], [5.5085807, 50.913442799], [5.5085861, 50.913455499], [5.5086002, 50.913471999], [5.5086122, 50.913478299], [5.5086257, 50.913482099], [5.5086444, 50.913482999], [5.5086753, 50.913478299], [5.5087316, 50.913461399], [5.5087705, 50.913452499], [5.5087906, 50.913450799], [5.5088047, 50.913451699], [5.5088382, 50.913457199], [5.5088945, 50.913473299], [5.5089375, 50.913482099], [5.5090669, 50.913498199], [5.5092372, 50.913515499], [5.5092667, 50.913521499], [5.5093344, 50.913540899], [5.5093713, 50.913548899], [5.5095356, 50.913566299], [5.5096167, 50.913581099], [5.5097488, 50.913609399], [5.5098038, 50.913616999], [5.5099091, 50.913629299], [5.5101129, 50.913658399], [5.5103, 50.913695199], [5.5103496, 50.913702399], [5.5105079, 50.913717599], [5.510591, 50.913728999], [5.5107205, 50.913758199], [5.5108673, 50.913798399], [5.5109196, 50.913808499], [5.5109585, 50.913814399], [5.5110209, 50.913815699], [5.5110926, 50.913813199], [5.5112797, 50.913797099], [5.5113763, 50.913786999], [5.511503, 50.913779799], [5.5116411, 50.913780999], [5.5117464, 50.913774699], [5.5118108, 50.913778899], [5.5119751, 50.913783999], [5.5120388, 50.913788599], [5.5123499, 50.913839799], [5.512476, 50.913869399], [5.5125578, 50.913886699], [5.5126745, 50.913901899], [5.5127496, 50.913915499], [5.5128019, 50.913928999], [5.5128723, 50.913956899], [5.5129078, 50.913967099], [5.5129433, 50.913973399], [5.5130352, 50.913988199], [5.513109, 50.914001299], [5.5133222, 50.914049899], [5.5133604, 50.914060499], [5.5134275, 50.914082499], [5.5134851, 50.914096799], [5.5135556, 50.914106099], [5.5136655, 50.914112499], [5.513697, 50.914116299], [5.5137185, 50.914123899], [5.5137326, 50.914131899], [5.5137487, 50.914144599], [5.5137775, 50.914181399], [5.5137876, 50.914188599], [5.5138003, 50.914194099], [5.5138218, 50.914196599], [5.5138385, 50.914195799], [5.5138613, 50.914188599], [5.5139069, 50.914169099], [5.5139223, 50.914164899], [5.5139465, 50.914163199], [5.5139793, 50.914166999], [5.5140933, 50.914186099], [5.5141483, 50.914198299], [5.5142268, 50.914220299], [5.5143422, 50.914259199], [5.5143913, 50.914250499], [5.5149074, 50.914363599], [5.5171047, 50.914856799], [5.5181118, 50.915045199], [5.5182957, 50.915097999], [5.5184495, 50.915132999], [5.5185981, 50.915158799], [5.5190379, 50.915253899], [5.5206433, 50.915287799], [5.5232906, 50.915319899], [5.5270361, 50.915371699], [5.5273274, 50.915000299], [5.5283058, 50.913914299], [5.5284203, 50.914025199], [5.5312242, 50.916135399], [5.5325818, 50.917195299], [5.5326184, 50.917243999], [5.5366159, 50.920054999], [5.5367446, 50.920152299], [5.543625, 50.925334999], [5.5435445, 50.930060699], [5.543525, 50.930429999], [5.543867, 50.932044999], [5.544597, 50.934132999], [5.545861, 50.936499999], [5.5455112, 50.941102899], [5.5455059, 50.941173099], [5.546314, 50.945587999], [5.545716, 50.945783999], [5.54582, 50.949972999], [5.546694, 50.951772999], [5.546577, 50.956153999], [5.546942, 50.958720999], [5.548035, 50.960232999], [5.549826, 50.962499999], [5.551511, 50.963577999], [5.553716, 50.964316999], [5.558327, 50.961794999], [5.559795, 50.960256999], [5.560337, 50.960822999], [5.562398, 50.964800999], [5.5754532, 50.969942999], [5.576182, 50.970229999], [5.5951688, 50.977342399], [5.5943799, 50.977544099], [5.5765489, 50.982122799], [5.5716188, 50.984842799], [5.5714888, 50.985026299], [5.560712, 50.990618999], [5.555234, 50.994720999], [5.553006, 50.996123999], [5.5497014, 50.998460099], [5.549522, 50.998586999], [5.5420595, 51.005147099], [5.540367, 51.006627999], [5.5340215, 51.013082099], [5.52822, 51.018981999], [5.5224527, 51.018820599], [5.5217192, 51.018868899], [5.5184516, 51.018867399], [5.5081873, 51.018834399], [5.5069282, 51.018861999], [5.5010496, 51.019729699], [5.4963056, 51.020430899], [5.4961375, 51.020605899], [5.495102, 51.020765999], [5.4949847, 51.020710799], [5.4950299, 51.020641399], [5.4936293, 51.019690199], [5.4936738, 51.019667299], [5.4876781, 51.015622199], [5.4875846, 51.015610099], [5.4872487, 51.015383599], [5.4870545, 51.014823599], [5.486597, 51.014631999], [5.4830045, 51.012395199], [5.479361, 51.010526299], [5.47865, 51.010081999], [5.470995, 51.005393999], [5.468853, 51.004128999], [5.465929, 51.001680999], [5.465003, 51.000784999], [5.4647881, 51.000654999], [5.459639, 50.997860899], [5.455211, 50.995616899], [5.4457606, 50.990966899], [5.4302038, 50.983064999], [5.4298559, 50.982591399], [5.428847, 50.981127899], [5.4287412, 50.980952699], [5.4285035, 50.980639599], [5.4284551, 50.980573799], [5.4284115, 50.980524799], [5.427539, 50.979437799], [5.4264772, 50.978020299], [5.4252293, 50.976556899], [5.424903, 50.975859899], [5.424299, 50.975817899], [5.423524, 50.974872899], [5.4013288, 50.967536199], [5.3965042, 50.965989199], [5.395882, 50.965759499], [5.395088, 50.965475699], [5.3944658, 50.965259499], [5.3935216, 50.964908099], [5.3915261, 50.963867599], [5.3884147, 50.962232299], [5.3862475, 50.960786199], [5.3843163, 50.959488699]]] }, "properties": { "id": -405711, "admin_level": 8, "parents": "-2412218,-53142,-53134,-52411", "name": "Genk", "local_name": "Genk", "name_en": null } }] }
        });

        // map.addLayer({
        //     'id': 'genk',
        //     'type': 'line',
        //     'source': 'genk',
        //     'layout': {
        //         'line-join': 'round',
        //         'line-cap': 'round'
        //     },
        //     'paint': {
        //         'line-color': '#888',
        //         'line-width': 8
        //     }
        // });

        map.addLayer({
            'id': 'genk',
            'type': 'fill',
            'source': 'genk',
            'layout': {},
            'paint': {
                'fill-color': '#e3e6e8',
                'fill-opacity': 0.5
            }
        }, lowestRoad);

        map.addLayer({
            "id": "cyclenetworks-genk",
            "type": "line",
            "source": "cyclenetworks-tiles",
            "source-layer": "cyclenetwork",
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": ['get', 'colour'],
                "line-width": [
                    'interpolate', ['linear'], ['zoom'],
                    10, 1,
                    13, 3,
                    16, 7
                ],
                "line-opacity": 0.9
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "all",
                    [
                        "==",
                        "operator",
                        "Stad Genk"
                    ]
                ]
            ]
        }, lowestLabel);

        function loadImage(i: number) {
            map.loadImage(LocalPng[`network${i}-icon.svg.50`], function (error: any, image: HTMLImageElement | ArrayBufferView | { width: number; height: number; data: Uint8Array | Uint8ClampedArray; } | ImageData) {
                console.log("loading" + image);
                if (error) throw error;
                if (!map.hasImage(`network-${i}-shield`)) map.addImage(`network-${i}-shield`, image, {
                    pixelRatio: 1
                });
            });
        }

        for (var x = 1; x <= 7; x++) {
            loadImage(x);
        }

        map.addLayer({
            "id": "cyclenetworks-genk-shields-endpoints",
            "type": "symbol",
            "source": "genk-network-endpoints",
            "minzoom": 8,
            "maxzoom": 24,
            "layout": {
                "icon-image": "network-{ref}-shield",
                "icon-rotation-alignment": "viewport",
                "icon-size": [
                    'interpolate', ['linear'], ['zoom'],
                    15, 0.5,
                    18, 1
                ],
                "icon-padding": 2,
                // "symbol-placement": {
                //     "base": 1,
                //     "stops": [
                //         [
                //             10,
                //             "point"
                //         ],
                //         [
                //             110,
                //             "line"
                //         ]
                //     ]
                // },
                "symbol-placement": "point",
                "symbol-sort-key": ["-", 10, ["get", "ref"]], // { "type": "identity", "property": "ref" },
                "symbol-spacing": 10
            }
        });

        map.addLayer({
            "id": "cyclenetworks-genk-shields",
            "type": "symbol",
            "source": "cyclenetworks-tiles",
            "source-layer": "cyclenetwork",
            "minzoom": 14,
            "maxzoom": 24,
            "layout": {
                "icon-image": "network-{ref}-shield",
                "icon-rotation-alignment": "viewport",
                "icon-size": [
                    'interpolate', ['linear'], ['zoom'],
                    15, 0.5,
                    18, 1
                ],
                "icon-padding": 25,
                // "symbol-placement": {
                //     "base": 1,
                //     "stops": [
                //         [
                //             10,
                //             "point"
                //         ],
                //         [
                //             110,
                //             "line"
                //         ]
                //     ]
                // },
                "symbol-placement": "line",
                "symbol-sort-key": ["-", 10, ["get", "ref"]], // { "type": "identity", "property": "ref" },
                "symbol-spacing": 10000
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "all",
                    [
                        "==",
                        "operator",
                        "Stad Genk"
                    ]
                ]
            ]
        });

        map.addSource("profile1-source", {
            type: 'geojson',
            data: { "type": "FeatureCollection", "features": [] }
        });

        map.addLayer({
            "id": "cyclenetworks-genk-shields-route",
            "type": "symbol",
            "source": "profile1-source",
            "minzoom": 14,
            "maxzoom": 24,
            "layout": {
                "icon-image": "network-{ref}-shield",
                "icon-rotation-alignment": "viewport",
                "icon-size": [
                    'interpolate', ['linear'], ['zoom'],
                    15, 0.5,
                    18, 1
                ],
                "icon-padding": 25,
                // "symbol-placement": {
                //     "base": 1,
                //     "stops": [
                //         [
                //             10,
                //             "point"
                //         ],
                //         [
                //             110,
                //             "line"
                //         ]
                //     ]
                // },
                "symbol-placement": "line",
                "symbol-sort-key": ["-", 10, ["get", "ref"]], // { "type": "identity", "property": "ref" },
                "symbol-spacing": 10000
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "all",
                    [
                        "==",
                        "operator",
                        "Stad Genk"
                    ]
                ]
            ]
        });
    }
}