// Define region buttons
const rOneBtn = document.getElementById("#region-btn-1");
const rTwoBtn = document.getElementById("#region-btn-2");

const buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button){
    button.addEventListener("click", function(event) {
        let classes = event.currentTarget.classList;
        if(classes.contains("r-one")) {
            console.log(this.innerHTML);
        } else if (classes.contains("r-two")) {
            console.log(this.innerHTML);
        }
    })
});