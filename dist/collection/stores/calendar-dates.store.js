import { createStore } from "@stencil/store";
const initialState = {
  days: [],
  months: [],
};
export const { state: calendar_dates, onChange: onCalendarDatesChange } = createStore(initialState);
export default calendar_dates;
//# sourceMappingURL=calendar-dates.store.js.map
