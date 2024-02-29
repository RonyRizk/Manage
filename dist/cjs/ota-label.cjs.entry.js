'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const v4 = require('./v4-d89fec7e.js');

const otaLabelCss = "*.sc-ota-label{margin:0;padding:0}.sc-ota-label-h{display:flex;margin-bottom:5px;gap:5px}strong.sc-ota-label{margin:0;padding:0}ul.sc-ota-label{margin:0 3px;padding:0;flex:1;list-style:none}li.sc-ota-label{margin:0;padding:0}";

const OtaLabel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.label = undefined;
    this.remarks = undefined;
  }
  render() {
    var _a;
    if (!this.remarks) {
      return null;
    }
    return (index.h(index.Host, null, index.h("strong", null, this.label), index.h("ul", null, (_a = this.remarks) === null || _a === void 0 ? void 0 : _a.map(remark => (index.h("li", { key: v4.v4() }, "- ", remark.statement))))));
  }
};
OtaLabel.style = otaLabelCss;

exports.ota_label = OtaLabel;

//# sourceMappingURL=ota-label.cjs.entry.js.map