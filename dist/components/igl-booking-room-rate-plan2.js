import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { g as getCurrencySymbol } from './utils.js';
import { l as locales } from './locales.store.js';
import { d as defineCustomElement$1 } from './ir-tooltip2.js';
import { v as v4 } from './v4.js';

const iglBookingRoomRatePlanCss = ".sc-igl-booking-room-rate-plan-h{display:block;margin-bottom:0.5rem}.currency.sc-igl-booking-room-rate-plan{display:block;position:absolute;margin:0;padding:0;height:auto;left:10px}.rate-input.sc-igl-booking-room-rate-plan{font-size:14px;line-height:0;padding:0;height:0}.rate-input-container.sc-igl-booking-room-rate-plan{display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;flex:1}@media only screen and (min-width: 1200px){.rateplan-name-container.sc-igl-booking-room-rate-plan{width:40%}.rateplan-container.sc-igl-booking-room-rate-plan{width:40%}}@media only screen and (min-width: 991px){.max-w-300.sc-igl-booking-room-rate-plan{max-width:200px}.rate-input-container.sc-igl-booking-room-rate-plan{max-width:100px}}@media only screen and (min-width: 991px) and (max-width: 1300px){.rateplan-name-container.sc-igl-booking-room-rate-plan{width:35%}}@media only screen and (max-width: 768px){.booking-btn.sc-igl-booking-room-rate-plan{width:100%}}.total-nights-container.sc-igl-booking-room-rate-plan{width:max-content}.rateInputBorder.sc-igl-booking-room-rate-plan{border-top-left-radius:3px !important;border-bottom-left-radius:3px !important}.nightBorder.sc-igl-booking-room-rate-plan{border-left-width:0;border-top-right-radius:3px !important;border-bottom-right-radius:3px !important}";

