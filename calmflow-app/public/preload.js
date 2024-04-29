const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sendNotification: (notification) => {
    console.log("Data from preload.js",notification); // This will log the notification data
    ipcRenderer.send("sendNotification", notification);
  },
});
