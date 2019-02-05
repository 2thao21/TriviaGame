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
var timeCounterStart = 25; //25 second timer to select answer
var wins = 0;
var losses = 0;
var timesUp = 0;
var questionCounter = 0;
var selecterAns;
var timer;

// var p1= $(<p>).

function timerRunsOut(){
    timesUp++;
    gameHTML = "<h4 class='text-center timer-p'>Time Remaining: <span class='timeDisplay'>" + timeCounterStart + "</span></h4>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAns[questionCounter] + "</p>";
	$(".gameArea").html(gameHTML);
    setTimeout(wait, 2500);
    

}

function youWereCorrect(){
    wins++;
    gameHTML = "<h4 class='text-center timer-p'>Time Remaining: <span class='timeDisplay'>" + timeCounterStart + "</span></h4>" + "<p class='text-center'>Correct! The answer is: " + correctAns[questionCounter] + "</p>";
	$(".gameArea").html(gameHTML);
	setTimeout(wait, 2500);
}

function youWereWrong(){
    losses++;
    gameHTML = "<h4 class='text-center timer-p'>Time Remaining: <span class='timeDisplay'>" + timeCounterStart + "</span></h4>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAns[questionCounter] + "</p>";
	$(".gameArea").html(gameHTML);
	setTimeout(wait, 2500);
}

// creating game play html after start button has been clicked
function generateHTML(){
    gameHTML = "<h4 class='text-center timer-p'>Time Remaining: <span class='timeDisplay'>25</span></h4><p class='text-center'>" + triviaQuestions[questionCounter] 
    + "</p><p class='first-answer answer'>" + possibleAnswers[questionCounter][0] 
    + "</p><p class='answer'>"+possibleAnswers[questionCounter][1]
    + "</p><p class='answer'>"+possibleAnswers[questionCounter][2]
    + "</p><p class='answer'>"+possibleAnswers[questionCounter][3]+"</p>";

	$(".gameArea").html(gameHTML);
}

// ingame counter to continue through all questions
function wait(){
    if(questionCounter < 7){
        questionCounter++;
        generateHTML();
        timeCounterStart = 25;
        countDownLoop();
    }
    else{
        finalScreen();
    }
}

// creating timer countdown from 25 secs to 0
function countDownLoop(){
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

// creating finalScreen to display results
function finalScreen(){
    gameHTML = "<h4 class='text-center timer-p'>Time Remaining: <span class='timeDisplay'>" 
    + timeCounterStart + "</span></h4>" 
    + "<h5 class='text-center'>Finished! Let's see how you did!" + "</h5>" 
    + "<p class='summary-correct'>Correct Answers: " + wins + "</p>" 
    + "<p>Wrong Answers: " + losses + "</p>" 
    + "<p>Time ran out, unanswered: " + timesUp + "</p>" 
    + "<p class='text-center reset-button-container'><a class='btn btn-danger btn-lg btn-block reset-button' href='#' role='button'>Play Again</a></p>";
    
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
    countDownLoop();
}

$(document).ready(function(){

//creating start button and initial screen before game
function initialScreen(){
    startScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-lg btn-block start-button' href='#' role='button'>Start Game</a></p>";
    $(".gameArea").html(startScreen);
}
    initialScreen();

//game action when start button is clicked, game starts as new html section in body is displayed.
$("body").on("click",".start-button", function(event){
    generateHTML();

    countDownLoop();
    
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

// Would have loved to add more to make the game more interesting. Didn't get to spend as much time as i would have liked.