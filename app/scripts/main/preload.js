const path = require('path');
const fs = require('fs');
let globalContent = '';

function parseToDefinitionAndText() {
    let data = {};

    globalContent.forEach(line => {
        line = line.split('-');
        data[line[0]] = line[1];
    })

    globalContent = data;
}

function dataToHTML() {
    let html = '';
    let content = globalContent;

    content = content.forEach(line => {
        html += '<li>' + line + '</li>'
    });

    document.getElementById('list').innerHTML = html;
}

function getData() {
    globalContent = fs.readFileSync(path.join(__dirname, '/data.csv'), 'utf8').toString().split('\n');
}

window.addEventListener('DOMContentLoaded', () => {
    getData();
    dataToHTML();
    parseToDefinitionAndText();
})