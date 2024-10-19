var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var level=0;
var gameStarted = false;

// Getting a random number
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    level++;
    //changing the h1 heading to level
    $("h1").text("Current Level " + level);
    return randomNumber;
}
// adding next random button.
function nextButton() {
    // Using random number to select a color from array
var randomChosenColor = buttonColors[nextSequence()];
gamePattern.push(randomChosenColor);

// Adding animation to the buttons
$("#" + randomChosenColor).animate({bottom: "+=10px"}, 100).animate({bottom: "-=10px"}, 100); // Pop effect
$("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

// Adding audio to the game
playAudio(randomChosenColor);
};

// Function to start the game and perform actions once
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        nextButton();
        // Unbind the keypress event after the first press
        $(document).off("keypress");
    }
}

// adding animation for clicks.
function animatePress(currentpress) {
    $("." + currentpress).addClass("pressed");
    // reverting back to original colors.
    setTimeout(function() {$("." + currentpress).removeClass("pressed"); }, 100);
}

//loking for clicks on buttons and adding next button

$(".btn").click(function (event) {
    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    playAudio(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
})

// function to check answers
function checkAnswer() {
    var userLastIndex = userClickedPattern.length - 1;
    if (gamePattern[userLastIndex] === userClickedPattern[userLastIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextButton();
                userClickedPattern = []; // Reset user pattern for the next level
            }, 1000);
        }
    } else {
        gameOver();
    }
}


//function to execute wehn game is over
function gameOver() {
    $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        playAudio("wrong");
        setTimeout(() => {
            $("body").removeClass("game-over"); 
        }, 350);
        resetGame();
        var wrongAudio= new Audio ('sounds/wrong.mp3')
        wrongAudio.play();
}

// function to reset game after failing
function resetGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStarted = false;
    // binding the keypress again
    $(document).keypress(function() {
        startGame();
    })
};


// Function for adding audio to the game.
function playAudio(color) {
    switch (color) {
        case "blue":
            var blueaudio = new Audio('sounds/blue.mp3');
            blueaudio.play();
            break;
        case "red":
            var redaudio = new Audio('sounds/red.mp3');
            redaudio.play();
            break;
        case "green":
            var greenaudio = new Audio('sounds/green.mp3');
            greenaudio.play();
            break;
        case "yellow":
            var yellowaudio = new Audio('sounds/yellow.mp3');
            yellowaudio.play();
            break;
        default:
            console.log("No audio for color: " + color);
            break;
    }
}

// Event listener for keypress to start the game
$(document).keypress(function() {
    startGame();
});