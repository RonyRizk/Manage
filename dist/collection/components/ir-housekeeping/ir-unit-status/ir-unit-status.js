import { HouseKeepingService } from "../../../../../src/services/housekeeping.service";
import housekeeping_store from "../../../../../src/stores/housekeeping.store";
import locales from "../../../../../src/stores/locales.store";
import { Host, h } from "@stencil/core";
export class IrUnitStatus {
  constructor() {
    this.housekeepingService = new HouseKeepingService();
  }
  componentWillLoad() {
    this.housekeepingService.setToken(housekeeping_store.default_properties.token);
  }
  async handleSelectChange(e) {
    try {
      e.stopPropagation();
      e.stopImmediatePropagation();
      const window = e.detail;
      let mode;
      if (window === '') {
        mode = {
          is_active: false,
          window: -1,
        };
      }
      else {
        mode = {
          is_active: true,
          window: +window,
        };
      }
      await this.housekeepingService.setExposedInspectionMode(housekeeping_store.default_properties.property_id, mode);
      this.resetData.emit(null);
    }
    catch (error) {
      console.error(error);
    }
  }
  render() {
    var _a;
    return (h(Host, { class: "card p-1" }, h("ir-title", { label: locales.entries.Lcz_RoomOrUnitStatus }), h("div", { class: "table-container" }, h("table", null, h("thead", null, h("tr", null, h("th", null, locales.entries.Lcz_Status), h("th", { class: 'text-center' }, locales.entries.Lcz_Code), h("th", null, locales.entries.Lcz_Action))), h("tbody", null, (_a = housekeeping_store.hk_criteria.statuses) === null || _a === void 0 ? void 0 : _a.map(status => {
      var _a;
      return (h("tr", { key: status.code }, h("td", null, h("div", { class: "status-container" }, h("span", { class: `circle ${status.style.shape} ${status.style.color}` }), h("p", null, status.description))), h("td", null, status.code), h("td", null, h("div", { class: "action-container" }, h("p", { class: 'm-0' }, status.action), status.code === 'VAC' && (h("div", null, h("ir-select", { selectedValue: status.inspection_mode.is_active ? (_a = status.inspection_mode) === null || _a === void 0 ? void 0 : _a.window.toString() : '', LabelAvailable: false, firstOption: locales.entries.Lcz_No, onSelectChange: this.handleSelectChange.bind(this), data: Array.from(Array(7 + 1), (_, i) => i).map(i => {
          const text = i === 0
            ? locales.entries.Lcz_YesOnTheSameDay
            : i === 1
              ? locales.entries.Lcz_DayPrior.replace('%1', i.toString())
              : locales.entries.Lcz_DaysPrior.replace('%1', i.toString());
          return {
            text,
            value: i.toString(),
          };
        }) })))))));
    }))))));
  }
  static get is() { return "ir-unit-status"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-unit-status.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-unit-status.css"]
    };
  }
  static get events() {
    return [{
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
//# sourceMappingURL=ir-unit-status.js.map
