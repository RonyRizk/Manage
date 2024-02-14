import { Host, h } from "@stencil/core";
export class IrChannelGeneral {
  render() {
    return h(Host, null, "general");
  }
  static get is() { return "ir-channel-general"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-channel-general.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-channel-general.css"]
    };
  }
}
//# sourceMappingURL=ir-channel-general.js.map
