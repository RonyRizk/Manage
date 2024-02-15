import { a as axios, c as calendar_data } from './axios-1b5f6b44.js';
import { a as channels_data } from './channel.store-46919abb.js';
import { l as locales } from './locales.store-39b87886.js';

class RoomService {
  constructor() {
    this.token = JSON.parse(sessionStorage.getItem('token'));
  }
  async fetchData(id, language) {
    try {
      if (this.token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Property?Ticket=${this.token}`, { id, language });
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
        channels_data.connected_channels = results.connected_channels;
        calendar_data.is_frontdesk_enabled = results.is_frontdesk_enabled;
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
      if (this.token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Channels?Ticket=${this.token}`, {});
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const results = data.My_Result;
        channels_data.channels = results;
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
      if (this.token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Language?Ticket=${this.token}`, { code });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        let entries = this.transformArrayToObject(data.My_Result.entries);
        locales.entries = entries;
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

//# sourceMappingURL=room.service-f1aadfb6.js.map