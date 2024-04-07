const RANGE = 100;
const GENBUT = document.getElementById("genNumber");
const HINTBOX = document.getElementById("hint-box");
let guess;
let numGuess;
let scoreBox = document.getElementById("score-box");
let high = document.getElementById("high-score");
let hintzList = [];
let scoreList;
let highScore = "";
let hint;

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
if(localStorage.scoreWin){
    scoreList = JSON.parse(localStorage.scoreWin);
}

if(localStorage.highScore){
    highScore = parseInt(JSON.parse(localStorage.highScore));
    high.innerText = highScore;
}

//if a number exists from a previous session, the number will remain the same
if(localStorage.numHolder){
    numGuess = parseInt(localStorage.numHolder);
}

//generates number from 1 to the given range
GENBUT.addEventListener("click", function(){
    let num=Math.floor(Math.random()* (RANGE - 1) + 1);
    numGuess = num;
    localStorage.numHolder = numGuess;
    let div = document.createElement("div");
    div.setAttribute("class", "hintDiv");
    div.innerText = "Number generated";
    HINTBOX.insertBefore(div, HINTBOX.firstChild);
});

//turns the user's guess into a variable and checks if they won or not
function userInput(){
    event.preventDefault();
    let num = HINTBOX.childElementCount;
    scoreBox.innerText = "Current Score: " + num;
    localStorage.setItem("scorez", JSON.stringify(num));
    let formData = $("form").serializeArray();
    if (formData[0].value == ""){
        formData[0].value = 0;
    }
    guess = parseInt(formData[0].value);
    hint = document.createElement("div");
    HINTBOX.insertBefore(hint, HINTBOX.firstChild);
    winCondition(guess, numGuess, scoreList, num);
}
//checks how far off the guess is from the answer
function checkCondition(a, b, c, d, e, num){
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
    let numOff = Math.abs(numGuess - guess);
    if (guess < numGuess){
        checkCondition("Very close. A little higher!", "You're getting there! Higher!", "Higher!", "You're quite a bit low...", numOff, li);
    }else{
        checkCondition("Very close. A little lower!", "You're getting there! Lower!", "Lower!", "You're quite a bit high...", numOff, li);
    }
}

function winCondition(a, b, c, d){
    if (a == b){
        alert("YOU WIN!!!");
        if(c < d){
            d --;
            c = d;
            localStorage.setItem("scoreWin", JSON.stringify(c));
        }
        localStorage.removeItem("hintz","numHolder");
        if(highScore == ""){
            highScore = 0;
            localStorage.setItem("highScore", JSON.stringify(d));
            high.innerText = d;
        }else if(highScore > d){
            localStorage.setItem("highScore", JSON.stringify(d));
            high.innerText = d;
        }
        location.reload();
    }else{
        checkGuess(d);
        if(localStorage.hintz){
            hintzList = JSON.parse(localStorage.hintz);
        }
        let hintz = HINTBOX.firstElementChild;
        hintzList.push(hintz.innerText);
        localStorage.setItem("hintz", JSON.stringify(hintzList));
    }
}
