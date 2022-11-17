
var contentEL = document.querySelector('.content')
var button = document.getElementById('myBtn')
const quiz = document.getElementById("quiz");
const question = document.getElementById("question")
const choices = document.getElementById("choices")
const choiceA = document.getElementById("a")
const choiceB = document.getElementById("b")
const choiceC = document.getElementById("c")
const choiceD = document.getElementById("d")
var button = document.getElementById('myBtn')
var startQuiz = document.getElementById("startQuiz")
var result = document.getElementById("result")
var count = document.getElementById("count")
var initial = document.getElementById("initialPage")
var finalScore = document.getElementById("final-score")
var highScore = document.getElementById("highScoreList")
var initialForm = document.getElementById("initial-form")
var initialName = document.getElementById("initials")
var submitBtn = document.getElementById("SubmitBtn")
var HighscorePage = document.getElementById("HighscorePage")
var goBackBtnEl = document.getElementById("goBack")
var clearHighScore = document.getElementById("clearHighscore")
var viewScores = document.getElementById("view-scores")
var timerEl = document.querySelector("#timer");

//view high score button
viewScores.addEventListener("click", function () {
    startQuiz.style.display = "none";
    initial.style.display = "none";
    choices.style.display = "none";
    quiz.style.display = "none";
    HighscorePage.style.display = "block"
})



// start quiz function
button.addEventListener("click", function () {

    startQuiz.style.display = "none";
    quiz.style.display = "block";
    setTime()
})


//every second, check if time left is true. Start time at 30. 
var setTime = function () {
    timeleft = 30;

    var timercheck = setInterval(function () {
        timerEl.innerText = timeleft;
        timeleft--

        if (timeleft < 0) {
            clearInterval(timercheck)
            gameOver()
            finalScore.innerHTML = " Your final score is " + score + "."
            result.style.display = "block"
        }


    }, 1000)
}
// The array of questions  & answer for  quiz game.
var questions =
    [
        {
            question: "Commonly used data types Do not include; ",
            choiceA: " Strings ",
            choiceB: " booleans",
            choiceC: "alerts ",
            choiceD: " numbers",
            correct: "C"
        },


        {
            question: "The condition in an if / else statement is enclosed with _______. ",
            choiceA: " 1. quotes ",
            choiceB: "2. curly brackets",
            choiceC: "3. parenthesis ",
            choiceD: "4. square brackets",
            correct: "D"
        },


        {
            question: "Array in JavaScript can be used to store______ ",
            choiceA: " 1. numbers and strings ",
            choiceB: "2. other arrays",
            choiceC: "3. booleans ",
            choiceD: "4. all of the above",
            correct: "A"

        },


        {
            question: "String values must be enclosed with______ when being assigned to variables. ",
            choiceA: " 1. commans ",
            choiceB: "2. curly brackets",
            choiceC: "3. quotes ",
            choiceD: "4. parenthesis",
            correct: "B"
        },


        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
            choiceA: " 1. JavaScript ",
            choiceB: "2. terminal/bash",
            choiceC: "3. for loops ",
            choiceD: "4. console.log",
            correct: "C"
        },
        {
            question: "... ",
            choiceA: " ...",
            choiceB: "..",
            choiceC: "..",
            choiceD: "..",
            correct: ".."
        }

    ]



const lastQuestion = questions.length - 1;
var runningQuestion = 0;


function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<h2>" + q.question + "</h2>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;


}


renderQuestion()
var score = 0;
var list = [];
timerEl.textContent = 0


choices.addEventListener("click", function (event) {
    var element = event.target;


    if (element.matches("#a, #b, #c, #d")) {
        runningQuestion++;
        renderQuestion()
    }

    if (runningQuestion == 5) {
        gameOver()
        finalScore.innerHTML = " Your final score is " + score + "."
        result.style.display = "block"
    }

})
//check answer function 
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        //display correct! on screen
        score++;
        result.innerHTML = "Correct!"
    } else {
        //display wrong! on screen
        result.innerHTML = "Wrong!"
    }
}
// when all questions are answered , game over
function gameOver() {
    quiz.style.display = "none"
    initial.style.display = "block"

}

//The following function renders items in a list as <li> elements
function renderList() {


    // highScore.innerHTML = "";


    for (var i = 0; i < list.length; i++) {



        var li = document.createElement("li");
        highScore.appendChild(li);
        li.innerHTML = list[i].name + " - " + list[i].score;

    }

}



// This function is being called below and will run when the page loads.
function init() {

    // Get stored list from localStorage
    var storedlist = JSON.parse(localStorage.getItem("list"));
    //update the todos array 
    if (storedlist !== null) {
        list = storedlist;

    }

    renderList()



}

function storelist() {

    // Stringify and set key in localStorage to list array
    localStorage.setItem("list", JSON.stringify(list));

}

initialForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var nameList = {
        name: initialName.value.trim(),
        score: score,
    }


    // Add new initial to  array
    list.push(nameList);

    storelist();
    renderList();

})


//submit button for initials page
submitBtn.addEventListener("click", function () {
    initial.style.display = "none";
    HighscorePage.style.display = "block"
    highScore.innerHTML = "";




})

//if go back button is hit on high score page
goBackBtnEl.addEventListener("click", function () {
    HighscorePage.style.display = "none"
    window.location.replace("./index.html");


})

//clear high score button on high score page
clearHighScore.addEventListener("click", function () {
    localStorage.clear();
    highScore.innerHTML = "";
})

init()