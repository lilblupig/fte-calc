// Placeholder pay scale information
const rOneGrades = ["A", "B", "C", "D", "E", "F"];
const rTwoGrades = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const rOneSCPs = {
    "A": [1, 2, 3],
    "B": [2, 3],
    "C": [3, 4],
    "D": [4, 5, 6],
    "E": [5, 6],
    "F": [6, 7]
};
const rTwoSCPs = {
    "1": [1, 2],
    "2": [2, 3],
    "3": [3, 4],
    "4": [4, 5],
    "5": [5, 6, 7],
    "6": [7, 8, 9],
    "7": [8, 9, 10],
    "8": [9, 11],
    "9": [11, 12]
};

const rOneScales = {
    "1": 17800.50,
    "2": 18100.99,
    "3": 18500,
    "4": 18900,
    "5": 19300,
    "6": 19600,
    "7": 20000
};
const rTwoScales = {
    "1": 18800,
    "2": 19100,
    "3": 19500,
    "4": 19900,
    "5": 20300,
    "6": 20600,
    "7": 21000,
    "8": 21400,
    "9": 21900,
    "11": 22700,
    "12": 22100
};

const rOneHolidaysL5 = {
    "38": 5.6,
    "39": 5.65,
    "40": 5.8,
    "41": 5.94,
    "42": 6.09,
    "43": 6.23,
    "44": 6.38
};
const rOneHolidaysM5 = {
    "38": 6.48,
    "39": 6.65,
    "40": 6.83,
    "41": 6.99,
    "42": 7.17,
    "43": 7.33,
    "44": 7.51
};

const rTwoHolidaysL5L8 = {
    "38": 5.6,
    "39": 5.65,
    "40": 5.8,
    "41": 5.94,
    "42": 6.09,
    "43": 6.23,
    "44": 6.38
};
const rTwoHolidaysM5L8 = {
    "38": 6.09,
    "39": 6.25,
    "40": 6.41,
    "41": 6.57,
    "42": 6.73,
    "43": 6.89,
    "44": 7.05
};
const rTwoHolidaysL5M8 = {
    "38": 6.48,
    "39": 6.65,
    "40": 6.83,
    "41": 6.99,
    "42": 7.17,
    "43": 7.33,
    "44": 7.51
};
const rTwoHolidaysM5M8 = {
    "38": 7.09,
    "39": 7.28,
    "40": 7.46,
    "41": 7.65,
    "42": 7.84,
    "43": 8.02,
    "44": 8.21
};

// Get elements needed globally
const buttons = document.querySelectorAll(".c-btn"); // Get all elements with the class 'c-btn'
const hoursBox = document.getElementById("hours-box"); // Get the hours worked input box
const fteCheck = document.getElementById("fte-check"); // Get the FTE salary display
const hourlyCheck = document.getElementById("hourly-check"); // Get the hourly rate display

// Store the currently selected options
let chosenRegion;
let chosenGrade;
let chosenSCP;
let chosenSalary;
let chosenService;
let chosenWeeks;
let chosenHours;
let paidWeeks;

