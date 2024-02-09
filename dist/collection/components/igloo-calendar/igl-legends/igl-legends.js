import locales from "../../../../../src/stores/locales.store";
import { Host, h } from "@stencil/core";
export class IglLegends {
  constructor() {
    this.legendData = undefined;
  }
  handleOptionEvent(key, data = '') {
    this.optionEvent.emit({ key, data });
  }
  render() {
    return (h(Host, { class: "legendContainer pr-1 text-left" }, h("div", null, h("div", null, h("div", { class: "stickyHeader" }, h("div", { class: "legendHeader pt-1" }, locales.entries.Lcz_Legend), h("div", { class: "legendCloseBtn pt-1", onClick: () => this.handleOptionEvent('closeSideMenu') }, h("i", { class: "ft-chevrons-left" })), h("hr", null)), h("div", { class: "mt-2 pl-1" }, this.legendData.map(legendInfo => (h("div", { class: "legendRow " }, h("div", { class: `legend_${legendInfo.design} mr-1`, style: { backgroundColor: legendInfo.color } }), h("span", { class: "font-small-3" }, legendInfo.name))))), h("hr", null), h("div", { class: "mt-2" }, h("div", { class: "legendCalendar" }, h("div", { class: "legendRow align-items-center" }, h("div", { class: "legendCal br-t br-s br-bt" }, h("strong", null, "MAR 2022")), h("div", { class: "highphenLegend" }, locales.entries.Lcz_MonthAndYear)), h("div", { class: "legendRow" }, h("div", { class: "legendCal headerCell align-items-center br-s" }, h("span", { class: "badge badge-info  badge-pill" }, "3")), h("div", { class: "highphenLegend" }, h("div", null, locales.entries.Lcz_UnassignedUnits))), h("div", { class: "legendRow" }, h("div", { class: "legendCal dayTitle br-s" }, "Fri 18"), h("div", { class: "highphenLegend" }, locales.entries.Lcz_Date)), h("div", { class: "legendRow" }, h("div", { class: "legendCal br-s br-bt dayCapacityPercent" }, "15%"), h("div", { class: "highphenLegend" }, locales.entries.Lcz_Occupancy)), h("div", { class: "legendRow" }, h("div", { class: "legendCal br-s br-bt  font-weight-bold total-availability" }, "20"), h("div", { class: "highphenLegend" }, locales.entries.Lcz_TotalAvailability))))))));
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
