import { a as axios } from './axios.js';
import { d as dateDifference, c as convertDateToCustomFormat, a as convertDateToTime, b as dateToFormattedString } from './utils.js';

async function getMyBookings(months) {
  const myBookings = [];
  const stayStatus = await getStayStatus();
  for (const month of months) {
    for (const day of month.days) {
      for (const room of day.room_types) {
        assignBooking(room.physicalrooms, myBookings, stayStatus);
      }
    }
  }
  return myBookings;
}
function assignBooking(physicalRoom, myBookings, stayStatus) {
  for (const room of physicalRoom) {
    for (const key in room.calendar_cell) {
      if (room.calendar_cell[key].Is_Available === false) {
        addOrUpdateBooking(room.calendar_cell[key], myBookings, stayStatus);
      }
    }
  }
}
function formatName(firstName, lastName) {
  if (firstName === null && lastName === null)
    return "";
  if (lastName !== null) {
    return `${firstName !== null && firstName !== void 0 ? firstName : ""} , ${lastName !== null && lastName !== void 0 ? lastName : ""}`;
  }
  return firstName;
}
async function getStayStatus() {
  try {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      const { data } = await axios.post(`/Get_Setup_Entries_By_TBL_NAME_Multi?Ticket=${token}`, {
        TBL_NAMES: ["_STAY_STATUS"],
      });
      return data.My_Result.map((d) => ({
        code: d.CODE_NAME,
        value: d.CODE_VALUE_EN,
      }));
    }
    else {
      throw new Error("Invalid Token");
    }
  }
  catch (error) {
    console.log(error);
  }
}
const status = {
  "004": "BLOCKED",
  "003": "BLOCKED-WITH-DATES",
  "002": "BLOCKED",
  "001": "IN-HOUSE",
};
function getDefaultData(cell, stayStatus) {
  var _a;
  if (["003", "002", "004"].includes(cell.STAY_STATUS_CODE)) {
    //console.log("blocked cells", cell);
    return {
      ID: cell.POOL,
      NOTES: cell.My_Block_Info.NOTES,
      BALANCE: "",
      NAME: stayStatus.find((st) => st.code === cell.STAY_STATUS_CODE).value || "",
      RELEASE_AFTER_HOURS: cell.My_Block_Info.DESCRIPTION,
      PR_ID: cell.My_Block_Info.pr_id,
      ENTRY_DATE: cell.My_Block_Info.BLOCKED_TILL_DATE,
      ENTRY_HOUR: cell.My_Block_Info.BLOCKED_TILL_HOUR,
      ENTRY_MINUTE: cell.My_Block_Info.BLOCKED_TILL_MINUTE,
      OPTIONAL_REASON: cell.My_Block_Info.NOTES,
      FROM_DATE: cell.DATE,
      TO_DATE: cell.DATE,
      NO_OF_DAYS: 1,
      STATUS: status[cell.STAY_STATUS_CODE],
      POOL: cell.POOL,
      STATUS_CODE: cell.STAY_STATUS_CODE,
      OUT_OF_SERVICE: cell.STAY_STATUS_CODE === "004",
      FROM_DATE_STR: cell.My_Block_Info.format.from_date,
      TO_DATE_STR: cell.My_Block_Info.format.to_date,
    };
  }
  //console.log("booked cells", cell);
  return {
    ID: cell.POOL,
    TO_DATE: cell.DATE,
    FROM_DATE: cell.DATE,
    NO_OF_DAYS: 1,
    IS_EDITABLE: cell.booking.is_editable,
    STATUS: status[cell.STAY_STATUS_CODE],
    NAME: formatName(cell.room.guest.first_name, cell.room.guest.last_name),
    PHONE: (_a = cell.booking.guest.mobile) !== null && _a !== void 0 ? _a : "",
    ENTRY_DATE: cell.booking.booked_on.date,
    RATE: cell.room.total,
    RATE_PLAN: cell.room.rateplan.name,
    SPLIT_BOOKING: false,
    RATE_PLAN_ID: cell.room.rateplan.id,
    IDENTIFIER: cell.room.identifier,
    RATE_TYPE: 1,
    ADULTS_COUNT: cell.room.occupancy.adult_nbr,
    CHILDREN_COUNT: cell.room.occupancy.children_nbr,
    PR_ID: cell.pr_id,
    POOL: cell.POOL,
    GUEST: cell.booking.guest,
    rooms: cell.booking.rooms,
    BOOKING_NUMBER: cell.booking.booking_nbr,
    cancelation: cell.room.rateplan.cancelation,
    guarantee: cell.room.rateplan.guarantee,
    TOTAL_PRICE: cell.room.total,
    COUNTRY: cell.booking.guest.country_id,
    FROM_DATE_STR: cell.booking.format.from_date,
    TO_DATE_STR: cell.booking.format.to_date,
    adult_child_offering: cell.room.rateplan.selected_variation.adult_child_offering,
  };
}
function updateBookingWithStayData(data, cell) {
  data.NO_OF_DAYS = dateDifference(data.FROM_DATE, cell.DATE);
  data.TO_DATE = cell.DATE;
  if (cell.booking) {
    const { arrival } = cell.booking;
    Object.assign(data, {
      ARRIVAL_TIME: arrival.description,
    });
  }
  return data;
}
function addOrUpdateBooking(cell, myBookings, stayStatus) {
  const index = myBookings.findIndex((booking) => booking.POOL === cell.POOL);
  if (index === -1) {
    const newData = getDefaultData(cell, stayStatus);
    myBookings.push(newData);
  }
  else {
    const updatedData = updateBookingWithStayData(myBookings[index], cell);
    myBookings[index] = updatedData;
  }
}

