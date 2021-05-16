/*
Get elements needed globally
*/

const buttons = document.querySelectorAll(".c-btn"); // Get all elements with the class 'c-btn'
const weeksBox = document.getElementById("weeks-box") // Get the weeks worked input box
const hoursBox = document.getElementById("hours-box"); // Get the hours worked input box
const fteCheck = document.getElementById("fte-check"); // Get the FTE salary display
const hourlyCheck = document.getElementById("hourly-check"); // Get the hourly rate display
const _fullTimeWeeks = 52.14; // Weeks in a full time year
const _fullTimeHours = 37;  // Hours in a full time week
const _minWeeks = 38; // Minimum number of working weeks
const _maxWeeks = 44; //Maximum number of working weeks

/*
Store the currently selected options in Global variables
*/
let chosenRegion;
let chosenGrade;
let chosenSCP;
let chosenSalary = 0;
let chosenService;
let chosenWeeks = 0;
let chosenHours;
let paidWeeks;
let actualSalary;
let pensionRate;
let regionMap;


/*
---------------Functions called by Event Handlers---------------
*/

/* The following clearXxx functions all reset the selections and variables for a step in the Calculator, called by multiple handlers */
// Clear any previously produced buttons from Grade bucket
function clearGrades() {
    let clearBtns = document.getElementById("grade-bucket");
    clearBtns.innerHTML = "";
    chosenGrade = "";
    regionMap = "";
};

// Clear any previously produced buttons from SCP bucket
function clearSCPs() {
    let clearSCP = document.getElementById("scp-bucket");
    clearSCP.innerHTML = "";
    chosenSCP = "";
    chosenSalary = 0;
};

// Clear any previously displayed FTE/hours checks
function clearFTE() {
    fteCheck.innerHTML = "0.00";
    hourlyCheck.innerHTML = "0.00";
};

// Clear selected service length
function clearService() {
    chosenService = "";
    $(".service-btn").removeClass('selected-btn');
};

// Clear any selected weeks
function clearWeeks() {
    weeksBox.value = "";
    chosenWeeks = "";
    $(".weeks-btn").removeClass('selected-btn');
};

// Clear any entered hours
function clearHours() {
    hoursBox.value = "";
    chosenHours = 0;
};

/* Clears any results posted to Results field on page, called by most handlers */
function resetResults() {
    document.getElementById("result-grade").innerHTML = "" + "-" + "";
    document.getElementById("result-fte").innerHTML = "0.0000";
    document.getElementById("result-salary").innerHTML = "£0.00";
    document.getElementById("result-rate").innerHTML = "£0.00";
    document.getElementById("result-pension").innerHTML = "0.0%";
    document.getElementById("weeks-total").innerHTML = "0.00";
    document.getElementById("weeks-working").innerHTML = "0.00";
    document.getElementById("weeks-holiday").innerHTML = "0.00";
    document.getElementById("week-hours").innerHTML = "0";
};

/* Preliminary to step 6: Pension band calculator for use in getResults function
    Uses Actual Salary calculated in Step 6 to find the appropriate pension band
    Assigns Pension Band value to Global variables for use later
    */
function pensionCalc() {
    if (actualSalary < pensionBands[0]["end"]) {
        pensionRate = pensionBands[0]["rate"];
    } else if (actualSalary > pensionBands[pensionBands.length-2]["end"]) {
        pensionRate = pensionBands[pensionBands.length-1]["rate"];
    } else {
        for (let i = 0; i < pensionBands.length - 1; i++) {
            if (pensionBands[i]["end"] < actualSalary && actualSalary <= pensionBands[i + 1]["end"]) {
                pensionRate = pensionBands[i + 1]["rate"];
            };
        };
    };
};


/*
---------------Functions called by Event Listeners---------------
*/

/* Step 1: Region click event handler
    Clears any selections made in following steps and resets all global variables to zero or ""
    Resets Results field
    Gets Grade information relating to chosen Region and populates the Grade bucket with buttons
    Assigns the appropriate Region to the map variable, to ensure the map shows the right area
    */
