import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { H as HouseKeepingService, h as housekeeping_store } from './housekeeping.service.js';
import { l as locales } from './locales.store.js';
import { d as defineCustomElement$3 } from './ir-button2.js';
import { d as defineCustomElement$2 } from './ir-icon2.js';
import { d as defineCustomElement$1 } from './ir-select2.js';

const irDeleteModalCss = ".backdropModal.sc-ir-delete-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-delete-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-delete-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-delete-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-delete-modal{z-index:1001 !important}.modal-dialog.sc-ir-delete-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-delete-modal{gap:10px}.exit-icon.sc-ir-delete-modal{position:absolute;right:10px;top:5px;margin:0}.ir-modal.sc-ir-delete-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-delete-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";

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
const IrDeleteModal = /*@__PURE__*/ proxyCustomElement(class IrDeleteModal extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.modalClosed = createEvent(this, "modalClosed", 7);
    this.resetData = createEvent(this, "resetData", 7);
    this.housekeepingService = new HouseKeepingService();
    this.user = undefined;
    this.isOpen = false;
    this.selectedId = '';
    this.loadingBtn = null;
  }
  componentWillLoad() {
    this.housekeepingService.setToken(housekeeping_store.default_properties.token);
  }
  async closeModal() {
    this.isOpen = false;
    this.modalClosed.emit(null);
  }
  async openModal() {
    this.isOpen = true;
  }
  async btnClickHandler(event) {
    let target = event.target;
    let name = target.name;
    try {
      if (name === 'confirm') {
        this.loadingBtn = 'confirm';
        if (this.selectedId === '') {
          await this.housekeepingService.editExposedHKM(this.user, true);
        }
        else {
          const newAssignedUnits = this.user.assigned_units.map(u => ({ hkm_id: +this.selectedId, is_to_assign: true, unit_id: u.id }));
          await this.housekeepingService.manageExposedAssignedUnitToHKM(housekeeping_store.default_properties.property_id, newAssignedUnits);
          const _a = this.user, user = __rest(_a, ["assigned_units", "is_soft_deleted", "is_active"]);
          await this.housekeepingService.editExposedHKM(user, true);
        }
        this.resetData.emit(null);
      }
      if (name === 'cancel') {
        this.closeModal();
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      if (this.loadingBtn) {
        this.loadingBtn = null;
        this.closeModal();
      }
    }
  }
  render() {
    if (!this.user) {
      return null;
    }
    return [
      h("div", { class: `backdropModal ${this.isOpen ? 'active' : ''}`, onClick: () => {
          this.closeModal();
        } }),
      h("div", { "data-state": this.isOpen ? 'opened' : 'closed', class: `ir-modal`, tabindex: "-1" }, this.isOpen && (h("div", { class: `ir-alert-content p-2` }, h("div", { class: `ir-alert-header align-items-center border-0 py-0 m-0 ` }, h("p", { class: "p-0 my-0 mb-1" }, this.user.assigned_units.length > 0 ? locales.entries.Lcz_AssignUnitsTo : locales.entries.Lcz_ConfirmDeletion), h("ir-icon", { class: "exit-icon", style: { cursor: 'pointer' }, onClick: () => {
          this.closeModal();
        } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "10.5", viewBox: "0 0 384 512" }, h("path", { fill: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), this.user.assigned_units.length > 0 && (h("div", { class: "modal-body text-left p-0 mb-2" }, h("ir-select", { firstOption: locales.entries.Lcz_nobody, selectedValue: this.selectedId, onSelectChange: e => (this.selectedId = e.detail), LabelAvailable: false, data: housekeeping_store.hk_criteria.housekeepers
          .filter(hk => hk.id !== this.user.id)
          .map(m => ({
          value: m.id.toString(),
          text: m.name,
        })) }))), h("div", { class: `ir-alert-footer border-0 d-flex justify-content-end` }, h("ir-button", { icon: '', btn_color: 'secondary', btn_block: true, text: locales.entries.Lcz_Cancel, name: 'cancel' }), h("ir-button", { isLoading: this.loadingBtn === 'confirm', icon: '', btn_color: 'primary', btn_block: true, text: locales.entries.Lcz_Confirm, name: 'confirm' }))))),
    ];
  }
  static get style() { return irDeleteModalCss; }
}, [2, "ir-delete-modal", {
    "user": [16],
    "isOpen": [32],
    "selectedId": [32],
    "loadingBtn": [32],
    "closeModal": [64],
    "openModal": [64]
  }, [[0, "clickHanlder", "btnClickHandler"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-delete-modal", "ir-button", "ir-icon", "ir-select"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-delete-modal":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrDeleteModal);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrDeleteModal as I, defineCustomElement as d };

//# sourceMappingURL=ir-delete-modal2.js.map