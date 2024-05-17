'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const booking_service = require('./booking.service-2b7878e6.js');
const locales_store = require('./locales.store-8fed15eb.js');
const calendarData = require('./calendar-data-0a2c60be.js');
const v4 = require('./v4-d89fec7e.js');
require('./axios-77201e24.js');
require('./utils-6a5b3cb5.js');
require('./moment-f96595e5.js');
require('./booking-e82fa669.js');
require('./index-797ee4c0.js');

const iglBlockDatesViewCss = ".sc-igl-block-dates-view-h{display:block}.sc-igl-block-dates-view-h .controlContainer.sc-igl-block-dates-view{width:24px}.sc-igl-block-dates-view-h .checkBoxContainer.sc-igl-block-dates-view input.sc-igl-block-dates-view{height:1.2rem !important;width:30px}.releaseTime.sc-igl-block-dates-view{padding-left:5px}.out-of-service-label.sc-igl-block-dates-view{margin-left:5px !important}";

const IglBlockDatesView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataUpdateEvent = index.createEvent(this, "dataUpdateEvent", 7);
    this.blockDatesData = {
      RELEASE_AFTER_HOURS: 0,
      OPTIONAL_REASON: '',
      OUT_OF_SERVICE: false,
    }; // Change of property name might require updates in booking-event-hover
    this.releaseList = [];
    this.bookingService = new booking_service.BookingService();
    this.defaultData = undefined;
    this.fromDate = undefined;
    this.toDate = undefined;
    this.entryDate = undefined;
    this.entryHour = undefined;
    this.isEventHover = false;
    this.entryMinute = undefined;
    this.renderAgain = false;
  }
  async componentWillLoad() {
    try {
      this.bookingService.setToken(calendarData.calendar_data.token);
      this.releaseList = await this.bookingService.getBlockedInfo();
      if (this.defaultData) {
        this.blockDatesData = Object.assign({}, this.defaultData);
      }
      else {
        this.blockDatesData.RELEASE_AFTER_HOURS = parseInt(this.releaseList[0].CODE_NAME);
        this.emitData();
      }
    }
    catch (error) {
      // toastr.error(error);
    }
  }
  handleOptionalReason(event) {
    this.blockDatesData.OPTIONAL_REASON = event.target.value;
    this.emitData();
  }
  handleReleaseAfterChange(evt) {
    if (this.entryDate)
      this.entryDate = undefined;
    this.blockDatesData.RELEASE_AFTER_HOURS = parseInt(evt.target.value);
    this.renderPage();
    this.emitData();
  }
  emitData() {
    this.dataUpdateEvent.emit({
      key: 'blockDatesData',
      data: Object.assign({}, this.blockDatesData),
    });
  }
  getReleaseHoursString() {
    // console.log("entry date", this.entryDate);
    // console.log("blocked date data", this.blockDatesData);
    let dt = this.entryDate ? new Date(this.entryDate) : new Date();
    if (this.entryDate && this.entryHour && this.entryMinute) {
      dt.setHours(this.entryHour, this.entryMinute, 0, 0);
    }
    else {
      dt.setHours(dt.getHours() + this.blockDatesData.RELEASE_AFTER_HOURS, dt.getMinutes(), 0, 0);
    }
    return dt.toLocaleString('default', { month: 'short' }) + ' ' + dt.getDate() + ', ' + this.formatNumber(dt.getHours()) + ':' + this.formatNumber(dt.getMinutes());
  }
  formatNumber(value) {
    return value < 10 ? `0${value}` : value;
  }
  handleOutOfService(evt) {
    this.blockDatesData.OUT_OF_SERVICE = evt.target.checked;
    if (this.blockDatesData.OUT_OF_SERVICE) {
      this.blockDatesData.OPTIONAL_REASON = '';
      this.blockDatesData.RELEASE_AFTER_HOURS = 0;
    }
    this.renderPage();
    this.emitData();
  }
  renderPage() {
    this.renderAgain = !this.renderAgain;
  }
  render() {
    console.log(this.fromDate);
    return (index.h(index.Host, null, index.h("div", { class: `m-0 p-0 mb-1` }, index.h("div", { class: "text-left p-0" }, index.h("ir-date-view", { from_date: this.fromDate, dateOption: "DD MMM YYYY", showDateDifference: false, to_date: this.toDate }))), index.h("div", { class: ` mb-1 text-left ${this.isEventHover && 'p-0'}` }, index.h("div", { class: "mb-1 " }, index.h("label", { class: "p-0 text-bold-700 font-medium-1 m-0 align-middle" }, locales_store.locales.entries.Lcz_Reason, ":"), index.h("div", { class: "p-0 m-0 pr-1  controlContainer checkBoxContainer d-inline-block align-middle" }, index.h("input", { class: "form-control", type: "checkbox", checked: this.blockDatesData.OUT_OF_SERVICE, id: "userinput6", onChange: event => this.handleOutOfService(event) })), index.h("span", { class: "align-middle out-of-service-label" }, locales_store.locales.entries.Lcz_OutOfservice)), !this.blockDatesData.OUT_OF_SERVICE ? (index.h("div", null, index.h("div", { class: "mb-1 d-flex  align-items-center" }, index.h("span", { class: "align-middle" }, locales_store.locales.entries.Lcz_Or, " "), index.h("div", { class: "d-inline-flex col pr-0 align-middle" }, index.h("input", { class: "form-control", type: "text", placeholder: locales_store.locales.entries.Lcz_OptionalReason, id: "optReason", value: this.blockDatesData.OPTIONAL_REASON, onInput: event => this.handleOptionalReason(event) }))), index.h("div", { class: "mb-1 w-100 pr-0 " }, index.h("span", { class: "text-bold-700 font-medium-1" }, locales_store.locales.entries.Lcz_AutomaticReleaseIn, ": "), index.h("div", { class: "d-inline-block" }, index.h("select", { class: "form-control input-sm", id: "zSmallSelect", onChange: evt => this.handleReleaseAfterChange(evt) }, this.releaseList.map(releaseItem => (index.h("option", { value: +releaseItem.CODE_NAME, selected: this.blockDatesData.RELEASE_AFTER_HOURS == +releaseItem.CODE_NAME }, releaseItem.CODE_VALUE_EN))))), this.blockDatesData.RELEASE_AFTER_HOURS ? (index.h("div", { class: "d-inline-block releaseTime" }, index.h("em", null, locales_store.locales.entries.Lcz_On, " ", this.getReleaseHoursString()))) : null))) : null)));
  }
};
IglBlockDatesView.style = iglBlockDatesViewCss;

