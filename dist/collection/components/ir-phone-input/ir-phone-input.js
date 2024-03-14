import { BookingService } from "../../../../src/services/booking.service";
import { Host, h } from "@stencil/core";
export class IrPhoneInput {
  constructor() {
    this.countries = [];
    this.bookingService = new BookingService();
    this.label = undefined;
    this.value = '';
    this.disabled = false;
    this.error = false;
    this.token = undefined;
    this.language = undefined;
    this.default_country = null;
    this.phone_prefix = null;
    this.placeholder = undefined;
    this.inputValue = '';
    this.isDropdownVisible = false;
    this.currentCountry = undefined;
  }
  async componentWillLoad() {
    if (!this.token) {
      throw new Error('Missing token');
    }
    this.bookingService.setToken(this.token);
    const countries = await this.bookingService.getCountries(this.language);
    this.countries = countries;
    if (this.phone_prefix) {
      this.setCountryFromPhonePrefix();
    }
    else {
      if (this.default_country) {
        this.setCurrentCountry(this.default_country);
      }
    }
    this.inputValue = this.value;
  }
  handleDocumentClick(event) {
    const target = event.target;
    if (!this.el.contains(target)) {
      this.isDropdownVisible = false;
    }
  }
  handleInputChange(e) {
    var _a;
    let inputElement = e.target;
    let inputValue = inputElement.value;
    inputValue = inputValue.replace(/[^+\d]+/g, '');
    inputElement.value = inputValue;
    this.inputValue = inputValue;
    this.textChange.emit({ phone_prefix: (_a = this.currentCountry) === null || _a === void 0 ? void 0 : _a.phone_prefix, mobile: this.inputValue });
  }
  setCountryFromPhonePrefix() {
    var _a;
    const country = this.countries.find(country => country.phone_prefix === this.phone_prefix);
    if (!country) {
      throw new Error('Invalid country id');
    }
    this.currentCountry = Object.assign({}, country);
    this.textChange.emit({ phone_prefix: (_a = this.currentCountry) === null || _a === void 0 ? void 0 : _a.phone_prefix, mobile: this.value });
  }
  setCurrentCountry(id) {
    var _a;
    const country = this.countries.find(country => country.id === id);
    if (!country) {
      throw new Error('Invalid country id');
    }
    this.currentCountry = Object.assign({}, country);
    this.textChange.emit({ phone_prefix: (_a = this.currentCountry) === null || _a === void 0 ? void 0 : _a.phone_prefix, mobile: this.value });
  }
  render() {
    var _a, _b;
    return (h(Host, null, h("div", { class: "form-group mr-0" }, h("div", { class: "input-group row m-0 p-0 position-relative" }, this.label && (h("div", { class: `input-group-prepend col-3 p-0 text-dark border-none` }, h("label", { class: `input-group-text  border-theme flex-grow-1 text-dark  ` }, this.label))), h("div", { class: 'form-control  input-container  flex-fill' + (this.error ? ' is-invalid' : '') }, h("button", { onClick: () => (this.isDropdownVisible = !this.isDropdownVisible), class: "dropdown-trigger" }, h("img", { src: (_a = this.currentCountry) === null || _a === void 0 ? void 0 : _a.flag, class: "flag" }), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" }))), h("label", null, (_b = this.currentCountry) === null || _b === void 0 ? void 0 : _b.phone_prefix), h("input", { type: "text", placeholder: this.placeholder, required: true, value: this.inputValue, disabled: this.disabled, onInput: e => this.handleInputChange(e) })), ' ', this.isDropdownVisible && (h("div", { class: "ir-dropdown-container" }, h("ir-combobox", { onComboboxValueChange: e => {
        this.setCurrentCountry(+e.detail.data);
        this.isDropdownVisible = false;
      }, class: "bg-white", autoFocus: true, placeholder: "Search country", data: this.countries.map(c => ({
        id: c.id.toString(),
        name: `${c.name} (${c.phone_prefix})`,
      })) })))))));
  }
  static get is() { return "ir-phone-input"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-phone-input.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-phone-input.css"]
    };
  }
  static get properties() {
    return {
      "label": {
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
        "attribute": "label",
        "reflect": false
      },
      "value": {
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
        "attribute": "value",
        "reflect": false,
        "defaultValue": "''"
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
      "error": {
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
        "attribute": "error",
        "reflect": false,
        "defaultValue": "false"
      },
      "token": {
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
        "attribute": "token",
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
      "default_country": {
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
        "attribute": "default_country",
        "reflect": false,
        "defaultValue": "null"
      },
      "phone_prefix": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | null",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "phone_prefix",
        "reflect": false,
        "defaultValue": "null"
      },
      "placeholder": {
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
        "attribute": "placeholder",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "inputValue": {},
      "isDropdownVisible": {},
      "currentCountry": {}
    };
  }
  static get events() {
    return [{
        "method": "textChange",
        "name": "textChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ phone_prefix: string; mobile: string }",
          "resolved": "{ phone_prefix: string; mobile: string; }",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get listeners() {
    return [{
        "name": "click",
        "method": "handleDocumentClick",
        "target": "document",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-phone-input.js.map
