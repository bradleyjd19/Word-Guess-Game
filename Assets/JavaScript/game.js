//
// Create an array of words for the game
//
var gameWords = ["dude", "walter", "donny", "nihilist", "lebowski", "bowling", "bunny", "brandt", "jesus", "caucasian", "rug", "stranger"]

//
// Computer randomly picks word from array
//
var randGen = Math.floor(Math.random() * gameWords.length);
var chosenWord = gameWords[randGen];

var maxTries = 10;  //Number of allowable incorrect letter guesses
var wordLength = chosenWord.length;  //# of characters in chosen word
var userGuessCorrect = [];  //Array for correctly guessed letters
var userGuessWrong = [];  //Array for inocorrectly guessed letters
var underScore = [];  //Array for storing blank spaces, # based on chosen word length
var wins = 0;  //Wins Counter
var losses = 0;  //Losses Counter

//
// Computer displays blank spaces to match length of chosen word
//
console.log(chosenWord);

function makeBlanks() {
  for (var i = 0; i < wordLength; i++) {
    underScore.push("_");
  }
  return underScore;
};

function gameWin() {
  wins++;
  document.getElementById("gameEnd").innerHTML = "FAR OUT MAN!";
  var audioLose = new Audio();
  audioLose.src = "./Assets/Sounds/LikeStyle.mp3";
  audioLose.play();  
}

function gameOver() {
  losses++;
  document.getElementById("gameEnd").innerHTML = "OVER THE LINE!!!";
  var audioLose = new Audio();
  audioLose.src = "./Assets/Sounds/OverTheLine.wav";
  audioLose.play();
}

console.log(makeBlanks());

document.getElementById("currentWord").innerHTML = underScore.join(" ");

// 
// Create user event - keying letters
// 
document.onkeydown = function (event) {
  var keyLetter = String.fromCharCode(event.keyCode);
  var keyLittle = keyLetter.toLowerCase();

  // 
  // Determine if letter is part of chosen word
  // 
  var keyIndex = chosenWord.indexOf(keyLittle);

  if (keyIndex > -1 && underScore.indexOf("_") >=0) {
    userGuessCorrect.push(keyLittle);
    underScore[keyIndex] = keyLittle;
    for (var i = 0; i < wordLength; i++) {
      var currentLetter = chosenWord[i];
      if (currentLetter === keyLittle) {
        underScore[i] = keyLittle.toUpperCase();
        if (underScore.indexOf("_") < 0) {
          gameWin();
        }
      }
    }
    document.getElementById("currentWord").innerHTML = underScore.join(" ");
  }  
  else {
    if (userGuessWrong.indexOf(keyLittle) < 0 && maxTries > 0 && underScore.indexOf("_") >= 0) {
      userGuessWrong.push(keyLittle);
      maxTries--;
      console.log(userGuessWrong);
      if (maxTries === 0) {
        gameOver();
      }
      console.log(maxTries);
    }
  }
  
  document.getElementById("guessedLetters").innerHTML = userGuessWrong.join(" ");

};






// If correct, replace blank space with letter
// If incorrect, place letter in incorrect bank
// If word is completed by user, increment wins
// If letter guesses are exhausted, add to losses