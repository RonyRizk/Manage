import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as calendar_data } from './calendar-data.js';
import { o as onChannelChange, c as channels_data } from './channel.store.js';
import { l as locales } from './locales.store.js';
import { a as axios } from './axios.js';
import { d as defineCustomElement$6 } from './ir-button2.js';
import { d as defineCustomElement$5 } from './ir-channel-general2.js';
import { d as defineCustomElement$4 } from './ir-channel-header2.js';
import { d as defineCustomElement$3 } from './ir-channel-mapping2.js';
import { d as defineCustomElement$2 } from './ir-combobox2.js';
import { d as defineCustomElement$1 } from './ir-icon2.js';

const irChannelEditorCss = ".sc-ir-channel-editor-h{display:block;position:relative}nav.sc-ir-channel-editor{z-index:10}.top-border.sc-ir-channel-editor{border-top:1px solid #e4e5ec}.tab-container.sc-ir-channel-editor{overflow-y:auto;padding-right:0;margin-right:0}";

const IrChannelEditor = /*@__PURE__*/ proxyCustomElement(class IrChannelEditor extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.saveChannelFinished = createEvent(this, "saveChannelFinished", 7);
    this.closeSideBar = createEvent(this, "closeSideBar", 7);
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
  static get style() { return irChannelEditorCss; }
}, [2, "ir-channel-editor", {
    "channel_status": [1],
    "selectedTab": [32],
    "isLoading": [32],
    "headerTitles": [32],
    "selectedRoomType": [32]
  }, [[0, "tabChanged", "handleTabChange"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-channel-editor", "ir-button", "ir-channel-general", "ir-channel-header", "ir-channel-mapping", "ir-combobox", "ir-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-channel-editor":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannelEditor);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-channel-general":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-channel-header":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-channel-mapping":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-combobox":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrChannelEditor as I, defineCustomElement as d };

//# sourceMappingURL=ir-channel-editor2.js.map