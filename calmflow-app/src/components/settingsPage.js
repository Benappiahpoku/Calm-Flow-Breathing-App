import React from "react";
import { connect } from "react-redux";
import { setDayStart, setDayEnd, setSelectedDays } from "./actions";
import "./settingsPage.css";

function SettingsPage({ setDayStart, setDayEnd, setSelectedDays }) {
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

  const handleDayToggle = (day) => {
    setSelectedDaysLocal({ ...selectedDays, [day]: !selectedDays[day] });
  };

  return (
    <div className="settings-page">
      <h3>Reminders Day Time Range</h3>
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
      <h3 style={{paddingTop:"30px"}} >Active Days of the week</h3>
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
    </div>
  );
}

const mapDispatchToProps = {
  setDayStart,
  setDayEnd,
  setSelectedDays,
};

export default connect(null, mapDispatchToProps)(SettingsPage);
