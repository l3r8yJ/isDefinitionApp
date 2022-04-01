const buttonCheck = document.getElementById("btn-check");
const buttonReset = document.getElementById("btn-reset");
const buttonHelp = document.getElementById("btn-help");
const buttonEdit = document.getElementById("btn-edit");
const buttonShowAnswer = document.getElementById("btn-show-answer");

// data from bridgeContent
const content = window.electron.content;

// functions from bridgeContent
const resetDefinition = window.electron.resetDefinition;
const resetDefinitionText = window.electron.resetDefinitionText;
const createHTMLTable = window.electron.createHTMLTable;
const sendMessageToOpenList = window.electron.openList;

// here we compare string in id="user-input"
// with original text
const compareUserAndDefinition = (userInput) => {
  if (userInput === undefined || userInput.length === 0) {
    alert("Please enter definition text.");
    return;
  }

  const currentDefinitionText = getCurrentDefinitionText();
  const PERCENTS = 100;
  const PERCENT_PER_SYMBOL = PERCENTS / currentDefinitionText.length;
  let accuracy = 0.0;

  if (userInput.length > currentDefinitionText.length) {
    alert("Слишком большой объем");
    return;
  }

  for (let i = 0; i < currentDefinitionText.length; i++) {
    if (currentDefinitionText[i] === userInput[i])
      accuracy += PERCENT_PER_SYMBOL;
  }

  accuracy = Math.round(accuracy);

  let result = {
    accuracy: accuracy,
    isCorrect: accuracy >= 80,
  };
  console.log(accuracy);
  return result;
};

function correctCheck(res) {
  const docAnswer = document.getElementById("answer");
  let insert, color;

  if (res.isCorrect) {
    insert = "верный";
    color = "green";
  }
  if (!res.isCorrect) {
    insert = "неверный";
    color = "red";
  }

  docAnswer.innerText = `Ответ ${insert}. Точность: ${res.accuracy}%.`;
  docAnswer.style.cssText = `color: ${color}`;
}

// takes string from isDefinitionText and replace one underscored word to normal
function showWord() {
  const currentDefinitionText = getCurrentDefinitionText().split(" ");
  const underscoredText = document
    .getElementById("isDefinitionText")
    .innerText.split(" ");
  let underscoredTextWithWord = "";
  let newWordIndex = Math.floor(Math.random() * currentDefinitionText.length);
  let isChanged = false;

  // attach the .equals method to Array's prototype to call it on any array
  arrayEqualOverload();

  if (underscoredText.equals(currentDefinitionText)) {
    alert("All words are shown");
    return;
  }

  while (!isChanged) {
    isChanged = underscoredText[newWordIndex].search("_") !== -1 ? true : false;
    if (isChanged) {
      underscoredText[newWordIndex] = currentDefinitionText[newWordIndex];
    } else {
      newWordIndex = Math.floor(Math.random() * currentDefinitionText.length);
    }
  }

  underscoredText.forEach((element) => {
    underscoredTextWithWord +=
      element !== underscoredText[-1] ? `${element} ` : `${element}`;
  });

  document.getElementById("isDefinitionText").innerText =
    underscoredTextWithWord;
}

function arrayEqualOverload() {
  return (Array.prototype.equals = function (array) {
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
  });
}

function getCurrentDefinitionText() {
  return Object.values(content)[
    Object.keys(content).indexOf(
      document.getElementById("isDefinition").innerText
    )
  ];
}

// comparing
buttonCheck.addEventListener("click", () => {
  const userInput = document.getElementById("user-input").value;
  const currentDefinitionText =
    document.getElementById("isDefinitionText").innerText;

  if (currentDefinitionText.length === 0) throw new Error("Empty definition.");

  const res = compareUserAndDefinition(userInput, currentDefinitionText);
  correctCheck(res);
});

buttonReset.addEventListener("click", () => {
  document.getElementById("user-input").value = "";
  resetDefinition();
  resetDefinitionText();
});

buttonHelp.addEventListener("click", () => {
  showWord();
});

buttonEdit.addEventListener("click", async (e) => {
  e.preventDefault();
  sendMessageToOpenList();
});

buttonShowAnswer.addEventListener("click", () => {
  const userInput = document.getElementById("user-input");
  userInput.value = getCurrentDefinitionText();
});
