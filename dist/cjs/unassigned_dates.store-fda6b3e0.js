'use strict';

const locales_store = require('./locales.store-0567c122.js');

const initialState$1 = {
  days: [],
  months: [],
};
const { state: calendar_dates, onChange: onCalendarDatesChange } = locales_store.createStore(initialState$1);

const initialState = {
  unassigned_dates: {},
};
let { state: unassigned_dates, onChange: handleUnAssignedDatesChange } = locales_store.createStore(initialState);
function addUnassingedDates(data) {
  unassigned_dates.unassigned_dates = Object.assign(Object.assign({}, unassigned_dates.unassigned_dates), data);
  /*
   try {
      //console.log("called")
      let categorisedRooms = {};
      const result = await this.toBeAssignedService.getUnassignedRooms(
        this.propertyid,
        dateToFormattedString(new Date(+key)),
        calendarData.roomsInfo,
        calendarData.formattedLegendData,
      );
      result.forEach(room => {
        if (!categorisedRooms.hasOwnProperty(room.RT_ID)) {
          categorisedRooms[room.RT_ID] = [room];
        } else {
          categorisedRooms[room.RT_ID].push(room);
        }
      });
      this.unassignedDates[key].categories = categorisedRooms;
    } catch (error) {
      //  toastr.error(error);
    }
  */
}
function getUnassignedDates() {
  return unassigned_dates.unassigned_dates;
}
function removeUnassignedDates(from_date, to_date) {
  const fromTimestamp = convertToDateTimestamp(from_date);
  const toTimestamp = convertToDateTimestamp(to_date);
  Object.keys(unassigned_dates.unassigned_dates).forEach(key => {
    const keyTimestamp = parseInt(key);
    if (fromTimestamp <= keyTimestamp && keyTimestamp <= toTimestamp) {
      delete unassigned_dates.unassigned_dates[key];
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
exports.handleUnAssignedDatesChange = handleUnAssignedDatesChange;
exports.removeUnassignedDates = removeUnassignedDates;

//# sourceMappingURL=unassigned_dates.store-fda6b3e0.js.map