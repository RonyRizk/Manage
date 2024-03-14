import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$1 } from './ir-icon2.js';

const irTitleCss = ".sc-ir-title-h{padding:0px 0;margin-bottom:20px;display:flex;align-items:center;width:100%}[display-context='sidebar'].sc-ir-title-h{padding:15px 0;justify-content:space-between !important;width:100% !important;border-bottom:1px solid #e4e5ec !important;border-color:#e4e5ec !important}.title-body.sc-ir-title{margin:0;padding:0}@media only screen and (max-width: 641px){.sc-ir-title-h{flex-direction:column;gap:8px;align-items:flex-start}[display-context='sidebar'].sc-ir-title-h{flex-direction:row}}";

const IrTitle = /*@__PURE__*/ proxyCustomElement(class IrTitle extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.closeSideBar = createEvent(this, "closeSideBar", 7);
    this.label = undefined;
    this.displayContext = 'default';
    this.justifyContent = 'start';
  }
  componentDidLoad() {
    this.el.style.justifyContent = this.justifyContent;
  }
  handleJustifyContentChange(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.el.style.justifyContent = newValue;
    }
  }
  render() {
    return (h(Host, null, h("h4", { class: "text-left font-medium-2 py-0 my-0" }, this.label), this.displayContext === 'sidebar' && (h("ir-icon", { class: 'close', onIconClickHandler: () => {
        this.closeSideBar.emit(null);
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), this.displayContext !== 'sidebar' && (h("div", { class: 'title-body' }, h("slot", { name: "title-body" })))));
  }
  get el() { return this; }
  static get watchers() { return {
    "justifyContent": ["handleJustifyContentChange"]
  }; }
  static get style() { return irTitleCss; }
}, [6, "ir-title", {
    "label": [1],
    "displayContext": [513, "display-context"],
    "justifyContent": [513, "justify-content"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-title", "ir-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-title":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrTitle);
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrTitle as I, defineCustomElement as d };

//# sourceMappingURL=ir-title2.js.map