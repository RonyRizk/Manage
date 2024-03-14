import { HouseKeepingService } from "../../../../../src/services/housekeeping.service";
import calendar_data from "../../../../../src/stores/calendar-data";
import housekeeping_store from "../../../../../src/stores/housekeeping.store";
import { isRequestPending } from "../../../../../src/stores/ir-interceptor.store";
import { Host, h } from "@stencil/core";
export class IrHkUnassignedUnits {
  constructor() {
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
  static get is() { return "ir-hk-unassigned-units"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-hk-unassigned-units.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-hk-unassigned-units.css"]
    };
  }
  static get properties() {
    return {
      "user": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHouseKeepers | null",
          "resolved": "IHouseKeepers",
          "references": {
            "IHouseKeepers": {
              "location": "import",
              "path": "@/models/housekeeping",
              "id": "src/models/housekeeping.ts::IHouseKeepers"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "null"
      }
    };
  }
  static get states() {
    return {
      "renderAgain": {}
    };
  }
  static get events() {
    return [{
        "method": "closeSideBar",
        "name": "closeSideBar",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }, {
        "method": "resetData",
        "name": "resetData",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=ir-hk-unassigned-units.js.map
