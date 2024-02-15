'use strict';

const index = require('./index-d93aa7bb.js');

const initialState$1 = {
  days: [],
  months: [],
};
const { state: calendar_dates, onChange: onCalendarDatesChange } = index.createStore(initialState$1);

const initialState = {};
let { state: unassigned_dates } = index.createStore(initialState);
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

exports.addUnassingedDates = addUnassingedDates;
exports.calendar_dates = calendar_dates;
exports.getUnassignedDates = getUnassignedDates;
exports.removeUnassignedDates = removeUnassignedDates;

//# sourceMappingURL=unassigned_dates.store-f121b5c0.js.map