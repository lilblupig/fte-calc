// Placeholder Grade/SCP arrays/objects
const rOneGrades = ["A", "B", "C", "D"];
const rTwoGrades = ["1", "2", "3", "4", "5", "6"];

const rOneSCPs = {
    "A": [1, 2, 3],
    "B": [2, 3],
    "C": [3, 4],
    "D": [4, 5]
};

const rTwoSCPs = {
    "1": [1, 2],
    "2": [2, 3],
    "3": [3, 4],
    "4": [4, 5],
    "5": [5, 6, 7],
    "6": [7, 8, 9]
};

// Get all elements with the class 'c-btn'
const buttons = document.querySelectorAll(".c-btn");

// Get the hours worked input box
const hoursBox = document.getElementById("hours-box");

// Store the currently selected options
let chosenRegion;
let chosenGrade;
let chosenSCP;
let chosenWeeks;
let chosenHours;
let chosenService;

// Generate Grade buttons
function addGradeBtns() {

    // Clear any existing data from bucket
    let clearBtns = document.getElementById("grade-bucket");
    clearBtns.innerHTML = "";

    // Determine region and get all associated grades as array
    let regionGrades;
    if (chosenRegion == "rOne") {
        regionGrades = rOneGrades; 
        console.log(regionGrades);
    } else if (chosenRegion == "rTwo") {
        regionGrades = rTwoGrades;
        console.log(regionGrades);
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
};

// Generate SCP buttons
function addSCPBtns() {
    // Clear any existing data from bucket
    let clearBtns = document.getElementById("scp-bucket"); 
    clearBtns.innerHTML = "";
    
    // Determine region and get all SCPs associated with chosen grade as array
    let gradeSCPs;
    if (chosenRegion == "rOne") {
        gradeSCPs = rOneSCPs[chosenGrade]; 
        console.log(gradeSCPs);
    } else if (chosenRegion == "rTwo") {
        gradeSCPs = rTwoSCPs[chosenGrade];
        console.log(gradeSCPs);
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

};

// Listen for all hard-coded calculator button clicks
buttons.forEach(function(button){
    button.addEventListener("click", function(event) {
        let classes = event.currentTarget.classList;
        // Update global variable with chosen region
        if(classes.contains("region-btn")) {
            if (this.id == "region-btn-1") {
                chosenRegion = "rOne";
            } else if (this.id == "region-btn-2") {
                chosenRegion = "rTwo";
            } else {
                console.log("Unknown Region passed to main event listener")
                alert("An unknown Region variable has been passed to the calculator.")
            };
            // Populate the grade bucket with buttons
            addGradeBtns();
            // Clear any previously produced SCP buttons
            let clearBtns = document.getElementById("scp-bucket");
            clearBtns.innerHTML = "";
            // Log chosen grade to console
            console.log("Calculating FTE for", this.innerHTML);
        } else if (classes.contains("weeks-btn")) {
            console.log("Working weeks", this.innerHTML);
        } else if (classes.contains("service-btn")) {
            console.log("Service length", this.innerHTML);
        } else {
            console.log("Unknown button type passed to calculator");
            alert("A button of unknown type has been passed to the calculator.")
        };

        $(this).siblings().removeClass('selected-btn');
        $(this).addClass('selected-btn');
    })
});

// Listen for generated Grade button clicks
$('#grade-bucket').on('click', 'button', function (){
    // Log chosen grade to console
    console.log("Grade", this.innerHTML);

    // Update global variable with chosen grade
    chosenGrade = this.innerHTML;

    // Generate the relevant SCP buttons
    addSCPBtns();

    // Clear any previous selection and highlight selected item
    $(this).siblings().removeClass('selected-btn');
    $(this).addClass('selected-btn');
});

// Listen for generated SCP button clicks
$('#scp-bucket').on('click', 'button', function(){
        // Log chosen SCP to console
        console.log("SCP", this.innerHTML);

        // Clear any previous selection and highlight selected item
        $(this).siblings().removeClass('selected-btn');
        $(this).addClass('selected-btn');
    
});

// Listen for hard-coded keystrokes
hoursBox.addEventListener("input", hoursInput);
function hoursInput() {
    chosenHours = hoursBox.value
    console.log(chosenHours);
};