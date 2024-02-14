import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$9 } from './igl-book-property-footer2.js';
import { d as defineCustomElement$8 } from './igl-book-property-header2.js';
import { d as defineCustomElement$7 } from './igl-booking-room-rate-plan2.js';
import { d as defineCustomElement$6 } from './igl-booking-rooms2.js';
import { d as defineCustomElement$5 } from './igl-date-range2.js';
import { d as defineCustomElement$4 } from './ir-autocomplete2.js';
import { d as defineCustomElement$3 } from './ir-button2.js';
import { d as defineCustomElement$2 } from './ir-date-picker2.js';
import { d as defineCustomElement$1 } from './ir-tooltip2.js';

const iglBookingOverviewPageCss = ".sc-igl-booking-overview-page-h{display:block}.sc-igl-booking-overview-page-h>*.sc-igl-booking-overview-page{margin:0;padding:auto}.scrollContent.sc-igl-booking-overview-page{height:calc(100% - 79px);overflow:auto;position:relative}";

const IglBookingOverviewPage = /*@__PURE__*/ proxyCustomElement(class IglBookingOverviewPage extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.roomsDataUpdate = createEvent(this, "roomsDataUpdate", 7);
    this.bookingData = undefined;
    this.propertyId = undefined;
    this.message = undefined;
    this.showSplitBookingOption = undefined;
    this.eventType = undefined;
    this.currency = undefined;
    this.adultChildConstraints = undefined;
    this.ratePricingMode = undefined;
    this.dateRangeData = undefined;
    this.defaultDaterange = undefined;
    this.selectedRooms = undefined;
    this.adultChildCount = undefined;
    this.sourceOptions = undefined;
    this.bookedByInfoData = undefined;
    this.initialRoomIds = undefined;
  }
  getSplitBookings() {
    return (this.bookingData.hasOwnProperty('splitBookingEvents') && this.bookingData.splitBookingEvents) || [];
  }
  isEventType(event) {
    return event === this.eventType;
  }
  render() {
    var _a, _b;
    //console.log(this.bookingData);
    return (h(Host, null, h("igl-book-property-header", { bookedByInfoData: this.bookedByInfoData, defaultDaterange: this.defaultDaterange, dateRangeData: this.dateRangeData,
      // minDate={this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING') ? this.bookedByInfoData.from_date || this.bookingData.FROM_DATE : undefined}
      adultChildCount: this.adultChildCount, splitBookingId: this.showSplitBookingOption, bookingData: this.bookingData, sourceOptions: this.sourceOptions, message: this.message, bookingDataDefaultDateRange: this.bookingData.defaultDateRange, showSplitBookingOption: this.showSplitBookingOption, adultChildConstraints: this.adultChildConstraints, splitBookings: this.getSplitBookings(), propertyId: this.propertyId }), h("div", { class: " text-left" }, (_b = (_a = this.bookingData) === null || _a === void 0 ? void 0 : _a.roomsInfo) === null || _b === void 0 ? void 0 : _b.map(roomInfo => {
      console.log(this.selectedRooms);
      return (h("igl-booking-rooms", { initialRoomIds: this.initialRoomIds, isBookDisabled: Object.keys(this.bookedByInfoData).length <= 1, key: `room-info-${roomInfo.id}`, currency: this.currency, ratePricingMode: this.ratePricingMode, dateDifference: this.dateRangeData.dateDifference, bookingType: this.bookingData.event_type, roomTypeData: roomInfo, class: "mt-2 mb-1 p-0", roomInfoId: this.selectedRooms.has(`c_${roomInfo.id}`) ? roomInfo.id : null, defaultData: this.selectedRooms.get(`c_${roomInfo.id}`), onDataUpdateEvent: evt => this.roomsDataUpdate.emit(evt.detail) }));
    })), h("igl-book-property-footer", { class: 'p-0 mb-1 mt-3', eventType: this.bookingData.event_type, disabled: this.selectedRooms.size === 0 })));
  }
  static get style() { return iglBookingOverviewPageCss; }
}, [2, "igl-booking-overview-page", {
    "bookingData": [8, "booking-data"],
    "propertyId": [2, "property-id"],
    "message": [1],
    "showSplitBookingOption": [4, "show-split-booking-option"],
    "eventType": [1, "event-type"],
    "currency": [8],
    "adultChildConstraints": [16],
    "ratePricingMode": [8, "rate-pricing-mode"],
    "dateRangeData": [8, "date-range-data"],
    "defaultDaterange": [16],
    "selectedRooms": [16],
    "adultChildCount": [16],
    "sourceOptions": [16],
    "bookedByInfoData": [8, "booked-by-info-data"],
    "initialRoomIds": [8, "initial-room-ids"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["igl-booking-overview-page", "igl-book-property-footer", "igl-book-property-header", "igl-booking-room-rate-plan", "igl-booking-rooms", "igl-date-range", "ir-autocomplete", "ir-button", "ir-date-picker", "ir-tooltip"];
  components.forEach(tagName => { switch (tagName) {
    case "igl-booking-overview-page":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IglBookingOverviewPage);
      }
      break;
    case "igl-book-property-footer":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "igl-book-property-header":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "igl-booking-room-rate-plan":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "igl-booking-rooms":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "igl-date-range":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-autocomplete":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-date-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-tooltip":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IglBookingOverviewPage as I, defineCustomElement as d };

//# sourceMappingURL=igl-booking-overview-page2.js.map