class BookingService {
  async getCalendarData(propertyid, from_date, to_date) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Calendar?Ticket=${token}`, {
          propertyid,
          from_date,
          to_date,
        });
        if (data.ExceptionMsg !== "") {
          throw new Error(data.ExceptionMsg);
        }
        const months = data.My_Result.months;
        const customMonths = [];
        const myBooking = await getMyBookings(months);
        const days = months
          .map((month) => {
          customMonths.push({
            daysCount: month.days.length,
            monthName: month.description,
          });
          return month.days.map((day) => ({
            day: convertDateToCustomFormat(day.description, month.description),
            currentDate: convertDateToTime(day.description, month.description),
            dayDisplayName: day.description,
            rate: day.room_types,
            unassigned_units_nbr: day.unassigned_units_nbr,
            occupancy: day.occupancy,
          }));
        })
          .flat();
        return Promise.resolve({
          ExceptionCode: null,
          ExceptionMsg: "",
          My_Params_Get_Rooming_Data: {
            AC_ID: propertyid,
            FROM: data.My_Params_Get_Exposed_Calendar.from_date,
            TO: data.My_Params_Get_Exposed_Calendar.to_date,
          },
          days,
          months: customMonths,
          myBookings: myBooking,
          defaultMonths: months,
        });
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  async getBookingAvailability(from_date, to_date, propertyid, language, room_type_ids, currency) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      if (token) {
        const { data } = await axios.post(`/Get_Exposed_Booking_Availability?Ticket=${token}`, {
          propertyid,
          from_date,
          to_date,
          adult_nbr: 2,
          child_nbr: 0,
          language,
          currency_ref: currency.code,
          room_type_ids,
        });
        if (data.ExceptionMsg !== "") {
          throw new Error(data.ExceptionMsg);
        }
        return data["My_Result"];
      }
      else {
        throw new Error("Token doesn't exist");
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async getCountries(language) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      if (token) {
        const { data } = await axios.post(`/Get_Exposed_Countries?Ticket=${token}`, {
          language,
        });
        if (data.ExceptionMsg !== "") {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async fetchSetupEntries() {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      if (token) {
        const { data } = await axios.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${token}`, {
          TBL_NAMES: [
            "_ARRIVAL_TIME",
            "_BOOKING_SOURCE",
            "_RATE_PRICING_MODE",
            "_BED_PREFERENCE_TYPE",
          ],
        });
        if (data.ExceptionMsg !== "") {
          throw new Error(data.ExceptionMsg);
        }
        const res = data.My_Result;
        return {
          arrivalTime: res.filter((e) => e.TBL_NAME === "_ARRIVAL_TIME"),
          bookingSource: res.filter((e) => e.TBL_NAME === "_BOOKING_SOURCE"),
          ratePricingMode: res.filter((e) => e.TBL_NAME === "_RATE_PRICING_MODE"),
          bedPreferenceType: res.filter((e) => e.TBL_NAME === "_BED_PREFERENCE_TYPE"),
        };
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async getBlockedInfo() {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      if (token) {
        const { data } = await axios.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${token}`, { TBL_NAMES: ["_CALENDAR_BLOCKED_TILL"] });
        if (data.ExceptionMsg !== "") {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async blockUnit(params) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      if (token) {
        const { data } = await axios.post(`/Block_Exposed_Unit?Ticket=${token}`, params);
        if (data.ExceptionMsg !== "") {
          throw new Error(data.ExceptionMsg);
        }
        return data;
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async getUserInfo(email) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      if (token) {
        const { data } = await axios.post(`/GET_EXPOSED_GUEST?Ticket=${token}`, {
          email,
        });
        if (data.ExceptionMsg !== "") {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
      }
      else {
        throw new Error("Invalid Token");
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  generateDays(from_date, to_date, amount) {
    const startDate = new Date(from_date);
    const endDate = new Date(to_date);
    const days = [];
    while (startDate < endDate) {
      days.push({
        date: startDate.toISOString().split("T")[0],
        amount: amount,
      });
      startDate.setDate(startDate.getDate() + 1);
    }
    return days;
  }
  async bookUser(bookedByInfoData, check_in, fromDate, toDate, guestData, totalNights, source, propertyid, currency, bookingNumber, defaultGuest, arrivalTime, pr_id) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      if (token) {
        const fromDateStr = dateToFormattedString(fromDate);
        const toDateStr = dateToFormattedString(toDate);
        let guest = {
          email: bookedByInfoData.email || null,
          first_name: bookedByInfoData.firstName,
          last_name: bookedByInfoData.lastName,
          country_id: bookedByInfoData.countryId,
          city: null,
          mobile: bookedByInfoData.contactNumber,
          address: "",
          dob: null,
          subscribe_to_news_letter: bookedByInfoData.emailGuest || false,
        };
        if (bookedByInfoData.id) {
          guest = Object.assign(Object.assign({}, guest), { id: bookedByInfoData.id });
        }
        const body = {
          assign_units: true,
          check_in,
          booking: {
            booking_nbr: bookingNumber || "",
            from_date: fromDateStr,
            to_date: toDateStr,
            remark: bookedByInfoData.message || null,
            property: {
              id: propertyid,
            },
            source,
            currency,
            arrival: {
              code: arrivalTime || bookedByInfoData.selectedArrivalTime,
            },
            guest: defaultGuest || guest,
            rooms: guestData.map((data) => ({
              roomtype: {
                id: data.roomCategoryId,
                name: data.roomCategoryName,
                physicalrooms: null,
                rateplans: null,
                availabilities: null,
                inventory: data.inventory,
                rate: data.rate / totalNights,
              },
              rateplan: {
                id: data.ratePlanId,
                name: data.ratePlanName,
                rate_restrictions: null,
                variations: null,
                cancelation: data.cancelation,
                guarantee: data.guarantee,
              },
              unit: typeof pr_id === "undefined" && data.roomId === ""
                ? null
                : { id: pr_id || data.roomId },
              occupancy: {
                adult_nbr: data.adultCount,
                children_nbr: data.childrenCount,
                infant_nbr: null,
              },
              from_date: fromDateStr,
              to_date: toDateStr,
              notes: null,
              days: this.generateDays(fromDateStr, toDateStr, +data.rate / totalNights),
              guest: {
                email: null,
                first_name: data.guestName,
                last_name: null,
                country_id: null,
                city: null,
                mobile: null,
                address: null,
                dob: null,
                subscribe_to_news_letter: null,
              },
            })),
          },
        };
        console.log("body", body);
        const { data } = await axios.post(`/DoReservation?Ticket=${token}`, body);
        if (data.ExceptionMsg !== "") {
          throw new Error(data.ExceptionMsg);
        }
        console.log(data);
        return data;
      }
      else {
        throw new Error("Invalid token");
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export { BookingService as B };

//# sourceMappingURL=booking.service.js.map