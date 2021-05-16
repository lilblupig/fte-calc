/*
Collapse/expand About section on click (not enter)
*/
$(".about-toggle").click(function(event) {
    // Check if section is currently displayed and designate state accordingly
    if ($("#about-fte-calc").is(":hidden")) {
        state = "on";
    } else {
        state = "off";        
    };

    // Switch the icon for the section toggler
    $("#about-button").children("span").css("background-image", `url('assets/images/${state}.svg')`);
    // Show/hide the section
    $("#about-fte-calc").slideToggle();

    // If section is currently visible, on click prevent scroll to newly hidden section
    if (state === "off") {
        event.preventDefault();
    } else {
        $("html, body").animate({scrollTop: $("#about-fte-calc").offset().top -50});
    };
});

/*
Collapse/expand More Info section
*/
$(".info-toggle").click(function(event) {
    if ($("#more-info").is(":hidden")) {
        state = "on";
    } else {
        state = "off";        
    };

    // Switch the icon for the section toggler
        $("#info-button").children("span").css("background-image", `url('assets/images/${state}.svg')`);
    // Show/hide the section
        $("#more-info").slideToggle();

    // If section is currently hidden, on click, scroll to newly displayed section
    if (state === "off") {
        event.preventDefault();
    } else {
        $("html, body").animate({scrollTop: $("#more-info").offset().top -50});
    };
});