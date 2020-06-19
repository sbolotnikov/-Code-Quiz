// Assignment Code

var secondsLeft = 75;
var pos = 0;
var call_next = false;
var arrQuestions = ["Commonly used data types DO NOT include:", "Is the sky blue?"];
var arrAnswers = [["strings", "booleans", "numbers"], ["False", "Don't know"]];
var arrCorrect = ["alerts", "yes, true"];
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
        var tagH = document.getElementsByTagName("h2")[0];
        tagH.parentNode.removeChild(tagH);
        tagH = document.createElement("h2");
        tagH.innerHTML = this.question;
        document.querySelector(".card-header").appendChild(tagH);
        var tagH = document.querySelector("#quizID");
        tagH.innerHTML = "";
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
    quesNum += 1;
    var c = setTimeout(qSelect.questionOut(), 3000);
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

            if (secondsLeft === 0) {
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
