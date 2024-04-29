// actions.js
export const SET_MESSAGE = "SET_MESSAGE";
export const SET_TIMES = "SET_TIMES";
export const SET_DAY_START = "SET_DAY_START";
export const SET_DAY_END = "SET_DAY_END";
export const SET_SELECTED_DAYS = "SET_SELECTED_DAYS";

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});
export const setTimes = (times) => ({ type: SET_TIMES, payload: times });
export const setDayStart = (dayStart) => ({
  type: SET_DAY_START,
  payload: dayStart,
});
export const setDayEnd = (dayEnd) => ({ type: SET_DAY_END, payload: dayEnd });
export const setSelectedDays = (selectedDays) => ({
  type: SET_SELECTED_DAYS,
  payload: selectedDays,
});
