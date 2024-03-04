import { r as registerInstance, h, H as Host } from './index-2fc15efd.js';
import { T as Token, a as axios } from './Token-2955ce2c.js';
import { R as RoomService } from './room.service-53e484d3.js';
import { c as createStore } from './locales.store-15011fa2.js';
import './calendar-data-7d89fa9d.js';

class HouseKeepingService extends Token {
  async getExposedHKSetup(property_id) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await axios.post(`/Get_Exposed_HK_Setup?Ticket=${token}`, {
      property_id,
    });
    return data['My_Result'];
  }
  async setExposedInspectionMode(property_id, mode) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await axios.post(`/Set_Exposed_Inspection_Mode?Ticket=${token}`, {
      property_id,
      mode,
    });
    return data['My_Result'];
  }
}

const initialValue = {
  token: '',
};
const { state: housekeeping_store } = createStore(initialValue);

const irHousekeepingCss = ".sc-ir-housekeeping-h{display:block}.circle.sc-ir-housekeeping{display:inline-flex;border-radius:50%}.green.sc-ir-housekeeping{background:#629a4c}.red.sc-ir-housekeeping{background:#ff4961}.orange.sc-ir-housekeeping{background:#ff9149}.black.sc-ir-housekeeping{background:#000}.smallcircle.sc-ir-housekeeping{height:7px;width:7px}.bigcircle.sc-ir-housekeeping{height:7px;width:7px}.status-container.sc-ir-housekeeping,.action-container.sc-ir-housekeeping{display:flex;align-items:center;gap:8px}.status-container.sc-ir-housekeeping p.sc-ir-housekeeping{margin:0}";

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
    this.exposedHouseKeepingStatuses = undefined;
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
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
      return h("ir-loading-screen", null);
    }
    return (h(Host, null, h("ir-interceptor", null), h("ir-toast", null), h("section", { class: "p-1" }, h("div", { class: "card p-1" }, h("h4", null, "Room or Unit Status"), h("table", null, h("thead", null, h("tr", null, h("th", null, "Status"), h("th", null, "Code"), h("th", null, "Action"))), h("tbody", null, (_a = this.exposedHouseKeepingStatuses) === null || _a === void 0 ? void 0 : _a.map(status => {
      var _a;
      return (h("tr", { key: status.code }, h("td", null, h("div", { class: "status-container" }, h("span", { class: `circle ${status.style.shape} ${status.style.color}` }), h("p", null, status.description))), h("td", null, status.code), h("td", null, h("div", { class: "action-container" }, h("p", { class: 'm-0' }, status.action), ((_a = status.inspection_mode) === null || _a === void 0 ? void 0 : _a.is_active) && (h("div", null, h("ir-select", { LabelAvailable: false, firstOption: "No", data: Array.from(Array(status.inspection_mode.window + 1), (_, i) => i).map(i => {
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

export { IrHousekeeping as ir_housekeeping };

//# sourceMappingURL=ir-housekeeping.entry.js.map