// Region click event handler
function addGradeBtns() {

    // Clear any existing data from Grade bucket
    let clearBtns = document.getElementById("grade-bucket");
    clearBtns.innerHTML = "";
    chosenGrade = "";
    // Clear any previously produced SCP buttons from bucket
    let clearSCP = document.getElementById("scp-bucket");
    clearSCP.innerHTML = "";
    chosenSCP = "";
    // Clear any previously displayed FTE/hours checks
    fteCheck.innerHTML = "0.00";
    hourlyCheck.innerHTML = "0.00";
    // Clear selected service length
    chosenService = 0;
    $(".service-btn").removeClass('selected-btn');
    // Clear any selected weeks
    chosenWeeks = 0;
    $(".weeks-btn").removeClass('selected-btn');

    // Determine region and get all associated grades as array
    let regionGrades;
    if (chosenRegion == "rOne") {
        regionGrades = rOneGrades;
    } else if (chosenRegion == "rTwo") {
        regionGrades = rTwoGrades;
    } else {
        console.log("Unknown Region passed to addGradeBtns");
        alert("An unknown Region variable has been passed to the calculator while adding grade buttons.")
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

// Grade click event handler
function addSCPBtns() {
    // Clear any existing data from SCP bucket
    let clearBtns = document.getElementById("scp-bucket"); 
    clearBtns.innerHTML = "";
    chosenSCP = "";
    // Clear any previously displayed FTE/hours checks
    fteCheck.innerHTML = "0.00";
    hourlyCheck.innerHTML = "0.00";
    // Clear selected service length
    chosenService = 0;
    $(".service-btn").removeClass('selected-btn');
    // Clear any selected weeks
    chosenWeeks = 0;
    $(".weeks-btn").removeClass('selected-btn');

    // Determine region and get all SCPs associated with chosen grade as array
    let gradeSCPs;
    if (chosenRegion == "rOne") {
        gradeSCPs = rOneSCPs[chosenGrade]; 
    } else if (chosenRegion == "rTwo") {
        gradeSCPs = rTwoSCPs[chosenGrade];
    } else {
        console.log("Unknown Region passed to addSCPbtns");
        alert("An unknown Region variable has been passed to the calculator while adding SCP buttons.")
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

// SCP click event handler
function makeFTEChecks() {
    // Clear any selected weeks
    chosenWeeks = 0;
    $(".weeks-btn").removeClass('selected-btn');
    // Clear selected service length
    chosenService = 0;
    $(".service-btn").removeClass('selected-btn');

    // Determine region and get salary for selected SCP
    if (chosenRegion == "rOne") {
        chosenSalary = rOneScales[chosenSCP];
    } else if (chosenRegion == "rTwo") {
        chosenSalary = rTwoScales[chosenSCP];
    } else {
        console.log("Unknown Region passed to SCP click listener");
        alert("An unknown Region variable has been passed to the calculator while selecting salary.")
    };
    
    // Log chosen SCP & related salary to console
    console.log("SCP", chosenSCP);
    console.log("Chosen salary", chosenSalary);
    
    // Populate FTE/hourly rate check
    fteCheck.innerHTML = chosenSalary.toFixed(2);
    hourlyCheck.innerHTML = (chosenSalary / 52.14 / 37).toFixed(2);
};

// Weeks click event handler
function weeksCalc() {
    if (chosenRegion === "rOne" && chosenService === "Less than 5 years") {
        paidWeeks = Math.round((chosenWeeks + rOneHolidaysL5[chosenWeeks] + Number.EPSILON) * 100) / 100;
    } else if (chosenRegion === "rOne" && chosenService === "5 years or more") {
        paidWeeks = Math.round((chosenWeeks + rOneHolidaysM5[chosenWeeks] + Number.EPSILON) * 100) / 100;
    } else if (chosenGrade < 8 && chosenRegion === "rTwo" && chosenService === "Less than 5 years") {
        paidWeeks = Math.round((chosenWeeks + rTwoHolidaysL5L8[chosenWeeks] + Number.EPSILON) * 100) / 100;
    } else if (chosenGrade < 8 && chosenRegion === "rTwo" && chosenService === "5 years or more") {
        paidWeeks = Math.round((chosenWeeks + rTwoHolidaysM5L8[chosenWeeks] + Number.EPSILON) * 100) / 100;
    } else if (chosenGrade >= 8 && chosenRegion === "rTwo" && chosenService === "Less than 5 years") {
        paidWeeks = Math.round((chosenWeeks + rTwoHolidaysL5M8[chosenWeeks] + Number.EPSILON) * 100) / 100;
    } else if (chosenGrade >= 8 && chosenRegion === "rTwo" && chosenService === "5 years or more") {
        paidWeeks = Math.round((chosenWeeks + rTwoHolidaysM5M8[chosenWeeks] + Number.EPSILON) * 100) / 100;
    } else {
        console.log("No idea what's going on");
    }
    console.log("Paid weeks", paidWeeks);
};

// Hours keydown event handler - GET RESULTS
function getResults() {
    let weeksFTE = paidWeeks / 52.1428;
    let hoursFTE = chosenHours / 37;
    let FTE = Math.round((weeksFTE * hoursFTE + Number.EPSILON) * 10000) / 10000;
    console.log("Weeks FTE", weeksFTE);
    console.log("Hours FTE", hoursFTE);
    console.log("FTE", FTE);

    document.getElementById("result-grade").innerHTML = chosenGrade + chosenSCP;
    document.getElementById("result-fte").innerHTML = FTE;
    document.getElementById("result-salary").innerHTML = Math.round((chosenSalary * FTE +Number.EPSILON) * 100) / 100;
    document.getElementById("result-rate").innerHTML = (chosenSalary / 52.14 / 37).toFixed(2);
    document.getElementById("result-pension").innerHTML = "To Do";
    document.getElementById("weeks-total").innerHTML = paidWeeks;
    document.getElementById("weeks-working").innerHTML = chosenWeeks;
    document.getElementById("weeks-holiday").innerHTML = Math.round((paidWeeks - chosenWeeks + Number.EPSILON) * 100) / 100;
    document.getElementById("week-hours").innerHTML = chosenHours;
};

// Event listener for all hard-coded calculator button clicks
buttons.forEach(function(button){
    button.addEventListener("click", function(event) {
        let classes = event.currentTarget.classList;
        // Update global variable with chosen region
        if(classes.contains("region-btn")) {
            if (this.id === "region-btn-1") {
                chosenRegion = "rOne";
            } else if (this.id === "region-btn-2") {
                chosenRegion = "rTwo";
            } else {
                console.log("Unknown Region passed to main event listener")
                alert("An unknown Region variable has been passed to the calculator.")
            };
            // Populate the grade bucket with buttons
            addGradeBtns();
        } else if (classes.contains("service-btn")) {
            chosenService = this.innerHTML;
            // Clear any selected weeks
            chosenWeeks = 0;
            $(".weeks-btn").removeClass('selected-btn');
            console.log("Service length", this.innerHTML);
        } else if (classes.contains("weeks-btn")) {
            chosenWeeks = Number(this.innerHTML);
            weeksCalc();
        } else {
            console.log("Unknown button type passed to calculator");
            alert("A button of unknown type has been passed to the calculator.")
        };

        $(this).siblings().removeClass('selected-btn');
        $(this).addClass('selected-btn');
    })
});

// Event listener for generated Grade button clicks
$('#grade-bucket').on('click', 'button', function (){
    // Clear any previous selection and highlight selected item
    $(this).siblings().removeClass('selected-btn');
    $(this).addClass('selected-btn');

    // Update global variable with chosen grade
    chosenGrade = this.innerHTML;

    // Generate the relevant SCP buttons
    addSCPBtns();
});

// Event listener for generated SCP button clicks
$('#scp-bucket').on('click', 'button', function(){
    chosenSCP = this.innerHTML;

    // Clear any previous selection and highlight selected item
    $(this).siblings().removeClass('selected-btn');
    $(this).addClass('selected-btn');

    makeFTEChecks();
});

// Event listener for hard-coded keystrokes
hoursBox.addEventListener("input", hoursInput);
function hoursInput() {
    chosenHours = hoursBox.value
    console.log(chosenHours);

    getResults();
};