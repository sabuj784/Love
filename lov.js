const parentElement = document.getElementById("parentElement");
const showMessage = document.getElementById("showMessage");
const changeColor = document.body.style;

function propose() {
  // Hide the parent element and display the message
  parentElement.style.display = "none";
  showMessage.style.display = "block";

  // Change the background color
  changeColor.background = "linear-gradient(116.82deg, #ff94e7 0%, #27cbff 100%)";

  // Start the color-changing text animation
  animateText();

  // Display the beautiful message after the text animation
  setTimeout(function() {
    document.querySelector('.message').style.opacity = 1;
  }, 4500);  // Slightly longer than typing animation
}

function animateText() {
  const textWrapper = document.querySelector(".ml6 .text-wrapper");
  textWrapper.classList.add('colorful-text');
}

// Button to open the next project
document.getElementById('nextProjectBtn').addEventListener('click', function() {
  window.location.href = 'sathi.html'; // Replace with your actual URL
});

// Button animation setup
anime({
  targets: '#nextProjectBtn',
  scale: [0.5, 1],
  opacity: [0, 1],
  duration: 1000,
  easing: 'easeOutElastic(1, .8)'
});
