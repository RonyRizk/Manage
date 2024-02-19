import { r as registerInstance, h, H as Host, c as createEvent, g as getElement } from './index-795d2df3.js';
import { c as channels_data, s as selectChannel, a as removedMapping, b as addMapping, d as setMappedChannel } from './channel.store-dae40e5c.js';
import { c as calendar_data } from './calendar-data-45884c68.js';
import './index-2bd379e0.js';

const irChannelGeneralCss = ".sc-ir-channel-general-h{display:block}.label-style.sc-ir-channel-general{width:100px}";

const IrChannelGeneral = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    var _a;
    return (h(Host, null, h("fieldset", { class: "d-flex align-items-center" }, h("label", { htmlFor: "", class: "m-0 p-0 label-style" }, "Channel:"), h("ir-combobox", { class: "flex-fill", value: (_a = channels_data.selectedChannel) === null || _a === void 0 ? void 0 : _a.name, onComboboxValueChange: (e) => {
        selectChannel(e.detail.data.toString());
      }, placeholder: "Choose channel from list", data: channels_data.channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      })) })), h("fieldset", { class: "d-flex align-items-center mt-1" }, h("label", { htmlFor: "", class: "m-0 p-0 label-style" }, "Title:"), h("div", { class: "flex-fill" }, h("input", { class: "form-control  flex-fill" })))));
  }
};
IrChannelGeneral.style = irChannelGeneralCss;

const irChannelHeaderCss = ".sc-ir-channel-header-h{display:block;position:relative;padding:0;margin:0;border-bottom:1px solid #e4e5ec}ul.sc-ir-channel-header{display:flex;align-items:center;gap:2rem;padding:0}.tab.sc-ir-channel-header{font-size:0.95rem;font-weight:600;cursor:pointer;position:relative;margin:0;padding:0;transition:color 0.3s ease;user-select:none}.tab[data-disabled].sc-ir-channel-header{cursor:auto}.tab.sc-ir-channel-header:hover{opacity:80%}.tab[data-state='selected'].sc-ir-channel-header,.tab[data-state='selected'].sc-ir-channel-header:hover{color:var(--blue);opacity:100%}.active-indicator.sc-ir-channel-header{padding:0;bottom:0px;position:absolute;height:3px;border-radius:4px;transition:transform 0.3s ease, width 0.3s ease;background:var(--blue)}";

const IrChannelHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.tabChanged = createEvent(this, "tabChanged", 7);
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
    return (h(Host, null, h("ul", null, this.headerTitles.map((title, index) => (h("li", { class: `tab ${title.disabled ? 'text-light' : ''}`, key: title.id, onClick: () => {
        if (!title.disabled)
          this.handleTabSelection(index);
      }, "data-disabled": title.disabled, "data-state": this.selectedIndex === index ? 'selected' : '' }, title.name)))), h("span", { class: "active-indicator", ref: el => (this.activeIndicator = el) })));
  }
  get el() { return getElement(this); }
};
IrChannelHeader.style = irChannelHeaderCss;

