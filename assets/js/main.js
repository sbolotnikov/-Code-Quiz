// Assignment Code

var secondsLeft = 75;
var ResultTime = 0;
var pos = 0;
var initials;
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
var arrCorrect = ["alerts", "parentheses", "Everything listed", "quotes", "console.log", "yes, true"];
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
    document.querySelector(".card-footer").appendChild(tagNew);

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
    tagH.setAttribute("class", "inputstyle");
    tagH.setAttribute("name", "initials");
    document.querySelector("#quizID").appendChild(tagH);
    tagH = document.createElement("button");
    tagH.setAttribute("class", "btn");
    tagH.setAttribute("onclick", "highResults()");
    tagH.innerHTML = "Submit";
    document.querySelector(".card-footer").appendChild(tagH);
    var tagH = document.querySelector(".time");
    tagH.innerHTML = "";
}
function highResults(){
    var ini=document.getElementsByName("initials").innerHTML;
    // alert(ini);

    // var openFile=fopen(getFilePath(),0);

// readString = fread(openFile,flength(file) ;
// editFile = fopen("c:\MyNewFile.txt", 3);
// opens the file for writing
// fwrite(file, str);
// str is the content that is to be written into the file.

// editFile = fopen("c:\MyNewFile.txt", 3);
// opens the file for writing
// fwrite(file, str);
// str is the content that is to be written into the file.
}

function ClearCard() {
    var tagH = document.getElementsByTagName("h2")[0];
    tagH.parentNode.removeChild(tagH);
    var tagH = document.querySelector("#quizID");
    tagH.innerHTML = "";
    var tagH = document.querySelector(".card-footer");
    tagH.innerHTML = "";
}

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
            if ((ResultTime!==0)||(secondsLeft<0)) {
                clearInterval(timerInterval);
            }
        }, 1000);
    }
    function sendMessage() {
        timeEl.textContent = " ";
        alert('Time runs out! Try again!');
    }
    setTime();
    var qSelect = new Question(arrAnswers[quesNum], arrQuestions[quesNum], arrCorrect[quesNum])
    quesNum += 1;
    qSelect.questionOut();
}

var generateBtn = document.querySelector("#generate");
// Add event listener to generate button
// WHEN I click the button to generate a quiz
// generateBtn.addEventListener("click", ResultsForm(55));
generateBtn.addEventListener("click", generateQuiz);
