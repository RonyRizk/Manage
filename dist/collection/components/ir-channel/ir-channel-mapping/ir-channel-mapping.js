import { Host, h } from "@stencil/core";
//import { IrMappingService } from './ir-mapping.service';
import channels_data from "../../../../../src/stores/channel.store";
export class IrChannelMapping {
  constructor() {
    this.selectedChannel = undefined;
    this.activeMapField = '';
  }
  //private mappingService = new IrMappingService();
  componentWillLoad() {
    this.selectedChannel = channels_data.channels[0];
  }
  // renderMappingStatus(id: string) {
  //   const mappedField = this.mappingService.checkMappingExists(id, this.selectedChannel);
  //   if (mappedField) {
  //     return <span class="px-2">exist</span>;
  //   }
  //   return (
  //     <span class="px-2">
  //       {this.activeMapField === id ? (
  //         <ir-combobox></ir-combobox>
  //       ) : (
  //         <span class="cursor-pointer text-red" onClick={() => (this.activeMapField = id)}>
  //           Not mapped
  //         </span>
  //       )}
  //     </span>
  //   );
  // }
  render() {
    return (h(Host, null, h("ul", { class: "m-0 p-0" }, h("li", { class: "map-row my-2" }, h("span", { class: "font-weight-bold" }, channels_data.channels[0].name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), h("span", { class: "font-weight-bold px-2" }, "Channel manager")))));
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
