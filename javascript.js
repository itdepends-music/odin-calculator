let displayText = '';
const display = document.querySelector('.display');

function updateScreen(text) {
    displayText = text;
    display.textContent = text;
}

const buttons = document.querySelectorAll('.buttons button');
console.log(buttons);
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('operator')) {
            updateScreen(displayText + button.textContent);
        }
    });
});