import { h } from "@stencil/core";
export class IrSelect {
  constructor() {
    this.count = 0;
    this.name = undefined;
    this.data = undefined;
    this.label = '<label>';
    this.selectStyles = undefined;
    this.selectContainerStyle = undefined;
    this.selectedValue = null;
    this.required = undefined;
    this.LabelAvailable = true;
    this.firstOption = 'Select';
    this.selectStyle = true;
    this.submited = false;
    this.size = 'md';
    this.textSize = 'md';
    this.labelPosition = 'left';
    this.labelBackground = null;
    this.labelColor = 'dark';
    this.labelBorder = 'theme';
    this.labelWidth = 3;
    this.initial = true;
    this.valid = false;
  }
  watchHandler(newValue) {
    if (newValue !== null && this.required) {
      this.valid = true;
    }
  }
  watchHandler2(newValue) {
    if (newValue && this.required) {
      this.initial = false;
    }
  }
  componentwillload() { }
  disconnectedCallback() { }
  handleSelectChange(event) {
    if (this.required) {
      this.initial = false;
      this.valid = event.target.checkValidity();
      this.selectedValue = event.target.value;
      this.selectChange.emit(this.selectedValue);
    }
    else {
      this.selectedValue = event.target.value;
      this.selectChange.emit(this.selectedValue);
    }
  }
  render() {
    let className = 'form-control';
    let label = (h("div", { class: `input-group-prepend col-${this.labelWidth} p-0 text-${this.labelColor}` }, h("label", { class: `input-group-text ${this.labelPosition === 'right' ? 'justify-content-end' : this.labelPosition === 'center' ? 'justify-content-center' : ''} ${this.labelBackground ? 'bg-' + this.labelBackground : ''} flex-grow-1 text-${this.labelColor} border-${this.labelBorder === 'none' ? 0 : this.labelBorder} ` }, this.label, this.required ? '*' : '')));
    if (this.selectStyle === false) {
      className = '';
    }
    if (this.required && !this.valid && !this.initial) {
      className = `${className} border-danger`;
    }
    if (!this.LabelAvailable) {
      label = '';
    }
    return (h("div", { class: `form-group m-0 ${this.selectContainerStyle}` }, h("div", { class: "input-group row m-0" }, label, h("select", { class: `${this.selectStyles} ${className} form-control-${this.size} text-${this.textSize} col-${this.LabelAvailable ? 12 - this.labelWidth : 12}`, onInput: this.handleSelectChange.bind(this), required: this.required }, h("option", { value: '' }, this.firstOption), this.data.map(item => {
      if (this.selectedValue === item.value) {
        return (h("option", { selected: true, value: item.value }, item.text));
      }
      else {
        return h("option", { value: item.value }, item.text);
      }
    })))));
  }
  static get is() { return "ir-select"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-select.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-select.css"]
    };
  }
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
      "data": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "selectOption[]",
          "resolved": "selectOption[]",
          "references": {
            "selectOption": {
              "location": "import",
              "path": "../../common/models",
              "id": "src/common/models.ts::selectOption"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
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
      "selectStyles": {
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
        "attribute": "select-styles",
        "reflect": false
      },
      "selectContainerStyle": {
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
        "attribute": "select-container-style",
        "reflect": false
      },
      "selectedValue": {
        "type": "any",
        "mutable": true,
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
        "attribute": "selected-value",
        "reflect": true,
        "defaultValue": "null"
      },
      "required": {
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
        "attribute": "required",
        "reflect": false
      },
      "LabelAvailable": {
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
        "attribute": "label-available",
        "reflect": false,
        "defaultValue": "true"
      },
      "firstOption": {
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
        "attribute": "first-option",
        "reflect": false,
        "defaultValue": "'Select'"
      },
      "selectStyle": {
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
        "attribute": "select-style",
        "reflect": false,
        "defaultValue": "true"
      },
      "submited": {
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
        "attribute": "submited",
        "reflect": false,
        "defaultValue": "false"
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
      "labelPosition": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'left' | 'right' | 'center'",
          "resolved": "\"center\" | \"left\" | \"right\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label-position",
        "reflect": false,
        "defaultValue": "'left'"
      },
      "labelBackground": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | null",
          "resolved": "\"danger\" | \"dark\" | \"info\" | \"light\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label-background",
        "reflect": false,
        "defaultValue": "null"
      },
      "labelColor": {
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
        "attribute": "label-color",
        "reflect": false,
        "defaultValue": "'dark'"
      },
      "labelBorder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'theme' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'none'",
          "resolved": "\"danger\" | \"dark\" | \"info\" | \"light\" | \"none\" | \"primary\" | \"secondary\" | \"success\" | \"theme\" | \"warning\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label-border",
        "reflect": false,
        "defaultValue": "'theme'"
      },
      "labelWidth": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11",
          "resolved": "1 | 10 | 11 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label-width",
        "reflect": false,
        "defaultValue": "3"
      }
    };
  }
  static get states() {
    return {
      "initial": {},
      "valid": {}
    };
  }
  static get events() {
    return [{
        "method": "selectChange",
        "name": "selectChange",
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
  static get watchers() {
    return [{
        "propName": "selectedValue",
        "methodName": "watchHandler"
      }, {
        "propName": "submited",
        "methodName": "watchHandler2"
      }];
  }
}
//# sourceMappingURL=ir-select.js.map
