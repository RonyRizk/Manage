import { a as axios } from './axios.js';
import { d as dateDifference, c as convertDateToCustomFormat, a as convertDateToTime, b as dateToFormattedString } from './utils.js';
import { h as hooks } from './moment.js';

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
const status = {
  '004': 'BLOCKED',
  '003': 'BLOCKED-WITH-DATES',
  '002': 'BLOCKED',
  '001': 'IN-HOUSE',
};
function formatName(firstName, lastName) {
  if (firstName === null && lastName === null)
    return '';
  if (lastName !== null) {
    return `${firstName !== null && firstName !== void 0 ? firstName : ''} , ${lastName !== null && lastName !== void 0 ? lastName : ''}`;
  }
  return firstName;
}
async function getStayStatus() {
  try {
    const token = JSON.parse(sessionStorage.getItem('token'));
    if (token) {
      const { data } = await axios.post(`/Get_Setup_Entries_By_TBL_NAME_Multi?Ticket=${token}`, {
        TBL_NAMES: ['_STAY_STATUS'],
      });
      return data.My_Result.map(d => ({
        code: d.CODE_NAME,
        value: d.CODE_VALUE_EN,
      }));
    }
    else {
      throw new Error('Invalid Token');
    }
  }
  catch (error) {
    console.log(error);
  }
}
function getDefaultData(cell, stayStatus) {
  var _a;
  if (['003', '002', '004'].includes(cell.STAY_STATUS_CODE)) {
    //console.log('blocked cells', cell);
    return {
      ID: cell.POOL,
      NOTES: '',
      BALANCE: '',
      NAME: cell.My_Block_Info.NOTES !== '' ? cell.My_Block_Info.NOTES : stayStatus.find(st => st.code === cell.STAY_STATUS_CODE).value || '',
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
      OUT_OF_SERVICE: cell.STAY_STATUS_CODE === '004',
      FROM_DATE_STR: cell.My_Block_Info.format.from_date,
      TO_DATE_STR: cell.My_Block_Info.format.to_date,
    };
  }
  console.log('booked cells', cell);
  return {
    ID: cell.POOL,
    TO_DATE: cell.DATE,
    FROM_DATE: cell.DATE,
    NO_OF_DAYS: 1,
    IS_EDITABLE: cell.booking.is_editable,
    STATUS: status[cell.STAY_STATUS_CODE],
    NAME: formatName(cell.room.guest.first_name, cell.room.guest.last_name),
    PHONE: (_a = cell.booking.guest.mobile) !== null && _a !== void 0 ? _a : '',
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
    channel_booking_nbr: cell.booking.channel_booking_nbr,
    origin: cell.booking.origin,
    is_direct: cell.booking.is_direct,
    GUEST: cell.booking.guest,
    BOOKING_NUMBER: cell.booking.booking_nbr,
    cancelation: cell.room.rateplan.cancelation,
    guarantee: cell.room.rateplan.guarantee,
    TOTAL_PRICE: cell.room.total,
    COUNTRY: cell.booking.guest.country_id,
    FROM_DATE_STR: cell.booking.format.from_date,
    TO_DATE_STR: cell.booking.format.to_date,
    adult_child_offering: cell.room.rateplan.selected_variation.adult_child_offering,
    NOTES: cell.booking.remark,
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
  const index = myBookings.findIndex(booking => booking.POOL === cell.POOL);
  if (index === -1) {
    const newData = getDefaultData(cell, stayStatus);
    myBookings.push(newData);
  }
  else {
    const updatedData = updateBookingWithStayData(myBookings[index], cell);
    myBookings[index] = updatedData;
  }
}
function transformNewBooking(data) {
  let bookings = [];
  data.rooms.forEach(room => {
    var _a;
    bookings.push({
      ID: room.identifier,
      TO_DATE: room.to_date,
      FROM_DATE: room.from_date,
      NO_OF_DAYS: room.days.length,
      IS_EDITABLE: true,
      STATUS: status['001'],
      NAME: formatName(room.guest.first_name, room.guest.last_name),
      PHONE: (_a = data.guest.mobile) !== null && _a !== void 0 ? _a : '',
      ENTRY_DATE: '12-12-2023',
      RATE: room.total,
      RATE_PLAN: room.rateplan.name,
      SPLIT_BOOKING: false,
      RATE_PLAN_ID: room.rateplan.id,
      IDENTIFIER: room.identifier,
      RATE_TYPE: room.roomtype.id,
      ADULTS_COUNT: room.occupancy.adult_nbr,
      CHILDREN_COUNT: room.occupancy.children_nbr,
      PR_ID: +room.unit.id,
      POOL: room.identifier,
      GUEST: data.guest,
      BOOKING_NUMBER: data.booking_nbr,
      cancelation: room.rateplan.cancelation,
      guarantee: room.rateplan.guarantee,
      TOTAL_PRICE: room.total,
      COUNTRY: data.guest.country_id,
      FROM_DATE_STR: data.format.from_date,
      TO_DATE_STR: data.format.to_date,
      adult_child_offering: room.rateplan.selected_variation.adult_child_offering,
      ARRIVAL_TIME: data.arrival.description,
      origin: data.origin,
      channel_booking_nbr: data.channel_booking_nbr,
      is_direct: data.is_direct,
      NOTES: data.remark,
    });
  });
  return bookings;
}
async function transformNewBLockedRooms(data) {
  const stayStatus = await getStayStatus();
  return {
    ID: data.POOL,
    NOTES: '',
    BALANCE: '',
    NAME: data.NOTES !== '' ? data.NOTES : stayStatus.find(st => st.code === data.STAY_STATUS_CODE).value || '',
    RELEASE_AFTER_HOURS: data.DESCRIPTION,
    PR_ID: data.pr_id,
    ENTRY_DATE: data.BLOCKED_TILL_DATE,
    ENTRY_HOUR: data.BLOCKED_TILL_HOUR,
    ENTRY_MINUTE: data.BLOCKED_TILL_MINUTE,
    OPTIONAL_REASON: data.NOTES,
    FROM_DATE: data.from_date,
    TO_DATE: data.to_date,
    NO_OF_DAYS: calculateDaysBetweenDates(data.from_date, data.to_date),
    STATUS: status[data.STAY_STATUS_CODE],
    POOL: data.POOL,
    STATUS_CODE: data.STAY_STATUS_CODE,
    OUT_OF_SERVICE: data.STAY_STATUS_CODE === '004',
    FROM_DATE_STR: data.format.from_date,
    TO_DATE_STR: data.format.to_date,
  };
}
function calculateDaysBetweenDates(from_date, to_date) {
  const startDate = hooks(from_date, 'YYYY-MM-DD');
  const endDate = hooks(to_date, 'YYYY-MM-DD');
  const daysDiff = endDate.diff(startDate, 'days');
  return daysDiff;
}

class BookingService {
  async getCalendarData(propertyid, from_date, to_date) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Calendar?Ticket=${token}`, {
          propertyid,
          from_date,
          to_date,
        });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const months = data.My_Result.months;
        const customMonths = [];
        const myBooking = await getMyBookings(months);
        const days = months
          .map(month => {
          customMonths.push({
            daysCount: month.days.length,
            monthName: month.description,
          });
          return month.days.map(day => ({
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
          ExceptionMsg: '',
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
      const token = JSON.parse(sessionStorage.getItem('token'));
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
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data['My_Result'];
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
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token) {
        const { data } = await axios.post(`/Get_Exposed_Countries?Ticket=${token}`, {
          language,
        });
        if (data.ExceptionMsg !== '') {
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
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token) {
        const { data } = await axios.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${token}`, {
          TBL_NAMES: ['_ARRIVAL_TIME', '_BOOKING_SOURCE', '_RATE_PRICING_MODE', '_BED_PREFERENCE_TYPE'],
        });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const res = data.My_Result;
        return {
          arrivalTime: res.filter(e => e.TBL_NAME === '_ARRIVAL_TIME'),
          bookingSource: res.filter(e => e.TBL_NAME === '_BOOKING_SOURCE'),
          ratePricingMode: res.filter(e => e.TBL_NAME === '_RATE_PRICING_MODE'),
          bedPreferenceType: res.filter(e => e.TBL_NAME === '_BED_PREFERENCE_TYPE'),
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
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token) {
        const { data } = await axios.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${token}`, { TBL_NAMES: ['_CALENDAR_BLOCKED_TILL'] });
        if (data.ExceptionMsg !== '') {
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
  async getUserDefaultCountry() {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token) {
        const { data } = await axios.post(`/Get_Country_By_IP?Ticket=${token}`, {
          IP: '',
        });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data['My_Result'];
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async blockUnit(params) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token) {
        const { data } = await axios.post(`/Block_Exposed_Unit?Ticket=${token}`, params);
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        console.log(data);
        return data['My_Params_Block_Exposed_Unit'];
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async getUserInfo(email) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token) {
        const { data } = await axios.post(`/GET_EXPOSED_GUEST?Ticket=${token}`, {
          email,
        });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
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
  async getExoposedBooking(booking_nbr, language) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token) {
        const { data } = await axios.post(`/Get_Exposed_Booking?Ticket=${token}`, {
          booking_nbr,
          language,
        });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
      }
      else {
        throw new Error('Invalid Token');
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  generateDays(from_date, to_date, amount) {
    const startDate = new Date(from_date);
    const endDate = new Date(to_date);
    const days = [];
    while (startDate < endDate) {
      days.push({
        date: startDate.toISOString().split('T')[0],
        amount: amount,
      });
      startDate.setDate(startDate.getDate() + 1);
    }
    return days;
  }
  async bookUser(bookedByInfoData, check_in, fromDate, toDate, guestData, totalNights, source, propertyid, currency, bookingNumber, defaultGuest, arrivalTime, pr_id) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
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
          address: '',
          dob: null,
          subscribe_to_news_letter: bookedByInfoData.emailGuest || false,
          cci: bookedByInfoData.cardNumber
            ? {
              nbr: bookedByInfoData.cardNumber,
              holder_name: bookedByInfoData.cardHolderName,
              expiry_month: bookedByInfoData.expiryMonth,
              expiry_year: bookedByInfoData.expiryYear,
            }
            : null,
        };
        if (bookedByInfoData.id) {
          guest = Object.assign(Object.assign({}, guest), { id: bookedByInfoData.id });
        }
        const body = {
          assign_units: true,
          check_in,
          booking: {
            booking_nbr: bookingNumber || '',
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
            rooms: guestData.map(data => ({
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
              unit: typeof pr_id === 'undefined' && data.roomId === '' ? null : { id: pr_id || data.roomId },
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
        console.log('body', body);
        const { data } = await axios.post(`/DoReservation?Ticket=${token}`, body);
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        console.log(data['My_Result']);
        return data['My_Result'];
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
}

export { BookingService as B, transformNewBooking as a, transformNewBLockedRooms as t };

//# sourceMappingURL=booking.service.js.map