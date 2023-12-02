import { Host, h } from "@stencil/core";
export class IglBookingOverviewPage {
  constructor() {
    this.bookingData = undefined;
    this.message = undefined;
    this.showSplitBookingOption = undefined;
    this.eventType = undefined;
    this.currency = undefined;
    this.adultChildConstraints = undefined;
    this.ratePricingMode = undefined;
    this.dateRangeData = undefined;
    this.selectedRooms = undefined;
    this.bookingDataDefaultDateRange = undefined;
    this.sourceOptions = undefined;
  }
  getSplitBookings() {
    return (this.bookingData.hasOwnProperty('splitBookingEvents') && this.bookingData.splitBookingEvents) || [];
  }
  isEventType(event) {
    return event === this.eventType;
  }
  render() {
    var _a;
    return (h(Host, null, h("igl-book-property-header", { splitBookingId: this.showSplitBookingOption, bookingData: this.bookingData, sourceOptions: this.sourceOptions, message: this.message, bookingDataDefaultDateRange: this.bookingDataDefaultDateRange, showSplitBookingOption: this.showSplitBookingOption, adultChildConstraints: this.adultChildConstraints, splitBookings: this.getSplitBookings() }), h("div", { class: "col text-left" }, (_a = this.bookingData.roomsInfo) === null || _a === void 0 ? void 0 : _a.map(roomInfo => (h("igl-booking-rooms", { currency: this.currency, ratePricingMode: this.ratePricingMode, dateDifference: this.dateRangeData.dateDifference, bookingType: this.bookingData.event_type, roomTypeData: roomInfo, class: "mt-2 mb-1", defaultData: this.selectedRooms.get(`c_${roomInfo.id}`), onDataUpdateEvent: evt => this.roomsDataUpdate.emit(evt.detail) })))), h("igl-book-property-footer", { class: 'p-0 mb-1 mt-2', eventType: this.bookingData.event_type, disabled: this.selectedRooms.size === 0 })));
  }
  static get is() { return "igl-booking-overview-page"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-booking-overview-page.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-booking-overview-page.css"]
    };
  }
  static get properties() {
    return {
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
        "reflect": false
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
        "reflect": false
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
        "reflect": false
      },
      "eventType": {
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
        "attribute": "event-type",
        "reflect": false
      },
      "currency": {
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
        "attribute": "currency",
        "reflect": false
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
      "ratePricingMode": {
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
        "attribute": "rate-pricing-mode",
        "reflect": false
      },
      "dateRangeData": {
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
        "attribute": "date-range-data",
        "reflect": false
      },
      "selectedRooms": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Map<string, Map<string, any>>",
          "resolved": "Map<string, Map<string, any>>",
          "references": {
            "Map": {
              "location": "global",
              "id": "global::Map"
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
      "bookingDataDefaultDateRange": {
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
        "attribute": "booking-data-default-date-range",
        "reflect": false
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
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "dateRangeSelect",
        "name": "dateRangeSelect",
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
        "method": "roomsDataUpdate",
        "name": "roomsDataUpdate",
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
      }];
  }
}
//# sourceMappingURL=igl-booking-overview-page.js.map
