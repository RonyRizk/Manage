import { Host, h } from "@stencil/core";
export class IrChannel {
  render() {
    return (h(Host, null, h("slot", null)));
  }
  static get is() { return "ir-channel"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-channel.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-channel.css"]
    };
  }
}
//# sourceMappingURL=ir-channel.js.map
