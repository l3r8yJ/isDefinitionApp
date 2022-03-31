const { contextBridge, ipcRenderer } = require("electron");

const path = require("path");
const assistant = require("./scripts/utils/assistant").assistant;
let content = assistant.getData(path.join(__dirname, "./data/data.csv"));
let container = "";

// sending to render process
contextBridge.exposeInMainWorld("electron", {
  content: assistant.parseToDefinitionAndText(content),
  resetDefinition: () => assistant.pushDefinitionToDocument(content),
  resetDefinitionText: () => assistant.replaceDefinitionText(),
  createHTMLTable: () => assistant.contentToHTMLTable(content),
  openList: () => openList(),
  testFunc: () => {},
});

// preset first definition to document
window.addEventListener("DOMContentLoaded", () => {
  assistant.pushDefinitionToDocument(content);
  assistant.replaceDefinitionText();
});

function openList() {
  ipcRenderer.send("open-list");
}

ipcRenderer.on("data-updated", (event, arg) => {
  console.log({ type: typeof arg, data: arg });
  container = assistant.parseToDefinitionAndText(arg);
  contextBridge.exposeInMainWorld("electron", {
    refreshedContent: container,
  });
});
