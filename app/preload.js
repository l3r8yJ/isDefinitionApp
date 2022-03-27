const {
    contextBridge,
    ipcRenderer
} = require('electron');

const path = require('path');
const assistent = require('./scripts/utils/assistent').assistent;
const content = assistent.getData(path.join(__dirname, './data/data.csv'));

contextBridge.exposeInMainWorld('electron', {
    content: assistent.parseToDefinitionAndText(content),
    resetDefinition: () => {
        assistent.pushDefinitionToDocument();
    }
})

window.addEventListener('DOMContentLoaded', () => {
    assistent.pushDefinitionToDocument(content);
});