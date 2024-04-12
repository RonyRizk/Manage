'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const channel_service = require('./channel.service-e612fccb.js');
const channel_store = require('./channel.store-d60b9f39.js');
const locales_store = require('./locales.store-8fed15eb.js');
require('./Token-7fd57fe8.js');
require('./calendar-data-96bc0c2a.js');
require('./index-797ee4c0.js');

const irChannelEditorCss = ".sc-ir-channel-editor-h{display:block;position:relative}nav.sc-ir-channel-editor{z-index:10}.top-border.sc-ir-channel-editor{border-top:1px solid #e4e5ec}.tab-container.sc-ir-channel-editor{overflow-y:auto;padding-right:0;margin-right:0}";

const IrChannelEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.saveChannelFinished = index.createEvent(this, "saveChannelFinished", 7);
    this.closeSideBar = index.createEvent(this, "closeSideBar", 7);
    var _a, _b, _c;
    this.channelService = new channel_service.ChannelService();
    this.channel_status = null;
    this.ticket = undefined;
    this.selectedTab = '';
    this.isLoading = false;
    this.headerTitles = [
      {
        id: 'general_settings',
        name: (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_GeneralSettings,
        disabled: false,
      },
      { id: 'mapping', name: (_b = locales_store.locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_Mapping, disabled: true },
      { id: 'channel_booking', name: (_c = locales_store.locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_ChannelBooking, disabled: true },
    ];
    this.selectedRoomType = [];
  }
  componentWillLoad() {
    if (this.ticket) {
      this.channelService.setToken(this.ticket);
    }
    if (this.channel_status === 'edit') {
      this.enableAllHeaders();
    }
    this.selectedTab = this.headerTitles[0].id;
    channel_store.onChannelChange('isConnectedToChannel', newValue => {
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
        return index.h("ir-channel-general", { channel_status: this.channel_status });
      case 'mapping':
        return index.h("ir-channel-mapping", null);
      case 'channel_booking':
        return index.h("div", null, "channel booking");
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
      await this.channelService.saveConnectedChannel(null, false);
      this.saveChannelFinished.emit();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  render() {
    var _a, _b;
    return (index.h(index.Host, { class: " d-flex flex-column h-100" }, index.h("nav", { class: "position-sticky sticky-top pb-1 top-0 bg-white " }, index.h("div", { class: "d-flex align-items-center px-1 py-1  justify-content-between" }, index.h("h3", { class: "text-left font-medium-2  py-0 my-0" }, this.channel_status === 'create' ? (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_CreateChannel : (_b = locales_store.locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_EditChannel), index.h("ir-icon", { class: 'm-0 p-0 close', onIconClickHandler: () => {
        this.closeSideBar.emit(null);
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, index.h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), index.h("ir-channel-header", { class: "mt-1 px-0", headerTitles: this.headerTitles })), index.h("section", { class: "flex-fill tab-container px-1" }, this.renderTabScreen()), index.h("ir-button", { isLoading: this.isLoading, onClickHanlder: () => this.saveConnectedChannel(), class: "px-1 py-1 top-border", btn_styles: "w-100  justify-content-center align-items-center", text: locales_store.locales.entries.Lcz_Save })));
  }
};
IrChannelEditor.style = irChannelEditorCss;

exports.ir_channel_editor = IrChannelEditor;

//# sourceMappingURL=ir-channel-editor.cjs.entry.js.map