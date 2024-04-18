'use strict';

const Token = require('./Token-7fd57fe8.js');
const calendarData = require('./calendar-data-0a2c60be.js');
const locales_store = require('./locales.store-8fed15eb.js');

class RoomService extends Token.Token {
  async fetchData(id, language) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await Token.axios.post(`/Get_Exposed_Property?Ticket=${token}`, { id, language });
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
        calendarData.calendar_data.taxes = results.taxes;
        calendarData.calendar_data.id = results.id;
        calendarData.calendar_data.country = results.country;
        calendarData.calendar_data.name = results.name;
        calendarData.calendar_data.tax_statement = results.tax_statement;
        calendarData.calendar_data.is_frontdesk_enabled = results.is_frontdesk_enabled;
        calendarData.calendar_data.is_pms_enabled = results.is_pms_enabled;
        return data;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async fetchLanguage(code, sections = ['_PMS_FRONT']) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await Token.axios.post(`/Get_Exposed_Language?Ticket=${token}`, { code, sections });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        let entries = this.transformArrayToObject(data.My_Result.entries);
        locales_store.locales.entries = Object.assign(Object.assign({}, locales_store.locales.entries), entries);
        locales_store.locales.direction = data.My_Result.direction;
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

exports.RoomService = RoomService;

//# sourceMappingURL=room.service-d36aca05.js.map