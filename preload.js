const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('bd_api', {
  setFile: (filepath) => ipcRenderer.send('set-file', filepath),
  start: () => ipcRenderer.sendSync('start'),
  openFileDialog: () => ipcRenderer.sendSync('open-file')
})