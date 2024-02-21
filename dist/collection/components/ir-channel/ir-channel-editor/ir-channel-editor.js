import calendar_data from "../../../../../src/stores/calendar-data";
import channels_data, { onChannelChange } from "../../../../../src/stores/channel.store";
import locales from "../../../../../src/stores/locales.store";
import { Host, h } from "@stencil/core";
import axios from "axios";
export class IrChannelEditor {
  constructor() {
    this.channel_status = null;
    this.selectedTab = '';
    this.isLoading = false;
    this.headerTitles = [
      {
        id: 'general_settings',
        name: 'General Settings',
        disabled: false,
      },
      { id: 'mapping', name: 'Mapping', disabled: true },
      { id: 'channel_booking', name: 'Channel Booking', disabled: true },
    ];
    this.selectedRoomType = [];
  }
  componentWillLoad() {
    if (this.channel_status === 'edit') {
      this.enableAllHeaders();
    }
    this.selectedTab = this.headerTitles[0].id;
    onChannelChange('isConnectedToChannel', newValue => {
      if (!!newValue) {
        this.enableAllHeaders();
      }
    });
  }
  handleTabChange(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.selectedTab = e.detail;
  }
  renderTabScreen() {
    switch (this.selectedTab) {
      case 'general_settings':
        return h("ir-channel-general", { channel_status: this.channel_status });
      case 'mapping':
        return h("ir-channel-mapping", null);
      case 'channel_booking':
        return h("div", null, "channel booking");
      default:
        return null;
    }
  }
  enableAllHeaders() {
    this.headerTitles = this.headerTitles.map((title, index) => (index < this.headerTitles.length - 1 ? Object.assign(Object.assign({}, title), { disabled: false }) : title));
  }
  disableNonFirstTabs() {
    this.headerTitles = this.headerTitles.map((title, index) => (index > 0 ? Object.assign(Object.assign({}, title), { disabled: true }) : title));
  }
  async saveConnectedChannel() {
    try {
      this.isLoading = true;
      const body = {
        // id: channels_data.selectedChannel.id,
        id: -1,
        title: channels_data.channel_settings.hotel_title,
        is_active: false,
        channel: { id: channels_data.selectedChannel.id, name: channels_data.selectedChannel.name },
        property: { id: calendar_data.id, name: calendar_data.name },
        map: channels_data.mappedChannels,
        is_remove: false,
      };
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (!token) {
        throw new Error('Invalid Token');
      }
      const { data } = await axios.post(`/Handle_Connected_Channel?Ticket=${token}`, body);
      this.saveChannelFinished.emit();
      console.log(data);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  render() {
    return (h(Host, { class: " d-flex flex-column h-100" }, h("nav", { class: "px-1 position-sticky sticky-top py-1 top-0 bg-white" }, h("div", { class: "d-flex align-items-center  justify-content-between" }, h("h3", { class: "text-left font-medium-2  py-0 my-0" }, this.channel_status === 'create' ? 'Create Channel' : 'Edit Channel'), h("ir-icon", { class: 'm-0 p-0 close', onIconClickHandler: () => {
        this.closeSideBar.emit(null);
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), h("ir-channel-header", { class: "mt-1 px-0", headerTitles: this.headerTitles })), h("section", { class: "py-1 flex-fill tab-container px-1" }, this.renderTabScreen()), h("ir-button", { isLoading: this.isLoading, onClickHanlder: () => this.saveConnectedChannel(), class: "px-1 py-1 top-border", btn_styles: "w-100  justify-content-center align-items-center", text: locales.entries.Lcz_Save })));
  }
  static get is() { return "ir-channel-editor"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-channel-editor.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-channel-editor.css"]
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
      "selectedTab": {},
      "isLoading": {},
      "headerTitles": {},
      "selectedRoomType": {}
    };
  }
  static get events() {
    return [{
        "method": "saveChannelFinished",
        "name": "saveChannelFinished",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }, {
        "method": "closeSideBar",
        "name": "closeSideBar",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }];
  }
  static get listeners() {
    return [{
        "name": "tabChanged",
        "method": "handleTabChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-channel-editor.js.map
