const diceDisplay = document.getElementById("diceDisplay");
const currentP1 = document.getElementById("CurrentScoreP1");
const currentP2 = document.getElementById("CurrentScoreP2");
const globalP1 = document.getElementById("GlobalScoreP1");
const globalP2 = document.getElementById("GlobalScoreP2");
const rollBtn = document.getElementById("rollDice");
const startBtn = document.getElementById("startNewGame");
const holdBtn = document.getElementById("hold");
const message = document.getElementById("message");
const p1Point = document.getElementById("p1Point");
const p2Point = document.getElementById("p2Point");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
let diceFaces = [1, 2, 3, 4, 5, 6];
let player1 = {
  playerName: "Player 1",
  isPlaying: true,
  currentScore: 0,
  globalScore: 0,
};
let player2 = {
  playerName: "Player 2",
  isPlaying: true,
  currentScore: 0,
  globalScore: 0,
};
const players = [player1, player2];
let result;

//Lancement d'une nouvelle partie.///////////////////////////////////////////////////////////////////////
function startGame() {
  player1.isPlaying = true;
  player1.globalScore = 0;
  player1.currentScore = 0;
  player2.isPlaying = false;
  player2.globalScore = 0;
  player2.currentScore = 0;
  globalP1.textContent = player1.globalScore;
  globalP2.textContent = player2.globalScore;
  currentP1.textContent = player1.currentScore;
  currentP2.textContent = player2.currentScore;
  whoPlays();
}

window.addEventListener("load", startGame);

startBtn.addEventListener("click", startGame);

function whoPlays() {
  if (player1.isPlaying === true && player2.isPlaying === false) {
    p1Point.style.display = "inline-block";
    p2Point.style.display = "none";
    p1.style.fontWeight = "bolder";
    p2.style.fontWeight = "normal";
  } else if (player2.isPlaying === true && player1.isPlaying === false) {
    p1Point.style.display = "none";
    p2Point.style.display = "inline-block";
    p2.style.fontWeight = "bolder";
    p1.style.fontWeight = "normal";
  } else {
    console.log("erreur");
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Lancer le dé//////////////////////////////////////////////////////////////////////////////////////////////////
rollBtn.addEventListener("click", () => {
  attributeDice();
});

function attributeDice() {
  var choice = Math.floor(Math.random() * diceFaces.length);
  result = diceFaces[choice];
  countingScore(result);
  displayingResult();
}
function displayingResult() {
  diceDisplay.innerHTML = `<img src="images/dice${result}.png" alt="image de la face du dé numero ${result}">`;
  currentP1.textContent = player1.currentScore;
  currentP2.textContent = player2.currentScore;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Comptage des points//////////////////////////////////////////////////////////////////////////////////
function countingScore(result) {
  if (player1.isPlaying === true && player2.isPlaying === false) {
    if (result > 1) {
      player1.currentScore = result += player1.currentScore;
    } else if (result === 1) {
      player1.currentScore = 0;
      player1.isPlaying = false;
      player2.isPlaying = true;
      whoPlays();
    } else {
      console.log("erreur");
    }
  } else if (player1.isPlaying === false && player2.isPlaying === true) {
    if (result > 1) {
      player2.currentScore = result += player2.currentScore;
    } else if (result === 1) {
      player2.currentScore = 0;
      player1.isPlaying = true;
      player2.isPlaying = false;

      whoPlays();
    } else {
      console.log("erreur");
    }
  } else {
    console.log("erreur");
  }
}
holdBtn.addEventListener("click", hold);

function hold() {
  if (player1.isPlaying === true && player2.isPlaying === false) {
    player1.globalScore += player1.currentScore;
    globalP1.textContent = player1.globalScore;
    player1.isPlaying = false;
    player1.currentScore = 0;
    currentP1.textContent = player1.currentScore;
    player2.isPlaying = true;
    whoPlays();
  } else if (player1.isPlaying === false && player2.isPlaying === true) {
    player2.globalScore += player2.currentScore;
    globalP2.textContent = player2.globalScore;
    player1.isPlaying = true;
    player2.isPlaying = false;
    player2.currentScore = 0;
    currentP2.textContent = player2.currentScore;
    whoPlays();
  } else {
    console.log("Erreur");
  }

  checkGlobalScores();
}

function checkGlobalScores() {
  if (player1.globalScore >= 100 || player2.globalScore >= 100) {
    if (player1.globalScore > player2.globalScore) {
      startGame();
    } else if (player2.globalScore > player1.globalScore) {
      startGame();
    } else {
      console.log("Erreur");
    }
  }
}
