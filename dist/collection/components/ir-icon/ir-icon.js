import { h } from "@stencil/core";
export class IrIcon {
  constructor() {
    this.icon = 'ft-check';
  }
  render() {
    return (h("i", { onClick: () => {
        this.iconClickHandler.emit();
      }, class: this.icon }));
  }
  static get is() { return "ir-icon"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-icon.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-icon.css"]
    };
  }
  static get properties() {
    return {
      "icon": {
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
        "attribute": "icon",
        "reflect": false,
        "defaultValue": "'ft-check'"
      }
    };
  }
  static get events() {
    return [{
        "method": "iconClickHandler",
        "name": "iconClickHandler",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=ir-icon.js.map
