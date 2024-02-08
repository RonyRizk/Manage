import { c as createStore } from './locales.store-71ad774d.js';

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
  allowed_payment_methods: [],
  pickup_service: undefined,
};
const { state: calendar_data, onChange: onCalendarDatesChange } = createStore(initialState);

export { calendar_data as c };

//# sourceMappingURL=calendar-data-cf12969c.js.map