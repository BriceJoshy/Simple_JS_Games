let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loss: 0,
  draw: 0,
};
updateScoreBoard();
function updateScoreBoard() {
  document.querySelector(
    ".ScoreBoard"
  ).innerHTML = `Wins:${score.wins}, Loss:${score.loss}, Draw:${score.draw}`;
}

// if (score === null) {
//     score = {
//         wins: 0,
//         loss: 0,
//         draw: 0
//     }
// }
// if (!score) {
//     score = {
//         wins: 0,
//         loss: 0,
//         draw: 0
//     }
// }
// console.log(JSON.parse(localStorage.getItem('score')));
console.log(score);
let compMove = "";
let userMove = "";
const Rock = 1;
const Paper = 2;
const Scissors = 3;
function Random_number() {
  const Random = Math.random();

  if (Random >= 0 && Random <= 1 / 3) {
    compMove = "Rock";
  } else if (Random >= 1 / 3 && Random <= 2 / 3) {
    compMove = "Paper";
  } else if (Random >= 0 && Random <= 1) {
    compMove = "Scissors";
  }
  return compMove;
}
// Event Listeners for the Buttons

document.querySelector(".js-rock-move-button").addEventListener("click", () => {
  check(Random_number(), "Rock");
});

document
  .querySelector(".js-paper-move-button")
  .addEventListener("click", () => {
    check(Random_number(), "Paper");
  });

document
  .querySelector(".js-scissor-move-button")
  .addEventListener("click", () => {
    check(Random_number(), "Scissors");
  });

document.querySelector(".js-reset-button").addEventListener("click", () => {
  score.wins = 0;
  score.draw = 0;
  score.loss = 0;
  localStorage.removeItem("score");
  updateScoreBoard();
  alert("Score Reset");
});

document.querySelector(".js-autoplay-button").addEventListener("click", () => {
  autoPlay();
});

// When i click 'r', 'p', 's' moves play

document.body.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "r" || event.key === "R") {
    check(Random_number(), "Rock");
  } else if (event.key === "p" || event.key === "P") {
    check(Random_number(), "Paper");
  } else if (event.key === "s" || event.key === "S")
    check(Random_number(), "Scissors");
});

function check(compMove, userMove) {
  if (userMove === compMove) {
    score.draw += 1;
    matchDraw(compMove, userMove);
  } else if (compMove === "Rock" && userMove === "Scissors") {
    score.loss += 1;
    matchLoss(compMove, userMove);
  } else if (compMove === "Rock" && userMove === "Paper") {
    score.wins += 1;
    matchWin(compMove, userMove);
  } else if (compMove === "Paper" && userMove === "Scissors") {
    score.wins += 1;
    matchWin(compMove, userMove);
  } else if (compMove === "Paper" && userMove === "Rock") {
    score.loss += 1;
    matchLoss(compMove, userMove);
  } else if (compMove === "Scissors" && userMove === "Rock") {
    score.wins += 1;
    matchWin(compMove, userMove);
  } else if (compMove === "Scissors" && userMove === "Paper") {
    score.loss += 1;
    matchLoss(compMove, userMove);
  }
  // saving values local storage
  //  only support strings
  localStorage.setItem("score", JSON.stringify(score));
}
const ScoreBoard = document.querySelector(".ScoreBoard");
const MatchResult = document.querySelector(".Result");
const Moves = document.querySelector(".Moves");
function matchDraw(compMove, userMove) {
  MatchResult.innerHTML = "Match Draw";
  Moves.innerHTML = `you <img src="rock_paper_scissor_game/images/${userMove}.png" alt="No"> : <img src="rock_paper_scissor_game/images/${compMove}.png" alt=""> computer`;
  ScoreBoard.innerHTML = `Wins:${score.wins}, Loss:${score.loss}, Draw:${score.draw}`;
}
function matchWin(compMove, userMove) {
  MatchResult.innerHTML = "You Win!";
  Moves.innerHTML = `you <img src="rock_paper_scissor_game/images/${userMove}.png" alt="No"> : <img src="rock_paper_scissor_game/images/${compMove}.png" alt=""> computer`;
  ScoreBoard.innerHTML = `Wins:${score.wins}, Loss:${score.loss}, Draw:${score.draw}`;
}
function matchLoss(compMove, userMove) {
  MatchResult.innerHTML = "You Lose!";
  Moves.innerHTML = `you <img src="rock_paper_scissor_game/images/${userMove}.png" alt="No"> : <img src="rock_paper_scissor_game/images/${compMove}.png" alt=""> computer`;
  ScoreBoard.innerHTML = `Wins:${score.wins}, Loss:${score.loss}, Draw:${score.draw}`;
}

let isAutoPlaying = false;
let interval;
function autoPlay() {
  if (!isAutoPlaying) {
    alert("Game is Starting!!");
    interval = setInterval(() => {
      check(Random_number(), Random_number());
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(interval);
    isAutoPlaying = false;
    alert("Game Stopped!!");
  }
}
