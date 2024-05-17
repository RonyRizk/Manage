import { r as registerInstance, h, H as Host } from './index-2fc15efd.js';
import { H as HouseKeepingService, u as updateHKStore } from './housekeeping.service-e1fb3a5c.js';
import { R as RoomService } from './room.service-174ef372.js';
import { a as axios } from './axios-8e9c5680.js';
import './index-12cef0ac.js';
import './calendar-data-aa1fc96c.js';
import './locales.store-103cb063.js';

const irHousekeepingCss = ".sc-ir-housekeeping-h{display:block}";

const IrHousekeeping = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
IrHousekeeping.style = irHousekeepingCss;

export { IrHousekeeping as ir_housekeeping };

//# sourceMappingURL=ir-housekeeping.entry.js.map