// Array of objects containing quiz questions, options, and correct answers 
let questions = [
  {
    prompt: `Commonly used data types do NOT include:`,
    options: [
      " Booleans",
      " Alerts",
      " Strings",
      " Numbers",
    ],
    answer: " Booleans",
  },
  {
    prompt: `The condition of an if/else statement is enclosed within _`,
    options: [
      " Quotes",
      " Curly Brackets",
      " Parentheses",
      " Square Brackets",
    ],
    answer: " Curly Brackets",
  },
  {
    prompt: `Arrays in Javascript can be used to store _`,
    options: [
      " Numbers and strings",
      " Other arrays",
      " Booleans",
      "All of the above",
    ],
    answer: " All of the above",
  },
  {
    prompt: `String values must be enclosed within ____ when being assigned to variables.`,
    options: [
      " Quotes",
      " Curly Brackets",
      " Commas",
      " Parentheses",
    ],
    answer: " Quotes",
  },
];

var loadQuestions = loadQuestion;
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function handleOptionClick(selectedOption) {
  let currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Incorrect!";
    time -= 10; // Deduct 10 seconds for incorrect answers
  }
  // Move to the next question
  currentQuestionIndex++;
  // Clear the current question from the display
  clearCurrentQuestion();
  // Load the next question
  loadQuestions();
}

function clearCurrentQuestion() {
  // Clear the current question and options from the display
  while (questionsEl.firstChild) {
    questionsEl.removeChild(questionsEl.firstChild);
  }
}

function loadQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let questionPrompt = document.querySelector(".question-words");
  questionPrompt.textContent = currentQuestion.prompt;

  choicesEl.innerHTML = ""; // Clear previous options

  currentQuestion.options.forEach((option) => {
    let optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add("option");
    optionButton.onclick = function () {
      handleOptionClick(option);
    };
    choicesEl.appendChild(optionButton);
  });
}

  function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    let landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.classList.add("hide");
    questionsEl.classList.remove("hidden");
    loadQuestions();
  }

  function quizEnd() {
    clearInterval(timerId);
    let endScreenEl = document.getElementById("quiz-end");
    endScreenEl.classList.remove("hidden");
    let finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    questionsEl.classList.add("hidden");
  }
  
  function clockTick() { 
    time--; 
    timerEl.textContent = time; 
    if (time <= 0) { 
        quizEnd(); 
    } 
} 
// Function to save high score
function saveHighscore() { 
    let name = nameEl.value.trim(); 
    if (name !== "") { 
        let highscores = 
            JSON.parse( 
                window.localStorage.getItem( 
                    "highscores"
                ) 
            ) || []; 
        let newScore = { 
            score: time, 
            name: name, 
        }; 
        highscores.push(newScore); 
        window.localStorage.setItem( 
            "highscores", 
            JSON.stringify(highscores) 
        ); 
        alert( 
            "Your Score has been Submitted"
        ); 
    } 
} 
// check for Enter key press and save high score
function checkForEnter(event) { 
    if (event.key === "Enter") { 
        saveHighscore(); 
        alert( 
            "Your Score has been Submitted"
        ); 
    } 
} 

// Attach event listeners
nameEl.onkeyup = checkForEnter;  
  
submitBtn.onclick = saveHighscore;  
  
startBtn.onclick = quizStart;
