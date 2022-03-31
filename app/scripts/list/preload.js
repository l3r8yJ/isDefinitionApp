const fs = require("fs");
const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");
const assistant = require("../utils/assistant").assistant;
const content = assistant.getData(path.join(__dirname, "../../data/data.csv"));

contextBridge.exposeInMainWorld("electron", {
  saveContent: () => saveContent(),
  sendDataUpdate: () => sendDataUpdate(),
});

function saveContent() {
  const content = document.getElementById("text-area").value;
  let message = "";

  try {
    fs.writeFileSync(
      path.join(__dirname, "../../data/data.csv"),
      content,
      "utf8"
    );
    message = "Данные успешно сохранены!";
  } catch (error) {
    message = error.message;
  }

  alert(message);
}

function presetDocument(content) {
  if (!content) {
    alert("Content are empty");
    return;
  }

  const tArea = document.getElementById("text-area");
  let text = "";

  content.forEach((element) => {
    text += element + "\n";
  });

  tArea.value = text;
}

window.addEventListener("DOMContentLoaded", () => {
  presetDocument(content);
});

function updateContent() {
  return document.getElementById("text-area").value;
}

function sendDataUpdate() {
  ipcRenderer.send("data-update", updateContent());
}
