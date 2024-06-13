document.addEventListener("DOMContentLoaded", function() {
    // Fetch current authenticated user data
    fetch('/api/users/current') // Use relative URL with no protocol
        .then(response => response.json())
        .then(data => {
            console.log("Received user data:", data); // Log received user data

            // Update HTML elements with user data
            document.getElementById('user-id').innerText = "User ID: " + data.id;
            document.getElementById('user-name').innerText = "Hello, " + data.username; // Update user name
            document.getElementById('user-photo').src = data.photo;

            // Update user score with yellow color
            const userScoreElement = document.getElementById('user-score');
            userScoreElement.innerText = "Score: " + data.score;
            userScoreElement.style.color = "yellow";
        })
        .catch(error => console.error('Error fetching user data:', error));
});

function toggleMenu() {
  var menu = document.getElementById("menu");
  menu.style.display = (menu.style.display === "block")? "none" : "block";
  document.addEventListener("click", function(event) {
    if (!event.target.closest("#menu") &&!event.target.closest(".menu-btn")) {
      menu.style.display = "none";
    }
  });
}