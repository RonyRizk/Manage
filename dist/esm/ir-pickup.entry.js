import { r as registerInstance, h, H as Host } from './index-518b8b68.js';

const irPickupCss = ".sc-ir-pickup-h{display:block}";

const IrPickup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
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
};
IrPickup.style = irPickupCss;

export { IrPickup as ir_pickup };

//# sourceMappingURL=ir-pickup.entry.js.map