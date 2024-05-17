'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const housekeeping_service = require('./housekeeping.service-4450f5c3.js');
const room_service = require('./room.service-1b668437.js');
const locales_store = require('./locales.store-8fed15eb.js');
const axios = require('./axios-77201e24.js');
require('./index-797ee4c0.js');
require('./calendar-data-0a2c60be.js');

const irHkTasksCss = ".sc-ir-hk-tasks-h{display:block}.checkbox-container.sc-ir-hk-tasks{display:flex;align-items:center;justify-content:center}.table-container.sc-ir-hk-tasks{overflow-x:auto;max-width:100%;width:max-content}.table.sc-ir-hk-tasks,th.sc-ir-hk-tasks,td.sc-ir-hk-tasks{border-color:white !important}.select-container.sc-ir-hk-tasks{max-width:500px}@media only screen and (min-width: 900px){td.sc-ir-hk-tasks{min-width:140px !important;width:max-content !important}}@media only screen and (max-width: 900px){td.sc-ir-hk-tasks{min-width:100px !important}.table-container.sc-ir-hk-tasks{width:max-content !important}}";

const IrHkTasks = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.roomService = new room_service.RoomService();
    this.houseKeepingService = new housekeeping_service.HouseKeepingService();
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
      axios.axios.defaults.baseURL = this.baseurl;
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
      housekeeping_service.updateHKStore('default_properties', { token: this.ticket, property_id: this.propertyid, language: this.language });
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
      this.selectedDuration = housekeeping_service.housekeeping_store.hk_tasks.brackets[0].code;
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
      return index.h("ir-loading-screen", null);
    }
    return (index.h(index.Host, null, index.h("ir-toast", null), index.h("ir-interceptor", null), index.h("section", { class: "p-2" }, index.h("ir-title", { class: "d-none d-md-flex", label: locales_store.locales.entries.Lcz_HousekeepingTasks, justifyContent: "space-between" }, index.h("ir-button", { slot: "title-body", text: locales_store.locales.entries.Lcz_Archive, size: "sm" })), index.h("div", { class: "d-flex align-items-center mb-2 justify-content-between d-md-none" }, index.h("ir-title", { class: "mb-0", label: locales_store.locales.entries.Lcz_HousekeepingTasks, justifyContent: "space-between" }), index.h("ir-button", { slot: "title-body", text: locales_store.locales.entries.Lcz_Archive, size: "sm", onClickHanlder: () => (this.archiveOpened = true) })), index.h("div", { class: "d-flex flex-column flex-sm-row align-items-center mb-1  select-container" }, index.h("ir-select", { selectedValue: this.selectedDuration, onSelectChange: e => {
        this.selectedDuration = e.detail;
        this.getPendingActions();
      }, data: housekeeping_service.housekeeping_store.hk_tasks.brackets.map(bracket => ({
        text: bracket.description,
        value: bracket.code,
      })), class: "mb-1 w-100 mb-sm-0", showFirstOption: false, LabelAvailable: false }), index.h("ir-select", { onSelectChange: e => {
        this.selectedHouseKeeper = e.detail;
        this.getPendingActions();
      }, selectedValue: this.selectedHouseKeeper, data: [
        { text: 'All housekeepers', value: '0' },
        ...housekeeping_service.housekeeping_store.hk_tasks.housekeepers.map(bracket => ({
          text: bracket.name,
          value: bracket.id.toString(),
        })),
      ], showFirstOption: false, LabelAvailable: false, class: "ml-sm-2 w-100" })), index.h("div", { class: "card p-1" }, index.h("div", { class: "table-container" }, index.h("table", { class: "table" }, index.h("thead", null, index.h("tr", null, index.h("th", { class: "text-left" }, locales_store.locales.entries.Lcz_Unit), index.h("th", { class: "text-left" }, locales_store.locales.entries.Lcz_Status), index.h("th", { class: "text-left" }, locales_store.locales.entries.Lcz_Arrivaldate), index.h("th", { class: "text-left" }, locales_store.locales.entries.Lcz_ArrivalTime), index.h("th", { class: "text-left" }, locales_store.locales.entries.Lcz_Housekeeper), index.h("th", { class: "text-center" }, locales_store.locales.entries.Lcz_Done))), index.h("tbody", null, (_a = housekeeping_service.housekeeping_store.pending_housekeepers) === null || _a === void 0 ? void 0 : _a.map(action => {
      var _a;
      return (index.h("tr", { key: action.housekeeper.id }, index.h("td", { class: "text-left" }, action.unit.name), index.h("td", { class: "text-left" }, action.status.description), index.h("td", { class: "text-left" }, action.arrival), index.h("td", { class: "text-left" }, action.arrival_time), index.h("td", { class: "text-left" }, action.housekeeper.name), index.h("td", null, index.h("div", { class: "checkbox-container" }, index.h("ir-checkbox", { onCheckChange: e => this.handleCheckChange(e, action), checked: ((_a = this.selectedRoom) === null || _a === void 0 ? void 0 : _a.unit.id) === action.unit.id })))));
    })))))), this.selectedRoom && (index.h("ir-modal", { leftBtnText: locales_store.locales.entries.Lcz_No, rightBtnText: locales_store.locales.entries.Lcz_Yes, onConfirmModal: this.handleConfirm.bind(this), onCancelModal: () => (this.selectedRoom = null), modalBody: `Is ${this.selectedRoom.unit.name} cleaned?` }))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrHkTasks.style = irHkTasksCss;

exports.ir_hk_tasks = IrHkTasks;

//# sourceMappingURL=ir-hk-tasks.cjs.entry.js.map