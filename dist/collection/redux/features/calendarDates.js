import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  days: [],
  months: [],
};
export const calendarDatesSlice = createSlice({
  name: 'calendar_dates',
  initialState,
  reducers: {
    addCalendarDates: (state, action) => {
      return Object.assign(Object.assign({}, state), action.payload);
    },
    updateCalendarDates: (state, action) => {
      const updates = action.payload;
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          state[key] = Object.assign(Object.assign({}, state[key]), updates[key]);
        }
      }
      return state;
    },
  },
});
export const { addCalendarDates, updateCalendarDates } = calendarDatesSlice.actions;
export default calendarDatesSlice.reducer;
//# sourceMappingURL=calendarDates.js.map
