//const path = require('path');
//const assistent = require('../utils/assistent').assistent;
//const content = assistent.getData(path.join(__dirname, '../../data/data.csv'));
const button = document.getElementById('btn-answer');

content = window.electron.content;

const compare = (userInput, currentDefinitionText) => {

    const percentPerSymbol = 100 / currentDefinitionText.length;
    let accuracy = 0.0;
    let isCorrect = false;

    if (userInput.length <= currentDefinitionText.length) {
        for (let i = 0; i < currentDefinitionText.length; i++) {
            if (currentDefinitionText[i] === userInput[i]) {
                accuracy += percentPerSymbol;
            }
        }
    }

    if (accuracy > 80) {
        isCorrect = true;
    }

    accuracy = Math.round(accuracy);

    let result = {
        "accuracy": accuracy,
        "isCorrect": isCorrect,
    }

    console.log(accuracy);
    return result;
};

button.addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    const currentDefinitionText = document.getElementById('isDefinitionText').innerText

    if (currentDefinitionText) {
        compare(userInput, currentDefinitionText);
    } else {
        throw new Error('Empty data.')
    }
});