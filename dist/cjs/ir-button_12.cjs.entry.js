'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');
const room_service = require('./room.service-a332acfd.js');
const channel_store = require('./channel.store-d6067ee4.js');
const axios = require('./axios-394374e5.js');
const calendarData = require('./calendar-data-00cf91e3.js');

const irButtonCss = ".loader{width:11px;height:11px;border:2px solid #fff;border-bottom-color:transparent;border-radius:50%;margin:0;padding:0;display:inline-flex;box-sizing:border-box;animation:rotation 1s linear infinite}.button-icon{padding:0;margin-top:0}.button-icon[data-state='loading']{display:none}.button-text{padding:0 5px}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const IrButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.clickHanlder = index.createEvent(this, "clickHanlder", 7);
    this.name = undefined;
    this.text = undefined;
    this.icon = 'ft-save';
    this.btn_color = 'primary';
    this.size = 'md';
    this.textSize = 'md';
    this.btn_block = true;
    this.btn_disabled = false;
    this.btn_type = 'button';
    this.isLoading = false;
    this.btn_styles = undefined;
  }
  connectedCallback() { }
  disconnectedCallback() { }
  render() {
    let blockClass = this.btn_block ? 'btn-block' : '';
    return (index.h("button", { onClick: () => this.clickHanlder.emit(), class: `btn btn-${this.btn_color} ${this.btn_styles} d-flex align-items-center btn-${this.size} text-${this.textSize} ${blockClass}`, type: this.btn_type, disabled: this.btn_disabled }, index.h("span", { class: "button-icon", "data-state": this.isLoading ? 'loading' : '' }, index.h("slot", { name: "icon" })), this.isLoading && index.h("span", { class: "loader m-0 p-0" }), this.text && index.h("span", { class: "button-text m-0" }, this.text)));
  }
};
IrButton.style = irButtonCss;

const irChannelCss = ".sc-ir-channel-h{display:block}.dropdown-toggle.sc-ir-channel{color:var(--blue)}.dropdown-toggle.sc-ir-channel::after{content:none;display:none}.dropdown-toggle.sc-ir-channel .caret-icon.sc-ir-channel{transition:transform 0.15s ease-in-out, color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,\r\n    -webkit-box-shadow 0.15s ease-in-out}.btn.sc-ir-channel:hover .caret-icon.sc-ir-channel path.sc-ir-channel{fill:#6b6f82}.show.sc-ir-channel .caret-icon.sc-ir-channel{transform:rotate(-180deg)}";

const IrChannel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.roomService = new room_service.RoomService();
    this.ticket = '';
    this.propertyid = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.channel_status = null;
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      const [, , languageTexts] = await Promise.all([
        this.roomService.fetchData(this.propertyid, this.language),
        this.roomService.getExposedChannels(),
        this.roomService.fetchLanguage(this.language),
      ]);
      console.log(languageTexts);
      if (!axios.locales.entries) {
        axios.locales.entries = languageTexts.entries;
        axios.locales.direction = languageTexts.direction;
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  async ticketChanged() {
    sessionStorage.setItem('token', JSON.stringify(this.ticket));
    this.initializeApp();
  }
  render() {
    var _a;
    return (index.h(index.Host, null, index.h("section", { class: "p-2" }, index.h("div", { class: "d-flex w-100 justify-content-end mb-2" }, index.h("ir-button", { text: 'Create', size: "sm", onClickHanlder: () => (this.channel_status = 'create') })), index.h("div", null, index.h("table", { class: "table" }, index.h("thead", { class: "" }, index.h("tr", null, index.h("th", { scope: "col", class: "text-left" }, "Title"), index.h("th", { scope: "col" }, "Channel"), index.h("th", { scope: "col" }, "Status"), index.h("th", { scope: "col" }, "Actions"))), index.h("tbody", null, (_a = channel_store.channels_data.connected_channels) === null || _a === void 0 ? void 0 : _a.map(channel => (index.h("tr", { key: channel.channel.id }, index.h("th", { scope: "row", class: "text-left" }, channel.title), index.h("th", { scope: "row" }, channel.channel.name), index.h("td", null, index.h("ir-switch", { checked: channel.is_active })), index.h("th", null, index.h("div", { class: "btn-group" }, index.h("button", { type: "button", class: "btn  dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, index.h("span", { class: "mr-1" }, "Actions"), index.h("svg", { class: 'caret-icon', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", height: 14, width: 14 }, index.h("path", { fill: "var(--blue)", d: "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" }))), index.h("div", { class: "dropdown-menu dropdown-menu-right" }, index.h("button", { class: "dropdown-item border-bottom border-light", type: "button" }, "Edit"), index.h("button", { class: "dropdown-item border-bottom border-light", type: "button" }, "View logs"), index.h("button", { class: "dropdown-item border-bottom border-light", type: "button" }, "Full Sync"), index.h("button", { class: "dropdown-item border-bottom border-light", type: "button" }, "Pull Future Reservations"), index.h("button", { class: "dropdown-item", type: "button" }, "Remove"))))))))))), index.h("ir-sidebar", { showCloseButton: false, onIrSidebarToggle: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.channel_status = null;
        channel_store.resetStore();
      }, open: this.channel_status !== null }, this.channel_status && (index.h("ir-channel-editor", { onCloseSideBar: () => {
        this.channel_status = null;
        channel_store.resetStore();
      } }))), index.h("ir-modal", null)));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrChannel.style = irChannelCss;

