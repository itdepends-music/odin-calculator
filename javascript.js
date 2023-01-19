let firstNumber = '';
let curNumber = '';
let operator = '';
let finalResult = false;
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

// Ensures that output is less than 10 digits.
// Will use exponential notation if need be.
function displayNumber(num) {
    if (num.length > 10) {
        if (num.slice(0,11).includes('.') && !(num.includes('e'))) {
            if (num.slice(9) !== '.') {
                num = num.slice(0, 10);
            } else {
                num = num.slice(0, 9);
            }
        } else {
            num = Number(num).toExponential(4);
        }
    }
    return num;
}

function updateScreen() {
    if (firstNumber === '') {
        display.textContent = displayNumber(curNumber);
    } else {
        display.textContent = displayNumber(firstNumber) + operator + displayNumber(curNumber);
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
        if (b === 0) {
            result = ":'\u2011(";
        }
    } else if (operator === '') {
        result = curNumber;
    }

    firstNumber = String(result);
    curNumber = '';
}

function processEvent(button) {
    button.addEventListener('click', () => {
        if (curNumber === ":'\u2011(") {
            curNumber = '';
        }

        if (button.textContent === 'CL') {
            curNumber = '';
            firstNumber = '';
            operator = '';
        } else if (button.textContent === 'BS') {
            if (finalResult === true) {
                curNumber = '';
                updateScreen();
                return;
            }

            if (curNumber === ":'\u2011(") {
                curNumber = '';
            } else if (curNumber !== '') {
                curNumber = curNumber.slice(0, -1);
            } else if (operator !== '') {
                operator = '';
            } else if (firstNumber !== '') {
                firstNumber = firstNumber.slice(0, -1);
            }
        } else if (!button.classList.contains('operator')) {
            if (button.textContent === '.' && curNumber.includes('.')) {
                return;
            }

            if (curNumber.length >= 10) { return; }

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
            if (curNumber === '') {
                operator = button.textContent;
                updateScreen();
                return;
            }

            operate();

            if (firstNumber === ":'\u2011(") {
                curNumber = firstNumber;
                updateScreen();
                return;
            }

            operator = button.textContent;
            finalResult = false;
        }
        updateScreen();
    });
}

buttons.forEach(processEvent);
document.addEventListener("keydown", e => {
    e.preventDefault();
    switch (e.key) {
        case '.':
            processEvent('.');
        case '=':
            processEvent('=');
        case '-':
            processEvent('\u2212');
        case '+':
            processEvent('+');
        case '*':
            processEvent('\u00f7');
        case '/':
            processEvent('\u2011');
        default:
            if (Number(e.key) !== NaN && Number(e.key) >= 0 && Number(e.key) < 10) {
                processEvent(e.key);
            }
    }
});
