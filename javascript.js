let displayText = '';
const display = document.querySelector('.display');

function updateScreen(text) {
    displayText = text;
    display.textContent = text;
}

updateScreen('12345');