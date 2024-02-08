import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './ir-button2.js';
import { d as defineCustomElement$1 } from './ir-icon2.js';

const irModalCss = ".backdropModal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active{cursor:pointer;opacity:1 !important;pointer-events:all}.modal{z-index:1001 !important}.modal-dialog{height:100vh;display:flex;align-items:center}.ir-modal{position:fixed;top:0;left:50%;z-index:1050;width:32rem;height:100%;overflow:hidden;outline:0;opacity:0;transform:translateY(-50%, -20%);transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none;}.ir-modal.active{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";

const IrModal = /*@__PURE__*/ proxyCustomElement(class IrModal extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.confirmModal = createEvent(this, "confirmModal", 7);
    this.cancelModal = createEvent(this, "cancelModal", 7);
    this.modalTitle = 'Modal Title';
    this.modalBody = 'Modal Body';
    this.rightBtnActive = true;
    this.leftBtnActive = true;
    this.rightBtnText = 'Confirm';
    this.leftBtnText = 'Close';
    this.rightBtnColor = 'primary';
    this.leftBtnColor = 'secondary';
    this.btnPosition = 'right';
    this.iconAvailable = false;
    this.icon = '';
    this.isOpen = false;
    this.item = {};
  }
  async closeModal() {
    this.isOpen = false;
  }
  async openModal() {
    this.isOpen = true;
  }
  btnClickHandler(event) {
    let target = event.target;
    let name = target.name;
    if (name === this.leftBtnText) {
      this.cancelModal.emit();
      this.item = {};
      this.closeModal();
    }
    else if (name === this.rightBtnText) {
      this.confirmModal.emit(this.item);
      this.item = {};
      this.closeModal();
    }
  }
  render() {
    return [
      h("div", { class: `backdropModal ${this.isOpen ? 'active' : ''}`, onClick: () => {
          this.closeModal();
        } }),
      h("div", { class: `ir-modal  ${this.isOpen ? 'active' : ''}`, tabindex: "-1" }, h("div", { class: "modal-dialog" }, h("div", { class: ` modal-content` }, h("div", { class: `modal-header align-items-center border-0 ` }, h("div", { class: "font-weight-bold d-flex align-items-center" }, this.iconAvailable && h("ir-icon", { class: "mr-1", icon: this.icon }), " ", this.modalBody), h("div", { class: "font-weight-bold d-flex align-items-center font-size-large" }, h("ir-icon", { icon: "ft-x", style: { cursor: 'pointer' }, onClick: () => {
          this.closeModal();
          this.cancelModal.emit();
        } }))), h("div", { class: `modal-footer border-0 d-flex justify-content-${this.btnPosition === 'center' ? 'center' : this.btnPosition === 'left' ? 'start' : 'end'}` }, this.leftBtnActive && h("ir-button", { icon: '', btn_color: this.leftBtnColor, btn_block: true, text: this.leftBtnText, name: this.leftBtnText }), this.rightBtnActive && h("ir-button", { icon: '', btn_color: this.rightBtnColor, btn_block: true, text: this.rightBtnText, name: this.rightBtnText }))))),
    ];
  }
  static get style() { return irModalCss; }
}, [0, "ir-modal", {
    "modalTitle": [1, "modal-title"],
    "modalBody": [1, "modal-body"],
    "rightBtnActive": [4, "right-btn-active"],
    "leftBtnActive": [4, "left-btn-active"],
    "rightBtnText": [1, "right-btn-text"],
    "leftBtnText": [1, "left-btn-text"],
    "rightBtnColor": [1, "right-btn-color"],
    "leftBtnColor": [1, "left-btn-color"],
    "btnPosition": [1, "btn-position"],
    "iconAvailable": [4, "icon-available"],
    "icon": [1],
    "item": [1032],
    "isOpen": [32],
    "closeModal": [64],
    "openModal": [64]
  }, [[0, "clickHanlder", "btnClickHandler"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-modal", "ir-button", "ir-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-modal":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrModal);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrModal as I, defineCustomElement as d };

//# sourceMappingURL=ir-modal2.js.map