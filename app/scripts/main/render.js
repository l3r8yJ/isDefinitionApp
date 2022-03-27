//const path = require('path');
//const assistent = require('../utils/assistent').assistent;
//const content = assistent.getData(path.join(__dirname, '../../data/data.csv'));
const buttonAnswer = document.getElementById('btn-answer');
const buttonReset = document.getElementById('btn-reset');

const content = window.electron.content;
const resetDefinition = window.electron.resetDefinition;

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

buttonAnswer.addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    const currentDefinitionText = document.getElementById('isDefinitionText').innerText

    if (currentDefinitionText) {
        compare(userInput, currentDefinitionText);
    } else {
        throw new Error('Empty data.')
    }
});

buttonReset.addEventListener('click', () => {
    resetDefinition();
})