// Placeholder pay scale information
const rOneGrades = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
const rTwoGrades = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

const rOneSCPs = {
    "A": [1, 2,],
    "B": [2, 3, 4],
    "C": [4, 5, 6],
    "D": [6, 7, 8],
    "E": [9, 10, 11],
    "F": [12, 13, 14],
    "G": [15, 16, 17],
    "H": [18, 19, 20],
    "I": [21, 22, 23],
    "J": [24, 25, 26],
    "K": [27, 28, 29],
    "L": [30, 31, 32],
    "M": [33, 34, 35],
    "N": [36, 37, 38]
};
const rTwoSCPs = {
    "1": [1],
    "2": [1, 2, 3],
    "3": [2, 3, 4],
    "4": [3, 4, 5],
    "5": [4, 5, 6],
    "6": [6, 7, 8, 9],
    "7": [8, 9, 11, 12, 14],
    "8": [12, 14, 15, 17, 19, 20],
    "9": [19, 20, 22, 23, 24, 25],
    "10": [24, 25, 26, 27, 28, 29],
    "11": [28, 29, 30, 31, 32, 33, 34],
    "12": [33, 34, 35, 36, 37, 38, 39],
    "13": [38, 39, 40, 41, 42, 43, 44],
    "14": [43, 44, 45, 46, 47, 48, 49],
    "15": [48, 49, 50, 51, 52, 53, 54],
    "16": [53, 54, 55, 56, 57, 58, 59],
    "17": [60, 61, 62, 63, 64, 65, 66],
    "18": [65, 66, 67, 68, 69, 70, 71]
};

const rOneScales = {
    "1": 17800,
    "2": 18100,
    "3": 18500,
    "4": 18900,
    "5": 19300,
    "6": 19600,
    "7": 20000,
    "8": 20400,
    "9": 20900,
    "10": 21700,
    "11": 22100,
    "12": 22600,
    "13": 23500,
    "14": 24400,
    "15": 24900,
    "16": 25900,
    "17": 27000,
    "18": 27700,
    "19": 28600,
    "20": 29500,
    "21": 30400,
    "22": 31300,
    "23": 32200,
    "24": 32900,
    "25": 33700,
    "26": 34700,
    "27": 35700,
    "28": 36900,
    "29": 37800,
    "30": 38800,
    "31": 39800,
    "32": 40800,
    "33": 41800,
    "34": 42800,
    "35": 43800,
    "36": 44800,
    "37": 45800,
    "38": 46800
};
const rTwoScales = {
    "1": 17800,
    "2": 18100,
    "3": 18500,
    "4": 18900,
    "5": 19300,
    "6": 19600,
    "7": 20000,
    "8": 20400,
    "9": 20900,
    "11": 21700,
    "12": 22100,
    "14": 23000,
    "15": 23500,
    "17": 24400,
    "19": 25400,
    "20": 25900,
    "22": 27000,
    "23": 27700,
    "24": 28600,
    "25": 29500,
    "26": 30400,
    "27": 31300,
    "28": 32200,
    "29": 32900,
    "30": 33700,
    "31": 34700,
    "32": 35700,
    "33": 36900,
    "34": 37800,
    "35": 38800,
    "36": 39800,
    "37": 40800,
    "38": 41800,
    "39": 42800,
    "40": 43800,
    "41": 44800,
    "42": 45800,
    "43": 46800,
    "44": 47700,
    "45": 48600,
    "46": 49400,
    "47": 50300,
    "48": 51300,
    "49": 52200,
    "50": 53200,
    "51": 54200,
    "52": 55300,
    "53": 56300,
    "54": 57300,
    "55": 58500,
    "56": 59700,
    "57": 61000,
    "58": 62200,
    "59": 63500,
    "60": 69000,
    "61": 70500,
    "62": 72000,
    "63": 73500,
    "64": 75000,
    "65": 76600,
    "66": 78300,
    "67": 80000,
    "68": 81700,
    "69": 83400,
    "70": 85200,
    "71": 86900
};

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
    } else {
        let weeksFTE = paidWeeks / 52.1428;
        let hoursFTE = chosenHours / 37;
        let FTE = Math.round((weeksFTE * hoursFTE + Number.EPSILON) * 10000) / 10000;
        console.log("Weeks FTE", weeksFTE);
        console.log("Hours FTE", hoursFTE);
        console.log("FTE", FTE);

        document.getElementById("result-grade").innerHTML = chosenGrade + "-" + chosenSCP;
        document.getElementById("result-fte").innerHTML = FTE;
        document.getElementById("result-salary").innerHTML = Math.round((chosenSalary * FTE + Number.EPSILON) * 100) / 100;
        document.getElementById("result-rate").innerHTML = (chosenSalary / 52.14 / 37).toFixed(2);
        document.getElementById("result-pension").innerHTML = "To Do";
        document.getElementById("weeks-total").innerHTML = paidWeeks;
        document.getElementById("weeks-working").innerHTML = chosenWeeks;
        document.getElementById("weeks-holiday").innerHTML = Math.round((paidWeeks - chosenWeeks + Number.EPSILON) * 100) / 100;
        document.getElementById("week-hours").innerHTML = chosenHours;
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