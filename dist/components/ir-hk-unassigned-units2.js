import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { H as HouseKeepingService, h as housekeeping_store } from './housekeeping.service.js';
import { c as calendar_data } from './calendar-data.js';
import { i as isRequestPending } from './ir-interceptor.store.js';
import { d as defineCustomElement$5 } from './ir-button2.js';
import { d as defineCustomElement$4 } from './ir-icon2.js';
import { d as defineCustomElement$3 } from './ir-select2.js';
import { d as defineCustomElement$2 } from './ir-switch2.js';
import { d as defineCustomElement$1 } from './ir-title2.js';

const irHkUnassignedUnitsCss = ".sc-ir-hk-unassigned-units-h{display:block;--ir-root-active-color:#1e9ff2;--ir-root-inactive-color:#d2d2d2}table.sc-ir-hk-unassigned-units{width:100%}td.sc-ir-hk-unassigned-units{padding-top:3px;padding-bottom:3px}td.sc-ir-hk-unassigned-units:last-child{text-align:end}.title.sc-ir-hk-unassigned-units{min-width:230px !important}";

const IrHkUnassignedUnits = /*@__PURE__*/ proxyCustomElement(class IrHkUnassignedUnits extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.closeSideBar = createEvent(this, "closeSideBar", 7);
    this.resetData = createEvent(this, "resetData", 7);
    this.assignedUnits = new Map();
    this.housekeepingService = new HouseKeepingService();
    this.user = null;
    this.renderAgain = false;
  }
  componentWillLoad() {
    this.housekeepingService.setToken(housekeeping_store.default_properties.token);
  }
  assignUnit(unit_id, hk_id, checked) {
    if (this.user) {
      const userUnit = this.user.assigned_units.find(unit => unit.id === unit_id);
      if ((checked && userUnit) || (!checked && !userUnit)) {
        this.assignedUnits.delete(unit_id);
      }
      else if (!checked && userUnit) {
        this.assignedUnits.set(unit_id, { hkm_id: hk_id, is_to_assign: false, unit_id });
      }
      else if (checked) {
        const assignment = {
          hkm_id: hk_id,
          is_to_assign: true,
          unit_id,
        };
        this.assignedUnits.set(unit_id, assignment);
      }
    }
    else {
      if (this.assignedUnits.has(unit_id) && !hk_id) {
        this.assignedUnits.delete(unit_id);
        return;
      }
      else {
        this.assignedUnits.set(unit_id, {
          hkm_id: hk_id,
          is_to_assign: true,
          unit_id,
        });
      }
    }
    this.renderAgain = !this.renderAgain;
  }
  async assignUnits() {
    try {
      await this.housekeepingService.manageExposedAssignedUnitToHKM(housekeeping_store.default_properties.property_id, [...this.assignedUnits.values()]);
      this.resetData.emit(null);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.closeSideBar.emit(null);
    }
  }
  renderRooms() {
    var _a;
    if (!this.user) {
      return (_a = housekeeping_store.hk_criteria.units_assignments.unassigned_units) === null || _a === void 0 ? void 0 : _a.map(unit => (h("tr", { key: unit.id }, h("td", { class: "mr-2" }, unit.name), h("td", { class: "sr-only" }), h("td", null, h("ir-select", { onSelectChange: e => {
          let hk_id = e.detail;
          if (hk_id === '') {
            hk_id = null;
          }
          else {
            hk_id = +hk_id;
          }
          this.assignUnit(unit.id, hk_id, false);
        }, LabelAvailable: false, data: housekeeping_store.hk_criteria.housekeepers.map(hk => ({ text: hk.name, value: hk.id.toString() })) })))));
    }
    return calendar_data.roomsInfo.map(roomType => {
      var _a;
      if (!roomType.is_active) {
        return null;
      }
      return (_a = roomType.physicalrooms) === null || _a === void 0 ? void 0 : _a.map(physical_room => {
        var _a, _b, _c;
        let taken = !((_a = housekeeping_store.hk_criteria.units_assignments.unassigned_units) === null || _a === void 0 ? void 0 : _a.find(unit => unit.id === physical_room.id));
        let housekeeper = [];
        const assignedRoom = this.assignedUnits.get(physical_room.id);
        if (assignedRoom && assignedRoom.is_to_assign) {
          housekeeper = [this.user];
          taken = true;
        }
        else {
          if (taken) {
            housekeeper = housekeeping_store.hk_criteria.housekeepers.filter(hk => hk.assigned_units.find(unit => unit.id === physical_room.id));
          }
        }
        return (h("tr", { key: physical_room.id }, h("td", null, physical_room.name), h("td", null, taken ? (_b = housekeeper[0]) === null || _b === void 0 ? void 0 : _b.name : ''), h("td", null, h("ir-switch", { onCheckChange: e => {
            const checked = e.detail;
            this.assignUnit(physical_room.id, this.user.id, checked);
          }, checked: taken && ((_c = housekeeper[0]) === null || _c === void 0 ? void 0 : _c.id) === this.user.id }))));
      });
    });
  }
  render() {
    return (h(Host, null, h("ir-title", { class: "title px-1", displayContext: "sidebar", label: !this.user ? 'Assingn Units' : `Assignment for ${this.user.name}` }), h("section", { class: "px-1" }, h("table", null, h("thead", null, h("th", { class: "sr-only" }, "room name"), h("th", { class: "sr-only" }, "housekeeper name"), h("th", { class: "sr-only" }, "actions")), h("tbody", null, this.renderRooms())), h("div", { class: "d-flex flex-column flex-md-row align-items-md-center mt-2 w-100" }, h("ir-button", { onClickHanlder: () => this.closeSideBar.emit(null), class: "flex-fill", btn_styles: "w-100  justify-content-center align-items-center", btn_color: "secondary", text: 'Cancel' }), h("ir-button", { isLoading: isRequestPending('/Manage_Exposed_Assigned_Unit_To_HKM'), onClickHanlder: this.assignUnits.bind(this), class: "flex-fill ml-md-1", btn_styles: "w-100  justify-content-center align-items-center mt-1 mt-md-0", text: 'Confirm' })))));
  }
  static get style() { return irHkUnassignedUnitsCss; }
}, [2, "ir-hk-unassigned-units", {
    "user": [16],
    "renderAgain": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-hk-unassigned-units", "ir-button", "ir-icon", "ir-select", "ir-switch", "ir-title"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-hk-unassigned-units":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrHkUnassignedUnits);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-switch":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-title":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrHkUnassignedUnits as I, defineCustomElement as d };

//# sourceMappingURL=ir-hk-unassigned-units2.js.map