'use strict';

const index = require('./index-797ee4c0.js');

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
  is_frontdesk_enabled: false,
  taxes: [],
  id: null,
  name: '',
  token: '',
  tax_statement: '',
  country: undefined,
  is_pms_enabled: false,
};
const { state: calendar_data, onChange: onCalendarDatesChange } = index.createStore(initialState);

exports.calendar_data = calendar_data;

//# sourceMappingURL=calendar-data-0a2c60be.js.map