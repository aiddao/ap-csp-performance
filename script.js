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

//checks how far off the guess is from the answer
function checkCondition(a, b , c, d, e){
    if(e <= RANGE * .10){
        hint.innerText = a;
    }else if (e > RANGE * .10 && e < RANGE * .25) {
        hint.innerText = b;
    }else if (e >= RANGE * .25 && e < RANGE * .50) {
        hint.innerText = c;
    }else{
        hint.innerText = d;
    }
}

//gives hint messages based on if the user is higher or lower than the answer
function checkGuess(){
    if (guess < numGuess){
        let numOff = numGuess - guess;
        checkCondition("Very close. A little higher!", "You're getting there! Higher!", "Higher!", "You're quite a bit low...", numOff)
    }else{
        let numOff = guess - numGuess;
        checkCondition("Very close. A little lower!", "You're getting there! Lower!", "Lower!", "You're quite a bit high...", numOff)
    }
}

