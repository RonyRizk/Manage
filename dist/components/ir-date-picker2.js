import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { h as hooks } from './moment.js';

const irDatePickerCss = ".date-range-input.sc-ir-date-picker{border:0;outline:0;margin:0;flex:1}.date-range-input.sc-ir-date-picker:focus{border:0;outline:0}";

const IrDatePicker = /*@__PURE__*/ proxyCustomElement(class IrDatePicker extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
  get element() { return this; }
  static get style() { return irDatePickerCss; }
}, [2, "ir-date-picker", {
    "fromDate": [16],
    "toDate": [16],
    "opens": [513],
    "autoApply": [516, "auto-apply"],
    "firstDay": [514, "first-day"],
    "monthNames": [16],
    "daysOfWeek": [16],
    "format": [513],
    "separator": [513],
    "applyLabel": [513, "apply-label"],
    "cancelLabel": [513, "cancel-label"],
    "fromLabel": [513, "from-label"],
    "toLabel": [513, "to-label"],
    "customRangeLabel": [513, "custom-range-label"],
    "weekLabel": [513, "week-label"],
    "maxSpan": [520, "max-span"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-date-picker"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-date-picker":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrDatePicker);
      }
      break;
  } });
}

export { IrDatePicker as I, defineCustomElement as d };

//# sourceMappingURL=ir-date-picker2.js.map