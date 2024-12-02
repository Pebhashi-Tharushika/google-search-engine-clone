let isPopup = false;

const settingDiv = document.getElementById('setting');
const popup = document.getElementById('setting-popup');

const appsLink = document.querySelector("#apps > a");
const productPopup = document.getElementById("product-popup");

const loader = document.getElementById("inner-most-wrapper1");
sessionStorage.setItem("isLoaderDisplayed", 'false');


const themeSetting = document.querySelector('#setting-menu > li:last-child');
const themeText = document.querySelector('#theme-wrapper > div:first-child');
const themeImgSpan = document.querySelector('#theme-image > span');


const tracker = document.querySelector('#inner-wrapper');//scroll bar tracker of product popup

const logo = document.querySelector('main > div:first-child > img');

window.addEventListener('load', () => {

    // for initial theme
    console.log("initial - ", localStorage.getItem("theme"));
    const initialTheme = localStorage.getItem("theme") || "light";
    themeText.innerHTML = initialTheme === "light" ? "Dark theme: Off" : "Dark theme: On";
    themeImgSpan.innerHTML = initialTheme === "light"
        ? `<svg focusable="false" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"></rect><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg>`
        : `<svg focusable="false" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"></rect><path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg>`;
    if (initialTheme === "dark") document.body.classList.add('dark-theme');

    // Restore popup state only when navigating back
    const popupState = sessionStorage.getItem('isPopup');
    const navigationTriggered = sessionStorage.getItem('navigatedMenuItem');
    if (popupState === 'true' && navigationTriggered === 'true') {
        showPopup();
        sessionStorage.setItem('navigatedMenuItem', 'false'); // Reset navigation trigger
    }

    // for google product icon
    if (sessionStorage.getItem('navigatedGoogleProduct') === 'true') {
        appsLink.style.backgroundColor = initialTheme === "light" ? "#dedede" : "#3a3c3e";
        appsLink.style.setProperty("--pseudo-opacity", 1);
    }

    //change google logo w.r.t theme
    logo.src = initialTheme === "light" ? "../img/google-logo.png" : "../img/google-logo-white.png";


});

/* -------------------------- search-input -------------------------*/

let isClikedInput = false;

const inputWrapper = document.getElementById('input-wrapper');
const searchInput = document.querySelector('#middle-div > textarea');
const suggestions = document.getElementById('search-inner-wrapper');
const startDiv = document.getElementById('start-div');

const verticalLine = document.querySelector('#btnclear-wrapper > span');
const btnClear = document.querySelector('#btnclear-wrapper > div');

const btnClearWrapper = document.getElementById('btnclear-wrapper');

function showSearchPopup(){
    inputWrapper.classList.add('input-wrapper-active');
        suggestions.style.display = 'block';
        isClikedInput = true;
}

function hideSearchPopup(){
    inputWrapper.classList.remove('input-wrapper-active'); 
            suggestions.style.display = 'none'; 
            isClikedInput =false;
}
//trending and recent search popup
document.addEventListener('click', (event) => {
    if(btnClearWrapper.contains(event.target))return;
    console.log(event.target);
    if (searchInput.contains(event.target) || startDiv.contains(event.target)) {
        console.log(searchInput.contains(event.target));
        console.log(startDiv.contains(event.target));
        if(!isClikedInput){
        console.log('clicked');
        showSearchPopup();
        }
    }else if(!inputWrapper.contains(event.target) && !searchInput.contains(event.target) && 
                !startDiv.contains(event.target) && inputWrapper.classList.contains('input-wrapper-active')){
        
        console.log(searchInput.contains(event.target));
        console.log(startDiv.contains(event.target));
        console.log(inputWrapper.contains(event.target));
        
            console.log('out clicked');
            hideSearchPopup();
        
    }
});

// toggle clear icon appearance
searchInput.addEventListener('input', () => {
    if (searchInput.value === '') {
        console.log('Textarea is empty');
        verticalLine.style.display = 'none';
        btnClear.style.display = 'none';
    } else {
        console.log('Textarea has content:', searchInput.value);
        verticalLine.style.display = 'block';
        btnClear.style.display = 'flex';
    }
});

//clear content in search bar
btnClearWrapper.addEventListener('click', () => {
    if (searchInput.value === '') return;
    console.log('clear');
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    showSearchPopup();
    searchInput.focus();
});


/* ----------------------- setting popup ------------------------- */


// Toggle popup on settings click
settingDiv.addEventListener('click', (event) => {
    if (!isPopup) {
        showPopup();
    } else {
        hidePopup();
    }
});

// Hide popup when clicking outside
document.addEventListener('click', (event) => {
    if (!settingDiv.contains(event.target) && !popup.contains(event.target)) {
        hidePopup();
    }
});

// Add click listener to menu items
document.querySelectorAll('.menu-item').forEach((item) => {
    item.addEventListener('click', () => {
        sessionStorage.setItem('isPopup', 'true'); // Save popup state before navigation
        sessionStorage.setItem('navigatedMenuItem', 'true'); // Mark navigation triggered
    });
});

