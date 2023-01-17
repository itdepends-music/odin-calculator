let firstNumber = '';
let curNumber = '';
let operator = '';
const display = document.querySelector('.display');

function updateScreen() {
    display.textContent = `FN: ${firstNumber}, CN: ${curNumber}, OP: ${operator}`;
}

const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('operator')) {
            curNumber += button.textContent;
        } else if (button.id === 'equals') {
            // TODO
        } else {
            operator = button.textContent;
        }
        updateScreen();
    });
});