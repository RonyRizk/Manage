import { Host, h, } from "@stencil/core";
export class IglDateRange {
  constructor() {
    this.totalNights = 0;
    this.fromDateStr = "from";
    this.toDateStr = "to";
    this.message = "";
    this.defaultData = undefined;
    this.renderAgain = false;
  }
  getStringDateFormat(dt) {
    return (dt.getFullYear() +
      "-" +
      (dt.getMonth() < 9 ? "0" : "") +
      (dt.getMonth() + 1) +
      "-" +
      (dt.getDate() <= 9 ? "0" : "") +
      dt.getDate());
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
      this.handleDateSelectEvent("selectedDateRange", {
        fromDate: this.fromDate.getTime(),
        toDate: this.toDate.getTime(),
        fromDateStr: this.fromDateStr,
        toDateStr: this.toDateStr,
        dateDifference: this.totalNights,
      });
    }
  }
  calculateTotalNights() {
    this.totalNights = Math.floor((this.toDate.getTime() - this.fromDate.getTime()) / 86400000);
  }
  getFormattedDateString(dt) {
    return (dt.getDate() +
      " " +
      dt.toLocaleString("default", { month: "short" }).toLowerCase() +
      " " +
      dt.getFullYear());
  }
  handleDateSelectEvent(key, data = "") {
    this.dateSelectEvent.emit({ key, data });
  }
  handleDateChange(evt) {
    const { start, end } = evt.detail;
    this.fromDate = start.toDate();
    this.toDate = end.toDate();
    this.calculateTotalNights();
    this.handleDateSelectEvent("selectedDateRange", {
      fromDate: this.fromDate.getTime(),
      toDate: this.toDate.getTime(),
      fromDateStr: start.format("DD MMM YYYY"),
      toDateStr: end.format("DD MMM YYYY"),
      dateDifference: this.totalNights,
    });
    this.renderAgain = !this.renderAgain;
  }
  render() {
    return (h(Host, null, h("div", { class: "calendarPickerContainer ml-0" }, h("h5", { class: "dateRangeLabel" }, "Dates"), h("div", { class: "iglRangePicker" }, h("ir-date-picker", { fromDate: this.fromDate, toDate: this.toDate, autoApply: true, onDateChanged: (evt) => {
        this.handleDateChange(evt);
      } }), this.totalNights ? (h("span", { class: "iglRangeNights" }, this.totalNights +
      (this.totalNights > 1 ? " nights" : " night"))) : (""))), h("div", { class: "taxMessage display-inline" }, this.message)));
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
      "message": {
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
        "attribute": "message",
        "reflect": true,
        "defaultValue": "\"\""
      },
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
      }];
  }
}
//# sourceMappingURL=igl-date-range.js.map
