import { h as hooks } from './moment.js';
import { i as isBlockUnit, b as dateDifference } from './utils.js';
import { a as axios } from './axios.js';
import { l as locales } from './locales.store.js';
import { c as calendar_data } from './calendar-data.js';

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
  if (lastName !== null) {
    return `${firstName !== null && firstName !== void 0 ? firstName : ''} , ${lastName !== null && lastName !== void 0 ? lastName : ''}`;
  }
  return firstName;
}
async function getStayStatus() {
  try {
    const token = calendar_data.token;
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
function renderBlock003Date(date, hour, minute) {
  const dt = new Date(date);
  dt.setHours(hour);
  dt.setMinutes(minute);
  return `${locales.entries.Lcz_BlockedTill} ${hooks(dt).format('MMM DD, HH:mm')}`;
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
    NOTES: cell.booking.remark,
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
      SOURCE: { code: data.source.code, description: data.source.description, tag: data.source.tag },
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
  const startDate = hooks(from_date, 'YYYY-MM-DD');
  const endDate = hooks(to_date, 'YYYY-MM-DD');
  const daysDiff = endDate.diff(startDate, 'days');
  return daysDiff;
}

export { transformNewBooking as a, bookingStatus as b, calculateDaysBetweenDates as c, formatName as f, getMyBookings as g, transformNewBLockedRooms as t };

//# sourceMappingURL=booking.js.map