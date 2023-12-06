import { Host, h } from "@stencil/core";
export class IglBookPropertyHeader {
  constructor() {
    this.sourceOption = {
      code: '',
      description: '',
      tag: '',
    };
    this.splitBookingId = '';
    this.bookingData = '';
    this.sourceOptions = [];
    this.message = undefined;
    this.bookingDataDefaultDateRange = undefined;
    this.showSplitBookingOption = false;
    this.adultChildConstraints = undefined;
    this.splitBookings = undefined;
    this.adultChildCount = undefined;
  }
  getSplitBookings() {
    return (this.bookingData.hasOwnProperty('splitBookingEvents') && this.bookingData.splitBookingEvents) || [];
  }
  getSelectedSplitBookingName(bookingId) {
    let splitBooking = this.splitBookings.find(booking => booking.ID === bookingId);
    return splitBooking.ID + ' ' + splitBooking.NAME;
  }
  getSplitBookingList() {
    return (h("fieldset", { class: "form-group col-12 text-left" }, h("label", { class: "h5" }, "To booking# "), h("div", { class: "btn-group ml-1" }, h("select", { class: "form-control input-sm", id: "xSmallSelect", onChange: evt => this.splitBookingDropDownChange.emit(evt) }, h("option", { value: "", selected: this.splitBookingId != '' }, "Select"), this.splitBookings.map(option => (h("option", { value: option.ID, selected: this.splitBookingId === option.ID }, this.getSelectedSplitBookingName(option.ID))))))));
  }
  getSourceNode() {
    return (h("fieldset", { class: "form-group col-12 text-left" }, h("label", { class: "h5" }, "Source "), h("div", { class: "btn-group ml-1" }, h("select", { class: "form-control input-sm", id: "xSmallSelect", onChange: evt => this.sourceDropDownChange.emit(evt.target.value) }, this.sourceOptions.map(option => (h("option", { value: option.id, selected: this.sourceOption.code === option.id }, option.value)))))));
  }
  handleAdultChildChange(key, event) {
    const value = event.target.value;
    let obj = {};
    if (value === '') {
      obj = Object.assign(Object.assign({}, this.adultChildCount), { [key]: 0 });
    }
    else {
      obj = Object.assign(Object.assign({}, this.adultChildCount), { [key]: value });
    }
    this.adultChild.emit(obj);
  }
  getAdultChildConstraints() {
    return (h("div", { class: "form-group  text-left d-flex align-items-center mt-1" }, h("fieldset", null, h("div", { class: "btn-group ml-1" }, h("select", { class: "form-control input-sm", id: "xAdultSmallSelect", onChange: evt => this.handleAdultChildChange('adult', evt) }, h("option", { value: '' }, "Ad..."), Array.from(Array(this.adultChildConstraints.adult_max_nbr), (_, i) => i + 1).map(option => (h("option", { value: option }, option)))))), this.adultChildConstraints.child_max_nbr > 0 && (h("fieldset", { class: 'ml-1' }, h("div", { class: "btn-group ml-1" }, h("select", { class: "form-control input-sm", id: "xChildrenSmallSelect", onChange: evt => this.handleAdultChildChange('child', evt) }, h("option", { value: '' }, `Ch... < ${this.adultChildConstraints.child_max_age} years`), Array.from(Array(this.adultChildConstraints.child_max_nbr), (_, i) => i + 1).map(option => (h("option", { value: option }, option))))))), h("button", { disabled: this.adultChildCount.adult === 0, class: 'btn btn-primary ml-2 ', onClick: () => this.buttonClicked.emit({ key: 'check' }) }, "Check")));
  }
  isEventType(key) {
    return this.bookingData.event_type === key;
  }
  render() {
    return (h(Host, null, this.showSplitBookingOption ? this.getSplitBookingList() : this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM') ? null : this.getSourceNode(), h("div", { class: 'd-md-flex align-items-center' }, h("fieldset", { class: "form-group row" }, h("igl-date-range", { disabled: this.isEventType('BAR_BOOKING'), defaultData: this.bookingDataDefaultDateRange })), !this.isEventType('EDIT_BOOKING') && this.getAdultChildConstraints()), h("p", { class: "text-left ml-1 mt-1" }, this.message)));
  }
  static get is() { return "igl-book-property-header"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-book-property-header.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-book-property-header.css"]
    };
  }
  static get properties() {
    return {
      "splitBookingId": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "split-booking-id",
        "reflect": true,
        "defaultValue": "''"
      },
      "bookingData": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "booking-data",
        "reflect": true,
        "defaultValue": "''"
      },
      "sourceOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TSourceOptions[]",
          "resolved": "TSourceOptions[]",
          "references": {
            "TSourceOptions": {
              "location": "import",
              "path": "../../../../models/igl-book-property",
              "id": "src/models/igl-book-property.d.ts::TSourceOptions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
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
        "reflect": true
      },
      "bookingDataDefaultDateRange": {
        "type": "unknown",
        "mutable": true,
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
      "showSplitBookingOption": {
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
        "attribute": "show-split-booking-option",
        "reflect": true,
        "defaultValue": "false"
      },
      "adultChildConstraints": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TAdultChildConstraints",
          "resolved": "{ adult_max_nbr: number; child_max_nbr: number; child_max_age: number; }",
          "references": {
            "TAdultChildConstraints": {
              "location": "import",
              "path": "../../../../models/igl-book-property",
              "id": "src/models/igl-book-property.d.ts::TAdultChildConstraints"
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
      "splitBookings": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "any[]",
          "resolved": "any[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "adultChildCount": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{ adult: number; child: number }",
          "resolved": "{ adult: number; child: number; }",
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
  static get events() {
    return [{
        "method": "splitBookingDropDownChange",
        "name": "splitBookingDropDownChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "sourceDropDownChange",
        "name": "sourceDropDownChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "adultChild",
        "name": "adultChild",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "checkClicked",
        "name": "checkClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "buttonClicked",
        "name": "buttonClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ key: TPropertyButtonsTypes }",
          "resolved": "{ key: TPropertyButtonsTypes; }",
          "references": {
            "TPropertyButtonsTypes": {
              "location": "import",
              "path": "../../../../models/igl-book-property",
              "id": "src/models/igl-book-property.d.ts::TPropertyButtonsTypes"
            }
          }
        }
      }];
  }
}
//# sourceMappingURL=igl-book-property-header.js.map
