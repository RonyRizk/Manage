import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$1 } from './ir-icon2.js';

const irDropdownCss = ".dropdown-menu.sc-ir-dropdown{position:absolute !important;top:100%;right:0;z-index:1000;display:none}.dropdown.nav-item.show.sc-ir-dropdown .dropdown-menu.sc-ir-dropdown{display:block}";

const IrDropdown = /*@__PURE__*/ proxyCustomElement(class IrDropdown extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dropdownItemCLicked = createEvent(this, "dropdownItemCLicked", 7);
    this.data = null;
    this.object = null;
    this.show = false;
  }
  render() {
    let content = null;
    if (this.data !== null) {
      content = (h("li", { class: this.show ? 'dropdown nav-item show' : 'dropdown nav-item', "data-menu": "dropdown" }, h("a", { class: "dropdown-toggle nav-link", onClick: () => {
          this.show = !this.show;
        }, "data-toggle": "dropdown" }, h("ir-icon", { icon: this.data.icon }), h("span", { "data-i18n": "Dashboard", class: "text-primary" }, this.data.name)), h("ul", { class: this.show ? 'dropdown-menu show' : 'dropdown-menu' }, this.data.children.map(child => {
        return (h("li", { "data-menu": "" }, h("a", { class: "dropdown-item", "data-toggle": "", onClick: () => {
            this.dropdownItemCLicked.emit({ name: child.name, object: this.object });
            this.show = false;
          } }, h("ir-icon", { icon: child.icon }), h("span", { "data-i18n": child.name }, child.name))));
      }))));
    }
    return (h("ul", { class: "nav navbar-nav", id: "main-menu-navigation", "data-menu": "menu-navigation" }, content));
  }
  static get style() { return irDropdownCss; }
}, [2, "ir-dropdown", {
    "data": [16],
    "object": [520],
    "show": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-dropdown", "ir-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-dropdown":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrDropdown);
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrDropdown as I, defineCustomElement as d };

//# sourceMappingURL=ir-dropdown2.js.map