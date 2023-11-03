import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { h as hooks } from './moment.js';
import { d as defineCustomElement$4 } from './ir-button2.js';
import { d as defineCustomElement$3 } from './ir-checlbox.js';
import { d as defineCustomElement$2 } from './ir-input-text2.js';
import { d as defineCustomElement$1 } from './ir-select2.js';

class guestInfo {
  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.altEmail = '';
    this.password = '';
    this.country = -1;
    this.city = '';
    this.address = '';
    this.mobile = '';
    this.prefix = '';
    this.newsletter = false;
    this.currency = '';
    this.language = '';
  }
}
class guestInfoValidation extends guestInfo {
  constructor() {
    super(...arguments);
    this.firstNameValid = false;
    this.lastNameValid = false;
    this.emailValid = false;
    this.countryValid = false;
    this.passwordValid = false;
    this.mobileValid = false;
    this.prefixValid = false;
    this.setupData = false;
  }
}

const irGuestInfoCss = ".input-group-text{min-width:10rem;text-align:left}";

const GuestInfo = /*@__PURE__*/ proxyCustomElement(class GuestInfo extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.submitForm = createEvent(this, "submitForm", 7);
    this.getSetupData = createEvent(this, "getSetupData", 7);
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
      h("div", { class: "card" }, h("div", { class: "card-header" }, h("h4", { class: "card-title" }, "Registration date : ", h("strong", null, hooks().format('DD-MMM-YYYY')))), h("div", { class: "card-content collapse show" }, h("div", { class: "card-body pt-0" }, h("ir-input-text", { placeholder: "", label: "First Name", name: "firstName", submited: this.submit, value: this.Model.firstName, required: true }), h("ir-input-text", { placeholder: "", label: "Last Name", name: "lastName", submited: this.submit, value: this.Model.lastName, required: true }), h("ir-input-text", { placeholder: "", label: "Email", name: "email", submited: this.submit, value: this.Model.email, required: true }), h("ir-input-text", { placeholder: "", label: "Alternative email", name: "altEmail", value: this.Model.altEmail }), h("ir-input-text", { label: "Password", placeholder: "", name: "password", submited: this.submit, type: "password", value: this.Model.password, required: true }), countries, h("ir-input-text", { placeholder: "", label: "City", name: "city", value: this.Model.city }), h("ir-input-text", { placeholder: "", label: "Address", name: "address", value: this.Model.address }), countryPrefix, h("ir-input-text", { "put-text": true, LabelAvailable: false, name: "mobile", placeholder: "", submited: this.submit, value: this.Model.mobile, required: true }), h("ir-checkbox", { label: "NewsLetter", name: "newsletter", checked: this.Model.newsletter }), h("p", null, h("strong", null, "Last used:"), " Language:", h("strong", null, this.Model.language), " --- Currency: ", h("strong", null, this.Model.currency)), h("hr", null), h("ir-button", { text: "Save", color: "btn-primary" })))),
    ];
  }
  static get watchers() { return {
    "data": ["watchHandler"]
  }; }
  static get style() { return irGuestInfoCss; }
}, [0, "ir-guest-info", {
    "setupDataCountries": [1040],
    "setupDataCountriesCode": [1040],
    "data": [1040],
    "Model": [32],
    "gotdata": [32],
    "submit": [32]
  }, [[0, "textChange", "handleInputChange"], [0, "checkboxChange", "handleInputChange"], [0, "selectChange", "handleInputChange"], [0, "clickHanlder", "handleSubmit"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-guest-info", "ir-button", "ir-checkbox", "ir-input-text", "ir-select"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-guest-info":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, GuestInfo);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-input-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { GuestInfo as G, defineCustomElement as d };

//# sourceMappingURL=ir-guest-info2.js.map