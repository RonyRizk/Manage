import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const irTooltipCss = ".sc-ir-tooltip-h{position:relative}.tooltip-icon.sc-ir-tooltip{margin:0 5px;padding:0}";

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
    return (h(Host, { class: "m-0 p-0" }, h("span", { onMouseEnter: () => this.toggleOpen(true), onMouseLeave: () => this.toggleOpen(false) }, h("svg", { "data-toggle": "tooltip", "data-placement": "top", "data-original-title": "Info popup", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16", class: "tooltip-icon", viewBox: "0 0 512 512" }, h("path", { fill: "#6b6f82", d: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" }))), this.open && (h("div", { class: "tooltip bottom show position-absolute", role: "tooltip" }, h("div", { class: "tooltip-arrow" }), h("div", { class: "tooltip-inner fit" }, h("span", { innerHTML: this.message }))))));
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