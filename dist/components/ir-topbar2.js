import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$1 } from './ir-icon2.js';

const IrChannelManager = /*@__PURE__*/ proxyCustomElement(class IrChannelManager extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.openSidebar = createEvent(this, "openSidebar", 7);
  }
  handleCreate() {
    this.openSidebar.emit();
  }
  render() {
    return (h("div", { class: "card-head" }, h("div", { class: "input-group input-group-sm" }, h("input", { type: "text", class: "form-control border-light", placeholder: "Search" }), h("div", { class: "input-group-append" }), h("button", { class: "ml-1 btn btn-primary btn-sm openSidebar", onClick: () => this.handleCreate() }, "Create")), h("div", { class: "container-fluid" }, h("div", { class: "row" }, h("div", { class: "col-3 p-1 section-title" }, "Title ", h("ir-icon", { icon: "la la-unsorted" })), h("div", { class: "col-3 p-1 section-title" }, "Channel ", h("ir-icon", { icon: "la la-unsorted" })), h("div", { class: "col-3 p-1 section-title" }, "Status ", h("ir-icon", { icon: "la la-unsorted" }))))));
  }
}, [0, "ir-topbar"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-topbar", "ir-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-topbar":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannelManager);
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrChannelManager as I, defineCustomElement as d };

//# sourceMappingURL=ir-topbar2.js.map