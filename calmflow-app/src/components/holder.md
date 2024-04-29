ipcMain.on("sendNotification", (event, notification) => {
  console.log("Received sendNotification event", notification); // This will log the notification data
});