const irChannelEditorCss = ".sc-ir-channel-editor-h{display:block;position:relative}nav.sc-ir-channel-editor{z-index:10}.top-border.sc-ir-channel-editor{border-top:1px solid #e4e5ec}.tab-container.sc-ir-channel-editor{overflow-y:auto;padding-right:0;margin-right:0}";

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
      { id: 'mapping', name: 'Mapping', disabled: true },
      { id: 'channel_booking', name: 'Channel Booking', disabled: true },
    ];
    this.selectedRoomType = [];
  }
  componentWillLoad() {
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
    return (index.h(index.Host, { class: " d-flex flex-column h-100" }, index.h("nav", { class: "px-1 position-sticky sticky-top py-1 top-0 bg-white" }, index.h("div", { class: "d-flex align-items-center  justify-content-between" }, index.h("h3", { class: "text-left font-medium-2  py-0 my-0" }, "Create Channel"), index.h("ir-icon", { class: 'm-0 p-0 close', onIconClickHandler: () => {
        this.closeSideBar.emit(null);
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, index.h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), index.h("ir-channel-header", { class: "mt-1 px-0", headerTitles: this.headerTitles })), index.h("section", { class: "py-1 flex-fill tab-container px-1" }, this.renderTabScreen()), index.h("ir-button", { class: "px-1 py-1 top-border", btn_styles: "w-100  justify-content-center", text: axios.locales.entries.Lcz_Save })));
  }
};
IrChannelEditor.style = irChannelEditorCss;

const irChannelGeneralCss = ".sc-ir-channel-general-h{display:block}.label-style.sc-ir-channel-general{width:100px}.connection-testing-container.sc-ir-channel-general{display:flex;align-items:center;justify-content:space-between;margin-top:10px !important}.connection-title.sc-ir-channel-general{border-bottom:1px solid #e4e5ec}";

const IrChannelGeneral = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    var _a, _b, _c;
    return (index.h(index.Host, null, index.h("fieldset", { class: "d-flex align-items-center" }, index.h("label", { htmlFor: "", class: "m-0 p-0 label-style" }, "Channel:"), index.h("ir-combobox", {
      // disabled={channels_data.isConnectedToChannel}
      class: "flex-fill", value: (_a = channel_store.channels_data.selectedChannel) === null || _a === void 0 ? void 0 : _a.name, onComboboxValueChange: (e) => {
        channel_store.selectChannel(e.detail.data.toString());
      }, placeholder: "Choose channel from list", data: channel_store.channels_data.channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      }))
    })), index.h("fieldset", { class: "d-flex align-items-center mt-1" }, index.h("label", { htmlFor: "", class: "m-0 p-0 label-style" }, "Title:"), index.h("div", { class: "flex-fill" }, index.h("input", { value: (_b = channel_store.channels_data.channel_settings) === null || _b === void 0 ? void 0 : _b.hotel_title, onInput: e => channel_store.updateChannelSettings('hotel_title', e.target.value), class: "form-control  flex-fill" }))), channel_store.channels_data.selectedChannel && (index.h("section", { class: "mt-3 connection-container" }, index.h("h3", { class: "text-left font-medium-2  py-0 my-0 connection-title py-1 mb-2" }, "Connection Settings"), index.h("fieldset", { class: "d-flex align-items-center my-1" }, index.h("label", { htmlFor: "", class: "m-0 p-0 label-style" }, "Hotel ID:"), index.h("div", { class: "flex-fill" }, index.h("input", { disabled: channel_store.channels_data.isConnectedToChannel, class: "form-control  flex-fill bg-white", value: (_c = channel_store.channels_data.channel_settings) === null || _c === void 0 ? void 0 : _c.hotel_id, onInput: e => channel_store.updateChannelSettings('hotel_id', e.target.value) }))), index.h("div", { class: 'connection-testing-container' }, index.h("span", null), index.h("button", { class: "btn btn-outline-secondary btn-sm", onClick: () => channel_store.testConnection() }, "Test Connection"))))));
  }
};
IrChannelGeneral.style = irChannelGeneralCss;

