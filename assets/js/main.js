// Assignment Code

var secondsLeft = 75;
var ResultTime = 0;
var pos = 0;
var call_next = false;
var arrQuestions = ["Commonly used data types DO NOT include:",
    "The conditions in an if/else statement is enclosed with _____.",
    "Arrays in JavaScript can be used to store______.",
    "String values must be enclosed within _____when being assigned to variables ",
    "A very usefull tool used during development and debugging for printing content to thedebugger is:",
    "Is the sky blue?"];
var arrAnswers = [["strings", "booleans", "numbers"],
["quotes", "curly brackets", "square brakets"],
["numbers and strings", "other arrays", "boolean"],
["commas", "curly brackets", "parentheses"],
["Javascript", "terminal/bash", "for loops"],
["False", "Don't know ask Bob"]];
var arrCorrect = ["alerts", "parentheses", "All above", "quotes", "console.log", "yes, true"];
var quesNum = 0;


class Question {
    constructor(a, q, c) {
        this.answers = a;
        this.question = q;
        this.correctanswer = c;
    }
    // getter
    get ask() {
        return this.questionOut();
    }
    // Method
    questionOut() {
        // get random position for the correct answer
        pos = Math.floor(Math.random() * (this.answers.length + 1));
        var order = 0;
        var tagH;
        ClearCard();
        tagH = document.createElement("h2");
        tagH.innerHTML = this.question;
        document.querySelector(".card-header").appendChild(tagH);
        for (var i = 0; i < this.answers.length + 1; i++) {
            tagH = document.createElement("button");
            if (i === pos) {
                tagH.innerHTML = (i + 1) + ". " + this.correctanswer;
            }
            else {
                tagH.innerHTML = (i + 1) + ". " + this.answers[order];
                order++;
            }
            tagH.setAttribute("class", "btnAnswer");
            tagH.setAttribute("onClick", "answerClk(" + i + ")")
            document.querySelector("#quizID").appendChild(tagH);
        }

        return true
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function answerClk(n) {
    var tagNew = document.createElement("figure");
    tagNew.setAttribute("class", "NoteBelow");
    if (n === pos) {
        tagNew.innerHTML = "Correct";
    }
    else {
        tagNew.innerHTML = "Wrong";
        // if wrong then 10 seconds less
        secondsLeft -= 10;

    }
    document.querySelector("#quizID").appendChild(tagNew);

    tagNew = document.querySelectorAll(".btnAnswer");
    console.log(tagNew)
    for (var i = 0; i < tagNew.length; i++) {
        tagNew[i].style.opacity = 0.6;
        tagNew[i].onclick = '';
    }
    var qSelect = new Question(arrAnswers[quesNum], arrQuestions[quesNum], arrCorrect[quesNum])
    if (quesNum < arrCorrect.length) {
        quesNum += 1;
        sleep(1000).then(() => { qSelect.questionOut(); }); // wait a 1 second before goes to next question
    }
    else {
        ResultTime = secondsLeft;
        ResultsForm(secondsLeft);
    }

}
function ResultsForm(sec) {
    ClearCard();
    var tagH = document.createElement("h2");
    tagH.innerHTML = "All done!";
    document.querySelector(".card-header").appendChild(tagH);
    tagH = document.createElement("h4");
    tagH.innerHTML = "Your final score:" + sec;
    document.querySelector("#quizID").appendChild(tagH);
    tagH = document.createElement("label");
    tagH.innerHTML = "Enter initials:";
    document.querySelector("#quizID").appendChild(tagH);
    tagH = document.createElement("input");
    document.querySelector("#quizID").appendChild(tagH);
    tagH = document.createElement("button");
    tagH.innerHTML = "Submit";
    document.querySelector("#quizID").appendChild(tagH);
{/* <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"></input> */}
}

function ClearCard() {
    var tagH = document.getElementsByTagName("h2")[0];
    tagH.parentNode.removeChild(tagH);
    var tagH = document.querySelector("#quizID");
    tagH.innerHTML = "";
}
// Write quiz to the #quizID input
// function writeQuiz() {
//     // GIVen a new Quiz starts
//     var quiz = generateQuiz();
//     var quizText = document.querySelector("#quizID");

//     quizText.value = quiz;
//     
// }

// generateQuiz function should be below
function generateQuiz() {
    var timeEl = document.querySelector(".time");



    function setTime() {
        var timerInterval = setInterval(function () {
            secondsLeft--;
            timeEl.textContent = secondsLeft;

            if ((secondsLeft === 0) && (ResultTime === 0)) {
                clearInterval(timerInterval);
                sendMessage();
            }

        }, 1000);
    }

    function sendMessage() {
        timeEl.textContent = " ";
        alert('time runout!');
    }
    // function Quiz() {
    //     // var qSelect[0] = new Question(["False", "Don't know"], "Is the sky blue?", "yes, true");
    //     var qSelect = new Question(["strings", "booleans", "numbers"], "Commonly used data types DO NOT include:", "alerts");

    //     qSelect.questionOut();
    // }
    setTime();
    // var arr=[
    //     {
    //        answers: {
    //            a: "strings",
    //            b: "booleans", 
    //            c:"numbers"  
    //         },
    //         question: "Commonly used data types DO NOT include:",
    //        correct: "alerts"
    //     },
    //     {
    //        answers: {
    //             a:"False", 
    //             b:"Don't know"  
    //         },
    //         question:"Is the sky blue?",
    //         correct:"yes, true"
    //     }
    // ];


    var qSelect = new Question(arrAnswers[quesNum], arrQuestions[quesNum], arrCorrect[quesNum])
    quesNum += 1;
    qSelect.questionOut();
    // while (!call_next) {
    //     c = 0;
    // }
    // call_next = false;

}

var generateBtn = document.querySelector("#generate");
// Add event listener to generate button
// WHEN I click the button to generate a quiz
generateBtn.addEventListener("click", generateQuiz);
