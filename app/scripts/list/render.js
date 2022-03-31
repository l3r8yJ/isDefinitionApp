const saveButton = document.getElementById("btn-save");

const saveContent = window.electron.saveContent;
const sendDataUpdate = window.electron.sendDataUpdate;

saveButton.addEventListener("click", () => {
  saveContent();
  sendDataUpdate();
});
