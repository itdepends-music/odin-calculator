let firstNumber = '';
let curNumber = '';
let operator = '';
const display = document.querySelector('.display');

function updateScreen() {
    display.textContent = `FN: ${firstNumber}, CN: ${curNumber}, OP: ${operator}`;
}

function operate() {
    const a = Number(firstNumber);
    const b = Number(curNumber);

    if (operator === '+') {
        const result = a + b;
    } else if (operator === '-') {
        const result = a - b;
    } else if (operator === '\u00D7') {
        const result = a * b;        
    } else if (operator === '\u00F7') {
        const result = a / b;
    }

    firstNumber = String(result);
    curNumber = '';
}

const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('operator')) {
            curNumber += button.textContent;
        } else if (button.id === 'equals') {
            operate();
        } else {
            operator = button.textContent;
        }
        updateScreen();
    });
});