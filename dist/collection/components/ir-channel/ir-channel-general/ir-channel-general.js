import channels_data, { selectChannel, testConnection, updateChannelSettings } from "../../../../../src/stores/channel.store";
import locales from "../../../../../src/stores/locales.store";
import { Host, h } from "@stencil/core";
export class IrChannelGeneral {
  constructor() {
    this.channel_status = null;
    this.buttonClicked = false;
    this.connection_status_message = '';
    this.status = false;
  }
  componentWillLoad() {
    var _a;
    if (this.channel_status !== 'create' || !channels_data.isConnectedToChannel) {
      return;
    }
    this.connection_status_message = channels_data.isConnectedToChannel ? (_a = locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_ConnectedChannel : '';
    this.status = true;
  }
  handleTestConnectionClicked(e) {
    var _a, _b, _c;
    e.preventDefault();
    this.buttonClicked = true;
    if (this.channel_status !== 'create' || !((_a = channels_data.channel_settings) === null || _a === void 0 ? void 0 : _a.hotel_id) || channels_data.isConnectedToChannel) {
      return;
    }
    const status = testConnection();
    this.status = status;
    this.connection_status_message = status ? (_b = locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_ConnectedChannel : (_c = locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_IncorrectConnection;
    this.buttonClicked = false;
    this.connectionStatus.emit(this.status);
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return (h(Host, { class: "px-1" }, h("section", { class: "ml-18" }, h("fieldset", { class: "d-flex align-items-center" }, h("label", { htmlFor: "hotel_channels", class: "m-0 p-0 label-style" }, (_a = locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_Channel), h("ir-combobox", { input_id: "hotel_channels", disabled: channels_data.isConnectedToChannel, class: "flex-fill", value: (_b = channels_data.selectedChannel) === null || _b === void 0 ? void 0 : _b.name, onComboboxValueChange: (e) => {
        selectChannel(e.detail.data.toString());
      }, data: channels_data.channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      })) })), h("fieldset", { class: "d-flex align-items-center mt-1" }, h("label", { htmlFor: "hotel_title", class: "m-0 p-0 label-style" }, (_c = locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_Title), h("div", { class: "flex-fill" }, h("input", { id: "hotel_title", value: (_d = channels_data.channel_settings) === null || _d === void 0 ? void 0 : _d.hotel_title, onInput: e => updateChannelSettings('hotel_title', e.target.value), class: "form-control  flex-fill" })))), channels_data.selectedChannel && (h("form", { onSubmit: this.handleTestConnectionClicked.bind(this), class: "mt-3 connection-container" }, h("h3", { class: "text-left font-medium-2  py-0 my-0 connection-title py-1 mb-2" }, (_e = locales.entries) === null || _e === void 0 ? void 0 : _e.Lcz_ConnectionSettings), h("div", { class: "ml-18" }, h("fieldset", { class: "d-flex align-items-center my-1" }, h("label", { htmlFor: "hotel_id", class: "m-0 p-0 label-style" }, (_f = locales.entries) === null || _f === void 0 ? void 0 : _f.Lcz_HotelID), h("div", { class: "flex-fill" }, h("input", { id: "hotel_id", disabled: channels_data.isConnectedToChannel, class: `form-control  flex-fill bg-white ${this.buttonClicked && !((_g = channels_data.channel_settings) === null || _g === void 0 ? void 0 : _g.hotel_id) && 'border-danger'}`, value: (_h = channels_data.channel_settings) === null || _h === void 0 ? void 0 : _h.hotel_id, onInput: e => updateChannelSettings('hotel_id', e.target.value) }))), h("div", { class: 'connection-testing-container' }, h("div", { class: "d-flex align-items-center" }, this.connection_status_message &&
      (this.status ? (h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "12", width: "12", viewBox: "0 0 512 512" }, h("path", { fill: "var(--green)", d: "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" }))) : (h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "12", width: "12", viewBox: "0 0 512 512" }, h("path", { fill: "var(--yellow)", d: "M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" })))), h("span", null, this.connection_status_message)), h("button", { class: "btn btn-outline-secondary btn-sm", type: "submit" }, (_j = locales.entries) === null || _j === void 0 ? void 0 : _j.Lcz_TestConnection)))))));
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
  static get properties() {
    return {
      "channel_status": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'create' | 'edit' | null",
          "resolved": "\"create\" | \"edit\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "channel_status",
        "reflect": false,
        "defaultValue": "null"
      }
    };
  }
  static get states() {
    return {
      "buttonClicked": {},
      "connection_status_message": {},
      "status": {}
    };
  }
  static get events() {
    return [{
        "method": "connectionStatus",
        "name": "connectionStatus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=ir-channel-general.js.map
