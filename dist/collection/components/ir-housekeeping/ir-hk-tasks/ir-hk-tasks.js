import { HouseKeepingService } from "../../../../../src/services/housekeeping.service";
import { RoomService } from "../../../../../src/services/room.service";
import housekeeping_store, { updateHKStore } from "../../../../../src/stores/housekeeping.store";
import locales from "../../../../../src/stores/locales.store";
import { Host, h } from "@stencil/core";
import axios from "axios";
export class IrHkTasks {
  constructor() {
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
  static get is() { return "ir-hk-tasks"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-hk-tasks.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-hk-tasks.css"]
    };
  }
  static get properties() {
    return {
      "language": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "language",
        "reflect": false,
        "defaultValue": "''"
      },
      "ticket": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "ticket",
        "reflect": false,
        "defaultValue": "''"
      },
      "baseurl": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "baseurl",
        "reflect": false,
        "defaultValue": "''"
      },
      "propertyid": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "propertyid",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isLoading": {},
      "selectedDuration": {},
      "selectedHouseKeeper": {},
      "selectedRoom": {},
      "archiveOpened": {}
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "ticket",
        "methodName": "ticketChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "resetData",
        "method": "handleResetData",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "closeSideBar",
        "method": "handleCloseSidebar",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-hk-tasks.js.map