function regionClick() {
    // Clear previous data
    clearGrades();
    clearSCPs();
    clearFTE();
    clearService();
    clearWeeks();
    clearHours();
    resetResults();

    // Determine region and get all associated grades as array, activate map polygon
    let regionGrades;
    try {
        if (chosenRegion == "rOne") {
            regionGrades = rOneGrades;
            regionMap = bournemouthMap;
            initMap()
        } else if (chosenRegion == "rTwo") {
            regionGrades = rTwoGrades;
            regionMap = bristolMap;
            initMap()
        } else {
            // If neither condition is satisfied, handle the error
            console.log("Unknown Region passed to regionClick event handler");
            alert("An unknown Region variable has been passed to the calculator while executing the Region click function, please try again. If this error persists, please Contact Us for support.");
        };
    } 
    // Catch unforeseen errors
    catch (error) {
        console.log("Unknown error on regionClick event handler");
        alert("An unknown error has occured on Region event handler, please try again. If this error persists, please Contact Us for support.");
    };

    // Produce HTML elements for buttons and append to parent
    for (let i = 0; i < regionGrades.length; i++) {
        let newBtn = document.createElement("button");
        newBtn.innerHTML = regionGrades[i];
        newBtn.classList.add("btn", "disc-btn", "grade-btn");
    
        let gradeBucket = document.getElementById("grade-bucket");
        gradeBucket.appendChild(newBtn);
    };

    // Log chosen region to console
    console.log("Calculating FTE for", chosenRegion);
};

/* Step 2: Grade click event handler
    Clears any selected items from Calculator after Grade bucket and resets associated global variables to zero or ""
    Region and Grade buttons, and the associated values remain as selected
    Assigns selected Grade value to Global variable for use later
    Gets Spinal Column Point information relating to chosen Region and Grade and populates the SCP bucket with buttons
    */
function gradeClick() {
    // Clear previous data
    clearSCPs();
    clearFTE();
    clearService();
    clearWeeks();
    clearHours();
    resetResults();

    // Determine region and get all SCPs associated with chosen grade as array
    let gradeSCPs;
    try {
        if (chosenRegion == "rOne") {
            gradeSCPs = rOneSCPs[chosenGrade]; 
        } else if (chosenRegion == "rTwo") {
            gradeSCPs = rTwoSCPs[chosenGrade];
        } else {
            console.log("Unknown Region passed to gradeClick event handler, please try again. If this error persists, please Contact Us for support.");
            alert("An unknown Region variable has been passed to the calculator while executing the Grade click function, please try again. If this error persists, please Contact Us for support.");
        };
    }
    // Catch unforeseen errors
    catch(error) {
        console.log("Unknown error on gradeClick event handler");
        alert("An unknown error has occured on Grade event handler, please try again. If this error persists, please Contact Us for support.");
    };

    // Produce HTML elements for buttons and append to parent
    for (let i = 0; i < gradeSCPs.length; i++) {
        let newBtn = document.createElement("button");
        newBtn.innerHTML = gradeSCPs[i];
        newBtn.classList.add("btn", "disc-btn", "scp-btn");
    
        let gradeBucket = document.getElementById("scp-bucket");
        gradeBucket.appendChild(newBtn);
    };

    // Log chosen grade to console
    console.log("Grade", chosenGrade);
};

/* Step 3: SCP click event handler
    Clears any selected items from Calculator after SCP bucket and resets associated global variables to zero or ""
    Region, Grade and SCP buttons, and the associated values remain as selected
    Check Region and retrieve SCP salaries as appropriate
    Assigns selected SCP value and associated salary to Global variables for use later
    Populates the Full Time Equivalent check fields for user to ensure info is correct and timely
    */
function scpClick() {
    // Clear previous data
    clearService();
    clearWeeks();
    clearHours();
    resetResults();
    
    try{
        // Determine region and get salary for selected SCP
        if (chosenRegion == "rOne") {
            chosenSalary = rOneScales[chosenSCP];
        } else if (chosenRegion == "rTwo") {
            chosenSalary = rTwoScales[chosenSCP];
        } else {
            console.log("Unknown Region passed to SCP click listener");
            alert("An unknown Region variable has been passed to the calculator while executing the SCP click function, please try again. If this error persists, please Contact Us for support.");
        };
    }
    // Catch unforeseen errors
    catch(error) {
        console.log("Unknown error on scpClick event handler");
        alert("An unknown error has occured on SCP event handler, please try again. If this error persists, please Contact Us for support.");
    };
    
    // Log chosen SCP & related salary to console
    console.log("SCP", chosenSCP);
    console.log("Chosen salary", chosenSalary);
    
    // Populate FTE/hourly rate check
    fteCheck.innerHTML = chosenSalary.toFixed(2);
    hourlyCheck.innerHTML = (chosenSalary / _fullTimeWeeks / _fullTimeHours).toFixed(2);
};

