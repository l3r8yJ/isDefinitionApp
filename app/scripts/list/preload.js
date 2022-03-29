const fs = require("fs");
const { contextBridge, ipcRenderer } = require("electron");

const path = require("path");
const assistant = require("../utils/assistant").assistant;
const content = assistant.getData(path.join(__dirname, "../../data/data.csv"));

contextBridge.exposeInMainWorld("electron", {
  saveContent: () => saveContent(),
});

function saveContent(content) {
  try {
    fs.writeFileSync(
      path.join(__dirname, "../../data/data.csv"),
      content,
      "utf8"
    );
    alert("Данные успешно сохранены!");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File not found!");
    } else {
      console.log(error);
    }
  }
}

function presetDocument(content) {
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
