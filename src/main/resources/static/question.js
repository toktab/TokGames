let currentUser = null;

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8080/api/users/current')
       .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }
            return response.json();
        })
       .then(data => {
            console.log("Received user data:", data); // Log received user data
            currentUser = data; // Store the current user data in the global variable

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
                throw new Error("Network response was not ok: " + response.statusText);
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
                <h3 style="color: yellow; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">Question ${index + 1}</h3>
                <p><strong>Title:</strong> ${question.title}</p>
                <p><strong>Photo:</strong> <img src="${question.photo}" alt="Question Photo" style="max-width: 200px; max-height: 200px;"></p>
                <p><strong>Difficulty:</strong> ${question.difficulty}</p>
            `;

            // Create a new div for answer options
            const answerOptionsDiv = document.createElement('div');
            answerOptionsDiv.classList.add('answer-options');

            // Split incorrect answers into an array
            const incorrectAnswers = question.incorrect.split(';');
            const correctAnswer = question.correct;

            // Shuffle the incorrect answers and add the correct answer
            const answerOptions = [...incorrectAnswers.slice(0, 3), correctAnswer];
            for (let i = answerOptions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answerOptions[i], answerOptions[j]] = [answerOptions[j], answerOptions[i]];
            }

            // Create and populate HTML elements with answer options
            answerOptions.forEach((answer, index) => {
                const answerOptionDiv = document.createElement('div');
                answerOptionDiv.classList.add('answer-option');
                if (answer === correctAnswer) {
                    answerOptionDiv.innerText = `${index + 1}. ${answer} (correct)`; // Add "(correct)" to the correct answer
                } else {
                    answerOptionDiv.innerText = `${index + 1}. ${answer}`;
                }
                answerOptionDiv.dataset.correct = answer === correctAnswer;
                answerOptionDiv.dataset.difficulty = question.difficulty; // Add difficulty as a data attribute
                answerOptionDiv.addEventListener('click', function() {
                    selectAnswer(this);
                });
                answerOptionsDiv.appendChild(answerOptionDiv);
            });

            // Add answer options to question div
            questionDiv.appendChild(answerOptionsDiv);

            // Add question div to question container
            questionContainer.appendChild(questionDiv);
        });

        // Create submit button
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.id = 'submit-button';
        submitButton.style.background = 'lightgreen';
        submitButton.style.color = 'white';
        submitButton.style.border = '1px solid black';
        submitButton.style.padding = '10px 20px';
        submitButton.style.fontSize = '18px';
        submitButton.style.cursor = 'pointer';
        submitButton.addEventListener('click', submitAnswers);
        questionContainer.appendChild(submitButton);
    }
}

function selectAnswer(answerOption) {
    const answerOptions = answerOption.parentNode.children;
    for (let i = 0; i < answerOptions.length; i++) {
        answerOptions[i].classList.remove('selected');
    }
    answerOption.classList.add('selected');

    if (answerOption.dataset.correct === "true") {
        const difficulty = answerOption.dataset.difficulty.toLowerCase();
        let points = 0;
        switch (difficulty) {
            case 'easy':
                points = 50;
                break;
            case 'normal':
                points = 100;
                break;
            case 'hard':
                points = 150;
                break;
            case 'extreme':
                points = 250;
                break;
            default:
                console.warn("Unknown difficulty level:", difficulty);
        }
        console.log(`Correct answer selected! Points: ${points}`);
    }
}

function submitAnswers() {
    const selectedAnswers = document.querySelectorAll('.answer-option.selected');
    let score = 0;

    selectedAnswers.forEach(answerOption => {
        const isCorrect = answerOption.dataset.correct === "true";
        const difficulty = answerOption.dataset.difficulty ? answerOption.dataset.difficulty.toLowerCase() : null;

        console.log(`Selected answer: ${answerOption.innerText}, Correct: ${isCorrect}, Difficulty: ${difficulty}`);

        if (isCorrect && difficulty) {
            switch (difficulty) {
                case 'easy':
                    score += 50;
                    break;
                case 'normal':
                    score += 100;
                    break;
                case 'hard':
                    score += 150;
                    break;
                case 'extreme':
                    score += 250;
                    break;
                default:
                    console.warn("Unknown difficulty level:", difficulty);
            }
            console.log(`Added points for ${difficulty} question. Current score: ${score}`);
        } else {
            console.warn(`Incorrect answer or difficulty missing for: ${answerOption.innerText}`);
        }
    });

    // Display total score in an alert
    alert(`Total Score: ${score}`);
}
