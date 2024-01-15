let result = JSON.parse(localStorage.getItem("score"));

function reset() {
  if (!(result.loses === 0 && result.ties === 0 && result.wins === 0)) {
    result.loses = 0;
    result.ties = 0;
    result.wins = 0;
  }
  updateScoreElement();
  localStorage.setItem("score", JSON.stringify(result));
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const computerChoice = playGame();
      playerMove(computerChoice);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame() {
  let randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 0.33) {
    computerMove = "rock";
  } else if (randomNumber >= 0.33 && randomNumber < 0.66) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }

  return computerMove;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins: ${result.wins} ties: ${result.ties} loses: ${result.loses}`;
}

updateScoreElement();

function playerMove(playerChoice) {
  if (!result) {
    // Zainicjuj obiekt result, jeśli jeszcze nie istnieje
    result = { wins: 0, ties: 0, loses: 0 };
  }
  let score = "";
  let computerMove = playGame();

  if (computerMove === playerChoice) {
    score = "tie.";
  } else if (
    (playerChoice === "rock" && computerMove === "scissors") ||
    (playerChoice === "paper" && computerMove === "rock") ||
    (playerChoice === "scissors" && computerMove === "paper")
  ) {
    score = "win";
  } else {
    score = "lose.";
  }

  if (score === "win") {
    result.wins++;
  } else if (score === "tie.") {
    result.ties++;
  } else {
    result.loses++;
  }

  document.querySelector(".js-result").innerHTML = `You ${score}`;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You picked : <img src="images/${playerChoice}-emoji.png" />
  Computer picked :
  <img src="images/${computerMove}-emoji.png" />`;

  localStorage.setItem("score", JSON.stringify(result));
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins: ${result.wins} ties: ${result.ties} loses: ${result.loses}`;
}
