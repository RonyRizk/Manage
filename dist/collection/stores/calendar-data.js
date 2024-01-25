import { createStore } from "@stencil/store";
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
export const { state: calendar_data, onChange: onCalendarDatesChange } = createStore(initialState);
export default calendar_data;
//# sourceMappingURL=calendar-data.js.map
