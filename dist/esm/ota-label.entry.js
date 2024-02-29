import { r as registerInstance, h, H as Host } from './index-2fc15efd.js';
import { v as v4 } from './v4-87f26972.js';

const otaLabelCss = "*.sc-ota-label{margin:0;padding:0}.sc-ota-label-h{display:flex;margin-bottom:5px;gap:5px}strong.sc-ota-label{margin:0;padding:0}ul.sc-ota-label{margin:0 3px;padding:0;flex:1;list-style:none}li.sc-ota-label{margin:0;padding:0}";

const OtaLabel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
OtaLabel.style = otaLabelCss;

export { OtaLabel as ota_label };

//# sourceMappingURL=ota-label.entry.js.map