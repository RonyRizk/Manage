import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { H as HouseKeepingService, h as housekeeping_store } from './housekeeping.service.js';
import { l as locales } from './locales.store.js';
import { d as defineCustomElement$3 } from './ir-icon2.js';
import { d as defineCustomElement$2 } from './ir-select2.js';
import { d as defineCustomElement$1 } from './ir-title2.js';

const irUnitStatusCss = ".sc-ir-unit-status-h{display:block}.circle.sc-ir-unit-status{display:inline-flex;border-radius:50%}.green.sc-ir-unit-status{background:#57f707}.red.sc-ir-unit-status{background:rgb(199, 139, 36)}.orange.sc-ir-unit-status{background:#ff9149}.table-container.sc-ir-unit-status{width:100%;overflow-x:auto}.black.sc-ir-unit-status{background:#ff4961}table.sc-ir-unit-status{width:max-content}td.sc-ir-unit-status{min-width:140px;text-align:center;height:2rem}.smallcircle.sc-ir-unit-status{height:7px;width:7px}.bigcircle.sc-ir-unit-status{height:7px;width:7px}.status-container.sc-ir-unit-status,.action-container.sc-ir-unit-status{display:flex;align-items:center;gap:8px}.status-container.sc-ir-unit-status p.sc-ir-unit-status{margin:0}";

const IrUnitStatus = /*@__PURE__*/ proxyCustomElement(class IrUnitStatus extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.resetData = createEvent(this, "resetData", 7);
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
  static get style() { return irUnitStatusCss; }
}, [2, "ir-unit-status"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-unit-status", "ir-icon", "ir-select", "ir-title"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-unit-status":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrUnitStatus);
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-select":
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

export { IrUnitStatus as I, defineCustomElement as d };

//# sourceMappingURL=ir-unit-status2.js.map