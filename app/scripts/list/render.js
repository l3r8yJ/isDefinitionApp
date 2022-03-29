const saveButton = document.getElementById("btn-save");

const saveContent = window.electron.saveContent;

saveButton.addEventListener("click", () => {
  const content = document.getElementById("text-area").value;
  saveContent(content.toString());
});
