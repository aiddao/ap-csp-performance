const RANGE = 100;
const GENBUT = document.getElementById("genNumber");
let guess;
let numGuess;
let scoreBox = document.getElementById("score-box");
let score = 0;

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
let hint;
//turns the user's guess into a variable and checks if they won or not
function userInput(){
    event.preventDefault();
    let hintBox = document.getElementById("hint-box");
    let num = hintBox.childElementCount + 1;
    let formData = $("form").serializeArray();
    if (formData[0].value == ""){
        formData[0].value = 0;
    }
    console.log(num);
    score = num;
    guess = parseInt(formData[0].value);
    hint = document.createElement("div");
    hintBox.insertBefore(hint, hintBox.firstChild);
    if (guess == numGuess){
        hint.innerText = "YOU WIN!!!!!";
    }else{
        checkGuess(num);
    }
}

//checks how far off the guess is from the answer
function checkCondition(a, b , c, d, e, num){
    if(e <= RANGE * .10){
        hint.innerText = num + ". "+ a;
    }else if (e > RANGE * .10 && e < RANGE * .25) {
        hint.innerText = num + ". "+ b;
    }else if (e >= RANGE * .25 && e < RANGE * .50) {
        hint.innerText = num + ". "+ c;
    }else{
        hint.innerText = num + ". "+ d;
    }
}

//gives hint messages based on if the user is higher or lower than the answer
function checkGuess(li){
    if (guess < numGuess){
        let numOff = numGuess - guess;
        checkCondition("Very close. A little higher!", "You're getting there! Higher!", "Higher!", "You're quite a bit low...", numOff, li);
    }else{
        let numOff = guess - numGuess;
        checkCondition("Very close. A little lower!", "You're getting there! Lower!", "Lower!", "You're quite a bit high...", numOff, li);
    }
}

