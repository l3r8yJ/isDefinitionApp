const saveButton = document.getElementById("btn-save");

const saveContent = window.electron.saveContent;

saveButton.addEventListener("click", () => {
  saveContent();
});
