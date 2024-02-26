import { Host, h } from "@stencil/core";
import { v4 } from "uuid";
export class OtaLabel {
  constructor() {
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
  static get is() { return "ota-label"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ota-label.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ota-label.css"]
    };
  }
  static get properties() {
    return {
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label",
        "reflect": false
      },
      "remarks": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IOtaNotes[]",
          "resolved": "IOtaNotes[]",
          "references": {
            "IOtaNotes": {
              "location": "import",
              "path": "@/models/booking.dto",
              "id": "src/models/booking.dto.ts::IOtaNotes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
}
//# sourceMappingURL=ota-label.js.map
