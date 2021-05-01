// Define region buttons
const rOneBtn = document.getElementById("#region-btn-1");
const rTwoBtn = document.getElementById("#region-btn-2");

const buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button){
    button.addEventListener("click", function(event) {
        let classes = event.currentTarget.classList;
        if(classes.contains("region-btn")) {
            console.log("Calculating FTE for", this.innerHTML);
        } else if (classes.contains("grade-btn")) {
            console.log("Grade", this.innerHTML);
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
