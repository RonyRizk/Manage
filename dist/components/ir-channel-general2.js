import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { s as selectChannel, c as channels_data } from './channel.store.js';
import { d as defineCustomElement$1 } from './ir-select2.js';

const irChannelGeneralCss = ".sc-ir-channel-general-h{display:block}";

const IrChannelGeneral = /*@__PURE__*/ proxyCustomElement(class IrChannelGeneral extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return (h(Host, null, h("ir-select", { selectContainerStyle: "mb-1", onSelectChange: (e) => selectChannel(e.detail), class: 'm-0 mb-1', LabelAvailable: false, data: channels_data.channels.map(channel => ({
        value: channel.id,
        text: channel.name,
      })) })));
  }
  static get style() { return irChannelGeneralCss; }
}, [2, "ir-channel-general"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-channel-general", "ir-select"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-channel-general":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannelGeneral);
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrChannelGeneral as I, defineCustomElement as d };

//# sourceMappingURL=ir-channel-general2.js.map