const otaLabelCss = "*.sc-ota-label{margin:0;padding:0}.sc-ota-label-h{display:flex;margin-bottom:5px;gap:5px;width:100%}strong.sc-ota-label{margin:0;padding:0}ul.sc-ota-label{margin:0 3px;padding:0;list-style:none;overflow:hidden;width:100%;word-wrap:break-word !important;overflow-wrap:break-word !important}li.sc-ota-label{width:100%;line-height:1.5;margin:0;padding:0;word-wrap:break-word !important;overflow-wrap:break-word !important}button.sc-ota-label{background:white;color:var(--blue);padding:0;margin:0;margin-left:3px;font-size:12px;border:0}button.sc-ota-label:hover{color:#355270}";

const OtaLabel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.toggleShowAll = () => {
      this.showAll = !this.showAll;
    };
    this.label = undefined;
    this.remarks = undefined;
    this.maxVisibleItems = 3;
    this.showAll = false;
  }
  render() {
    if (!this.remarks) {
      return null;
    }
    const displayedRemarks = this.showAll ? this.remarks : this.remarks.slice(0, this.maxVisibleItems);
    return (index.h(index.Host, null, index.h("strong", null, this.label), index.h("ul", null, displayedRemarks.map((remark, index$1) => (index.h("li", { key: v4.v4() }, "- ", remark.statement, ' ', this.remarks.length > this.maxVisibleItems && index$1 === displayedRemarks.length - 1 && (index.h("button", { onClick: this.toggleShowAll }, this.showAll ? locales_store.locales.entries.Lcz_ShowLess : locales_store.locales.entries.Lcz_ShowMore))))))));
  }
};
OtaLabel.style = otaLabelCss;

exports.igl_block_dates_view = IglBlockDatesView;
exports.ota_label = OtaLabel;

//# sourceMappingURL=igl-block-dates-view_2.cjs.entry.js.map