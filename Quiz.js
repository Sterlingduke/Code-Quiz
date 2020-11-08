
// This code will run as soon as the page loads
window.onload = function() {
  $(".play").on("click", triviaGame.startGame); 
  $(".restart").on("click", triviaGame.reset);
};

//  Variable that will hold our setInterval that runs the timer
var intervalId;

// prevents the clock from being speding u unwanted
var clockRunning = false;
var time = 10;
var questionCount = 0;
var score = 0;
var gifPick = Math.floor(Math.random() * 5);

var gifArray = ["Assets/ddd.gif","Assets/dab-bill.gif","Assets/bill-arm.gif","Assets/happy steve.gif","Assets/steve-jobs.gif"]

var triviaGame = {

  qaArray: [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: ["<scripting>", "<javascript>", "<script>", "<js>"],
      correct: "<script>",
    },{
      question: "Where is the correct place to insert Javascript?",
      answers: ["Both the <head> section and the <body> section are correct", "The <body> section", "The <head> section", "Inside Css File"],
      correct: "Both the <head> section and the <body> section are correct",
    },{
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      answers: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", ""],
      correct: "<script href='xxx.js'>",
    },{
      question: "The external JavaScript file must contain the <script> tag.",
      answers: ["True", "false", "truth", "falsey"],
      correct: "false",
    },{
      question: "How do you write 'Hello World' in an alert box?",
      answers: ["msg('helloworld')", "alertBox('Hello World');", "msgBox('Hello World')", "alert('Hello World');"],
      correct: "alert('Hello World');",
    },{
      question: "How do you call a function named 'myFunction'?",
      answers: ["call myFunction()", "myFunction()", "call Function myFunction()", "myFunction{}"],
      correct: "myFunction()",
    },{
      question: "How to write an IF statement in JavaScript?",
      answers: ["if i == then", "if i = 5", "if (i == 5)", "if i =5 then"],
      correct: "if (i == 5)",
    },{
      question: "How does a WHILE loop start?",
      answers: ["while (i <= 10)", "while (i,+10; i++)", "while i = 1 to 10", "none"],
      correct: "while (i <= 10)",
    },{
      question: "How can you add a comment in a JavaScript?",
      answers: ["This is a comment", "comment", "//This is a comment", "//!--This is a comment-->"],
      correct: "//!<--This is a comment-->",
    },{
      question: "Do you like Bill or Steve Better?",
      answers: ["Steve", "Bill", "Tim", "Equal"],
      correct: "Equal",
    }
  ],

  startGame: function() {
    questionCount = 0;
    score = 0;
    if (!clockRunning) {
      intervalId = setInterval(triviaGame.count, 1000);
      clockRunning = true;
    }

    $("#intro").hide();
    $("#game").show();
    $("#question").text(triviaGame.qaArray[questionCount].question);
    triviaGame.renderAnswers();
    $("#scoreBox").text("Score: " + score);

  },

  renderAnswers: function() {

    $("#answers").empty();
    for (var i = 0; i < 4; i++) {
      var a = $("<button>");
      a.addClass("answer-btn");
      a.attr("data-name", triviaGame.qaArray[questionCount].answers[i]);
      a.text(triviaGame.qaArray[questionCount].answers[i]);
      $("#answers").append(a); 
    }
  },

  checkAnswer: function() {

      triviaGame.random();

      var answer = $(this).attr("data-name");
      var correct = (triviaGame.qaArray[questionCount].correct);

      var happyGif = $("<img>").attr("src", gifArray[gifPick]);
      var sadGif = $("<img>").attr("src", "");



      if (answer === correct){
        score++;
        $("#scoreBox").text("Score: " + score);
        $("#result").append(happyGif);
        $("#game").hide();
        $("#resultBox").show();
        $("#resultText").text("Nice!");
       
        time=3;
      }
      else {
        $("#result").append(sadGif);
        $("#game").hide();
        $("#resultBox").show();
        $("#resultText").text("Geez! The answer is "+ correct +".");
       
      }
    },

  nextQuestion: function() {

    if (questionCount === 9){
      triviaGame.stopGame();
    }
    else {
    $("#result").empty();
    $("#resultBox").hide();
    $("#game").show();
    questionCount++;
    $("#question").text(triviaGame.qaArray[questionCount].question);
    triviaGame.renderAnswers();
    }
  },

  stopGame: function() {
    $("#game").hide();
    $(".lead").text("You're "+score+"0% correct.")
    $("#intro").show();
    $("#result").empty();
    $("#resultBox").hide();
    $(".play").text("Play again.");
    $(".play").on("click", triviaGame.startGame);
  },

  count: function() {  

      time--;
      $("#timer").text("00:0" + time);
      if (time === 0) {
        time = 10;
        triviaGame.nextQuestion();
      }
    },

  reset: function() {
      time = 0;
      $("#timer").text("00:0" + time);
      clearInterval(intervalId);
      clockRunning = false;
  
    },

    random: function() {
      gifPick = Math.floor(Math.random() * 6);
    },
  
};


// Adding a click event listener to all elements with a class of "answer-btn"
$(document).on("click", ".answer-btn", triviaGame.random);
$(document).on("click", ".answer-btn", triviaGame.checkAnswer);

  