# Cycling Route Planner :bicyclist: :bicyclist: :bicyclist:

[![Build status](https://build.anyways.eu/app/rest/builds/buildType:(id:anyways_routing_CyclingRouteplanner)/statusIcon)](https://build.anyways.eu/buildConfiguration/anyways_routing_CyclingRouteplanner#all-projects)  

This our cycling route planner web app. This was originally built during [Open Summer of Code](https://summerofcode.be/) [here](https://github.com/oSoc18/bike4brussels) and we polished and finished it. The branding in this route planner can be customized to your project/company/city/region.

It uses the ANYWAYS route planning [API](https://docs.anyways.eu/routing-api/) to handle:

- Cycling networks
  - Cycle highways
  - Node networks
  - Regional and city networks
- Elevation :mountain_bicyclist:
- Multiple routing profiles.

## Screenshots

<img src="https://github.com/anyways-open/cycling-routeplanner/raw/master/docs/screenshots/screenshot01.png" width="200"/> <img src="https://github.com/anyways-open/cycling-routeplanner/raw/master/docs/screenshots/screenshot02.png" width="200"/> <img src="https://github.com/anyways-open/cycling-routeplanner/raw/master/docs/screenshots/screenshot03.png" width="200"/> <img src="https://github.com/anyways-open/cycling-routeplanner/raw/master/docs/screenshots/screenshot04.png" width="200"/> <img src="https://github.com/anyways-open/cycling-routeplanner/raw/master/docs/screenshots/screenshot05.png" width="200"/> <img src="https://github.com/anyways-open/cycling-routeplanner/raw/master/docs/screenshots/screenshot06.png" width="200"/> <img src="https://github.com/anyways-open/cycling-routeplanner/raw/master/docs/screenshots/screenshot07.png" width="200"/> <img src="https://github.com/anyways-open/cycling-routeplanner/raw/master/docs/screenshots/screenshot09.png" width="200"/> <img src="https://github.com/anyways-open/cycling-routeplanner/raw/master/docs/screenshots/screenshot10.png" width="200"/>  <img src="https://github.com/anyways-open/cycling-routeplanner/raw/master/docs/screenshots/screenshot11.png" width="600"/> 

## Branding the website

To brand the website:

1) Go to '/branding/' and copy the 'anyways'-directory, rename onto your brand
2) Pick colours in 'theme.css'
3) Pick texts and icons in 'brandedScripts'. 'profileConfigs' describe what profiles are used for routeplanning and what accompagniying texts they have, with layers and stuff
4) Additional code can be put into 'applyBrand()'. This is extra code, e.g. rendering specific legend entries
5) Go to index.html and change around ten lines in '<head>', between the comments '<!-- start of branding-->' and '<!-- end of branding-->'. That should be enough

Caveats/todo's:

- Allow marker colours to be changed
- Allow text input to be changed
