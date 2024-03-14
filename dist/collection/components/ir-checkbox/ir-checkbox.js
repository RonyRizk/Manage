import { Host, h } from "@stencil/core";
import { v4 } from "uuid";
export class IrCheckbox {
  constructor() {
    this.checked = false;
    this.label = undefined;
    this.checkboxId = v4();
    this.name = undefined;
    this.disabled = undefined;
    this.currentChecked = false;
  }
  handleCheckedChange(newValue) {
    if (newValue === this.currentChecked) {
      return;
    }
    this.currentChecked = this.checked;
  }
  componentWillLoad() {
    this.currentChecked = this.checked;
  }
  componentDidLoad() {
    if (this.checkboxRef) {
      this.checkboxRef.setAttribute('aria-checked', JSON.stringify(this.checked));
    }
  }
  handleCheckChange() {
    this.currentChecked = !this.currentChecked;
    if (this.checkboxRef) {
      this.checkboxRef.setAttribute('aria-checked', JSON.stringify(this.currentChecked));
    }
    this.checkChange.emit(this.currentChecked);
  }
  render() {
    return (h(Host, null, h("button", { disabled: this.disabled, name: this.name, onClick: this.handleCheckChange.bind(this), id: this.checkboxId, "data-state": this.currentChecked ? 'checked' : 'unchecked', value: 'on', ref: ref => (this.checkboxRef = ref), type: "button", role: "checkbox", class: "CheckboxRoot" }, this.currentChecked && (h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: "currentColor", d: "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" })))), h("input", { type: "checkbox", "aria-hidden": "true", tabindex: "-1", value: "on", checked: this.currentChecked, class: "checkbox" }), this.label && h("label", { htmlFor: this.checkboxId }, this.label)));
  }
  static get is() { return "ir-checkbox"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-checkbox.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-checkbox.css"]
    };
  }
  static get properties() {
    return {
      "checked": {
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
        "attribute": "checked",
        "reflect": false,
        "defaultValue": "false"
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
        "reflect": false
      },
      "checkboxId": {
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
        "attribute": "checkbox-id",
        "reflect": false,
        "defaultValue": "v4()"
      },
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
      "disabled": {
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
        "attribute": "disabled",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "currentChecked": {}
    };
  }
  static get events() {
    return [{
        "method": "checkChange",
        "name": "checkChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get watchers() {
    return [{
        "propName": "checked",
        "methodName": "handleCheckedChange"
      }];
  }
}
//# sourceMappingURL=ir-checkbox.js.map
