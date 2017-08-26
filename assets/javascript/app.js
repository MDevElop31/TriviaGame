function startScreen() {
	newDiv = "<p>Point your wand at the stupefy button and press to begin.</p>" + "<button type='button' class='btn btn-primary btn-lg start'>Stupefy!</button>";
	$("#changingScreen").html(newDiv);
}

$(document).ready(function() {

	startScreen();

});

var startScreen;

var triviaHTML;

var counter = 15;

var questionArray = ["What is the best drink at Hogsmeade?", "Which of the following names does not belong?", "Which Hogwarts House is Cho Chang a member of?", "Which of the following is not an unforgiveable curse?", "What is the only antidote to basilisk venom?", "How many movies are in the Harry Potter series?", "What does Professor Lupin give Harry to eat after his encounter with a Dementor?", "What type of car is Mr. Weasley's flying car?"];

var answerArray = [["Bitter Beer", "Better Beer", "Butter Beer", "Batter Beer"], ["Prongs", "Roony", "Padfoot", "Wormtail"], ["Ravenclaw", "Hufflepuff", "Gryffindor", "Slytherin"], ["Sectumsempra", "Crucio", "Avada Kedavra", "Imperio"], ["A Bezoar", "Dragon's Blood", "Mandrake Draught", "Phoenix Tears"], ["6", "7", "8", "9"], ["Boiled Sweets", "Ice Cream", "Sherbet", "Chocolate"], ["Ferrari", "Volkswagen Beetle", "Ford Anglia", "Rolls Royce"]];

var correctAnswers = ["C. Butter Beer", "B. Roony", "A. Ravenclaw", "A. Sectumsempra", "D. Phoenix Tears", "C. 8", "D. Chocolate", "C. Ford Anglia"];

var questionCounter = 0;

var userAnswer;

var theClock;

var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;

$(document).on("click", ".start", function(){
	generateHTML();
	timeRemaining();

}); 

$(document).on("click", ".answer", function(){
	userAnswer = $(this).text();
	if(userAnswer === correctAnswers[questionCounter]) {

		clearInterval(theClock);
		generateWin();
	}
	else {
		
		clearInterval(theClock);
		generateLoss();
	}
}); 

$(document).on("click", ".reset-button", function(){
	resetGame();
}); 

function generateLossDueToTimeOut() {
	numUnanswered++;
	triviaHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time up!  You will never pass your OWLs at this rate!</p>";
	$("#changingScreen").html(triviaHTML);
	setTimeout(wait, 3000);
}

function generateWin() {
	numCorrect++;
	triviaHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
	$("#changingScreen").html(triviaHTML);
	setTimeout(wait, 3000);
}

function generateLoss() {
	numIncorrect++;
	triviaHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! 50 points from Gryffindor!</p>";
	$("#changingScreen").html(triviaHTML);
	setTimeout(wait, 3000);
}

function generateHTML() {
	triviaHTML = "<p class='text-center'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$("#changingScreen").html(triviaHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 15;
	timeRemaining();
	}
	else {
		finalScreen();
	}
}

function timeRemaining() {
	theClock = setInterval(fifteenSeconds, 1000);
	function fifteenSeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	triviaHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + numCorrect + "</p>" + "<p>Wrong Answers: " + numIncorrect + "</p>" + "<p>Unanswered: " + numUnanswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play Again!</a></p>";
	$("#changingScreen").html(triviaHTML);
}

function resetGame() {
	questionCounter = 0;
	numCorrect = 0;
	numIncorrect = 0;
	numUnanswered = 0;
	counter = 15;
	generateHTML();
	timeRemaining();
}
