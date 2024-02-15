import { r as registerInstance, h, H as Host, g as getElement } from './index-795d2df3.js';
import { R as RoomService } from './room.service-c4fb073f.js';
import { c as calendar_data } from './calendar-data-95cbc8c6.js';
import { l as locales } from './locales.store-de01ea13.js';
import { a as axios } from './axios-3bd8531e.js';
import './index-2bd379e0.js';

const irChannelCss = ".sc-ir-channel-h{display:block}";

const IrChannel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
      const [_, languageTexts] = await Promise.all([this.roomService.fetchData(this.propertyid, this.language), this.roomService.fetchLanguage(this.language)]);
      if (!locales.entries) {
        locales.entries = languageTexts.entries;
        locales.direction = languageTexts.direction;
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
    return (h(Host, null, h("section", { class: "p-2" }, h("div", { class: "d-flex w-100 justify-content-end mb-2" }, h("ir-button", { text: 'Create', size: "sm", onClickHanlder: () => (this.channel_status = 'create') })), h("div", null, h("table", { class: "table" }, h("thead", { class: "" }, h("tr", null, h("th", { scope: "col", class: "text-left" }, "Title"), h("th", { scope: "col" }, "Channel"), h("th", { scope: "col" }, "Status"), h("th", { scope: "col" }, "Actions"))), h("tbody", null, (_a = calendar_data.channels) === null || _a === void 0 ? void 0 : _a.map(channel => (h("tr", { key: channel.id }, h("th", { scope: "row", class: "text-left" }, channel.title), h("th", { scope: "row" }, channel.name), h("td", null, h("input", { "data-switchery": "true", type: "checkbox", class: "", checked: channel.is_active })), h("th", null, h("div", { class: "dropdown" }, h("button", { class: "btn dropdown-toggle text-primary", type: "button", "data-toggle": "dropdown", "aria-expanded": "false" }, "Actions"), h("div", { class: "dropdown-menu dropdown-menu-right" }, h("a", { class: "dropdown-item", href: "#" }, "Action"), h("a", { class: "dropdown-item", href: "#" }, "Another action"), h("a", { class: "dropdown-item", href: "#" }, "Something else here"))))))))))), h("ir-sidebar", { showCloseButton: false, onIrSidebarToggle: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.channel_status = null;
      }, open: this.channel_status !== null }, this.channel_status && h("ir-channel-editor", { onCloseSideBar: () => (this.channel_status = null) }))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrChannel.style = irChannelCss;

export { IrChannel as ir_channel };

//# sourceMappingURL=ir-channel.entry.js.map