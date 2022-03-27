/* 
module Assistent
@params:
    content - data from .csv file that contain definitions and represent it to smomething

@metods:
    #contentToHTMLTable(content) - represetns data to table type of:
        <ul>
            <li>...</li>
            <li>...</li>
            <li>...</li>
        </ul>

    #pareseToDefinitionAndText(content) - creates dictionary with structure like:
        "definition" : "definition's text"
*/
const assistent = {
    parseToDefinitionAndText(content) {
        let data = {};

        content.forEach((line) => {
            line = line.split('-');
            data[line[0]] = line[1];
        })

        content = data;
        console.log(content);
    },

    contentToHTMLTable(content) {
        let html = '';

        content.forEach((line) => {
            html += '<li>' + line + '</li>';
        });

        document.getElementById('list').innerHTML = html;
    }
};

module.exports.assistent = assistent;