const RANGE = 100;
const GENBUT = document.getElementById("genNumber");
let hint = document.getElementsByClassName("hint-box")[0];
let guess;
let numGuess;

if(localStorage.numHolder){
    numGuess = localStorage.numHolder;
}

GENBUT.addEventListener("click", function(){
    let num=Math.floor(Math.random()* (RANGE - 1) + 1);
    numGuess = num;
    localStorage.numHolder = numGuess;
});

function userInput(){
    event.preventDefault();
    let formData = $("form").serializeArray();
    guess = formData[0].value;

    if (guess == numGuess){
        hint.innerText = "YOU WIN!!!!!";
    }else{
        checkGuess();
    }
}

function checkGuess(){
    if(guess < numGuess){
        let numOff = numGuess - guess;
        if(numOff <= RANGE * .10){
            hint.innerText = "Very close. A little higher!";
        }else if (numOff > RANGE * .10 && numOff < RANGE * .25) {
            hint.innerText = "You're getting there! Higher!"
        }else if (numOff > RANGE * .25 && numOff < RANGE * .5) {
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
        }else if (numOff > RANGE * .25 && numOff < RANGE * .5) {
            hint.innerText = "Lower!";
        }else{
            hint.innerText = "You're quite a bit high...";
        }
    }
}
