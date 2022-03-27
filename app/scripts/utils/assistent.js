const fs = require('fs');

/* 
* module Assistent
* @param content
* *    content - data from .csv file that contain definitions and represent it to smomething

* @metods:
    #contentToHTMLTable(content) - represetns data to table type of:
        <ul>
            <li>...</li>
            <li>...</li>
            <li>...</li>
        </ul>

    #pareseToDefinitionAndText(content) - return dictionary with structure like:
        "definition" : "definition's text"
*/
const assistent = {
    parseToDefinitionAndText(content) {
        let data = {};

        content.forEach((line) => {
            line = line.split('-');
            data[line[0]] = line[1];
        })

        //console.log(data);
        return data;
    },

    contentToHTMLTable(content) {
        let html = '';

        content.forEach((line) => {
            html += '<li>' + line + '</li>';
        });

        document.getElementById('list').innerHTML = html;
    },

    pushDefinitionToDocument(content) {
        const definition = document.getElementById('isDefinition');
        const definitionText = document.getElementById('isDefinitionText');

        const defs = Object.keys(this.parseToDefinitionAndText(content));
        const defsText = Object.values(this.parseToDefinitionAndText(content))

        const index = Math.floor(Math.random() * defs.length);

        definition.innerText = defs[index];
        definitionText.innerText = defsText[index];
    },

    getData(path) {
        return fs.readFileSync(path, 'utf8').toString().split('\n');
    },
};

module.exports.assistent = assistent;