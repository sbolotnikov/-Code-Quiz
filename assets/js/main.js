// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write quiz to the #quizID input
function writeQuiz() {
    // GIVen a new Quiz starts
    var quiz = generateQuiz();
    var quizText = document.querySelector("#quizID");

    quizText.value = quiz;
}

// generateQuiz function should be below
function generateQuiz() {
    var timeEl = document.querySelector(".time");

    var secondsLeft = 75;

    function setTime() {
        var timerInterval = setInterval(function () {
            secondsLeft--;
            timeEl.textContent = secondsLeft + " seconds left";

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

    setTime();

}



// Add event listener to generate button
// WHEN I click the button to generate a password
generateBtn.addEventListener("click", writeQuiz);
