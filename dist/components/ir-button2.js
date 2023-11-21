import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const IrButton = /*@__PURE__*/ proxyCustomElement(class IrButton extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
}, [0, "ir-button", {
    "name": [1],
    "text": [8],
    "icon": [1],
    "btn_color": [1],
    "size": [1],
    "textSize": [1, "text-size"],
    "btn_block": [4],
    "btn_disabled": [4],
    "btn_type": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-button"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-button":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrButton);
      }
      break;
  } });
}

export { IrButton as I, defineCustomElement as d };

//# sourceMappingURL=ir-button2.js.map