import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { v as v4 } from './v4.js';

const otaLabelCss = "*.sc-ota-label{margin:0;padding:0}.sc-ota-label-h{display:flex;margin-bottom:5px;gap:5px}strong.sc-ota-label{margin:0;padding:0}ul.sc-ota-label{margin:0 3px;padding:0;flex:1}li.sc-ota-label{margin:0;padding:0}";

const OtaLabel = /*@__PURE__*/ proxyCustomElement(class OtaLabel extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.label = undefined;
    this.remarks = undefined;
  }
  render() {
    var _a;
    if (!this.remarks) {
      return null;
    }
    return (h(Host, null, h("strong", null, this.label), h("ul", null, (_a = this.remarks) === null || _a === void 0 ? void 0 : _a.map(remark => (h("li", { key: v4() }, "- ", remark.statement))))));
  }
  static get style() { return otaLabelCss; }
}, [2, "ota-label", {
    "label": [1],
    "remarks": [16]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ota-label"];
  components.forEach(tagName => { switch (tagName) {
    case "ota-label":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, OtaLabel);
      }
      break;
  } });
}

export { OtaLabel as O, defineCustomElement as d };

//# sourceMappingURL=ota-label2.js.map