/* Step 4: Service Length click event handler
    Clears any selected items from Calculator after Service Length chooser and resets associated global variables to zero or ""
    Region, Grade, SCP and Service buttons, and the associated values remain as selected
    Checks that steps 1-3 have been completed, if not resets later fields and prompts user
    Assigns selected Service value to Global variables for use later
    */
function serviceClick() {
    // Clear previous data
    clearWeeks();
    clearHours();
    resetResults();

    // Error handling - Check steps 1-3 complete
    if (chosenSalary === 0 || chosenSalary === undefined) {
        alert("Please complete Steps 1-3 before selecting Service Length");
        // Clear selected service length
        chosenService = "";
        $(".service-btn").removeClass('selected-btn');
    };
    
    // Log chosen Service to the console
    console.log("Service length", chosenService);
};

/* Step 5: Weeks change event handler
    Clears any selected items from Calculator after Weeks entry and resets associated global variables to zero or ""
    Region, Grade, SCP, Service buttons and Weeks entry, and the associated values, remain as selected
    Checks that steps 1-4 have been completed, if not resets this and later fields, and prompts user in line with completed fields
    Checks that input is between 38 and 44 weeks, and if not prompts the user and clears the field
    If no errors, checks Region and Service selections and calculates Paid Weeks
    Assigns Paid Weeks value to Global variables for use later
    */
function enterWeeks() {
    // Clear previous data
    clearHours();
    resetResults();

    try{
        // Check steps 1-4 complete, if not prompts user and clears field
        if ((chosenService === undefined || chosenService === "") && (chosenSalary === 0 || chosenSalary === undefined)) {
            alert("Please complete fields 1-4 before inputting Working Weeks");
            clearWeeks()
        } else if (chosenService === undefined || chosenService === "") {
            alert("Please choose Service Length before inputting Working Weeks");
            clearWeeks()
        } else if (chosenSalary === 0 || chosenSalary === undefined) {
            alert("Please complete fields 1-3 before inputting Working Weeks");
            clearWeeks()
        }   
        // If steps 1-4 complete, undertake calculation for paid weeks
        // Region One only has two cases, more or less than 5 years
          else if (chosenRegion === "rOne" && chosenService === "Less than 5 years") {
            paidWeeks = Math.round(((chosenWeeks + chosenWeeks * holidays[0]["Holidays"]/holidays[0]["Working"]) + Number.EPSILON) * 100) / 100;
        } else if (chosenRegion === "rOne" && chosenService === "5 years or more") {
            paidWeeks = Math.round(((chosenWeeks + chosenWeeks * holidays[1]["Holidays"]/holidays[1]["Working"]) + Number.EPSILON) * 100) / 100;
        } 
          // Region 2 has four cases, more or less than 5 years, and more or less than Grade 8
          else if (chosenGrade < 8 && chosenRegion === "rTwo" && chosenService === "Less than 5 years") {
            paidWeeks = Math.round(((chosenWeeks + chosenWeeks * holidays[2]["Holidays"]/holidays[2]["Working"]) + Number.EPSILON) * 100) / 100;
        } else if (chosenGrade < 8 && chosenRegion === "rTwo" && chosenService === "5 years or more") {
        paidWeeks = Math.round(((chosenWeeks + chosenWeeks * holidays[3]["Holidays"]/holidays[3]["Working"]) + Number.EPSILON) * 100) / 100;
        } else if (chosenGrade >= 8 && chosenRegion === "rTwo" && chosenService === "Less than 5 years") {
            paidWeeks = Math.round(((chosenWeeks + chosenWeeks * holidays[4]["Holidays"]/holidays[4]["Working"]) + Number.EPSILON) * 100) / 100;
        } else if (chosenGrade >= 8 && chosenRegion === "rTwo" && chosenService === "5 years or more") {
            paidWeeks = Math.round(((chosenWeeks + chosenWeeks * holidays[5]["Holidays"]/holidays[5]["Working"]) + Number.EPSILON) * 100) / 100;
        } else {
            console.log("Invalid number of weeks entered during weeks input");
        };
    }
    // Catch unforeseen errors
    catch(error) {
        console.log("Unknown error on enterWeeks event handler");
        alert("An unknown error has occured on Weeks event handler, please try again. If this error persists, please Contact Us for support.");
    };

    // Ensure weeks entry falls between 38 and 44, if not, prompt user and clear field
    if (_minWeeks <= chosenWeeks && chosenWeeks <= _maxWeeks) {
        console.log("Paid weeks", paidWeeks);
    } else if (chosenWeeks == 0 || chosenWeeks == "") {
         console.log(chosenWeeks);
    } else {
        alert(`Please enter a value between ${_minWeeks} and ${_maxWeeks} weeks`);
        clearWeeks();
    };

    // Log chosen Weeks to the console
    console.log(chosenWeeks);
};

