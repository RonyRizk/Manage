'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');
const calendarData = require('./calendar-data-9ed0f0c0.js');
const locales_store = require('./locales.store-e07a3298.js');
const axios = require('./axios-5ba3068e.js');
require('./index-d93aa7bb.js');

class RoomService {
  async fetchData(id, language) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.axios.post(`/Get_Exposed_Property?Ticket=${token}`, { id, language });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const results = data.My_Result;
        calendarData.calendar_data.adultChildConstraints = results.adult_child_constraints;
        calendarData.calendar_data.allowedBookingSources = results.allowed_booking_sources;
        calendarData.calendar_data.allowed_payment_methods = results.allowed_booking_methods;
        calendarData.calendar_data.currency = results.currency;
        calendarData.calendar_data.is_vacation_rental = results.is_vacation_rental;
        calendarData.calendar_data.pickup_service = results.pickup_service;
        calendarData.calendar_data.max_nights = results.max_nights;
        calendarData.calendar_data.channels = results.channels;
        calendarData.calendar_data.is_frontdesk_enabled = results.is_frontdesk_enabled;
        return data;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async fetchLanguage(code) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.axios.post(`/Get_Exposed_Language?Ticket=${token}`, { code });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        let entries = this.transformArrayToObject(data.My_Result.entries);
        locales_store.locales.entries = entries;
        locales_store.locales.direction = data.My_Result.direction;
        return { entries, direction: data.My_Result.direction };
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  transformArrayToObject(data) {
    let object = {};
    for (const d of data) {
      object[d.code] = d.description;
    }
    return object;
  }
}

const irChannelCss = ".sc-ir-channel-h{display:block}";

const IrChannel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.roomService = new RoomService();
    this.ticket = undefined;
    this.propertyid = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.channel_status = null;
  }
  componentDidLoad() {
    if (this.baseurl) {
      axios.axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      const [_, languageTexts] = await Promise.all([this.roomService.fetchData(this.propertyid, this.language), this.roomService.fetchLanguage(this.language)]);
      if (!locales_store.locales.entries) {
        locales_store.locales.entries = languageTexts.entries;
        locales_store.locales.direction = languageTexts.direction;
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  async ticketChanged() {
    sessionStorage.setItem('token', JSON.stringify(this.ticket));
    this.initializeApp();
  }
  render() {
    var _a;
    return (index.h(index.Host, null, index.h("section", { class: "p-2" }, index.h("div", { class: "d-flex w-100 justify-content-end mb-2" }, index.h("ir-button", { text: 'Create', size: "sm", onClickHanlder: () => (this.channel_status = 'create') })), index.h("div", null, index.h("table", { class: "table" }, index.h("thead", { class: "" }, index.h("tr", null, index.h("th", { scope: "col", class: "text-left" }, "Title"), index.h("th", { scope: "col" }, "Channel"), index.h("th", { scope: "col" }, "Status"), index.h("th", { scope: "col" }, "Actions"))), index.h("tbody", null, (_a = calendarData.calendar_data.channels) === null || _a === void 0 ? void 0 : _a.map(channel => (index.h("tr", { key: channel.id }, index.h("th", { scope: "row", class: "text-left" }, channel.title), index.h("th", { scope: "row" }, channel.name), index.h("td", null, index.h("input", { "data-switchery": "true", type: "checkbox", class: "", checked: channel.is_active })), index.h("th", null, index.h("div", { class: "dropdown" }, index.h("button", { class: "btn dropdown-toggle text-primary", type: "button", "data-toggle": "dropdown", "aria-expanded": "false" }, "Actions"), index.h("div", { class: "dropdown-menu dropdown-menu-right" }, index.h("a", { class: "dropdown-item", href: "#" }, "Action"), index.h("a", { class: "dropdown-item", href: "#" }, "Another action"), index.h("a", { class: "dropdown-item", href: "#" }, "Something else here"))))))))))), index.h("ir-sidebar", { showCloseButton: false, onIrSidebarToggle: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.channel_status = null;
      }, open: this.channel_status !== null }, this.channel_status && index.h("ir-channel-editor", { onCloseSideBar: () => (this.channel_status = null) }))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrChannel.style = irChannelCss;

exports.ir_channel = IrChannel;

//# sourceMappingURL=ir-channel.cjs.entry.js.map