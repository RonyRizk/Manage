import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { H as HouseKeepingService, g as getDefaultProperties } from './housekeeping.service.js';
import { c as calendar_data } from './calendar-data.js';
import { l as locales } from './locales.store.js';
import { d as defineCustomElement$6 } from './ir-button2.js';
import { d as defineCustomElement$5 } from './ir-combobox2.js';
import { d as defineCustomElement$4 } from './ir-icon2.js';
import { d as defineCustomElement$3 } from './ir-input-text2.js';
import { d as defineCustomElement$2 } from './ir-phone-input2.js';
import { d as defineCustomElement$1 } from './ir-title2.js';

function validateForm(data, rules) {
  let isValid = true;
  const errors = {};
  for (const fieldName in rules) {
    const rulesForField = rules[fieldName];
    const value = data[fieldName];
    if (!rulesForField)
      continue;
    errors[fieldName] = [];
    // Required
    if (rulesForField.required && (value === null || value === undefined || value === '')) {
      isValid = false;
      errors[fieldName].push('This field is required.');
    }
    // String Length
    if (typeof value === 'string') {
      if (rulesForField.minLength !== undefined && value.length < rulesForField.minLength) {
        isValid = false;
        errors[fieldName].push(`Minimum length is ${rulesForField.minLength}.`);
      }
      if (rulesForField.maxLength !== undefined && value.length > rulesForField.maxLength) {
        isValid = false;
        errors[fieldName].push(`Maximum length is ${rulesForField.maxLength}.`);
      }
    }
    // Numeric Range
    if (typeof value === 'number') {
      if (rulesForField.minValue !== undefined && value < rulesForField.minValue) {
        isValid = false;
        errors[fieldName].push(`Minimum value is ${rulesForField.minValue}.`);
      }
      if (rulesForField.maxValue !== undefined && value > rulesForField.maxValue) {
        isValid = false;
        errors[fieldName].push(`Maximum value is ${rulesForField.maxValue}.`);
      }
    }
    // Regular Expression
    if (rulesForField.pattern && !rulesForField.pattern.test(String(value))) {
      isValid = false;
      errors[fieldName].push('Invalid format.');
    }
    // Custom Validation
    if (rulesForField.custom && !rulesForField.custom(value)) {
      isValid = false;
      errors[fieldName].push('Custom validation failed.');
    }
  }
  return { isValid, errors };
}

const irHkUserCss = ".sc-ir-hk-user-h{display:block}";

const IrHkUser = /*@__PURE__*/ proxyCustomElement(class IrHkUser extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.resetData = createEvent(this, "resetData", 7);
    this.closeSideBar = createEvent(this, "closeSideBar", 7);
    this.housekeepingService = new HouseKeepingService();
    this.default_properties = {
      token: '',
      language: '',
    };
    this.user = null;
    this.isEdit = false;
    this.isLoading = false;
    this.userInfo = {
      id: -1,
      mobile: '',
      name: '',
      note: '',
      password: '',
      property_id: null,
      username: null,
      phone_prefix: null,
    };
    this.errors = null;
  }
  async componentWillLoad() {
    const { token, language, property_id } = getDefaultProperties();
    this.default_properties = { token, language };
    this.housekeepingService.setToken(token);
    if (!this.user) {
      this.userInfo['property_id'] = property_id;
    }
    if (this.user) {
      this.userInfo = Object.assign({}, this.user);
    }
    console.log(this.userInfo);
  }
  updateUserField(key, value) {
    this.userInfo = Object.assign(Object.assign({}, this.userInfo), { [key]: value });
  }
  async addUser() {
    try {
      this.isLoading = true;
      const validationRules = {
        name: { required: true },
        mobile: { required: true },
        password: { required: true, minLength: 5 },
      };
      const validationResult = validateForm(this.userInfo, validationRules);
      if (!validationResult.isValid) {
        this.errors = validationResult.errors;
        return;
      }
      if (this.errors) {
        this.errors = null;
      }
      await this.housekeepingService.editExposedHKM(this.userInfo);
      this.resetData.emit(null);
      this.closeSideBar.emit(null);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  async handleBlur(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (this.user || !this.userInfo.name) {
      return;
    }
    const usermame = await this.housekeepingService.generateUserName(this.userInfo.name);
    this.updateUserField('username', usermame);
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g;
    return (h(Host, null, h("ir-title", { class: "px-1", displayContext: "sidebar", label: this.isEdit ? locales.entries.Lcz_EditHousekeeperProfile : locales.entries.Lcz_CreateHousekeeperProfile }), h("section", { class: "px-1" }, h("ir-input-text", { error: ((_b = (_a = this.errors) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.length) > 0, label: locales.entries.Lcz_Name, placeholder: locales.entries.Lcz_Name, onTextChange: e => this.updateUserField('name', e.detail), value: this.userInfo.name, onInputBlur: this.handleBlur.bind(this) }), h("ir-phone-input", { placeholder: locales.entries.Lcz_Mobile, error: ((_d = (_c = this.errors) === null || _c === void 0 ? void 0 : _c.mobile) === null || _d === void 0 ? void 0 : _d.length) > 0, language: this.default_properties.language, token: this.default_properties.token, default_country: calendar_data.country.id, phone_prefix: (_e = this.user) === null || _e === void 0 ? void 0 : _e.phone_prefix, label: locales.entries.Lcz_Mobile, value: this.userInfo.mobile, onTextChange: e => {
        this.updateUserField('phone_prefix', e.detail.phone_prefix);
        this.updateUserField('mobile', e.detail.mobile);
      } }), h("ir-input-text", { disabled: this.user !== null, label: locales.entries.Lcz_Username, placeholder: locales.entries.Lcz_Username, value: this.userInfo.username, onTextChange: e => this.updateUserField('username', e.detail) }), h("ir-input-text", { label: locales.entries.Lcz_Password, placeholder: locales.entries.Lcz_MinimumCharacter, value: this.userInfo.password, type: "password", error: ((_g = (_f = this.errors) === null || _f === void 0 ? void 0 : _f.password) === null || _g === void 0 ? void 0 : _g.length) > 0, onTextChange: e => this.updateUserField('password', e.detail) }), h("ir-input-text", { label: locales.entries.Lcz_Note, placeholder: locales.entries.Lcz_Note, value: this.userInfo.note, onTextChange: e => this.updateUserField('note', e.detail) }), h("div", { class: "d-flex flex-column flex-md-row align-items-md-center mt-2 w-100" }, h("ir-button", { onClickHanlder: () => this.closeSideBar.emit(null), class: "flex-fill", btn_styles: "w-100  justify-content-center align-items-center", btn_color: "secondary", text: locales.entries.Lcz_Cancel }), h("ir-button", { isLoading: this.isLoading, onClickHanlder: this.addUser.bind(this), class: "flex-fill ml-md-1", btn_styles: "w-100  justify-content-center align-items-center mt-1 mt-md-0", text: locales.entries.Lcz_Save })))));
  }
  static get style() { return irHkUserCss; }
}, [2, "ir-hk-user", {
    "user": [16],
    "isEdit": [4, "is-edit"],
    "isLoading": [32],
    "userInfo": [32],
    "errors": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-hk-user", "ir-button", "ir-combobox", "ir-icon", "ir-input-text", "ir-phone-input", "ir-title"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-hk-user":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrHkUser);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-combobox":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-input-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-phone-input":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-title":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrHkUser as I, defineCustomElement as d };

//# sourceMappingURL=ir-hk-user2.js.map