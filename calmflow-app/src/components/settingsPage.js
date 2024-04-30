import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDayStart, setDayEnd, setSelectedDays } from "./actions";
import "./settingsPage.css";

function SettingsPage() {
  const dispatch = useDispatch();
  const currentSettings = useSelector((state) => ({
    dayStart: state.dayStart,
    dayEnd: state.dayEnd,
    selectedDays: state.selectedDays,
  }));

  const [dayStart, setDayStartLocal] = useState(currentSettings.dayStart);
  const [dayEnd, setDayEndLocal] = useState(currentSettings.dayEnd);
  const [selectedDays, setSelectedDaysLocal] = useState(
    currentSettings.selectedDays
  );

  useEffect(() => {
    dispatch(setDayStart(dayStart));
  }, [dayStart, dispatch]);

  useEffect(() => {
    dispatch(setDayEnd(dayEnd));
  }, [dayEnd, dispatch]);

  useEffect(() => {
    dispatch(setSelectedDays(selectedDays));
  }, [selectedDays, dispatch]);

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
      <h3 style={{ paddingTop: "30px" }}>Active Days of the week</h3>
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

export default SettingsPage;