/*
Step 6: Hours keydown event handler - GET RESULTS
    Checks that steps 1-5 have been completed, if not resets the field and prompts user in line with completed fields
    Checks that input is less than 37 hours, and if not prompts the user and clears the field
    If no errors, calculates all remaining values, including Actual Salary
    Calls Pension Band finder function
    Assigns all appropriate values to the Results field
*/

function getResults() {
    try {
        // Check steps 1-5 complete, if not, prompt user per input information and reset field
        if ((chosenService === undefined || chosenService === "") && (chosenSalary === 0 || chosenSalary === undefined) && (chosenWeeks === 0 || chosenWeeks === undefined)) {
            alert("Please complete fields 1-5 before inputting Weekly Hours");
            clearHours();
        } else if ((chosenWeeks === undefined || chosenWeeks === 0) && (chosenService === undefined || chosenService === "")) {
            alert("Please choose Service Length and Working Weeks before inputting Weekly Hours");
            clearHours();
        } else if ((chosenWeeks === undefined || chosenWeeks === 0) && (chosenSalary === 0 || chosenSalary === undefined)) {
            alert("Please complete fields 1-3 and Working Weeks before inputting Weekly Hours");
            clearHours();
        } else if ((chosenSalary === 0 || chosenSalary === undefined) && (chosenService === undefined || chosenService === "")) {
            alert("Please complete fields 1-4 before inputting Weekly Hours");
            clearHours();
        } else if (chosenWeeks === undefined || chosenWeeks === 0) {
            alert("Please choose Working Weeks before inputting Weekly Hours");
            clearHours();
        } else if (chosenService === undefined || chosenService === "") {
            alert("Please choose Service Length before inputting Working Weeks");
            clearHours();
        } else if (chosenSalary === 0 || chosenSalary === undefined) {
            alert("Please complete fields 1-3 before inputting Working Weeks");
            clearHours();
        } else if (chosenHours > _fullTimeHours || chosenHours < 0) {
            alert(`Please enter an hours value between 0 and ${_fullTimeHours}`);
            clearHours();
        } else {
            // If no errors, calculate results
            let weeksFTE = paidWeeks / _fullTimeWeeks;
            let hoursFTE = chosenHours / _fullTimeHours;
            let FTE = Math.round((weeksFTE * hoursFTE + Number.EPSILON) * 10000) / 10000;
            actualSalary = Math.round((chosenSalary * FTE + Number.EPSILON) * 100) / 100;
            pensionCalc();
            console.log(chosenHours);
            console.log("Weeks FTE", weeksFTE);
            console.log("Hours FTE", hoursFTE);
            console.log("FTE", FTE);
            console.log("Actual Salary", actualSalary);
            console.log("Pension", pensionRate);

            // Post results to Results field on page
            document.getElementById("result-grade").innerHTML = chosenGrade + "-" + chosenSCP;
            document.getElementById("result-fte").innerHTML = FTE;
            document.getElementById("result-salary").innerHTML = "£" + actualSalary.toFixed(2);
            document.getElementById("result-rate").innerHTML = "£" + (chosenSalary / _fullTimeWeeks / _fullTimeHours).toFixed(2);
            document.getElementById("weeks-total").innerHTML = paidWeeks.toFixed(2);
            document.getElementById("weeks-working").innerHTML = chosenWeeks.toFixed(2);
            document.getElementById("weeks-holiday").innerHTML = Math.round((paidWeeks - chosenWeeks + Number.EPSILON) * 100) / 100;
            document.getElementById("week-hours").innerHTML = chosenHours;
            document.getElementById("result-pension").innerHTML = pensionRate + "%";
        };
    }
    // Catch unforeseen errors
    catch(error) {
        console.log("Unknown error on getResults event handler");
        alert("An unknown error has occured on Hours event handler, please try again. If this error persists, please Contact Us for support.");
    }; 
};


