document.addEventListener("DOMContentLoaded", function() {
    // Fetch current authenticated user data
    fetch('/api/users/current')
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
        document.getElementById('go-back-btn').addEventListener('click', () => {
                  window.location.href = '/home';
                });
});

function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Fetch quiz data and populate quiz squares
fetch('/api/quizzes')
    .then(response => response.json())
    .then(data => {
        const quizContainer = document.querySelector('.quiz-container');
        data.forEach(quiz => {
            const quizSquare = document.createElement('div');
            quizSquare.classList.add('quiz-square');
            quizSquare.innerHTML = `
                <img class="quiz-image" src="${quiz.photo}" alt="Quiz Image"> <!-- Assuming photo field holds the background image URL -->
                <div class="quiz-name">${quiz.title}</div>
            `;
            quizSquare.addEventListener('click', () => {
                window.location.href = `/quiz/${quiz.id}`;
            });
            quizContainer.appendChild(quizSquare);
        });
    })
    .catch(error => console.error('Error fetching quiz data:', error));
