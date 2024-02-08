import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$1 } from './ir-icon2.js';

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
    return (h("div", { class: this.iconShown ? 'sm-padding-right sm-padding-top' : 'sm-padding-top' }, h("strong", { class: "sm-padding-right" }, this.label), this.imageSrc && h("img", { src: this.imageSrc, class: "sm-padding-right" }), this.value, this.iconShown && h("ir-icon", { icon: "ft-edit color-ir-dark-blue-hover pointer", class: "sm-padding-left", onClick: () => this.openEditSidebar() })));
  }
}, [0, "ir-label", {
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