import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const irLoaderCss = ".lds-default.xs{scale:0.25}.lds-default.sm{scale:0.5}.lds-default.md{scale:1}.lds-default.lg{scale:1.5}.lds-default{display:inline-block;position:relative;width:80px;height:80px}.lds-default div{position:absolute;width:6px;height:6px;background:#000;border-radius:50%;animation:lds-default 1.2s linear infinite}.lds-default div:nth-child(1){animation-delay:0s;top:37px;left:66px}.lds-default div:nth-child(2){animation-delay:-0.1s;top:22px;left:62px}.lds-default div:nth-child(3){animation-delay:-0.2s;top:11px;left:52px}.lds-default div:nth-child(4){animation-delay:-0.3s;top:7px;left:37px}.lds-default div:nth-child(5){animation-delay:-0.4s;top:11px;left:22px}.lds-default div:nth-child(6){animation-delay:-0.5s;top:22px;left:11px}.lds-default div:nth-child(7){animation-delay:-0.6s;top:37px;left:7px}.lds-default div:nth-child(8){animation-delay:-0.7s;top:52px;left:11px}.lds-default div:nth-child(9){animation-delay:-0.8s;top:62px;left:22px}.lds-default div:nth-child(10){animation-delay:-0.9s;top:66px;left:37px}.lds-default div:nth-child(11){animation-delay:-1s;top:62px;left:52px}.lds-default div:nth-child(12){animation-delay:-1.1s;top:52px;left:62px}@keyframes lds-default{0%,20%,80%,100%{transform:scale(1)}50%{transform:scale(1.5)}}";

const IrLoader$1 = /*@__PURE__*/ proxyCustomElement(class IrLoader extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.size = 'md';
  }
  render() {
    return (h("div", { class: `lds-default ${this.size}` }, h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null)));
  }
  static get style() { return irLoaderCss; }
}, [0, "ir-loader", {
    "size": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-loader"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-loader":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrLoader$1);
      }
      break;
  } });
}

const IrLoader = IrLoader$1;
const defineCustomElement = defineCustomElement$1;

export { IrLoader, defineCustomElement };

//# sourceMappingURL=ir-loader.js.map