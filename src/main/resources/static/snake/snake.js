let userData;
document.addEventListener("DOMContentLoaded", function() {
  // Fetch current authenticated user data
  fetch('/api/users/current')
   .then(response => response.json())
   .then(data => {
          console.log("Received user data:", data); // Log received user data
          userData = data; // Store the user data in the global variable

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
   const goBackButton = document.getElementById('go-back-button');
              goBackButton.addEventListener('click', function() {
                  window.location.href = 'http://tokgames.cleverapps.io/home'; // Redirect to the home page
              });
});

//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;
var score = 0;
var scoreIncrement = 10;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score += scoreIncrement;
        scoreIncrement += 5;
        document.getElementById("score-counter").innerText = "Score: " + score;
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        showGameOverModal();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            showGameOverModal();
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY!= 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY!=-1) {
            velocityX = 0;
            velocityY = 1;
        }
        else if (e.code == "ArrowLeft" && velocityX!=1) {
            velocityX = -1;
            velocityY = 0;
        }
        else if (e.code == "ArrowRight" && velocityX!=-1) {
            velocityX = 1;
            velocityY = 0;
        }
    }

    function placeFood() {
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }

    function showGameOverModal() {
        document.getElementById("game-over-modal").style.display = "block";
        document.getElementById("final-score").innerText = "Your final score is: " + score;
        const userScoreElement = document.getElementById('user-score');
            const currentScore = parseInt(userScoreElement.innerText.split(": ")[1]);

            // Add the game score to the user score
            const newScore = currentScore + score;

            // Update the user score HTML element
            // userScoreElement.innerText = "Score: " + newScore;

            fetch(`http://tokgames.cleverapps.io/api/users/score/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ score: newScore })
            })
           .then(response => response.json())
           .then(data => console.log('User score updated successfully'))
           .catch(error => console.error('Error updating user score:', error));
    }

    document.getElementById("restart-button").addEventListener("click", restartGame);

    function restartGame() {
        gameOver = false;
        score = 0;
        scoreIncrement = 10;
        snakeBody = [];
        snakeX = blockSize * 5;
        snakeY = blockSize * 5;
        velocityX = 0;
        velocityY = 0;
        document.getElementById("game-over-modal").style.display = "none";
        document.getElementById("score-counter").innerText = "Score: 0";
        placeFood();
    }