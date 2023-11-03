import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const IrIcon = /*@__PURE__*/ proxyCustomElement(class IrIcon extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.iconClickHandler = createEvent(this, "iconClickHandler", 7);
    this.icon = 'ft-check';
  }
  render() {
    return (h("i", { onClick: () => {
        this.iconClickHandler.emit();
      }, class: this.icon }));
  }
}, [0, "ir-icon", {
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