const irChannelHeaderCss = ".sc-ir-channel-header-h{display:block;position:relative;padding:0;margin:0;border-bottom:1px solid #e4e5ec}ul.sc-ir-channel-header{display:flex;align-items:center;gap:2rem;padding:0}.tab.sc-ir-channel-header{font-size:0.95rem;font-weight:600;cursor:pointer;position:relative;margin:0;padding:0;transition:color 0.3s ease;user-select:none}.tab[data-disabled].sc-ir-channel-header{cursor:auto}.tab.sc-ir-channel-header:hover{opacity:80%}.tab[data-state='selected'].sc-ir-channel-header,.tab[data-state='selected'].sc-ir-channel-header:hover{color:var(--blue);opacity:100%}.active-indicator.sc-ir-channel-header{padding:0;bottom:0px;position:absolute;height:3px;border-radius:4px;transition:transform 0.3s ease, width 0.3s ease;background:var(--blue)}";

const IrChannelHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.tabChanged = index.createEvent(this, "tabChanged", 7);
    this.headerTitles = [];
    this.selectedIndex = 0;
  }
  componentDidLoad() {
    this.updateActiveIndicator();
  }
  disconnectedCallback() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
  handleTabSelection(index) {
    this.selectedIndex = index;
    this.updateActiveIndicator();
    this.tabChanged.emit(this.headerTitles[this.selectedIndex].id);
  }
  updateActiveIndicator() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    requestAnimationFrame(() => {
      const selectedTab = this.el.querySelector(`li.tab[data-state="selected"]`);
      if (selectedTab) {
        const { left, width } = selectedTab.getBoundingClientRect();
        const parentLeft = this.el.getBoundingClientRect().left;
        const position = left - parentLeft;
        this.activeIndicator.style.width = `${width}px`;
        this.activeIndicator.style.transform = `translateX(${position}px)`;
      }
    });
  }
  render() {
    return (index.h(index.Host, null, index.h("ul", null, this.headerTitles.map((title, index$1) => (index.h("li", { class: `tab ${title.disabled ? 'text-light' : ''}`, key: title.id, onClick: () => {
        if (!title.disabled)
          this.handleTabSelection(index$1);
      }, "data-disabled": title.disabled, "data-state": this.selectedIndex === index$1 ? 'selected' : '' }, title.name)))), index.h("span", { class: "active-indicator", ref: el => (this.activeIndicator = el) })));
  }
  get el() { return index.getElement(this); }
};
IrChannelHeader.style = irChannelHeaderCss;

class IrMappingService {
  checkMappingExists(id, isRoomType, roomTypeId) {
    const mapped_id = channel_store.channels_data.mappedChannels.find(m => m.channel_id === id);
    if (!mapped_id) {
      if (!isRoomType) {
        const matchingRoomType = channel_store.channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
        if (!matchingRoomType) {
          return { hide: true, result: undefined };
        }
      }
      return { hide: false, result: undefined };
    }
    if (isRoomType) {
      return { hide: false, result: calendarData.calendar_data.roomsInfo.find(room => room.id.toString() === mapped_id.ir_id) };
    }
    if (!roomTypeId) {
      throw new Error('Missing room type id');
    }
    const matchingRoomType = channel_store.channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
    const room_type = calendarData.calendar_data.roomsInfo.find(room => room.id.toString() === matchingRoomType.ir_id);
    if (!room_type) {
      throw new Error('Invalid Room type');
    }
    return { hide: false, result: room_type.rateplans.find(r => r.id.toString() === mapped_id.ir_id) };
  }
  getAppropriateRooms(isRoomType, roomTypeId) {
    if (isRoomType) {
      const filteredRoomTypes = calendarData.calendar_data.roomsInfo.filter(room => channel_store.channels_data.mappedChannels.find(m => m.ir_id.toString() === room.id.toString()) === undefined && room.is_active);
      return filteredRoomTypes.map(room => ({ id: room.id.toString(), name: room.name }));
    }
    if (!roomTypeId) {
      throw new Error('Missing roomType id');
    }
    const matchingRoomType = channel_store.channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
    if (!matchingRoomType) {
      throw new Error('Invalid room type id');
    }
    const selectedRoomType = calendarData.calendar_data.roomsInfo.find(room => room.id.toString() === matchingRoomType.ir_id);
    return selectedRoomType.rateplans
      .filter(rate_plan => channel_store.channels_data.mappedChannels.find(r => rate_plan.id.toString() === r.ir_id) === undefined)
      .map(rate_plan => ({
      id: rate_plan.id.toString(),
      name: rate_plan.name,
    }));
  }
}

