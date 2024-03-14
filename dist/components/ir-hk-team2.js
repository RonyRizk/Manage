import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { h as housekeeping_store } from './housekeeping.service.js';
import { l as locales } from './locales.store.js';
import { d as defineCustomElement$c } from './ir-button2.js';
import { d as defineCustomElement$b } from './ir-combobox2.js';
import { d as defineCustomElement$a } from './ir-delete-modal2.js';
import { d as defineCustomElement$9 } from './ir-hk-unassigned-units2.js';
import { d as defineCustomElement$8 } from './ir-hk-user2.js';
import { d as defineCustomElement$7 } from './ir-icon2.js';
import { d as defineCustomElement$6 } from './ir-input-text2.js';
import { d as defineCustomElement$5 } from './ir-phone-input2.js';
import { d as defineCustomElement$4 } from './ir-select2.js';
import { d as defineCustomElement$3 } from './ir-sidebar2.js';
import { d as defineCustomElement$2 } from './ir-switch2.js';
import { d as defineCustomElement$1 } from './ir-title2.js';

const irHkTeamCss = ".sc-ir-hk-team-h{display:block}th.sc-ir-hk-team,td.sc-ir-hk-team{text-align:left !important;width:fit-content !important}input.sc-ir-hk-team{border:none;margin:0;width:120px}input.sc-ir-hk-team:focus{outline:none}.table-container.sc-ir-hk-team{padding:10px 0;overflow-x:auto;max-width:100%;width:max-content}.table.sc-ir-hk-team,th.sc-ir-hk-team,td.sc-ir-hk-team{border-color:white !important}thead.sc-ir-hk-team{border:0 !important}table.sc-ir-hk-team{border:0 !important}.icons-container.sc-ir-hk-team{display:flex;align-items:center;justify-content:center;gap:4px}.text-center.sc-ir-hk-team{text-align:center !important}.assignments-container.sc-ir-hk-team,.unassigned-container.sc-ir-hk-team{display:flex;align-items:center}.gap-16.sc-ir-hk-team{gap:16px}.unassigned-container.sc-ir-hk-team{gap:4px}.justify-between.sc-ir-hk-team{justify-content:space-between;margin-bottom:10px}.assignments-container.sc-ir-hk-team p.sc-ir-hk-team,h4.sc-ir-hk-team{margin:0}.outline-btn.sc-ir-hk-team{background:white;border:1px solid var(--blue);color:var(--blue);border-radius:5px;font-size:12px;padding:1px 0.25rem !important;margin:0}.outline-btn.sc-ir-hk-team:hover{color:white;background:var(--blue)}@media only screen and (min-width: 900px){td.sc-ir-hk-team{min-width:140px !important;width:max-content !important}}@media only screen and (max-width: 900px){.table-container.sc-ir-hk-team{width:max-content !important}}";

