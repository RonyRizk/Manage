'use strict';

const calendarData = require('./calendar-data-00cf91e3.js');
const channel_store = require('./channel.store-d6067ee4.js');
const axios = require('./axios-394374e5.js');

class RoomService {
  async fetchData(id, language) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.axios.post(`/Get_Exposed_Property?Ticket=${token}`, { id, language });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const results = data.My_Result;
        calendarData.calendar_data.adultChildConstraints = results.adult_child_constraints;
        calendarData.calendar_data.allowedBookingSources = results.allowed_booking_sources;
        calendarData.calendar_data.allowed_payment_methods = results.allowed_booking_methods;
        calendarData.calendar_data.currency = results.currency;
        calendarData.calendar_data.is_vacation_rental = results.is_vacation_rental;
        calendarData.calendar_data.pickup_service = results.pickup_service;
        calendarData.calendar_data.max_nights = results.max_nights;
        calendarData.calendar_data.roomsInfo = results.roomtypes;
        channel_store.channels_data.connected_channels = results.connected_channels;
        calendarData.calendar_data.taxes = results.taxes;
        calendarData.calendar_data.is_frontdesk_enabled = results.is_frontdesk_enabled;
        return data;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getExposedChannels() {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.axios.post(`/Get_Exposed_Channels?Ticket=${token}`, {});
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const results = data.My_Result;
        channel_store.channels_data.channels = results;
        return data;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async fetchLanguage(code) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.axios.post(`/Get_Exposed_Language?Ticket=${token}`, { code });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        let entries = this.transformArrayToObject(data.My_Result.entries);
        axios.locales.entries = entries;
        axios.locales.direction = data.My_Result.direction;
        return { entries, direction: data.My_Result.direction };
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  transformArrayToObject(data) {
    let object = {};
    for (const d of data) {
      object[d.code] = d.description;
    }
    return object;
  }
}

const initialState$1 = {
  days: [],
  months: [],
};
const { state: calendar_dates, onChange: onCalendarDatesChange } = axios.createStore(initialState$1);

const initialState = {};
let { state: unassigned_dates } = axios.createStore(initialState);
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

exports.RoomService = RoomService;
exports.addUnassingedDates = addUnassingedDates;
exports.calendar_dates = calendar_dates;
exports.getUnassignedDates = getUnassignedDates;
exports.removeUnassignedDates = removeUnassignedDates;

//# sourceMappingURL=unassigned_dates.store-ab43c484.js.map