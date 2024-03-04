import { Host, h } from "@stencil/core";
import locales from "../../../../../src/stores/locales.store";
import { calculateDaysBetweenDates } from "../../../../../src/utils/booking";
import moment from "moment";
export class IglDateRange {
  constructor() {
    this.totalNights = 0;
    this.fromDateStr = 'from';
    this.toDateStr = 'to';
    this.defaultData = undefined;
    this.disabled = false;
    this.minDate = undefined;
    this.dateLabel = undefined;
    this.maxDate = undefined;
    this.withDateDifference = true;
    this.renderAgain = false;
  }
  getStringDateFormat(dt) {
    return dt.getFullYear() + '-' + (dt.getMonth() < 9 ? '0' : '') + (dt.getMonth() + 1) + '-' + (dt.getDate() <= 9 ? '0' : '') + dt.getDate();
  }
  initializeDates() {
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
  componentWillLoad() {
    this.initializeDates();
  }
  handleDataChange(newValue, oldValue) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this.initializeDates();
    }
  }
  calculateTotalNights() {
    this.totalNights = calculateDaysBetweenDates(moment(this.fromDate).format('YYYY-MM-DD'), moment(this.toDate).format('YYYY-MM-DD'));
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
    return (h(Host, null, h("div", { class: "calendarPickerContainer form-control input-sm", "data-state": this.disabled ? 'disabled' : 'active' }, h("ir-date-picker", { maxDate: this.maxDate, class: 'date-range-input', disabled: this.disabled, fromDate: this.fromDate, toDate: this.toDate, minDate: this.minDate, autoApply: true, "data-state": this.disabled ? 'disabled' : 'active', onDateChanged: evt => {
        this.handleDateChange(evt);
      } }), h("div", { "data-state": this.disabled ? 'disabled' : 'active', class: "date-view" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "12", width: "10.5", viewBox: "0 0 448 512" }, h("path", { fill: "currentColor", d: "M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" })), h("ir-date-view", { showDateDifference: this.disabled, from_date: this.fromDate, to_date: this.toDate }))), this.withDateDifference && (h("span", null, this.totalNights && !this.disabled ? (h("span", { class: "iglRangeNights mx-1" }, this.totalNights + (this.totalNights > 1 ? ` ${locales.entries.Lcz_Nights}` : ` ${locales.entries.Lcz_Night}`))) : ('')))));
  }
  static get is() { return "igl-date-range"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-date-range.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-date-range.css"]
    };
  }
  static get properties() {
    return {
      "defaultData": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{ [key: string]: any }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "minDate": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "min-date",
        "reflect": false
      },
      "dateLabel": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "date-label",
        "reflect": false
      },
      "maxDate": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "max-date",
        "reflect": false
      },
      "withDateDifference": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "with-date-difference",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "renderAgain": {}
    };
  }
  static get events() {
    return [{
        "method": "dateSelectEvent",
        "name": "dateSelectEvent",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ [key: string]: any }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        }
      }, {
        "method": "toast",
        "name": "toast",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IToast",
          "resolved": "ICustomToast & Partial<IToastWithButton> | IDefaultToast & Partial<IToastWithButton>",
          "references": {
            "IToast": {
              "location": "import",
              "path": "../../ir-toast/toast",
              "id": "src/components/ir-toast/toast.ts::IToast"
            }
          }
        }
      }];
  }
  static get watchers() {
    return [{
        "propName": "defaultData",
        "methodName": "handleDataChange"
      }];
  }
}
//# sourceMappingURL=igl-date-range.js.map
