const buttonAnswer = document.getElementById('btn-answer');
const buttonReset = document.getElementById('btn-reset');
const buttonHelp = document.getElementById('btn-help');

// content is a data from data.csv in Object format
const content = window.electron.content;

// resetDefinition is a function of assistent = pushDefinitionToDocument
const resetDefinition = window.electron.resetDefinition;
const resetDefinitionText = window.electron.resetDefinitionText;


// here we compare string in id="user-input" with original
// text in id="isDefinitionText" 
const compareUserAndDefinition = (userInput) => {

    const currentDefinitionText = getCurrentDefinitionText();

    const percentPerSymbol = 100 / currentDefinitionText.length;
    let accuracy = 0.0;

    if (userInput.length <= currentDefinitionText.length) {
        for (let i = 0; i < currentDefinitionText.length; i++) {
            if (currentDefinitionText[i] === userInput[i]) {
                accuracy += percentPerSymbol;
            }
        }
    }

    accuracy = Math.round(accuracy);

    let result = {
        "accuracy": accuracy,
        "isCorrect": accuracy >= 80,
    }
    console.log(accuracy);
    return result;
};

// comparing
buttonAnswer.addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    const currentDefinitionText = document.getElementById('isDefinitionText').innerText;

    if (currentDefinitionText.length !== 0) {
        compareUserAndDefinition(userInput, currentDefinitionText);
    } else {
        throw new Error('Empty data.');
    }
});


// takes string from isDefinitionText and replae one underscored word to normal
function showWord() {
    const currentDefinitionText = getCurrentDefinitionText().split(' ');
    let underscoredText = document.getElementById('isDefinitionText').innerText
    const newWordIndex = Math.floor(Math.random() * currentDefinitionText.length);

    underscoredText[newWordIndex] = currentDefinitionText[newWordIndex];
    console.log(underscoredText, currentDefinitionText);
    document.getElementById('isDefinitionText').innerText = underscoredText;
    //document.getElementById('isDefinitionText').innerText = currentDefinitionText[Math.floor(Math.random() * currentDefinitionText.length)];
}


function getCurrentDefinitionText() {
    return Object.values(content)[Object.keys(content).indexOf(document.getElementById('isDefinition').innerText)];
};


buttonReset.addEventListener('click', () => {
    resetDefinition();
    resetDefinitionText();
});


buttonHelp.addEventListener('click', () => {
    showWord();
});