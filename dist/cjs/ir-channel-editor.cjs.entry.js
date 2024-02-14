'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');

const irChannelEditorCss = ".sc-ir-channel-editor-h{display:block}nav.sc-ir-channel-editor{z-index:10}";

const IrChannelEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.closeSideBar = index.createEvent(this, "closeSideBar", 7);
    this.selectedTab = '';
    this.headerTitles = [
      {
        id: 'general_settings',
        name: 'General Settings',
        disabled: false,
      },
      { id: 'mapping', name: 'Mapping', disabled: false },
      { id: 'channel_booking', name: 'Channel Booking', disabled: true },
    ];
  }
  componentWillLoad() {
    this.selectedTab = this.headerTitles[0].id;
  }
  handleTabChange(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.selectedTab = e.detail;
  }
  renderTabScreen() {
    switch (this.selectedTab) {
      case 'general_settings':
        return index.h("ir-channel-general", null);
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
  render() {
    return (index.h(index.Host, { class: "px-1" }, index.h("nav", { class: "position-sticky sticky-top py-1 top-0 bg-white" }, index.h("div", { class: "d-flex align-items-center  justify-content-between" }, index.h("h3", { class: "text-left font-medium-2  py-0 my-0" }, "Create Channel"), index.h("ir-icon", { class: 'm-0 p-0', onIconClickHandler: () => {
        this.closeSideBar.emit(null);
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, index.h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), index.h("ir-channel-header", { class: "mt-1 px-0", headerTitles: this.headerTitles })), index.h("section", { class: "content pb-1" }, this.renderTabScreen())));
  }
};
IrChannelEditor.style = irChannelEditorCss;

exports.ir_channel_editor = IrChannelEditor;

//# sourceMappingURL=ir-channel-editor.cjs.entry.js.map