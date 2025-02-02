function add(one, two){
    return one + two;
}

function subtract(one, two){
    return one - two;
}

function multiply(one, two){
    return (one * two);
}

function divide(one, two){
    if (two == 0){
        return 'Division by zero error!';
    }
    return (one / two);
}

let num1 = null, operator = null, num2 = null;
function operate(num1, operator, num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (operator == '+'){
        return add(num1, num2);
    }
    else if (operator == '-'){
        return subtract(num1, num2);
    }
    else if (operator == 'x'){
        return multiply(num1, num2);
    }
    else{
        return divide(num1, num2);
    }
}

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');

let displayContent = '', result = '', operatorAvail = true, decimalAvail = true;

function addNum(num){
    displayContent += num;
    display.textContent = displayContent;
}

function addOperator(operator){
    if (displayContent == ''){ 
        if (operator == '-'){
            displayContent += '-';
        }
        else{
            displayContent = `${result} ${operator} `;
            operatorAvail = false;
        }
    }
    else if (displayContent.slice(-1) == ' ') { //pressing operators in succession swaps the current operator for the new operator
        if (operator == '-'){
            displayContent += '-';
        }
        else{
            displayContent = displayContent.slice(0,-3) + ` ${operator} `;
            operatorAvail += false;
        }
    }
    else if (operatorAvail == false && (!isNaN(parseFloat(displayContent.slice(-1))) && isFinite(displayContent.slice(-1)))){ //auto-equating when a second operator is used
        let splitContents = displayContent.split(' ', 3);
        displayContent = operate(splitContents[0], splitContents[1], splitContents[2]);
        result = displayContent;
        displayContent += ` ${operator} `;
        operatorAvail = false;
    }
    else if (displayContent.slice(-1) != '-'){ //regular adding of operators
        displayContent += ` ${operator} `;
        operatorAvail = false;
    }
    display.textContent = displayContent;
    decimalAvail = true;
}

function addDecimal(){
    if (decimalAvail == true){
        displayContent = '.';
        display.textContent = displayContent;
        decimalAvail = false;
    }
}

function equate(){
    let count = 0;
    for (let i = 0; i < displayContent.length; i++){
        if (displayContent.charAt(i) == ' '){
            count += 1;
        }
    }
    if (count == 2){
        let splitContents = displayContent.split(' ', 3);
        if ((!isNaN(parseFloat(splitContents[0])) && isFinite(splitContents[0])) && (!isNaN(parseFloat(splitContents[2])) && isFinite(splitContents[2]))) {            
            displayContent = operate(splitContents[0], splitContents[1], splitContents[2]);
            display.textContent = displayContent;
            result = displayContent;
            displayContent = '';
        }
    }
}

function clearAll(){
    displayContent = '';
    display.textContent = '0';
    result = '';
    operatorAvail = true;
    decimalAvail = true;
}

display.onkeydown = () => {
    let key = event.key;
    if (!isNaN(key)){
        addNum(key);
    }
    else if (key == '+' || key == '-' || key == '/'){
        addOperator(key);
    }
    else if (key == '*' || key == 'x'){
        addOperator('x');
    }
    else if (key == '.'){
        addDecimal();
    }
    else if (key == '=' || key == 'Enter'){
        equate();
    }
    else if (key == 'Backspace'){
        clearAll();
    }
}

numbers.forEach((number) => number.addEventListener("click", () => {
    addNum(number.textContent);
}));

operators.forEach((operator) => operator.addEventListener("click", () => {
    addOperator(operator.textContent)
}));

decimal.addEventListener("click", () => {
    addDecimal()
});

equal.addEventListener("click", () => {
    equate()
});

clear.addEventListener("click", () => {
    clearAll()
})
