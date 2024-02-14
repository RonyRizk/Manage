import { h } from "@stencil/core";
export class IrChannelManager {
  handleCreate() {
    this.openSidebar.emit();
  }
  render() {
    return (h("div", { class: "card-head" }, h("div", { class: "input-group input-group-sm" }, h("input", { type: "text", class: "form-control border-light", placeholder: "Search" }), h("div", { class: "input-group-append" }), h("button", { class: "ml-1 btn btn-primary btn-sm openSidebar", onClick: () => this.handleCreate() }, "Create")), h("div", { class: "container-fluid" }, h("div", { class: "row" }, h("div", { class: "col-3 p-1 section-title" }, "Title ", h("ir-icon", { icon: "la la-unsorted" })), h("div", { class: "col-3 p-1 section-title" }, "Channel ", h("ir-icon", { icon: "la la-unsorted" })), h("div", { class: "col-3 p-1 section-title" }, "Status ", h("ir-icon", { icon: "la la-unsorted" }))))));
  }
  static get is() { return "ir-topbar"; }
  static get events() {
    return [{
        "method": "openSidebar",
        "name": "openSidebar",
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
}
//# sourceMappingURL=ir-topbar.js.map
