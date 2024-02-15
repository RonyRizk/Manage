import channels_data, { selectChannel } from "../../../../../src/stores/channel.store";
import { Host, h } from "@stencil/core";
export class IrChannelGeneral {
  render() {
    return (h(Host, null, h("ir-select", { selectContainerStyle: "mb-1", onSelectChange: (e) => selectChannel(e.detail), class: 'm-0 mb-1', LabelAvailable: false, data: channels_data.channels.map(channel => ({
        value: channel.id,
        text: channel.name,
      })) })));
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
