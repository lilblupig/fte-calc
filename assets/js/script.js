// Placeholder Grade arrays
const rOneGrades = ["A", "B", "C", "D"];
const rTwoGrades = ["1", "2", "3", "4", "5", "6"];

const rOneSCPs = {
    "A": [1, 2, 3],
    "B": [2, 3],
    "C": [3, 4],
    "D": [4, 5]
};

const rTwoSCPs = [
    {"1": [1, 2]},
    {"2": [2, 3]},
    {"3": [3, 4]},
    {"4": [4, 5]},
    {"5": [5, 6, 7]},
    {"6": [7, 8, 9]}
];

// Get all elements with the class 'btn'
const buttons = document.querySelectorAll(".btn");

let chosenGrade;

//Generates Grade buttons for Region 1
function addROneGradeBtns() {
    let clearBtns = document.getElementById("grade-bucket");
    clearBtns.innerHTML = "";

    for (let i = 0; i < rOneGrades.length; i++) {
        let newBtn = document.createElement("button");
        newBtn.innerHTML = rOneGrades[i];
        newBtn.classList.add("btn", "disc-btn", "grade-btn");
    
        let gradeBucket = document.getElementById("grade-bucket");
        gradeBucket.appendChild(newBtn);
    };
};

// Generates Grade buttons for Region 2
function addRTwoGradeBtns() {
    let clearBtns = document.getElementById("grade-bucket");
    clearBtns.innerHTML = "";

    for (let i = 0; i < rTwoGrades.length; i++) {
        let newBtn = document.createElement("button");
        newBtn.innerHTML = rTwoGrades[i];
        newBtn.classList.add("btn", "disc-btn", "grade-btn");
    
        let gradeBucket = document.getElementById("grade-bucket");
        gradeBucket.appendChild(newBtn);
    };
};

// Generates SCP buttons for Region 1
function addROneSCPBtns() {
    let clearBtns = document.getElementById("scp-bucket"); // Clears any existing data from bucket
    clearBtns.innerHTML = "";
    
    console.log("Get chosen grade:", chosenGrade); // Logs chosen grade

    let gradeSCPs = rOneSCPs[chosenGrade]; // Gets all SCPs associated with chosen grade as array
    console.log(gradeSCPs);

    for (let i = 0; i < gradeSCPs.length; i++) { // Generates SCP buttons
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
        if(classes.contains("region-btn")) {
            if (this.id == "region-btn-1") {
                addROneGradeBtns();
                let clearBtns = document.getElementById("scp-bucket");
                clearBtns.innerHTML = "";
            } else if (this.id == "region-btn-2") {
                addRTwoGradeBtns();
                let clearBtns = document.getElementById("scp-bucket");
                clearBtns.innerHTML = "";
            } else {
                console.log("Unknown Region requested")
            };
            console.log("Calculating FTE for", this.innerHTML);
        } else if (classes.contains("weeks-btn")) {
            console.log("Working weeks", this.innerHTML);
        } else if (classes.contains("service-btn")) {
            console.log("Service length", this.innerHTML);
        } else {
            console.log("Unknown button type");
        };

        $(this).siblings().removeClass('selected-btn');
        $(this).addClass('selected-btn');
    })
});

// Listen for generated Grade button clicks
$('#grade-bucket').on('click', 'button', function (){
    console.log("Grade", this.innerHTML); // Log chosen grade to console

    chosenGrade = this.innerHTML; // Update global variable with chosen grade

    addROneSCPBtns(); // Generate the relevant SCP buttons

    $(this).siblings().removeClass('selected-btn'); // Clear any previous selection
    $(this).addClass('selected-btn'); // Highlight selected item
});

// Listen for generated SCP button clicks
$('#scp-bucket').on('click', 'button', function(){
    $(this).siblings().removeClass('selected-btn');
    $(this).addClass('selected-btn');
    console.log("SCP", this.innerHTML);
});
