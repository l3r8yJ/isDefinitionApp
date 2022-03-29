const buttonAnswer = document.getElementById("btn-answer");
const buttonReset = document.getElementById("btn-reset");
const buttonHelp = document.getElementById("btn-help");
const buttonEdit = document.getElementById("btn-edit");

// data from bridgeContent
const content = window.electron.content;

// functions from bridgeContent
const resetDefinition = window.electron.resetDefinition;
const resetDefinitionText = window.electron.resetDefinitionText;
const createHTMLTable = window.electron.createHTMLTable;
const openList = window.electron.openList;

// here we compare string in id="user-input" with original
// text in id="isDefinitionText"
const compareUserAndDefinition = (userInput) => {
  const currentDefinitionText = getCurrentDefinitionText();
  const percentPerSymbol = 100 / currentDefinitionText.length;
  let accuracy = 0.0;

  if (userInput.length > currentDefinitionText.length) {
    alert("Слишком большой объем");
    return;
  }

  for (let i = 0; i < currentDefinitionText.length; i++) {
    if (currentDefinitionText[i] === userInput[i]) accuracy += percentPerSymbol;
  }

  accuracy = Math.round(accuracy);

  let result = {
    accuracy: accuracy,
    isCorrect: accuracy >= 80,
  };
  console.log(accuracy);
  return result;
};

// comparing
buttonAnswer.addEventListener("click", () => {
  const userInput = document.getElementById("user-input").value;
  const currentDefinitionText =
    document.getElementById("isDefinitionText").innerText;

  if (currentDefinitionText.length === 0) throw new Error("Empty definition.");

  const res = compareUserAndDefinition(userInput, currentDefinitionText);
  correctCheck(res);
});

function correctCheck(res) {
  const end = res.accuracy.toString() + "%.";
  const docAnswer = document.getElementById("answer");

  if (res.isCorrect) {
    answer.innerText = "Ответ верный, точность определения составляет " + end;
    answer.style.cssText = "color: green";
  }
  if (!res.isCorrect) {
    answer.innerText = "Ответ неверный, точность определения составляет " + end;
    answer.style.cssText = "color: red";
  }
}

// takes string from isDefinitionText and replace one underscored word to normal
function showWord() {
  // small overloading for compare arrays of words

  if (Array.prototype.equals)
    console.warn(
      "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
    );
  // attach the .equals method to Array's prototype to call it on any array
  Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array) return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length) return false;

    for (var i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i])) return false;
      } else if (this[i] != array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;
  };

  const currentDefinitionText = getCurrentDefinitionText().split(" ");
  let underscoredText = document
    .getElementById("isDefinitionText")
    .innerText.split(" ");
  let underscoredTextWithWord = "";
  let newWordIndex = Math.floor(Math.random() * currentDefinitionText.length);
  isChanged = false;

  if (underscoredText.equals(currentDefinitionText)) {
    alert("All words are shown");
    return;
  }

  while (!isChanged) {
    if (underscoredText[newWordIndex].search("_") !== -1) {
      underscoredText[newWordIndex] = currentDefinitionText[newWordIndex];
      isChanged = true;
    } else {
      newWordIndex = Math.floor(Math.random() * currentDefinitionText.length);
    }
  }

  underscoredText.forEach((element) => {
    if (element !== underscoredText[-1]) {
      underscoredTextWithWord += element + " ";
    } else {
      underscoredTextWithWord += element;
    }
  });

  document.getElementById("isDefinitionText").innerText =
    underscoredTextWithWord;
}

function getCurrentDefinitionText() {
  return Object.values(content)[
    Object.keys(content).indexOf(
      document.getElementById("isDefinition").innerText
    )
  ];
}

buttonReset.addEventListener("click", () => {
  const input = document.getElementById("user-input");
  input.value = "";

  resetDefinition();
  resetDefinitionText();
});

buttonHelp.addEventListener("click", () => {
  showWord();
});

buttonEdit.addEventListener("click", (e) => {
  e.preventDefault();
  openList();
});
