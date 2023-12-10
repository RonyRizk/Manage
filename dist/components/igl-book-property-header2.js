import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './igl-date-range2.js';
import { d as defineCustomElement$1 } from './ir-date-picker2.js';

const iglBookPropertyHeaderCss = ".sc-igl-book-property-header-h{display:block}.row.sc-igl-book-property-header{padding:0 0 0 15px;margin:0}.sourceContainer.sc-igl-book-property-header{max-width:350px}";

const IglBookPropertyHeader = /*@__PURE__*/ proxyCustomElement(class IglBookPropertyHeader extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.splitBookingDropDownChange = createEvent(this, "splitBookingDropDownChange", 7);
    this.sourceDropDownChange = createEvent(this, "sourceDropDownChange", 7);
    this.adultChild = createEvent(this, "adultChild", 7);
    this.checkClicked = createEvent(this, "checkClicked", 7);
    this.buttonClicked = createEvent(this, "buttonClicked", 7);
    this.toast = createEvent(this, "toast", 7);
    this.sourceOption = {
      code: '',
      description: '',
      tag: '',
    };
    this.splitBookingId = '';
    this.bookingData = '';
    this.sourceOptions = [];
    this.message = undefined;
    this.bookingDataDefaultDateRange = undefined;
    this.showSplitBookingOption = false;
    this.adultChildConstraints = undefined;
    this.splitBookings = undefined;
    this.adultChildCount = undefined;
  }
  getSplitBookings() {
    return (this.bookingData.hasOwnProperty('splitBookingEvents') && this.bookingData.splitBookingEvents) || [];
  }
  getSelectedSplitBookingName(bookingId) {
    let splitBooking = this.splitBookings.find(booking => booking.ID === bookingId);
    return splitBooking.ID + ' ' + splitBooking.NAME;
  }
  getSplitBookingList() {
    return (h("fieldset", { class: "form-group col-12 text-left" }, h("label", { class: "h5" }, "To booking# "), h("div", { class: "btn-group ml-1" }, h("select", { class: "form-control input-sm", id: "xSmallSelect", onChange: evt => this.splitBookingDropDownChange.emit(evt) }, h("option", { value: "", selected: this.splitBookingId != '' }, "Select"), this.splitBookings.map(option => (h("option", { value: option.ID, selected: this.splitBookingId === option.ID }, this.getSelectedSplitBookingName(option.ID))))))));
  }
  getSourceNode() {
    return (h("fieldset", { class: "d-flex flex-column text-left flex-lg-row align-items-lg-center" }, h("label", { class: "h5 mr-lg-1" }, "Source "), h("div", { class: "btn-group mt-1 mt-lg-0 sourceContainer" }, h("select", { class: "form-control input-sm", id: "xSmallSelect", onChange: evt => this.sourceDropDownChange.emit(evt.target.value) }, this.sourceOptions.map(option => {
      if (option.type === 'LABEL') {
        return h("optgroup", { label: option.value });
      }
      return (h("option", { value: option.id, selected: this.sourceOption.code === option.id }, option.value));
    })))));
  }
  handleAdultChildChange(key, event) {
    const value = event.target.value;
    let obj = {};
    if (value === '') {
      obj = Object.assign(Object.assign({}, this.adultChildCount), { [key]: 0 });
    }
    else {
      obj = Object.assign(Object.assign({}, this.adultChildCount), { [key]: value });
    }
    this.adultChild.emit(obj);
  }
  getAdultChildConstraints() {
    return (h("div", { class: "mt-1 d-flex flex-column text-left" }, h("label", { class: "h5 d-lg-none" }, "Number of Guests "), h("div", { class: "form-group  text-left d-flex align-items-center justify-content-between justify-content-sm-start" }, h("fieldset", null, h("div", { class: "btn-group " }, h("select", { class: "form-control input-sm", id: "xAdultSmallSelect", onChange: evt => this.handleAdultChildChange('adult', evt) }, h("option", { value: "" }, "Ad.."), Array.from(Array(this.adultChildConstraints.adult_max_nbr), (_, i) => i + 1).map(option => (h("option", { value: option }, option)))))), this.adultChildConstraints.child_max_nbr > 0 && (h("fieldset", { class: 'ml-1' }, h("div", { class: "btn-group ml-1" }, h("select", { class: "form-control input-sm", id: "xChildrenSmallSelect", onChange: evt => this.handleAdultChildChange('child', evt) }, h("option", { value: '' }, `Ch... < ${this.adultChildConstraints.child_max_age} years`), Array.from(Array(this.adultChildConstraints.child_max_nbr), (_, i) => i + 1).map(option => (h("option", { value: option }, option))))))), h("button", { class: 'btn btn-primary btn-sm ml-2 ', onClick: () => this.handleButtonClicked() }, "Check"))));
  }
  handleButtonClicked() {
    if (this.adultChildCount.adult === 0) {
      this.toast.emit({ type: 'error', title: 'Please select the number of guests', description: '', position: 'top-right' });
    }
    else {
      this.buttonClicked.emit({ key: 'check' });
    }
  }
  isEventType(key) {
    return this.bookingData.event_type === key;
  }
  render() {
    return (h(Host, null, this.showSplitBookingOption ? this.getSplitBookingList() : this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM') ? null : this.getSourceNode(), h("div", { class: 'd-lg-flex align-items-center' }, h("fieldset", { class: " mt-1 mt-lg-0  " }, h("igl-date-range", { disabled: this.isEventType('BAR_BOOKING'), defaultData: this.bookingDataDefaultDateRange })), !this.isEventType('EDIT_BOOKING') && this.getAdultChildConstraints()), h("p", { class: "text-left mt-1" }, this.message)));
  }
  static get style() { return iglBookPropertyHeaderCss; }
}, [2, "igl-book-property-header", {
    "splitBookingId": [8, "split-booking-id"],
    "bookingData": [8, "booking-data"],
    "sourceOptions": [16],
    "message": [1],
    "bookingDataDefaultDateRange": [16],
    "showSplitBookingOption": [4, "show-split-booking-option"],
    "adultChildConstraints": [16],
    "splitBookings": [16],
    "adultChildCount": [16]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["igl-book-property-header", "igl-date-range", "ir-date-picker"];
  components.forEach(tagName => { switch (tagName) {
    case "igl-book-property-header":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IglBookPropertyHeader);
      }
      break;
    case "igl-date-range":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-date-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IglBookPropertyHeader as I, defineCustomElement as d };

//# sourceMappingURL=igl-book-property-header2.js.map