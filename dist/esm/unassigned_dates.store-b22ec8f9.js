import { c as createStore } from './index-2bd379e0.js';

const initialState$1 = {
  days: [],
  months: [],
};
const { state: calendar_dates, onChange: onCalendarDatesChange } = createStore(initialState$1);

const initialState = {};
let { state: unassigned_dates } = createStore(initialState);
function addUnassingedDates(data) {
  unassigned_dates = Object.assign(Object.assign({}, unassigned_dates), data);
}
function getUnassignedDates() {
  return unassigned_dates;
}
function removeUnassignedDates(from_date, to_date) {
  const fromTimestamp = convertToDateTimestamp(from_date);
  const toTimestamp = convertToDateTimestamp(to_date);
  Object.keys(unassigned_dates).forEach(key => {
    const keyTimestamp = parseInt(key);
    if (fromTimestamp <= keyTimestamp && keyTimestamp <= toTimestamp) {
      delete unassigned_dates[key];
    }
  });
}
function convertToDateTimestamp(dateStr) {
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export { addUnassingedDates as a, calendar_dates as c, getUnassignedDates as g, removeUnassignedDates as r };

//# sourceMappingURL=unassigned_dates.store-b22ec8f9.js.map