import { T as Token, a as axios } from './Token-2955ce2c.js';
import { c as convertDateToCustomFormat, e as convertDateToTime, d as dateToFormattedString, h as hooks } from './utils-c6c6e62a.js';
import { g as getMyBookings } from './booking.service-f72c95d2.js';
import './locales.store-15011fa2.js';
import './calendar-data-7d89fa9d.js';

class BookingService extends Token {
  async getCalendarData(propertyid, from_date, to_date) {
    try {
      const token = this.getToken();
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
  async fetchGuest(email) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Guest?Ticket=${token}`, { email });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async editExposedGuest(guest, book_nbr) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await axios.post(`/Edit_Exposed_Guest?Ticket=${token}`, Object.assign(Object.assign({}, guest), { book_nbr }));
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getBookingAvailability(from_date, to_date, propertyid, adultChildCount, language, room_type_ids, currency) {
    try {
      const token = this.getToken();
      if (token) {
        const { data } = await axios.post(`/Get_Exposed_Booking_Availability?Ticket=${token}`, {
          propertyid,
          from_date,
          to_date,
          adult_nbr: adultChildCount.adult,
          child_nbr: adultChildCount.child,
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
      const token = this.getToken();
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
      const token = this.getToken();
      if (token) {
        const { data } = await axios.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${token}`, {
          TBL_NAMES: ['_ARRIVAL_TIME', '_RATE_PRICING_MODE', '_BED_PREFERENCE_TYPE'],
        });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const res = data.My_Result;
        return {
          arrivalTime: res.filter(e => e.TBL_NAME === '_ARRIVAL_TIME'),
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
      const token = this.getToken();
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
      const token = this.getToken();
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
      const token = this.getToken();
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
      const token = this.getToken();
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
  async getExposedBooking(booking_nbr, language) {
    try {
      const token = this.getToken();
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
  calculateTotalRate(rate, totalNights, isRateModified, preference) {
    if (isRateModified && preference === 2) {
      return +rate;
    }
    return +rate / +totalNights;
  }
  async fetchExposedGuest(email, property_id) {
    try {
      const token = this.getToken();
      if (token) {
        const { data } = await axios.post(`/Fetch_Exposed_Guests?Ticket=${token}`, {
          email,
          property_id,
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
  async fetchExposedBookings(booking_nbr, property_id, from_date, to_date) {
    try {
      const token = this.getToken();
      if (token) {
        const { data } = await axios.post(`/Fetch_Exposed_Bookings?Ticket=${token}`, {
          booking_nbr,
          property_id,
          from_date,
          to_date,
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
  async getPCICardInfoURL(BOOK_NBR) {
    try {
      const token = this.getToken();
      if (token) {
        const { data } = await axios.post(`/Get_PCI_Card_Info_URL?Ticket=${token}`, {
          BOOK_NBR,
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
  async bookUser(bookedByInfoData, check_in, fromDate, toDate, guestData, totalNights, source, propertyid, rooms, currency, bookingNumber, defaultGuest, arrivalTime, pr_id, identifier) {
    try {
      const token = this.getToken();
      if (token) {
        const fromDateStr = dateToFormattedString(fromDate);
        const toDateStr = dateToFormattedString(toDate);
        let guest = {
          email: bookedByInfoData.email || null,
          first_name: bookedByInfoData.firstName,
          last_name: bookedByInfoData.lastName,
          country_id: bookedByInfoData.countryId === '' ? null : bookedByInfoData.countryId,
          city: null,
          mobile: bookedByInfoData.contactNumber === null ? '' : bookedByInfoData.contactNumber,
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
          is_pms: true,
          is_direct: true,
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
            arrival: { code: arrivalTime ? arrivalTime : bookedByInfoData.selectedArrivalTime },
            guest: defaultGuest || guest,
            rooms: [
              ...guestData.map(data => ({
                identifier: identifier || null,
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
                unit: typeof pr_id === 'undefined' && data.roomId === '' ? null : { id: +pr_id || +data.roomId },
                occupancy: {
                  adult_nbr: data.adultCount,
                  children_nbr: data.childrenCount,
                  infant_nbr: null,
                },
                bed_preference: data.preference,
                from_date: fromDateStr,
                to_date: toDateStr,
                notes: null,
                days: this.generateDays(fromDateStr, toDateStr, this.calculateTotalRate(data.rate, totalNights, data.isRateModified, data.rateType)),
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
              ...rooms,
            ],
          },
        };
        console.log('book user payload', body);
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

const bookingStatus = {
  '000': 'IN-HOUSE',
  '001': 'PENDING-CONFIRMATION',
  '002': 'CONFIRMED',
  '003': 'CHECKED-OUT',
};
function formatName(firstName, lastName) {
  if (firstName === null && lastName === null)
    return '';
  if (lastName !== null && lastName !== '') {
    return `${firstName !== null && firstName !== void 0 ? firstName : ''} , ${lastName !== null && lastName !== void 0 ? lastName : ''}`;
  }
  return firstName;
}
function transformNewBooking(data) {
  let bookings = [];
  //console.log(data);
  const renderStatus = room => {
    const now = hooks();
    const toDate = hooks(room.to_date, 'YYYY-MM-DD');
    const fromDate = hooks(room.from_date, 'YYYY-MM-DD');
    if (fromDate.isSame(now, 'day') && now.hour() >= 12) {
      return bookingStatus['000'];
    }
    else if (now.isAfter(fromDate, 'day') && now.isBefore(toDate, 'day')) {
      return bookingStatus['000'];
    }
    else if (toDate.isSame(now, 'day') && now.hour() < 12) {
      return bookingStatus['000'];
    }
    else if ((toDate.isSame(now, 'day') && now.hour() >= 12) || toDate.isBefore(now, 'day')) {
      return bookingStatus['003'];
    }
    else {
      return bookingStatus[(data === null || data === void 0 ? void 0 : data.status.code) || '001'];
    }
    // if (toDate.isBefore(now, 'day') || (toDate.isSame(now, 'day') && now.hour() >= 12)) {
    //   return bookingStatus['003'];
    // } else {
    //   return bookingStatus[fromDate.isSameOrBefore(now, 'day') ? '000' : data?.status.code || '001'];
    // }
  };
  const rooms = data.rooms.filter(room => !!room['assigned_units_pool']);
  rooms.forEach(room => {
    var _a, _b;
    bookings.push({
      ID: room['assigned_units_pool'],
      TO_DATE: room.to_date,
      FROM_DATE: room.from_date,
      NO_OF_DAYS: room.days.length,
      ARRIVAL: data.arrival,
      IS_EDITABLE: true,
      BALANCE: (_a = data.financial) === null || _a === void 0 ? void 0 : _a.due_amount,
      STATUS: renderStatus(room),
      NAME: formatName(room.guest.first_name, room.guest.last_name),
      PHONE: (_b = data.guest.mobile) !== null && _b !== void 0 ? _b : '',
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
      POOL: room['assigned_units_pool'],
      GUEST: data.guest,
      ROOMS: data.rooms,
      BOOKING_NUMBER: data.booking_nbr,
      cancelation: room.rateplan.cancelation,
      guarantee: room.rateplan.guarantee,
      TOTAL_PRICE: room.gross_total,
      COUNTRY: data.guest.country_id,
      FROM_DATE_STR: data.format.from_date,
      TO_DATE_STR: data.format.to_date,
      adult_child_offering: room.rateplan.selected_variation.adult_child_offering,
      ARRIVAL_TIME: data.arrival.description,
      origin: data.origin,
      channel_booking_nbr: data.channel_booking_nbr,
      is_direct: data.is_direct,
      NOTES: data.is_direct ? data.remark : null,
      SOURCE: { code: data.source.code, description: data.source.description, tag: data.source.tag },
      ota_notes: data.ota_notes,
    });
  });
  return bookings;
}
function calculateDaysBetweenDates(from_date, to_date) {
  const startDate = hooks(from_date, 'YYYY-MM-DD');
  const endDate = hooks(to_date, 'YYYY-MM-DD');
  const daysDiff = endDate.diff(startDate, 'days');
  return daysDiff;
}

function isBlockUnit(status_code) {
  return ['003', '002', '004'].includes(status_code);
}
function getCurrencySymbol(currencyCode) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(0).replace(/[0-9]/g, '').trim();
}
function renderTime(time) {
  return time < 10 ? time.toString().padStart(2, '0') : time.toString();
}
function formatAmount(currency, amount) {
  const symbol = getCurrencySymbol(currency);
  return symbol + amount.toFixed(2);
}

export { BookingService as B, calculateDaysBetweenDates as c, formatAmount as f, isBlockUnit as i, renderTime as r, transformNewBooking as t };

//# sourceMappingURL=utils-e477193f.js.map