/*
On window load, go to local storage and see if About or More Info sections were hidden
    If they were, hide them and change the toggle icon to off position
*/
window.onload = getToggle();  // On load, call the check function

function getToggle() {
    // Check if About section was hidden, and if so, hide and change toggle
    if (localStorage["#about-fte-calc"] == ":hidden") {
        $("#about-fte-calc").hide();
        $("#about-button").children("span").css("background-image", `url('assets/images/off.svg')`);
    }

    // Check if More section was hidden, and if so, hide and change toggle
    if (localStorage["#more-info"] == ":hidden") {
        $("#more-info").hide();
        $("#info-button").children("span").css("background-image", `url('assets/images/off.svg')`);
    }
}

/*
Collapse/expand About section on click
*/
$(".about-toggle").click(function(event) {
    // Check if section is currently displayed and designate state accordingly
    let state = "on"; // Default state
    if ($("#about-fte-calc").is(":hidden")) {
        state = "on";
        localStorage.removeItem("#about-fte-calc");
        console.log(localStorage["#about-fte-calc"]);
    } else {
        state = "off";
        localStorage.setItem("#about-fte-calc", ":hidden");
        console.log(localStorage["#about-fte-calc"]);
    }

    // Switch the icon for the section toggler
    $("#about-button").children("span").css("background-image", `url('assets/images/${state}.svg')`);
    // Show/hide the section
    $("#about-fte-calc").slideToggle();

    // If section is currently visible, on click prevent scroll to newly hidden section
    if (state === "off") {
        event.preventDefault();
    } else {
        $("html, body").animate({scrollTop: $("#about-fte-calc").offset().top -50});
    }
});

/*
Collapse/expand More Info section on click
*/
$(".info-toggle").click(function(event) {
    let state = "on"; // Default state
    if ($("#more-info").is(":hidden")) {
        state = "on";
        localStorage.removeItem("#more-info");
        console.log(localStorage["#more-info"]);
    } else {
        state = "off";
        localStorage.setItem("#more-info", ":hidden");
        console.log(localStorage["#more-info"]);
    }

    // Switch the icon for the section toggler
        $("#info-button").children("span").css("background-image", `url('assets/images/${state}.svg')`);
    // Show/hide the section
        $("#more-info").slideToggle();

    // If section is currently visible, on click prevent scroll to newly hidden section
    if (state === "off") {
        event.preventDefault();
    } else {
        $("html, body").animate({scrollTop: $("#more-info").offset().top -50});
    }
});