import { h } from "@stencil/core";
export class IrSidebar {
  constructor() {
    this.name = undefined;
    this.side = 'right';
    this.open = false;
  }
  componentDidLoad() {
    // If esc key is pressed, close the modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.toggleSidebar();
      }
    });
  }
  // Unsubscribe to the event when the component is removed from the DOM
  disconnectedCallback() {
    document.removeEventListener('keydown', () => { });
  }
  async toggleSidebar() {
    this.irSidebarToggle.emit(this.open);
  }
  render() {
    let className = '';
    if (this.open) {
      className = 'active';
    }
    else {
      className = '';
    }
    return [
      h("div", { class: `backdrop ${className}`, onClick: () => {
          this.toggleSidebar();
        } }),
      h("div", { class: `sidebar-${this.side} ${className}` }, h("a", { class: "close", onClick: () => {
          this.toggleSidebar();
        } }, h("ir-icon", { icon: "ft-x" })), h("slot", null)),
    ];
  }
  static get is() { return "ir-sidebar"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-sidebar.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-sidebar.css"]
    };
  }
  static get properties() {
    return {
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "name",
        "reflect": false
      },
      "side": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'right' | 'left'",
          "resolved": "\"left\" | \"right\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "side",
        "reflect": false,
        "defaultValue": "'right'"
      },
      "open": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "open",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "irSidebarToggle",
        "name": "irSidebarToggle",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "toggleSidebar": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
}
//# sourceMappingURL=ir-sidebar.js.map
