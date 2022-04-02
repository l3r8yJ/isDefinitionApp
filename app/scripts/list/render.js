const saveButton = document.getElementById("btn-save");
const backButton = document.getElementById("btn-back");

const saveContent = window.electron.saveContent;
const sendDataUpdate = window.electron.sendDataUpdate;

saveButton.addEventListener("click", () => {
  saveContent();
  sendDataUpdate();
});

backButton.addEventListener("click", () => {
  if (confirm("Are you sure? All unsaved data will be lost.")) window.close();
});
