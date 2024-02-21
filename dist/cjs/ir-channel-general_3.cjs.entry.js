'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');
const channel_store = require('./channel.store-9456eab6.js');
require('./index-d93aa7bb.js');

const irChannelGeneralCss = ".sc-ir-channel-general-h{display:block}.label-style.sc-ir-channel-general{width:100px;text-align:end;padding-right:10px !important}.connection-testing-container.sc-ir-channel-general{display:flex;align-items:center;justify-content:space-between;margin-top:10px !important}.connection-title.sc-ir-channel-general{border-bottom:1px solid #e4e5ec}.ml-18.sc-ir-channel-general{margin-left:18% !important}";

const IrChannelGeneral = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.channel_status = null;
    this.buttonClicked = false;
    this.connection_status_message = '';
  }
  componentWillLoad() {
    if (this.channel_status !== 'create') {
      return;
    }
    this.connection_status_message = channel_store.channels_data.isConnectedToChannel ? 'Connected Channel' : '';
  }
  handleTestConnectionClicked(e) {
    var _a;
    e.preventDefault();
    this.buttonClicked = true;
    if (this.channel_status !== 'create' || !((_a = channel_store.channels_data.channel_settings) === null || _a === void 0 ? void 0 : _a.hotel_id) || channel_store.channels_data.isConnectedToChannel) {
      return;
    }
    const status = channel_store.testConnection();
    this.connection_status_message = status ? 'Connected Channel' : 'Incorrect Connection';
    this.buttonClicked = false;
  }
  render() {
    var _a, _b, _c, _d;
    return (index.h(index.Host, null, index.h("section", { class: "ml-18" }, index.h("fieldset", { class: "d-flex align-items-center" }, index.h("label", { htmlFor: "hotel_channels", class: "m-0 p-0 label-style" }, "Channel:"), index.h("ir-combobox", { input_id: "hotel_channels", disabled: channel_store.channels_data.isConnectedToChannel, class: "flex-fill", value: (_a = channel_store.channels_data.selectedChannel) === null || _a === void 0 ? void 0 : _a.name, onComboboxValueChange: (e) => {
        channel_store.selectChannel(e.detail.data.toString());
      }, placeholder: "Choose channel from list", data: channel_store.channels_data.channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      })) })), index.h("fieldset", { class: "d-flex align-items-center mt-1" }, index.h("label", { htmlFor: "hotel_title", class: "m-0 p-0 label-style" }, "Title:"), index.h("div", { class: "flex-fill" }, index.h("input", { id: "hotel_title", value: (_b = channel_store.channels_data.channel_settings) === null || _b === void 0 ? void 0 : _b.hotel_title, onInput: e => channel_store.updateChannelSettings('hotel_title', e.target.value), class: "form-control  flex-fill" })))), channel_store.channels_data.selectedChannel && (index.h("form", { onSubmit: this.handleTestConnectionClicked.bind(this), class: "mt-3 connection-container" }, index.h("h3", { class: "text-left font-medium-2  py-0 my-0 connection-title py-1 mb-2" }, "Connection Settings"), index.h("div", { class: "ml-18" }, index.h("fieldset", { class: "d-flex align-items-center my-1" }, index.h("label", { htmlFor: "hotel_id", class: "m-0 p-0 label-style" }, "Hotel ID:"), index.h("div", { class: "flex-fill" }, index.h("input", { id: "hotel_id", disabled: channel_store.channels_data.isConnectedToChannel, class: `form-control  flex-fill bg-white ${this.buttonClicked && !((_c = channel_store.channels_data.channel_settings) === null || _c === void 0 ? void 0 : _c.hotel_id) && 'border-danger'}`, value: (_d = channel_store.channels_data.channel_settings) === null || _d === void 0 ? void 0 : _d.hotel_id, onInput: e => channel_store.updateChannelSettings('hotel_id', e.target.value) }))), index.h("div", { class: 'connection-testing-container' }, index.h("span", null, this.connection_status_message), index.h("button", { class: "btn btn-outline-secondary btn-sm", type: "submit" }, "Test Connection")))))));
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
  removedMapping(ir_id, isRoomType) {
    let selectedChannels = [...channel_store.channels_data.mappedChannels];
    if (isRoomType) {
      const toBeRemovedRoomType = channel_store.calendar_data.roomsInfo.find(room => room.id.toString() === ir_id);
      selectedChannels = selectedChannels.filter(c => toBeRemovedRoomType.rateplans.find(rate_plan => rate_plan.id.toString() === c.ir_id) === undefined);
    }
    channel_store.channels_data.mappedChannels = selectedChannels.filter(c => c.ir_id !== ir_id);
  }
  checkMappingExists(id, isRoomType, roomTypeId) {
    const mapped_id = channel_store.channels_data.mappedChannels.find(m => m.channel_id === id);
    if (!mapped_id) {
      if (!isRoomType) {
        const matchingRoomType = channel_store.channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
        if (!matchingRoomType) {
          return { hide: true, result: undefined, occupancy: undefined };
        }
      }
      return { hide: false, result: undefined, occupancy: undefined };
    }
    if (isRoomType) {
      const room_type = channel_store.calendar_data.roomsInfo.find(room => room.id.toString() === mapped_id.ir_id);
      return { hide: false, occupancy: room_type.occupancy_default.adult_nbr, result: room_type };
    }
    if (!roomTypeId) {
      throw new Error('Missing room type id');
    }
    const matchingRoomType = channel_store.channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
    const room_type = channel_store.calendar_data.roomsInfo.find(room => room.id.toString() === matchingRoomType.ir_id);
    if (!room_type) {
      throw new Error('Invalid Room type');
    }
    return { hide: false, occupancy: room_type.occupancy_default.adult_nbr, result: room_type.rateplans.find(r => r.id.toString() === mapped_id.ir_id) };
  }
  getAppropriateRooms(isRoomType, roomTypeId) {
    if (isRoomType) {
      const filteredRoomTypes = channel_store.calendar_data.roomsInfo.filter(room => channel_store.channels_data.mappedChannels.find(m => m.ir_id.toString() === room.id.toString()) === undefined && room.is_active);
      return filteredRoomTypes.map(room => ({ id: room.id.toString(), name: room.name }));
    }
    if (!roomTypeId) {
      throw new Error('Missing roomType id');
    }
    const matchingRoomType = channel_store.channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
    if (!matchingRoomType) {
      throw new Error('Invalid room type id');
    }
    const selectedRoomType = channel_store.calendar_data.roomsInfo.find(room => room.id.toString() === matchingRoomType.ir_id);
    return selectedRoomType.rateplans
      .filter(rate_plan => channel_store.channels_data.mappedChannels.find(r => rate_plan.id.toString() === r.ir_id) === undefined)
      .map(rate_plan => ({
      id: rate_plan.id.toString(),
      name: rate_plan.name,
    }));
  }
}

