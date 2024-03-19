var numGuess;
const GENBUT = document.getElementById("GENBUT");
const HINT = document.getElementById("hint-box");
const HINTTXT = HINT.innerText;
if(localStorage.numHolder){
    numGuess = localStorage.numHolder;
}

GENBUT.addEventListener("click", function generateNum(){
    let num=Math.floor(Math.random()*100);
    numGuess = num;
    localStorage.numHolder = numGuess;
});

function userInput(){
    event.preventDefault();
    let formData = $("form").serializeArray();
    var guess = formData[0].value;

    if (guess == numGuess){
        HINTTXT = "YOU WIN!!!!!";
    }else{
        checkGuess();
    }
}

function checkGuess(){
    if(guess < numGuess){
        HINTTXT = "Higher";
    }else{
        HINTTXT = "Lower";
    }
}