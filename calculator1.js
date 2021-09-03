//Basic calculator function that works only on integers 
//Need to press clear "C" to start another round of calculating 


//STEP 1: Declare some variables

//press "1" "+" "1", then runningTotal = 2 
let runningTotal = 0;  
//press "2" "3", then buffer = 23 
let buffer = "0";
//any "+" , "-" , "*", "/" before pressing "=" 
let previousOperator; 
//DOM element for screen section 
const screen = document.querySelector(".screen"); 



//STEP 3: Create a function when clicking a button to handle the numbers and symbols separately 
function buttonClick(value){
    if(isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    //for debug 
 //   console.log(value);
    rerender();
}

//STEP 4: Create a function to handle when numbers buttons are pressed
//Creating Buffer  
function handleNumber(numString) {
    //repalce the "0" on the screen with the number press
    //this will avoid displaying "00"  
    if (buffer === "0") {
        buffer = numString; 
    } else {
        buffer += numString; // displays the number next to one another (i.e. string concatinate)
    }
    //debug
    console.log(buffer);

}

//STEP 5: Create a function to handle symbols 
//STEP 8: add the "←" case 
function handleSymbol(symbol){
    // if (symbol === "C") {
    //     buffer = "0"; 
    //     runningTotal = 0; 
    // }

    console.log(symbol);

    switch(symbol) {
        case 'C': 
            buffer = "0"; 
            runningTotal = 0; 
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        case '←': 
            if(buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0,buffer.length-1); 
            }
            break;
        case '=': 
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal; 
            runningTotal = 0; 
            break;


    }
}


//STEP 6: Create a function to handle Math when operating on numbers 
//Use flushOperation() function here 
function handleMath(symbol) {
    if (buffer === "0") {
        return; //do nothing  
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer; 
    } else {
        // 5 + 2  keeps track of 5+2 as a runningTotal 
        flushOperation(intBuffer); 
        
    }

    previousOperator = symbol; 
    buffer = "0"; 
}

//STEP 7: Create a flashOperation function to do the math
//Copy the symbols from the html elements 
function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "−"){
        runningTotal -= intBuffer;       
    } else if (previousOperator === "×"){
        runningTotal *= intBuffer;       
    } else {
        runningTotal /= intBuffer;  
    }
    console.log(runningTotal);
}



//Create a function to render the display on the screen 
function rerender() {
    screen.innerText = buffer; 
}

//STEP 2: Create a function to include the addEventListener when clicking the buttons  
function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
        })
}
//and call it 
init(); 


/* 
NOTE: Play with the dev tool pausing to see how the buffer, runningTotal, and previousOperation changes. 
*/ 