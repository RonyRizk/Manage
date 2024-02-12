import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const irIconCss = ".sc-ir-icon-h{margin:0;padding:0}.icon-button.sc-ir-icon{all:unset;margin:0;padding:0}.icon-button.sc-ir-icon:hover{cursor:pointer}";

const IrIcon = /*@__PURE__*/ proxyCustomElement(class IrIcon extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.iconClickHandler = createEvent(this, "iconClickHandler", 7);
    this.icon = 'ft-check';
  }
  render() {
    return (h("button", { class: "icon-button", onClick: () => this.iconClickHandler.emit() }, h("slot", { name: "icon" })));
  }
  static get style() { return irIconCss; }
}, [6, "ir-icon", {
    "icon": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-icon":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrIcon);
      }
      break;
  } });
}

export { IrIcon as I, defineCustomElement as d };

//# sourceMappingURL=ir-icon2.js.map