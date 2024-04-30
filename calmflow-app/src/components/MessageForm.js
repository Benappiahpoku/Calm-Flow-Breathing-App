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
      <div className="form-group">
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
              paddingTop: "30px",
            }}
          >
            <span
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                paddingRight: "5px",
                paddingBottom: "10px",
              }}
            >
              Reminders per day:
            </span>{" "}
            <span>{times}</span>
          </div>
          <div>
            <input
              type="range"
              min="1"
              max="10"
              value={times}
              onChange={(e) => setTimesLocal(e.target.value)}
              required
            />
          </div>
        </label>

        <label>
          <p
            style={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              paddingRight: "5px",
              paddingTop: "30px",
            }}
          >
            {" "}
            Messages:
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessageLocal(e.target.value)}
            required
            style={{ width: "100%", height: "100px" }}
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
