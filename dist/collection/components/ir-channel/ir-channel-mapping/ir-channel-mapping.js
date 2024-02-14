import calendar_data from "../../../../../src/stores/calendar-data";
import { Host, h } from "@stencil/core";
import { IrMappingService } from "./ir-mapping.service";
export class IrChannelMapping {
  constructor() {
    this.mappingService = new IrMappingService();
    this.selectedChannel = undefined;
    this.activeMapField = '';
  }
  componentWillLoad() {
    this.selectedChannel = calendar_data.channels[0];
  }
  renderMappingStatus(id) {
    const mappedField = this.mappingService.checkMappingExists(id, this.selectedChannel);
    if (mappedField) {
      return h("span", { class: "px-2" }, "exist");
    }
    return (h("span", { class: "px-2" }, this.activeMapField === id ? (h("ir-combobox", null)) : (h("span", { class: "cursor-pointer text-red", onClick: () => (this.activeMapField = id) }, "Not mapped"))));
  }
  render() {
    return (h(Host, null, h("ul", { class: "m-0 p-0" }, h("li", { class: "map-row my-2" }, h("span", { class: "font-weight-bold" }, calendar_data.channels[0].name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), h("span", { class: "font-weight-bold px-2" }, "Channel manager")), this.selectedChannel.property.room_types.map(room_type => (h("li", { key: room_type.id, class: "mb-1" }, h("div", { class: "map-row" }, h("span", null, room_type.name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), this.renderMappingStatus(room_type.id)), h("ul", { class: "m-0 p-0" }, room_type.rate_plans.map(rate_plan => (h("li", { class: "map-row", key: rate_plan.id }, h("span", { class: "submap-text" }, rate_plan.name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: "currentColor", d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), this.renderMappingStatus(rate_plan.id)))))))))));
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
      "selectedChannel": {},
      "activeMapField": {}
    };
  }
}
//# sourceMappingURL=ir-channel-mapping.js.map
