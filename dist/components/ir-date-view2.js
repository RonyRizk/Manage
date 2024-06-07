import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { l as locales } from './locales.store.js';
import { h as hooks } from './moment.js';
import './calendar-data.js';

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
      defaultDates: {
        from_date: room.from_date,
        to_date: room.to_date,
      },
    });
  });
  return bookings;
}
function calculateDaysBetweenDates(from_date, to_date) {
  const startDate = hooks(from_date, 'YYYY-MM-DD');
  const endDate = hooks(to_date, 'YYYY-MM-DD');
  const daysDiff = endDate.diff(startDate, 'days');
  return daysDiff || 1;
}

const irDateViewCss = ".sc-ir-date-view-h{display:block;font-size:13.65px !important;width:100%}.mx-01.sc-ir-date-view{--m:5px;margin-right:var(--m) !important;margin-left:var(--m) !important}";

const IrDateView = /*@__PURE__*/ proxyCustomElement(class IrDateView extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.from_date = undefined;
    this.to_date = undefined;
    this.showDateDifference = true;
    this.dateOption = 'YYYY-MM-DD';
    this.dates = undefined;
  }
  componentWillLoad() {
    this.initializeDates();
  }
  handleFromDateChange(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.initializeDates();
    }
  }
  handleToDateChange(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.initializeDates();
    }
  }
  initializeDates() {
    this.convertDate('from_date', this.from_date);
    this.convertDate('to_date', this.to_date);
    const fromDate = hooks(this.dates.from_date, 'MMM DD, YYYY').format('YYYY-MM-DD');
    const toDate = hooks(this.dates.to_date, 'MMM DD, YYYY').format('YYYY-MM-DD');
    this.dates.date_diffrence = calculateDaysBetweenDates(fromDate, toDate);
  }
  convertDate(key, date) {
    this.dates = this.dates || {
      from_date: '',
      to_date: '',
      date_diffrence: 0,
    };
    if (typeof date === 'string') {
      this.dates[key] = hooks(date, this.dateOption).format('MMM DD, YYYY');
    }
    else if (date instanceof Date) {
      this.dates[key] = hooks(date).format('MMM DD, YYYY');
    }
    else if (hooks.isMoment(date)) {
      this.dates[key] = date.format('MMM DD, YYYY');
    }
    else {
      console.error('Unsupported date type');
    }
  }
  render() {
    return (h(Host, { class: "d-flex align-items-center" }, h("span", null, this.dates.from_date), ' ', h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "mx-01", height: "14", width: "14", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" })), h("span", null, this.dates.to_date, ' ', this.showDateDifference && (h("span", { class: "mx-01" }, this.dates.date_diffrence, '   ', this.dates.date_diffrence > 1 ? ` ${locales.entries.Lcz_Nights}` : ` ${locales.entries.Lcz_Night}`)))));
  }
  static get watchers() { return {
    "from_date": ["handleFromDateChange"],
    "to_date": ["handleToDateChange"]
  }; }
  static get style() { return irDateViewCss; }
}, [2, "ir-date-view", {
    "from_date": [1],
    "to_date": [1],
    "showDateDifference": [4, "show-date-difference"],
    "dateOption": [1, "date-option"],
    "dates": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-date-view"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-date-view":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrDateView);
      }
      break;
  } });
}

export { IrDateView as I, calculateDaysBetweenDates as c, defineCustomElement as d, transformNewBooking as t };

//# sourceMappingURL=ir-date-view2.js.map