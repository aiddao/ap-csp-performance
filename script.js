const RANGE = 100;
const GENBUT = document.getElementById("genNumber");
const HINTBOX = document.getElementById("hint-box");
let scoreBox = document.getElementById("score-box");
let high = document.getElementById("high-score");
let gameForm = document.getElementById("game-form");
let hintzList = [];
let hint;
let guess;
let numGuess;
let scoreList;
let highScore = "";
let num;
let time;
let timeScore = 0;

//loads timer
if(localStorage.timeStore){
        timeScore = parseInt(localStorage.timeStore);
        time = setInterval(function(){
        timeScore++
        console.log("dick");
        localStorage.setItem("timeStore", timeScore);
        useTime.innerText="Time: |"+timeScore+"|";
    }, 1000);
}

//loads pre-existing hints
if(localStorage.hintz){
    hintzList = JSON.parse(localStorage.hintz);
    for(i = 0, len = hintzList.length; i < len; i++){
        let div = document.createElement("div");
        div.innerText = hintzList[i];
        HINTBOX.insertBefore(div, HINTBOX.firstChild);
    }
}

//loads previous score before page closed
if(localStorage.scorez){
    score = JSON.parse(localStorage.scorez);
    scoreBox.innerHTML = "Previous Score: " + score;
}

//loads high score
if(localStorage.highScore){
    highScore = parseInt(JSON.parse(localStorage.highScore));
    high.innerText = highScore;
}

//if a number exists from a previous session, the number will remain the same
if(localStorage.numHolder){
    numGuess = parseInt(localStorage.numHolder);
}

//loads previous background and font color
if(localStorage.color){
    let data = JSON.parse(localStorage.color);
    document.body.setAttribute("style", "background-color:" + data[0].value + "; color:" + data[1].value + ";");
}

//customizes bg color and font color
function customize(){
    event.preventDefault();
    let formData = $("form").serializeArray();
    document.body.setAttribute("style", "background-color:" + formData[0].value + "; color:" + formData[1].value + ";");
    localStorage.setItem("color", JSON.stringify(formData));
}

//changes game description based on the set range
let desc = document.getElementById("descriptor");
desc.innerText = RANGE;

//generates number from 1 to the given range and creates timer
GENBUT.addEventListener("click", function(){
    if(localStorage.numHolder){
        alert("There is already a generated number!!");
    } else {
        time = setInterval(function(){
            timeScore++
            console.log("balls");
            localStorage.setItem("timeStore", timeScore);
            useTime.innerText="Time: |"+timeScore+"|";
        }, 1000);
        let number=Math.floor(Math.random()* (RANGE - 1) + 1);
        numGuess = number;
        localStorage.numHolder = numGuess;
        alert("Number Generated");
    }
});

//turns the user's guess into a variable and checks if they won or not
function userInput(){
    event.preventDefault();
    if(localStorage.numHolder){
    let formData = $("form").serializeArray();
    guess = parseInt(formData[2].value);
    if (formData[2].value == ""){
        alert("No input");
        return;
    }else if(guess !== guess){
        alert("Wrong input (Please input numbers)");
        return;
    }
    num = HINTBOX.childElementCount;
    localStorage.setItem("scorez", JSON.stringify(num * timeScore));
    scoreBox.innerText = "Guesses: " + num;
    hint = document.createElement("div");
    HINTBOX.insertBefore(hint, HINTBOX.firstChild);
    winCondition(guess, numGuess, num, timeScore);
    document.getElementById('input').value='';
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

//checks if the user won or not
function winCondition(userGuess, winValue, curScore, tScore){
    if (userGuess == winValue){
        clearInterval(time);
        let totalScore = curScore * tScore;
        alert("YOU WIN!!! Answer: "+winValue+" | Guesses: " + curScore + " | Time: " + tScore + " |Score: " + totalScore);
        localStorage.removeItem("hintz");
        localStorage.removeItem("numHolder");
        localStorage.removeItem("timeStore");
        if(highScore == ""){
            localStorage.setItem("highScore", JSON.stringify(totalScore));
        }else if(highScore > curScore){
            localStorage.setItem("highScore", JSON.stringify(totalScore));
        }
        location.reload();
    }else{
        checkGuess();
        let hintz = HINTBOX.firstElementChild;
        hintzList.push(hintz.innerText);
        localStorage.setItem("hintz", JSON.stringify(hintzList));
    }
}

