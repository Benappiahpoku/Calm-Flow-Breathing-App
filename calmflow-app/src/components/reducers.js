// reducers.js
import {
  SET_MESSAGE,
  SET_TIMES,
  SET_DAY_START,
  SET_DAY_END,
  SET_SELECTED_DAYS,
} from "./actions";

const initialState = {
  message: "",
  times: 1,
  dayStart: "08:00",
  dayEnd: "17:00",
  selectedDays: {
    Sun: false,
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: false,
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: action.payload };
    case SET_TIMES:
      return { ...state, times: action.payload };
    case SET_DAY_START:
      return { ...state, dayStart: action.payload };
    case SET_DAY_END:
      return { ...state, dayEnd: action.payload };
    case SET_SELECTED_DAYS:
      return { ...state, selectedDays: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
