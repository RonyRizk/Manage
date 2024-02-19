import { Host, h } from "@stencil/core";
import { IrMappingService } from "./ir-mapping.service";
import channels_data, { addMapping, removedMapping, setMappedChannel } from "../../../../../src/stores/channel.store";
export class IrChannelMapping {
  constructor() {
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
  static get is() { return "ir-channel-mapping"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-channel-mapping.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-channel-mapping.css"]
    };
  }
  static get states() {
    return {
      "activeMapField": {},
      "availableRooms": {}
    };
  }
}
//# sourceMappingURL=ir-channel-mapping.js.map
