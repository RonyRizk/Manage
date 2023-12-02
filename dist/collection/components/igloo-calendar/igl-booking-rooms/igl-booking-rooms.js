import { Host, h } from "@stencil/core";
export class IglBookingRooms {
  constructor() {
    this.validBookingTypes = ['PLUS_BOOKING', 'ADD_ROOM', 'EDIT_BOOKING'];
    this.roomTypeData = undefined;
    this.defaultData = undefined;
    this.bookingType = 'PLUS_BOOKING';
    this.dateDifference = undefined;
    this.ratePricingMode = [];
    this.currency = undefined;
    this.selectedRooms = [];
    this.roomsDistributions = [];
  }
  componentWillLoad() {
    this.totalRooms = this.roomTypeData.inventory || 0;
    if (!this.selectedRooms.length) {
      this.selectedRooms = new Array(this.totalRooms).fill(0);
    }
    if (!this.roomsDistributions.length) {
      this.roomsDistributions = new Array(this.totalRooms).fill(this.totalRooms);
    }
  }
  handleRoomTypeDataChange(newValue) {
    this.totalRooms = newValue.inventory || 0;
    if (!this.selectedRooms.length) {
      this.selectedRooms = new Array(this.totalRooms).fill(0);
    }
    if (!this.roomsDistributions.length) {
      this.roomsDistributions = new Array(this.totalRooms).fill(this.totalRooms);
    }
  }
  onRoomDataUpdate(event, index) {
    event.stopImmediatePropagation();
    const opt = event.detail;
    let data = Object.assign({}, opt.data);
    if (opt.changedKey === 'totalRooms') {
      let newValue = data.totalRooms;
      if (this.selectedRooms[index] !== newValue) {
        this.selectedRooms[index] = newValue;
        this.updateRatePlanTotalRooms(index);
      }
    }
    data.roomCategoryId = this.roomTypeData.id;
    data.roomCategoryName = this.roomTypeData.name;
    data.inventory = this.roomTypeData.inventory;
    this.dataUpdateEvent.emit({
      key: opt.key,
      data: data,
      changedKey: opt.changedKey,
    });
  }
  updateRatePlanTotalRooms(ratePlanIndex) {
    const calculateTotalSelectedRoomsExcludingIndex = excludedIndex => {
      return this.selectedRooms.reduce((acc, rooms, idx) => (idx !== excludedIndex ? acc + rooms : acc), 0);
    };
    const newRoomsDistributions = this.selectedRooms.map((_, index) => {
      if (index === ratePlanIndex) {
        return this.roomsDistributions[index];
      }
      const totalSelectedRoomsExcludingCurrent = calculateTotalSelectedRoomsExcludingIndex(index);
      const availableRooms = this.totalRooms - totalSelectedRoomsExcludingCurrent;
      return availableRooms > 0 ? availableRooms : 0;
    });
    if (JSON.stringify(this.roomsDistributions) !== JSON.stringify(newRoomsDistributions)) {
      this.roomsDistributions = newRoomsDistributions;
    }
  }
  render() {
    const isValidBookingType = this.validBookingTypes.includes(this.bookingType);
    return (h(Host, null, isValidBookingType && h("div", { class: "font-weight-bold font-medium-1" }, this.roomTypeData.name), this.roomTypeData.rateplans.map((ratePlan, index) => {
      if (ratePlan.variations !== null) {
        return (h("igl-booking-room-rate-plan", { key: `rate-plan-${ratePlan.id}`, ratePricingMode: this.ratePricingMode, class: isValidBookingType ? 'ml-1' : '', currency: this.currency, dateDifference: this.dateDifference, ratePlanData: ratePlan,
          //fullyBlocked={this.roomTypeData.rate === 0}
          totalAvailableRooms: this.roomsDistributions[index], bookingType: this.bookingType, defaultData: (this.defaultData && this.defaultData.get(`p_${ratePlan.id}`)) || null, onDataUpdateEvent: evt => this.onRoomDataUpdate(evt, index) }));
      }
      else {
        return null;
      }
    })));
  }
  static get is() { return "igl-booking-rooms"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-booking-rooms.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-booking-rooms.css"]
    };
  }
  static get properties() {
    return {
      "roomTypeData": {
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
      "defaultData": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Map<string, any>",
          "resolved": "Map<string, any>",
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
      "bookingType": {
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
        "attribute": "booking-type",
        "reflect": false,
        "defaultValue": "'PLUS_BOOKING'"
      },
      "dateDifference": {
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
        "attribute": "date-difference",
        "reflect": true
      },
      "ratePricingMode": {
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
        },
        "defaultValue": "[]"
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
      }
    };
  }
  static get states() {
    return {
      "selectedRooms": {},
      "roomsDistributions": {}
    };
  }
  static get events() {
    return [{
        "method": "dataUpdateEvent",
        "name": "dataUpdateEvent",
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
  static get watchers() {
    return [{
        "propName": "roomTypeData",
        "methodName": "handleRoomTypeDataChange"
      }];
  }
}
//# sourceMappingURL=igl-booking-rooms.js.map
