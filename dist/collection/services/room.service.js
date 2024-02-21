import calendar_data from "../../../src/stores/calendar-data";
import channels_data from "../../../src/stores/channel.store";
import { locales } from "../../../src/stores/locales.store";
import axios from "axios";
export class RoomService {
  async fetchData(id, language) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
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
        calendar_data.name = results.name;
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
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Channels?Ticket=${token}`, {});
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
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Language?Ticket=${token}`, { code });
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
  async getExposedConnectedChannels(property_id) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Connected_Channels?Ticket=${token}`, { property_id });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        channels_data.connected_channels = data.My_Result;
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
//# sourceMappingURL=room.service.js.map
