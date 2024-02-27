import locales from "../../../../src/stores/locales.store";
import { calculateDaysBetweenDates } from "../../../../src/utils/booking";
import { Host, h } from "@stencil/core";
import moment from "moment";
export class IrDateView {
  constructor() {
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
    const fromDate = moment(this.dates.from_date, 'MMM DD, YYYY').format('YYYY-MM-DD');
    const toDate = moment(this.dates.to_date, 'MMM DD, YYYY').format('YYYY-MM-DD');
    this.dates.date_diffrence = calculateDaysBetweenDates(fromDate, toDate);
  }
  convertDate(key, date) {
    this.dates = this.dates || {
      from_date: '',
      to_date: '',
      date_diffrence: 0,
    };
    if (typeof date === 'string') {
      this.dates[key] = moment(date, this.dateOption).format('MMM DD, YYYY');
    }
    else if (date instanceof Date) {
      this.dates[key] = moment(date).format('MMM DD, YYYY');
    }
    else if (moment.isMoment(date)) {
      this.dates[key] = date.format('MMM DD, YYYY');
    }
    else {
      console.error('Unsupported date type');
    }
  }
  render() {
    return (h(Host, { class: "d-flex align-items-center" }, h("span", null, this.dates.from_date), ' ', h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "mx-01", height: "14", width: "14", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" })), h("span", null, this.dates.to_date, ' ', this.showDateDifference && (h("span", { class: "mx-01" }, this.dates.date_diffrence, '   ', this.dates.date_diffrence > 1 ? ` ${locales.entries.Lcz_Nights}` : ` ${locales.entries.Lcz_Night}`)))));
  }
  static get is() { return "ir-date-view"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-date-view.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-date-view.css"]
    };
  }
  static get properties() {
    return {
      "from_date": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | Date | moment.Moment",
          "resolved": "Date | Moment | string",
          "references": {
            "Date": {
              "location": "global",
              "id": "global::Date"
            },
            "moment": {
              "location": "global",
              "id": "global::moment"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "from_date",
        "reflect": false
      },
      "to_date": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | Date | moment.Moment",
          "resolved": "Date | Moment | string",
          "references": {
            "Date": {
              "location": "global",
              "id": "global::Date"
            },
            "moment": {
              "location": "global",
              "id": "global::moment"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "to_date",
        "reflect": false
      },
      "showDateDifference": {
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
        "attribute": "show-date-difference",
        "reflect": false,
        "defaultValue": "true"
      },
      "dateOption": {
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
        "attribute": "date-option",
        "reflect": false,
        "defaultValue": "'YYYY-MM-DD'"
      }
    };
  }
  static get states() {
    return {
      "dates": {}
    };
  }
  static get watchers() {
    return [{
        "propName": "from_date",
        "methodName": "handleFromDateChange"
      }, {
        "propName": "to_date",
        "methodName": "handleToDateChange"
      }];
  }
}
//# sourceMappingURL=ir-date-view.js.map
