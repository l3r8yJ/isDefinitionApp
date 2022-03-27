const path = require('path');
const fs = require('fs');
const assistent = require('./scripts/utils/assistent').assistent;


window.addEventListener('DOMContentLoaded', () => {

    assistent.contentToHTMLTable(getData());
    assistent.parseToDefinitionAndText(getData());
})


function getData() {
    return fs.readFileSync(path.join(__dirname, '/data/data.csv'), 'utf8').toString().split('\n');
}