const irChannelMappingCss = ".sc-ir-channel-mapping-h{display:block;box-sizing:border-box}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}.refresh-btn.sc-ir-channel-mapping{all:unset;color:var(--blue);cursor:pointer}.selected-map.sc-ir-channel-mapping svg.sc-ir-channel-mapping{margin:0 10px !important;flex-wrap:wrap}.selected-map.sc-ir-channel-mapping{flex:1}.selected-map-title.sc-ir-channel-mapping{flex:1}";

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
      return (index.h(index.Fragment, null, index.h("span", { class: "px-2 d-md-none text-blue d-flex align-items-center" }, index.h("span", { class: "m-0 p-0 d-flex align-items-center selected-map" }, index.h("span", { class: "selected-map-title" }, mappedField.result.name), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: 'var(--blue)', d: "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" })), mappedField.occupancy), index.h("ir-icon", { class: "ml-1 p-0", onIconClickHandler: () => this.mappingService.removedMapping(mappedField.result.id.toString(), isRoomType) }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: 'var(--blue)', d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })))), index.h("span", { class: "px-2 d-none text-blue d-md-flex align-items-center" }, index.h("span", { class: "m-0 p-0 d-flex align-items-center selected-map" }, mappedField.result.name, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: 'var(--blue)', d: "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" })), mappedField.occupancy), index.h("ir-icon", { class: "ml-1 p-0", onIconClickHandler: () => this.mappingService.removedMapping(mappedField.result.id.toString(), isRoomType) }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: 'var(--blue)', d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" }))))));
    }
    return (index.h("span", { class: "px-2" }, this.activeMapField === id ? (index.h("ir-combobox", { autoFocus: true, placeholder: "Not mapped", data: this.availableRooms, onComboboxValueChange: e => {
        channel_store.addMapping(e.detail.data, this.activeMapField, isRoomType);
        this.activeMapField = '';
      } })) : (index.h("span", { class: "cursor-pointer text-danger", onClick: () => this.setActiveField(id, isRoomType, roomTypeId) }, "Not mapped"))));
  }
  render() {
    var _a, _b, _c, _d;
    return (index.h(index.Host, null, index.h("div", { class: "d-flex w-100 justify-content-end" }, index.h("button", { onClick: () => {
        channel_store.setMappedChannel();
      }, class: "btn refresh-btn" }, "Refresh")), index.h("ul", { class: "m-0 p-0" }, index.h("li", { class: "map-row my-1" }, index.h("span", { class: "font-weight-bold" }, (_a = channel_store.channels_data.selectedChannel) === null || _a === void 0 ? void 0 : _a.name), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), index.h("span", { class: "font-weight-bold px-2" }, "Igloorooms")), (_d = (_c = (_b = channel_store.channels_data.selectedChannel) === null || _b === void 0 ? void 0 : _b.property) === null || _c === void 0 ? void 0 : _c.room_types) === null || _d === void 0 ? void 0 :
      _d.map(room_type => {
        const mappedRoomType = this.mappingService.checkMappingExists(room_type.id, true);
        return (index.h("li", { key: room_type.id, class: "mb-1" }, index.h("div", { class: "map-row" }, index.h("span", null, room_type.name), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), this.renderMappingStatus(mappedRoomType, room_type.id, true)), index.h("ul", { class: "m-0 p-0" }, room_type.rate_plans.map(rate_plan => {
          const mappedRatePlan = this.mappingService.checkMappingExists(rate_plan.id, false, room_type.id);
          return (index.h("li", { class: "map-row", key: rate_plan.id }, index.h("span", { class: "submap-text" }, rate_plan.name), !mappedRatePlan.hide && (index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" }))), this.renderMappingStatus(mappedRatePlan, rate_plan.id, false, room_type.id)));
        }))));
      }))));
  }
};
IrChannelMapping.style = irChannelMappingCss;

exports.ir_channel_general = IrChannelGeneral;
exports.ir_channel_header = IrChannelHeader;
exports.ir_channel_mapping = IrChannelMapping;

//# sourceMappingURL=ir-channel-general_3.cjs.entry.js.map