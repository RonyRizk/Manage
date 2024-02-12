import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const IrSelect = /*@__PURE__*/ proxyCustomElement(class IrSelect extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.selectChange = createEvent(this, "selectChange", 7);
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
    this.labelBorder = 'light';
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
  static get watchers() { return {
    "selectedValue": ["watchHandler"],
    "submited": ["watchHandler2"]
  }; }
}, [2, "ir-select", {
    "name": [1],
    "data": [16],
    "label": [1],
    "selectStyles": [1, "select-styles"],
    "selectContainerStyle": [1, "select-container-style"],
    "selectedValue": [1544, "selected-value"],
    "required": [4],
    "LabelAvailable": [4, "label-available"],
    "firstOption": [1, "first-option"],
    "selectStyle": [4, "select-style"],
    "submited": [4],
    "size": [1],
    "textSize": [1, "text-size"],
    "labelPosition": [1, "label-position"],
    "labelBackground": [1, "label-background"],
    "labelColor": [1, "label-color"],
    "labelBorder": [1, "label-border"],
    "labelWidth": [2, "label-width"],
    "initial": [32],
    "valid": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-select"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-select":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrSelect);
      }
      break;
  } });
}

export { IrSelect as I, defineCustomElement as d };

//# sourceMappingURL=ir-select2.js.map