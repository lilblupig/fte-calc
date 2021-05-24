/*
Email send function triggered by clicking the Send button in the Contact Us modal
*/

function sendMail(contactForm) {
    // Sends parameters to Email JS API for conversion to email
    emailjs.send("ftecalc","template_ftecalc", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "fte_query": contactForm.contactquery.value,
        },"user_UlY5CRsOdXy9h7gppcwY9"
    )
    .then(
        function(response) {
            // If successful, first display success text in the modal, then reset form
            console.log("Success!", response);
            // Call timeout function to reset form in ten seconds
            formTimeout();
            // On success receipt, immediately display success message
            successMessage();
        },
        function(error) {
            // If unsuccessful, display error messge.  Form not to reset in same session
            console.log("Failed...", error);
            failMessage();
        }
    );
    return false;
}

// Response to be displayed if email send successful
function successMessage() {
    document.getElementById("contact-form").innerHTML = 
        `<div>
            <p>Thank you for your message.  We will be in touch as soon as we can.</p>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>`;
}

// Response to be displayed if email send unsuccessful
function failMessage() {
    document.getElementById("contact-form").innerHTML = 
        `<div>
            <p>We apologise, there appears to be an error in the email submission system.  Please close the window and try again later.</p>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>`;
}

// Define timeout function for form reset, ten seconds
function formTimeout() {
    setTimeout(resetForm, 5000);
}

// Use template literals to reset the form contents
function resetForm() {
    document.getElementById("contact-form").innerHTML = 
        `<form onsubmit="return sendMail(this);" class="row">
            <div class="col-12 col-md-3">
                <label for="name">Name:</label>
            </div>
            <div class="col-12 col-md-9 pb-1">
                <input id="name" name="name" type="text" />
            </div>
            <div class="col-12 col-md-3">
                <label for="email">Email:</label>
            </div>
            <div class="col-12 col-md-9 pb-1">
                <input id="email" name="emailaddress" type="email" />
            </div>
            <div class="col-12 col-md-3">
                <label for="message">Message:</label>
            </div>
            <div class="col-12 col-md-9 pb-1">
                <textarea id="message" name="contactquery" rows="10" cols="30"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn contact-btn">Send</button>
            </div>
        </form>`;
}