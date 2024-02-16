import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { R as RoomService } from './room.service.js';
import { c as channels_data } from './channel.store.js';
import { l as locales } from './locales.store.js';
import { a as axios } from './axios.js';
import { d as defineCustomElement$9 } from './ir-button2.js';
import { d as defineCustomElement$8 } from './ir-channel-editor2.js';
import { d as defineCustomElement$7 } from './ir-channel-general2.js';
import { d as defineCustomElement$6 } from './ir-channel-header2.js';
import { d as defineCustomElement$5 } from './ir-channel-mapping2.js';
import { d as defineCustomElement$4 } from './ir-combobox2.js';
import { d as defineCustomElement$3 } from './ir-icon2.js';
import { d as defineCustomElement$2 } from './ir-sidebar2.js';

const irChannelCss = ".sc-ir-channel-h{display:block}.dropdown-toggle.sc-ir-channel{color:var(--blue)}.dropdown-toggle.sc-ir-channel::after{content:none;display:none}.dropdown-toggle.sc-ir-channel .caret-icon.sc-ir-channel{transition:transform 0.15s ease-in-out, color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,\r\n    -webkit-box-shadow 0.15s ease-in-out}.btn.sc-ir-channel:hover .caret-icon.sc-ir-channel path.sc-ir-channel{fill:#6b6f82}.show.sc-ir-channel .caret-icon.sc-ir-channel{transform:rotate(-180deg)}";

const IrChannel$1 = /*@__PURE__*/ proxyCustomElement(class IrChannel extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.roomService = new RoomService();
    this.ticket = '';
    this.propertyid = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.channel_status = null;
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
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
    return (h(Host, null, h("section", { class: "p-2" }, h("div", { class: "d-flex w-100 justify-content-end mb-2" }, h("ir-button", { text: 'Create', size: "sm", onClickHanlder: () => (this.channel_status = 'create') })), h("div", null, h("table", { class: "table" }, h("thead", { class: "" }, h("tr", null, h("th", { scope: "col", class: "text-left" }, "Title"), h("th", { scope: "col" }, "Channel"), h("th", { scope: "col" }, "Status"), h("th", { scope: "col" }, "Actions"))), h("tbody", null, (_a = channels_data.connected_channels) === null || _a === void 0 ? void 0 : _a.map(channel => (h("tr", { key: channel.channel.id }, h("th", { scope: "row", class: "text-left" }, channel.title), h("th", { scope: "row" }, channel.channel.name), h("td", null, h("input", { "data-switchery": "true", type: "checkbox", class: "", checked: channel.is_active })), h("th", null, h("div", { class: "btn-group" }, h("button", { type: "button", class: "btn  dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, h("span", { class: "mr-1" }, "Actions"), h("svg", { class: 'caret-icon', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", height: 14, width: 14 }, h("path", { fill: "var(--blue)", d: "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" }))), h("div", { class: "dropdown-menu dropdown-menu-right" }, h("button", { class: "dropdown-item", type: "button" }, "Action"), h("button", { class: "dropdown-item", type: "button" }, "Another action"), h("button", { class: "dropdown-item", type: "button" }, "Something else here"))))))))))), h("ir-sidebar", { showCloseButton: false, onIrSidebarToggle: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.channel_status = null;
      }, open: this.channel_status !== null }, this.channel_status && h("ir-channel-editor", { onCloseSideBar: () => (this.channel_status = null) }))));
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
  const components = ["ir-channel", "ir-button", "ir-channel-editor", "ir-channel-general", "ir-channel-header", "ir-channel-mapping", "ir-combobox", "ir-icon", "ir-sidebar"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-channel":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannel$1);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "ir-channel-editor":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "ir-channel-general":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "ir-channel-header":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-channel-mapping":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-combobox":
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