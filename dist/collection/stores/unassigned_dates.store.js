import { createStore } from "@stencil/store";
const initialState = {
  unassigned_dates: {},
};
export let { state: unassigned_dates, onChange: handleUnAssignedDatesChange } = createStore(initialState);
export function addUnassingedDates(data) {
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
export function getUnassignedDates() {
  return unassigned_dates.unassigned_dates;
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
