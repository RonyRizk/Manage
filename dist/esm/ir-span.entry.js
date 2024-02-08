import { r as registerInstance, h } from './index-a7439799.js';

const IrSpan = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.text = undefined;
  }
  connectedCallback() { }
  disconnectedCallback() { }
  render() {
    return (h("span", null, this.text));
  }
};

export { IrSpan as ir_span };

//# sourceMappingURL=ir-span.entry.js.map