const RANGE = 100;
const GENBUT = document.getElementById("genNumber");
const HINTBOX = document.getElementById("hint-box");
let guess;
let numGuess;
let scoreBox = document.getElementById("score-box");
let high = document.getElementById("high-score");
let gameForm = document.getElementById("game-form");
let hintzList = [];
let scoreList;
let highScore = "";
let num;
let hint;
let time;
let timeScore = 0;

if(localStorage.hintz){
    hintzList = JSON.parse(localStorage.hintz);
    for(i = 0, len = hintzList.length; i < len; i++){
        let div = document.createElement("div");
        div.innerText = hintzList[i];
        HINTBOX.insertBefore(div, HINTBOX.firstChild);
    }
}
if(localStorage.scorez){
    score = JSON.parse(localStorage.scorez);
    scoreBox.innerHTML = "Previous Score: " + score;
}

if(localStorage.highScore){
    highScore = parseInt(JSON.parse(localStorage.highScore));
    high.innerText = highScore;
}

//if a number exists from a previous session, the number will remain the same
if(localStorage.numHolder){
    numGuess = parseInt(localStorage.numHolder);
}

if(localStorage.color){
    let data = JSON.parse(localStorage.color);
    console.log(data);
    document.body.setAttribute("style", "background-color:" + data[0].value + "; color:" + data[1].value + ";");
}

function customize(){
    event.preventDefault();
    let formData = $("form").serializeArray();
    document.body.setAttribute("style", "background-color:" + formData[0].value + "; color:" + formData[1].value + ";");
    localStorage.setItem("color", JSON.stringify(formData));
}

let desc = document.getElementById("descriptor");
desc.innerText = RANGE;

//generates number from 1 to the given range
GENBUT.addEventListener("click", function(){
    if(localStorage.numHolder){
        alert("There is already a generated number!!");
    } else {
    let number=Math.floor(Math.random()* (RANGE - 1) + 1);
    numGuess = number;
    localStorage.numHolder = numGuess;
    alert("Number Generated");
    }
    time = setInterval(function(){

    }, 10000)
});

//turns the user's guess into a variable and checks if they won or not
function userInput(){
    event.preventDefault();
    if(localStorage.numHolder){
    num = HINTBOX.childElementCount;
    scoreBox.innerText = "Current Score: " + num;
    localStorage.setItem("scorez", JSON.stringify(num));
    let formData = $("form").serializeArray();
    if (formData[2].value == ""){
        formData[2].value = 0;
    }
    guess = parseInt(formData[2].value);
    hint = document.createElement("div");
    HINTBOX.insertBefore(hint, HINTBOX.firstChild);
    winCondition(guess, numGuess, num);
} else {
    alert("You have no number to guess");
}
}
//checks how far off the guess is from the answer
function checkCondition(closeMsg, almostMsg, midMsg, wayOffMsg, amtOff){
    if(amtOff <= RANGE * .10){
        hint.innerText = num + ". "+ closeMsg + "["+guess+"]";
    }else if (amtOff > RANGE * .10 && amtOff < RANGE * .25) {
        hint.innerText = num + ". "+ almostMsg + "["+guess+"]";
    }else if (amtOff >= RANGE * .25 && amtOff < RANGE * .50) {
        hint.innerText = num + ". "+ midMsg + "["+guess+"]";
    }else{
        hint.innerText = num + ". "+ wayOffMsg + "["+guess+"]";
    }
}

//gives hint messages based on if the user is higher or lower than the answer
function checkGuess(){
    let numOff = Math.abs(numGuess - guess);
    if (guess < numGuess){
        checkCondition("Very close. A little higher! ", "You're getting there! Higher! ", "Higher! ", "You're quite a bit low ", numOff);
    }else{
        checkCondition("Very close. A little lower! ", "You're getting there! Lower! ", "Lower! ", "You're quite a bit high ", numOff);
    }
}

function winCondition(userGuess, winValue, curScore){
    if (userGuess == winValue){
        alert("YOU WIN!!! Answer: "+winValue+" | Score: " + curScore);
        localStorage.removeItem("hintz");
        localStorage.removeItem("numHolder");
        if(highScore == ""){
            highScore = 0;
            localStorage.setItem("highScore", JSON.stringify(curScore));
        }else if(highScore > curScore){
            localStorage.setItem("highScore", JSON.stringify(curScore));
        }
        location.reload();
    }else{
        checkGuess();
        let hintz = HINTBOX.firstElementChild;
        hintzList.push(hintz.innerText);
        localStorage.setItem("hintz", JSON.stringify(hintzList));
    }
}