const irChannelMappingCss = ".sc-ir-channel-mapping-h{display:block;box-sizing:border-box}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}.refresh-btn.sc-ir-channel-mapping{all:unset;color:var(--blue);cursor:pointer}.selected-map.sc-ir-channel-mapping svg.sc-ir-channel-mapping{margin:0 10px 0 0 !important;flex-wrap:wrap}.selected-map.sc-ir-channel-mapping{flex:1}.selected-map-title.sc-ir-channel-mapping{flex:1}";

const IrChannelMapping = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mappingService = new IrMappingService();
    this.activeMapField = '';
    this.availableRooms = [];
  }
  setActiveField(id, isRoomType, roomTypeId) {
    const availableRooms = this.mappingService.getAppropriateRooms(isRoomType, roomTypeId);
    if (availableRooms) {
      this.availableRooms = availableRooms;
    }
    this.activeMapField = id;
  }
  renderMappingStatus(mappedField, id, isRoomType, roomTypeId) {
    if (mappedField.hide) {
      return index.h("span", null);
    }
    if (mappedField.result) {
      return (index.h("span", { class: "px-2 text-blue d-flex align-items-center" }, index.h("span", { class: "m-0 p-0 d-flex align-items-center selected-map" }, index.h("span", { class: "selected-map-title" }, mappedField.result.name), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: 'var(--blue)', d: "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" })), "2"), index.h("ir-icon", { class: "ml-1 p-0", onIconClickHandler: () => channel_store.removedMapping(mappedField.result.id.toString()) }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: 'var(--blue)', d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })))));
    }
    return (index.h("span", { class: "px-2" }, this.activeMapField === id ? (index.h("ir-combobox", { autoFocus: true, placeholder: "Not mapped", data: this.availableRooms, onComboboxValueChange: e => {
        console.log(e.detail.data);
        channel_store.addMapping(e.detail.data, this.activeMapField);
        this.activeMapField = '';
      } })) : (index.h("span", { class: "cursor-pointer text-danger", onClick: () => this.setActiveField(id, isRoomType, roomTypeId) }, "Not mapped"))));
  }
  render() {
    var _a, _b;
    return (index.h(index.Host, null, index.h("div", { class: "d-flex w-100 justify-content-end" }, index.h("button", { onClick: () => {
        channel_store.setMappedChannel();
      }, class: "btn refresh-btn" }, "Refresh")), index.h("ul", { class: "m-0 p-0" }, index.h("li", { class: "map-row my-1" }, index.h("span", { class: "font-weight-bold" }, channel_store.channels_data.selectedChannel.name), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), index.h("span", { class: "font-weight-bold px-2" }, "Igloorooms")), (_b = (_a = channel_store.channels_data.selectedChannel.property) === null || _a === void 0 ? void 0 : _a.room_types) === null || _b === void 0 ? void 0 :
      _b.map(room_type => {
        const mappedRoomType = this.mappingService.checkMappingExists(room_type.id, true);
        return (index.h("li", { key: room_type.id, class: "mb-1" }, index.h("div", { class: "map-row" }, index.h("span", null, room_type.name), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), this.renderMappingStatus(mappedRoomType, room_type.id, true)), index.h("ul", { class: "m-0 p-0" }, room_type.rate_plans.map(rate_plan => {
          const mappedRatePlan = this.mappingService.checkMappingExists(rate_plan.id, false, room_type.id);
          return (index.h("li", { class: "map-row", key: rate_plan.id }, index.h("span", { class: "submap-text" }, rate_plan.name), !mappedRatePlan.hide && (index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" }))), this.renderMappingStatus(mappedRatePlan, rate_plan.id, false, room_type.id)));
        }))));
      }))));
  }
};
IrChannelMapping.style = irChannelMappingCss;

