'use strict';

const axios = require('./axios-01143d9d.js');
const channel_store = require('./channel.store-9a8927a2.js');
const locales_store = require('./locales.store-7a5809fe.js');

class RoomService {
  constructor() {
    this.token = JSON.parse(sessionStorage.getItem('token'));
  }
  async fetchData(id, language) {
    try {
      if (this.token !== null) {
        const { data } = await axios.axios.post(`/Get_Exposed_Property?Ticket=${this.token}`, { id, language });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const results = data.My_Result;
        axios.calendar_data.adultChildConstraints = results.adult_child_constraints;
        axios.calendar_data.allowedBookingSources = results.allowed_booking_sources;
        axios.calendar_data.allowed_payment_methods = results.allowed_booking_methods;
        axios.calendar_data.currency = results.currency;
        axios.calendar_data.is_vacation_rental = results.is_vacation_rental;
        axios.calendar_data.pickup_service = results.pickup_service;
        axios.calendar_data.max_nights = results.max_nights;
        channel_store.channels_data.connected_channels = results.connected_channels;
        axios.calendar_data.is_frontdesk_enabled = results.is_frontdesk_enabled;
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
        const { data } = await axios.axios.post(`/Get_Exposed_Channels?Ticket=${this.token}`, {});
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
      if (this.token !== null) {
        const { data } = await axios.axios.post(`/Get_Exposed_Language?Ticket=${this.token}`, { code });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        let entries = this.transformArrayToObject(data.My_Result.entries);
        locales_store.locales.entries = entries;
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

//# sourceMappingURL=room.service-4c44d460.js.map