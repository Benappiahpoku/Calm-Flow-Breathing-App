import React from "react";
import { connect } from "react-redux";
import {
  setMessage,
  setTimes,
  setDayStart,
  setDayEnd,
  setSelectedDays,
} from "./actions";
import "./MessageForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MessageForm({
  onSubmit,
  setMessage,
  setTimes,
  setDayStart,
  setDayEnd,
  setSelectedDays,
}) {
  const [message, setMessageLocal] = React.useState("");
  const [times, setTimesLocal] = React.useState(1);
  const [dayStart, setDayStartLocal] = React.useState("08:00");
  const [dayEnd, setDayEndLocal] = React.useState("17:00");
  const [selectedDays, setSelectedDaysLocal] = React.useState({
    Sun: false,
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: false,
  });

  
  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(message);
    setTimes(times);
    setDayStart(dayStart);
    setDayEnd(dayEnd);
    setSelectedDays(selectedDays);
    onSubmit({ message, times, dayStart, dayEnd, selectedDays });

    // Convert selectedDays to a format that the main process expects
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const selectedDaysNumeric = daysOfWeek.reduce((acc, day, index) => {
      acc[index] = selectedDays[day];
      return acc;
    }, {});

    // Send the notification
    if (window.electron) {
      window.electron.sendNotification({
        message: message,
        times,
        dayStart,
        dayEnd,
        selectedDays: selectedDaysNumeric, // Use the converted selectedDays
      });
    } else {
      console.log("window.electron is not defined");
    }
     toast.success(
       `Congratulations! Your message "${message}" will be shown ${times} times during the day.`
     );
  };

  const handleDayToggle = (day) => {
    setSelectedDaysLocal({ ...selectedDays, [day]: !selectedDays[day] });
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <h2>Reminders Day Time Range</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "10px",
        }}
      >
        <label>Your day starts at:</label>
        <div style={{ width: "100px", marginLeft: "10px" }}>
          <input
            type="time"
            value={dayStart}
            onChange={(e) => setDayStartLocal(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "10px",
        }}
      >
        <label>Your day ends at:</label>
        <div style={{ width: "100px", marginLeft: "15px" }}>
          <input
            type="time"
            value={dayEnd}
            onChange={(e) => setDayEndLocal(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <h2>Active Days of the week</h2>
      <div className="days-of-week">
        {Object.keys(selectedDays).map((day) => (
          <button
            key={day}
            type="button"
            className={`day-button ${selectedDays[day] ? "selected" : ""}`}
            onClick={() => handleDayToggle(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div>
        <h2>Set Reminder Messages</h2>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              width: "200px",
            }}
          >
            Reminders per day:{" "}
            <span style={{ marginLeft: "20px" }}>{times}</span>
          </div>
          <div style={{ width: "100%" }}>
            <input
              type="range"
              min="1"
              max="10"
              value={times}
              onChange={(e) => setTimesLocal(e.target.value)}
              required
              style={{ width: "80%", marginTop: "10px" }}
            />
          </div>
        </label>
        <label style={{ display: "flex", alignItems: "flex-start" }}>
          Messages:
          <textarea
            value={message}
            onChange={(e) => setMessageLocal(e.target.value)}
            required
            style={{ width: "100%", marginLeft: "10px", height: "100px" }}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
      <ToastContainer />
    </form>
  );
}

const mapDispatchToProps = {
  setMessage,
  setTimes,
  setDayStart,
  setDayEnd,
  setSelectedDays,
};

export default connect(null, mapDispatchToProps)(MessageForm);
