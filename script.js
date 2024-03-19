var numGuess;
const genNumber = document.getElementById("genNumber");

if(localStorage.numHolder){
    numGuess = localStorage.numHolder;
}

genNumber.addEventListener("click", function generateNum(){
    let num=Math.floor(Math.random()*100);
    numGuess = num;
    localStorage.numHolder = numGuess;
});

function userInput(){
    event.preventDefault();
    let formData = $("form").serializeArray();
    let guess = formData[0].value;

    if (guess == numGuess){
        alert("YOU WIN!!!!!");
    }else{
        checkGuess();
    }
}

function checkGuess(){
    
}