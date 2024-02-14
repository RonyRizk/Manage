import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as calendar_data } from './calendar-data.js';
import { l as locales } from './locales.store.js';
import { a as axios } from './axios.js';
import { d as defineCustomElement$8 } from './ir-button2.js';
import { d as defineCustomElement$7 } from './ir-channel-editor2.js';
import { d as defineCustomElement$6 } from './ir-channel-general2.js';
import { d as defineCustomElement$5 } from './ir-channel-header2.js';
import { d as defineCustomElement$4 } from './ir-channel-mapping2.js';
import { d as defineCustomElement$3 } from './ir-icon2.js';
import { d as defineCustomElement$2 } from './ir-sidebar2.js';

class RoomService {
  async fetchData(id, language) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Property?Ticket=${token}`, { id, language });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const results = data.My_Result;
        calendar_data.adultChildConstraints = results.adult_child_constraints;
        calendar_data.allowedBookingSources = results.allowed_booking_sources;
        calendar_data.allowed_payment_methods = results.allowed_booking_methods;
        calendar_data.currency = results.currency;
        calendar_data.is_vacation_rental = results.is_vacation_rental;
        calendar_data.pickup_service = results.pickup_service;
        calendar_data.max_nights = results.max_nights;
        calendar_data.channels = results.channels;
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
        const { data } = await axios.post(`/Get_Exposed_Language?Ticket=${token}`, { code });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        let entries = this.transformArrayToObject(data.My_Result.entries);
        locales.entries = entries;
        locales.direction = data.My_Result.direction;
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

const IrChannel$1 = /*@__PURE__*/ proxyCustomElement(class IrChannel extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.roomService = new RoomService();
    this.ticket = undefined;
    this.propertyid = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.channel_status = null;
  }
  componentDidLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      await Promise.all([this.roomService.fetchData(this.propertyid, this.language), this.roomService.fetchLanguage(this.language)]);
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
    return (h(Host, null, h("section", { class: "p-2" }, h("div", { class: "d-flex w-100 justify-content-end mb-2" }, h("ir-button", { text: 'Create', size: "sm", onClickHanlder: () => (this.channel_status = 'create') })), h("div", null, h("table", { class: "table" }, h("thead", { class: "" }, h("tr", null, h("th", { scope: "col", class: "text-left" }, "Title"), h("th", { scope: "col" }, "Channel"), h("th", { scope: "col" }, "Status"), h("th", { scope: "col" }, "Actions"))), h("tbody", null, (_a = calendar_data.channels) === null || _a === void 0 ? void 0 : _a.map(channel => (h("tr", { key: channel.id }, h("th", { scope: "row", class: "text-left" }, channel.title), h("th", { scope: "row" }, channel.name), h("td", null, h("input", { "data-switchery": "true", type: "checkbox", class: "", checked: channel.is_active })), h("th", null, h("div", { class: "dropdown" }, h("button", { class: "btn dropdown-toggle text-primary", type: "button", "data-toggle": "dropdown", "aria-expanded": "false" }, "Actions"), h("div", { class: "dropdown-menu dropdown-menu-right" }, h("a", { class: "dropdown-item", href: "#" }, "Action"), h("a", { class: "dropdown-item", href: "#" }, "Another action"), h("a", { class: "dropdown-item", href: "#" }, "Something else here"))))))))))), h("ir-sidebar", { showCloseButton: false, onIrSidebarToggle: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.channel_status = null;
      }, open: this.channel_status !== null }, h("ir-channel-editor", { onCloseSideBar: () => (this.channel_status = null) }))));
  }
  get el() { return this; }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
  static get style() { return irChannelCss; }
}, [2, "ir-channel", {
    "ticket": [1],
    "propertyid": [2],
    "language": [1],
    "baseurl": [1],
    "channel_status": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-channel", "ir-button", "ir-channel-editor", "ir-channel-general", "ir-channel-header", "ir-channel-mapping", "ir-icon", "ir-sidebar"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-channel":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannel$1);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "ir-channel-editor":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "ir-channel-general":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-channel-header":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-channel-mapping":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-sidebar":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const IrChannel = IrChannel$1;
const defineCustomElement = defineCustomElement$1;

export { IrChannel, defineCustomElement };

//# sourceMappingURL=ir-channel.js.map