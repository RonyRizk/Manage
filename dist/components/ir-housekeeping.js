import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { H as HouseKeepingService, u as updateHKStore } from './housekeeping.service.js';
import { R as RoomService } from './room.service.js';
import { a as axios } from './axios.js';
import { d as defineCustomElement$i } from './ir-button2.js';
import { d as defineCustomElement$h } from './ir-combobox2.js';
import { d as defineCustomElement$g } from './ir-delete-modal2.js';
import { d as defineCustomElement$f } from './ir-hk-team2.js';
import { d as defineCustomElement$e } from './ir-hk-unassigned-units2.js';
import { d as defineCustomElement$d } from './ir-hk-user2.js';
import { d as defineCustomElement$c } from './ir-icon2.js';
import { d as defineCustomElement$b } from './ir-input-text2.js';
import { d as defineCustomElement$a } from './ir-interceptor2.js';
import { d as defineCustomElement$9 } from './ir-loading-screen2.js';
import { d as defineCustomElement$8 } from './ir-phone-input2.js';
import { d as defineCustomElement$7 } from './ir-select2.js';
import { d as defineCustomElement$6 } from './ir-sidebar2.js';
import { d as defineCustomElement$5 } from './ir-switch2.js';
import { d as defineCustomElement$4 } from './ir-title2.js';
import { d as defineCustomElement$3 } from './ir-toast2.js';
import { d as defineCustomElement$2 } from './ir-unit-status2.js';

const irHousekeepingCss = ".sc-ir-housekeeping-h{display:block}";

const IrHousekeeping$1 = /*@__PURE__*/ proxyCustomElement(class IrHousekeeping extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.roomService = new RoomService();
    this.houseKeepingService = new HouseKeepingService();
    this.language = '';
    this.ticket = '';
    this.baseurl = '';
    this.propertyid = undefined;
    this.isLoading = false;
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.roomService.setToken(this.ticket);
      this.houseKeepingService.setToken(this.ticket);
      updateHKStore('default_properties', { token: this.ticket, property_id: this.propertyid, language: this.language });
      this.initializeApp();
    }
  }
  async handleResetData(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    await this.houseKeepingService.getExposedHKSetup(this.propertyid);
  }
  async ticketChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.roomService.setToken(this.ticket);
      this.houseKeepingService.setToken(this.ticket);
      updateHKStore('default_properties', { token: this.ticket, property_id: this.propertyid, language: this.language });
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      this.isLoading = true;
      await Promise.all([
        this.houseKeepingService.getExposedHKSetup(this.propertyid),
        this.roomService.fetchData(this.propertyid, this.language),
        this.roomService.fetchLanguage(this.language, ['_HK_FRONT']),
      ]);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  render() {
    if (this.isLoading) {
      return h("ir-loading-screen", null);
    }
    return (h(Host, null, h("ir-interceptor", null), h("ir-toast", null), h("section", { class: "p-1" }, h("ir-unit-status", { class: "mb-1" }), h("ir-hk-team", { class: "mb-1" }))));
  }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
  static get style() { return irHousekeepingCss; }
}, [2, "ir-housekeeping", {
    "language": [1],
    "ticket": [1],
    "baseurl": [1],
    "propertyid": [2],
    "isLoading": [32]
  }, [[0, "resetData", "handleResetData"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-housekeeping", "ir-button", "ir-combobox", "ir-delete-modal", "ir-hk-team", "ir-hk-unassigned-units", "ir-hk-user", "ir-icon", "ir-input-text", "ir-interceptor", "ir-loading-screen", "ir-phone-input", "ir-select", "ir-sidebar", "ir-switch", "ir-title", "ir-toast", "ir-unit-status"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-housekeeping":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrHousekeeping$1);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "ir-combobox":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "ir-delete-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "ir-hk-team":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "ir-hk-unassigned-units":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "ir-hk-user":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "ir-input-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "ir-interceptor":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "ir-loading-screen":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "ir-phone-input":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "ir-sidebar":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-switch":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-title":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-toast":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-unit-status":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const IrHousekeeping = IrHousekeeping$1;
const defineCustomElement = defineCustomElement$1;

export { IrHousekeeping, defineCustomElement };

//# sourceMappingURL=ir-housekeeping.js.map