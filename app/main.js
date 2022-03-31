const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      // enablePremoteMode: true,
      enableRemoteModule: true,
      nativeWindowOpen: false,
    },
  });

  mainWindow.loadFile("index.html");
  //mainWindow.webContents.openDevTools();
  return mainWindow;
}

function createListWindow() {
  const listWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "./scripts/list/preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      modal: true,
      show: false,
    },
    title: "Edit",
  });
  listWindow.setTitle("Edit");
  listWindow.loadFile(path.join(__dirname, "./windows/list.html"));
  //listWindow.webContents.openDevTools();
  return listWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();
  let listWindow;

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow.show();
    }
  });

  ipcMain.on("data-update", (event, arg) => {
    event.sender.send("reply-on-update", { not_right: false });
    mainWindow.webContents.send("data-updated", arg);
    mainWindow.webContents.reload();
  });

  ipcMain.on("open-list", () => {
    listWindow = createListWindow();
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
