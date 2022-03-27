//const path = require('path');
//const assistent = require('../utils/assistent').assistent;
//const content = assistent.getData(path.join(__dirname, '../../data/data.csv'));
const button = document.getElementById('btn-answer');

content = window.electron.content;

const compare = (userInput, content) => {
    const definitions = Object.keys(content);
    const definitionTexts = Object.values(content);

    const textSize = definitionText.length;
    const percentPerSymbol = textSize / 100;


};

button.addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    compare(userInput, content);
});