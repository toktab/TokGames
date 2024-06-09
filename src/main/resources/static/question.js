document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8080/api/users/current')
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

    console.log("Document loaded");
    // Extract the quiz ID from the URL
    const pathSegments = window.location.pathname.split('/');
    console.log("Path segments:", pathSegments);
    const quizId = pathSegments[pathSegments.length - 1];
    console.log("Extracted quiz ID:", quizId);

    if (quizId) {
        fetchQuestionsByQuizId(quizId);
    } else {
        console.error("Quiz ID not found in the URL");
    }
});

function fetchQuestionsByQuizId(quizId) {
    const apiUrl = `http://localhost:8080/api/questions/${quizId}/questions`;
    console.log("Fetching data from API:", apiUrl);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched quiz questions:", data);
            displayQuestions(data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}

function displayQuestions(questions) {
    const questionContainer = document.getElementById('question-info');
    questionContainer.innerHTML = ''; // Clear existing content

    if (questions.length > 0) {
        questions.forEach((question, index) => {
            // Create a new div for each question
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-item');

            // Create and populate HTML elements with question data
            questionDiv.innerHTML = `
                <h3>Question ${index + 1}</h3>
                <p><strong>Question ID:</strong> ${question.id}</p>
                <p><strong>Title:</strong> ${question.title}</p>
                <p><strong>Photo:</strong> <img src="${question.photo}" alt="Question Photo"></p>
                <p><strong>Quiz ID:</strong> ${question.quizId}</p>
                <p><strong>Difficulty:</strong> ${question.difficulty}</p>
                <p><strong>Correct:</strong> ${question.correct}</p>
                <p><strong>Incorrect:</strong> ${question.incorrect}</p>
                <p><strong>Created On:</strong> ${new Date(question.createdOn).toLocaleString()}</p>
            `;
            questionContainer.appendChild(questionDiv);
        });
    } else {
        document.getElementById('error-message').innerText = 'No questions found for this quiz ID';
    }
}
