import { Host, h } from "@stencil/core";
export class IrPickup {
  render() {
    return (h(Host, { class: 'card mt-1 p-1' }, h("section", { class: 'd-flex align-items-center' }, h("h4", { class: 'm-0 p-0' }, "Pickup"), h("ir-select", { class: 'm-0', LabelAvailable: false, data: [
        {
          text: 'helo',
          value: 'helklo',
        },
      ] }), h("ir-select", { class: 'm-0', label: "Arrival date", data: [
        {
          text: 'helo',
          value: 'helklo',
        },
      ] }), h("ir-input-text", { label: "Time" }))));
  }
  static get is() { return "ir-pickup"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-pickup.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-pickup.css"]
    };
  }
}
//# sourceMappingURL=ir-pickup.js.map
