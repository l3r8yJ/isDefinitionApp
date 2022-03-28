const {
    app,
    BrowserWindow
} = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
            // enablePremoteMode: true,
            enableRemoteModule: true,
        }
    });

    win.loadFile('index.html');
    //win.webContents.openDevTools();
}


app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})


app.on('window-all-closed', () => {
    app.quit();
})