import { h, } from "@stencil/core";
import moment from "moment";
export class IrDatePicker {
  constructor() {
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
      startDate: moment(this.fromDate),
      endDate: moment(this.toDate),
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
  static get is() { return "ir-date-picker"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-date-picker.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-date-picker.css"]
    };
  }
  static get properties() {
    return {
      "fromDate": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Date",
          "resolved": "Date",
          "references": {
            "Date": {
              "location": "global",
              "id": "global::Date"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "toDate": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Date",
          "resolved": "Date",
          "references": {
            "Date": {
              "location": "global",
              "id": "global::Date"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "opens": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"left\" | \"right\" | \"center\"",
          "resolved": "\"center\" | \"left\" | \"right\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "opens",
        "reflect": true
      },
      "autoApply": {
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
        "attribute": "auto-apply",
        "reflect": true
      },
      "firstDay": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "first-day",
        "reflect": true,
        "defaultValue": "1"
      },
      "monthNames": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[\r\n    \"January\",\r\n    \"February\",\r\n    \"March\",\r\n    \"April\",\r\n    \"May\",\r\n    \"June\",\r\n    \"July\",\r\n    \"August\",\r\n    \"September\",\r\n    \"October\",\r\n    \"November\",\r\n    \"December\",\r\n  ]"
      },
      "daysOfWeek": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[\r\n    \"Su\",\r\n    \"Mo\",\r\n    \"Tu\",\r\n    \"We\",\r\n    \"Th\",\r\n    \"Fr\",\r\n    \"Sa\",\r\n  ]"
      },
      "format": {
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
        "attribute": "format",
        "reflect": true,
        "defaultValue": "\"MMM DD,YYYY\""
      },
      "separator": {
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
        "attribute": "separator",
        "reflect": true,
        "defaultValue": "\"-\""
      },
      "applyLabel": {
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
        "attribute": "apply-label",
        "reflect": true,
        "defaultValue": "\"Apply\""
      },
      "cancelLabel": {
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
        "attribute": "cancel-label",
        "reflect": true,
        "defaultValue": "\"Cancel\""
      },
      "fromLabel": {
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
        "attribute": "from-label",
        "reflect": true,
        "defaultValue": "\"Form\""
      },
      "toLabel": {
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
        "attribute": "to-label",
        "reflect": true,
        "defaultValue": "\"To\""
      },
      "customRangeLabel": {
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
        "attribute": "custom-range-label",
        "reflect": true,
        "defaultValue": "\"Custom\""
      },
      "weekLabel": {
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
        "attribute": "week-label",
        "reflect": true,
        "defaultValue": "\"W\""
      },
      "maxSpan": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "moment.DurationInputArg1",
          "resolved": "Duration | DurationInputObject | FromTo | number | string",
          "references": {
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
        "attribute": "max-span",
        "reflect": true,
        "defaultValue": "{\r\n    days: 240,\r\n  }"
      }
    };
  }
  static get events() {
    return [{
        "method": "dateChanged",
        "name": "dateChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{\r\n    start: moment.Moment;\r\n    end: moment.Moment;\r\n  }",
          "resolved": "{ start: Moment; end: Moment; }",
          "references": {
            "moment": {
              "location": "global",
              "id": "global::moment"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
//# sourceMappingURL=ir-date-picker.js.map
