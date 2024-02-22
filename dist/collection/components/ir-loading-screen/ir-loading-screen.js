import { Host, h } from "@stencil/core";
export class IrLoadingScreen {
  constructor() {
    this.message = '';
  }
  render() {
    return (h(Host, null, h("div", { class: "loaderContainer" }, h("span", { class: "loader" }))));
  }
  static get is() { return "ir-loading-screen"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-loading-screen.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-loading-screen.css"]
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
        "reflect": false,
        "defaultValue": "''"
      }
    };
  }
}
//# sourceMappingURL=ir-loading-screen.js.map
