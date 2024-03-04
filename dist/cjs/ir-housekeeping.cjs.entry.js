'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const Token = require('./Token-7fd57fe8.js');
const room_service = require('./room.service-844758c4.js');
const locales_store = require('./locales.store-0567c122.js');
require('./calendar-data-d3bf3294.js');

class HouseKeepingService extends Token.Token {
  async getExposedHKSetup(property_id) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await Token.axios.post(`/Get_Exposed_HK_Setup?Ticket=${token}`, {
      property_id,
    });
    return data['My_Result'];
  }
  async setExposedInspectionMode(property_id, mode) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await Token.axios.post(`/Set_Exposed_Inspection_Mode?Ticket=${token}`, {
      property_id,
      mode,
    });
    return data['My_Result'];
  }
}

const initialValue = {
  token: '',
};
const { state: housekeeping_store } = locales_store.createStore(initialValue);

const irHousekeepingCss = ".sc-ir-housekeeping-h{display:block}.circle.sc-ir-housekeeping{display:inline-flex;border-radius:50%}.green.sc-ir-housekeeping{background:#629a4c}.red.sc-ir-housekeeping{background:#ff4961}.orange.sc-ir-housekeeping{background:#ff9149}.black.sc-ir-housekeeping{background:#000}.smallcircle.sc-ir-housekeeping{height:7px;width:7px}.bigcircle.sc-ir-housekeeping{height:7px;width:7px}.status-container.sc-ir-housekeeping,.action-container.sc-ir-housekeeping{display:flex;align-items:center;gap:8px}.status-container.sc-ir-housekeeping p.sc-ir-housekeeping{margin:0}";

const IrHousekeeping = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.roomService = new room_service.RoomService();
    this.houseKeepingService = new HouseKeepingService();
    this.language = '';
    this.ticket = '';
    this.baseurl = '';
    this.propertyid = undefined;
    this.isLoading = false;
    this.exposedHouseKeepingStatuses = undefined;
  }
  componentWillLoad() {
    if (this.baseurl) {
      Token.axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.roomService.setToken(this.ticket);
      this.houseKeepingService.setToken(this.ticket);
      housekeeping_store.token = this.ticket;
      this.initializeApp();
    }
  }
  async ticketChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.roomService.setToken(this.ticket);
      this.houseKeepingService.setToken(this.ticket);
      housekeeping_store.token = this.ticket;
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      this.isLoading = true;
      const [housekeeping] = await Promise.all([this.houseKeepingService.getExposedHKSetup(this.propertyid)]);
      this.exposedHouseKeepingStatuses = housekeeping.statuses;
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  render() {
    var _a;
    if (this.isLoading) {
      return index.h("ir-loading-screen", null);
    }
    return (index.h(index.Host, null, index.h("ir-interceptor", null), index.h("ir-toast", null), index.h("section", { class: "p-1" }, index.h("div", { class: "card p-1" }, index.h("h4", null, "Room or Unit Status"), index.h("table", null, index.h("thead", null, index.h("tr", null, index.h("th", null, "Status"), index.h("th", null, "Code"), index.h("th", null, "Action"))), index.h("tbody", null, (_a = this.exposedHouseKeepingStatuses) === null || _a === void 0 ? void 0 : _a.map(status => {
      var _a;
      return (index.h("tr", { key: status.code }, index.h("td", null, index.h("div", { class: "status-container" }, index.h("span", { class: `circle ${status.style.shape} ${status.style.color}` }), index.h("p", null, status.description))), index.h("td", null, status.code), index.h("td", null, index.h("div", { class: "action-container" }, index.h("p", { class: 'm-0' }, status.action), ((_a = status.inspection_mode) === null || _a === void 0 ? void 0 : _a.is_active) && (index.h("div", null, index.h("ir-select", { LabelAvailable: false, firstOption: "No", data: Array.from(Array(status.inspection_mode.window + 1), (_, i) => i).map(i => {
          const text = i === 0 ? 'Yes on the same day.' : i.toString() + ' day prior.';
          return {
            text,
            value: i.toString(),
          };
        }) })))))));
    })))))));
  }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrHousekeeping.style = irHousekeepingCss;

exports.ir_housekeeping = IrHousekeeping;

//# sourceMappingURL=ir-housekeeping.cjs.entry.js.map