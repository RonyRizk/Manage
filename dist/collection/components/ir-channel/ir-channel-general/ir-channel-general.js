import channels_data, { selectChannel } from "../../../../../src/stores/channel.store";
import { Host, h } from "@stencil/core";
export class IrChannelGeneral {
  render() {
    var _a;
    return (h(Host, null, h("p", null, "Channel"), h("ir-combobox", { value: (_a = channels_data.selectedChannel) === null || _a === void 0 ? void 0 : _a.name, onComboboxValueChange: (e) => {
        selectChannel(e.detail.data.toString());
      }, placeholder: "Choose channel from list", data: channels_data.channels.map(channel => ({
        id: channel.id,
        name: channel.name,
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
