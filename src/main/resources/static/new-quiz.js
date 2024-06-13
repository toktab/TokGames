document.addEventListener("DOMContentLoaded", function() {
    let currentUser;

    // Fetch current authenticated user data
    fetch('/api/users/current')
        .then(response => response.json())
        .then(data => {
            currentUser = data;
            console.log("Received user data:", data);

            // Update HTML elements with user data
            document.getElementById('user-id').innerText = "User ID: " + data.id;
            document.getElementById('user-name').innerText = "Hello, " + data.username;
            document.getElementById('user-photo').src = data.photo;

            const userScoreElement = document.getElementById('user-score');
            userScoreElement.innerText = "Score: " + data.score;
            userScoreElement.style.color = "yellow";
        })
        .catch(error => console.error('Error fetching user data:', error));
        document.getElementById('go-back-btn').addEventListener('click', () => {
                          window.location.href = '/home';
                        });

    const numQuestionsElement = document.getElementById('numQuestions');
    numQuestionsElement.addEventListener('change', function() {
        const numQuestions = parseInt(numQuestionsElement.value);
        renderQuestions(numQuestions);
    });

    function renderQuestions(numQuestions) {
        const questionList = document.getElementById('questionList');
        questionList.innerHTML = '';

        for (let i = 0; i < numQuestions; i++) {
            const questionContainer = document.createElement('div');
            questionContainer.classList.add('question-container');

            questionContainer.innerHTML = `
                <div class="question-header">
                    <span class="question-number">Question ${i + 1}</span>
                </div>
                <div class="form-group">
                    <label for="questionTitle${i}">Question Title:</label>
                    <input type="text" id="questionTitle${i}" name="questionTitle${i}" required>
                </div>
                <div class="form-group">
                    <label for="correctAnswer${i}">Correct Answer:</label>
                    <input type="text" id="correctAnswer${i}" name="correctAnswer${i}" required>
                    <label for="incorrectAnswer1${i}">Incorrect Answer 1:</label>
                    <input type="text" id="incorrectAnswer1${i}" name="incorrectAnswer1${i}" required>
                    <label for="incorrectAnswer2${i}">Incorrect Answer 2:</label>
                    <input type="text" id="incorrectAnswer2${i}" name="incorrectAnswer2${i}" required>
                    <label for="incorrectAnswer3${i}">Incorrect Answer 3:</label>
                    <input type="text" id="incorrectAnswer3${i}" name="incorrectAnswer3${i}" required>
                </div>
                <div class="form-group">
                    <label for="photoURL${i}">Photo URL:</label>
                    <input type="url" id="photoURL${i}" name="photoURL${i}" required>
                    <label for="difficulty${i}">Difficulty:</label>
                    <select id="difficulty${i}" name="difficulty${i}">
                        <option value="EASY">Easy</option>
                        <option value="NORMAL">Normal</option>
                        <option value="HARD">Hard</option>
                        <option value="EXTREME">Extreme</option>
                    </select>
                </div>
            `;

            questionList.appendChild(questionContainer);
        }
    }

    document.getElementById('continueButton').addEventListener('click', function() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const photoURL = document.getElementById('photoURL').value;
        const numQuestions = parseInt(document.getElementById('numQuestions').value);

        const questions = [];
        for (let i = 0; i < numQuestions; i++) {
            questions.push({
                title: document.getElementById(`questionTitle${i}`).value,
                correct: document.getElementById(`correctAnswer${i}`).value,
                incorrect: [
                    document.getElementById(`incorrectAnswer1${i}`).value,
                    document.getElementById(`incorrectAnswer2${i}`).value,
                    document.getElementById(`incorrectAnswer3${i}`).value,
                ].filter(ans => ans !== "").join(';'),
                photo: document.getElementById(`photoURL${i}`).value,
                difficulty: document.getElementById(`difficulty${i}`).value
            });
        }

        fetch('/api/quizzes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                photo: photoURL,
                questionAmount: numQuestions,
                creatorId: currentUser.id
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create quiz');
            }
            return response.json();
        })
        .then(createdQuiz => {
            console.log('Created Quiz:', createdQuiz);
            const quizId = createdQuiz.id;

            const questionPromises = questions.map(question => {
                question.quizId = quizId; // Set the quizId for each question
                return fetch('/api/questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(question)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to create question');
                    }
                    return response.json();
                });
            });

            return Promise.all(questionPromises);
        })
        .then(createdQuestions => {
            console.log('Created Questions:', createdQuestions);
            window.location.href = `/quizzes.html`; // Redirect to quizzes.html
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to create quiz or questions. Please try again.');
        });
    });
});
