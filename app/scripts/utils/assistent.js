const fs = require("fs");

/* 
* module Assistent
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
const assistent = {
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
      html += "<li>" + line + "</li>";
    });

    document.getElementById("list").innerHTML = html;
  },

  pushDefinitionToDocument(content) {
    const definition = document.getElementById("isDefinition");
    const definitionText = document.getElementById("isDefinitionText");
    const defs = Object.keys(this.parseToDefinitionAndText(content));
    const defsText = Object.values(this.parseToDefinitionAndText(content));
    const index = Math.floor(Math.random() * defs.length);

    definition.innerText = defs[index];
    definitionText.innerText = defsText[index];
  },

  getData(path) {
    return fs.readFileSync(path, "utf8").toString().split("\n");
  },

  // correctly underscores the isDefinitionText
  replaceDefinitionText() {
    const docText = document.getElementById("isDefinitionText");
    let current = document.getElementById("isDefinitionText").innerText;
    let underscoredText = "";

    current = current.split(" ");

    current.forEach((element) => {
      if (element !== current[-1]) {
        underscoredText += "_".repeat(element.length);
        underscoredText += " ";
      } else {
        underscoredText += "_".repeat(element.length);
      }
    });
    // string type of ___ ____ ___
    docText.innerText = underscoredText;
  },
};

module.exports.assistent = assistent;
