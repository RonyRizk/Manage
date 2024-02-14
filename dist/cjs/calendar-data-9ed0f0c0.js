'use strict';

const index = require('./index-d93aa7bb.js');

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
  channels: [],
  is_frontdesk_enabled: false,
};
const { state: calendar_data, onChange: onCalendarDatesChange } = index.createStore(initialState);

exports.calendar_data = calendar_data;

//# sourceMappingURL=calendar-data-9ed0f0c0.js.map