import { h } from "@stencil/core";
export class IrButton {
  constructor() {
    this.name = undefined;
    this.text = undefined;
    this.icon = 'ft-save';
    this.btn_color = 'primary';
    this.size = 'md';
    this.textSize = 'md';
    this.btn_block = true;
    this.btn_disabled = false;
    this.btn_type = 'button';
  }
  connectedCallback() { }
  disconnectedCallback() { }
  render() {
    let block = '';
    if (this.btn_block) {
      block = 'btn-block';
    }
    return (h("button", { onClick: () => {
        this.clickHanlder.emit();
      }, class: `btn btn-${this.btn_color} btn-${this.size} text-${this.textSize} ${block}`, type: this.btn_type }, h("i", { class: this.icon }), "\u00A0", this.text));
  }
  static get is() { return "ir-button"; }
  static get properties() {
    return {
      "name": {
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
        "attribute": "name",
        "reflect": false
      },
      "text": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "text",
        "reflect": false
      },
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
        "defaultValue": "'ft-save'"
      },
      "btn_color": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'",
          "resolved": "\"danger\" | \"dark\" | \"info\" | \"light\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "btn_color",
        "reflect": false,
        "defaultValue": "'primary'"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'sm' | 'md' | 'lg'",
          "resolved": "\"lg\" | \"md\" | \"sm\"",
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
      },
      "textSize": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'sm' | 'md' | 'lg'",
          "resolved": "\"lg\" | \"md\" | \"sm\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "text-size",
        "reflect": false,
        "defaultValue": "'md'"
      },
      "btn_block": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "btn_block",
        "reflect": false,
        "defaultValue": "true"
      },
      "btn_disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "btn_disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "btn_type": {
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
        "attribute": "btn_type",
        "reflect": false,
        "defaultValue": "'button'"
      }
    };
  }
  static get events() {
    return [{
        "method": "clickHanlder",
        "name": "clickHanlder",
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
//# sourceMappingURL=ir-button.js.map
