import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as channels_data, s as selectChannel, u as updateChannelSettings, t as testConnection } from './channel.store.js';
import { d as defineCustomElement$1 } from './ir-combobox2.js';

const irChannelGeneralCss = ".sc-ir-channel-general-h{display:block}.label-style.sc-ir-channel-general{width:100px}.connection-testing-container.sc-ir-channel-general{display:flex;align-items:center;justify-content:space-between;margin-top:10px !important}.connection-title.sc-ir-channel-general{border-bottom:1px solid #e4e5ec}";

const IrChannelGeneral = /*@__PURE__*/ proxyCustomElement(class IrChannelGeneral extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    var _a, _b, _c;
    return (h(Host, null, h("fieldset", { class: "d-flex align-items-center" }, h("label", { htmlFor: "", class: "m-0 p-0 label-style" }, "Channel:"), h("ir-combobox", {
      // disabled={channels_data.isConnectedToChannel}
      class: "flex-fill", value: (_a = channels_data.selectedChannel) === null || _a === void 0 ? void 0 : _a.name, onComboboxValueChange: (e) => {
        selectChannel(e.detail.data.toString());
      }, placeholder: "Choose channel from list", data: channels_data.channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      }))
    })), h("fieldset", { class: "d-flex align-items-center mt-1" }, h("label", { htmlFor: "", class: "m-0 p-0 label-style" }, "Title:"), h("div", { class: "flex-fill" }, h("input", { value: (_b = channels_data.channel_settings) === null || _b === void 0 ? void 0 : _b.hotel_title, onInput: e => updateChannelSettings('hotel_title', e.target.value), class: "form-control  flex-fill" }))), channels_data.selectedChannel && (h("section", { class: "mt-3 connection-container" }, h("h3", { class: "text-left font-medium-2  py-0 my-0 connection-title py-1 mb-2" }, "Connection Settings"), h("fieldset", { class: "d-flex align-items-center my-1" }, h("label", { htmlFor: "", class: "m-0 p-0 label-style" }, "Hotel ID:"), h("div", { class: "flex-fill" }, h("input", { disabled: channels_data.isConnectedToChannel, class: "form-control  flex-fill bg-white", value: (_c = channels_data.channel_settings) === null || _c === void 0 ? void 0 : _c.hotel_id, onInput: e => updateChannelSettings('hotel_id', e.target.value) }))), h("div", { class: 'connection-testing-container' }, h("span", null), h("button", { class: "btn btn-outline-secondary btn-sm", onClick: () => testConnection() }, "Test Connection"))))));
  }
  static get style() { return irChannelGeneralCss; }
}, [2, "ir-channel-general"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-channel-general", "ir-combobox"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-channel-general":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannelGeneral);
      }
      break;
    case "ir-combobox":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrChannelGeneral as I, defineCustomElement as d };

//# sourceMappingURL=ir-channel-general2.js.map