import { r as registerInstance, h, e as Host } from './index-b28ea4d3.js';
import { c as channels_data, t as testConnection, a as selectChannel, u as updateChannelSettings } from './channel.store-c2c85d22.js';
import { l as locales } from './locales.store-0a8c61f1.js';
import './index-e5d38e9f.js';

const irChannelGeneralCss = ".sc-ir-channel-general-h{display:block}.label-style.sc-ir-channel-general{width:100px;text-align:end;padding-right:10px !important}.connection-testing-container.sc-ir-channel-general{display:flex;align-items:center;justify-content:space-between;margin-top:10px !important}.connection-title.sc-ir-channel-general{border-bottom:1px solid #e4e5ec}.ml-18.sc-ir-channel-general{margin-left:18% !important}";

const IrChannelGeneral = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.channel_status = null;
    this.buttonClicked = false;
    this.connection_status_message = '';
  }
  componentWillLoad() {
    var _a;
    if (this.channel_status !== 'create') {
      return;
    }
    this.connection_status_message = channels_data.isConnectedToChannel ? (_a = locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_ConnectedChannel : '';
  }
  handleTestConnectionClicked(e) {
    var _a, _b, _c;
    e.preventDefault();
    this.buttonClicked = true;
    if (this.channel_status !== 'create' || !((_a = channels_data.channel_settings) === null || _a === void 0 ? void 0 : _a.hotel_id) || channels_data.isConnectedToChannel) {
      return;
    }
    const status = testConnection();
    this.connection_status_message = status ? (_b = locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_ConnectedChannel : (_c = locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_IncorrectConnection;
    this.buttonClicked = false;
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return (h(Host, null, h("section", { class: "ml-18" }, h("fieldset", { class: "d-flex align-items-center" }, h("label", { htmlFor: "hotel_channels", class: "m-0 p-0 label-style" }, (_a = locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_Channel), h("ir-combobox", { input_id: "hotel_channels", disabled: channels_data.isConnectedToChannel, class: "flex-fill", value: (_b = channels_data.selectedChannel) === null || _b === void 0 ? void 0 : _b.name, onComboboxValueChange: (e) => {
        selectChannel(e.detail.data.toString());
      }, data: channels_data.channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      })) })), h("fieldset", { class: "d-flex align-items-center mt-1" }, h("label", { htmlFor: "hotel_title", class: "m-0 p-0 label-style" }, (_c = locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_Title), h("div", { class: "flex-fill" }, h("input", { id: "hotel_title", value: (_d = channels_data.channel_settings) === null || _d === void 0 ? void 0 : _d.hotel_title, onInput: e => updateChannelSettings('hotel_title', e.target.value), class: "form-control  flex-fill" })))), channels_data.selectedChannel && (h("form", { onSubmit: this.handleTestConnectionClicked.bind(this), class: "mt-3 connection-container" }, h("h3", { class: "text-left font-medium-2  py-0 my-0 connection-title py-1 mb-2" }, (_e = locales.entries) === null || _e === void 0 ? void 0 : _e.Lcz_ConnectionSettings), h("div", { class: "ml-18" }, h("fieldset", { class: "d-flex align-items-center my-1" }, h("label", { htmlFor: "hotel_id", class: "m-0 p-0 label-style" }, (_f = locales.entries) === null || _f === void 0 ? void 0 : _f.Lcz_HotelID), h("div", { class: "flex-fill" }, h("input", { id: "hotel_id", disabled: channels_data.isConnectedToChannel, class: `form-control  flex-fill bg-white ${this.buttonClicked && !((_g = channels_data.channel_settings) === null || _g === void 0 ? void 0 : _g.hotel_id) && 'border-danger'}`, value: (_h = channels_data.channel_settings) === null || _h === void 0 ? void 0 : _h.hotel_id, onInput: e => updateChannelSettings('hotel_id', e.target.value) }))), h("div", { class: 'connection-testing-container' }, h("span", null, this.connection_status_message), h("button", { class: "btn btn-outline-secondary btn-sm", type: "submit" }, (_j = locales.entries) === null || _j === void 0 ? void 0 : _j.Lcz_TestConnection)))))));
  }
};
IrChannelGeneral.style = irChannelGeneralCss;

export { IrChannelGeneral as ir_channel_general };

//# sourceMappingURL=ir-channel-general.entry.js.map