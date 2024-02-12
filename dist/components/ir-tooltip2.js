import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const irTooltipCss = ".sc-ir-tooltip-h{position:relative}";

const IrTooltip = /*@__PURE__*/ proxyCustomElement(class IrTooltip extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.message = undefined;
    this.open = undefined;
  }
  toggleOpen(shouldOpen) {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
    if (shouldOpen) {
      this.tooltipTimeout = setTimeout(() => {
        this.open = true;
      }, 300);
    }
    else {
      this.open = false;
    }
  }
  render() {
    return (h(Host, null, h("span", { onMouseEnter: () => this.toggleOpen(true), onMouseLeave: () => this.toggleOpen(false) }, h("i", { class: "ml-1 ft-info", "data-toggle": "tooltip", "data-placement": "top", "data-original-title": "Info popup" })), this.open && (h("div", { class: "tooltip bottom show position-absolute", role: "tooltip" }, h("div", { class: "tooltip-arrow" }), h("div", { class: "tooltip-inner fit" }, h("i", { class: "tooltip-top-demo" }), h("span", { innerHTML: this.message }))))));
  }
  static get style() { return irTooltipCss; }
}, [2, "ir-tooltip", {
    "message": [513],
    "open": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-tooltip"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-tooltip":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrTooltip);
      }
      break;
  } });
}

export { IrTooltip as I, defineCustomElement as d };

//# sourceMappingURL=ir-tooltip2.js.map