const irComboboxCss = ".sc-ir-combobox-h{display:block;position:relative;padding:0;margin:0}ul.sc-ir-combobox{position:absolute;margin:0;margin-top:2px;width:100%;max-height:80px;border-radius:0.21rem;z-index:10000;padding:1px;background:white;box-shadow:0px 8px 16px 0px rgba(0, 0, 0, 0.2);padding:5px 0;max-height:250px;overflow-y:auto}.dropdown-item.sc-ir-combobox{cursor:pointer}ul.sc-ir-combobox li.sc-ir-combobox,span.sc-ir-combobox,loader-container.sc-ir-combobox{padding:0px 16px;margin:0px;margin-top:2px;width:100%;border-radius:2px}ul.sc-ir-combobox li.sc-ir-combobox{cursor:pointer}ul.sc-ir-combobox li.sc-ir-combobox:hover{background:#f4f5fa}ul.sc-ir-combobox li[data-selected].sc-ir-combobox,ul.sc-ir-combobox li[data-selected].sc-ir-combobox:hover{color:#fff;text-decoration:none;background-color:#666ee8}";

const IrCombobox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.comboboxValueChange = index.createEvent(this, "comboboxValueChange", 7);
    this.inputCleared = index.createEvent(this, "inputCleared", 7);
    this.toast = index.createEvent(this, "toast", 7);
    this.data = [];
    this.duration = 300;
    this.placeholder = undefined;
    this.value = undefined;
    this.autoFocus = false;
    this.selectedIndex = -1;
    this.isComboBoxVisible = false;
    this.isLoading = true;
    this.isItemSelected = undefined;
    this.inputValue = '';
    this.filteredData = [];
    this.componentShouldAutoFocus = false;
  }
  componentWillLoad() {
    this.filteredData = this.data;
  }
  componentDidLoad() {
    if (this.autoFocus) {
      this.focusInput();
    }
  }
  watchHandler(newValue, oldValue) {
    if (newValue !== oldValue && newValue === true) {
      this.focusInput();
    }
  }
  handleKeyDown(event) {
    var _a;
    const dataSize = this.data.length;
    const itemHeight = this.getHeightOfPElement();
    if (dataSize > 0) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.selectedIndex = (this.selectedIndex - 1 + dataSize) % dataSize;
          this.adjustScrollPosition(itemHeight);
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.selectedIndex = (this.selectedIndex + 1) % dataSize;
          this.adjustScrollPosition(itemHeight);
          break;
        case 'Enter':
        case ' ':
        case 'ArrowRight':
          event.preventDefault();
          this.selectItem(this.selectedIndex);
          break;
        case 'Escape':
          (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.blur();
          this.isComboBoxVisible = false;
          break;
      }
    }
  }
  getHeightOfPElement() {
    const combobox = this.el.querySelector('.combobox');
    if (combobox) {
      const pItem = combobox.querySelector('p');
      return pItem ? pItem.offsetHeight : 0;
    }
    return 0;
  }
  focusInput() {
    requestAnimationFrame(() => {
      var _a;
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.focus();
    });
  }
  adjustScrollPosition(itemHeight, visibleHeight = 250) {
    const combobox = this.el.querySelector('.combobox');
    if (combobox) {
      const margin = 2;
      const itemTotalHeight = itemHeight + margin;
      const selectedPosition = itemTotalHeight * this.selectedIndex;
      let newScrollTop = selectedPosition - visibleHeight / 2 + itemHeight / 2;
      newScrollTop = Math.max(0, Math.min(newScrollTop, combobox.scrollHeight - visibleHeight));
      combobox.scrollTo({
        top: newScrollTop,
        behavior: 'auto',
      });
    }
  }
  selectItem(index) {
    if (this.filteredData[index]) {
      this.isItemSelected = true;
      this.comboboxValueChange.emit({ key: 'select', data: this.filteredData[index].id });
      this.inputValue = '';
      this.resetCombobox();
      if (this.autoFocus) {
        this.focusInput();
      }
    }
  }
  debounceFetchData() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.fetchData();
    }, this.duration);
  }
  handleFocus() {
    this.isComboBoxVisible = true;
  }
  clearInput() {
    this.inputValue = '';
    this.resetCombobox();
    this.inputCleared.emit(null);
  }
  resetCombobox(withblur = true) {
    var _a;
    if (withblur) {
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.blur();
    }
    this.selectedIndex = -1;
    this.isComboBoxVisible = false;
  }
  async fetchData() {
    try {
      this.isLoading = true;
      this.filteredData = this.data.filter(d => d.name.toLowerCase().startsWith(this.inputValue));
    }
    catch (error) {
      console.log('error', error);
    }
    finally {
      this.isLoading = false;
    }
  }
  handleInputChange(event) {
    this.inputValue = event.target.value;
    if (this.inputValue) {
      this.debounceFetchData();
    }
    else {
      this.filteredData = this.data;
    }
  }
  handleDocumentClick(event) {
    const target = event.target;
    if (!this.el.contains(target)) {
      this.isComboBoxVisible = false;
    }
  }
  handleBlur() {
    this.blurTimout = setTimeout(() => {
      if (!this.isItemSelected) {
        this.inputValue = '';
        this.resetCombobox();
      }
      else {
        this.isItemSelected = false;
      }
    }, 300);
  }
  isDropdownItem(element) {
    return element && element.closest('.combobox');
  }
  disconnectedCallback() {
    var _a, _b, _c, _d;
    clearTimeout(this.debounceTimer);
    clearTimeout(this.blurTimout);
    (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.removeEventListener('blur', this.handleBlur);
    (_b = this.inputRef) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', this.selectItem);
    (_c = this.inputRef) === null || _c === void 0 ? void 0 : _c.removeEventListener('keydown', this.handleKeyDown);
    (_d = this.inputRef) === null || _d === void 0 ? void 0 : _d.removeEventListener('focus', this.handleFocus);
  }
  handleItemKeyDown(event, index) {
    var _a;
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowRight') {
      this.selectItem(index);
      event.preventDefault();
    }
    else if (event.key === 'Escape') {
      this.isComboBoxVisible = false;
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.blur();
      event.preventDefault();
    }
    else {
      return;
    }
  }
  renderDropdown() {
    var _a;
    if (!this.isComboBoxVisible) {
      return null;
    }
    return (index.h("ul", null, (_a = this.filteredData) === null || _a === void 0 ? void 0 :
      _a.map((d, index$1) => (index.h("li", { role: "button", key: d.id, onKeyDown: e => this.handleItemKeyDown(e, index$1), "data-selected": this.selectedIndex === index$1, tabIndex: 0, onClick: () => this.selectItem(index$1) }, d.name))), this.filteredData.length === 0 && !this.isLoading && index.h("span", { class: 'text-center' }, axios.locales.entries.Lcz_NoResultsFound)));
  }
  render() {
    return (index.h("fieldset", { class: "m-0 p-0" }, index.h("input", { ref: el => (this.inputRef = el), type: "text", value: this.value, placeholder: this.placeholder, class: "form-control", onKeyDown: this.handleKeyDown.bind(this), onBlur: this.handleBlur.bind(this), onInput: this.handleInputChange.bind(this), onFocus: this.handleFocus.bind(this), autoFocus: this.autoFocus }), this.renderDropdown()));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "isComboBoxVisible": ["watchHandler"]
  }; }
};
IrCombobox.style = irComboboxCss;

