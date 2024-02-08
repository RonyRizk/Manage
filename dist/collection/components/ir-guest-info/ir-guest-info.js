import { h } from "@stencil/core";
import { BookingService } from "../../../../src/services/booking.service";
export class GuestInfo {
  constructor() {
    this.bookingService = new BookingService();
    this.setupDataCountries = null;
    this.setupDataCountriesCode = null;
    this.defaultTexts = undefined;
    this.language = undefined;
    this.email = undefined;
    this.booking_nbr = undefined;
    this.countries = undefined;
    this.submit = false;
    this.guest = null;
    this.isLoading = false;
  }
  async componentWillLoad() {
    await this.init();
  }
  async init() {
    try {
      const [guest, countries] = await Promise.all([this.bookingService.fetchGuest(this.email), this.bookingService.getCountries(this.language)]);
      this.countries = countries;
      this.guest = guest;
    }
    catch (error) {
      console.log(error);
    }
  }
  handleInputChange(key, value) {
    this.guest = Object.assign(Object.assign({}, this.guest), { [key]: value });
  }
  async editGuest() {
    try {
      this.isLoading = true;
      await this.bookingService.editExposedGuest(this.guest, this.booking_nbr);
      this.closeSideBar.emit(null);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      this.isLoading = false;
      console.log('done');
    }
  }
  render() {
    if (!this.guest) {
      return null;
    }
    return [
      h("h3", null, h("strong", null, this.defaultTexts.entries.Lcz_GuestDetails)),
      h("div", { class: "card" }, h("div", { class: "card-content collapse show" }, h("div", { class: "card-body pt-0" }, h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_FirstName, name: "firstName", submited: this.submit, value: this.guest.first_name, required: true, onTextChange: e => this.handleInputChange('first_name', e.detail) }), h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_LastName, name: "lastName", submited: this.submit, value: this.guest.last_name, required: true, onTextChange: e => this.handleInputChange('last_name', e.detail) }), h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_Email, name: "email", submited: this.submit, value: this.guest.email, required: true, onTextChange: e => this.handleInputChange('email', e.detail) }), h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_AlternativeEmail, name: "altEmail", value: this.guest.alternative_email, onTextChange: e => this.handleInputChange('alternative_email', e.detail) }), h("ir-select", { required: true, name: "country", submited: this.submit, label: this.defaultTexts.entries.Lcz_Country, selectedValue: this.guest.country_id.toString(), data: this.countries.map(item => {
          return {
            value: item.id.toString(),
            text: item.name,
          };
        }), firstOption: '...', onSelectChange: e => this.handleInputChange('country_id', e.detail) }), h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_City, name: "city", value: this.guest.city, onTextChange: e => this.handleInputChange('city', e.detail) }), h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_Address, name: "address", value: this.guest.address, onTextChange: e => this.handleInputChange('address', e.detail) }), h("div", { class: "form-group mr-0" }, h("div", { class: "input-group row m-0 p-0" }, h("div", { class: `input-group-prepend col-3 p-0 text-dark border-none` }, h("label", { class: `input-group-text  bg-light flex-grow-1 text-dark border-0 ` }, this.defaultTexts.entries.Lcz_MobilePhone, '*')), h("select", { class: ` form-control text-md  col-2 py-0 mobilePrefixSelect`, onInput: e => this.handleInputChange('country_id', e.target.value), required: true }, h("option", { value: null }, "..."), this.countries.map(item => (h("option", { selected: this.guest.country_id.toString() === item.id.toString(), value: item.id }, item.phone_prefix)))), h("input", { type: "text", required: true, value: this.guest.mobile, class: 'form-control flex-fill mobilePrefixInput', onInput: e => this.handleInputChange('mobile', e.target.value) }))), h("div", { class: 'p-0 m-0' }, h("label", { class: `check-container  m-0 p-0` }, h("input", { class: 'm-0 p-0', type: "checkbox", name: "newsletter", checked: this.guest.subscribe_to_news_letter, onInput: e => this.handleInputChange('subscribe_to_news_letter', e.target.checked) }), h("span", { class: "checkmark m-0 p-0" }), h("span", { class: 'm-0 p-0 ' }, this.defaultTexts.entries.Lcz_Newsletter))), h("hr", null), h("ir-button", { text: this.defaultTexts.entries.Lcz_Save, onClickHanlder: this.editGuest.bind(this), color: "btn-primary" })))),
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
              "path": "@/common/models",
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
              "path": "@/common/models",
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
      "defaultTexts": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ILocale",
          "resolved": "ILocale",
          "references": {
            "ILocale": {
              "location": "import",
              "path": "@/stores/locales.store",
              "id": "src/stores/locales.store.ts::ILocale"
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
      "email": {
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
        "attribute": "email",
        "reflect": false
      },
      "booking_nbr": {
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
        "attribute": "booking_nbr",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "countries": {},
      "submit": {},
      "guest": {},
      "isLoading": {}
    };
  }
  static get events() {
    return [{
        "method": "closeSideBar",
        "name": "closeSideBar",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=ir-guest-info.js.map
