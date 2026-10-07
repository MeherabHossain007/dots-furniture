const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Prevent GPU disk cache lock conflict on Windows
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');

// Single instance lock to prevent multiple instances clashing over user data
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  process.exit(0);
}

let mainWindow = null;

function getStoragePath() {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'dots_furniture_employees_v2.json');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1080,
    minHeight: 700,
    frame: false, // Frameless window for bespoke Windows titlebar
    backgroundColor: '#F7F8FA',
    title: 'DOTS Furniture & Décor - Employee Management System',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, 'src', 'assets', 'icon.png')
  });

  const distPath = path.join(__dirname, 'dist', 'index.html');
  const srcPath = path.join(__dirname, 'src', 'index.html');

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else if (fs.existsSync(distPath)) {
    mainWindow.loadFile(distPath);
  } else {
    mainWindow.loadFile(srcPath);
  }

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-maximized-state', true);
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-maximized-state', false);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Window controls IPC
ipcMain.on('window-minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-maximize-toggle', () => {
  if (!mainWindow) return;
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on('window-close', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.handle('is-window-maximized', () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});

// Data Persistence IPC
ipcMain.handle('load-employee-data', async () => {
  try {
    const storageFile = getStoragePath();
    if (fs.existsSync(storageFile)) {
      const data = fs.readFileSync(storageFile, 'utf-8');
      return JSON.parse(data);
    }
    const initialDataPath = path.join(__dirname, 'src', 'data', 'employees.json');
    if (fs.existsSync(initialDataPath)) {
      const data = fs.readFileSync(initialDataPath, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (err) {
    console.error('Error loading employee data:', err);
    return null;
  }
});

ipcMain.handle('save-employee-data', async (event, data) => {
  try {
    const storageFile = getStoragePath();
    fs.writeFileSync(storageFile, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
  } catch (err) {
    console.error('Error saving employee data:', err);
    return { success: false, error: err.message };
  }
});

// Native Export / Save Dialog IPC
ipcMain.handle('export-csv', async (event, csvContent, defaultFilename) => {
  try {
    if (!mainWindow) return { canceled: true };
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Export Leave Tracker Data to CSV',
      defaultPath: defaultFilename || 'DOTS_Furniture_Leave_Tracker_2026.csv',
      filters: [
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (canceled || !filePath) return { canceled: true };

    fs.writeFileSync(filePath, csvContent, 'utf-8');
    return { success: true, filePath };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('export-json', async (event, jsonData, defaultFilename) => {
  try {
    if (!mainWindow) return { canceled: true };
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Backup Employee & Leave Database',
      defaultPath: defaultFilename || 'dots_furniture_backup.json',
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (canceled || !filePath) return { canceled: true };

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
    return { success: true, filePath };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('import-json', async () => {
  try {
    if (!mainWindow) return { canceled: true };
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: 'Import Employee & Leave Database',
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    });

    if (canceled || !filePaths || filePaths.length === 0) return { canceled: true };

    const content = fs.readFileSync(filePaths[0], 'utf-8');
    const parsed = JSON.parse(content);
    return { success: true, data: parsed, filePath: filePaths[0] };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('print-window', async () => {
  if (mainWindow) {
    mainWindow.webContents.print({ silent: false, printBackground: true });
    return { success: true };
  }
  return { success: false };
});
