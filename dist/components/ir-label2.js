import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$1 } from './ir-icon2.js';

const irLabelCss = "*.sc-ir-label{margin:0;padding:0}.sc-ir-label-h{display:flex;margin-bottom:5px;gap:5px}.icon.sc-ir-label{margin-left:3px;padding:0;margin-top:0;display:flex;align-items:center}p.sc-ir-label{margin:0 3px;padding:0}.icon-container.sc-ir-label{margin:0;padding:0}svg.sc-ir-label{margin:0;padding:0}";

const IrLabel = /*@__PURE__*/ proxyCustomElement(class IrLabel extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.editSidebar = createEvent(this, "editSidebar", 7);
    this.label = undefined;
    this.value = undefined;
    this.iconShown = false;
    this.imageSrc = undefined;
  }
  openEditSidebar() {
    this.editSidebar.emit();
  }
  render() {
    if (!this.value) {
      return null;
    }
    return (h(Host, { class: this.imageSrc ? 'align-items-center' : '' }, h("strong", null, this.label), this.imageSrc && h("img", { src: this.imageSrc, class: "p-0 m-0" }), h("p", null, this.value), this.iconShown && (h("div", { class: "icon-container" }, h("ir-icon", { class: "pointer icon", id: "pickup", onIconClickHandler: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.openEditSidebar();
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "15", width: "15", viewBox: "0 0 512 550" }, h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" })))))));
  }
  static get style() { return irLabelCss; }
}, [2, "ir-label", {
    "label": [1],
    "value": [1],
    "iconShown": [4, "icon-shown"],
    "imageSrc": [1, "image-src"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-label", "ir-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-label":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrLabel);
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrLabel as I, defineCustomElement as d };

//# sourceMappingURL=ir-label2.js.map