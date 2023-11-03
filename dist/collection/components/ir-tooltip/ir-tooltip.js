import { Host, h } from "@stencil/core";
export class IrTooltip {
  constructor() {
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
  static get is() { return "ir-tooltip"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-tooltip.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-tooltip.css"]
    };
  }
  static get properties() {
    return {
      "message": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "message",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "open": {}
    };
  }
}
//# sourceMappingURL=ir-tooltip.js.map
