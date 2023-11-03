import { h } from "@stencil/core";
import moment from "moment";
import { _formatDate, _formatTime } from "./functions";
export class IrBookingDetails {
  constructor() {
    this.bookingDetails = null;
    this.setupDataCountries = null;
    this.setupDataCountriesCode = null;
    this.languageAbreviation = '';
    this.dropdownStatuses = [];
    this.paymentDetailsUrl = '';
    this.paymentExceptionMessage = '';
    this.statusCodes = [];
    this.hasPrint = false;
    this.hasReceipt = false;
    this.hasDelete = false;
    this.hasMenu = false;
    this.hasRoomEdit = false;
    this.hasRoomDelete = false;
    this.hasRoomAdd = false;
    this.hasCheckIn = false;
    this.hasCheckOut = false;
    this.statusData = [];
    this.tempStatus = null;
    this.guestData = null;
    this.rerenderFlag = false;
  }
  handleIconClick(e) {
    const target = e.target;
    switch (target.id) {
      case 'print':
        this.handlePrintClick.emit();
        return;
      case 'receipt':
        this.handleReceiptClick.emit();
        return;
      case 'book-delete':
        this.handleDeleteClick.emit();
        return;
      case 'menu':
        this.handleMenuClick.emit();
        return;
      case 'room-add':
        this.handleRoomAdd.emit();
        return;
      case 'add-payment':
        this.handleAddPayment.emit();
        return;
    }
    const targetID = target.id;
    if (targetID.includes('roomEdit')) {
      const roomID = target.id.split('-')[1];
      this.handleRoomEdit.emit(roomID);
    }
    else if (target.id.includes('roomDelete')) {
      const roomID = target.id.split('-')[1];
      this.handleRoomDelete.emit(roomID);
    }
  }
  handleSidebarToggle() {
    const sidebar = document.querySelector('ir-sidebar#editGuestInfo');
    sidebar.open = false;
  }
  handleEditSidebar() {
    this.openEditSidebar();
  }
  handleFormSubmit(e) {
    const data = e.detail;
    // handle changes in the booking details
    const bookingDetails = this.bookingDetails;
    bookingDetails.My_Guest.FIRST_NAME = data.firstName;
    bookingDetails.My_Guest.LAST_NAME = data.lastName;
    bookingDetails.My_Guest.COUNTRY_ID = data.country;
    bookingDetails.My_Guest.CITY = data.city;
    bookingDetails.My_Guest.ADDRESS = data.address;
    bookingDetails.My_Guest.MOBILE = data.mobile;
    bookingDetails.My_Guest.PHONE_PREFIX = data.prefix;
    bookingDetails.My_Guest.IS_NEWS_LETTER = data.newsletter;
    bookingDetails.My_Guest.My_User.CURRENCY = data.currency;
    bookingDetails.My_Guest.My_User.DISCLOSED_EMAIL = data.altEmail;
    bookingDetails.My_Guest.My_User.PASSWORD = data.password;
    bookingDetails.My_Guest.My_User.EMAIL = data.email;
    this.bookingDetails = bookingDetails;
    console.log('Form submitted with data: ', this.bookingDetails);
    this.rerenderFlag = !this.rerenderFlag;
    // close the sidebar
    const sidebar = document.querySelector('ir-sidebar#editGuestInfo');
    sidebar.open = false;
    this.sendDataToServer.emit(this.bookingDetails);
  }
  handleSelectChange(e) {
    const target = e.target;
    const targetID = target.id;
    switch (targetID) {
      case 'update-status':
        this.tempStatus = e.detail;
        break;
    }
  }
  handleClick(e) {
    const target = e.target;
    const targetID = target.id;
    switch (targetID) {
      case 'update-status-btn':
        this.updateStatus();
        break;
    }
  }
  watchHandler(newValue, oldValue) {
    console.log('The new value of bookingDetails is: ', newValue);
    console.log('The old value of bookingDetails is: ', oldValue);
    let _data = {
      firstName: newValue.My_Guest.FIRST_NAME,
      lastName: newValue.My_Guest.LAST_NAME,
      email: newValue.My_Guest.My_User.EMAIL,
      altEmail: newValue.My_Guest.My_User.DISCLOSED_EMAIL,
      password: newValue.My_Guest.My_User.PASSWORD,
      country: newValue.My_Guest.COUNTRY_ID,
      city: newValue.My_Guest.CITY,
      address: newValue.My_Guest.ADDRESS,
      mobile: newValue.My_Guest.MOBILE,
      prefix: newValue.My_Guest.PHONE_PREFIX,
      newsletter: newValue.My_Guest.IS_NEWS_LETTER,
      currency: newValue.My_Guest.My_User.CURRENCY,
      language: newValue.My_Guest.My_User.LANGUAGE,
    };
    this.guestData = _data;
    this.rerenderFlag = !this.rerenderFlag;
  }
  watchDropdownStatuses(newValue, oldValue) {
    console.log('The new value of dropdownStatuses is: ', newValue);
    console.log('The old value of dropdownStatuses is: ', oldValue);
    // Make the newValue in way that can be handled by the dropdown
    try {
      const _newValue = newValue.map(item => {
        return {
          value: item.CODE_NAME,
          text: this._getBookingStatus(item.CODE_NAME, '_BOOK_STATUS')
        };
      });
      this.statusData = _newValue;
      console.log('The new value of statusData is: ', this.statusData);
      this.rerenderFlag = !this.rerenderFlag;
    }
    catch (e) {
      console.log('Error in watchDropdownStatuses: ', e);
    }
  }
  openEditSidebar() {
    const sidebar = document.querySelector('ir-sidebar#editGuestInfo');
    sidebar.open = true;
  }
  _calculateNights(fromDate, toDate) {
    // calculate the difference between the two dates
    const diff = moment(toDate).diff(moment(fromDate), 'days');
    // return the difference
    return diff;
  }
  _getBookingStatus(statusCode, tableName) {
    // get the status from the statusCode and tableName and also where the language is CODE_VALUE_${language}
    const status = this.statusCodes.find((status) => status.CODE_NAME === statusCode && status.TBL_NAME === tableName);
    const value = status[`CODE_VALUE_${this.languageAbreviation}`];
    // return the status
    return value;
  }
  updateStatus() {
    const bookingDetails = this.bookingDetails;
    bookingDetails.BOOK_STATUS_CODE = this.tempStatus;
    this.bookingDetails = bookingDetails;
    this.rerenderFlag = !this.rerenderFlag;
    this.sendDataToServer.emit(this.bookingDetails);
  }
  render() {
    var _a;
    if (!this.bookingDetails) {
      return null;
    }
    let confirmationBG = '';
    switch (this.bookingDetails.BOOK_STATUS_CODE) {
      case '001':
        confirmationBG = 'bg-ir-orange';
        break;
      case '002':
        confirmationBG = 'bg-ir-green';
        break;
      case '003':
        confirmationBG = 'bg-ir-red';
        break;
      case '004':
        confirmationBG = 'bg-ir-red';
        break;
    }
    return [
      h("div", { class: "fluid-container pt-1 mr-2 ml-2" }, h("div", { class: "row" }, h("div", { class: "col-lg-7 col-md-12 d-flex justify-content-start align-items-end" }, h("div", { class: "font-size-large sm-padding-right" }, `Booking#${this.bookingDetails.BOOK_NBR}`), h("div", null, "@ ", _formatDate(this.bookingDetails.BOOK_DATE), " ", _formatTime(this.bookingDetails.BOOK_HOUR, +' ' + this.bookingDetails.BOOK_MINUTE))), h("div", { class: "col-lg-5 col-md-12 d-flex justify-content-end align-items-center" }, h("span", { class: `confirmed btn-sm mr-2 ${confirmationBG}` }, this._getBookingStatus(this.bookingDetails.BOOK_STATUS_CODE, '_BOOK_STATUS')), h("ir-select", { id: "update-status", size: "sm", "label-available": "false", data: this.statusData, textSize: "sm", class: "sm-padding-right" }), h("ir-button", { icon: "", id: "update-status-btn", size: "sm", text: "Update" }), this.hasReceipt && h("ir-icon", { id: "receipt", icon: "ft-file-text h1 color-ir-dark-blue-hover ml-1 pointer" }), this.hasPrint && h("ir-icon", { id: "print", icon: "ft-printer h1 color-ir-dark-blue-hover ml-1 pointer" }), this.hasDelete && h("ir-icon", { id: "book-delete", icon: "ft-trash-2 h1 danger ml-1 pointer" }), this.hasMenu && h("ir-icon", { id: "menu", icon: "ft-list h1 color-ir-dark-blue-hover ml-1 pointer" })))),
      h("div", { class: "fluid-container m-1" }, h("div", { class: "row m-0" }, h("div", { class: "col-lg-7 col-md-12 pl-0 pr-lg-1 p-0" }, h("div", { class: "card" }, h("div", { class: "p-1" }, ((_a = this.bookingDetails.My_Ac) === null || _a === void 0 ? void 0 : _a.NAME) || '', h("ir-label", { label: "Source:", value: this.bookingDetails.My_Source.Label, imageSrc: this.bookingDetails.My_Source.Icon }), h("ir-label", { label: "Booked by:", value: `${this.bookingDetails.My_Guest.FIRST_NAME} ${this.bookingDetails.My_Guest.LAST_NAME}`, iconShown: true }), h("ir-label", { label: "Phone:", value: this.bookingDetails.My_Guest.MOBILE }), h("ir-label", { label: "Email:", value: this.bookingDetails.My_Guest.My_User.EMAIL }), h("ir-label", { label: "Alternate Email:", value: this.bookingDetails.My_Guest.My_User.DISCLOSED_EMAIL }), h("ir-label", { label: "Address:", value: this.bookingDetails.My_Guest.ADDRESS }), h("ir-label", { label: "Arrival Time:", value: this._getBookingStatus(this.bookingDetails.ARRIVAL_TIME_CODE, '_ARRIVAL_TIME') }), h("ir-label", { label: "Notes:", value: this.bookingDetails.GUEST_REMARK }))), h("div", { class: "font-size-large d-flex justify-content-between align-items-center ml-1 mb-1" }, `${_formatDate(this.bookingDetails.FROM_DATE)} - ${_formatDate(this.bookingDetails.TO_DATE)} (${this._calculateNights(this.bookingDetails.FROM_DATE, this.bookingDetails.TO_DATE)} ${this._calculateNights(this.bookingDetails.FROM_DATE, this.bookingDetails.TO_DATE) > 1 ? 'nights' : 'night'})`, this.hasRoomAdd && h("ir-icon", { id: "room-add", icon: "ft-plus h3 color-ir-dark-blue-hover pointer" })), h("div", { class: "card" }, this.bookingDetails.My_Bsa.map((bsa, index) => {
        const mealCodeName = this._getBookingStatus(bsa.FOOD_ARRANGE_CAT_CODE, '_FOOD_ARRANGE_CAT');
        const myRoomTypeFoodCat = this._getBookingStatus(bsa.My_Room_type.FOOD_ARRANGE_CAT_CODE, '_FOOD_ARRANGE_CAT');
        return [
          h("ir-room", { myRoomTypeFoodCat: myRoomTypeFoodCat, mealCodeName: mealCodeName, currency: this.bookingDetails.My_Currency.REF, hasRoomEdit: this.hasRoomEdit, hasRoomDelete: this.hasRoomDelete, hasCheckIn: this.hasCheckIn, hasCheckOut: this.hasCheckOut, item: bsa }),
          // add separator if not last item with marginHorizontal and alignCenter
          index !== this.bookingDetails.My_Bsa.length - 1 && h("hr", { class: "mr-2 ml-2 mt-1 mb-1" }),
        ];
      }))), h("div", { class: "col-lg-5 col-md-12 pr-0 pl-0 pl-md-1" }, h("ir-payment-details", { item: this.bookingDetails, paymentDetailsUrl: this.paymentDetailsUrl, paymentExceptionMessage: this.paymentExceptionMessage })))),
      h("ir-sidebar", { side: 'right', id: "editGuestInfo" }, h("ir-guest-info", { data: this.guestData, setupDataCountries: this.setupDataCountries, setupDataCountriesCode: this.setupDataCountriesCode })),
    ];
  }
  static get is() { return "ir-booking-details"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-booking-details.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-booking-details.css"]
    };
  }
  static get properties() {
    return {
      "bookingDetails": {
        "type": "any",
        "mutable": true,
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
        "attribute": "booking-details",
        "reflect": true,
        "defaultValue": "null"
      },
      "setupDataCountries": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "selectOption[]",
          "resolved": "selectOption[]",
          "references": {
            "selectOption": {
              "location": "import",
              "path": "../../common/models",
              "id": "src/common/models.ts::selectOption"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "null"
      },
      "setupDataCountriesCode": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "selectOption[]",
          "resolved": "selectOption[]",
          "references": {
            "selectOption": {
              "location": "import",
              "path": "../../common/models",
              "id": "src/common/models.ts::selectOption"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "null"
      },
      "languageAbreviation": {
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
        "attribute": "language-abreviation",
        "reflect": false,
        "defaultValue": "''"
      },
      "dropdownStatuses": {
        "type": "any",
        "mutable": true,
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
        "attribute": "dropdown-statuses",
        "reflect": false,
        "defaultValue": "[]"
      },
      "paymentDetailsUrl": {
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
        "attribute": "payment-details-url",
        "reflect": false,
        "defaultValue": "''"
      },
      "paymentExceptionMessage": {
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
        "attribute": "payment-exception-message",
        "reflect": false,
        "defaultValue": "''"
      },
      "statusCodes": {
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
        "attribute": "status-codes",
        "reflect": false,
        "defaultValue": "[]"
      },
      "hasPrint": {
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
        "attribute": "has-print",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasReceipt": {
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
        "attribute": "has-receipt",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasDelete": {
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
        "attribute": "has-delete",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasMenu": {
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
        "attribute": "has-menu",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasRoomEdit": {
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
        "attribute": "has-room-edit",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasRoomDelete": {
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
        "attribute": "has-room-delete",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasRoomAdd": {
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
        "attribute": "has-room-add",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasCheckIn": {
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
        "attribute": "has-check-in",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasCheckOut": {
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
        "attribute": "has-check-out",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "statusData": {},
      "tempStatus": {},
      "guestData": {},
      "rerenderFlag": {}
    };
  }
  static get events() {
    return [{
        "method": "sendDataToServer",
        "name": "sendDataToServer",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "guestInfo",
          "resolved": "guestInfo",
          "references": {
            "guestInfo": {
              "location": "import",
              "path": "../../common/models",
              "id": "src/common/models.ts::guestInfo"
            }
          }
        }
      }, {
        "method": "handlePrintClick",
        "name": "handlePrintClick",
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
        "method": "handleReceiptClick",
        "name": "handleReceiptClick",
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
        "method": "handleDeleteClick",
        "name": "handleDeleteClick",
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
        "method": "handleMenuClick",
        "name": "handleMenuClick",
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
        "method": "handleRoomAdd",
        "name": "handleRoomAdd",
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
        "method": "handleRoomEdit",
        "name": "handleRoomEdit",
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
        "method": "handleRoomDelete",
        "name": "handleRoomDelete",
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
        "method": "handleAddPayment",
        "name": "handleAddPayment",
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
  static get watchers() {
    return [{
        "propName": "bookingDetails",
        "methodName": "watchHandler"
      }, {
        "propName": "dropdownStatuses",
        "methodName": "watchDropdownStatuses"
      }];
  }
  static get listeners() {
    return [{
        "name": "iconClickHandler",
        "method": "handleIconClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "irSidebarToggle",
        "method": "handleSidebarToggle",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "editSidebar",
        "method": "handleEditSidebar",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "submitForm",
        "method": "handleFormSubmit",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "selectChange",
        "method": "handleSelectChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "clickHanlder",
        "method": "handleClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-booking-details.js.map
