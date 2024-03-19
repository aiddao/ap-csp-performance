var numGuess;
const GENBUT = document.getElementById("genNumber");
const HINT = document.getElementById("hint-box");

if(localStorage.numHolder){
    numGuess = localStorage.numHolder;
}

GENBUT.addEventListener("click", function(){
    let num=Math.floor(Math.random()*100);
    numGuess = num;
    localStorage.numHolder = numGuess;
});

function userInput(){
    event.preventDefault();
    let formData = $("form").serializeArray();
    var guess = formData[0].value;

    if (guess == numGuess){
        HINT.innerText = "YOU WIN!!!!!";
    }else{
        checkGuess();
    }
}

function checkGuess(){
    if(guess < numGuess){
        HINT.innerHTML = "Higher";
    }else{
        HINT.innerHTML = "Lower";
    }
}