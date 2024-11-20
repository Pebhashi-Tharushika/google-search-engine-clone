
const micIcon = document.getElementById('mic-icon');
const cameraIcon = document.getElementById('camera-icon');
const inputWrapper = document.getElementById('input-wrapper');

// Add event listener to stop propagation of the hover event
micIcon.addEventListener('mouseenter', function(event) {
    inputWrapper.removeAttribute('title');
    event.stopPropagation(); // Prevent the event from bubbling up
    
});

micIcon.addEventListener('mouseleave', function(event) {
    inputWrapper.setAttribute('title', 'Search');
    
});


cameraIcon.addEventListener('mouseenter', function(event) {
    inputWrapper.removeAttribute('title');
    event.stopPropagation(); // Prevent the event from bubbling up
    
});


cameraIcon.addEventListener('mouseleave', function(event) {
    inputWrapper.setAttribute('title', 'Search');
    
});

