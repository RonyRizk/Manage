import { Host, h } from "@stencil/core";
import { v4 } from "uuid";
import locales from "../../../../src/stores/locales.store";
export class OtaLabel {
  constructor() {
    this.toggleShowAll = () => {
      this.showAll = !this.showAll;
    };
    this.label = undefined;
    this.remarks = undefined;
    this.maxVisibleItems = 3;
    this.showAll = false;
  }
  render() {
    if (!this.remarks) {
      return null;
    }
    const displayedRemarks = this.showAll ? this.remarks : this.remarks.slice(0, this.maxVisibleItems);
    return (h(Host, null, h("strong", null, this.label), h("ul", null, displayedRemarks.map((remark, index) => (h("li", { key: v4() }, "- ", remark.statement, ' ', this.remarks.length > this.maxVisibleItems && index === displayedRemarks.length - 1 && (h("button", { onClick: this.toggleShowAll }, this.showAll ? locales.entries.Lcz_ShowLess : locales.entries.Lcz_ShowMore))))))));
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
      },
      "maxVisibleItems": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "max-visible-items",
        "reflect": false,
        "defaultValue": "3"
      }
    };
  }
  static get states() {
    return {
      "showAll": {}
    };
  }
}
//# sourceMappingURL=ota-label.js.map
