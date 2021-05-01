// Define region buttons
const rOneBtn = document.getElementById("#region-btn-1");
const rTwoBtn = document.getElementById("#region-btn-2");

const buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button){
    button.addEventListener("click", function(event) {
        let classes = event.currentTarget.classList;
        console.log(this.innerHTML);
    })
});