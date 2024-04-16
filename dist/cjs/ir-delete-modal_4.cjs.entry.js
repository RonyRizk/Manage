'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const housekeeping_service = require('./housekeeping.service-8abdb383.js');
const locales_store = require('./locales.store-8fed15eb.js');
const calendarData = require('./calendar-data-96bc0c2a.js');
const irInterceptor_store = require('./ir-interceptor.store-6fd7cde1.js');
const booking_service = require('./booking.service-691cc7dd.js');
require('./Token-7fd57fe8.js');
require('./index-797ee4c0.js');
require('./moment-f96595e5.js');

const irDeleteModalCss = ".backdropModal.sc-ir-delete-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-delete-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-delete-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-delete-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-delete-modal{z-index:1001 !important}.modal-dialog.sc-ir-delete-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-delete-modal{gap:10px}.exit-icon.sc-ir-delete-modal{position:absolute;right:10px;top:5px;margin:0}.ir-modal.sc-ir-delete-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-delete-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";

var __rest = (undefined && undefined.__rest) || function (s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const IrDeleteModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.modalClosed = index.createEvent(this, "modalClosed", 7);
    this.resetData = index.createEvent(this, "resetData", 7);
    this.housekeepingService = new housekeeping_service.HouseKeepingService();
    this.user = undefined;
    this.isOpen = false;
    this.selectedId = '';
    this.loadingBtn = null;
  }
  componentWillLoad() {
    this.housekeepingService.setToken(housekeeping_service.housekeeping_store.default_properties.token);
  }
  async closeModal() {
    this.isOpen = false;
    this.modalClosed.emit(null);
  }
  async openModal() {
    this.isOpen = true;
  }
  async btnClickHandler(event) {
    let target = event.target;
    let name = target.name;
    try {
      if (name === 'confirm') {
        this.loadingBtn = 'confirm';
        if (this.selectedId === '') {
          await this.housekeepingService.editExposedHKM(this.user, true);
        }
        else {
          const newAssignedUnits = this.user.assigned_units.map(u => ({ hkm_id: +this.selectedId, is_to_assign: true, unit_id: u.id }));
          await this.housekeepingService.manageExposedAssignedUnitToHKM(housekeeping_service.housekeeping_store.default_properties.property_id, newAssignedUnits);
          const _a = this.user, user = __rest(_a, ["assigned_units", "is_soft_deleted", "is_active"]);
          await this.housekeepingService.editExposedHKM(user, true);
        }
        this.resetData.emit(null);
      }
      if (name === 'cancel') {
        this.closeModal();
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      if (this.loadingBtn) {
        this.loadingBtn = null;
        this.closeModal();
      }
    }
  }
  render() {
    if (!this.user) {
      return null;
    }
    return [
      index.h("div", { class: `backdropModal ${this.isOpen ? 'active' : ''}`, onClick: () => {
          this.closeModal();
        } }),
      index.h("div", { "data-state": this.isOpen ? 'opened' : 'closed', class: `ir-modal`, tabindex: "-1" }, this.isOpen && (index.h("div", { class: `ir-alert-content p-2` }, index.h("div", { class: `ir-alert-header align-items-center border-0 py-0 m-0 ` }, index.h("p", { class: "p-0 my-0 mb-1" }, this.user.assigned_units.length > 0 ? locales_store.locales.entries.Lcz_AssignUnitsTo : locales_store.locales.entries.Lcz_ConfirmDeletion), index.h("ir-icon", { class: "exit-icon", style: { cursor: 'pointer' }, onClick: () => {
          this.closeModal();
        } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "10.5", viewBox: "0 0 384 512" }, index.h("path", { fill: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), this.user.assigned_units.length > 0 && (index.h("div", { class: "modal-body text-left p-0 mb-2" }, index.h("ir-select", { firstOption: locales_store.locales.entries.Lcz_nobody, selectedValue: this.selectedId, onSelectChange: e => (this.selectedId = e.detail), LabelAvailable: false, data: housekeeping_service.housekeeping_store.hk_criteria.housekeepers
          .filter(hk => hk.id !== this.user.id)
          .map(m => ({
          value: m.id.toString(),
          text: m.name,
        })) }))), index.h("div", { class: `ir-alert-footer border-0 d-flex justify-content-end` }, index.h("ir-button", { icon: '', btn_color: 'secondary', btn_block: true, text: locales_store.locales.entries.Lcz_Cancel, name: 'cancel' }), index.h("ir-button", { isLoading: this.loadingBtn === 'confirm', icon: '', btn_color: 'primary', btn_block: true, text: locales_store.locales.entries.Lcz_Confirm, name: 'confirm' }))))),
    ];
  }
};
IrDeleteModal.style = irDeleteModalCss;

const irHkUnassignedUnitsCss = ".sc-ir-hk-unassigned-units-h{display:block;--ir-root-active-color:#1e9ff2;--ir-root-inactive-color:#d2d2d2}table.sc-ir-hk-unassigned-units{width:100%}td.sc-ir-hk-unassigned-units{padding-top:3px;padding-bottom:3px}td.sc-ir-hk-unassigned-units:last-child{text-align:end}.title.sc-ir-hk-unassigned-units{min-width:230px !important}";

const IrHkUnassignedUnits = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.closeSideBar = index.createEvent(this, "closeSideBar", 7);
    this.resetData = index.createEvent(this, "resetData", 7);
    this.assignedUnits = new Map();
    this.housekeepingService = new housekeeping_service.HouseKeepingService();
    this.user = null;
    this.renderAgain = false;
  }
  componentWillLoad() {
    this.housekeepingService.setToken(housekeeping_service.housekeeping_store.default_properties.token);
  }
  assignUnit(unit_id, hk_id, checked) {
    if (this.user) {
      const userUnit = this.user.assigned_units.find(unit => unit.id === unit_id);
      if ((checked && userUnit) || (!checked && !userUnit)) {
        this.assignedUnits.delete(unit_id);
      }
      else if (!checked && userUnit) {
        this.assignedUnits.set(unit_id, { hkm_id: hk_id, is_to_assign: false, unit_id });
      }
      else if (checked) {
        const assignment = {
          hkm_id: hk_id,
          is_to_assign: true,
          unit_id,
        };
        this.assignedUnits.set(unit_id, assignment);
      }
    }
    else {
      if (this.assignedUnits.has(unit_id) && !hk_id) {
        this.assignedUnits.delete(unit_id);
        return;
      }
      else {
        this.assignedUnits.set(unit_id, {
          hkm_id: hk_id,
          is_to_assign: true,
          unit_id,
        });
      }
    }
    this.renderAgain = !this.renderAgain;
  }
  async assignUnits() {
    try {
      await this.housekeepingService.manageExposedAssignedUnitToHKM(housekeeping_service.housekeeping_store.default_properties.property_id, [...this.assignedUnits.values()]);
      this.resetData.emit(null);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.closeSideBar.emit(null);
    }
  }
  renderRooms() {
    var _a;
    if (!this.user) {
      return (_a = housekeeping_service.housekeeping_store.hk_criteria.units_assignments.unassigned_units) === null || _a === void 0 ? void 0 : _a.map(unit => (index.h("tr", { key: unit.id }, index.h("td", { class: "mr-2" }, unit.name), index.h("td", { class: "sr-only" }), index.h("td", null, index.h("ir-select", { onSelectChange: e => {
          let hk_id = e.detail;
          if (hk_id === '') {
            hk_id = null;
          }
          else {
            hk_id = +hk_id;
          }
          this.assignUnit(unit.id, hk_id, false);
        }, LabelAvailable: false, data: housekeeping_service.housekeeping_store.hk_criteria.housekeepers.map(hk => ({ text: hk.name, value: hk.id.toString() })) })))));
    }
    return calendarData.calendar_data.roomsInfo.map(roomType => {
      var _a;
      if (!roomType.is_active) {
        return null;
      }
      return (_a = roomType.physicalrooms) === null || _a === void 0 ? void 0 : _a.map(physical_room => {
        var _a, _b, _c;
        let taken = !((_a = housekeeping_service.housekeeping_store.hk_criteria.units_assignments.unassigned_units) === null || _a === void 0 ? void 0 : _a.find(unit => unit.id === physical_room.id));
        let housekeeper = [];
        const assignedRoom = this.assignedUnits.get(physical_room.id);
        if (assignedRoom && assignedRoom.is_to_assign) {
          housekeeper = [this.user];
          taken = true;
        }
        else {
          if (taken) {
            housekeeper = housekeeping_service.housekeeping_store.hk_criteria.housekeepers.filter(hk => hk.assigned_units.find(unit => unit.id === physical_room.id));
          }
        }
        return (index.h("tr", { key: physical_room.id }, index.h("td", null, physical_room.name), index.h("td", null, taken ? (_b = housekeeper[0]) === null || _b === void 0 ? void 0 : _b.name : ''), index.h("td", null, index.h("ir-switch", { onCheckChange: e => {
            const checked = e.detail;
            this.assignUnit(physical_room.id, this.user.id, checked);
          }, checked: taken && ((_c = housekeeper[0]) === null || _c === void 0 ? void 0 : _c.id) === this.user.id }))));
      });
    });
  }
  render() {
    return (index.h(index.Host, null, index.h("ir-title", { class: "title px-1", displayContext: "sidebar", label: !this.user ? 'Assingn Units' : `Assignment for ${this.user.name}` }), index.h("section", { class: "px-1" }, index.h("table", null, index.h("thead", null, index.h("th", { class: "sr-only" }, "room name"), index.h("th", { class: "sr-only" }, "housekeeper name"), index.h("th", { class: "sr-only" }, "actions")), index.h("tbody", null, this.renderRooms())), index.h("div", { class: "d-flex flex-column flex-md-row align-items-md-center mt-2 w-100" }, index.h("ir-button", { onClickHanlder: () => this.closeSideBar.emit(null), class: "flex-fill", btn_styles: "w-100  justify-content-center align-items-center", btn_color: "secondary", text: 'Cancel' }), index.h("ir-button", { isLoading: irInterceptor_store.isRequestPending('/Manage_Exposed_Assigned_Unit_To_HKM'), onClickHanlder: this.assignUnits.bind(this), class: "flex-fill ml-md-1", btn_styles: "w-100  justify-content-center align-items-center mt-1 mt-md-0", text: 'Confirm' })))));
  }
};
IrHkUnassignedUnits.style = irHkUnassignedUnitsCss;

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

const IrHkUser = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.resetData = index.createEvent(this, "resetData", 7);
    this.closeSideBar = index.createEvent(this, "closeSideBar", 7);
    this.housekeepingService = new housekeeping_service.HouseKeepingService();
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
    const { token, language, property_id } = housekeeping_service.getDefaultProperties();
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
    return (index.h(index.Host, null, index.h("ir-title", { class: "px-1", displayContext: "sidebar", label: this.isEdit ? locales_store.locales.entries.Lcz_EditHousekeeperProfile : locales_store.locales.entries.Lcz_CreateHousekeeperProfile }), index.h("section", { class: "px-1" }, index.h("ir-input-text", { error: ((_b = (_a = this.errors) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.length) > 0, label: locales_store.locales.entries.Lcz_Name, placeholder: locales_store.locales.entries.Lcz_Name, onTextChange: e => this.updateUserField('name', e.detail), value: this.userInfo.name, onInputBlur: this.handleBlur.bind(this) }), index.h("ir-phone-input", { placeholder: locales_store.locales.entries.Lcz_Mobile, error: ((_d = (_c = this.errors) === null || _c === void 0 ? void 0 : _c.mobile) === null || _d === void 0 ? void 0 : _d.length) > 0, language: this.default_properties.language, token: this.default_properties.token, default_country: calendarData.calendar_data.country.id, phone_prefix: (_e = this.user) === null || _e === void 0 ? void 0 : _e.phone_prefix, label: locales_store.locales.entries.Lcz_Mobile, value: this.userInfo.mobile, onTextChange: e => {
        this.updateUserField('phone_prefix', e.detail.phone_prefix);
        this.updateUserField('mobile', e.detail.mobile);
      } }), index.h("ir-input-text", { disabled: this.user !== null, label: locales_store.locales.entries.Lcz_Username, placeholder: locales_store.locales.entries.Lcz_Username, value: this.userInfo.username, onTextChange: e => this.updateUserField('username', e.detail) }), index.h("ir-input-text", { label: locales_store.locales.entries.Lcz_Password, placeholder: locales_store.locales.entries.Lcz_MinimumCharacter, value: this.userInfo.password, type: "password", error: ((_g = (_f = this.errors) === null || _f === void 0 ? void 0 : _f.password) === null || _g === void 0 ? void 0 : _g.length) > 0, onTextChange: e => this.updateUserField('password', e.detail) }), index.h("ir-input-text", { label: locales_store.locales.entries.Lcz_Note, placeholder: locales_store.locales.entries.Lcz_Note, value: this.userInfo.note, onTextChange: e => this.updateUserField('note', e.detail) }), index.h("div", { class: "d-flex flex-column flex-md-row align-items-md-center mt-2 w-100" }, index.h("ir-button", { onClickHanlder: () => this.closeSideBar.emit(null), class: "flex-fill", btn_styles: "w-100  justify-content-center align-items-center", btn_color: "secondary", text: locales_store.locales.entries.Lcz_Cancel }), index.h("ir-button", { isLoading: this.isLoading, onClickHanlder: this.addUser.bind(this), class: "flex-fill ml-md-1", btn_styles: "w-100  justify-content-center align-items-center mt-1 mt-md-0", text: locales_store.locales.entries.Lcz_Save })))));
  }
};
IrHkUser.style = irHkUserCss;

