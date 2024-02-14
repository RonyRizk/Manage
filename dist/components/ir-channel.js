import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const irChannelCss = ".sc-ir-channel-h{display:block}";

const IrChannel$1 = /*@__PURE__*/ proxyCustomElement(class IrChannel extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  static get style() { return irChannelCss; }
}, [6, "ir-channel"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-channel"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-channel":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannel$1);
      }
      break;
  } });
}

const IrChannel = IrChannel$1;
const defineCustomElement = defineCustomElement$1;

export { IrChannel, defineCustomElement };

//# sourceMappingURL=ir-channel.js.map