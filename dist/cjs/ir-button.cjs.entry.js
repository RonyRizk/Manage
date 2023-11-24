'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-79158a29.js');

const IrButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.clickHanlder = index.createEvent(this, "clickHanlder", 7);
    this.name = undefined;
    this.text = undefined;
    this.icon = 'ft-save';
    this.btn_color = 'primary';
    this.size = 'md';
    this.textSize = 'md';
    this.btn_block = true;
    this.btn_disabled = false;
    this.btn_type = 'button';
  }
  connectedCallback() { }
  disconnectedCallback() { }
  render() {
    let block = '';
    if (this.btn_block) {
      block = 'btn-block';
    }
    return (index.h("button", { onClick: () => {
        this.clickHanlder.emit();
      }, class: `btn btn-${this.btn_color} btn-${this.size} text-${this.textSize} ${block}`, type: this.btn_type }, index.h("i", { class: this.icon }), "\u00A0", this.text));
  }
};

exports.ir_button = IrButton;

//# sourceMappingURL=ir-button.cjs.entry.js.map