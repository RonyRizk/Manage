import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { v as v4 } from './v4.js';

const irInputTextCss = ".sc-ir-input-text-h{margin:0;padding:0}.border-theme.sc-ir-input-text{border:1px solid #cacfe7}.icon-container.sc-ir-input-text{color:#3b4781;border:1px solid #cacfe7;font-size:0.975rem;height:2rem;background:rgb(255, 255, 255);padding-right:0 !important;border-right:0;border-top-right-radius:0;border-bottom-right-radius:0;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}input.sc-ir-input-text:focus{border-color:#1e9ff2 !important}.input-container.sc-ir-input-text{display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;flex:1}.input-container.sc-ir-input-text input.sc-ir-input-text{padding-left:5px !important;padding-right:5px !important;border-left:0;border-top-left-radius:0 !important;border-bottom-left-radius:0 !important}.icon-container[data-state='focus'].sc-ir-input-text{border-color:var(--blue)}.icon-container[data-disabled].sc-ir-input-text{background-color:#eceff1;border-color:rgba(118, 118, 118, 0.3)}.danger-border.sc-ir-input-text{border-color:var(--red)}";

const IrInputText = /*@__PURE__*/ proxyCustomElement(class IrInputText extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.textChange = createEvent(this, "textChange", 7);
    this.inputBlur = createEvent(this, "inputBlur", 7);
    this.name = undefined;
    this.value = undefined;
    this.label = '<label>';
    this.placeholder = '<placeholder>';
    this.inputStyles = '';
    this.required = undefined;
    this.LabelAvailable = true;
    this.readonly = false;
    this.type = 'text';
    this.submited = false;
    this.inputStyle = true;
    this.size = 'md';
    this.textSize = 'md';
    this.labelPosition = 'left';
    this.labelBackground = null;
    this.labelColor = 'dark';
    this.labelBorder = 'theme';
    this.labelWidth = 3;
    this.variant = 'default';
    this.disabled = false;
    this.error = false;
    this.valid = undefined;
    this.initial = true;
    this.inputFocused = false;
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
    const id = v4();
    if (this.variant === 'icon') {
      return (h("fieldset", { class: "position-relative has-icon-left input-container" }, h("label", { htmlFor: id, class: "input-group-prepend bg-white m-0" }, h("span", { "data-disabled": this.disabled, "data-state": this.inputFocused ? 'focus' : '', class: `input-group-text icon-container bg-white ${this.error && 'danger-border'}`, id: "basic-addon1" }, h("slot", { name: "icon" }))), h("input", { type: "text", onFocus: () => (this.inputFocused = true), required: this.required, onBlur: e => {
          this.inputFocused = false;
          this.inputBlur.emit(e);
        }, disabled: this.disabled, class: `form-control bg-white pl-0 input-sm rate-input py-0 m-0 rateInputBorder ${this.error && 'danger-border'}`, id: id, value: this.value, placeholder: this.placeholder, onInput: this.handleInputChange.bind(this) })));
    }
    let className = 'form-control';
    let label = (h("div", { class: `input-group-prepend col-${this.labelWidth} p-0 text-${this.labelColor}` }, h("label", { class: `input-group-text ${this.labelPosition === 'right' ? 'justify-content-end' : this.labelPosition === 'center' ? 'justify-content-center' : ''} ${this.labelBackground ? 'bg-' + this.labelBackground : ''} flex-grow-1 text-${this.labelColor} border-${this.labelBorder === 'none' ? 0 : this.labelBorder} ` }, this.label, this.required ? '*' : '')));
    if (!this.LabelAvailable) {
      label = '';
    }
    if (this.inputStyle === false) {
      className = '';
    }
    if (this.required && !this.valid && !this.initial) {
      className = `${className} border-danger`;
    }
    return (h("div", { class: "form-group" }, h("div", { class: "input-group row m-0" }, label, h("input", { readOnly: this.readonly, type: this.type, class: `${className} ${this.error ? 'border-danger' : ''} form-control-${this.size} text-${this.textSize} col-${this.LabelAvailable ? 12 - this.labelWidth : 12} ${this.readonly && 'bg-white'} ${this.inputStyles}`, onBlur: e => this.inputBlur.emit(e), placeholder: this.placeholder, value: this.value, onInput: this.handleInputChange.bind(this), required: this.required, disabled: this.disabled }))));
  }
  static get watchers() { return {
    "value": ["watchHandler"],
    "submited": ["watchHandler2"]
  }; }
  static get style() { return irInputTextCss; }
}, [6, "ir-input-text", {
    "name": [1],
    "value": [8],
    "label": [1],
    "placeholder": [1],
    "inputStyles": [1, "input-styles"],
    "required": [4],
    "LabelAvailable": [4, "label-available"],
    "readonly": [4],
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
    "variant": [1],
    "disabled": [4],
    "error": [4],
    "valid": [32],
    "initial": [32],
    "inputFocused": [32]
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