const buttonAnswer = document.getElementById('btn-answer');
const buttonReset = document.getElementById('btn-reset');

// content is a data from data.csv in Object format
const content = window.electron.content;

// resetDefinition is a function of assistent = pushDefinitionToDocument
const resetDefinition = window.electron.resetDefinition;
const resetDefinitionText = window.electron.resetDefinitionText;


// here we compare string in id="user-input" with original
// text in id="isDefinitionText" 
const compare = (userInput) => {

    const listDefs = Object.keys(content);
    const defOnDoc = document.getElementById('isDefinition').innerText;
    const index = listDefs.indexOf(defOnDoc);
    const currentDefinitionText = Object.values(content)[index];
    console.log(listDefs, defOnDoc, index);


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
        compare(userInput, currentDefinitionText);
    } else {
        throw new Error('Empty data.');
    }
});


buttonReset.addEventListener('click', () => {
    resetDefinition();
    resetDefinitionText();
});