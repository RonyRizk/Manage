'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');

const irInputTextCss = ".border-theme.sc-ir-input-text{border:1px solid #cacfe7}";

const IrInputText = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.textChange = index.createEvent(this, "textChange", 7);
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
    let label = (index.h("div", { class: `input-group-prepend col-${this.labelWidth} p-0 text-${this.labelColor}` }, index.h("label", { class: `input-group-text ${this.labelPosition === 'right' ? 'justify-content-end' : this.labelPosition === 'center' ? 'justify-content-center' : ''} ${this.labelBackground ? 'bg-' + this.labelBackground : ''} flex-grow-1 text-${this.labelColor} border-${this.labelBorder === 'none' ? 0 : this.labelBorder} ` }, this.label, this.required ? '*' : '')));
    if (!this.LabelAvailable) {
      label = '';
    }
    if (this.inputStyle === false) {
      className = '';
    }
    if (this.required && !this.valid && !this.initial) {
      className = `${className} border-danger`;
    }
    return (index.h("div", { class: "form-group" }, index.h("div", { class: "input-group row m-0" }, label, index.h("input", { readOnly: this.readonly, type: this.type, class: `${className} form-control-${this.size} text-${this.textSize} col-${this.LabelAvailable ? 12 - this.labelWidth : 12} ${this.readonly && 'bg-white'} ${this.inputStyles}`, placeholder: this.placeholder, value: this.value, onInput: this.handleInputChange.bind(this), required: this.required }))));
  }
  static get watchers() { return {
    "value": ["watchHandler"],
    "submited": ["watchHandler2"]
  }; }
};
IrInputText.style = irInputTextCss;

const irSelectCss = ".border-theme.sc-ir-select{border:1px solid #cacfe7}";

const IrSelect = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.selectChange = index.createEvent(this, "selectChange", 7);
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
    let label = (index.h("div", { class: `input-group-prepend col-${this.labelWidth} p-0 text-${this.labelColor}` }, index.h("label", { class: `input-group-text ${this.labelPosition === 'right' ? 'justify-content-end' : this.labelPosition === 'center' ? 'justify-content-center' : ''} ${this.labelBackground ? 'bg-' + this.labelBackground : ''} flex-grow-1 text-${this.labelColor} border-${this.labelBorder === 'none' ? 0 : this.labelBorder} ` }, this.label, this.required ? '*' : '')));
    if (this.selectStyle === false) {
      className = '';
    }
    if (this.required && !this.valid && !this.initial) {
      className = `${className} border-danger`;
    }
    if (!this.LabelAvailable) {
      label = '';
    }
    return (index.h("div", { class: `form-group m-0 ${this.selectContainerStyle}` }, index.h("div", { class: "input-group row m-0" }, label, index.h("select", { class: `${this.selectStyles} ${className} form-control-${this.size} text-${this.textSize} col-${this.LabelAvailable ? 12 - this.labelWidth : 12}`, onInput: this.handleSelectChange.bind(this), required: this.required }, index.h("option", { value: '' }, this.firstOption), this.data.map(item => {
      if (this.selectedValue === item.value) {
        return (index.h("option", { selected: true, value: item.value }, item.text));
      }
      else {
        return index.h("option", { value: item.value }, item.text);
      }
    })))));
  }
  static get watchers() { return {
    "selectedValue": ["watchHandler"],
    "submited": ["watchHandler2"]
  }; }
};
IrSelect.style = irSelectCss;

exports.ir_input_text = IrInputText;
exports.ir_select = IrSelect;

//# sourceMappingURL=ir-input-text_2.cjs.entry.js.map