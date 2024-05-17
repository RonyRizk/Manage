import { r as registerInstance, h, H as Host } from './index-2fc15efd.js';

const irTooltipCss = ".sc-ir-tooltip-h{position:relative}.tooltip-icon.sc-ir-tooltip{margin:0 5px;padding:0}.tooltip-inner-custom.sc-ir-tooltip{min-width:max-content !important}";

const IrTooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.message = undefined;
    this.withHtml = true;
    this.customSlot = false;
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
    return (h(Host, { class: "m-0 p-0" }, h("span", { onMouseEnter: () => this.toggleOpen(true), onMouseLeave: () => this.toggleOpen(false) }, !this.customSlot ? (h("svg", { "data-toggle": "tooltip", "data-placement": "top", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16", class: "tooltip-icon", viewBox: "0 0 512 512" }, h("path", { fill: "#6b6f82", d: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" }))) : (h("slot", { name: "tooltip-trigger" }))), this.open && (h("div", { class: "tooltip bottom show position-absolute", role: "tooltip" }, h("div", { class: "tooltip-arrow" }), h("div", { class: `tooltip-inner fit ${this.customSlot && 'tooltip-inner-custom'}` }, h("span", { innerHTML: this.message }))))));
  }
};
IrTooltip.style = irTooltipCss;

export { IrTooltip as ir_tooltip };

//# sourceMappingURL=ir-tooltip.entry.js.map