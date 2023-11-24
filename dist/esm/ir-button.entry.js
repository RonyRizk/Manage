import { r as registerInstance, c as createEvent, h } from './index-47b77f6c.js';

const IrButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.clickHanlder = createEvent(this, "clickHanlder", 7);
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
    return (h("button", { onClick: () => {
        this.clickHanlder.emit();
      }, class: `btn btn-${this.btn_color} btn-${this.size} text-${this.textSize} ${block}`, type: this.btn_type }, h("i", { class: this.icon }), "\u00A0", this.text));
  }
};

export { IrButton as ir_button };

//# sourceMappingURL=ir-button.entry.js.map