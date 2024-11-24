/* ----------------------- setting popup ------------------------- */
let isPopup = false;

const settingDiv = document.getElementById('setting');
const popup = document.getElementById('setting-popup');


// Restore popup state only when navigating back
window.addEventListener('load', () => {
    const popupState = sessionStorage.getItem('isPopup');
    const navigationTriggered = sessionStorage.getItem('navigatedMenuItem');
    if (popupState === 'true' && navigationTriggered === 'true') {
        showPopup();
        sessionStorage.setItem('navigatedMenuItem', 'false'); // Reset navigation trigger
    }
});

// Toggle popup on settings click
settingDiv.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click from propagating to document listener
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
const appsLink = document.querySelector("#apps > a");
const productPopup = document.getElementById("product-popup");

function showProductPopup() {
    console.log("show");
    productPopup.style.visibility = "visible";
    productPopup.style.opacity = "1";
    appsLink.style.backgroundColor = "#e8e9e8";
}

function hideProductPopup() {
    console.log("hide");
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
            appsLink.style.backgroundColor = "rgba(60, 64, 67, .08)";
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
            appsLink.style.backgroundColor = isVisiblePopup ? "#e8e9e8" : "transparent";
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

        isVisiblePopup ? hideProductPopup() : showProductPopup(); // Toggle popup visibility

        isVisiblePopup = !isVisiblePopup; // Toggle visibility state
    });

    // Handle clicks outside the popup or the apps link
    document.addEventListener("click", (event) => {
        if (isVisiblePopup && !appsLink.contains(event.target) && !productPopup.contains(event.target)) {
            hideProductPopup();
            isVisiblePopup = false; // Set visibility to false when clicking outside
        }
    });
});






