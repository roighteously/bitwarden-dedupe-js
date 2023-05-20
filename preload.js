const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('bd_api', {
  setFile: (filepath) => ipcRenderer.send('set-file', filepath),
  start: () => ipcRenderer.send('start'),
  readFile: () => ipcRenderer.sendSync('file-read')
})