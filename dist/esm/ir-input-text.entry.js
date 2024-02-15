import { r as registerInstance, c as createEvent, h } from './index-795d2df3.js';

const irInputTextCss = ".border-theme.sc-ir-input-text{border:1px solid #cacfe7}";

const IrInputText = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.textChange = createEvent(this, "textChange", 7);
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
    return (h("div", { class: "form-group" }, h("div", { class: "input-group row m-0" }, label, h("input", { readOnly: this.readonly, type: this.type, class: `${className} form-control-${this.size} text-${this.textSize} col-${this.LabelAvailable ? 12 - this.labelWidth : 12} ${this.readonly && 'bg-white'} ${this.inputStyles}`, placeholder: this.placeholder, value: this.value, onInput: this.handleInputChange.bind(this), required: this.required }))));
  }
  static get watchers() { return {
    "value": ["watchHandler"],
    "submited": ["watchHandler2"]
  }; }
};
IrInputText.style = irInputTextCss;

export { IrInputText as ir_input_text };

//# sourceMappingURL=ir-input-text.entry.js.map