import { h } from "@stencil/core";
export class IrLabel {
  constructor() {
    this.label = undefined;
    this.value = undefined;
    this.iconShown = false;
    this.imageSrc = undefined;
  }
  openEditSidebar() {
    this.editSidebar.emit();
  }
  render() {
    if (!this.value) {
      return null;
    }
    return (h("div", { class: this.iconShown ? 'sm-padding-right sm-padding-top' : 'sm-padding-top' }, h("strong", { class: "sm-padding-right" }, this.label), this.imageSrc && h("img", { src: this.imageSrc, class: "sm-padding-right" }), this.value, this.iconShown && h("ir-icon", { icon: "ft-edit color-ir-dark-blue-hover pointer", class: "sm-padding-left", onClick: () => this.openEditSidebar() })));
  }
  static get is() { return "ir-label"; }
  static get properties() {
    return {
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
        "reflect": false
      },
      "value": {
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
        "attribute": "value",
        "reflect": false
      },
      "iconShown": {
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
        "attribute": "icon-shown",
        "reflect": false,
        "defaultValue": "false"
      },
      "imageSrc": {
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
        "attribute": "image-src",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "editSidebar",
        "name": "editSidebar",
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
//# sourceMappingURL=ir-label.js.map
