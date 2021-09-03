let runningTotal = 0; // the total number to display on the screen 
let buffer = "0";  // each time we press a new number 
let previousOperator; // when pressing add/subtract/multiply/divide 
const screen = document.querySelector('.screen');

//break it down to deal with number buttons separately from the operator buttons
function buttonClick(value) {
    if (isNaN(value)) {
        //this is not a number
        handleSymbol(value); 
    }else {
        //this is a number
        handleNumber(value);
    }
    screen.innerText = buffer;
  
}

function handleNumber(numberString){
    //the first number press is "0", display "0" no "00"
    if (buffer === "0") {
        buffer = numberString;
    }else{
        buffer += numberString; 
    }
}

function handleMath(symbol){
    if (buffer === '0') {
        //do nothing --- the return statement means to get our of the loop
        return; //end the function 
    }

    //take in string and give out a number 
    //short hand of parseInt is "+buffer"
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer; 
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = '0';

}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer; 
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer; 
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer; 
    } else {
        runningTotal /= intBuffer; 
    }

}

function handleSymbol(symbol){  
    switch (symbol) {
        case 'C': 
            buffer = '0';
            runningTotal = 0; 
            break;
        case '=': 
            if (previousOperator === null){
                //no previous operator 
                //need 2 numbers to do the math  
                return;
            }
            // if the use operators 
            flushOperation(parseInt(buffer)); 
            previousOperator = null;
            buffer = runningTotal; // show the user 
            runningTotal = 0;
            break;
        case '←': 
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+': 
        case '×': 
        case '÷': 
        case '-': 
            handleMath(symbol);
            break;
    }
 }

//the "event" came from the browser, which has a lot of stuffs ; console.log('event'); 
function init () {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
        })
}

init(); 