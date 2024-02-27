import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as locales } from './locales.store.js';
import { c as calculateDaysBetweenDates, d as defineCustomElement$1 } from './ir-date-view2.js';
import { h as hooks } from './moment.js';
import { d as defineCustomElement$2 } from './ir-date-picker2.js';

const iglDateRangeCss = ".sc-igl-date-range-h{display:flex;align-items:center !important}.date-range-input.sc-igl-date-range{margin:0;padding:0;display:flex;flex:1;cursor:pointer;width:220px !important;opacity:0;user-select:none}.iglRangeNights.sc-igl-date-range{margin:0;padding:0}.date-view.sc-igl-date-range{position:absolute;background:white;pointer-events:none;cursor:pointer;display:block;margin-left:1rem;margin-right:1rem;font-size:0.975rem !important}.calendarPickerContainer.sc-igl-date-range{display:flex !important;position:relative !important;text-align:left;align-items:center !important;padding:0 !important;margin:0;border:1px solid #379ff2;width:220px}.calendarPickerContainer[data-state='disabled'].sc-igl-date-range{border:0px;width:280px}.date-view[data-state='disabled'].sc-igl-date-range{margin:0}";

const IglDateRange = /*@__PURE__*/ proxyCustomElement(class IglDateRange extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dateSelectEvent = createEvent(this, "dateSelectEvent", 7);
    this.toast = createEvent(this, "toast", 7);
    this.totalNights = 0;
    this.fromDateStr = 'from';
    this.toDateStr = 'to';
    this.defaultData = undefined;
    this.disabled = false;
    this.minDate = undefined;
    this.dateLabel = undefined;
    this.maxDate = undefined;
    this.renderAgain = false;
  }
  getStringDateFormat(dt) {
    return dt.getFullYear() + '-' + (dt.getMonth() < 9 ? '0' : '') + (dt.getMonth() + 1) + '-' + (dt.getDate() <= 9 ? '0' : '') + dt.getDate();
  }
  componentWillLoad() {
    let dt = new Date();
    dt.setHours(0, 0, 0, 0);
    dt.setDate(dt.getDate() + 1);
    if (this.defaultData) {
      if (this.defaultData.fromDate) {
        this.fromDate = new Date(this.defaultData.fromDate);
        this.fromDate.setHours(0, 0, 0, 0);
        this.fromDateStr = this.getFormattedDateString(this.fromDate);
      }
      if (this.defaultData.toDate) {
        this.toDate = new Date(this.defaultData.toDate);
        this.toDate.setHours(0, 0, 0, 0);
        this.toDateStr = this.getFormattedDateString(this.toDate);
      }
    }
    if (this.fromDate && this.toDate) {
      this.calculateTotalNights();
      this.handleDateSelectEvent('selectedDateRange', {
        fromDate: this.fromDate.getTime(),
        toDate: this.toDate.getTime(),
        fromDateStr: this.fromDateStr,
        toDateStr: this.toDateStr,
        dateDifference: this.totalNights,
      });
    }
  }
  calculateTotalNights() {
    this.totalNights = calculateDaysBetweenDates(hooks(this.fromDate).format('YYYY-MM-DD'), hooks(this.toDate).format('YYYY-MM-DD'));
  }
  getFormattedDateString(dt) {
    return dt.getDate() + ' ' + dt.toLocaleString('default', { month: 'short' }).toLowerCase() + ' ' + dt.getFullYear();
  }
  handleDateSelectEvent(key, data = '') {
    this.dateSelectEvent.emit({ key, data });
  }
  handleDateChange(evt) {
    const { start, end } = evt.detail;
    this.fromDate = start.toDate();
    this.toDate = end.toDate();
    this.calculateTotalNights();
    this.handleDateSelectEvent('selectedDateRange', {
      fromDate: this.fromDate.getTime(),
      toDate: this.toDate.getTime(),
      fromDateStr: start.format('DD MMM YYYY'),
      toDateStr: end.format('DD MMM YYYY'),
      dateDifference: this.totalNights,
    });
    this.renderAgain = !this.renderAgain;
  }
  render() {
    return (h(Host, null, h("div", { class: "calendarPickerContainer form-control input-sm", "data-state": this.disabled ? 'disabled' : 'active' }, h("ir-date-picker", { maxDate: this.maxDate, class: 'date-range-input', disabled: this.disabled, fromDate: this.fromDate, toDate: this.toDate, minDate: this.minDate, autoApply: true, onDateChanged: evt => {
        this.handleDateChange(evt);
      } }), h("ir-date-view", { "data-state": this.disabled ? 'disabled' : 'active', showDateDifference: this.disabled, class: "date-view", from_date: this.fromDate, to_date: this.toDate })), h("span", null, this.totalNights && !this.disabled ? (h("span", { class: "iglRangeNights ml-1" }, this.totalNights + (this.totalNights > 1 ? ` ${locales.entries.Lcz_Nights}` : ` ${locales.entries.Lcz_Night}`))) : (''))));
  }
  static get style() { return iglDateRangeCss; }
}, [2, "igl-date-range", {
    "defaultData": [16],
    "disabled": [516],
    "minDate": [1, "min-date"],
    "dateLabel": [1, "date-label"],
    "maxDate": [1, "max-date"],
    "renderAgain": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["igl-date-range", "ir-date-picker", "ir-date-view"];
  components.forEach(tagName => { switch (tagName) {
    case "igl-date-range":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IglDateRange);
      }
      break;
    case "ir-date-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-date-view":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IglDateRange as I, defineCustomElement as d };

//# sourceMappingURL=igl-date-range2.js.map