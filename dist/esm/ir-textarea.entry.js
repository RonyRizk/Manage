import { r as registerInstance, h } from './index-47b77f6c.js';

const IrTextArea = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.rows = 3;
    this.cols = 5;
    this.text = '';
    this.label = '<label>';
    this.placeholder = '<placeholder>';
  }
  connectedCallback() { }
  disconnectedCallback() { }
  render() {
    return (h("div", { class: "form-group" }, h("label", null, this.label), h("textarea", { rows: this.rows, class: "form-control", placeholder: this.placeholder })));
  }
};

export { IrTextArea as ir_textarea };

//# sourceMappingURL=ir-textarea.entry.js.map