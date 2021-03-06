import { app,BrowserWindow} from 'electron';
import * as path from 'path';
import {format as formatUrl} from "url";
import {serverManage} from "./server/ServerManage";
import {command} from "./core/Command";
let mainWindow:BrowserWindow|any;
const isDevelopment = process.env.NODE_ENV !== 'production'
function createMainWindow() {
    const window:BrowserWindow=new BrowserWindow();
    if (isDevelopment) {
        window.webContents.openDevTools()
        window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    }
    else {
        window.loadURL(formatUrl({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }))
        window.setFullScreen(false);
    }
    command.toViewMsg('123456789');
    serverManage.createServer('pingan',8100);
    window.on('closed', () => {
        mainWindow = null
    });
    window.webContents.on('devtools-opened', () => {
        window.focus()
        setImmediate(() => {
            window.focus()
        })
    });
    return window
}

app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow()
    }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow()
})
