const {
    app,
    BrowserWindow
} = require('electron')
require('@electron/remote/main').initialize()
require('@electron/remote/main').enable(BrowserWindow)

const path = require('path')

const editPath = '../../windows/list.html'


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            // enablePremoteMode: true,
            enableRemoteModule: true,
        }
    })

    win.loadFile('index.html')
    win.webContents.openDevTools()
}


app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    } else {
        app.quit()
    }
})