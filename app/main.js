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
}

ipcMain.on("open-list", () => {
  createListWindow();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
