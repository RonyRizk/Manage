'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const housekeeping_service = require('./housekeeping.service-8abdb383.js');
const room_service = require('./room.service-d36aca05.js');
const Token = require('./Token-7fd57fe8.js');
require('./index-797ee4c0.js');
require('./calendar-data-0a2c60be.js');
require('./locales.store-8fed15eb.js');

const irHousekeepingCss = ".sc-ir-housekeeping-h{display:block}";

const IrHousekeeping = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.roomService = new room_service.RoomService();
    this.houseKeepingService = new housekeeping_service.HouseKeepingService();
    this.language = '';
    this.ticket = '';
    this.baseurl = '';
    this.propertyid = undefined;
    this.isLoading = false;
  }
  componentWillLoad() {
    if (this.baseurl) {
      Token.axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.roomService.setToken(this.ticket);
      this.houseKeepingService.setToken(this.ticket);
      housekeeping_service.updateHKStore('default_properties', { token: this.ticket, property_id: this.propertyid, language: this.language });
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
      housekeeping_service.updateHKStore('default_properties', { token: this.ticket, property_id: this.propertyid, language: this.language });
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
      return index.h("ir-loading-screen", null);
    }
    return (index.h(index.Host, null, index.h("ir-interceptor", null), index.h("ir-toast", null), index.h("section", { class: "p-1" }, index.h("ir-unit-status", { class: "mb-1" }), index.h("ir-hk-team", { class: "mb-1" }))));
  }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrHousekeeping.style = irHousekeepingCss;

exports.ir_housekeeping = IrHousekeeping;

//# sourceMappingURL=ir-housekeeping.cjs.entry.js.map