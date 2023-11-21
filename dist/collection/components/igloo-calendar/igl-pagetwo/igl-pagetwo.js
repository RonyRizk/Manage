import { h, Host } from "@stencil/core";
export class IglPagetwo {
  constructor() {
    this.showPaymentDetails = undefined;
    this.isEditOrAddRoomEvent = undefined;
    this.dateRangeData = undefined;
    this.bookingData = undefined;
    this.showSplitBookingOption = undefined;
    this.language = undefined;
    this.bookedByInfoData = undefined;
    this.bedPreferenceType = undefined;
    this.selectedRooms = undefined;
    this.isLoading = undefined;
    this.countryNodeList = undefined;
    this.selectedGuestData = undefined;
    this.selectedBookedByData = undefined;
    this.guestData = undefined;
    this.selectedUnits = {};
  }
  componentWillLoad() {
    this.initializeGuestData();
  }
  initializeGuestData() {
    let total = 0;
    const newSelectedUnits = Object.assign({}, this.selectedUnits);
    for (const key in this.selectedRooms) {
      for (const prop in this.selectedRooms[key]) {
        const totalRooms = this.selectedRooms[key][prop].totalRooms;
        newSelectedUnits[key] = Array(totalRooms).fill(-1);
      }
    }
    this.selectedUnits = newSelectedUnits;
    this.guestData = [];
    for (const key of Object.keys(this.selectedRooms)) {
      for (const prop of Object.keys(this.selectedRooms[key])) {
        for (let i = 1; i <= this.selectedRooms[key][prop].totalRooms; i++) {
          this.guestData.push(Object.assign({ guestName: '', roomId: '', preference: '' }, this.selectedRooms[key][prop]));
        }
        total += this.selectedRooms[key][prop].totalRooms * this.selectedRooms[key][prop].rate;
      }
    }
    this.bookingData.TOTAL_PRICE = total;
  }
  getRoomsListFromCategoryId(categoryId) {
    var _a;
    let category = (_a = this.bookingData.roomsInfo) === null || _a === void 0 ? void 0 : _a.find(category => category.id === categoryId);
    return (category && category.physicalrooms) || [];
  }
  handleOnApplicationInfoDataUpdateEvent(event, index) {
    const opt = event.detail;
    const categoryIdKey = `c_${opt.data.roomCategoryId}`;
    const updatedUnits = [...(this.selectedUnits[categoryIdKey] || [])];
    updatedUnits[index] = opt.data.roomId;
    this.selectedUnits = Object.assign(Object.assign({}, this.selectedUnits), { [categoryIdKey]: updatedUnits });
    this.dataUpdateEvent.emit({
      key: 'applicationInfoUpdateEvent',
      value: event.detail,
    });
  }
  handleEventData(event, key, index) {
    if (key === 'application-info') {
      this.handleOnApplicationInfoDataUpdateEvent(event, index);
    }
    else {
      this.selectedBookedByData = event.detail.data;
      this.dataUpdateEvent.emit({
        key: 'propertyBookedBy',
        value: event.detail,
      });
    }
  }
  isGuestDataIncomplete() {
    if (this.selectedGuestData.length !== this.guestData.length) {
      return true;
    }
    for (const data of this.selectedGuestData) {
      if (data.guestName === '' || data.preference === '' || data.roomId === '') {
        return true;
      }
    }
    return false;
  }
  isButtonDisabled(key) {
    const isValidProperty = (property, key, comparedBy) => {
      if (!property) {
        return true;
      }
      if (property === this.selectedGuestData) {
        return this.isGuestDataIncomplete();
      }
      const isCardDetails = ['cardNumber', 'cardHolderName', 'expiryMonth', 'expiryYear'].includes(key);
      if (!this.showPaymentDetails && isCardDetails) {
        return false;
      }
      return property[key] === comparedBy || property[key] === undefined;
    };
    return (this.isLoading === key ||
      isValidProperty(this.selectedGuestData, 'guestName', '') ||
      isValidProperty(this.selectedBookedByData, 'isdCode', '') ||
      isValidProperty(this.selectedBookedByData, 'contactNumber', '') ||
      isValidProperty(this.selectedBookedByData, 'firstName', '') ||
      isValidProperty(this.selectedBookedByData, 'lastName', '') ||
      isValidProperty(this.selectedBookedByData, 'countryId', -1) ||
      isValidProperty(this.selectedBookedByData, 'selectedArrivalTime', '') ||
      isValidProperty(this.selectedBookedByData, 'email', '') ||
      isValidProperty(this.selectedBookedByData, 'cardNumber', '') ||
      isValidProperty(this.selectedBookedByData, 'cardHolderName', '') ||
      isValidProperty(this.selectedBookedByData, 'expiryMonth', '') ||
      isValidProperty(this.selectedBookedByData, 'expiryYear', ''));
  }
  render() {
    return (h(Host, { class: "scrollContent" }, h("div", { class: "row" }, h("div", { class: "col-6 text-left p-0" }, h("span", { class: "mr-1 font-weight-bold font-medium-1" }, this.dateRangeData.fromDateStr, " - ", this.dateRangeData.toDateStr), this.dateRangeData.dateDifference, " nights"), h("div", { class: "col-6 text-right" }, "Total price ", h("span", { class: "font-weight-bold font-medium-1" }, '$' + this.bookingData.TOTAL_PRICE || '$0.00'))), this.guestData.map((roomInfo, index) => (h("igl-application-info", { bedPreferenceType: this.bedPreferenceType, index: index, selectedUnits: this.selectedUnits[`c_${roomInfo.roomCategoryId}`], guestInfo: roomInfo, guestRefKey: index, bookingType: this.bookingData.event_type, roomsList: this.getRoomsListFromCategoryId(roomInfo.roomCategoryId), onDataUpdateEvent: event => 
      //this.handleOnApplicationInfoDataUpdateEvent(event, index)
      this.handleEventData(event, 'application-info', index) }))), this.isEditOrAddRoomEvent || this.showSplitBookingOption ? null : (h("igl-property-booked-by", { countryNodeList: this.countryNodeList, language: this.language, showPaymentDetails: this.showPaymentDetails, defaultData: this.bookedByInfoData, onDataUpdateEvent: event => 
      // this.dataUpdateEvent.emit({
      //   key: "propertyBookedBy",
      //   value: event.detail,
      // })
      this.handleEventData(event, 'propertyBookedBy', 0) })), this.isEditOrAddRoomEvent ? (h("div", { class: "row p-0 mb-1 mt-2" }, h("div", { class: "col-6" }, h("button", { type: "button", class: "btn btn-secondary full-width", onClick: () => this.buttonClicked.emit({ key: 'cancel' }) }, "Cancel")), h("div", { class: "col-6" }, h("button", { disabled: this.isLoading === 'save' || this.isGuestDataIncomplete(), type: "button", class: "btn btn-primary full-width", onClick: () => this.buttonClicked.emit({ key: 'save' }) }, this.isLoading === 'save' && h("i", { class: "la la-circle-o-notch spinner mx-1" }), "Save")))) : (h("div", { class: "row p-0 mb-1 mt-2" }, h("div", { class: "col-4" }, h("button", { type: "button", class: "btn btn-secondary full-width", onClick: () => this.buttonClicked.emit({ key: 'back' }) }, "<< Back")), h("div", { class: "col-4" }, h("button", { disabled: this.isButtonDisabled('book'), type: "button", class: "btn btn-primary full-width", onClick: () => this.buttonClicked.emit({ key: 'book' }) }, this.isLoading === 'book' && h("i", { class: "la la-circle-o-notch spinner mx-1" }), "Book")), h("div", { class: "col-4" }, h("button", { disabled: this.isButtonDisabled('bookAndCheckIn'), type: "button", class: "btn btn-primary full-width", onClick: () => this.buttonClicked.emit({ key: 'bookAndCheckIn' }) }, this.isLoading === 'bookAndCheckIn' && h("i", { class: "la la-circle-o-notch spinner mx-1" }), "Book & check in"))))));
  }
  static get is() { return "igl-pagetwo"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-pagetwo.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-pagetwo.css"]
    };
  }
  static get properties() {
    return {
      "showPaymentDetails": {
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
        "attribute": "show-payment-details",
        "reflect": false
      },
      "isEditOrAddRoomEvent": {
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
        "attribute": "is-edit-or-add-room-event",
        "reflect": true
      },
      "dateRangeData": {
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
      "bookingData": {
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
      "language": {
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
        "attribute": "language",
        "reflect": false
      },
      "bookedByInfoData": {
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
      "bedPreferenceType": {
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
        "attribute": "bed-preference-type",
        "reflect": false
      },
      "selectedRooms": {
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
        "attribute": "selected-rooms",
        "reflect": false
      },
      "isLoading": {
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
        "attribute": "is-loading",
        "reflect": true
      },
      "countryNodeList": {
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
        "attribute": "country-node-list",
        "reflect": false
      },
      "selectedGuestData": {
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
        "attribute": "selected-guest-data",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "selectedBookedByData": {},
      "guestData": {},
      "selectedUnits": {}
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
          "original": "IPageTwoDataUpdateProps",
          "resolved": "IPageTwoDataUpdateProps",
          "references": {
            "IPageTwoDataUpdateProps": {
              "location": "import",
              "path": "../../../models/models",
              "id": "src/models/models.ts::IPageTwoDataUpdateProps"
            }
          }
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
          "original": "{\r\n    key: PageTwoButtonsTypes;\r\n    data?: CustomEvent;\r\n  }",
          "resolved": "{ key: PageTwoButtonsTypes; data?: CustomEvent<any>; }",
          "references": {
            "PageTwoButtonsTypes": {
              "location": "import",
              "path": "../../../models/models",
              "id": "src/models/models.ts::PageTwoButtonsTypes"
            },
            "CustomEvent": {
              "location": "global",
              "id": "global::CustomEvent"
            }
          }
        }
      }];
  }
}
//# sourceMappingURL=igl-pagetwo.js.map