var __rest = (undefined && undefined.__rest) || function (s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const IrHkTeam = /*@__PURE__*/ proxyCustomElement(class IrHkTeam extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.currentTrigger = null;
  }
  renderAssignedUnits(hk) {
    if (hk.assigned_units.length === 0) {
      return (h("span", null, "0 -", ' ', h("button", { class: "outline-btn", onClick: () => (this.currentTrigger = { type: 'unassigned_units', user: hk }) }, locales.entries.Lcz_Assign)));
    }
    return (h("span", null, hk.assigned_units.length, " -", ' ', h("button", { onClick: () => (this.currentTrigger = { type: 'unassigned_units', user: hk }), class: "outline-btn" }, locales.entries.Lcz_Edit)));
  }
  renderCurrentTrigger() {
    var _a;
    switch ((_a = this.currentTrigger) === null || _a === void 0 ? void 0 : _a.type) {
      case 'unassigned_units':
        return h("ir-hk-unassigned-units", { slot: "sidebar-body", user: this.currentTrigger.user });
      case 'user':
        return h("ir-hk-user", { slot: "sidebar-body", user: this.currentTrigger.user, isEdit: this.currentTrigger.isEdit });
      default:
        return null;
    }
  }
  handleCloseSideBar(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    this.currentTrigger = null;
  }
  handleDeletion(user) {
    this.currentTrigger = { type: 'delete', user };
    this.deletionTimout = setTimeout(() => {
      const modal = this.el.querySelector('ir-delete-modal');
      if (!modal)
        return;
      modal.openModal();
    }, 100);
  }
  disconnectedCallback() {
    clearTimeout(this.deletionTimout);
  }
  render() {
    var _a;
    const { assigned, total, un_assigned } = housekeeping_store.hk_criteria.units_assignments;
    return (h(Host, { class: "card p-1" }, h("section", null, h("ir-title", { label: locales.entries.Lcz_HousekeepingTeam, justifyContent: "space-between" }, h("div", { slot: "title-body", class: "assignments-container gap-16 m-0" }, h("p", { class: "font-weight-bold m-0 p-0" }, total, " ", locales.entries.Lcz_TotalUnits), h("p", { class: 'm-0 p-0' }, assigned, " ", h("span", null, locales.entries.Lcz_Assigned)), un_assigned > 0 && (h("button", { class: "outline-btn", onClick: () => (this.currentTrigger = { type: 'unassigned_units', user: null }) }, un_assigned, " ", locales.entries.Lcz_Unassigned)))), h("p", { class: 'm-0 p-0' }, locales.entries.Lcz_AsAnOption)), h("section", { class: "table-container" }, h("table", { class: "table" }, h("thead", null, h("tr", null, h("th", { class: "text-left" }, locales.entries.Lcz_Name), h("th", null, locales.entries.Lcz_Mobile), h("th", null, locales.entries.Lcz_Username), h("th", null, locales.entries.Lcz_Note), h("th", null, locales.entries.Lcz_UnitsAssigned), h("th", { class: "text-center" }, h("ir-icon", { title: locales.entries.Lcz_CreateHousekeeper, onIconClickHandler: () => {
        this.currentTrigger = {
          type: 'user',
          isEdit: false,
          user: null,
        };
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, h("path", { fill: "currentColor", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" })))))), h("tbody", null, housekeeping_store.hk_criteria.housekeepers.map(hk => (h("tr", { key: hk.id }, h("td", { class: "text-left" }, hk.name), h("td", null, hk.phone_prefix, " ", hk.mobile), h("td", null, hk.username), h("td", null, hk.note), h("td", null, this.renderAssignedUnits(hk)), h("td", { class: "text-center" }, h("div", { class: "icons-container" }, h("ir-icon", { title: locales.entries.Lcz_EditHousekeeper, onIconClickHandler: () => {
        const user = __rest(hk, ["assigned_units", "is_soft_deleted", "is_active"]);
        this.currentTrigger = {
          type: 'user',
          isEdit: true,
          user,
        };
      }, icon: "ft-save color-ir-light-blue-hover h5 pointer sm-margin-right" }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" }))), h("span", null, " \u00A0"), h("ir-icon", { title: locales.entries.Lcz_DeleteHousekeeper, icon: "ft-trash-2 danger h5 pointer", onIconClickHandler: () => this.handleDeletion(hk) }, h("svg", { slot: "icon", fill: "#ff2441", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "14.25", viewBox: "0 0 448 512" }, h("path", { d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" }))))))))))), h("ir-sidebar", { showCloseButton: false, open: this.currentTrigger !== null && this.currentTrigger.type !== 'delete', onIrSidebarToggle: () => (this.currentTrigger = null), style: {
        '--sidebar-width': this.currentTrigger ? (this.currentTrigger.type === 'unassigned_units' ? 'max-content' : '40rem') : 'max-content',
      } }, this.renderCurrentTrigger()), ((_a = this.currentTrigger) === null || _a === void 0 ? void 0 : _a.type) === 'delete' && h("ir-delete-modal", { user: this.currentTrigger.user })));
  }
  get el() { return this; }
  static get style() { return irHkTeamCss; }
}, [2, "ir-hk-team", {
    "currentTrigger": [32]
  }, [[0, "closeSideBar", "handleCloseSideBar"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-hk-team", "ir-button", "ir-combobox", "ir-delete-modal", "ir-hk-unassigned-units", "ir-hk-user", "ir-icon", "ir-input-text", "ir-phone-input", "ir-select", "ir-sidebar", "ir-switch", "ir-title"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-hk-team":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrHkTeam);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "ir-combobox":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "ir-delete-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "ir-hk-unassigned-units":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "ir-hk-user":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "ir-input-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-phone-input":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-sidebar":
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

export { IrHkTeam as I, defineCustomElement as d };

//# sourceMappingURL=ir-hk-team2.js.map