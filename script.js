const RANGE = 10000000000000000000000000000000000000000000000000;
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
    let num=Math.floor(Math.random()* (RANGE - 1) + 1);
    numGuess = num;
    localStorage.numHolder = numGuess;
    alert("Number Generated");
    }
});

//turns the user's guess into a variable and checks if they won or not
function userInput(){
    event.preventDefault();
    if(localStorage.numHolder){
    let num = HINTBOX.childElementCount;
    scoreBox.innerText = "Current Score: " + num;
    localStorage.setItem("scorez", JSON.stringify(num));
    let formData = $("form").serializeArray();
    if (formData[2].value == ""){
        formData[2].value = 0;
    }
    guess = parseInt(formData[2].value);
    hint = document.createElement("div");
    HINTBOX.insertBefore(hint, HINTBOX.firstChild);
    winCondition(guess, numGuess, scoreList, num);
} else {
    alert("You have no number to guess");
}
}
//checks how far off the guess is from the answer
function checkCondition(a, b, c, d, e, num, g){
    if(e <= RANGE * .10){
        hint.innerText = num + ". "+ a + "["+g+"]";
    }else if (e > RANGE * .10 && e < RANGE * .25) {
        hint.innerText = num + ". "+ b + "["+g+"]";
    }else if (e >= RANGE * .25 && e < RANGE * .50) {
        hint.innerText = num + ". "+ c + "["+g+"]";
    }else{
        hint.innerText = num + ". "+ d + "["+g+"]";
    }
}

//gives hint messages based on if the user is higher or lower than the answer
function checkGuess(li, guess){
    let numOff = Math.abs(numGuess - guess);
    if (guess < numGuess){
        checkCondition("Very close. A little higher! ", "You're getting there! Higher! ", "Higher! ", "You're quite a bit low ", numOff, li, guess);
    }else{
        checkCondition("Very close. A little lower! ", "You're getting there! Lower! ", "Lower! ", "You're quite a bit high ", numOff, li, guess);
    }
}

function winCondition(a, b, c, d){
    if (a == b){
        alert("YOU WIN!!! Score: " + d);
        if(c < d){
            c = d;
            localStorage.setItem("scoreWin", JSON.stringify(c));
        }
        localStorage.removeItem("hintz");
        localStorage.removeItem("numHolder");
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
        checkGuess(d, a);
        let hintz = HINTBOX.firstElementChild;
        hintzList.push(hintz.innerText);
        localStorage.setItem("hintz", JSON.stringify(hintzList));
    }
}