// Function to show the popup
function showPopup() {
    const rect = settingDiv.getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;
    const width = rect.width;

    popup.style.display = 'block';

    const popupRect = popup.getBoundingClientRect();
    const widthOfPopup = popupRect.width;
    const heightOfPopup = popupRect.height;

    popup.style.left = `${x + width - widthOfPopup}px`;
    popup.style.top = `${y - heightOfPopup}px`;

    isPopup = true;
}

// Function to hide the popup
function hidePopup() {
    popup.style.display = 'none';
    isPopup = false;
    sessionStorage.setItem('isPopup', 'false'); // Save state
}

/* ----------------------- product popup ------------------------- */

// wrap each product name when hover on product
const productIcon = document.querySelector('.half > ul > li > a');
const productName = document.querySelector('.half > ul > li > a > span');

productIcon.addEventListener('mouseenter', (event) => {
    productName.style.whiteSpace = 'wrap';
});

// open and close the product popup

function showProductPopup() {
    productPopup.style.visibility = "visible";
    productPopup.style.opacity = "1";
    appsLink.style.backgroundColor = localStorage.getItem("theme") === "light" ? "#dedede" : "#3a3c3e";
    tracker.scrollTop = 0;    // Set the scroll position to the top
}

function hideProductPopup() {
    productPopup.style.visibility = "hidden";
    productPopup.style.opacity = "0";
    appsLink.style.backgroundColor = "transparent";
}

document.addEventListener("DOMContentLoaded", () => {

    let isVisiblePopup = false;
    let isVisibleTooltip = false;

    /* ------------------------ mouse hover effect ----------------------- */

    appsLink.addEventListener("mouseenter", () => {
        if (!isVisibleTooltip) {
            appsLink.style.cursor = "pointer";
            appsLink.style.backgroundColor = localStorage.getItem("theme") === "light" ? "rgba(60, 64, 67, .08)" : "#2d2e31";
            appsLink.style.setProperty("--pseudo-opacity", 1); // Show tooltip
            isVisibleTooltip = true;
        } else {
            appsLink.style.backgroundColor = "transparent";
            isVisibleTooltip = false;

        }
    });

    appsLink.addEventListener("mouseleave", (event) => {

        if (isVisibleTooltip) {
            appsLink.style.setProperty("--pseudo-pointer-events", "all"); // Make pseudo-element interactive
        }
        // Check if the mouse is leaving the <a> or the pseudo-element
        const rect = appsLink.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // check tooltip hover
        const styles = getComputedStyle(appsLink);
        const lineHeight = parseInt(styles.getPropertyValue('--pseudo-line-height'), 10) || 16;
        const tbPadding = parseInt(styles.getPropertyValue('--pseudo-tb-padding'), 10) || 4;

        const tooltipHeight = lineHeight + 2 * tbPadding;

        let isHoverOnTooltip = rect.left < mouseX && mouseX < rect.right && mouseY < rect.bottom + tooltipHeight && mouseY > rect.bottom;

        if (!isHoverOnTooltip) {
            appsLink.style.backgroundColor = isVisiblePopup ? (localStorage.getItem("theme") === "light" ? "#dedede" : "#3a3c3e") : "transparent";
            appsLink.style.setProperty("--pseudo-opacity", 0); // Hide tooltip
            appsLink.style.setProperty("--pseudo-pointer-events", "none"); // Disable interactivity
            isVisibleTooltip = false;
        } else {
            appsLink.style.cursor = "text";
        }

    });


    /* -------------------- Handle click on the <a> element ---------------------- */
    appsLink.addEventListener("click", (event) => {
        event.preventDefault();

        appsLink.style.setProperty("--pseudo-opacity", 0); // Hide pseudo-element

        // Toggle popup visibility
        if (isVisiblePopup) {
            hideProductPopup();
            sessionStorage.setItem('isProductPopup', 'false'); // Save product popup state before navigation
        } else {
            showProductPopup();
            sessionStorage.setItem('isProductPopup', 'true');
        }

        isVisiblePopup = !isVisiblePopup; // Toggle visibility state

        let isLoaderDisplayed = sessionStorage.getItem("isLoaderDisplayed");

        if (isLoaderDisplayed === 'false' && isVisiblePopup) {
            loader.style.display = "block";
            setTimeout(() => {
                loader.style.display = "none";
            }, 1150); //loading delay
            sessionStorage.setItem("isLoaderDisplayed", "true");
        };
    });

    // Handle clicks outside the popup or the apps link
    document.addEventListener("click", (event) => {
        if (!appsLink.contains(event.target) && !productPopup.contains(event.target)) {
            if (isVisiblePopup) {
                hideProductPopup();
                isVisiblePopup = false; // Set visibility to false when clicking outside
            }

            if (sessionStorage.getItem('navigatedGoogleProduct') === 'true') {
                appsLink.style.backgroundColor = "transparent";
                appsLink.style.setProperty("--pseudo-opacity", 0);
                sessionStorage.setItem("navigatedGoogleProduct", false);
            }
        }
    });


});

