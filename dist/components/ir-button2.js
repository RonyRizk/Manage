import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const irButtonCss = ".loader{width:11px;height:11px;border:2px solid #fff;border-bottom-color:transparent;border-radius:50%;margin:0;padding:0;display:inline-flex;box-sizing:border-box;animation:rotation 1s linear infinite}.button-icon{padding:0;margin-top:0}.button-icon[data-state='loading']{display:none}.button-text{padding:0 5px}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

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
    this.isLoading = false;
    this.btn_styles = undefined;
  }
  connectedCallback() { }
  disconnectedCallback() { }
  render() {
    let blockClass = this.btn_block ? 'btn-block' : '';
    return (h("button", { onClick: () => this.clickHanlder.emit(), class: `btn btn-${this.btn_color} ${this.btn_styles} d-flex align-items-center btn-${this.size} text-${this.textSize} ${blockClass}`, type: this.btn_type, disabled: this.btn_disabled }, h("span", { class: "button-icon", "data-state": this.isLoading ? 'loading' : '' }, h("slot", { name: "icon" })), this.isLoading && h("span", { class: "loader m-0 p-0" }), this.text && h("span", { class: "button-text m-0" }, this.text)));
  }
  static get style() { return irButtonCss; }
}, [4, "ir-button", {
    "name": [1],
    "text": [8],
    "icon": [1],
    "btn_color": [1],
    "size": [1],
    "textSize": [1, "text-size"],
    "btn_block": [4],
    "btn_disabled": [4],
    "btn_type": [1],
    "isLoading": [4, "is-loading"],
    "btn_styles": [1]
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