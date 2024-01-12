import { configureStore } from "@reduxjs/toolkit";
import languagesSlice from "./features/languages";
import calendarDataSlice from "./features/calendarData";
import calendarDatesSlice from "./features/calendarDates";
export const store = configureStore({
  reducer: {
    languages: languagesSlice,
    calendar_data: calendarDataSlice,
    calendar_dates: calendarDatesSlice,
  },
});
//# sourceMappingURL=store.js.map