class IrMappingService {
  checkMappingExists(id, isRoomType, roomTypeId) {
    const mapped_id = channels_data.mappedChannel.find(m => m.channel_id === id);
    if (!mapped_id) {
      return undefined;
    }
    if (isRoomType) {
      return calendar_data.roomsInfo.find(room => room.id.toString() === mapped_id.ir_id);
    }
    if (!roomTypeId) {
      throw new Error('Missing room type id');
    }
    const findRoomTypeId = channels_data.mappedChannel.find(m => m.channel_id.toString() === roomTypeId);
    const room_type = calendar_data.roomsInfo.find(room => room.id.toString() === findRoomTypeId.ir_id);
    if (!room_type) {
      throw new Error('Invalid Room type');
    }
    return room_type.rateplans.find(r => r.id.toString() === mapped_id.ir_id);
  }
  getAppropriateRooms(isRoomType, roomTypeId) {
    if (isRoomType) {
      const filteredRoomTypes = calendar_data.roomsInfo.filter(room => channels_data.mappedChannel.find(m => m.ir_id.toString() === room.id.toString()) === undefined && room.is_active);
      return filteredRoomTypes.map(room => ({ id: room.id.toString(), name: room.name }));
    }
    if (!roomTypeId) {
      throw new Error('Missing roomType id');
    }
    const findRoomTypeId = channels_data.mappedChannel.find(m => m.channel_id.toString() === roomTypeId);
    if (!findRoomTypeId) {
      throw new Error('Invalid room type id');
    }
    const selectedRoomType = calendar_data.roomsInfo.find(room => room.id.toString() === findRoomTypeId.ir_id);
    return selectedRoomType.rateplans
      .filter(rate_plan => channels_data.mappedChannel.find(r => rate_plan.id.toString() === r.ir_id) === undefined)
      .map(rate_plan => ({
      id: rate_plan.id.toString(),
      name: rate_plan.name,
    }));
  }
}

const irChannelMappingCss = ".sc-ir-channel-mapping-h{display:block;box-sizing:border-box}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}.refresh-btn.sc-ir-channel-mapping{all:unset;color:var(--blue);cursor:pointer}";

const IrChannelMapping = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mappingService = new IrMappingService();
    this.activeMapField = '';
    this.availableRooms = [];
  }
  setActiveField(id, isRoomType, roomTypeId) {
    console.log(isRoomType, roomTypeId);
    const availableRooms = this.mappingService.getAppropriateRooms(isRoomType, roomTypeId);
    if (availableRooms) {
      this.availableRooms = availableRooms;
    }
    this.activeMapField = id;
  }
  renderMappingStatus(id, isRoomType, roomTypeId) {
    const mappedField = this.mappingService.checkMappingExists(id, isRoomType, roomTypeId);
    if (mappedField) {
      return (h("span", { class: "px-2 text-blue d-flex align-items-center" }, h("span", { class: "m-0 p-0 flex-fill" }, mappedField.name), h("ir-icon", { class: "m-0 p-0", onIconClickHandler: () => removedMapping(mappedField.id.toString()) }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: 'var(--blue)', d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })))));
    }
    return (h("span", { class: "px-2" }, this.activeMapField === id ? (h("ir-combobox", { autoFocus: true, placeholder: "Not mapped", data: this.availableRooms, onComboboxValueChange: e => {
        console.log(e.detail.data);
        addMapping(e.detail.data, this.activeMapField);
        this.activeMapField = '';
      } })) : (h("span", { class: "cursor-pointer text-danger", onClick: () => this.setActiveField(id, isRoomType, roomTypeId) }, "Not mapped"))));
  }
  render() {
    return (h(Host, null, h("div", { class: "d-flex w-100 justify-content-end" }, h("button", { onClick: () => {
        setMappedChannel();
      }, class: "btn refresh-btn" }, "Refresh")), h("ul", { class: "m-0 p-0" }, h("li", { class: "map-row my-1" }, h("span", { class: "font-weight-bold" }, channels_data.selectedChannel.name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), h("span", { class: "font-weight-bold px-2" }, "Igloorooms")), channels_data.selectedChannel.property.room_types.map(room_type => (h("li", { key: room_type.id, class: "mb-1" }, h("div", { class: "map-row" }, h("span", null, room_type.name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), this.renderMappingStatus(room_type.id, true)), h("ul", { class: "m-0 p-0" }, room_type.rate_plans.map(rate_plan => (h("li", { class: "map-row", key: rate_plan.id }, h("span", { class: "submap-text" }, rate_plan.name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: "currentColor", d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), this.renderMappingStatus(rate_plan.id, false, room_type.id)))))))))));
  }
};
IrChannelMapping.style = irChannelMappingCss;

export { IrChannelGeneral as ir_channel_general, IrChannelHeader as ir_channel_header, IrChannelMapping as ir_channel_mapping };

//# sourceMappingURL=ir-channel-general_3.entry.js.map