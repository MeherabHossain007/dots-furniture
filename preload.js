const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  minimize: () => ipcRenderer.send('window-minimize'),
  maximizeToggle: () => ipcRenderer.send('window-maximize-toggle'),
  close: () => ipcRenderer.send('window-close'),
  isMaximized: () => ipcRenderer.invoke('is-window-maximized'),
  onMaximizedState: (callback) => {
    ipcRenderer.on('window-maximized-state', (event, state) => callback(state));
  },

  // Persistence
  loadData: () => ipcRenderer.invoke('load-employee-data'),
  saveData: (data) => ipcRenderer.invoke('save-employee-data', data),

  // File operations
  exportCSV: (csvContent, defaultFilename) => ipcRenderer.invoke('export-csv', csvContent, defaultFilename),
  exportJSON: (jsonData, defaultFilename) => ipcRenderer.invoke('export-json', jsonData, defaultFilename),
  importJSON: () => ipcRenderer.invoke('import-json'),
  printWindow: () => ipcRenderer.invoke('print-window')
});
