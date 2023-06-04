const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice"));
let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
  {
    question: "Inside which HTML element do we put JavaScript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question: "What does CSS stand for?",
    choice1: "Cascading Style Sheets",
    choice2: "Creative Style Sheets",
    choice3: "Computer Style Sheets",
    choice4: "Colorful Style Sheets",
    answer: 1
  },
  {
    question: "Which property is used to change the background color of an element?",
    choice1: "color",
    choice2: "background-color",
    choice3: "background",
    choice4: "bgcolor",
    answer: 2
  }
  // Add more questions in the same format if needed
];
//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // End the game if there are no more questions or the maximum limit is reached
    // You can add code here to show the final score or perform any other actions
    console.log("Game over. Final score:", score);
    return;
  }

  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice, index) => {
    const choiceNumber = index + 1;
    choice.innerText = currentQuestion['choice' + choiceNumber];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswer = true;
}

function checkAnswer(selectedChoice) {
  if (!acceptingAnswer) return;

  acceptingAnswer = false;
  const selectedAnswer = parseInt(selectedChoice.dataset['number']);

  const classToApply =
    selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

  if (classToApply === 'correct') {
    incrementScore(CORRECT_BONUS);
  }

  selectedChoice.classList.add(classToApply);

  // Delay before moving to the next question
  setTimeout(() => {
    selectedChoice.classList.remove(classToApply);
    getNewQuestion();
  }, 1000);
}

function incrementScore(points) {
  score += points;
}

startGame();
