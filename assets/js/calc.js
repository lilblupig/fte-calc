// Get elements needed globally
const buttons = document.querySelectorAll(".c-btn"); // Get all elements with the class 'c-btn'
const weeksBox = document.getElementById("weeks-box") // Get the weeks worked input box
const hoursBox = document.getElementById("hours-box"); // Get the hours worked input box
const fteCheck = document.getElementById("fte-check"); // Get the FTE salary display
const hourlyCheck = document.getElementById("hourly-check"); // Get the hourly rate display

// Store the currently selected options
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

// Region click event handler
function addGradeBtns() {

    // Clear any existing data from Grade bucket
    let clearBtns = document.getElementById("grade-bucket");
    clearBtns.innerHTML = "";
    chosenGrade = "";
    regionMap = "";
    // Clear any previously produced SCP buttons from bucket
    let clearSCP = document.getElementById("scp-bucket");
    clearSCP.innerHTML = "";
    chosenSCP = "";
    chosenSalary = 0;
    // Clear any previously displayed FTE/hours checks
    fteCheck.innerHTML = "0.00";
    hourlyCheck.innerHTML = "0.00";
    // Clear selected service length
    chosenService = "";
    $(".service-btn").removeClass('selected-btn');
    // Clear any selected weeks
    weeksBox.value = "";
    chosenWeeks = 0;
    $(".weeks-btn").removeClass('selected-btn');
    // Clear any entered hours
    hoursBox.value = "";
    chosenHours = 0;

    // Determine region and get all associated grades as array
    let regionGrades;
    if (chosenRegion == "rOne") {
        regionGrades = rOneGrades;
        regionMap = bournemouthMap;
        initMap()
    } else if (chosenRegion == "rTwo") {
        regionGrades = rTwoGrades;
        regionMap = bristolMap;
        initMap()
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
    chosenSalary = 0;
    // Clear any previously displayed FTE/hours checks
    fteCheck.innerHTML = "0.00";
    hourlyCheck.innerHTML = "0.00";
    // Clear selected service length
    chosenService = "";
    $(".service-btn").removeClass('selected-btn');
    // Clear any selected weeks
    weeksBox.value = "";
    chosenWeeks = 0;
    $(".weeks-btn").removeClass('selected-btn');
    // Clear any entered hours
    hoursBox.value = "";
    chosenHours = 0;

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
    // Clear selected service length
    chosenService = "";
    $(".service-btn").removeClass('selected-btn');
    // Clear any selected weeks
    weeksBox.value = "";
    chosenWeeks = 0;
    // Clear any entered hours
    hoursBox.value = "";
    chosenHours = 0;

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

// Service Length click event handler
function selectService() {
    // Clear any selected weeks
    weeksBox.value = "";
    chosenWeeks = 0;
    // Clear any entered hours
    hoursBox.value = "";
    chosenHours = 0;

    // Check steps 1-3 complete
    if (chosenSalary === 0 || chosenSalary === undefined) {
        alert("Please complete fields 1-3 before selecting Service Length");
        // Clear selected service length
        chosenService = "";
        $(".service-btn").removeClass('selected-btn');
    };
};

// Weeks change event handler
function calculateWeeks() {
    // Check steps 1-4 complete
    if ((chosenService === undefined || chosenService === "") && (chosenSalary === 0 || chosenSalary === undefined)) {
        alert("Please complete fields 1-4 before inputting Working Weeks");
        weeksBox.value = "";
        chosenWeeks = 0;
        paidWeeks = 0;
    } else if (chosenService === undefined || chosenService === "") {
        alert("Please choose Service Length before inputting Working Weeks");
        weeksBox.value = "";
        chosenWeeks = 0;
        paidWeeks = 0;
    } else if (chosenSalary === 0 || chosenSalary === undefined) {
        alert("Please complete fields 1-3 before inputting Working Weeks");
        weeksBox.value = "";
        chosenWeeks = 0;
        paidWeeks = 0;
    }   
        // Undertake calculation for paid weeks
        else if (chosenRegion === "rOne" && chosenService === "Less than 5 years") {
        paidWeeks = Math.round(((chosenWeeks + chosenWeeks * 6.6/45.54) + Number.EPSILON) * 100) / 100;
    } else if (chosenRegion === "rOne" && chosenService === "5 years or more") {
        paidWeeks = Math.round(((chosenWeeks + chosenWeeks * 7.6/44.54) + Number.EPSILON) * 100) / 100;
    } else if (chosenGrade < 8 && chosenRegion === "rTwo" && chosenService === "Less than 5 years") {
        paidWeeks = Math.round(((chosenWeeks + chosenWeeks * 6.6/45.54) + Number.EPSILON) * 100) / 100;
    } else if (chosenGrade < 8 && chosenRegion === "rTwo" && chosenService === "5 years or more") {
        paidWeeks = Math.round(((chosenWeeks + chosenWeeks * 7.2/44.94) + Number.EPSILON) * 100) / 100;
    } else if (chosenGrade >= 8 && chosenRegion === "rTwo" && chosenService === "Less than 5 years") {
        paidWeeks = Math.round(((chosenWeeks + chosenWeeks * 7.6/44.54) + Number.EPSILON) * 100) / 100;
    } else if (chosenGrade >= 8 && chosenRegion === "rTwo" && chosenService === "5 years or more") {
        paidWeeks = Math.round(((chosenWeeks + chosenWeeks * 8.2/43.94) + Number.EPSILON) * 100) / 100;
    } else {
        console.log("Invalid number of weeks entered during weeks input");
    };

    // Ensure weeks entry falls between 38 and 44
    if (38 <= chosenWeeks && chosenWeeks <= 44) {
        console.log("Paid weeks", paidWeeks);
    } else {
        alert("Please enter a value between 38 and 44 weeks");
        weeksBox.value = "";
        chosenHours = 0;
        paidWeeks = 0;
    };

    // Clear any entered hours
    hoursBox.value = "";
    chosenHours = 0;
};

// Pension band calculator for use in getResults function
function pensionCalc() {
    if (actualSalary < pensionBands[0]["end"]) {
        pensionRate = pensionBands[0]["rate"];
    } else if (pensionBands[0]["end"] < actualSalary && actualSalary < pensionBands[1]["end"]) {
        pensionRate = pensionBands[1]["rate"];
    } else if (pensionBands[1]["end"] < actualSalary && actualSalary < pensionBands[2]["end"]) {
        pensionRate = pensionBands[2]["rate"];
    } else if (pensionBands[2]["end"] < actualSalary && actualSalary < pensionBands[3]["end"]) {
        pensionRate = pensionBands[3]["rate"];
    } else if (pensionBands[3]["end"] < actualSalary && actualSalary < pensionBands[4]["end"]) {
        pensionRate = pensionBands[4]["rate"];
    } else if (pensionBands[4]["end"] < actualSalary && actualSalary < pensionBands[5]["end"]) {
        pensionRate = pensionBands[5]["rate"];
    } else if (pensionBands[5]["end"] < actualSalary && actualSalary < pensionBands[6]["end"]) {
        pensionRate = pensionBands[6]["rate"];
    } else if (pensionBands[6]["end"] < actualSalary && actualSalary < pensionBands[7]["end"]) {
        pensionRate = pensionBands[7]["rate"];
    } else {
        pensionRate = pensionBands[8]["rate"];
    };
};

// Hours keydown event handler - GET RESULTS
function getResults() {
    // Check steps 1-5 complete
    if ((chosenService === undefined || chosenService === "") && (chosenSalary === 0 || chosenSalary === undefined) && (chosenWeeks === 0 || chosenWeeks === undefined)) {
        alert("Please complete fields 1-5 before inputting Weekly Hours");
        hoursBox.value = "";
        chosenHours = 0;
    } else if ((chosenWeeks === undefined || chosenWeeks === 0) && (chosenService === undefined || chosenService === "")) {
        alert("Please choose Service Length and Working Weeks before inputting Weekly Hours");
        hoursBox.value = "";
        chosenHours = 0;
    } else if ((chosenWeeks === undefined || chosenWeeks === 0) && (chosenSalary === 0 || chosenSalary === undefined)) {
        alert("Please complete fields 1-3 and Working Weeks before inputting Weekly Hours");
        hoursBox.value = "";
        chosenHours = 0;
    } else if ((chosenSalary === 0 || chosenSalary === undefined) && (chosenService === undefined || chosenService === "")) {
        alert("Please complete fields 1-4 before inputting Weekly Hours");
        hoursBox.value = "";
        chosenHours = 0;
    } else if (chosenWeeks === undefined || chosenWeeks === 0) {
        alert("Please choose Working Weeks before inputting Weekly Hours");
        hoursBox.value = "";
        chosenHours = 0;
    } else if (chosenService === undefined || chosenService === "") {
        alert("Please choose Service Length before inputting Working Weeks");
        hoursBox.value = "";
        chosenHours = 0;
    } else if (chosenSalary === 0 || chosenSalary === undefined) {
        alert("Please complete fields 1-3 before inputting Working Weeks");
        hoursBox.value = "";
        chosenHours = 0;
    } else if (chosenHours > 37) {
        alert("Please enter an hours value of 37 or less");
        hoursBox.value = "";
        chosenHours = 0;
    } else {
        let weeksFTE = paidWeeks / 52.1428;
        let hoursFTE = chosenHours / 37;
        let FTE = Math.round((weeksFTE * hoursFTE + Number.EPSILON) * 10000) / 10000;
        actualSalary = Math.round((chosenSalary * FTE + Number.EPSILON) * 100) / 100;
        console.log("Weeks FTE", weeksFTE);
        console.log("Hours FTE", hoursFTE);
        console.log("FTE", FTE);
        console.log("Actual Salary", actualSalary);

        document.getElementById("result-grade").innerHTML = chosenGrade + "-" + chosenSCP;
        document.getElementById("result-fte").innerHTML = FTE;
        document.getElementById("result-salary").innerHTML = "£" + actualSalary.toFixed(2);
        document.getElementById("result-rate").innerHTML = "£" + (chosenSalary / 52.14 / 37).toFixed(2);
        document.getElementById("weeks-total").innerHTML = paidWeeks.toFixed(2);
        document.getElementById("weeks-working").innerHTML = chosenWeeks.toFixed(2);
        document.getElementById("weeks-holiday").innerHTML = Math.round((paidWeeks - chosenWeeks + Number.EPSILON) * 100) / 100;
        document.getElementById("week-hours").innerHTML = chosenHours;
        pensionCalc();
        console.log("Pension", pensionRate);
        document.getElementById("result-pension").innerHTML = pensionRate + "%";
    };    
};

// Event listener for all hard-coded calculator button clicks
buttons.forEach(function(button){
    button.addEventListener("click", function(event) {
        $(this).siblings().removeClass('selected-btn');
        $(this).addClass('selected-btn');

        let classes = event.currentTarget.classList;
        // Update global variable with chosen region
        if(classes.contains("region-btn")) {
            if (this.id === "region-btn-1") {
                chosenRegion = "rOne";
            } else if (this.id === "region-btn-2") {
                chosenRegion = "rTwo";
            } else {
                console.log("Unknown Region passed to main event listener")
                alert("An unknown Region has been passed to the calculator, please request assistance.")
            };
            // Populate the grade bucket with buttons
            addGradeBtns();
        } else if (classes.contains("service-btn")) {
            chosenService = this.innerHTML;
            selectService();
            console.log("Service length", this.innerHTML);
        } else {
            console.log("Unknown button type passed to calculator");
            alert("A button of unknown type has been passed to the calculator.")
        };
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

// Event listener for weeks keystrokes
weeksBox.addEventListener("change", weeksInput);
function weeksInput() {
    chosenWeeks = Number(weeksBox.value);
    console.log(chosenWeeks);

    calculateWeeks();
};

// Event listener for hours input
hoursBox.addEventListener("input", hoursInput);
function hoursInput() {
    chosenHours = hoursBox.value
    console.log(chosenHours);

    getResults();
};