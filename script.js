var startButton = document.querySelector("#start-button");
var welcomeScreen = document.querySelector("#welcome-screen");
var questionScreen = document.querySelector("#question-screen");
startButton.addEventListener("click", startGame);

var currentQuestion = 0;
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
    title: "What is a series oof characters interpreted by a script?",
    choices: ["string", "boolean", "character", "integer"],
    correctAnswer: "string",
  },
];

function startGame() {
  //hide welcomeScreen
  welcomeScreen.classList.add("hidden");
  //show questionScreen
  questionScreen.classList.remove("hidden");
  displayQuestion();
}

function displayQuestion() {
  questionScreen.innerHTML = "";

  var questionTitle = document.createElement("h2");
  questionTitle.innerText = questions[currentQuestion].title;
  questionScreen.appendChild(questionTitle);

  //loop through the choices abnd make a button for each one
  for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
    var choiceBtn = document.createElement("button");
    choiceBtn.addEventListener("click", evauluateAnswer);
    choiceBtn.innerText = questions[currentQuestion].choices[i];
    questionScreen.appendChild(choiceBtn);
  }
}

function evauluateAnswer() {
  console.log("clicked on an ansswer buton");
  //evaluate if correct, give points on score blah blah

  //display the next question
  currentQuestion++;
  displayQuestion();
}