const irPhoneInputCss = ".sc-ir-phone-input-h{display:block}.input-container.sc-ir-phone-input{display:flex;align-items:center;padding:0 !important}.input-container.sc-ir-phone-input:focus-within{border-color:#1e9ff2}.border-theme.sc-ir-phone-input{border-color:#cacfe7}.input-container.sc-ir-phone-input input.sc-ir-phone-input{flex:1;border:0}.input-container.sc-ir-phone-input input.sc-ir-phone-input:focus{outline:none}.dropdown-trigger.sc-ir-phone-input{display:flex;align-items:center;gap:8px;background:white;border:0;border-right:1px solid #cacfe7}.ir-dropdown-container.sc-ir-phone-input{position:absolute;z-index:1000;bottom:-30px;width:100%;left:0;background:white}.input-container.sc-ir-phone-input label.sc-ir-phone-input{display:flex;align-items:center;justify-content:center;margin:0;padding:0 5px}.flag.sc-ir-phone-input{height:18px;width:24px;border-radius:3px}.is-invalid.sc-ir-phone-input{border-color:#ff4961}";

const IrPhoneInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.textChange = index.createEvent(this, "textChange", 7);
    this.countries = [];
    this.bookingService = new booking_service.BookingService();
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
    return (index.h(index.Host, null, index.h("div", { class: "form-group mr-0" }, index.h("div", { class: "input-group row m-0 p-0 position-relative" }, this.label && (index.h("div", { class: `input-group-prepend col-3 p-0 text-dark border-none` }, index.h("label", { class: `input-group-text  border-theme flex-grow-1 text-dark  ` }, this.label))), index.h("div", { class: 'form-control  input-container  flex-fill' + (this.error ? ' is-invalid' : '') }, index.h("button", { onClick: () => (this.isDropdownVisible = !this.isDropdownVisible), class: "dropdown-trigger" }, index.h("img", { src: (_a = this.currentCountry) === null || _a === void 0 ? void 0 : _a.flag, class: "flag" }), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" }))), index.h("label", null, (_b = this.currentCountry) === null || _b === void 0 ? void 0 : _b.phone_prefix), index.h("input", { type: "text", placeholder: this.placeholder, required: true, value: this.inputValue, disabled: this.disabled, onInput: e => this.handleInputChange(e) })), ' ', this.isDropdownVisible && (index.h("div", { class: "ir-dropdown-container" }, index.h("ir-combobox", { onComboboxValueChange: e => {
        this.setCurrentCountry(+e.detail.data);
        this.isDropdownVisible = false;
      }, class: "bg-white", autoFocus: true, placeholder: "Search country", data: this.countries.map(c => ({
        id: c.id.toString(),
        name: `${c.name} (${c.phone_prefix})`,
      })) })))))));
  }
  get el() { return index.getElement(this); }
};
IrPhoneInput.style = irPhoneInputCss;

exports.ir_delete_modal = IrDeleteModal;
exports.ir_hk_unassigned_units = IrHkUnassignedUnits;
exports.ir_hk_user = IrHkUser;
exports.ir_phone_input = IrPhoneInput;

//# sourceMappingURL=ir-delete-modal_4.cjs.entry.js.map