const onlineResources = [
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/jquery.min.js",
  // },
  {
    isCSS: true,
    link: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i%7CQuicksand:300,400,500,700',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/bootstrap.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/bootstrap-extended.css',
  },
  { isCSS: true, link: 'https://x.igloorooms.com/app-assets/css/colors.css' },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/core/menu/menu-types/horizontal-menu.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/core/colors/palette-gradient.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/components.css',
  },
  { isCSS: true, link: 'https://x.igloorooms.com/assets/css/style.css' },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/vendors/css/forms/icheck/icheck.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/vendors/css/forms/icheck/custom.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/pages/login-register.css',
  },
  // {
  //   isCSS: true,
  //   link: 'https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/daterangepicker.css',
  // },
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/moment.min.js",
  // },
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/daterangepicker.js",
  // },
];

const IrCommon = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.extraResources = '';
    this.resources = onlineResources;
  }
  componentWillLoad() {
    this.parseRefs();
  }
  componentDidLoad() {
    this.initializeStyles();
  }
  hrefsChanged() {
    this.parseRefs();
    this.initializeStyles();
  }
  parseRefs() {
    if (this.extraResources !== '')
      this.resources.push(JSON.parse(this.extraResources));
  }
  appendTag(tagName, attributes) {
    const tag = document.createElement(tagName);
    const selectorParts = [];
    Object.keys(attributes).forEach(attr => {
      tag.setAttribute(attr, attributes[attr]);
      selectorParts.push(`[${attr}="${attributes[attr]}"]`);
    });
    const selector = `${tagName}${selectorParts.join('')}`;
    const existingTag = document.querySelector(selector);
    if (!existingTag) {
      document.head.appendChild(tag);
    }
  }
  initializeStyles() {
    this.resources.forEach(res => {
      if (res.isCSS) {
        this.appendTag('link', {
          href: res.link,
          rel: 'stylesheet',
          type: 'text/css',
        });
      }
      if (res.isJS) {
        this.appendTag('script', {
          src: res.link,
        });
      }
    });
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", null)));
  }
  static get watchers() { return {
    "extraResources": ["hrefsChanged"]
  }; }
};

