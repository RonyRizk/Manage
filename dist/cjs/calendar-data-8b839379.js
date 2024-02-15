'use strict';

const axios = require('./axios-394374e5.js');

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
  connected_channels: [],
  is_frontdesk_enabled: false,
};
const { state: calendar_data, onChange: onCalendarDatesChange } = axios.createStore(initialState);

exports.calendar_data = calendar_data;

//# sourceMappingURL=calendar-data-8b839379.js.map