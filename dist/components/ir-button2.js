import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { v as v4 } from './v4.js';

const irButtonCss = ".button-icon.sc-ir-button{padding:0;margin-top:0}.button-icon[data-state='loading'].sc-ir-button{display:none}.button-text.sc-ir-button{padding:0 5px}.bounce-3.sc-ir-button{animation:bounce 1s 1}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.loader.sc-ir-button{width:15px;height:10px;--c:no-repeat linear-gradient(#ffffff 0 0);background:var(--c) 0% 50%, var(--c) 50% 50%, var(--c) 100% 50%;background-size:20% 100%;animation:l1 1s infinite linear}@keyframes l1{0%{background-size:20% 100%, 20% 100%, 20% 100%}33%{background-size:20% 10%, 20% 100%, 20% 100%}50%{background-size:20% 100%, 20% 10%, 20% 100%}66%{background-size:20% 100%, 20% 100%, 20% 10%}100%{background-size:20% 100%, 20% 100%, 20% 100%}}@keyframes bounce{0%,100%{transform:scale(1);animation-timing-function:cubic-bezier(0.8, 0, 1, 1)}50%{transform:scale(1.2);animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}}@keyframes ping{75%,100%{transform:scale(1.2)}}";

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
    this.btn_id = v4();
  }
  handleButtonAnimation(e) {
    if (!this.buttonEl || e.detail !== this.btn_id) {
      return;
    }
    e.stopImmediatePropagation();
    e.stopPropagation();
    this.buttonEl.classList.remove('bounce-3');
    this.buttonEl.classList.add('bounce-3');
  }
  render() {
    let blockClass = this.btn_block ? 'btn-block' : '';
    return (h("button", { id: this.btn_id, ref: el => (this.buttonEl = el), onClick: () => this.clickHanlder.emit(), class: `btn btn-${this.btn_color} ${this.btn_styles} d-flex align-items-center btn-${this.size} text-${this.textSize} ${blockClass}`, type: this.btn_type, disabled: this.btn_disabled }, h("span", { class: "button-icon", "data-state": this.isLoading ? 'loading' : '' }, h("slot", { name: "icon" })), this.text && h("span", { class: "button-text m-0" }, this.text), this.isLoading && h("div", { class: "loader m-0 p-0" })));
  }
  static get style() { return irButtonCss; }
}, [6, "ir-button", {
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
    "btn_styles": [1],
    "btn_id": [1]
  }, [[16, "animateIrButton", "handleButtonAnimation"]]]);
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