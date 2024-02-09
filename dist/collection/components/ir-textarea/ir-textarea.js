import { h } from "@stencil/core";
export class IrTextArea {
  constructor() {
    this.rows = 3;
    this.cols = 5;
    this.text = '';
    this.label = '<label>';
    this.placeholder = '<placeholder>';
  }
  connectedCallback() { }
  disconnectedCallback() { }
  render() {
    return (h("div", { class: "form-group" }, h("label", null, this.label), h("textarea", { rows: this.rows, class: "form-control", placeholder: this.placeholder })));
  }
  static get is() { return "ir-textarea"; }
  static get properties() {
    return {
      "rows": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "rows",
        "reflect": false,
        "defaultValue": "3"
      },
      "cols": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "cols",
        "reflect": false,
        "defaultValue": "5"
      },
      "text": {
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
        "attribute": "text",
        "reflect": false,
        "defaultValue": "''"
      },
      "label": {
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
        "attribute": "label",
        "reflect": false,
        "defaultValue": "'<label>'"
      },
      "placeholder": {
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
        "attribute": "placeholder",
        "reflect": false,
        "defaultValue": "'<placeholder>'"
      }
    };
  }
}
//# sourceMappingURL=ir-textarea.js.map
