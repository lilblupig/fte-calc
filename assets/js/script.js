// Placeholder Grade arrays
const rOneGrades = ["A", "B", "C", "D"];
const rTwoGrades = ["1", "2", "3", "4", "5", "6"];

// Get all elements with the class 'btn'
const buttons = document.querySelectorAll(".btn");

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

// Listen for all hard-coded calculator button clicks
buttons.forEach(function(button){
    button.addEventListener("click", function(event) {
        let classes = event.currentTarget.classList;
        if(classes.contains("region-btn")) {
            if (this.id == "region-btn-1") {
                addROneGradeBtns();
            } else if (this.id == "region-btn-2") {
                addRTwoGradeBtns();
            } else {
                console.log("Unknown Region requested")
            };
            console.log("Calculating FTE for", this.innerHTML);
        } else if (classes.contains("scp-btn")) {
            console.log("SCP", this.innerHTML);
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
$('#grade-bucket').on('click', 'button', function(){
    $(this).siblings().removeClass('selected-btn');
    $(this).addClass('selected-btn');
    console.log("Grade", this.innerHTML);
});
