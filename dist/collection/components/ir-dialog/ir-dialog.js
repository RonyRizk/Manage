import { Host, h } from "@stencil/core";
export class IrDialog {
  constructor() {
    this.open = false;
    this.isOpen = false;
  }
  componentWillLoad() {
    if (this.open) {
      this.openModal();
    }
  }
  componentDidLoad() {
    this.prepareFocusTrap();
  }
  async openModal() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.prepareFocusTrap();
    }, 10);
    this.openChange.emit(this.isOpen);
  }
  async closeModal() {
    console.log('close');
    if (!this.isOpen) {
      return;
    }
    document.body.style.overflow = 'visible';
    this.isOpen = false;
    this.openChange.emit(this.isOpen);
  }
  handleOpenChange() {
    if (this.open) {
      this.openModal();
    }
    else {
      this.closeModal();
    }
  }
  prepareFocusTrap() {
    const focusableElements = 'button,ir-dropdown ,[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableContent = this.el.shadowRoot.querySelectorAll(focusableElements);
    // console.log(focusableContent);
    if (focusableContent.length === 0)
      return;
    this.firstFocusableElement = focusableContent[0];
    this.lastFocusableElement = focusableContent[focusableContent.length - 1];
    this.firstFocusableElement.focus();
  }
  handleKeyDown(ev) {
    if (!this.isOpen) {
      return;
    }
    let isTabPressed = ev.key === 'Tab';
    if (ev.key === 'Escape' && this.isOpen) {
      this.closeModal();
    }
    if (!isTabPressed) {
      return;
    }
    // If focus is about to leave the last focusable element, redirect it to the first.
    if (!ev.shiftKey && document.activeElement === this.lastFocusableElement) {
      this.firstFocusableElement.focus();
      ev.preventDefault();
    }
    // If focus is about to leave the first focusable element, redirect it to the last.
    if (ev.shiftKey && document.activeElement === this.firstFocusableElement) {
      this.lastFocusableElement.focus();
      ev.preventDefault();
    }
  }
  disconnectedCallback() {
    document.body.style.overflow = 'visible';
  }
  render() {
    return (h(Host, null, h("div", { class: "backdrop", "data-state": this.isOpen ? 'opened' : 'closed', onClick: () => this.closeModal() }), this.isOpen && (h("div", { class: "modal-container", tabIndex: -1, role: "dialog", "aria-labelledby": "dialog1Title", "aria-describedby": "dialog1Desc" }, h("ir-icon", { id: "close", class: "dialog-close-button", onIconClickHandler: () => this.closeModal() }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 18, width: 18 }, h("path", { fill: "#104064", class: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" }))), h("div", { class: 'modal-title', id: "dialog1Title" }, h("slot", { name: "modal-title" })), h("div", { class: "modal-body", id: "dialog1Desc" }, h("slot", { name: "modal-body" })), h("div", { class: "modal-footer" }, h("slot", { name: "modal-footer" }))))));
  }
  static get is() { return "ir-dialog"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-dialog.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-dialog.css"]
    };
  }
  static get properties() {
    return {
      "open": {
        "type": "boolean",
        "mutable": false,
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
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "isOpen": {}
    };
  }
  static get events() {
    return [{
        "method": "openChange",
        "name": "openChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "openModal": {
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
      },
      "closeModal": {
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
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "open",
        "methodName": "handleOpenChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "handleKeyDown",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-dialog.js.map