const IglBookingRoomRatePlan = /*@__PURE__*/ proxyCustomElement(class IglBookingRoomRatePlan extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dataUpdateEvent = createEvent(this, "dataUpdateEvent", 7);
    this.gotoSplitPageTwoEvent = createEvent(this, "gotoSplitPageTwoEvent", 7);
    this.initialRateValue = 0;
    this.defaultData = undefined;
    this.ratePlanData = undefined;
    this.totalAvailableRooms = undefined;
    this.index = undefined;
    this.ratePricingMode = [];
    this.currency = undefined;
    this.physicalrooms = undefined;
    this.shouldBeDisabled = undefined;
    this.dateDifference = undefined;
    this.bookingType = 'PLUS_BOOKING';
    this.fullyBlocked = undefined;
    this.isBookDisabled = false;
    this.defaultRoomId = undefined;
    this.selectedRoom = undefined;
    this.selectedData = undefined;
    this.ratePlanChangedState = false;
  }
  getAvailableRooms(assignable_units) {
    let result = [];
    assignable_units.forEach(unit => {
      if (unit.Is_Fully_Available) {
        result.push({ name: unit.name, id: unit.pr_id });
      }
    });
    return result;
  }
  componentWillLoad() {
    console.log('default data', this.defaultData);
    this.updateSelectedRatePlan(this.ratePlanData);
  }
  disableForm() {
    if (this.bookingType === 'EDIT_BOOKING' && this.shouldBeDisabled) {
      return false;
    }
    else {
      return this.selectedData.is_closed || this.totalAvailableRooms === 0 || this.selectedData.physicalRooms.length === 0;
    }
  }
  setAvailableRooms(data) {
    let availableRooms = this.getAvailableRooms(data);
    if (this.bookingType === 'EDIT_BOOKING' && this.shouldBeDisabled) {
      if (this.selectedRoom) {
        availableRooms.push({
          id: this.selectedRoom.roomId,
          name: this.selectedRoom.roomName,
        });
        availableRooms.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
    }
    return availableRooms;
  }
  getSelectedOffering(value) {
    return this.ratePlanData.variations.find(variation => variation.adult_child_offering === value);
  }
  updateSelectedRatePlan(data) {
    var _a;
    this.selectedData = {
      ratePlanId: data.id,
      adult_child_offering: data.variations[data.variations.length - 1].adult_child_offering,
      rateType: 1,
      totalRooms: 0,
      rate: (_a = data.variations[data.variations.length - 1].amount) !== null && _a !== void 0 ? _a : 0,
      ratePlanName: data.name,
      adultCount: data.variations[data.variations.length - 1].adult_nbr,
      childrenCount: data.variations[data.variations.length - 1].child_nbr,
      cancelation: data.cancelation,
      guarantee: data.guarantee,
      isRateModified: false,
      defaultSelectedRate: 0,
      index: this.index,
      is_closed: data.is_closed,
      physicalRooms: this.setAvailableRooms(this.ratePlanData.assignable_units),
      dateDifference: this.dateDifference,
    };
    if (this.defaultData) {
      for (const [key, value] of Object.entries(this.defaultData)) {
        this.selectedData[key] = value;
      }
    }
    if (this.defaultData && this.defaultData.isRateModified) {
      console.log('object');
      if (this.selectedData.rateType === 1) {
        console.log('object1');
        this.initialRateValue = this.selectedData.rate;
      }
      else {
        console.log('object2');
        this.initialRateValue = this.selectedData.rate * this.dateDifference;
      }
    }
    else {
      this.initialRateValue = this.selectedData.rate / this.dateDifference;
    }
    console.log('initialRateValue', this.initialRateValue);
  }
  async ratePlanDataChanged(newData) {
    this.selectedData = Object.assign(Object.assign({}, this.selectedData), { adult_child_offering: newData.variations[newData.variations.length - 1].adult_child_offering, adultCount: newData.variations[newData.variations.length - 1].adult_nbr, childrenCount: newData.variations[newData.variations.length - 1].child_nbr, rate: this.handleRateDaysUpdate(), physicalRooms: this.setAvailableRooms(newData.assignable_units) });
    this.initialRateValue = this.selectedData.rateType === 2 ? this.selectedData.rate / this.dateDifference : this.selectedData.rate;
    this.dataUpdateEvent.emit({
      key: 'roomRatePlanUpdate',
      changedKey: 'rate',
      data: this.selectedData,
    });
  }
  handleRateDaysUpdate() {
    if (this.selectedData.isRateModified) {
      return this.selectedData.defaultSelectedRate;
    }
    const selectedOffering = this.getSelectedOffering(this.selectedData.adult_child_offering);
    return selectedOffering ? selectedOffering.amount : 0;
  }
  handleInput(event) {
    const inputElement = event.target;
    let inputValue = inputElement.value.replace(/[^0-9.]/g, '');
    const validDecimalNumber = /^\d*\.?\d*$/;
    if (!validDecimalNumber.test(inputValue)) {
      inputValue = inputValue.substring(0, inputValue.length - 1);
    }
    inputElement.value = inputValue;
    if (inputValue) {
      this.selectedData.isRateModified = true;
      this.handleDataChange('rate', event);
    }
    else {
      this.selectedData = Object.assign(Object.assign({}, this.selectedData), { rate: -1, totalRooms: 0 });
      this.dataUpdateEvent.emit({
        key: 'roomRatePlanUpdate',
        changedKey: 'rate',
        data: this.selectedData,
      });
    }
  }
  handleDataChange(key, evt) {
    const value = evt.target.value;
    switch (key) {
      case 'adult_child_offering':
        this.updateOffering(value);
        break;
      case 'rate':
        this.updateRate(value);
        break;
      default:
        this.updateGenericData(key, value);
        break;
    }
    this.dataUpdateEvent.emit({
      key: 'roomRatePlanUpdate',
      changedKey: key,
      data: this.selectedData,
    });
  }
  updateOffering(value) {
    const offering = this.getSelectedOffering(value);
    if (offering) {
      this.selectedData = Object.assign(Object.assign({}, this.selectedData), { adult_child_offering: value, adultCount: offering.adult_nbr, childrenCount: offering.child_nbr, rate: offering.amount, isRateModified: false });
    }
  }
  updateRate(value) {
    const numericValue = value === '' ? 0 : Number(value);
    this.selectedData = Object.assign(Object.assign({}, this.selectedData), { rate: numericValue, totalRooms: value === '' ? 0 : this.selectedData.totalRooms, defaultSelectedRate: this.selectedData.rateType === 2 ? numericValue / this.dateDifference : numericValue });
  }
  updateGenericData(key, value) {
    this.selectedData = Object.assign(Object.assign({}, this.selectedData), { [key]: value === '' ? 0 : parseInt(value) });
  }
  bookProperty() {
    this.dataUpdateEvent.emit({ key: 'clearData', data: this.selectedData });
    this.handleDataChange('totalRooms', { target: { value: '1' } });
    this.gotoSplitPageTwoEvent.emit({ key: 'gotoSplitPage', data: '' });
  }
  renderRate() {
    if (this.selectedData.isRateModified) {
      console.log('selectedData.rate', this.selectedData.rate);
      return this.selectedData.rate === -1 ? '' : this.selectedData.rate;
    }
    return this.selectedData.rateType === 1 ? Number(this.selectedData.rate).toFixed(2) : Number(this.initialRateValue).toFixed(2);
  }
  render() {
    return (h(Host, null, h("div", { class: "d-flex flex-column m-0 p-0 flex-lg-row align-items-lg-center justify-content-lg-between " }, h("div", { class: "rateplan-name-container" }, this.bookingType === 'BAR_BOOKING' ? (h(Fragment, null, h("span", { class: "font-weight-bold\t" }, this.ratePlanData.name.split('/')[0]), h("span", null, "/", this.ratePlanData.name.split('/')[1]))) : (h("span", null, this.ratePlanData.name)), h("ir-tooltip", { message: this.ratePlanData.cancelation + this.ratePlanData.guarantee })), h("div", { class: 'd-md-flex justify-content-md-end  align-items-md-center  flex-fill rateplan-container' }, h("div", { class: "mt-1 mt-lg-0 flex-fill max-w-300" }, h("fieldset", { class: "position-relative" }, h("select", { disabled: this.disableForm(), class: "form-control  input-sm", id: v4(), onChange: evt => this.handleDataChange('adult_child_offering', evt) }, this.ratePlanData.variations.map(variation => (h("option", { value: variation.adult_child_offering, selected: this.selectedData.adult_child_offering === variation.adult_child_offering }, variation.adult_child_offering)))))), h("div", { class: 'm-0 p-0 d-md-flex justify-content-between ml-md-1 ' }, h("div", { class: " d-flex mt-1  mt-lg-0 m-0 p-0 rate-total-night-view   " }, h("fieldset", { class: "position-relative has-icon-left m-0 p-0 rate-input-container  " }, h("input", { disabled: this.disableForm(), type: "text", class: "form-control input-sm rate-input py-0 m-0 rounded-0 rateInputBorder", value: this.renderRate(), id: v4(), placeholder: locales.entries.Lcz_Rate || 'Rate', onInput: (event) => this.handleInput(event) }), h("span", { class: "currency" }, getCurrencySymbol(this.currency.code))), h("fieldset", { class: "position-relative m-0 total-nights-container p-0 " }, h("select", { disabled: this.disableForm(), class: "form-control input-sm m-0 nightBorder rounded-0  py-0", id: v4(), onChange: evt => this.handleDataChange('rateType', evt) }, this.ratePricingMode.map(data => (h("option", { value: data.CODE_NAME, selected: this.selectedData.rateType === +data.CODE_NAME }, data.CODE_VALUE_EN)))))), this.bookingType === 'PLUS_BOOKING' || this.bookingType === 'ADD_ROOM' ? (h("div", { class: "flex-lg-fill  mt-lg-0 ml-md-2 m-0 mt-1 p-0" }, h("fieldset", { class: "position-relative" }, h("select", { disabled: this.selectedData.rate === 0 || this.disableForm(), class: "form-control input-sm", id: v4(), onChange: evt => this.handleDataChange('totalRooms', evt) }, Array.from({ length: this.totalAvailableRooms + 1 }, (_, i) => i).map(i => (h("option", { value: i, selected: this.selectedData.totalRooms === i }, i))))))) : null), this.bookingType === 'EDIT_BOOKING' ? (h(Fragment, null, h("div", { class: " m-0 p-0  mt-lg-0  ml-md-1 mt-md-1 d-none d-md-block" }, h("fieldset", { class: "position-relative" }, h("input", { disabled: this.disableForm(), type: "radio", name: "ratePlanGroup", value: "1", onChange: evt => this.handleDataChange('totalRooms', evt), checked: this.selectedData.totalRooms === 1 }))), h("button", { disabled: this.selectedData.rate === -1 || this.disableForm(), type: "button", class: "btn btn-primary booking-btn mt-lg-0 btn-sm ml-md-1  mt-1 d-md-none ", onClick: () => this.bookProperty() }, this.selectedData.totalRooms === 1 ? locales.entries.Lcz_Current : locales.entries.Lcz_Select))) : null, this.bookingType === 'BAR_BOOKING' || this.bookingType === 'SPLIT_BOOKING' ? (h("button", { disabled: this.selectedData.rate === -1 || this.disableForm() || (this.bookingType === 'SPLIT_BOOKING' && this.isBookDisabled), type: "button", class: "btn btn-primary booking-btn mt-lg-0 btn-sm ml-md-1  mt-1 ", onClick: () => this.bookProperty() }, locales.entries.Lcz_Book)) : null))));
  }
  static get watchers() { return {
    "ratePlanData": ["ratePlanDataChanged"]
  }; }
  static get style() { return iglBookingRoomRatePlanCss; }
}, [2, "igl-booking-room-rate-plan", {
    "defaultData": [16],
    "ratePlanData": [16],
    "totalAvailableRooms": [2, "total-available-rooms"],
    "index": [2],
    "ratePricingMode": [16],
    "currency": [8],
    "physicalrooms": [8],
    "shouldBeDisabled": [4, "should-be-disabled"],
    "dateDifference": [2, "date-difference"],
    "bookingType": [1, "booking-type"],
    "fullyBlocked": [4, "fully-blocked"],
    "isBookDisabled": [4, "is-book-disabled"],
    "defaultRoomId": [8, "default-room-id"],
    "selectedRoom": [8, "selected-room"],
    "selectedData": [32],
    "ratePlanChangedState": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["igl-booking-room-rate-plan", "ir-tooltip"];
  components.forEach(tagName => { switch (tagName) {
    case "igl-booking-room-rate-plan":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IglBookingRoomRatePlan);
      }
      break;
    case "ir-tooltip":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IglBookingRoomRatePlan as I, defineCustomElement as d };

//# sourceMappingURL=igl-booking-room-rate-plan2.js.map