import { createStore } from "@stencil/store";
const initialState = {};
let { state: unassigned_dates } = createStore(initialState);
export function addUnassingedDates(data) {
  unassigned_dates = Object.assign(Object.assign({}, unassigned_dates), data);
}
export function getUnassignedDates() {
  return unassigned_dates;
}
export function removeUnassignedDates(from_date, to_date) {
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
export default unassigned_dates;
//# sourceMappingURL=unassigned_dates.store.js.map
