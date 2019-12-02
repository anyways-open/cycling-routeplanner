# Cycling Route Planner Frontend

This is a generic, unbranded version of a route planner for cyclists, which can be rebranded for your city or organisation.
Actual routeplanning is done by a backend server.


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
