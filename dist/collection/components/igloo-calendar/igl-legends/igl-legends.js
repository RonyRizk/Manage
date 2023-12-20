import { Host, h } from "@stencil/core";
export class IglLegends {
  constructor() {
    this.legendData = undefined;
    this.defaultTexts = undefined;
  }
  handleOptionEvent(key, data = '') {
    this.optionEvent.emit({ key, data });
  }
  render() {
    return (h(Host, { class: "legendContainer pr-1 text-left" }, h("div", null, h("div", null, h("div", { class: "stickyHeader" }, h("div", { class: "legendHeader pt-1" }, this.defaultTexts.entries.Lcz_Legend), h("div", { class: "legendCloseBtn pt-1", onClick: () => this.handleOptionEvent('closeSideMenu') }, h("i", { class: "ft-chevrons-left" })), h("hr", null)), h("div", { class: "mt-2 pl-1" }, this.legendData.map(legendInfo => (h("div", { class: "legendRow " }, h("div", { class: `legend_${legendInfo.design} mr-1`, style: { backgroundColor: legendInfo.color } }), h("span", { class: "font-small-3" }, legendInfo.name))))), h("hr", null), h("div", { class: "mt-2" }, h("div", { class: "legendCalendar" }, h("div", { class: "legendRow align-items-center" }, h("div", { class: "legendCal br-t br-s br-bt" }, h("strong", null, "MAR 2022")), h("div", { class: "highphenLegend" }, this.defaultTexts.entries.Lcz_MonthAndYear)), h("div", { class: "legendRow" }, h("div", { class: "legendCal pl-2 pr-2 br-s" }, h("span", { class: "badge badge-primary badge-pill" }, "3")), h("div", { class: "highphenLegend" }, h("div", null, this.defaultTexts.entries.Lcz_UnassignedUnits))), h("div", { class: "legendRow" }, h("div", { class: "legendCal br-s" }, "FRI 18"), h("div", { class: "highphenLegend" }, this.defaultTexts.entries.Lcz_Date)), h("div", { class: "legendRow" }, h("div", { class: "legendCal br-s br-bt font-small-3" }, "15%"), h("div", { class: "highphenLegend" }, this.defaultTexts.entries.Lcz_Occupancy)), h("div", { class: "legendRow" }, h("div", { class: "legendCal br-s font-small-3" }, "20"), h("div", { class: "highphenLegend" }, this.defaultTexts.entries.Lcz_TotalAvailability)), h("div", { class: "legendRow align-items-center" }, h("div", { class: "legendCal br-s br-bt font-small-2" }, "15"), h("div", { class: "highphenLegend" }, h("div", null, this.defaultTexts.entries.Lcz_OfflineAvailability)))))))));
  }
  static get is() { return "igl-legends"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-legends.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-legends.css"]
    };
  }
  static get properties() {
    return {
      "legendData": {
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
      "defaultTexts": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "default-texts",
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
//# sourceMappingURL=igl-legends.js.map
