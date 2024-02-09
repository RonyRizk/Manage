import { r as registerInstance, a as createEvent, h } from './index-1e7fb42e.js';

const IrChannelManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.openSidebar = createEvent(this, "openSidebar", 7);
  }
  handleCreate() {
    this.openSidebar.emit();
  }
  render() {
    return (h("div", { class: "card-head" }, h("div", { class: "input-group input-group-sm" }, h("input", { type: "text", class: "form-control border-light", placeholder: "Search" }), h("div", { class: "input-group-append" }), h("button", { class: "ml-1 btn btn-primary btn-sm openSidebar", onClick: () => this.handleCreate() }, "Create")), h("div", { class: "container-fluid" }, h("div", { class: "row" }, h("div", { class: "col-3 p-1 section-title" }, "Title ", h("ir-icon", { icon: "la la-unsorted" })), h("div", { class: "col-3 p-1 section-title" }, "Channel ", h("ir-icon", { icon: "la la-unsorted" })), h("div", { class: "col-3 p-1 section-title" }, "Status ", h("ir-icon", { icon: "la la-unsorted" }))))));
  }
};

export { IrChannelManager as ir_topbar };

//# sourceMappingURL=ir-topbar.entry.js.map