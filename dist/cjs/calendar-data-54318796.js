'use strict';

const utils = require('./utils-34918619.js');

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
  max_nights: 0,
};
const { state: calendar_data, onChange: onCalendarDatesChange } = utils.createStore(initialState);

exports.calendar_data = calendar_data;

//# sourceMappingURL=calendar-data-54318796.js.map