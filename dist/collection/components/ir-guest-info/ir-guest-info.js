import { h } from "@stencil/core";
import { guestInfoValidation } from "../../common/models";
import moment from "moment";
export class GuestInfo {
  constructor() {
    this.Model = new guestInfoValidation();
    this.gotdata = false;
    this.submit = false;
    this.setupDataCountries = null;
    this.setupDataCountriesCode = null;
    this.data = null;
  }
  componentWillLoad() {
    this.getSetupData.emit();
    this.submit = false;
    if (this.data !== null) {
      this.Model = Object.assign(Object.assign({}, this.Model), this.data);
      this.Model.firstNameValid = this.data.firstName.trim() !== '' && this.data.firstName !== null ? true : false;
      this.Model.lastNameValid = this.data.lastName.trim() !== '' && this.data.lastName !== null ? true : false;
      this.Model.emailValid = this.data.email.trim() !== '' && this.data.email !== null ? true : false;
      this.Model.countryValid = this.data.country !== null ? true : false;
      this.Model.passwordValid = this.data.password.trim() !== '' && this.data.password !== null ? true : false;
    }
    else {
      this.Model = new guestInfoValidation();
    }
  }
  watchHandler() {
    console.log('The new value of data is: ', this.data);
    this.submit = false;
    if (this.data !== null) {
      this.Model = Object.assign(Object.assign({}, this.Model), this.data);
      this.Model.firstNameValid = this.data.firstName.trim() !== '' && this.data.firstName !== null ? true : false;
      this.Model.lastNameValid = this.data.lastName.trim() !== '' && this.data.lastName !== null ? true : false;
      this.Model.emailValid = this.data.email.trim() !== '' && this.data.email !== null ? true : false;
      this.Model.countryValid = this.data.country !== null ? true : false;
      this.Model.passwordValid = this.data.password.trim() !== '' && this.data.password !== null ? true : false;
    }
    else {
      this.Model = new guestInfoValidation();
    }
  }
  handleInputChange(event) {
    this.submit = false;
    const target = event.target;
    const name = target.name;
    if (target.required !== undefined) {
      const nameValid = `${name}Valid`;
      if (name === 'country') {
        this.Model[name] = parseInt(event.detail);
      }
      this.Model[name] = event.detail;
      this.Model[nameValid] = event.detail !== -1 || (event.detail.trim() !== '' && event.detail !== null) ? true : false;
    }
    else {
      this.Model[name] = event.detail;
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.submit = true;
    if (this.Model.firstNameValid && this.Model.lastNameValid && this.Model.emailValid && this.Model.countryValid && this.Model.passwordValid) {
      let data = Object.assign({}, this.Model);
      this.submitForm.emit(data);
    }
  }
  render() {
    let countries = null;
    let countryPrefix = null;
    if (this.setupDataCountries !== null && this.setupDataCountriesCode !== null) {
      countries = (h("ir-select", { required: true, name: "country", submited: this.submit, label: 'Country', selectedValue: this.Model.country.toString(), data: this.setupDataCountries.map(item => {
          return {
            value: item.value.toString(),
            text: item.text,
          };
        }), firstOption: '...' }));
      countryPrefix = (h("ir-select", { name: "prefix", label: 'Mobile', submited: this.submit, selectedValue: this.Model.prefix, data: this.setupDataCountriesCode.map(item => {
          return {
            value: item.value.toString(),
            text: item.text,
          };
        }), firstOption: '...', selectStyle: false, required: true }));
    }
    return [
      h("h3", null, h("strong", null, "Guest Details")),
      h("div", { class: "card" }, h("div", { class: "card-header" }, h("h4", { class: "card-title" }, "Registration date : ", h("strong", null, moment().format('DD-MMM-YYYY')))), h("div", { class: "card-content collapse show" }, h("div", { class: "card-body pt-0" }, h("ir-input-text", { placeholder: "", label: "First Name", name: "firstName", submited: this.submit, value: this.Model.firstName, required: true }), h("ir-input-text", { placeholder: "", label: "Last Name", name: "lastName", submited: this.submit, value: this.Model.lastName, required: true }), h("ir-input-text", { placeholder: "", label: "Email", name: "email", submited: this.submit, value: this.Model.email, required: true }), h("ir-input-text", { placeholder: "", label: "Alternative email", name: "altEmail", value: this.Model.altEmail }), h("ir-input-text", { label: "Password", placeholder: "", name: "password", submited: this.submit, type: "password", value: this.Model.password, required: true }), countries, h("ir-input-text", { placeholder: "", label: "City", name: "city", value: this.Model.city }), h("ir-input-text", { placeholder: "", label: "Address", name: "address", value: this.Model.address }), countryPrefix, h("ir-input-text", { "put-text": true, LabelAvailable: false, name: "mobile", placeholder: "", submited: this.submit, value: this.Model.mobile, required: true }), h("ir-checkbox", { label: "NewsLetter", name: "newsletter", checked: this.Model.newsletter }), h("p", null, h("strong", null, "Last used:"), " Language:", h("strong", null, this.Model.language), " --- Currency: ", h("strong", null, this.Model.currency)), h("hr", null), h("ir-button", { text: "Save", color: "btn-primary" })))),
    ];
  }
  static get is() { return "ir-guest-info"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-guest-info.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-guest-info.css"]
    };
  }
  static get properties() {
    return {
      "setupDataCountries": {
        "type": "unknown",
        "mutable": true,
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
        "mutable": true,
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
      "data": {
        "type": "unknown",
        "mutable": true,
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
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "null"
      }
    };
  }
  static get states() {
    return {
      "Model": {},
      "gotdata": {},
      "submit": {}
    };
  }
  static get events() {
    return [{
        "method": "submitForm",
        "name": "submitForm",
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
        "method": "getSetupData",
        "name": "getSetupData",
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
        "propName": "data",
        "methodName": "watchHandler"
      }];
  }
  static get listeners() {
    return [{
        "name": "textChange",
        "method": "handleInputChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "checkboxChange",
        "method": "handleInputChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "selectChange",
        "method": "handleInputChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "clickHanlder",
        "method": "handleSubmit",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-guest-info.js.map
