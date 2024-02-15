'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');
const moment = require('./moment-f96595e5.js');

const irDatePickerCss = "input.sc-ir-date-picker{all:unset;box-sizing:border-box;padding:0;margin:0;width:100%;text-align:center}input.sc-ir-date-picker:disabled{text-align:start;font-size:14px}";

const IrDatePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dateChanged = index.createEvent(this, "dateChanged", 7);
    this.fromDate = undefined;
    this.toDate = undefined;
    this.opens = undefined;
    this.autoApply = undefined;
    this.firstDay = 1;
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.format = 'MMM DD, YYYY';
    this.separator = ' - ';
    this.applyLabel = 'Apply';
    this.cancelLabel = 'Cancel';
    this.fromLabel = 'Form';
    this.toLabel = 'To';
    this.customRangeLabel = 'Custom';
    this.weekLabel = 'W';
    this.disabled = false;
    this.singleDatePicker = false;
    this.minDate = undefined;
    this.maxDate = undefined;
    this.maxSpan = {
      days: 240,
    };
  }
  componentDidLoad() {
    this.dateRangeInput = this.element.querySelector('.date-range-input');
    $(this.dateRangeInput).daterangepicker({
      singleDatePicker: this.singleDatePicker,
      opens: this.opens,
      startDate: moment.hooks(this.fromDate),
      endDate: moment.hooks(this.toDate),
      minDate: moment.hooks(this.minDate || moment.hooks(new Date()).format('YYYY-MM-DD')),
      maxDate: this.maxDate ? moment.hooks(this.maxDate) : undefined,
      maxSpan: this.maxSpan,
      autoApply: this.autoApply,
      locale: {
        format: this.format,
        separator: this.separator,
        applyLabel: this.applyLabel,
        cancelLabel: this.cancelLabel,
        fromLabel: this.fromLabel,
        toLabel: this.toLabel,
        customRangeLabel: this.customRangeLabel,
        weekLabel: this.weekLabel,
        daysOfWeek: this.daysOfWeek,
        monthNames: this.monthNames,
        firstDay: this.firstDay,
      },
    }, (start, end) => {
      this.dateChanged.emit({ start, end });
    });
  }
  render() {
    return index.h("input", { class: "date-range-input", type: "text", disabled: this.disabled });
  }
  get element() { return index.getElement(this); }
};
IrDatePicker.style = irDatePickerCss;

exports.ir_date_picker = IrDatePicker;

//# sourceMappingURL=ir-date-picker.cjs.entry.js.map