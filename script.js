const RANGE = 100;
const GENBUT = document.getElementById("genNumber");
let hint = document.getElementsByClassName("hint-box")[0];
let guess;
let numGuess;
let score;

//if a number exists from a previous session, the number will remain the same
if(localStorage.numHolder){
    numGuess = parseInt(localStorage.numHolder);
}

//generates number from 1 to the given range
GENBUT.addEventListener("click", function(){
    let num=Math.floor(Math.random()* (RANGE - 1) + 1);
    numGuess = num;
    localStorage.numHolder = numGuess;
});

//turns the user's guess into a variable and checks if they won or not
function userInput(){
    event.preventDefault();
    let formData = $("form").serializeArray();
    guess = parseInt(formData[0].value);

    if (guess == numGuess){
        hint.innerText = "YOU WIN!!!!!";
    }else{
        checkGuess();
    }
}

//gives hints based on if the user's distance from the answer in percentages
function checkGuess(){
    if (guess < numGuess){
        let numOff = numGuess - guess;
        if(numOff <= RANGE * .10){
            hint.innerText = "Very close. A little higher!";
        }else if (numOff > RANGE * .10 && numOff < RANGE * .25) {
            hint.innerText = "You're getting there! Higher!"
        }else if (numOff >= RANGE * .25 && numOff < RANGE * .50) {
            hint.innerText = "Higher!";
        }else{
            hint.innerText = "You're quite a bit low...";
        }
    }else{
        let numOff = guess - numGuess;
        if(numOff <= RANGE * .10){
            hint.innerText = "Very close. A little lower!";
        }else if (numOff > RANGE * .10 && numOff < RANGE * .25) {
            hint.innerText = "You're getting there! Lower!"
        }else if (numOff >= RANGE * .25 && numOff < RANGE * .50) {
            hint.innerText = "Lower!";
        }else{
            hint.innerText = "You're quite a bit high...";
        }
    }
}
