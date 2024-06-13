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

let board = [];
let rows = 8;
let columns = 8;
let minesCount = 10;
let minesLocation = [];
let tilesClicked = 0;
let flagEnabled = false;
let gameOver = false;
let score = 0;
let isDarkMode = false;
let boardElement;


window.onload = function() {
    createDifficultyButtons();
    createScoreCounter();
    startGame();
    document.getElementById("restart-button").addEventListener("click", () => {
        location.reload(); // Refresh the page to restart the game
    });
}

function toggleMode() {
    const body = document.body;
    const modeToggle = document.getElementById("mode-toggle");

    if (isDarkMode) {
        body.classList.remove("dark-mode");
        modeToggle.innerText = "Dark Mode";
    } else {
        body.classList.add("dark-mode");
        modeToggle.innerText = "Light Mode";
    }

    isDarkMode = !isDarkMode;
}

function createDifficultyButtons() {
    const difficultyContainer = document.getElementById("difficulty-container");
    const levels = ["Easy", "Normal", "Hard", "Extreme"];
    levels.forEach(level => {
        let button = document.createElement("button");
        button.innerText = level;
        button.addEventListener("click", () => setDifficulty(level));
        difficultyContainer.appendChild(button);
    });
}

function createScoreCounter() {
    const scoreCounter = document.getElementById("score-counter");
    scoreCounter.innerText = "Score: 0";
}

function setDifficulty(level) {
    switch(level) {
        case "Easy":
            rows = columns = 5;
            minesCount = 5;
            break;
        case "Normal":
            rows = columns = 7;
            minesCount = 10;
            break;
        case "Hard":
            rows = columns = 9;
            minesCount = 15;
            break;
        case "Extreme":
            rows = columns = 11;
            minesCount = 20;
            break;
    }
    restartGame();
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();

    const boardElement = document.getElementById("board");
    boardElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    boardElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    boardElement.innerHTML = ""; // Ensure the board is empty before starting

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", clickTile);
            boardElement.append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function restartGame() {
    board = [];
    minesLocation = [];
    tilesClicked = 0;
    score = 0;
    gameOver = false;
    document.getElementById("score-counter").innerText = "Score: 0";
    document.getElementById("final-score").innerText = "";
    startGame();
}

function setMines() {
    let minesLeft = minesCount;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function setFlag() {
    flagEnabled = !flagEnabled;
    document.getElementById("flag-button").style.backgroundColor = flagEnabled ? "darkgray" : "lightgray";
}

function clickTile() {
    if (gameOver) {
        return;
    }

    let tile = this;
    if (tile.classList.contains("flagged")) {
        return; // Prevent action on flagged tiles
    }

    if (flagEnabled) {
        if (tile.innerText === "🚩") {
            tile.innerText = "";
            tile.classList.remove("flagged");
        } else {
            tile.innerText = "🚩";
            tile.classList.add("flagged");
        }
        return;
    }

    if (tile.innerText === "🚩") {
        return; // Prevent uncovering flagged tiles
    }

    if (minesLocation.includes(tile.id)) {
        gameOver = true;
        revealMines();
        displayFinalScore();
        return;
    }

    let [r, c] = tile.id.split("-").map(Number);
    checkMine(r, c);

    if (tilesClicked == rows * columns - minesCount) {
        score += 1000;
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
        displayFinalScore();
    }
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";                
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;
    score += 10;
    document.getElementById("score-counter").innerText = "Score: " + score;

    let minesFound = 0;

    minesFound += checkTile(r-1, c-1);
    minesFound += checkTile(r-1, c);
    minesFound += checkTile(r-1, c+1);
    minesFound += checkTile(r, c-1);
    minesFound += checkTile(r, c+1);
    minesFound += checkTile(r+1, c-1);
    minesFound += checkTile(r+1, c);
    minesFound += checkTile(r+1, c+1);

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    } else {
        board[r][c].innerText = "";
        checkMine(r-1, c-1);
        checkMine(r-1, c);
        checkMine(r-1, c+1);
        checkMine(r, c-1);
        checkMine(r, c+1);
        checkMine(r+1, c-1);
        checkMine(r+1, c);
        checkMine(r+1, c+1);
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}

function displayFinalScore() {
    const finalScore = document.getElementById("final-score");
    finalScore.innerText = "Final Score: " + score;
    const flagButton = document.getElementById("flag-button");
    flagButton.style.display = "none";
    const difficultyContainer = document.getElementById("difficulty-container");
    difficultyContainer.style.display = "none"; // Hides the difficulty buttons

    // Get the current user score from the HTML element
    const userScoreElement = document.getElementById('user-score');
    const currentScore = parseInt(userScoreElement.innerText.split(": ")[1]);

    // Add the game score to the user score
    const newScore = currentScore + score;

    // Update the user score HTML element
    // userScoreElement.innerText = "Score: " + newScore;

    // Send a PUT request to update the user score in the database
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