const irIconCss = ".sc-ir-icon-h{margin:0;padding:0}.icon-button.sc-ir-icon{all:unset;margin:0;padding:0}.icon-button.sc-ir-icon:hover{cursor:pointer}";

const IrIcon = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.iconClickHandler = index.createEvent(this, "iconClickHandler", 7);
    this.icon = 'ft-check';
  }
  render() {
    return (index.h("button", { class: "icon-button", onClick: () => this.iconClickHandler.emit() }, index.h("slot", { name: "icon" })));
  }
};
IrIcon.style = irIconCss;

const irModalCss = ".backdropModal.sc-ir-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-modal{z-index:1001 !important}.modal-dialog.sc-ir-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-modal{gap:10px}.ir-modal.sc-ir-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";

const IrModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.confirmModal = index.createEvent(this, "confirmModal", 7);
    this.cancelModal = index.createEvent(this, "cancelModal", 7);
    this.modalTitle = 'Modal Title';
    this.modalBody = 'Modal Body';
    this.rightBtnActive = true;
    this.leftBtnActive = true;
    this.rightBtnText = 'Confirm';
    this.leftBtnText = 'Close';
    this.rightBtnColor = 'primary';
    this.leftBtnColor = 'secondary';
    this.btnPosition = 'right';
    this.iconAvailable = false;
    this.icon = '';
    this.isOpen = false;
    this.item = {};
  }
  async closeModal() {
    this.isOpen = false;
  }
  async openModal() {
    this.isOpen = true;
  }
  btnClickHandler(event) {
    let target = event.target;
    let name = target.name;
    if (name === this.leftBtnText) {
      this.cancelModal.emit();
      this.item = {};
      this.closeModal();
    }
    else if (name === this.rightBtnText) {
      this.confirmModal.emit(this.item);
      this.item = {};
      this.closeModal();
    }
  }
  render() {
    return [
      index.h("div", { class: `backdropModal ${this.isOpen ? 'active' : ''}`, onClick: () => {
          this.closeModal();
        } }),
      index.h("div", { "data-state": this.isOpen ? 'opened' : 'closed', class: `ir-modal`, tabindex: "-1" }, index.h("div", { class: `ir-alert-content p-2` }, index.h("div", { class: `ir-alert-header align-items-center border-0 py-0 m-0 ` }), index.h("div", { class: "modal-body text-left p-0 mb-2" }, index.h("div", null, this.modalBody)), index.h("div", { class: `ir-alert-footer border-0  d-flex justify-content-${this.btnPosition === 'center' ? 'center' : this.btnPosition === 'left' ? 'start' : 'end'}` }, this.leftBtnActive && index.h("ir-button", { icon: '', btn_color: this.leftBtnColor, btn_block: true, text: this.leftBtnText, name: this.leftBtnText }), this.rightBtnActive && index.h("ir-button", { icon: '', btn_color: this.rightBtnColor, btn_block: true, text: this.rightBtnText, name: this.rightBtnText })))),
    ];
  }
};
IrModal.style = irModalCss;

const irSidebarCss = ".backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;cursor:pointer;background:rgba(0, 0, 0, 0.5);z-index:99;transition:all 0.5s;opacity:0;pointer-events:none;transition:all 0.5s}.backdrop.active{opacity:1;pointer-events:all}.sidebar-right{position:fixed;top:0;right:-120%;bottom:0;width:var(--sidebar-width, 40rem);max-width:100%;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);transition:all 0.5s;z-index:100;overflow-y:hidden;color:var(--sidebar-color, #000);background-color:var(--sidebar-backgound, #fff);padding:0.5rem}.sidebar-right.active{right:0;overflow-y:auto}.sidebar-left{position:fixed;top:0;left:-100%;bottom:0;width:var(--sidebar-width, 30rem);max-width:100%;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);transition:all 0.5s;z-index:200;overflow-y:hidden;color:var(--sidebar-color, #000);background:var(--sidebar-backgound, #fff);padding:0.5rem}.sidebar-left.active{left:0;overflow-y:scroll}.close{position:absolute;top:0.5rem;right:1rem;width:1rem;height:1rem;cursor:pointer}";

