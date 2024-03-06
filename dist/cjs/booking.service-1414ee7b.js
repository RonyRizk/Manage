'use strict';

const Token = require('./Token-7fd57fe8.js');
const moment = require('./moment-f96595e5.js');
const locales_store = require('./locales.store-0567c122.js');
const calendarData = require('./calendar-data-d3bf3294.js');

function convertDateToCustomFormat(dayWithWeekday, monthWithYear) {
  const dateStr = `${dayWithWeekday.split(' ')[1]} ${monthWithYear}`;
  const date = moment.hooks(dateStr, 'DD MMM YYYY');
  if (!date.isValid()) {
    throw new Error('Invalid Date');
  }
  return date.format('D_M_YYYY');
}
function convertDateToTime(dayWithWeekday, monthWithYear) {
  const date = moment.hooks(dayWithWeekday + ' ' + monthWithYear, 'ddd DD MMM YYYY').toDate();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}
function dateDifference(FROM_DATE, TO_DATE) {
  const startDate = new Date(FROM_DATE);
  const endDate = new Date(TO_DATE);
  return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
}
function dateToFormattedString(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-based in JS
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function formatLegendColors(legendData) {
  let formattedLegendData = {};
  const statusId = {
    'IN-HOUSE': { id: 1, clsName: 'IN_HOUSE' },
    'CONFIRMED': { id: 2, clsName: 'CONFIRMED' },
    'PENDING-CONFIRMATION': { id: 3, clsName: 'PENDING_CONFIRMATION' },
    'SPLIT-UNIT': { id: 4, clsName: 'SPLIT_UNIT' },
    'CHECKED-IN': { id: 5, clsName: 'CHECKED_IN' },
    'CHECKED-OUT': { id: 5, clsName: 'CHECKED_OUT' },
    'BLOCKED': { id: 6, clsName: 'BLOCKED' },
    'BLOCKED-WITH-DATES': { id: 7, clsName: 'BLOCKED_WITH_DATES' },
    'NOTES': { id: 8, clsName: 'NOTES' },
    'OUTSTANDING-BALANCE': { id: 9, clsName: 'OUTSTANDING_BALANCE' },
    'TEMP-EVENT': { id: 10, clsName: 'PENDING_CONFIRMATION' },
  };
  legendData.forEach(legend => {
    formattedLegendData[legend.id] = legend;
    formattedLegendData.statusId = statusId; // NOTE: This will overwrite the 'statusId' property with every iteration.
  });
  return formattedLegendData;
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
const findCountry = (id, countries) => countries.find(country => country.id === id);
function getReleaseHoursString(releaseDate) {
  const dt = new Date();
  const releaseAfterHours = releaseDate;
  dt.setHours(dt.getHours() + releaseAfterHours, dt.getMinutes(), 0, 0);
  return {
    BLOCKED_TILL_DATE: dateToFormattedString(dt),
    BLOCKED_TILL_HOUR: dt.getHours().toString(),
    BLOCKED_TILL_MINUTE: dt.getMinutes().toString(),
  };
}
function computeEndDate(startDate, numberOfDays) {
  const dateObj = moment.hooks(startDate, 'D_M_YYYY');
  dateObj.add(numberOfDays, 'days');
  return dateObj.format('YYYY-MM-DD');
}
function convertDMYToISO(date) {
  const dateObj = moment.hooks(date, 'D_M_YYYY');
  return dateObj.format('YYYY-MM-DD');
}
function addTwoMonthToDate(date) {
  return moment.hooks(date).add(2, 'months').format('YYYY-MM-DD');
}
function formatDate(dateString, option = 'DD MMM YYYY') {
  const formattedDate = moment.hooks(dateString, option).format('ddd, DD MMM YYYY');
  return formattedDate;
}
function getNextDay(date) {
  return moment.hooks(date).add(1, 'days').format('YYYY-MM-DD');
}
function convertDatePrice(date) {
  return moment.hooks(date, 'YYYY-MM-DD').format('DD/MM ddd');
}
function getDaysArray(date1, date2) {
  let dates = [];
  let start = moment.hooks.min(moment.hooks(date1).add(1, 'days'), moment.hooks(date2));
  let end = moment.hooks.max(moment.hooks(date1), moment.hooks(date2));
  while (start < end) {
    dates.push(start.format('YYYY-MM-DD'));
    start = start.clone().add(1, 'days');
  }
  return dates;
}

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
};
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
async function getStayStatus() {
  try {
    const token = calendarData.calendar_data.token;
    if (token) {
      const { data } = await Token.axios.post(`/Get_Setup_Entries_By_TBL_NAME_Multi?Ticket=${token}`, {
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
function renderBlock003Date(date, hour, minute) {
  const dt = new Date(date);
  dt.setHours(hour);
  dt.setMinutes(minute);
  return `${locales_store.locales.entries.Lcz_BlockedTill} ${moment.hooks(dt).format('MMM DD, HH:mm')}`;
}
function getDefaultData(cell, stayStatus) {
  var _a, _b;
  if (isBlockUnit(cell.STAY_STATUS_CODE)) {
    return {
      ID: cell.POOL,
      NOTES: '',
      BALANCE: '',
      NAME: cell.My_Block_Info.NOTES !== ''
        ? cell.My_Block_Info.NOTES
        : cell.STAY_STATUS_CODE === '003'
          ? renderBlock003Date(cell.My_Block_Info.BLOCKED_TILL_DATE, cell.My_Block_Info.BLOCKED_TILL_HOUR, cell.My_Block_Info.BLOCKED_TILL_MINUTE)
          : stayStatus.find(st => st.code === cell.STAY_STATUS_CODE).value || '',
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
  //console.log('booking', cell);
  // if (!cell.booking.is_direct) {
  //   console.log(formatName(cell.room.guest.first_name, cell.room.guest.last_name), cell.booking.channel_booking_nbr);
  // }
  return {
    ID: cell.POOL,
    TO_DATE: cell.DATE,
    FROM_DATE: cell.DATE,
    NO_OF_DAYS: 1,
    STATUS: bookingStatus[(_a = cell.booking) === null || _a === void 0 ? void 0 : _a.status.code],
    NAME: formatName(cell.room.guest.first_name, cell.room.guest.last_name),
    IDENTIFIER: cell.room.identifier,
    PR_ID: cell.pr_id,
    POOL: cell.POOL,
    BOOKING_NUMBER: cell.booking.booking_nbr,
    NOTES: cell.booking.is_direct ? cell.booking.remark : null,
    is_direct: cell.booking.is_direct,
    BALANCE: (_b = cell.booking.financial) === null || _b === void 0 ? void 0 : _b.due_amount,
    channel_booking_nbr: cell.booking.channel_booking_nbr,
    ///from here
    //ENTRY_DATE: cell.booking.booked_on.date,
    // IS_EDITABLE: cell.booking.is_editable,
    // ARRIVAL: cell.booking.arrival,
    // PHONE: cell.booking.guest.mobile ?? '',
    // RATE: cell.room.total,
    // RATE_PLAN: cell.room.rateplan.name,
    // SPLIT_BOOKING: false,
    // RATE_PLAN_ID: cell.room.rateplan.id,
    // RATE_TYPE: 1,
    // ADULTS_COUNT: cell.room.occupancy.adult_nbr,
    // CHILDREN_COUNT: cell.room.occupancy.children_nbr,
    // origin: cell.booking.origin,
    // GUEST: cell.booking.guest,
    // ROOMS: cell.booking.rooms,
    // cancelation: cell.room.rateplan.cancelation,
    // guarantee: cell.room.rateplan.guarantee,
    // TOTAL_PRICE: cell.room.total,
    // COUNTRY: cell.booking.guest.country_id,
    // FROM_DATE_STR: cell.booking.format.from_date,
    // TO_DATE_STR: cell.booking.format.to_date,
    // adult_child_offering: cell.room.rateplan.selected_variation.adult_child_offering,
    // SOURCE: { code: cell.booking.source.code, description: cell.booking.source.description, tag: cell.booking.source.tag },
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
  //console.log(data);
  const renderStatus = room => {
    const now = moment.hooks();
    const toDate = moment.hooks(room.to_date, 'YYYY-MM-DD');
    const fromDate = moment.hooks(room.from_date, 'YYYY-MM-DD');
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
async function transformNewBLockedRooms(data) {
  const stayStatus = await getStayStatus();
  return {
    ID: data.POOL,
    NOTES: '',
    BALANCE: '',
    NAME: data.NOTES !== ''
      ? data.NOTES
      : data.STAY_STATUS_CODE === '003'
        ? renderBlock003Date(data.BLOCKED_TILL_DATE, data.BLOCKED_TILL_HOUR, data.BLOCKED_TILL_MINUTE)
        : stayStatus.find(st => st.code === data.STAY_STATUS_CODE).value || '',
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
  const startDate = moment.hooks(from_date, 'YYYY-MM-DD');
  const endDate = moment.hooks(to_date, 'YYYY-MM-DD');
  const daysDiff = endDate.diff(startDate, 'days');
  return daysDiff;
}

class BookingService extends Token.Token {
  async getCalendarData(propertyid, from_date, to_date) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await Token.axios.post(`/Get_Exposed_Calendar?Ticket=${token}`, {
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
        const { data } = await Token.axios.post(`/Get_Exposed_Guest?Ticket=${token}`, { email });
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
        const { data } = await Token.axios.post(`/Edit_Exposed_Guest?Ticket=${token}`, Object.assign(Object.assign({}, guest), { book_nbr }));
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
        const { data } = await Token.axios.post(`/Get_Exposed_Booking_Availability?Ticket=${token}`, {
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
        const { data } = await Token.axios.post(`/Get_Exposed_Countries?Ticket=${token}`, {
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
        const { data } = await Token.axios.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${token}`, {
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
        const { data } = await Token.axios.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${token}`, { TBL_NAMES: ['_CALENDAR_BLOCKED_TILL'] });
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
        const { data } = await Token.axios.post(`/Get_Country_By_IP?Ticket=${token}`, {
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
        const { data } = await Token.axios.post(`/Block_Exposed_Unit?Ticket=${token}`, params);
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
        const { data } = await Token.axios.post(`/GET_EXPOSED_GUEST?Ticket=${token}`, {
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
        const { data } = await Token.axios.post(`/Get_Exposed_Booking?Ticket=${token}`, {
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
        const { data } = await Token.axios.post(`/Fetch_Exposed_Guests?Ticket=${token}`, {
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
        const { data } = await Token.axios.post(`/Fetch_Exposed_Bookings?Ticket=${token}`, {
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
        const { data } = await Token.axios.post(`/Get_PCI_Card_Info_URL?Ticket=${token}`, {
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
    console.log(arrivalTime);
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
            arrival: arrivalTime
              ? { code: arrivalTime }
              : Object.assign({}, bookedByInfoData.selectedArrivalTime),
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
        const { data } = await Token.axios.post(`/DoReservation?Ticket=${token}`, body);
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

exports.BookingService = BookingService;
exports.addTwoMonthToDate = addTwoMonthToDate;
exports.bookingStatus = bookingStatus;
exports.calculateDaysBetweenDates = calculateDaysBetweenDates;
exports.computeEndDate = computeEndDate;
exports.convertDMYToISO = convertDMYToISO;
exports.convertDatePrice = convertDatePrice;
exports.convertDateToCustomFormat = convertDateToCustomFormat;
exports.convertDateToTime = convertDateToTime;
exports.dateDifference = dateDifference;
exports.dateToFormattedString = dateToFormattedString;
exports.findCountry = findCountry;
exports.formatDate = formatDate;
exports.formatLegendColors = formatLegendColors;
exports.formatName = formatName;
exports.getCurrencySymbol = getCurrencySymbol;
exports.getDaysArray = getDaysArray;
exports.getMyBookings = getMyBookings;
exports.getNextDay = getNextDay;
exports.getReleaseHoursString = getReleaseHoursString;
exports.isBlockUnit = isBlockUnit;
exports.transformNewBLockedRooms = transformNewBLockedRooms;
exports.transformNewBooking = transformNewBooking;

//# sourceMappingURL=booking.service-1414ee7b.js.map