'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');
const channel_store = require('./channel.store-4cb2919a.js');
const calendarData = require('./calendar-data-a30446d5.js');
require('./index-d93aa7bb.js');

const irChannelGeneralCss = ".sc-ir-channel-general-h{display:block}";

const IrChannelGeneral = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    var _a;
    return (index.h(index.Host, null, index.h("p", null, "Channel"), index.h("ir-combobox", { value: (_a = channel_store.channels_data.selectedChannel) === null || _a === void 0 ? void 0 : _a.name, onComboboxValueChange: (e) => {
        channel_store.selectChannel(e.detail.data.toString());
      }, placeholder: "Choose channel from list", data: channel_store.channels_data.channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      })) })));
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
  checkMappingExists(id) {
    return channel_store.channels_data.mappedChannel.find(m => m.channel_id === id);
  }
  getAppropriateRooms(isRoomType, roomTypeId) {
    if (isRoomType) {
      const filteredRoomTypes = calendarData.calendar_data.roomsInfo.filter(room => channel_store.channels_data.mappedChannel.find(m => m.ir_id.toString() === room.id.toString()) === undefined && room.is_active);
      return filteredRoomTypes.map(room => ({ id: room.id.toString(), name: room.name }));
    }
    if (!roomTypeId) {
      throw new Error('Missing roomType id');
    }
    //find the selected roomType
    const selectedRoomType = calendarData.calendar_data.roomsInfo.filter(room => channel_store.channels_data.mappedChannel.find(m => m.channel_id.toString() === roomTypeId) && room.is_active);
    console.log(selectedRoomType);
    // console.log(filteredRoomTypes);
    //filter all the room types that are taken
  }
}

const irChannelMappingCss = ".sc-ir-channel-mapping-h{display:block;box-sizing:border-box}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}";

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
  renderMappingStatus(id, isRoomType, roomTypeId) {
    const mappedField = this.mappingService.checkMappingExists(id);
    if (mappedField) {
      return index.h("span", { class: "px-2" }, mappedField.ir_id);
    }
    return (index.h("span", { class: "px-2" }, this.activeMapField === id ? (index.h("ir-combobox", { autoFocus: true, placeholder: "Not mapped", data: this.availableRooms, onComboboxValueChange: e => {
        channel_store.addMapping(e.detail.data, this.activeMapField);
        this.activeMapField = '';
      } })) : (index.h("span", { class: "cursor-pointer text-red", onClick: () => this.setActiveField(id, isRoomType, roomTypeId) }, "Not mapped"))));
  }
  render() {
    return (index.h(index.Host, null, index.h("ul", { class: "m-0 p-0" }, index.h("li", { class: "map-row my-2" }, index.h("span", { class: "font-weight-bold" }, channel_store.channels_data.selectedChannel.name), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), index.h("span", { class: "font-weight-bold px-2" }, "Channel manager")), channel_store.channels_data.selectedChannel.property.room_types.map(room_type => (index.h("li", { key: room_type.id, class: "mb-1" }, index.h("div", { class: "map-row" }, index.h("span", null, room_type.name), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), this.renderMappingStatus(room_type.id, true)), index.h("ul", { class: "m-0 p-0" }, room_type.rate_plans.map(rate_plan => (index.h("li", { class: "map-row", key: rate_plan.id }, index.h("span", { class: "submap-text" }, rate_plan.name), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), this.renderMappingStatus(rate_plan.id, false, room_type.id)))))))))));
  }
};
IrChannelMapping.style = irChannelMappingCss;

exports.ir_channel_general = IrChannelGeneral;
exports.ir_channel_header = IrChannelHeader;
exports.ir_channel_mapping = IrChannelMapping;

//# sourceMappingURL=ir-channel-general_3.cjs.entry.js.map