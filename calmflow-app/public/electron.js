const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const schedule = require("node-schedule");
const notifier = require("node-notifier");

let mainWindow;

function createJob(mainWindow, message, times) {
  return function () {
    console.log(`Sending notification: ${message}`);
    notifier.notify(
      {
        title: "Calmflow Reminder",
        message: message,
        icon: path.join(__dirname, "icon.png"),
        wait: true,
      },
      (err, response) => {
        if (err) {
          console.log("Error sending notification:", err);
        } else {
          console.log("Notification sent:", response);
        }
      }
    );

    // Send a message to the renderer process
    mainWindow.webContents.send(
      "show-toast",
      `Congratulations! Your form has been submitted successfully. Your message "${message}" will be shown ${times} times during the day.`
    );
  };
}

async function createWindow() {
  const isDev = (await import("electron-is-dev")).default;

  mainWindow = new BrowserWindow({
    width: 375,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.webContents.on(
    "console-message",
    (event, level, message, line, sourceId) => {
      console.log(
        "MainWindow.webContents console log",
        JSON.stringify(message, null, 2)
      );
    }
  );
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(
  "sendNotification",
  (event, { message, times, dayStart, dayEnd, selectedDays }) => {
    console.log(
      "Message from ipcMain console log",
      JSON.stringify(message, null, 2)
    );

    // Send a notification immediately
    notifier.notify(
      {
        title: "Submission Successful",
        message: `Congratulations! Your message ${message} will show ${times} times during the day.`,
        icon: path.join(__dirname, "icon.png"), // Path to your icon
        wait: true,
      },
      (err, response) => {
        if (err) {
          console.log("Error sending notification:", err);
        } else {
          console.log("Notification sent:", response);
        }
      }
    );

    if (dayStart && dayEnd) {
      let [startHour, startMinute] = dayStart.split(":").map(Number);
      let [endHour, endMinute] = dayEnd.split(":").map(Number);

      let totalMinutes =
        endHour * 60 + endMinute - (startHour * 60 + startMinute);
      let intervalLength = totalMinutes / times;

      console.log(
        `Scheduling ${times} notifications between ${dayStart} and ${dayEnd}...`
      );

      let today = new Date().getDay();

      for (let day in selectedDays) {
        if (selectedDays[day]) {
          console.log(`Scheduling notifications for day ${day}...`);
          for (let i = 0; i < times; i++) {
            let intervalStart = i * intervalLength;
            let randomMinuteWithinInterval = Math.floor(
              Math.random() * intervalLength
            );

            let notificationMinute = intervalStart + randomMinuteWithinInterval;
            let notificationHour =
              startHour + Math.floor(notificationMinute / 60);
            notificationMinute = notificationMinute % 60;

            let scheduleTime = new Date();
            scheduleTime.setHours(notificationHour, notificationMinute, 0, 0);

            if (Number(day) >= today) {
              scheduleTime = new Date(
                scheduleTime.getTime() +
                  (Number(day) - today) * 24 * 60 * 60 * 1000
              );
            } else {
              scheduleTime = new Date(
                scheduleTime.getTime() +
                  (7 - today + Number(day)) * 24 * 60 * 60 * 1000
              );
            }

            console.log(
              `Scheduling notification for time ${scheduleTime.toString()}...`
            );

            // Create a recurrence rule
            let rule = new schedule.RecurrenceRule();
            rule.dayOfWeek = scheduleTime.getDay();
            rule.hour = scheduleTime.getHours();
            rule.minute = scheduleTime.getMinutes();

            // Schedule the job with the recurrence rule
            schedule.scheduleJob(rule, createJob(mainWindow, message, times));
          }
        }
      }
    } else {
      console.error("dayStart or dayEnd is undefined");
    }
  }
);