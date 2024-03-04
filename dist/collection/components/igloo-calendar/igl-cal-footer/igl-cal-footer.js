import locales from "../../../../../src/stores/locales.store";
import { Host, h } from "@stencil/core";
export class IglCalFooter {
  constructor() {
    this.calendarData = undefined;
    this.today = undefined;
    this.highlightedDate = undefined;
  }
  // private isOnline:boolean = false;
  handleOptionEvent(key, data = '') {
    this.optionEvent.emit({ key, data });
  }
  render() {
    return (h(Host, { class: "footerContainer" }, h("div", { class: "footerCell bottomLeftCell align-items-center preventPageScroll" }, h("div", { class: "legendBtn", onClick: () => this.handleOptionEvent('showLegend') }, h("i", { class: "la la-square" }), h("u", null, locales.entries.Lcz_Legend), h("span", null, " - v21"))), this.calendarData.days.map(dayInfo => (h("div", { class: "footerCell align-items-center" }, h("div", { class: `dayTitle full-height align-items-center ${dayInfo.day === this.today || this.highlightedDate === dayInfo.day ? 'currentDay' : ''}` }, dayInfo.dayDisplayName))))));
  }
  static get is() { return "igl-cal-footer"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-cal-footer.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-cal-footer.css"]
    };
  }
  static get properties() {
    return {
      "calendarData": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{ [key: string]: any }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "today": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "String",
          "resolved": "String",
          "references": {
            "String": {
              "location": "global",
              "id": "global::String"
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
      "highlightedDate": {
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
        "attribute": "highlighted-date",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "optionEvent",
        "name": "optionEvent",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ [key: string]: any }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=igl-cal-footer.js.map
