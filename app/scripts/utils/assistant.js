const fs = require("fs");

/* 
* module Assistant
* @params:
    content - data from .csv file that contain definitions and represent it to something

* @methods:
* *    #contentToHTMLTable(content) - represents data to table type of:
        <ul>
            <li>...</li>
            <li>...</li>
            <li>...</li>
        </ul>

* *   #parseToDefinitionAndText(content) - return dictionary with structure like:
        "definition" : "definition's text"
*/
const assistant = {
  parseToDefinitionAndText(content) {
    let data = {};

    content.forEach((line) => {
      line = line.split(" - ");
      data[line[0]] = line[1];
    });

    //console.log(data);
    return data;
  },

  contentToHTMLTable(content) {
    let html = "";

    content.forEach((line) => {
      html += `<li>${line}</li>`;
    });

    document.getElementById("list").innerHTML = html;
  },

  pushDefinitionToDocument(content) {
    const parsedContent = this.parseToDefinitionAndText(content);
    const definition = document.getElementById("isDefinition");
    const definitionText = document.getElementById("isDefinitionText");
    const defs = Object.keys(parsedContent);
    const index = Math.floor(Math.random() * defs.length);

    definition.innerText = defs[index];
    definitionText.innerText = Object.values(parsedContent)[index];
  },

  getData(path) {
    try {
      return fs.readFileSync(path, "utf8").toString().split("\n");
    } catch (error) {
      console.log(error);
    }
  },

  // correctly underscores the isDefinitionText
  replaceDefinitionText() {
    const docText = document.getElementById("isDefinitionText");
    const currentText = document
      .getElementById("isDefinitionText")
      .innerText.split(" ");

    let underscoredText = "";

    currentText.forEach((element) => {
      underscoredText +=
        element !== currentText[-1]
          ? `${"_".repeat(element.length)} `
          : "_".repeat(element.length);
    });
    // string type of ___ ____ ___
    docText.innerText = underscoredText;
  },
};

module.exports.assistant = assistant;
