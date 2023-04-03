const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");
const { PythonShell } = require("python-shell");
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      skipTaskbar: true,
    },
  });

  win.setMenuBarVisibility(false);

  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;
  win.loadURL(url);
}

app.whenReady().then(() => {
  createWindow();

  // Set up the IPC listener for the 'get-directory-path' event
  ipcMain.handle(
    "start-search",
    async (
      event,
      directoryPath,
      keywords,
      wordsBefore,
      wordsAfter,
      lang,
      caseSens
    ) => {
      const scriptPath = path.join(__dirname, "..", "..", "fastMode.py");
      let options = {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        args: [
          directoryPath,
          keywords,
          wordsBefore,
          wordsAfter,
          lang,
          caseSens,
        ],
      };
      let pyshell = new PythonShell(scriptPath, options);

      pyshell.on("message", function (message) {
        // Parse the message as a JSON object
        const data = JSON.parse(message);
        // Check the message type and handle it accordingly
        if (data.type === "progress") {
          // Update the progress bar value in the React app
          win.webContents.send("update-progress", data.value);
          console.log("Progress:", data.value);
        }
        if (data.type === "results") {
          // Update the progress bar value in the React app
          win.webContents.send("results", data.value);
          console.log( data.value);
        }
      });
      // end the input stream and allow the process to exit
      pyshell.end(function (err, code, signal) {
        if (err) throw err;
        console.log("The exit code was: " + code);
        console.log("The exit signal was: " + signal);
        console.log("finished");
      });

      response = directoryPath;

      return response;
    }
  );
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
