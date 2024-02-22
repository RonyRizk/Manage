import { h } from "@stencil/core";
import moment from "moment";
export class IrDatePicker {
  constructor() {
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
      startDate: moment(this.fromDate),
      endDate: moment(this.toDate),
      minDate: moment(this.minDate || moment(new Date()).format('YYYY-MM-DD')),
      maxDate: this.maxDate ? moment(this.maxDate) : undefined,
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
    return h("input", { class: "date-range-input", type: "text", disabled: this.disabled });
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
          "original": "'left' | 'right' | 'center'",
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
        "reflect": false
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
        "reflect": false
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
        "reflect": false,
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
        "defaultValue": "['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']"
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
        "defaultValue": "['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']"
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
        "reflect": false,
        "defaultValue": "'MMM DD, YYYY'"
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
        "reflect": false,
        "defaultValue": "' - '"
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
        "reflect": false,
        "defaultValue": "'Apply'"
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
        "reflect": false,
        "defaultValue": "'Cancel'"
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
        "reflect": false,
        "defaultValue": "'Form'"
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
        "reflect": false,
        "defaultValue": "'To'"
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
        "reflect": false,
        "defaultValue": "'Custom'"
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
        "reflect": false,
        "defaultValue": "'W'"
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
        "reflect": false,
        "defaultValue": "false"
      },
      "singleDatePicker": {
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
        "attribute": "single-date-picker",
        "reflect": false,
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
        "reflect": false,
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
