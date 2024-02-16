'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');
const room_service = require('./room.service-48409b7e2.js');
const channel_store = require('./channel.store-4cb2919a.js');
const locales_store = require('./locales.store-e07a3298.js');
const axios = require('./axios-5ba3068e.js');
require('./calendar-data-a30446d5.js');
require('./index-d93aa7bb.js');

const irChannelCss = ".sc-ir-channel-h{display:block}.dropdown-toggle.sc-ir-channel{color:var(--blue)}.dropdown-toggle.sc-ir-channel::after{content:none;display:none}.dropdown-toggle.sc-ir-channel .caret-icon.sc-ir-channel{transition:transform 0.15s ease-in-out, color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,\r\n    -webkit-box-shadow 0.15s ease-in-out}.btn.sc-ir-channel:hover .caret-icon.sc-ir-channel path.sc-ir-channel{fill:#6b6f82}.show.sc-ir-channel .caret-icon.sc-ir-channel{transform:rotate(-180deg)}";

const IrChannel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.roomService = new room_service.RoomService();
    this.ticket = '';
    this.propertyid = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.channel_status = null;
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      const [, , languageTexts] = await Promise.all([
        this.roomService.fetchData(this.propertyid, this.language),
        this.roomService.getExposedChannels(),
        this.roomService.fetchLanguage(this.language),
      ]);
      console.log(languageTexts);
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
    return (index.h(index.Host, null, index.h("section", { class: "p-2" }, index.h("div", { class: "d-flex w-100 justify-content-end mb-2" }, index.h("ir-button", { text: 'Create', size: "sm", onClickHanlder: () => (this.channel_status = 'create') })), index.h("div", null, index.h("table", { class: "table" }, index.h("thead", { class: "" }, index.h("tr", null, index.h("th", { scope: "col", class: "text-left" }, "Title"), index.h("th", { scope: "col" }, "Channel"), index.h("th", { scope: "col" }, "Status"), index.h("th", { scope: "col" }, "Actions"))), index.h("tbody", null, (_a = channel_store.channels_data.connected_channels) === null || _a === void 0 ? void 0 : _a.map(channel => (index.h("tr", { key: channel.channel.id }, index.h("th", { scope: "row", class: "text-left" }, channel.title), index.h("th", { scope: "row" }, channel.channel.name), index.h("td", null, index.h("input", { "data-switchery": "true", type: "checkbox", class: "", checked: channel.is_active })), index.h("th", null, index.h("div", { class: "btn-group" }, index.h("button", { type: "button", class: "btn  dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, index.h("span", { class: "mr-1" }, "Actions"), index.h("svg", { class: 'caret-icon', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", height: 14, width: 14 }, index.h("path", { fill: "var(--blue)", d: "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" }))), index.h("div", { class: "dropdown-menu dropdown-menu-right" }, index.h("button", { class: "dropdown-item", type: "button" }, "Action"), index.h("button", { class: "dropdown-item", type: "button" }, "Another action"), index.h("button", { class: "dropdown-item", type: "button" }, "Something else here"))))))))))), index.h("ir-sidebar", { showCloseButton: false, onIrSidebarToggle: e => {
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