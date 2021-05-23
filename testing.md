# **FTE Calc**

# Testing

A plan and log for testing the website, this is a manual testing plan due to the limitations of the developer at this time, and the nature of the page.

# Index
1. [Validation Testing](#validation-testing)
1. [Logic Error Testing](#logic-error-testing)
1. [Client Stories Testing](#client-stories-testing)
1. [Manual Testing](#manual-testing)
    * [Common Elements](#common-elements)
    * [Page Specific Sections](#page-specific-sections)
    * [Accessibility](#accessibility)
1. [Bugs](#bugs)

## Validation Testing
The project code has been passed through the following code validators:
* [HTML Code Validator](https://validator.w3.org/) (All pages were checked)
![HTML Validator result](assets/readme-images/html-validation.png)

* [CSS Code Validator](https://jigsaw.w3.org/css-validator/) (One warning - external stylesheets are not checked)
![CSS Validator result](assets/readme-images/css-validation.png)
![CSS Validator warning](assets/readme-images/css-validation-warning.png)

* [JS Hint](https://jshint.com/) (A number of unused variables/undefined variables were found when checking each file, the majority of these relate to items called/defined in other files.  Those which do not relate to external resources for Google Maps API and EmailJS)
    * calc.js
![JSHint Validator result](assets/readme-images/jshint-calcjs.png)
    * email.js
![JSHint Validator result](assets/readme-images/jshint-emailjs.png)
    * maps.js
![JSHint Validator result](assets/readme-images/jshint-mapsjs.png)
    * polygons-map.js
![JSHint Validator result](assets/readme-images/jshint-polygons-mapjs.png)
    * script.js
![JSHint Validator result](assets/readme-images/jshint-scriptjs.png)
    * source-data.js
![JSHint Validator result](assets/readme-images/jshint-source-datajs.png)

* The project has been assessed throughout development using [Lighthouse](https://developers.google.com/web/tools/lighthouse).
![Lighthouse Ratings](assets/readme-images/lighthouse-ftecalc.png)

## Logic Error Testing
The calculator uses a lot of logic, with the full application tested every time a new component was added or anything changed.  A summary of items tested, their issues and their resolution is below.

### **User Interface Component Logic**
The user interface includes three interactive components which do not relate to the function of the calculator.  These are the email function, the map and the sections which can be toggled on or off.

* Email Logic:<br>
This is required to feed back to the user whether the sending of the email has been successful, or not.  The EmailJS boilerplate includes a function(response) and a function(error) which largely handles the logic side of the email process.  This was used to display appropriate information to the user (see [Bugs section](#bugs) for more info).  The logic for the email function has been tested by:
    1. Sending a correctly completed email
    1. Sending an incorrectly completed email (disabled client side validation)
    1. Sending a correctly completed email, but with one or more of the following code adjustments:
        * EmailJS account or template names incorrect
        * EmailJS parameters incorrect
        * EmailJS script parameters incorrect
        * EmailJS authentication key/user ID incorrect

    All instances result in either the email reaching the developer account, or the specified error message being displayed to the user, as desired.  No cases of unhandled errors have been discovered.

* Map Logic:<br>
The majority of the map handling logic is provided by the Google API which powers it.  There was a persistent error in the console before the Region buttons were clicked, this was eventually determined to be the lack of a suitable polygon definition being given to the function.  To eliminate this, a placeholder polygon of three identocal co-ordinates was created and is the default value given to regionMap before a region is chosen.  The following actions were undertaken to verify the resilience of the Map API:
    1. Break the API key - Maps displays an error
    1. Break the API script source before the key - Map does not display
    1. Break a polygon lat/lng - Maps displays but polygon does not

    The first and last of these are considered acceptable, the polygon display is not critical to the function of the calculator, which is the primary purpose for the application.  The second instance, where a blank white space displays on the screen is less acceptable, and a message is displayed in the empty div for the user which is shown wherever the map fails to load.  This needs improvement as is currently aria-hidden.  A way to identify the map failure and use that as a condition to insert a message would be preferable.

* Togglers Logic:<br>
The section visibility togglers were particularly difficult to build (again, see [Bugs section](#bugs)), and produced a wide variety of logical responses to input during their development.  Tests undertaken on the current version are as follows:
    * Ensure that all functionality is present for keyboard interaction as well as for click.
    * Ensure that the use of back and forward buttons does not cause problems.
    * Ensure that new session in same browser calls status from local storage correctly.

    Checks were also undertaken on the outcome of altering element ID or other identifying attributes, all of which yielded undesireable results, primarily the inaction of the toggler.  This is not a particular issue if the section is visible when the code is damaged, but could be problematic if the browser has stored hidden values and something happens on load.  To summarise, this feature has the potential for an unhandled error.

    This issue was evaluated as low risk, the average user is unlikely to be able to modify or damage the code which powers this functionality, and as such no further time has been dedicated to this.

### **Calculator Logic**
The calculator uses a lot of logical operators to determine both user input and decision making for the code.  Each calculator section has it's own peculiarities, and so each one is addressed separately.  There are some common elements however, all if statements linked to error handling are wrapped in a try/catch function which should collect any unhandled errors.  These are only logged to the console at the moment as they are entirely unforeseen, and there is nothing the user will be able to do about them other than contact support.  Another common featire of all error handling components in the calculator is to return after completion of the error handle should an error be thrown.

* Region Chooser Logic:<br>
The event listener for this step listens for interaction with any elements (not dynamic) which have the class c-btn, then determines if the button type relates to something of use in the calculator, what and then calls the appropriate event handler.  If the event does not meet the calculator selection criteria then the calculator will display an alert advising the user.  This situation should never arise, but has been tested using buttons with the class c-btn which do not meet any of the criteria.

    The regionClick event handler then assesses which region it has been passed, then sets the map polygon and populates the grade bucket accordingly.  If an unrecognised region is passed to the event handler it too will produce an alert.

    Neither of these scenarios should be able to occur as there are no stray elements on the page with the class c-btn.

* Grade Chooser Logic:<br>
The event listener for this first set of dynamic content listens for clicks in the Grade bucket on button items.  It then calls the gradeClick event handler.  The event handler determines the region and the grade chosen and populates the SCP bucket.  If it is unable to determine the region or grade an alert will display to the user.  As above, this should not be able to occur, as the only items in the grade bucket will have been populated based on the region.

* SCP Chooser Logic:<br>
The event listener for the second set of dynamic content works the same way as the first, calling the scpClick event handler.  This also checks the region and retrieves data from the pay scales.  If it is unable to do so, it will display an alert to the user.  Once again, this should not be possible as the buttons can only have populated from valid data selected previously.

* Service Length Logic:<br>
The service length buttons are available to click at any time, however, they must be clicked after the first three steps are completed in order for the calculator to work.  The event listener is the same as for Region Clicks above.  If it identifies that the clicked button has the class service-btn it will call the serviceClick event handler, and if not an alert will be triggered.

    The serviceClick event handler works differently than the previously described handlers.  First it checks that all three previous steps are complete by checking whether the chosenSalary variable has a value of 0 or undefined, if so it displays an alert to the user which explicilty states that step 1 to 3 must be completed before selecting the service length.  It also clears the service selection and any subsequent fields which may have been completed (should not be possible).  If the prior fields are completed it will assign the service value to the chosenService variable.

    In all other scenarios it will display an alert to the user, though once again, it should not be possible for an unknown service choice to be made.

* Working Weeks Logic:<br>
The working weeks event listener gets the value enetered in the weeks box when focus moves away from that field.  It then calls the enterWeeks event handler which has a similar initial check to the previous step.  The enterWeeks event hadler first checks to make sure the previous four steps have been completed:
    * If steps 1-3 have been missed but step 4 has been entered (should not be possible) it will display an alert to the user advising them to complete steps 1-3.
    * If steps 1-3 are completed by step 4 is not (very possible), it will display an alert to the user advising them to please select a service length before entereing weeks.
    * If no previous steps are complete (very possible), an alert is displayed to the user advising them to complete steps 1-4 before entering weeks.

    If the tests are passed, the event handler then checks to see if the weeks entered are within the expected contractable ranges defined in the variables _minWeeks and _maxWeeks.  If not, an alert will be displayed to the user advising them to enter a value between 38 and 44 (inclusive) and it will clear the field (see [Bugs section](#bugs)).

    If all steps are complete, and the entry is valid, it will use the previously selected data to determine the appropriate paid holiday weeks and assign it to a variable.

    If none of the above are true, an alert will be displayed to the user (should not be possible).

* Working Hours Logic:<br>
The hours per week event listener calls the getResults event handler on every keystroke.  Like the previous two event handlers, it checks forst to see if prior steps have been completed and advises the user accordingly:
    * If all steps 1-5 missing alerts to complete steps 1-5.
    * If steps 1-3 complete but service and weeks missing, advises to complete steps 4 & 5.
    * Checks for theoretically impossible scenarios where steps 1-3 are not complete but 4 and/or 5 are and alerts.
    * If steps 1-4 complete advises to complete step 5.
    
    If all steps complete, checks that hours entered are greater than 0 and less than or equal to 37.  If not, advises user via alert.

    If all items are satisfied then calculates results and populaes results field.

    In all other circumastances (should not be possible) an alert is displayed to the user.

All calculator input steps reset the results field, the step in question and any subsequent steps which should mean that the global variables stay clean and only ever contain appropriate information.

All of the above were tested with:
* Additional elements created with attributes designed to send unidentified data to an event listener or handler (or both).
* Broken variable names
* Incorrectly overwritten global variables

In all tested cases the expected alert was returned to the user.  The try/catch function should take care of any unexpected issues.

## Client Stories Testing
1. As a new user, I want to immediately find information on how to use the website.
    * On first visit the user is presented initially with the About section, which briefly describes what the tool is and how the tool should be used.
    ![User story 1 screenshot](assets/readme-images/user-story-1.png)
1. As a new user, I want to immediately find information on what I need to complete the task I came for. 
    * The About section also contains information on what is required to use the site.
    ![User story 2 screenshot](assets/readme-images/user-story-2.png)
1. As a new user, I want to very quickly, intuitively learn exactly how the calculator is used to get the data I came for.
    * The Calculator has clear step indicators showing where to start, for the first few steps the next section does not populate until the currently required section os completed
    * Should the numerical order or standard left-to-right reading flow not be sufficient, the Calculator will display guidance messages if any of the available steps are completed out of sequence.
    ![User story 3 screenshot](assets/readme-images/user-story-3.png)
1. As a returning user, I want to get straight to using the calculator without pointless interaction such as scrolling or clicking. 
    * The About and More Info sections can both be toggled off.  This preference is saved to local storage each time it is changed, and should mean that the sections are displayed as the user last left them.
    ![User story 4 screenshot](assets/readme-images/user-story-4.png)
1. As a returning user, I want to be able to provide feedback with regard to my needs/issues with the website.
    * The footer contains a prominent Contact Us button which prompts a contact form in a modal.  This contains as few fields as possible.
    ![User story 5 screenshot](assets/readme-images/user-story-5.png)
1. As a frequent user, I want to know that the website is updated with relevant infomation in a timely manner, or to be able to update the source data myself.
    * The website shows the last updated date clearly in the footer.  This can be used to easily determine the age and relevance of the information it contains.
    * In addition, the FTE check which appears after step 3 should be compared with a current copy of the relevant pay scales, which will also determine whether the data is current.
    * It is not currently possible for the user to update pay scales, but this is planned for the future.
    ![User story 6 screenshot](assets/readme-images/user-story-6.png)

## Manual Testing

### **Common Elements**

These components are present on every page, and each page has been tested.

---

#### Navigation Bar

**Intent** - a navbar which collapses to hamburger on mobile.

* All links are valid and link to the appropriate page/section.
* Toggle effects display correctly where relevant.
* Hover effect occurs correctly for each navigation section.
* Resize to mobile/tablet and check that navigation bar collapses to hamburger.
* Expand hamburger menu and check all sections present, and displaying correctly.
* Fixed nav does not obscure any content.

**Result** - Both pages opened on PC/laptop, Hudl 2, Nexus 10, Pixel XL, Xiaomi MI9 (Chrome and Firefox) and in Safari on an iMac.  All features respond correctly, no broken links.  Toggle sections work and display correctly and hamburger presents as it should.

**Verdict** - Pass

---

#### Hero Images

**Intent** - a graphic introduction to the page using an image relevant to the page content.  Primary purpose, to elicit a positive emotional response from the user.  The image should display correctly on all device sizes.  The image should display 30% height as the focus should be on the data and the tool.

* Image fills the viewport as expected depending on page.
* Resize to mobile/tablet and check that image still displays without distortion.
* Text remains centered with no overflow at mobile/tablet.
* Image does not become pixellated on larger screens.

**Result** - Tested as above on multiple devices.  Image displays correctly in all tested scenarios.

**Verdict** - Pass

---

#### Footer

**Intent** - The footer should be reflective of the design of the nav to bookend each page and provide familiarity to the user.  This helps with intuitive learning.  Any external links should open in new tabs and provide user feedback when hovered over.

* Footer appears in two sections.
* Buttons display correctly, and show feedback behaviour on hover.
* Modal is opened correctly, and email facility works.
* Resize to tablet and check for text overflow issues.
* Resize to mobile and check that sections wrap neatly below one another.

**Result** - Tested on devices as above, all features work as expected, no issues with display or function.

**Verdict** - Pass

---

### **Page Specific Sections**

These items are specific to each individual page.

#### Basic Plan for Body Sections
* Check all areas of text align appropriately, horizontally and vertically.
* Check that behaviour is correct for mobile/tablet.
* Check that any links, buttons or fields show feedback behaviour on hover.
* Check that any links navigate to correct pages.
* Check that any external links open in a new tab, to the correct place.
* Check that any icons do not overflow into text on mobile/tablet.

---

#### Calcultor Home Page

**Intent** - Allow the user to quickly learn about the tool and get started using it as quickly as possible.  If returning user, allow the user to start using the tool immediately.

* All text sections display correctly across tested device widths.
* All buttons and links display user feedback on hover.
* All internal links navigate to the correct page/section.
* Toggle behaviour works as expected, updating section and icon.
* Returning to the page recalls status of toggled sections.
* Progress bar fills as steps completed/overwritten (PC only).
* All calculator bucket components populate as expected.
* All user errors are handled clearly and instruction given to the user to correct.
* Results field populates and clears properly as appropriate choices are made in the calculator.
* Map displays, and shows polygon when region is selected.

**Result** - All elements display as expected, on all devices tested.  Interactive components exhibit correct user feedback.
Specifically:
* Calculator, Results, About and More sections wrap as expected on PC/tablet/mobile.
* Progress bar fills appropriately regardless of step selected.
* All dynamic content populates as expected and is correctly interactive.
* Results field populates on completion of step 6 and clears when interacting with any other step.
* Map displays and Polygons appear as they should.

**Verdict** - Pass

---

#### Contact Us Modal

**Intent** - Encourage the user to get in touch with the owners, and make it as easy as possible to do so.

* All text sections display correctly across tested device widths.
* All buttons display user feedback on hover.
* Form contents align nicely and that there is no overflow of content.
* Fields display correctly on mobile/tablet and PC.
* Fields and submit button display feedback on hover.
* Fields display feedback on focus.
* Try to submit blank form, error messages display with information.
* Try to submit email in incorrect format, error message displays with information.
* Try to submit form without question, error message displays with information.
* Submit correctly completed form, receive success modal or error message.
* If successful, form resets after 10 seconds.
* Clear modal escape options available at all times.
* Modal information centers correctly with no overflow on all device widths.

**Result** - All fields display as expected and client side validation functional.  At all times both Close and "X" buttons are present.  User feedback for hover/focus is as desired, and the success/error feedback is in line with expectations.

**Verdict** - Pass

---

#### 404

**Intent** - Catch users who would normally encounter a browser generated 404 page, and redirect them back to the website as cleanly as possible.

* All text sections display correctly across tested device widths.
* All buttons and links display user feedback on hover.
* All internal links navigate to the correct page/section.
* User is guided back to the home page.
* Mistyped url for website to ensure 404 page displays in such situations.
* Deliberately broke page link to ensure 404 page will display in this instance too.

**Result** - All elements display as expected, on all devices tested.  Interactive components exhibit correct user feedback.  Large button redirects to Calculator page correctly.
Mistyped url and broken link tests successful.

**Verdict** - Pass

---

### **Accessibility**

The colourblind feature on Coolors was used to check that the colours appeared sufficiently different, and not jarring for these users.
![Colourblindness assessment via Coolors](assets/readme-images/colourblindness.png)

As well as the use of the Lighthouse assessments of accessibility, the website was browsed at intervals by two users who may experience difficulty.  A dyslexic user with ASD and a colourblind user both participated in testing for this project at various stages.

Users of screen readers have been vorne in mind when implementing each section.  All interactive content is fully navigatable by keyboard and default behaviours have been preserved where known when implementing custom interactions.

There is some concern regarding screen reader requirements which are not known to or understood by the developer, but referring to the W3C [WAI-ARIA documentation](https://www.w3.org/WAI/standards-guidelines/aria/) has hopefully mitigated this as much as possible.

## Bugs

Details of any persistent or difficult bugs, and any bugs which remain unresolved.

### **Fixed Bugs**

#### **Section togglers and local storage**

After discussion with the development partners, it was decided that the About section in particular required the user to scroll past the instructions on each use and should therefore be toggle-able.  The More Information section was less intrusive, but again, should the user wish to use the contact modal the More Info section must be scrolled first.

![About section toggled off](assets/readme-images/section-toggle.png)

A click event listener was added to the navigation links, along with toggle images to indicate whether the section is visible or hidden and sildeToggle used to show or hide the sections.

The default behaviour of the links caused the page to navigate to the location of the hidden section, which is particularly unhelpful.  The href attribute was removed from the links to stop this, but it resulted in the unhidden sections not being scrolled to either.  Further issues with this approach were that the links became unselectable by keyboard and therefore could not be activated by users with screen readers or other accessible technologies.

Initially if(:hidden) was used to determine the status of the section and prevent default if hidden.  This also changed the toggle image as appropriate.  However, once evaluated, :hidden will always return the same result.  It was necessary to evaluate if hidden separately and then call the toggle behaviours accordingly which resulted in a lot of repeated code.  It also took some trial and error to understand how the code assessed status and assign the toggle image and scroll-behaviour accordingly.

The fixed nav (required for effective and accessible toggling) caused the title of the toggled section to be hidden on the default behaviour of the link despite the use of scroll-top in CSS.  As such, javascript animate/scrollTop was initiated if the section was not hidden, and an offset used to ensure the newly displayed section was visible in full.  This approach allowed the default behaviour of clicking the link (moving the keyboard selector to the linked section) to continue, whilst simultaneously ensuring the section was displayed.

At review, mentor Reuben Ferrante explained the use of state which was then used to condense the code for this feature considerably.

Finally, the user could easily toggle the sections off, but the next time the page was loaded the sections would be toggled back on again.  Local storage was used to save the status of the toggled sections such that the user can leave them toggled off if desired.

#### **Validation & reset of Bootstrap email modal on send**

The input fields for the modal are all verified client side using the browser/HTML attribute Required. Clicking Send on the Bootstrap modal did nothing in terms of user feedback. The EmailJS boilerplate has response and error handling built in, but this simply logs to the console.

Added some JavaScript to the EmailJS boilerplate code for response/error to replace the modal contents (form) with a success message, or an error message as appropriate.

![Successful email message](assets/readme-images/email-success.png)

This worked when tested, but resulted in the modal contents being fixed at the success or error message when reopened.  Whilst this behaviour is desirable for a failed message (no point allowing repeat attempts should there be a problem), it was not desirable for a successful transmission.

A timeout function was also added to the response code, which would reset the contents of the modal back to the form after 10 seconds.

The user has multiple options to escape the modal at all times.

The success and error messages were shown correctly at all times when tested.

#### **Printing**
It is necessary to save a copy of the calculation to the file of the staff member for personnel records.  Only the calculator and results sections are required for this, so CSS @print styles were added to remove all unnecessary content form printing, which was successful.

The Bootstrap breakpoints mean that on most browsers an A4 page is seen as a small viewport and therefore the mobile display appeared on the page by default in one long, multi page document.  A number of approaches were tried to correct this but the eventual course of action chosen was to write specific print classes to override the Bootstrap breakpoints when printed.

![Print example](assets/readme-images/print.png)

This is a small section in the bugs note, but consumed a disproportionate amount of time.  It is unfashionable to print web pages, and so resources for the issue and hand were scarce and unspecific, usually relating to the correction of graphics to produce better printed results etc.

#### **Working Weeks Error Handling**
There was a recurring issue where the error handler for working weeks entry would correctly throw the "Please complete prior fields..." alert, but incorrectly follow it up with the "Please enter a value between 38 and 44" alert regardless of whether the number of weeks entered was correct.

The logic for this handler was checked, rewritten and removed.  The incorrect error only showed in the wrong context when the first error handler was triggered.  Eventually it became apparent that the first event handler was setting the weeks to zero, which is not a value between 38 and 44.  An additional else if was added to allow for an entry of 0 or "" and stopped this alert from displaying incorrectly purely because the field had been reset.

### **Remaining Bugs**
There are no known remaining bugs in the application.


Testing first completed 23/05/2021 - AKH
Testing repeated XX/XX/2021 - AKH

[Return to Top](#fte-calc)