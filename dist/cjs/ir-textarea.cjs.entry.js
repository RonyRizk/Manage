'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-79158a29.js');

const IrTextArea = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.rows = 3;
    this.cols = 5;
    this.text = '';
    this.label = '<label>';
    this.placeholder = '<placeholder>';
  }
  connectedCallback() { }
  disconnectedCallback() { }
  render() {
    return (index.h("div", { class: "form-group" }, index.h("label", null, this.label), index.h("textarea", { rows: this.rows, class: "form-control", placeholder: this.placeholder })));
  }
};

exports.ir_textarea = IrTextArea;

//# sourceMappingURL=ir-textarea.cjs.entry.js.map