const IrSidebar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.irSidebarToggle = index.createEvent(this, "irSidebarToggle", 7);
    this.name = undefined;
    this.side = 'right';
    this.showCloseButton = true;
    this.open = false;
    this.sidebarStyles = undefined;
  }
  applyStyles() {
    for (const property in this.sidebarStyles) {
      if (this.sidebarStyles.hasOwnProperty(property)) {
        this.sidebarRef.style[property] = this.sidebarStyles[property];
      }
    }
  }
  handleSidebarStylesChange() {
    this.applyStyles();
  }
  componentWillLoad() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidLoad() {
    // If esc key is pressed, close the modal
    this.applyStyles();
    document.addEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.key === 'Escape') {
      return this.toggleSidebar();
    }
    else {
      return;
    }
  }
  // Unsubscribe to the event when the component is removed from the DOM
  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  async toggleSidebar() {
    this.irSidebarToggle.emit(this.open);
  }
  render() {
    let className = '';
    if (this.open) {
      className = 'active';
    }
    else {
      className = '';
    }
    return [
      index.h("div", { class: `backdrop ${className}`, onClick: () => {
          this.toggleSidebar();
        } }),
      index.h("div", { ref: el => (this.sidebarRef = el), class: `sidebar-${this.side} ${className}` }, this.showCloseButton && (index.h("ir-icon", { class: "close", onIconClickHandler: () => {
          this.toggleSidebar();
        } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, index.h("path", { fill: "#6b6f82", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), index.h("slot", null)),
    ];
  }
  static get watchers() { return {
    "sidebarStyles": ["handleSidebarStylesChange"]
  }; }
};
IrSidebar.style = irSidebarCss;

const irSwitchCss = ".sc-ir-switch-h{display:block;position:relative;box-sizing:border-box;--ir-root-width:36px;--ir-root-height:20px}.hidden-input.sc-ir-switch{transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0;width:var(--ir-root-width);height:var(--ir-root-height)}.SwitchRoot.sc-ir-switch{all:unset;padding:0;margin:0;width:var(--ir-root-width);height:var(--ir-root-height);background-color:rgba(0, 0, 0, 0.4);position:relative;box-shadow:rgba(0, 0, 0, 0.2) 0px 2px 10px;--webkit-tap-highlight-color:rgba(0, 0, 0, 0);border-radius:9999px;box-sizing:border-box}.SwitchRoot.sc-ir-switch:disabled{opacity:80%}.SwitchRoot.sc-ir-switch:focus-visible{outline:1px solid rgba(55, 188, 155, 0.2);outline-offset:1px}.SwitchRoot[data-state='checked'].sc-ir-switch{background-color:rgb(55, 188, 155)}.SwitchThumb.sc-ir-switch{padding:0;margin:0;display:block;width:calc(var(--ir-root-height) - 3px);height:calc(var(--ir-root-height) - 3px);border-radius:9999px;background:white;box-shadow:rgba(0, 0, 0, 0.2) 0px;transition:transform 100ms ease 0s;transform:translateX(2px);will-change:transform}.SwitchThumb[data-state='checked'].sc-ir-switch{transform:translateX(calc(var(--ir-root-height) - 3px))}";

const IrSwitch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.checkChange = index.createEvent(this, "checkChange", 7);
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
    return (index.h(index.Host, null, index.h("button", { disabled: this.disabled, ref: el => (this.switchRoot = el), type: "button", id: this.switchId || this._id, onClick: this.handleCheckChange.bind(this), role: "switch", "data-state": this.checked ? 'checked' : 'unchecked', value: 'on', class: "SwitchRoot" }, index.h("span", { class: "SwitchThumb", "data-state": this.checked ? 'checked' : 'unchecked' })), index.h("input", { type: "checkbox", checked: this.checked, "aria-hidden": "true", tabIndex: -1, value: 'on', class: "hidden-input" })));
  }
};
IrSwitch.style = irSwitchCss;

exports.ir_button = IrButton;
exports.ir_channel = IrChannel;
exports.ir_channel_editor = IrChannelEditor;
exports.ir_channel_general = IrChannelGeneral;
exports.ir_channel_header = IrChannelHeader;
exports.ir_channel_mapping = IrChannelMapping;
exports.ir_combobox = IrCombobox;
exports.ir_common = IrCommon;
exports.ir_icon = IrIcon;
exports.ir_modal = IrModal;
exports.ir_sidebar = IrSidebar;
exports.ir_switch = IrSwitch;

//# sourceMappingURL=ir-button_12.cjs.entry.js.map