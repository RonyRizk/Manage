import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as channels_data } from './channel.store.js';

const irChannelMappingCss = ".sc-ir-channel-mapping-h{display:block;box-sizing:border-box}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}";

const IrChannelMapping = /*@__PURE__*/ proxyCustomElement(class IrChannelMapping extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
  static get style() { return irChannelMappingCss; }
}, [2, "ir-channel-mapping", {
    "selectedChannel": [32],
    "activeMapField": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-channel-mapping"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-channel-mapping":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannelMapping);
      }
      break;
  } });
}

export { IrChannelMapping as I, defineCustomElement as d };

//# sourceMappingURL=ir-channel-mapping2.js.map