import { h } from "@stencil/core";
export class IrLoader {
  constructor() {
    this.size = 'md';
  }
  render() {
    return (h("div", { class: `lds-default ${this.size}` }, h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null)));
  }
  static get is() { return "ir-loader"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-loader.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-loader.css"]
    };
  }
  static get properties() {
    return {
      "size": {
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
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'md'"
      }
    };
  }
}
//# sourceMappingURL=ir-loader.js.map
