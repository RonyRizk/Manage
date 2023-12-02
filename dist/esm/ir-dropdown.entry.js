import { r as registerInstance, c as createEvent, h } from './index-737913b0.js';

const irDropdownCss = ".dropdown-menu{position:absolute !important;top:100%;right:0;z-index:1000;display:none;}.dropdown.nav-item.show .dropdown-menu{display:block;}";

const IrDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
IrDropdown.style = irDropdownCss;

export { IrDropdown as ir_dropdown };

//# sourceMappingURL=ir-dropdown.entry.js.map