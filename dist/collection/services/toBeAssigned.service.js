import axios from "axios";
import { dateDifference, dateToFormattedString } from "../utils/utils";
export class ToBeAssignedService {
  async getUnassignedDates(propertyid, from_date, to_date) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token) {
        const { data } = await axios.post(`/Get_UnAssigned_Dates?Ticket=${token}`, {
          propertyid,
          from_date,
          to_date,
        });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return this.convertUnassignedDates(data.My_Result);
      }
      else {
        throw new Error('Invalid Token');
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async getUnassignedRooms(propertyid, specific_date, roomInfo, formattedLegendData) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token) {
        const { data } = await axios.post(`/Get_Aggregated_UnAssigned_Rooms?Ticket=${token}`, {
          propertyid,
          specific_date,
        });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return this.transformToAssignable(data, roomInfo, formattedLegendData);
      }
      else {
        throw new Error('Invalid Token');
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async assignUnit(booking_nbr, identifier, pr_id) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token) {
        const { data } = await axios.post(`/Assign_Exposed_Room?Ticket=${token}`, {
          booking_nbr,
          identifier,
          pr_id,
        });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        console.log(data);
        return data;
      }
      else {
        throw new Error('Invalid token');
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  cleanSpacesAndSpecialChars(str) {
    const regex = /[^a-zA-Z0-9]+/g;
    return str.replace(regex, '');
  }
  transformToAssignable(data, roomInfo, formattedLegendData) {
    const result = [];
    data.My_Result.forEach((customer) => {
      customer.unassigned_rooms.forEach((room) => {
        let roomCategory = {
          roomTypeName: room.room_type_name,
          ID: room.identifier,
          NAME: room.guest_name,
          identifier: room.identifier,
          FROM_DATE: room.unassigned_date,
          TO_DATE: room.unassigned_date,
          BOOKING_NUMBER: room.book_nbr,
          STATUS: 'IN-HOUSE',
          defaultDateRange: {
            fromDate: undefined,
            toDate: undefined,
            fromDateTimeStamp: 0,
            toDateTimeStamp: 0,
            fromDateStr: '',
            toDateStr: '',
            dateDifference: 0,
          },
          NO_OF_DAYS: 1,
          roomsInfo: roomInfo,
          legendData: formattedLegendData,
          availableRooms: [],
          RT_ID: this.getRoomTypeId(room.room_type_name, roomInfo),
        };
        this.updateAvailableRooms(room, roomCategory, formattedLegendData, roomInfo);
        this.addDefaultDateRange(roomCategory);
        result.push(roomCategory);
      });
    });
    return result;
  }
  addDefaultDateRange(roomCategory) {
    roomCategory.defaultDateRange.fromDate = new Date(roomCategory.FROM_DATE + 'T00:00:00');
    roomCategory.defaultDateRange.fromDateStr = dateToFormattedString(roomCategory.defaultDateRange.fromDate);
    roomCategory.defaultDateRange.fromDateTimeStamp = roomCategory.defaultDateRange.fromDate.getTime();
    roomCategory.defaultDateRange.toDate = new Date(roomCategory.TO_DATE + 'T00:00:00');
    roomCategory.defaultDateRange.toDateStr = dateToFormattedString(roomCategory.defaultDateRange.toDate);
    roomCategory.defaultDateRange.toDateTimeStamp = roomCategory.defaultDateRange.toDate.getTime();
    roomCategory.defaultDateRange.dateDifference = roomCategory.NO_OF_DAYS;
  }
  getRoomTypeId(roomName, roomInfo) {
    return roomInfo.find(room => this.cleanSpacesAndSpecialChars(room.name) === this.cleanSpacesAndSpecialChars(roomName)).id || null;
  }
  updateAvailableRooms(room, roomCategory, formattedLegendData, roomsInfo) {
    const rooms = [];
    room.assignable_units.forEach((unit) => {
      if (unit.Is_Fully_Available && !unit.Is_Not_Available) {
        const days = dateDifference(unit.from_date, unit.to_date);
        rooms.push({
          RT_ID: roomCategory.RT_ID,
          STATUS: 'PENDING-CONFIRMATION',
          FROM_DATE: unit.from_date,
          roomName: unit.name,
          PR_ID: unit.pr_id,
          TO_DATE: unit.to_date,
          NO_OF_DAYS: days,
          ID: 'NEW_TEMP_EVENT',
          NAME: '',
          NOTES: '',
          BALANCE: '',
          INTERNAL_NOTE: '',
          hideBubble: true,
          legendData: formattedLegendData,
          roomsInfo,
        });
        roomCategory.TO_DATE = unit.to_date;
        roomCategory.NO_OF_DAYS = days;
      }
    });
    roomCategory.availableRooms = rooms;
  }
  convertUnassignedDates(dates) {
    let convertedDates = {};
    dates.forEach(date => {
      convertedDates[new Date(date.date).getTime()] = {
        categories: {},
        dateStr: date.description,
      };
    });
    return convertedDates;
  }
}
//# sourceMappingURL=toBeAssigned.service.js.map
