// All the varients
var startButton = document.querySelector("#start-button");
var welcomeScreen = document.querySelector("#welcome-screen");
var questionScreen = document.querySelector("#question-screen");
var endScreen = document.querySelector("#end-screen");
var timer = document.querySelector("#timer-element");
var scoreOuter = document.querySelector("#score-outer");
var scoreInner = document.querySelector("#score-inner");
var submitScoreForm = document.querySelector("#submit-score-form");
var previousScores = document.querySelector("#previous-scores");
startButton.addEventListener("click", startGame);
submitScoreForm.addEventListener("submit", submitScore);
var timerInterval;
var secondsRemaining = 15;
var currentQuestion = 0;
var score = 0;
var savedScores = [];

// Adds scoreboard
function populateScoreboard() {
  if (localStorage.getItem("savedScores")) {
    previousScores.innerHTML = "";
    savedScores = JSON.parse(localStorage.getItem("savedScores"));
    savedScores.forEach(function (element) {
      var para = document.createElement("p");
      para.innerText = `Initials: ${element.initials}, Score: ${element.score}`;
      previousScores.appendChild(para);
    });
  }
}
populateScoreboard();

// Javascript questions
var questions = [
  {
    title: "What is a data type with two possible value of true or false?",
    choices: ["string", "character", "integer", "boolean"],
    correctAnswer: "boolean",
  },
  {
    title: "What is a single object used to present text, numbers or symbol?",
    choices: ["boolean", "character", "string", "integer"],
    correctAnswer: "character",
  },
  {
    title: "What is a series of characters interpreted by a script?",
    choices: ["string", "boolean", "character", "integer"],
    correctAnswer: "string",
  },
];

function startGame() {
  //hide welcomeScreen
  welcomeScreen.classList.add("hidden");
  //adds time element
  scoreOuter.classList.remove("hidden");
  timer.classList.remove("hidden");
  timer.innerText = secondsRemaining;
  timerInterval = setInterval(function () {
    secondsRemaining--;
    timer.innerText = secondsRemaining;
    if (secondsRemaining <= 0) {
      endGame();
    }
  }, 1000);

  //show questionScreen
  questionScreen.classList.remove("hidden");
  displayQuestion();
}

function displayQuestion() {
  questionScreen.innerHTML = "";

  var questionTitle = document.createElement("h2");
  questionTitle.innerText = questions[currentQuestion].title;
  questionScreen.appendChild(questionTitle);

  //loop through the choices and make a button for each one
  for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
    var choiceBtn = document.createElement("button");
    choiceBtn.addEventListener("click", evauluateAnswer);
    choiceBtn.innerText = questions[currentQuestion].choices[i];
    questionScreen.appendChild(choiceBtn);
  }
}

function evauluateAnswer(e) {
  // console.log(e.target.innerText);
  //evaluate if correct, give points on score blah blah
  if (e.target.innerText === questions[currentQuestion].correctAnswer) {
    score = score + 10;
    scoreInner.innerText = score;
  } else {
    secondsRemaining = secondsRemaining - 2;
    if (secondsRemaining <= 0) {
      endGame();
    } else timer.innerText = secondsRemaining;
  }
  //display the next question
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    endGame();
  } else displayQuestion();
}

function endGame() {
  questionScreen.classList.add("hidden");
  // timer.classList.add("hidden");
  clearInterval(timerInterval);
  endScreen.classList.remove("hidden");
}
// Adds scoreboard to local storage
function submitScore(e) {
  e.preventDefault();
  var toBeSaved = { initials: e.target.children[1].value, score: score };
  savedScores.push(toBeSaved);
  localStorage.setItem("savedScores", JSON.stringify(savedScores));
  populateScoreboard();
}
