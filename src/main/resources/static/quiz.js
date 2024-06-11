document.addEventListener("DOMContentLoaded", function() {
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

    console.log("Document loaded");
    // Extract the quiz ID from the URL
    const pathSegments = window.location.pathname.split('/');
    console.log("Path segments:", pathSegments);
    const quizId = pathSegments[pathSegments.length - 1];
    console.log("Extracted quiz ID:", quizId);

    if (quizId) {
        fetchQuizData(quizId);
    } else {
        console.error("Quiz ID not found in the URL");
    }

    const startQuizBtn = document.getElementById('start-quiz-btn');
    startQuizBtn.addEventListener('click', function() {
        window.location.href = `/question/${quizId}`;
    });
});

function fetchQuizData(quizId) {
    const apiUrl = `/api/quizzes/${quizId}`;
    console.log("Fetching data from API:", apiUrl);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched quiz data:", data);
            displayQuizData(data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}

function fetchCreatorDetails(creatorId) {
    fetch(`/api/users/${creatorId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched creator data:", data);
            // Populate creator username
            document.getElementById('quiz-creator-username').textContent = data.username;
            // Populate creator photo
            document.getElementById('quiz-creator-photo').src = data.photo;
        })
        .catch(error => {
            console.error("There was a problem with fetching creator data:", error);
        });
}

function displayQuizData(quiz) {
    console.log("Displaying quiz data:", quiz);
    document.getElementById('quiz-id').textContent = quiz.id;
    document.getElementById('quiz-title').textContent = quiz.title;
    document.getElementById('quiz-description').textContent = quiz.description;
    document.getElementById('quiz-created-on').textContent = new Date(quiz.createdOn).toLocaleString(); // Populate created on
    document.getElementById('quiz-creator-id').textContent = quiz.creatorId; // Populate creator ID
    document.getElementById('quiz-question-amount').textContent = quiz.questionAmount; // Populate question amount

    // Fetch creator details
    fetchCreatorDetails(quiz.creatorId);
}