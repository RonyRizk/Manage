import { h } from "@stencil/core";
export class IrDropdown {
  constructor() {
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
  static get is() { return "ir-dropdown"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-dropdown.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-dropdown.css"]
    };
  }
  static get properties() {
    return {
      "data": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{\r\n    name: string;\r\n    icon: string;\r\n    children: {\r\n      name: string;\r\n      icon: string;\r\n    }[];\r\n  }",
          "resolved": "{ name: string; icon: string; children: { name: string; icon: string; }[]; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "null"
      },
      "object": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "object",
        "reflect": true,
        "defaultValue": "null"
      }
    };
  }
  static get states() {
    return {
      "show": {}
    };
  }
  static get events() {
    return [{
        "method": "dropdownItemCLicked",
        "name": "dropdownItemCLicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ name: string; object: any }",
          "resolved": "{ name: string; object: any; }",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=ir-dropdown.js.map
