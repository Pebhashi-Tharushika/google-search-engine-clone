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
document.addEventListener("DOMContentLoaded", () => {
    const appsLink = document.querySelector("#apps > a");
    const popup = document.getElementById("product-popup");

    let isVisible = false; // Track visibility status

    appsLink.addEventListener('mouseenter', (event) => {
        if (event.target === appsLink) {
            console.log("enter");
        appsLink.style.backgroundColor = "rgba(60, 64, 67, .08)"; // Change background color on hover
        appsLink.style.setProperty("--pseudo-opacity", 1); // Show pseudo-element via CSS variable
        }
    });
    
    appsLink.addEventListener('mouseleave', (event) => {
        if (event.target === appsLink) {
        appsLink.style.backgroundColor = "transparent"; // Reset background color when hover ends
        appsLink.style.setProperty("--pseudo-opacity", 0); // Hide pseudo-element via CSS variable
        }
    });
    
    // // Prevent hovering over pseudo-element from triggering the background color change or opacity change
    // appsLink.addEventListener('mouseover', (event) => {
    //     if (event.target === appsLink) {
    //         appsLink.style.backgroundColor = "rgba(60, 64, 67, .08)"; // Change background color only on appsLink
    //         appsLink.style.setProperty("--pseudo-opacity", 1); // Show pseudo-element opacity
    //     }
    // });

    // // When the mouse leaves appsLink
    // appsLink.addEventListener('mouseout', () => {
    //     appsLink.style.backgroundColor = "transparent"; // Reset background color
    //     appsLink.style.setProperty("--pseudo-opacity", 0); // Hide pseudo-element opacity
    // });


    // Handle click on the <a> element
    appsLink.addEventListener("click", (event) => {
        event.preventDefault();

        appsLink.style.setProperty("--pseudo-opacity", 0); // Hide pseudo-element via CSS variable

        appsLink.style.backgroundColor = "#e8e9e8";
        // Toggle popup visibility
        if (isVisible) {
            popup.style.visibility = "hidden";
            popup.style.opacity = "0";
        } else {
            popup.style.visibility = "visible";
            popup.style.opacity = "1";
        }

        isVisible = !isVisible; // Toggle visibility state
    });

    // Handle clicks outside the popup or the apps link
    document.addEventListener("click", (event) => {
        if (isVisible && !appsLink.contains(event.target) && !popup.contains(event.target)) {
            popup.style.visibility = "hidden";
            popup.style.opacity = "0";
            isVisible = false; // Set visibility to false when clicking outside
        }
    });
});





