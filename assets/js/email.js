function sendMail(contactForm) {
    emailjs.send("ftecalc","template_ftecalc", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "fte_query": contactForm.contactquery.value,
    })
    .then(
        function(response) {
            console.log("Success!", response);
        },
        function(error) {
            console.log("Failed...", error);
        }
    )

    return false;
};