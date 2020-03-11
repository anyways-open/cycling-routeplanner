/*
 * All the handling of the sidebar
 * - Showing/Hiding
 * - Highlighting the selected profile
 */
function toggleSidebar(){
    var isClosed = sidebarIsClosed();
    if(isClosed){
        openSidebar();
    }else{
        closeSidebar();
    }
    updateUrlParams();
   
}

function sidebarIsClosed() {
    var container = $("#sidebar-right-container");
    return container.hasClass("hidden-sidebar");
}

/**
 * Closes the sidebar visible/invisible
 */
function closeSidebar() {
    var container = $("#sidebar-right-container");

    container.addClass('hidden-sidebar');
    
    var bar = $("#content-pane");
    bar.removeClass('col-lg-9');
    bar.addClass('col-lg-12');

    var mobileButtons = $(".mobile-buttons");
    mobileButtons.removeClass('hidden');

    var buttons = document.getElementsByClassName("sidebar-toggle-button");
    for(var i in buttons){
        if (buttons[i] &&
            buttons[i].classList) {
            buttons[i].classList.remove('sidebar-toggle-button-close');
        }
    }
    state.sideBarIsOpen = false;
}

/**
 * Opens the sidebar.
 */
function openSidebar() {
    var container = $("#sidebar-right-container");
    container.removeClass('hidden-sidebar');
    
    var bar = $("#content-pane");
    bar.removeClass('col-lg-12');
    bar.addClass('col-lg-9');

    var mobileButtons = $(".mobile-buttons");
    mobileButtons.addClass('hidden');
    
    var buttons = document.getElementsByClassName("sidebar-toggle-button");
    for(var i in buttons){
        if (buttons[i] &&
            buttons[i].classList) {
            buttons[i].classList.add('sidebar-toggle-button-close');
        }
    }
    state.sideBarIsOpen = true;
}


/**
 * Select a profile with the given button id 9 + updates the url parameters
 * Called from the HTML it
 * @param id
 */
function sidebarDisplayProfileHtmlId(profile) {
    sidebarDisplayProfile(profile);
    updateUrlParams();
}

/**
 * Select the profile
 * @param profile
 */
function sidebarDisplayProfile(profile) {
    
    for(var k in profileButtonIds){
        // Reset all buttons to the default style
        var kprofile = profileButtonIds[k];
        var buttons = document.getElementsByClassName(kprofile+"-button");
        for(var i = 0; i < buttons.length; i++){
            var btn = buttons[i];
            btn.classList.remove("profile-selection-button-active");
            btn.classList.add("profile-selection-button-non-active");
        }
    }
    var profileButtons = document.getElementsByClassName(profile+"-button");
    for(var j = 0; j < profileButtons.length; j++){
        var pbtn = profileButtons[j];
        pbtn.classList.remove("profile-selection-button-non-active");
        pbtn.classList.add("profile-selection-button-active");
    }

    selectedProfile = profile;
    $(".route-instructions").addClass("height-zero");
    $(".profile-summary").addClass("height-zero");
    $("#sidebar-top>span").removeClass("active");
    $("#top-overlay-profile-buttons-mobile>span").removeClass("active");
    
    let profileButtonId = Object.keys(profileButtonIds).find(key => profileButtonIds[key] === profile);
   
    
    $(`#${profileButtonId}`).addClass("active");
    $(`#${profileButtonId}-mobile`).addClass("active");


    if (state.location1 && state.location2) {
        var profileDivId = profile+"-instruction";
        $(`#${profileDivId}`).removeClass("height-zero");
    } else {
        var summaryDivId = profile + "-summary";
        $(`#${summaryDivId}`).removeClass("height-zero");
    }

    showLayersForProfile(selectedProfile);
}

/* The branded script contains all the profiles, with texts and images.
 * This piece of javascript adjust the image sources and text to load the branded versions
 */
function loadBrandedTexts(){
    
    for(profile of availableProfiles){
        document.getElementById(profile+"-small-logo").src = getTerm(profileConfigs[profile].frontendLogo);
        document.getElementById(profile+"-small-logo-bottom").src = getTerm(profileConfigs[profile].frontendLogo);
        
        document.getElementById(profile+"-icon").src = getTerm(profileConfigs[profile].frontendLogo);
        
        document.getElementById(profile+"-button-text").innerHTML = getTerm(profileConfigs[profile].frontendName);
        document.getElementById(profile+"-button-text-bottom").innerHTML = getTerm(profileConfigs[profile].frontendName);
        document.getElementById(profile+"-subtitle").innerHTML = getTerm(profileConfigs[profile].frontendSubtitle);
        document.getElementById(profile+"-paragraph").innerHTML = getTerm(profileConfigs[profile].frontendExplanation);
    }
}
