'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d7fa4e74.js');

const IrSpan = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.text = undefined;
  }
  connectedCallback() { }
  disconnectedCallback() { }
  render() {
    return (index.h("span", null, this.text));
  }
};

exports.ir_span = IrSpan;

//# sourceMappingURL=ir-span.cjs.entry.js.map