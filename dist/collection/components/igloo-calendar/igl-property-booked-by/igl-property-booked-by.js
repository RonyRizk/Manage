import { Host, h, Fragment } from "@stencil/core";
import { BookingService } from "../../../services/booking.service";
import { v4 } from "uuid";
export class IglPropertyBookedBy {
  constructor() {
    this.bookingService = new BookingService();
    this.arrivalTimeList = [];
    this.expiryMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    this.expiryYears = [];
    this.currentMonth = '01';
    this.language = undefined;
    this.showPaymentDetails = false;
    this.defaultData = undefined;
    this.countryNodeList = [];
    this.bookedByData = {
      id: undefined,
      email: '',
      firstName: '',
      lastName: '',
      countryId: '',
      isdCode: '',
      contactNumber: '',
      selectedArrivalTime: {
        code: '',
        description: '',
      },
      emailGuest: false,
      message: '',
      cardNumber: '',
      cardHolderName: '',
      expiryMonth: '',
      expiryYear: '',
    };
  }
  async componentWillLoad() {
    this.assignCountryCode();
    this.initializeExpiryYears();
    this.initializeDateData();
    this.populateBookedByData();
  }
  initializeExpiryYears() {
    const currentYear = new Date().getFullYear();
    this.expiryYears = Array.from({ length: 4 }, (_, index) => (currentYear + index).toString());
  }
  async assignCountryCode() {
    const country = await this.bookingService.getUserDefaultCountry();
    console.log(country);
    const countryId = country['COUNTRY_ID'];
    console.log(countryId);
    this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { isdCode: countryId.toString(), countryId });
  }
  initializeDateData() {
    const dt = new Date();
    const month = dt.getMonth() + 1;
    this.currentMonth = month < 10 ? `0${month}` : month.toString();
  }
  populateBookedByData() {
    var _a;
    this.bookedByData = this.defaultData ? Object.assign({}, this.defaultData) : {};
    this.arrivalTimeList = ((_a = this.defaultData) === null || _a === void 0 ? void 0 : _a.arrivalTime) || [];
    if (!this.bookedByData.expiryMonth) {
      this.bookedByData.expiryMonth = this.currentMonth;
    }
    if (!this.bookedByData.expiryYear) {
      this.bookedByData.expiryYear = new Date().getFullYear();
    }
  }
  handleDataChange(key, event) {
    const foundTime = this.arrivalTimeList.find(time => time.CODE_NAME === event.target.value);
    this.bookedByData[key] =
      key === 'emailGuest'
        ? event.target.checked
        : key === 'arrivalTime'
          ? {
            code: event.target.value,
            description: (foundTime && foundTime.CODE_VALUE_EN) || '',
          }
          : event.target.value;
    this.dataUpdateEvent.emit({
      key: 'bookedByInfoUpdated',
      data: Object.assign({}, this.bookedByData),
    });
    if (key === 'countryId') {
      this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { isdCode: event.target.value });
    }
  }
  handleNumberInput(key, event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    // Regular expression to match only numeric characters (0-9)
    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(inputValue)) {
      // If the input is not numeric, prevent it from being entered
      inputElement.value = inputValue.replace(/[^0-9]/g, '');
    }
    if (inputValue === inputElement.value) {
      this.handleDataChange(key, event);
    }
  }
  async handleEmailInput(key, event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    if (this.isValidEmail(inputValue)) {
      this.handleDataChange(key, event);
    }
  }
  async checkUser() {
    try {
      const email = this.bookedByData.email;
      if (this.isValidEmail(email)) {
        const res = await this.bookingService.getUserInfo(email);
        if (res !== null) {
          this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: res.id, firstName: res.first_name, lastName: res.last_name, contactNumber: res.mobile, countryId: res.country_id, isdCode: res.country_id.toString() });
        }
        else {
          this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: undefined, firstName: '', lastName: '', contactNumber: '', countryId: '', isdCode: '' });
        }
        this.dataUpdateEvent.emit({
          key: 'bookedByInfoUpdated',
          data: Object.assign({}, this.bookedByData),
        });
      }
    }
    catch (error) {
      //   toastr.error(error);
    }
  }
  isValidEmail(emailId) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(emailId);
  }
  render() {
    return (h(Host, null, h("div", { class: "text-left mt-3" }, h("div", { class: "form-group row text-left align-items-center" }, h("label", { class: "p-0 m-0 label-control mr-1 font-weight-bold" }, "Booked by"), h("div", { class: "bookedByEmailContainer" }, h("input", { id: v4(), type: "email", class: "form-control", placeholder: "Email address", name: "bookeyByEmail", value: this.bookedByData.email, onInput: event => this.handleEmailInput('email', event), required: true, onBlur: () => this.checkUser() })))), h("div", { class: "bookedDetailsForm text-left mt-2 font-small-3" }, h("div", { class: "row" }, h("div", { class: "p-0 col-md-6" }, h("div", { class: "form-group row p-0 align-items-center" }, h("label", { class: "p-0 m-0" }, "First name"), h("div", { class: "p-0 m-0 pr-1 controlContainer" }, h("input", { class: "form-control", type: "text", placeholder: "First name", id: v4(), value: this.bookedByData.firstName, onInput: event => this.handleDataChange('firstName', event), required: true }))), h("div", { class: "form-group row p-0 align-items-center" }, h("label", { class: "p-0 m-0" }, "Last name"), h("div", { class: "p-0 m-0 pr-1 controlContainer" }, h("input", { class: "form-control", type: "text", placeholder: "Last name", id: v4(), value: this.bookedByData.lastName, onInput: event => this.handleDataChange('lastName', event) }))), h("div", { class: "form-group row p-0 align-items-center" }, h("label", { class: "p-0 m-0" }, "Country"), h("div", { class: "p-0 m-0 pr-1 controlContainer" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('countryId', event) }, h("option", { value: "", selected: this.bookedByData.countryId === '' }, "Select"), this.countryNodeList.map(countryNode => (h("option", { value: countryNode.id, selected: this.bookedByData.countryId === countryNode.id }, countryNode.name)))))), h("div", { class: "form-group row p-0 align-items-center" }, h("label", { class: "p-0 m-0" }, "Mobile phone"), h("div", { class: "p-0 m-0 pr-1 row controlContainer" }, h("div", { class: "col-3 p-0 m-0" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('isdCode', event) }, h("option", { value: "", selected: this.bookedByData.isdCode === '' }, "ISD"), this.countryNodeList.map(country => (h("option", { value: country.id, selected: this.bookedByData.isdCode === country.id.toString() }, country.phone_prefix))))), h("div", { class: "col-9 p-0 m-0" }, h("input", { class: "form-control", type: "tel", placeholder: "Contact Number", id: v4(), value: this.bookedByData.contactNumber, onInput: event => this.handleNumberInput('contactNumber', event) })))), h("div", { class: "form-group row p-0 align-items-center" }, h("label", { class: "p-0 m-0" }, "Your arrival time"), h("div", { class: "p-0 m-0 pr-1 controlContainer" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('selectedArrivalTime', event) }, h("option", { value: "", selected: this.bookedByData.selectedArrivalTime === '' }, "-"), this.arrivalTimeList.map(time => (h("option", { value: time.CODE_NAME, selected: this.bookedByData.selectedArrivalTime === time.CODE_NAME }, time.CODE_VALUE_EN)))))), h("div", { class: "form-group row p-0 align-items-center" }, h("label", { class: "p-0 m-0" }, "Email the guest"), h("div", { class: "p-0 m-0 pr-1 controlContainer checkBoxContainer" }, h("input", { class: "form-control", type: "checkbox", checked: this.bookedByData.emailGuest, id: v4(), onChange: event => this.handleDataChange('emailGuest', event) })))), h("div", { class: "col-md-6 p-0" }, h("div", { class: "form-group row p-0 align-items-center" }, h("label", { class: "p-0 m-0" }, "Any message for us?"), h("div", { class: "p-0 m-0 pr-1 controlContainer" }, h("textarea", { id: v4(), rows: 4, class: "form-control", name: "message", value: this.bookedByData.message, onInput: event => this.handleDataChange('message', event) }))), this.showPaymentDetails && (h(Fragment, null, h("div", { class: "form-group row p-0 align-items-center" }, h("label", { class: "p-0 m-0" }, "Card Number"), h("div", { class: "p-0 m-0 pr-1 controlContainer" }, h("input", { class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4(), value: this.bookedByData.cardNumber, onInput: event => this.handleNumberInput('cardNumber', event) }))), h("div", { class: "form-group row p-0 align-items-center" }, h("label", { class: "p-0 m-0" }, "Card holder name"), h("div", { class: "p-0 m-0 pr-1 controlContainer" }, h("input", { class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4(), value: this.bookedByData.cardHolderName, onInput: event => this.handleDataChange('cardHolderName', event) }))), h("div", { class: "form-group row p-0 align-items-center" }, h("label", { class: "p-0 m-0" }, "Expiry Date"), h("div", { class: "p-0 m-0 row pr-1 controlContainer" }, h("div", { class: "p-0 m-0" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('expiryMonth', event) }, this.expiryMonths.map(month => (h("option", { value: month, selected: month === this.bookedByData.expiryMonth }, month))))), h("div", { class: "p-0 m-0 ml-1" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('expiryYear', event) }, this.expiryYears.map((year, index) => (h("option", { value: year, selected: index === this.bookedByData.expiryYear }, year))))))))))))));
  }
  static get is() { return "igl-property-booked-by"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-property-booked-by.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-property-booked-by.css"]
    };
  }
  static get properties() {
    return {
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
        "reflect": false,
        "defaultValue": "false"
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
      },
      "countryNodeList": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ICountry[]",
          "resolved": "ICountry[]",
          "references": {
            "ICountry": {
              "location": "import",
              "path": "../../../models/IBooking",
              "id": "src/models/IBooking.ts::ICountry"
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
      }
    };
  }
  static get states() {
    return {
      "bookedByData": {}
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
}
//# sourceMappingURL=igl-property-booked-by.js.map
