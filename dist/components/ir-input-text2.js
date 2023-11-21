import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const IrInputText = /*@__PURE__*/ proxyCustomElement(class IrInputText extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.textChange = createEvent(this, "textChange", 7);
    this.name = undefined;
    this.value = undefined;
    this.label = '<label>';
    this.placeholder = '<placeholder>';
    this.required = undefined;
    this.LabelAvailable = true;
    this.type = 'text';
    this.submited = false;
    this.inputStyle = true;
    this.size = 'md';
    this.textSize = 'md';
    this.labelPosition = 'left';
    this.labelBackground = 'light';
    this.labelColor = 'dark';
    this.labelBorder = 'none';
    this.labelWidth = 3;
    this.valid = undefined;
    this.initial = true;
  }
  connectedCallback() { }
  disconnectedCallback() { }
  watchHandler(newValue) {
    if (newValue !== '' && this.required) {
      this.valid = true;
    }
  }
  watchHandler2(newValue) {
    if (newValue && this.required) {
      this.initial = false;
    }
  }
  handleInputChange(event) {
    this.initial = false;
    if (this.required) {
      this.valid = event.target.checkValidity();
      const value = event.target.value;
      this.textChange.emit(value);
    }
    else {
      this.textChange.emit(event.target.value);
    }
  }
  render() {
    let className = 'form-control';
    let label = (h("div", { class: `input-group-prepend col-${this.labelWidth} p-0 text-${this.labelColor} border-${this.labelBorder}` }, h("label", { class: `input-group-text ${this.labelPosition === 'right' ? 'justify-content-end' : this.labelPosition === 'center' ? 'justify-content-center' : ''} bg-${this.labelBackground} flex-grow-1 text-${this.labelColor} border-${this.labelBorder === 'none' ? 0 : this.labelBorder} ` }, this.label, this.required ? '*' : '')));
    if (!this.LabelAvailable) {
      label = '';
    }
    if (this.inputStyle === false) {
      className = '';
    }
    if (this.required && !this.valid && !this.initial) {
      className = `${className} border-danger`;
    }
    return (h("div", { class: "form-group" }, h("div", { class: "input-group row m-0" }, label, h("input", { type: this.type, class: `${className} form-control-${this.size} text-${this.textSize} col-${this.LabelAvailable ? 12 - this.labelWidth : 12}`, placeholder: this.placeholder, value: this.value, onInput: this.handleInputChange.bind(this), required: this.required }))));
  }
  static get watchers() { return {
    "value": ["watchHandler"],
    "submited": ["watchHandler2"]
  }; }
}, [0, "ir-input-text", {
    "name": [1],
    "value": [8],
    "label": [1],
    "placeholder": [1],
    "required": [4],
    "LabelAvailable": [4, "label-available"],
    "type": [1],
    "submited": [4],
    "inputStyle": [4, "input-style"],
    "size": [1],
    "textSize": [1, "text-size"],
    "labelPosition": [1, "label-position"],
    "labelBackground": [1, "label-background"],
    "labelColor": [1, "label-color"],
    "labelBorder": [1, "label-border"],
    "labelWidth": [2, "label-width"],
    "valid": [32],
    "initial": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-input-text"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-input-text":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrInputText);
      }
      break;
  } });
}

export { IrInputText as I, defineCustomElement as d };

//# sourceMappingURL=ir-input-text2.js.map