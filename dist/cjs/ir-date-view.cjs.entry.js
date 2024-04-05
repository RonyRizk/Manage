'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const locales_store = require('./locales.store-8fed15eb.js');
const booking = require('./booking-b591e148.js');
const moment = require('./moment-f96595e5.js');
require('./index-797ee4c0.js');
require('./calendar-data-96bc0c2a.js');

const irDateViewCss = ".sc-ir-date-view-h{display:block;font-size:13.65px !important}.mx-01.sc-ir-date-view{--m:5px;margin-right:var(--m) !important;margin-left:var(--m) !important}";

const IrDateView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    const fromDate = moment.hooks(this.dates.from_date, 'MMM DD, YYYY').format('YYYY-MM-DD');
    const toDate = moment.hooks(this.dates.to_date, 'MMM DD, YYYY').format('YYYY-MM-DD');
    this.dates.date_diffrence = booking.calculateDaysBetweenDates(fromDate, toDate);
  }
  convertDate(key, date) {
    this.dates = this.dates || {
      from_date: '',
      to_date: '',
      date_diffrence: 0,
    };
    if (typeof date === 'string') {
      this.dates[key] = moment.hooks(date, this.dateOption).format('MMM DD, YYYY');
    }
    else if (date instanceof Date) {
      this.dates[key] = moment.hooks(date).format('MMM DD, YYYY');
    }
    else if (moment.hooks.isMoment(date)) {
      this.dates[key] = date.format('MMM DD, YYYY');
    }
    else {
      console.error('Unsupported date type');
    }
  }
  render() {
    return (index.h(index.Host, { class: "d-flex align-items-center" }, index.h("span", null, this.dates.from_date), ' ', index.h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "mx-01", height: "14", width: "14", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" })), index.h("span", null, this.dates.to_date, ' ', this.showDateDifference && (index.h("span", { class: "mx-01" }, this.dates.date_diffrence, '   ', this.dates.date_diffrence > 1 ? ` ${locales_store.locales.entries.Lcz_Nights}` : ` ${locales_store.locales.entries.Lcz_Night}`)))));
  }
  static get watchers() { return {
    "from_date": ["handleFromDateChange"],
    "to_date": ["handleToDateChange"]
  }; }
};
IrDateView.style = irDateViewCss;

exports.ir_date_view = IrDateView;

//# sourceMappingURL=ir-date-view.cjs.entry.js.map