/*
---------------Event Listeners---------------
*/

/* Event listener for all hard-coded calculator button clicks, Step 1: Region and Step 4: Service
    Clears previous selections for Step using "this" to remove selected-btn class from all items in Step, adds selected-btn class to clicked item
    Checks button type, if Region, calls regionClick function (Step 1 above), if Service, calls serviceClick function (Step 4 above)
    */
buttons.forEach(function(button){
    button.addEventListener("click", function(event) {
        // Remove class indicating selection from all elements, add class to clicked item
        $(this).siblings().removeClass('selected-btn');
        $(this).addClass('selected-btn');
        
        // Create variable which lists all classes attached to the clicked item
        let classes = event.currentTarget.classList;

        try {
            // Use classes variable to determine button type
            if(classes.contains("region-btn")) {
            // Re STEP 1 - If Region button clicked, check which button, and assign region to chosenRegion variable
                if (this.id === "region-btn-1") {
                    chosenRegion = "rOne";
                } else if (this.id === "region-btn-2") {
                    chosenRegion = "rTwo";
                } else {
                    console.log("Unknown Region passed to main event listener")
                    alert("An unknown Region has been passed to the calculator, please request assistance.")
                };
                // Then, call the event handler
                regionClick();
            }

            // Re STEP 4 - If not Region button, check if Service button, and assign to chosenService variable
            else if (classes.contains("service-btn")) {
                chosenService = this.innerHTML;
                // Then, call the event handler
                serviceClick();
            }
            // If neither condition is satisfied, handle the error
            else {
                console.log("Unknown button type passed to calculator");
                alert("A button of unknown type has been passed to the calculator, please try again. If this error persists, please Contact Us for support.")
            };
        }
        // Catch unforeseen errors
        catch(error) {
            console.log("Unknown error on html button click listener");
            alert("An unknown error has occured on click listener, please try again. If this error persists, please Contact Us for support.")
        };
    })
});

/* Event listener for generated Grade button clicks, Step 2: Grade
    Clears previous selections for Step using "this" to remove selected-btn class from all items in Step, adds selected-btn class to clicked item
    Calls gradeClick function (Step 2 above)
    */
$('#grade-bucket').on('click', 'button', function (){
    // Remove class indicating selection from all elements, add class to clicked item
    $(this).siblings().removeClass('selected-btn');
    $(this).addClass('selected-btn');

    // Update global variable with chosen grade
    chosenGrade = this.innerHTML;

    // Call the event handler
    gradeClick();
});

/* Event listener for generated SCP button clicks, Step 3: SCP
    Clears previous selections for Step using "this" to remove selected-btn class from all items in Step, adds selected-btn class to clicked item
    Calls scpClick function (Step 3 above)
    */
$('#scp-bucket').on('click', 'button', function(){
    // Remove class indicating selection from all elements, add class to clicked item
    $(this).siblings().removeClass('selected-btn');
    $(this).addClass('selected-btn');

    // Update global variable with chosen grade
    chosenSCP = this.innerHTML;

    // Call the event handler
    scpClick();
});

/* Event listener for weeks keystrokes, Step 5: Weeks
    Gets the value entered in the Weeks box, and assigns it to a Global variable when the user moves out of the field
    Calls enterWeeks function (Step 5 above)
    */
weeksBox.addEventListener("change", weeksInput);
function weeksInput() {
    // Get user input on leaving field
    chosenWeeks = Number(weeksBox.value);
    
    // Call the event handler
    enterWeeks();
};

/* Event listener for hours input, Step 6: Hours
    Gets the value entered in the Hours box, and assigns it to a Global variable on every change
    Calls getResults function (Step 6 above) and updates the Results field on every keystroke
    */
hoursBox.addEventListener("input", hoursInput);
function hoursInput() {
    // Get user input on keydown
    chosenHours = hoursBox.value

    // Call the event handler
    getResults();
};