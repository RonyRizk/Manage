import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$3 } from './ir-input-text2.js';
import { d as defineCustomElement$2 } from './ir-select2.js';

const irPickupCss = ".sc-ir-pickup-h{display:block}";

const IrPickup$1 = /*@__PURE__*/ proxyCustomElement(class IrPickup extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return (h(Host, { class: 'card mt-1 p-1' }, h("section", { class: 'd-flex align-items-center' }, h("h4", { class: 'm-0 p-0' }, "Pickup"), h("ir-select", { class: 'm-0', LabelAvailable: false, data: [
        {
          text: 'helo',
          value: 'helklo',
        },
      ] }), h("ir-select", { class: 'm-0', label: "Arrival date", data: [
        {
          text: 'helo',
          value: 'helklo',
        },
      ] }), h("ir-input-text", { label: "Time" }))));
  }
  static get style() { return irPickupCss; }
}, [2, "ir-pickup"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-pickup", "ir-input-text", "ir-select"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-pickup":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrPickup$1);
      }
      break;
    case "ir-input-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const IrPickup = IrPickup$1;
const defineCustomElement = defineCustomElement$1;

export { IrPickup, defineCustomElement };

//# sourceMappingURL=ir-pickup.js.map