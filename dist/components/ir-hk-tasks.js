import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { H as HouseKeepingService, u as updateHKStore, h as housekeeping_store } from './housekeeping.service.js';
import { R as RoomService } from './room.service.js';
import { l as locales } from './locales.store.js';
import { a as axios } from './axios.js';
import { d as defineCustomElement$a } from './ir-button2.js';
import { d as defineCustomElement$9 } from './ir-checkbox2.js';
import { d as defineCustomElement$8 } from './ir-icon2.js';
import { d as defineCustomElement$7 } from './ir-interceptor2.js';
import { d as defineCustomElement$6 } from './ir-loading-screen2.js';
import { d as defineCustomElement$5 } from './ir-modal2.js';
import { d as defineCustomElement$4 } from './ir-select2.js';
import { d as defineCustomElement$3 } from './ir-title2.js';
import { d as defineCustomElement$2 } from './ir-toast2.js';

const irHkTasksCss = ".sc-ir-hk-tasks-h{display:block}.checkbox-container.sc-ir-hk-tasks{display:flex;align-items:center;justify-content:center}.table-container.sc-ir-hk-tasks{overflow-x:auto;max-width:100%;width:max-content}.table.sc-ir-hk-tasks,th.sc-ir-hk-tasks,td.sc-ir-hk-tasks{border-color:white !important}.select-container.sc-ir-hk-tasks{max-width:500px}@media only screen and (min-width: 900px){td.sc-ir-hk-tasks{min-width:140px !important;width:max-content !important}}@media only screen and (max-width: 900px){td.sc-ir-hk-tasks{min-width:100px !important}.table-container.sc-ir-hk-tasks{width:max-content !important}}";

