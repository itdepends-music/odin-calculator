let firstNumber = '';
let curNumber = '';
let operator = '';
let finalResult = false;
const display = document.querySelector('.display');

function updateScreen() {
    display.textContent = `FN: ${firstNumber}, CN: ${curNumber}, OP: ${operator}`;
    if (firstNumber === '') {
        display.textContent = curNumber;
    } else {
        display.textContent = firstNumber + operator + curNumber;
    }
}

function operate() {
    const a = Number(firstNumber);
    const b = Number(curNumber);
    let result = null;

    if (firstNumber === '') {
        firstNumber = curNumber;
        curNumber = '';
        return;
    }

    if (operator === '+') {
        result = a + b;
    } else if (operator === '\u2212') {
        result = a - b;
    } else if (operator === '\u00D7') {
        result = a * b;        
    } else if (operator === '\u00F7') {
        result = a / b;
    } else if (operator === '') {
        result = curNumber;
    }

    firstNumber = String(result);
    curNumber = '';
}

const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('operator')) {
            if (finalResult) {
                curNumber = '';
                finalResult = false;
            }
            curNumber += button.textContent;
        } else if (button.id === 'equals') {
            operate();
            curNumber = firstNumber;
            firstNumber = '';
            finalResult = true;
        } else {
            operate();
            operator = button.textContent;
            finalResult = false;
        }
        updateScreen();
    });
});