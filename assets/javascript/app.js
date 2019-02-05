// question and answer variables
var triviaQuestions = [
    "What is Earth's largest continent?",
    "What is the flattest continent?",
    "Which country has the most coastline?",
    "What is the largest country in South America?",
    "What city is the capital of Australia?",
    "What is the deepest point in Earth's oceans?",
    "What is the only continent with land in all four hemispheres?",
    "What U.S. state shares borders with Louisiana, Arkansas, Oklahoma, and New Mexico?",
];
    console.log(triviaQuestions[2])

var possibleAnswers=[
    ["Africa","Antartica","Asia","Europe"],
    ["Africa","Antartica","Australia","South America"],
    ["Canada","China","Russia","United States"],
    ["Argentina","Brazil","Columbia","Peru"],
    ["Canberra","Perth","Melbourne","Sydney" ],
    ["Eurasion Basin","Java Trench","Mariana Trench","Tonga Trench"],
    ["Africa","Antartica","Asia","Australia"],
    ["Colorado","Kansas","Missouri","Texas"],
];
    console.log(possibleAnswers[2])

var correctAns=[
    "Asia",
    "Australia",
    "Canada",
    "Brazil",
    "Canberra",
    "Mariana Trench",
    "Africa",
    "Texas",
];
    console.log(correctAns[2])

var startScreen;
var gameHTML;
var timeCounterStart = 25; //25 seconds to select answer
var wins = 0;
var losses = 0;
var timesUp = 0;
var questionCounter = 0;
var selecterAns;
var timer;

// var p1= $(<p>).

function timerRunsOut(){
    timesUp++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timeDisplay'>" + timeCounterStart + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAns[questionCounter] + "</p>";
	$(".gameArea").html(gameHTML);
    setTimeout(wait, 2500);
    

}

function youWereCorrect(){
    wins++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timeDisplay'>" + timeCounterStart + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAns[questionCounter] + "</p>";
	$(".gameArea").html(gameHTML);
	setTimeout(wait, 2500);
}

function youWereWrong(){
    losses++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timeDisplay'>" + timeCounterStart + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAns[questionCounter] + "</p>";
	$(".gameArea").html(gameHTML);
	setTimeout(wait, 2500);
}

function generateHTML(){
    gameHTML = "<h4 class='text-center timer-p'>Time Remaining: <span class='timeDisplay'>25</span></h4><p class='text-center'>" + triviaQuestions[questionCounter] + "</p><p class='first-answer answer'>" + possibleAnswers[questionCounter][0] + "</p><p class='answer'>"+possibleAnswers[questionCounter][1]+"</p><p class='answer'>"+possibleAnswers[questionCounter][2]+"</p><p class='answer'>"+possibleAnswers[questionCounter][3]+"</p>";
	$(".gameArea").html(gameHTML);
}

function wait(){
    if(questionCounter < 7){
        questionCounter++;
        generateHTML();
        timeCounterStart = 25;
        timerWrapper();
    }
    else{
        finalScreen();
    }
}

function timerWrapper(){
    timer = setInterval(twentyFiveSeconds, 1000);
    function twentyFiveSeconds(){
        if (timeCounterStart === 0){
            clearInterval(timer);
            timerRunsOut();
        }
        if (timeCounterStart > 0){
            timeCounterStart--;
        }
        $(".timeDisplay").html(timeCounterStart);
    }
}

function finalScreen(){
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timeDisplay'>" + timeCounterStart + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + wins + "</p>" + "<p>Wrong Answers: " + losses + "</p>" + "<p>Unanswered: " + timesUp + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".gameArea").html(gameHTML);
        // if (wins > 7){
        //     gameHTML = 
        // }
}

function resetGame(){
    questionCounter = 0;
    wins = 0;
    losses = 0;
    timesUp = 0;
    timeCounterStart = 25;
    generateHTML();
    timerWrapper();
}

$(document).ready(function(){

//creating start button and initial screen before game
function initialScreen(){
    startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Game</a></p>";
    $(".gameArea").html(startScreen);
}
    initialScreen();

//creating a function to create generateHTML(), that executes after pressing the start button and generates the game display
$("body").on("click",".start-button", function(event){
    generateHTML();

    timerWrapper();
    
});

$("body").on("click", ".answer", function(event){
    selecterAns = $(this).text();
    if(selecterAns === correctAns[questionCounter]) {
        clearInterval(timer);
        youWereCorrect();
    }
    else{
        clearInterval(timer);
        youWereWrong();
    }
});

$("body").on("click", ".reset-button", function(event){
    resetGame();
});
    
});

