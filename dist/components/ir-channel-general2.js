import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const irChannelGeneralCss = ".sc-ir-channel-general-h{display:block}";

const IrChannelGeneral = /*@__PURE__*/ proxyCustomElement(class IrChannelGeneral extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return h(Host, null, "general");
  }
  static get style() { return irChannelGeneralCss; }
}, [2, "ir-channel-general"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-channel-general"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-channel-general":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannelGeneral);
      }
      break;
  } });
}

export { IrChannelGeneral as I, defineCustomElement as d };

//# sourceMappingURL=ir-channel-general2.js.map