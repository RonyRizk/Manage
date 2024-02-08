import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const IrSpan$1 = /*@__PURE__*/ proxyCustomElement(class IrSpan extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.text = undefined;
  }
  connectedCallback() { }
  disconnectedCallback() { }
  render() {
    return (h("span", null, this.text));
  }
}, [0, "ir-span", {
    "text": [8]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-span"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-span":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrSpan$1);
      }
      break;
  } });
}

const IrSpan = IrSpan$1;
const defineCustomElement = defineCustomElement$1;

export { IrSpan, defineCustomElement };

//# sourceMappingURL=ir-span.js.map