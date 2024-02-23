import { r as registerInstance, c as createEvent, h, H as Host } from './index-795d2df3.js';
import { C as ChannelService } from './channel.service-ca65edbe.js';
import { o as onChannelChange } from './channel.store-145ed235.js';
import { l as locales } from './locales.store-bd6e6ba2.js';
import './Token-2955ce2c.js';
import './calendar-data-b063a88d.js';

const irChannelEditorCss = ".sc-ir-channel-editor-h{display:block;position:relative}nav.sc-ir-channel-editor{z-index:10}.top-border.sc-ir-channel-editor{border-top:1px solid #e4e5ec}.tab-container.sc-ir-channel-editor{overflow-y:auto;padding-right:0;margin-right:0}";

const IrChannelEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.saveChannelFinished = createEvent(this, "saveChannelFinished", 7);
    this.closeSideBar = createEvent(this, "closeSideBar", 7);
    var _a, _b, _c;
    this.channelService = new ChannelService();
    this.channel_status = null;
    this.ticket = undefined;
    this.selectedTab = '';
    this.isLoading = false;
    this.headerTitles = [
      {
        id: 'general_settings',
        name: (_a = locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_GeneralSettings,
        disabled: false,
      },
      { id: 'mapping', name: (_b = locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_Mapping, disabled: true },
      { id: 'channel_booking', name: (_c = locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_ChannelBooking, disabled: true },
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
      await this.channelService.saveConnectedChannel(false);
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
    return (h(Host, { class: " d-flex flex-column h-100" }, h("nav", { class: "px-1 position-sticky sticky-top py-1 top-0 bg-white" }, h("div", { class: "d-flex align-items-center  justify-content-between" }, h("h3", { class: "text-left font-medium-2  py-0 my-0" }, this.channel_status === 'create' ? (_a = locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_CreateChannel : (_b = locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_EditChannel), h("ir-icon", { class: 'm-0 p-0 close', onIconClickHandler: () => {
        this.closeSideBar.emit(null);
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), h("ir-channel-header", { class: "mt-1 px-0", headerTitles: this.headerTitles })), h("section", { class: "py-1 flex-fill tab-container px-1" }, this.renderTabScreen()), h("ir-button", { isLoading: this.isLoading, onClickHanlder: () => this.saveConnectedChannel(), class: "px-1 py-1 top-border", btn_styles: "w-100  justify-content-center align-items-center", text: locales.entries.Lcz_Save })));
  }
};
IrChannelEditor.style = irChannelEditorCss;

const irSwitchCss = ".sc-ir-switch-h{display:block;position:relative;box-sizing:border-box;--ir-root-width:36px;--ir-root-height:20px}.hidden-input.sc-ir-switch{transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0;width:var(--ir-root-width);height:var(--ir-root-height)}.SwitchRoot.sc-ir-switch{all:unset;padding:0;margin:0;width:var(--ir-root-width);height:var(--ir-root-height);background-color:var(--red);position:relative;box-shadow:rgba(0, 0, 0, 0.2) 0px 2px 10px;--webkit-tap-highlight-color:rgba(0, 0, 0, 0);border-radius:9999px;box-sizing:border-box}.SwitchRoot.sc-ir-switch:disabled{opacity:80%}.SwitchRoot.sc-ir-switch:focus-visible{outline:1px solid rgba(55, 188, 155, 0.2);outline-offset:1px}.SwitchRoot[data-state='checked'].sc-ir-switch{background-color:rgb(55, 188, 155)}.SwitchThumb.sc-ir-switch{padding:0;margin:0;display:block;width:calc(var(--ir-root-height) - 3px);height:calc(var(--ir-root-height) - 3px);border-radius:9999px;background:white;box-shadow:rgba(0, 0, 0, 0.2) 0px;transition:transform 100ms ease 0s;transform:translateX(2px);will-change:transform}.SwitchThumb[data-state='checked'].sc-ir-switch{transform:translateX(calc(var(--ir-root-height) - 3px))}";

const IrSwitch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.checkChange = createEvent(this, "checkChange", 7);
    this._id = '';
    this.checked = false;
    this.switchId = undefined;
    this.disabled = false;
  }
  componentWillLoad() {
    this._id = this.generateRandomId(10);
  }
  componentDidLoad() {
    if (!this.switchRoot) {
      return;
    }
    this.switchRoot.setAttribute('aria-checked', this.checked ? 'true' : 'false');
  }
  generateRandomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  handleCheckChange() {
    this.checked = !this.checked;
    this.switchRoot.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    this.checkChange.emit(this.checked);
  }
  render() {
    return (h(Host, null, h("button", { disabled: this.disabled, ref: el => (this.switchRoot = el), type: "button", id: this.switchId || this._id, onClick: this.handleCheckChange.bind(this), role: "switch", "data-state": this.checked ? 'checked' : 'unchecked', value: 'on', class: "SwitchRoot" }, h("span", { class: "SwitchThumb", "data-state": this.checked ? 'checked' : 'unchecked' })), h("input", { type: "checkbox", checked: this.checked, "aria-hidden": "true", tabIndex: -1, value: 'on', class: "hidden-input" })));
  }
};
IrSwitch.style = irSwitchCss;

export { IrChannelEditor as ir_channel_editor, IrSwitch as ir_switch };

//# sourceMappingURL=ir-channel-editor_2.entry.js.map