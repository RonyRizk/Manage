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
    this.defaultTexts = undefined;
    this.showPaymentDetails = false;
    this.defaultData = undefined;
    this.countryNodeList = [];
    this.propertyId = undefined;
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
      emailGuest: true,
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
    console.log('default data', this.defaultData);
  }
  initializeExpiryYears() {
    const currentYear = new Date().getFullYear();
    this.expiryYears = Array.from({ length: 4 }, (_, index) => (currentYear + index).toString());
  }
  async assignCountryCode() {
    const country = await this.bookingService.getUserDefaultCountry();
    const countryId = country['COUNTRY_ID'];
    this.country = countryId;
    this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { isdCode: countryId.toString(), countryId });
  }
  initializeDateData() {
    const dt = new Date();
    const month = dt.getMonth() + 1;
    this.currentMonth = month < 10 ? `0${month}` : month.toString();
  }
  populateBookedByData() {
    var _a;
    this.bookedByData = this.defaultData ? Object.assign(Object.assign({}, this.bookedByData), this.defaultData) : {};
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
  handleComboboxChange(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    const { key, data } = e.detail;
    console.log(key, data);
    switch (key) {
      case 'blur':
        if (data !== '') {
          this.bookedByData.email = data;
          this.checkUser();
        }
        break;
      case 'select':
        this.bookedByData.email = data.email;
        this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: data.id, firstName: data.first_name, lastName: data.last_name, contactNumber: data.mobile, countryId: data.country_id, isdCode: data.country_id.toString() });
        this.dataUpdateEvent.emit({
          key: 'bookedByInfoUpdated',
          data: this.bookedByData,
        });
        break;
      default:
        break;
    }
  }
  clearEvent() {
    this.bookedByData.email = '';
    this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: '', firstName: '', lastName: '', contactNumber: '', isdCode: this.country.toString(), countryId: this.country });
    this.dataUpdateEvent.emit({
      key: 'bookedByInfoUpdated',
      data: Object.assign({}, this.bookedByData),
    });
  }
  render() {
    return (h(Host, null, h("div", { class: "text-left mt-3" }, h("div", { class: "form-group d-flex flex-column flex-md-row align-items-md-center text-left " }, h("label", { class: "p-0 m-0 label-control mr-1 font-weight-bold" }, this.defaultTexts.entries.Lcz_BookedBy), h("div", { class: "bookedByEmailContainer mt-1 mt-md-0" }, h("ir-autocomplete", { onComboboxValue: this.handleComboboxChange.bind(this), propertyId: this.propertyId, type: "email", value: this.bookedByData.email, required: true, placeholder: this.defaultTexts.entries.Lcz_EmailAddress, onInputCleared: () => this.clearEvent() })))), h("div", { class: "bookedDetailsForm text-left mt-2 font-small-3 " }, h("div", { class: "d-flex flex-column flex-md-row  justify-content-md-between " }, h("div", { class: "p-0 flex-fill " }, h("div", { class: "form-group d-flex flex-column flex-md-row align-items-md-center p-0 flex-fill " }, h("label", { class: "p-0 m-0 margin3" }, this.defaultTexts.entries.Lcz_FirstName), h("div", { class: "p-0 m-0  controlContainer flex-fill  " }, h("input", { class: "form-control flex-fill", type: "text", placeholder: this.defaultTexts.entries.Lcz_FirstName, id: v4(), value: this.bookedByData.firstName, onInput: event => this.handleDataChange('firstName', event), required: true }))), h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { class: "p-0 m-0 margin3" }, this.defaultTexts.entries.Lcz_LastName), h("div", { class: "p-0 m-0  controlContainer flex-fill" }, h("input", { class: "form-control", type: "text", placeholder: this.defaultTexts.entries.Lcz_LastName, id: v4(), value: this.bookedByData.lastName, onInput: event => this.handleDataChange('lastName', event) }))), h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { class: "p-0 m-0 margin3" }, this.defaultTexts.entries.Lcz_Country), h("div", { class: "p-0 m-0  controlContainer flex-fill" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('countryId', event) }, h("option", { value: "", selected: this.bookedByData.countryId === '' }, this.defaultTexts.entries.Lcz_Select), this.countryNodeList.map(countryNode => (h("option", { value: countryNode.id, selected: this.bookedByData.countryId === countryNode.id }, countryNode.name)))))), h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { class: "p-0 m-0 margin3" }, this.defaultTexts.entries.Lcz_MobilePhone), h("div", { class: "p-0 m-0  d-flex  controlContainer flex-fill" }, h("div", { class: " p-0 m-0" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('isdCode', event) }, h("option", { value: "", selected: this.bookedByData.isdCode === '' }, this.defaultTexts.entries.Lcz_Isd), this.countryNodeList.map(country => (h("option", { value: country.id, selected: this.bookedByData.isdCode === country.id.toString() }, country.phone_prefix))))), h("div", { class: "flex-fill p-0 m-0" }, h("input", { class: "form-control", type: "tel", placeholder: this.defaultTexts.entries.Lcz_ContactNumber, id: v4(), value: this.bookedByData.contactNumber, onInput: event => this.handleNumberInput('contactNumber', event) })))), h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { class: "p-0 m-0 margin3" }, this.defaultTexts.entries.Lcz_YourArrivalTime), h("div", { class: "p-0 m-0  controlContainer flex-fill" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('selectedArrivalTime', event) }, h("option", { value: "", selected: this.bookedByData.selectedArrivalTime === '' }, "-"), this.arrivalTimeList.map(time => (h("option", { value: time.CODE_NAME, selected: this.bookedByData.selectedArrivalTime === time.CODE_NAME }, time.CODE_VALUE_EN))))))), h("div", { class: "p-0 flex-fill  ml-md-3" }, h("div", { class: "  p-0 d-flex flex-column flex-md-row align-items-md-center " }, h("label", { class: "p-0 m-0 margin3" }, this.defaultTexts.entries.Lcz_AnyMessageForUs), h("div", { class: "p-0 m-0  controlContainer flex-fill " }, h("textarea", { id: v4(), rows: 4, class: "form-control ", name: "message", value: this.bookedByData.message, onInput: event => this.handleDataChange('message', event) }))), this.showPaymentDetails && (h(Fragment, null, h("div", { class: "form-group mt-md-1  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { class: "p-0 m-0 margin3" }, this.defaultTexts.entries.Lcz_CardNumber), h("div", { class: "p-0 m-0  controlContainer flex-fill" }, h("input", { class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4(), value: this.bookedByData.cardNumber, onInput: event => this.handleNumberInput('cardNumber', event) }))), h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { class: "p-0 m-0 margin3" }, this.defaultTexts.entries.Lcz_CardHolderName), h("div", { class: "p-0 m-0  controlContainer flex-fill" }, h("input", { class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4(), value: this.bookedByData.cardHolderName, onInput: event => this.handleDataChange('cardHolderName', event) }))), h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { class: "p-0 m-0 margin3" }, this.defaultTexts.entries.Lcz_ExpiryDate), h("div", { class: "p-0 m-0 row  controlContainer flex-fill" }, h("div", { class: "p-0 m-0" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('expiryMonth', event) }, this.expiryMonths.map(month => (h("option", { value: month, selected: month === this.bookedByData.expiryMonth }, month))))), h("div", { class: "p-0 m-0 ml-1" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('expiryYear', event) }, this.expiryYears.map((year, index) => (h("option", { value: year, selected: index === this.bookedByData.expiryYear }, year))))))))), h("div", { class: "form-group row p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { class: "p-0 m-0 margin3" }, this.defaultTexts.entries.Lcz_EmailTheGuest), h("div", { class: "p-0 m-0  controlContainer flex-fill checkBoxContainer" }, h("input", { class: "form-control", type: "checkbox", checked: this.bookedByData.emailGuest, id: v4(), onChange: event => this.handleDataChange('emailGuest', event) }))))))));
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
      "defaultTexts": {
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
        "attribute": "default-texts",
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
      },
      "propertyId": {
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
        "attribute": "property-id",
        "reflect": false
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