const IrHkTasks$1 = /*@__PURE__*/ proxyCustomElement(class IrHkTasks extends HTMLElement {
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
    this.selectedDuration = '';
    this.selectedHouseKeeper = '0';
    this.selectedRoom = null;
    this.archiveOpened = false;
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
    const { arrival, arrival_time, housekeeper, unit, status } = this.selectedRoom;
    this.houseKeepingService.executeHKAction({
      property_id: this.propertyid,
      arrival,
      arrival_time,
      housekeeper: {
        id: housekeeper.id,
      },
      status: {
        code: status.code,
      },
      unit: {
        id: unit.id,
      },
    });
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
  handleCheckChange(e, action) {
    if (e.detail) {
      this.selectedRoom = action;
      this.modalOpenTimeOut = setTimeout(() => {
        const modal = this.el.querySelector('ir-modal');
        if (modal) {
          modal.openModal();
        }
      }, 50);
    }
  }
  handleCloseSidebar(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    this.archiveOpened = false;
  }
  disconnectedCallback() {
    if (this.modalOpenTimeOut) {
      clearTimeout(this.modalOpenTimeOut);
    }
  }
  async getPendingActions() {
    await this.houseKeepingService.getHKPendingActions({
      property_id: this.propertyid,
      bracket: {
        code: this.selectedDuration,
      },
      housekeeper: {
        id: +this.selectedHouseKeeper,
      },
    });
  }
  async initializeApp() {
    try {
      this.isLoading = true;
      await Promise.all([
        this.houseKeepingService.getExposedHKStatusCriteria(this.propertyid),
        this.roomService.fetchData(this.propertyid, this.language),
        this.roomService.fetchLanguage(this.language, ['_HK_FRONT']),
      ]);
      this.selectedDuration = housekeeping_store.hk_tasks.brackets[0].code;
      await this.getPendingActions();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  async handleConfirm(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    try {
      await this.getPendingActions();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.selectedRoom = null;
    }
  }
  render() {
    var _a;
    if (this.isLoading) {
      return h("ir-loading-screen", null);
    }
    return (h(Host, null, h("ir-toast", null), h("ir-interceptor", null), h("section", { class: "p-2" }, h("ir-title", { class: "d-none d-md-flex", label: locales.entries.Lcz_HousekeepingTasks, justifyContent: "space-between" }, h("ir-button", { slot: "title-body", text: locales.entries.Lcz_Archive, size: "sm" })), h("div", { class: "d-flex align-items-center mb-2 justify-content-between d-md-none" }, h("ir-title", { class: "mb-0", label: locales.entries.Lcz_HousekeepingTasks, justifyContent: "space-between" }), h("ir-button", { slot: "title-body", text: locales.entries.Lcz_Archive, size: "sm", onClickHanlder: () => (this.archiveOpened = true) })), h("div", { class: "d-flex flex-column flex-sm-row align-items-center mb-1  select-container" }, h("ir-select", { selectedValue: this.selectedDuration, onSelectChange: e => {
        this.selectedDuration = e.detail;
        this.getPendingActions();
      }, data: housekeeping_store.hk_tasks.brackets.map(bracket => ({
        text: bracket.description,
        value: bracket.code,
      })), class: "mb-1 w-100 mb-sm-0", showFirstOption: false, LabelAvailable: false }), h("ir-select", { onSelectChange: e => {
        this.selectedHouseKeeper = e.detail;
        this.getPendingActions();
      }, selectedValue: this.selectedHouseKeeper, data: [
        { text: 'All housekeepers', value: '0' },
        ...housekeeping_store.hk_tasks.housekeepers.map(bracket => ({
          text: bracket.name,
          value: bracket.id.toString(),
        })),
      ], showFirstOption: false, LabelAvailable: false, class: "ml-sm-2 w-100" })), h("div", { class: "card p-1" }, h("div", { class: "table-container" }, h("table", { class: "table" }, h("thead", null, h("tr", null, h("th", { class: "text-left" }, locales.entries.Lcz_Unit), h("th", { class: "text-left" }, locales.entries.Lcz_Status), h("th", { class: "text-left" }, locales.entries.Lcz_Arrivaldate), h("th", { class: "text-left" }, locales.entries.Lcz_ArrivalTime), h("th", { class: "text-left" }, locales.entries.Lcz_Housekeeper), h("th", { class: "text-center" }, locales.entries.Lcz_Done))), h("tbody", null, (_a = housekeeping_store.pending_housekeepers) === null || _a === void 0 ? void 0 : _a.map(action => {
      var _a;
      return (h("tr", { key: action.housekeeper.id }, h("td", { class: "text-left" }, action.unit.name), h("td", { class: "text-left" }, action.status.description), h("td", { class: "text-left" }, action.arrival), h("td", { class: "text-left" }, action.arrival_time), h("td", { class: "text-left" }, action.housekeeper.name), h("td", null, h("div", { class: "checkbox-container" }, h("ir-checkbox", { onCheckChange: e => this.handleCheckChange(e, action), checked: ((_a = this.selectedRoom) === null || _a === void 0 ? void 0 : _a.unit.id) === action.unit.id })))));
    })))))), this.selectedRoom && (h("ir-modal", { leftBtnText: locales.entries.Lcz_No, rightBtnText: locales.entries.Lcz_Yes, onConfirmModal: this.handleConfirm.bind(this), onCancelModal: () => (this.selectedRoom = null), modalBody: `Is ${this.selectedRoom.unit.name} cleaned?` }))));
  }
  get el() { return this; }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
  static get style() { return irHkTasksCss; }
}, [2, "ir-hk-tasks", {
    "language": [1],
    "ticket": [1],
    "baseurl": [1],
    "propertyid": [2],
    "isLoading": [32],
    "selectedDuration": [32],
    "selectedHouseKeeper": [32],
    "selectedRoom": [32],
    "archiveOpened": [32]
  }, [[0, "resetData", "handleResetData"], [0, "closeSideBar", "handleCloseSidebar"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-hk-tasks", "ir-button", "ir-checkbox", "ir-icon", "ir-interceptor", "ir-loading-screen", "ir-modal", "ir-select", "ir-title", "ir-toast"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-hk-tasks":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrHkTasks$1);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "ir-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "ir-interceptor":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "ir-loading-screen":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-title":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-toast":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const IrHkTasks = IrHkTasks$1;
const defineCustomElement = defineCustomElement$1;

export { IrHkTasks, defineCustomElement };

//# sourceMappingURL=ir-hk-tasks.js.map