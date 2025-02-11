import { T as Token, a as axios } from './Token-2955ce2c.js';
import { c as calendar_data } from './calendar-data-aa1fc96c.js';
import { l as locales } from './locales.store-103cb063.js';

class RoomService extends Token {
  async fetchData(id, language) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Property?Ticket=${token}`, { id, language });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const results = data.My_Result;
        calendar_data.adultChildConstraints = results.adult_child_constraints;
        calendar_data.allowedBookingSources = results.allowed_booking_sources;
        calendar_data.allowed_payment_methods = results.allowed_booking_methods;
        calendar_data.currency = results.currency;
        calendar_data.is_vacation_rental = results.is_vacation_rental;
        calendar_data.pickup_service = results.pickup_service;
        calendar_data.max_nights = results.max_nights;
        calendar_data.roomsInfo = results.roomtypes;
        calendar_data.taxes = results.taxes;
        calendar_data.id = results.id;
        calendar_data.country = results.country;
        calendar_data.name = results.name;
        calendar_data.tax_statement = results.tax_statement;
        calendar_data.is_frontdesk_enabled = results.is_frontdesk_enabled;
        calendar_data.is_pms_enabled = results.is_pms_enabled;
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
        const { data } = await axios.post(`/Get_Exposed_Language?Ticket=${token}`, { code, sections });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        let entries = this.transformArrayToObject(data.My_Result.entries);
        locales.entries = Object.assign(Object.assign({}, locales.entries), entries);
        locales.direction = data.My_Result.direction;
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

export { RoomService as R };

//# sourceMappingURL=room.service-30afc8ab.js.map