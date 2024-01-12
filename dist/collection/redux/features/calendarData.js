import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  adultChildConstraints: {
    adult_max_nbr: 0,
    child_max_nbr: 0,
    child_max_age: 0,
  },
  allowedBookingSources: [],
  currency: undefined,
  endingDate: 0,
  formattedLegendData: undefined,
  is_vacation_rental: false,
  legendData: [],
  roomsInfo: [],
  startingDate: 0,
  language: '',
  toBeAssignedEvents: [],
};
export const calendarDataSlice = createSlice({
  name: 'calendar_data',
  initialState,
  reducers: {
    addCalendarData: (state, action) => {
      return Object.assign(Object.assign({}, state), action.payload);
    },
    updateCalendarData: (state, action) => {
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
export const { addCalendarData, updateCalendarData } = calendarDataSlice.actions;
export default calendarDataSlice.reducer;
//# sourceMappingURL=calendarData.js.map