// check that click on google product 
document.querySelectorAll('.half > ul > li > a, #inner-most-wrapper3 > a').forEach(product => {
    product.addEventListener('click', () => {
        sessionStorage.setItem("navigatedGoogleProduct", "true"); // Mark navigation triggered
    });
});



/* ------------------- toggle light and dark theme ---------------------*/

themeSetting.addEventListener('click', () => {
    const currentTheme = localStorage.getItem("theme");

    const updatedTheme = currentTheme === "light" ? "dark" : "light";
    console.log("updatedTheme - ", updatedTheme);
    // Update localStorage
    localStorage.setItem("theme", updatedTheme);

    // Update the text
    themeText.innerHTML = updatedTheme === "light" ? "Dark theme: Off" : "Dark theme: On";

    // Update the SVG icon
    themeImgSpan.innerHTML = updatedTheme === "light"
        ? `<svg focusable="false" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"></rect><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg>`
        : `<svg focusable="false" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"></rect><path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg>`;

    //Update google logo
    logo.src = updatedTheme === "light" ? "../img/google-logo.png" : "../img/google-logo-white.png";

    hidePopup();

    document.body.classList.toggle('dark-theme'); // If present, it removes the class. If not present, it adds the class.

});


/* ----------------------- feedback form ------------------*/

let isVisibleFeedbackForm = false;
let isCloseButtonClicked = false;

const menuItemFeedback = document.getElementById("send-feedback");
const frmFeedback = document.getElementById('feedback-wrapper');

// show tooltip for close button
const btnClose = document.querySelector('#feedback-form-close button');
const closeTooltip = document.querySelector('#feedback-form-close #close-tooltip');
btnClose.addEventListener('mouseover', () => closeTooltip.style.display = 'block');
btnClose.addEventListener('mouseout', () => closeTooltip.style.display = 'none');

//show tooltip for send button
const btnSend = document.querySelector('#footer-btn-wrapper > button');
const sendTooltip = document.getElementById('send-tooltip');
btnSend.addEventListener('mouseover', () => sendTooltip.style.display = 'block');
btnSend.addEventListener('mouseout', () => sendTooltip.style.display = 'none');

//show tooltip for info
const infoElm = document.getElementById('info');
const infoTooltip = document.getElementById('info-tooltip');
infoElm.addEventListener('mouseover', () => infoTooltip.style.display = 'block');
infoElm.addEventListener('mouseout', () => infoTooltip.style.display = 'none');


// toggle appearance based on focus of feedback description container
const frmTextarea = document.getElementById('fb-description');
const borderElms = document.querySelectorAll('#desc-border-container > div');
const lblPlaceholder = document.querySelector('#desc-border-container>div:nth-child(2)>label');

// Focus event
frmTextarea.addEventListener('focus', () => {
    if (!isCloseButtonClicked) {
        lblPlaceholder.style.transform = 'scale(0)'; // Shrink out
        lblPlaceholder.style.visibility = 'hidden'; 
        borderElms.forEach(elm => elm.classList.add('desc-border-container-focused'));
    }
});

// Blur event
frmTextarea.addEventListener('blur', () => {
    if (!isCloseButtonClicked && frmTextarea.value === '') {
        lblPlaceholder.style.visibility = 'visible'; 
        lblPlaceholder.style.transform = 'scale(1)';
        borderElms.forEach(elm => elm.classList.remove('desc-border-container-focused'));
    }
});

//Open feedback form
menuItemFeedback.addEventListener('click', () => {
    btnClose.classList.remove('active');
    lblPlaceholder.style.visibility = 'visible';
    lblPlaceholder.style.transform = 'scale(1)';
    frmFeedback.style.visibility = 'visible';
    isVisibleFeedbackForm = true;
});

// Close feedback form
btnClose.addEventListener('click', () => {
    // Set the flag to true to prevent blur behavior when the close button is clicked
    isCloseButtonClicked = true;
    
    // Hide the label and textarea
    lblPlaceholder.style.visibility = 'hidden';
    lblPlaceholder.style.transform = 'scale(0)';
    
    btnClose.classList.add('active');
    
    // After hiding the feedback form, reset the flag and clear the textarea
    setTimeout(() => {
        frmTextarea.value = '';
        frmFeedback.style.visibility = 'hidden';
        isVisibleFeedbackForm = false;
        btnClose.classList.remove('active');
        borderElms.forEach(elm => elm.classList.remove('desc-border-container-focused'));
        
        // Reset the flag after the feedback form is closed to allow normal behavior
        setTimeout(() => {
            isCloseButtonClicked = false;   
        }, 250);
    }, 250);
});
