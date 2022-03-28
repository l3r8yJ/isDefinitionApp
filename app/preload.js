const {
    contextBridge,
    ipcRenderer
} = require('electron');

const path = require('path');
const assistent = require('./scripts/utils/assistent').assistent;
const content = assistent.getData(path.join(__dirname, './data/data.csv'));

// sending to render process 
// @content
// @resetDefinition func
contextBridge.exposeInMainWorld('electron', {
    content: assistent.parseToDefinitionAndText(content),
    resetDefinition: () => assistent.pushDefinitionToDocument(content),
    resetDefinitionText: () => assistent.replaceDefinitionText(),
    createHTMLTable: () => assistent.contentToHTMLTable(content),
});

// preset first definition to document
window.addEventListener('DOMContentLoaded', () => {
    assistent.pushDefinitionToDocument(content);
    assistent.replaceDefinitionText();
});