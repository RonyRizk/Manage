import channels_data, { selectChannel } from "../../../../../src/stores/channel.store";
import { Host, h } from "@stencil/core";
export class IrChannelGeneral {
  render() {
    var _a;
    return (h(Host, null, h("fieldset", { class: "d-flex align-items-center" }, h("label", { htmlFor: "", class: "m-0 p-0 label-style" }, "Channel:"), h("ir-combobox", { class: "flex-fill", value: (_a = channels_data.selectedChannel) === null || _a === void 0 ? void 0 : _a.name, onComboboxValueChange: (e) => {
        selectChannel(e.detail.data.toString());
      }, placeholder: "Choose channel from list", data: channels_data.channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      })) })), h("fieldset", { class: "d-flex align-items-center mt-1" }, h("label", { htmlFor: "", class: "m-0 p-0 label-style" }, "Title:"), h("div", { class: "flex-fill" }, h("input", { class: "form-control  flex-fill" })))));
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
