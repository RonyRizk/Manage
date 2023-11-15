import { r as registerInstance, a as createEvent, h, g as getElement } from './index-b86e46a8.js';
import { h as hooks } from './moment-7d60e5ef.js';

const irDatePickerCss = ".date-range-input.sc-ir-date-picker{border:0;outline:0;margin:0;flex:1}.date-range-input.sc-ir-date-picker:focus{border:0;outline:0}";

const IrDatePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dateChanged = createEvent(this, "dateChanged", 7);
    this.fromDate = undefined;
    this.toDate = undefined;
    this.opens = undefined;
    this.autoApply = undefined;
    this.firstDay = 1;
    this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.daysOfWeek = [
      "Su",
      "Mo",
      "Tu",
      "We",
      "Th",
      "Fr",
      "Sa",
    ];
    this.format = "MMM DD,YYYY";
    this.separator = "-";
    this.applyLabel = "Apply";
    this.cancelLabel = "Cancel";
    this.fromLabel = "Form";
    this.toLabel = "To";
    this.customRangeLabel = "Custom";
    this.weekLabel = "W";
    this.maxSpan = {
      days: 240,
    };
  }
  componentDidLoad() {
    this.dateRangeInput = this.element.querySelector(".date-range-input");
    $(this.dateRangeInput).daterangepicker({
      opens: this.opens,
      startDate: hooks(this.fromDate),
      endDate: hooks(this.toDate),
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
    return h("input", { class: "date-range-input", type: "text" });
  }
  get element() { return getElement(this); }
};
IrDatePicker.style = irDatePickerCss;

export { IrDatePicker as ir_date_picker };

//# sourceMappingURL=ir-date-picker.entry.js.map