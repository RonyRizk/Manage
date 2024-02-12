import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as locales } from './locales.store.js';

const iglLegendsCss = ".sc-igl-legends-h{display:block}.legendHeader.sc-igl-legends{font-weight:500;letter-spacing:0.05rem;font-size:1.12rem;padding-top:5px;margin-bottom:1rem}.legendCloseBtn.sc-igl-legends{position:absolute;top:50%;right:0;cursor:pointer;font-size:1.75em;line-height:1em;padding:0.4rem;display:flex;align-items:center;justify-content:center;border-radius:3px;transform:translateY(-50%)}.legendCloseBtn.sc-igl-legends:hover{background-color:#f6f6f6}.stickyHeader.sc-igl-legends{position:-webkit-sticky;position:sticky;top:0;background-color:#ffffff;z-index:1}.legendRow.sc-igl-legends{position:relative;vertical-align:middle;margin-bottom:0.3rem}.legendRow.sc-igl-legends div.sc-igl-legends{display:inline-block;vertical-align:middle}.legend_skew.sc-igl-legends,.legend_skew-bordered.sc-igl-legends,.legend_skewsplit.sc-igl-legends{transform:skew(-30deg);width:15px;height:16px}.legend_skew-bordered.sc-igl-legends{border:1px solid black}.legend_circle.sc-igl-legends{border-radius:100%;width:10px;height:10px;margin:3px 3px 3px 2px}.legend_skewsplit.sc-igl-legends{border-right:2px solid #000000}.headerCell.sc-igl-legends .blueColor.sc-igl-legends{background-color:#31bef1}.greenColor.sc-igl-legends{background-color:#45b16d}.yellowColor.sc-igl-legends{background-color:#f4d552}.greyColor.sc-igl-legends{background-color:#a0a0a0}.redColor.sc-igl-legends{background-color:#f34752}.pinkColor.sc-igl-legends{background-color:#f9b4b7}.legendCalendar.sc-igl-legends .legendRow.sc-igl-legends{margin-bottom:0}.legendCalendar.sc-igl-legends .legendRow.sc-igl-legends:first-child .legendCal.sc-igl-legends{background-color:#ececec}.legendCalendar.sc-igl-legends .legendRow.sc-igl-legends div.sc-igl-legends{display:inline-block;vertical-align:middle;-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.total-availability.sc-igl-legends{font-size:1em !important}.legendCalendar.sc-igl-legends .legendCal.sc-igl-legends{width:80px;height:25px;text-align:center;display:inline-grid !important;align-content:center;-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.legendCalendar.sc-igl-legends .legendCal.sc-igl-legends .badge.sc-igl-legends{margin-top:0.2rem;-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.legendCalendar.sc-igl-legends .legendCal.legendCal-h2.sc-igl-legends{height:40px;-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.br-t.sc-igl-legends{border-top:1px solid #a0a0a0}.br-s.sc-igl-legends{border-left:1px solid #a0a0a0;border-right:1px solid #a0a0a0}.br-bt.sc-igl-legends{border-bottom:1px solid #a0a0a0}.highphenLegend.sc-igl-legends{font-size:0.9em;-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.highphenLegend.sc-igl-legends::before{width:12px;height:0.5px;content:' ';background-color:#000000;vertical-align:middle;display:inline-block;margin-left:5px;margin-right:5px;-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.badge-pill.sc-igl-legends{padding:3px 1em;font-size:0.8em;-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.headerCell.sc-igl-legends{width:70px;display:flex;align-items:center;justify-content:center}.dayTitle.sc-igl-legends{font-size:0.8em;font-weight:600;-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.dayCapacityPercent.sc-igl-legends{font-size:0.75em;-webkit-user-select:none;user-select:none;-webkit-user-drag:none}";

const IglLegends = /*@__PURE__*/ proxyCustomElement(class IglLegends extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.optionEvent = createEvent(this, "optionEvent", 7);
    this.legendData = undefined;
  }
  handleOptionEvent(key, data = '') {
    this.optionEvent.emit({ key, data });
  }
  render() {
    return (h(Host, { class: "legendContainer pr-1 text-left" }, h("div", { class: 'w-full' }, h("div", { class: 'w-full' }, h("div", { class: "stickyHeader pt-1 " }, h("p", { class: "legendHeader" }, locales.entries.Lcz_Legend), h("div", { class: "legendCloseBtn", onClick: () => this.handleOptionEvent('closeSideMenu') }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", height: 18, width: 18 }, h("path", { fill: "#6b6f82", d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" }))), h("hr", null)), h("div", { class: "mt-2 pl-1" }, this.legendData.map(legendInfo => (h("div", { class: "legendRow " }, h("div", { class: `legend_${legendInfo.design} mr-1`, style: { backgroundColor: legendInfo.color } }), h("span", { class: "font-small-3" }, legendInfo.name))))), h("hr", null), h("div", { class: "mt-2" }, h("div", { class: "legendCalendar" }, h("div", { class: "legendRow align-items-center" }, h("div", { class: "legendCal br-t br-s br-bt" }, h("strong", null, "MAR 2022")), h("div", { class: "highphenLegend" }, locales.entries.Lcz_MonthAndYear)), h("div", { class: "legendRow" }, h("div", { class: "legendCal headerCell align-items-center br-s" }, h("span", { class: "badge badge-info  badge-pill" }, "3")), h("div", { class: "highphenLegend" }, h("div", null, locales.entries.Lcz_UnassignedUnits))), h("div", { class: "legendRow" }, h("div", { class: "legendCal dayTitle br-s" }, "Fri 18"), h("div", { class: "highphenLegend" }, locales.entries.Lcz_Date)), h("div", { class: "legendRow" }, h("div", { class: "legendCal br-s br-bt dayCapacityPercent" }, "15%"), h("div", { class: "highphenLegend" }, locales.entries.Lcz_Occupancy)), h("div", { class: "legendRow" }, h("div", { class: "legendCal br-s br-bt  font-weight-bold total-availability" }, "20"), h("div", { class: "highphenLegend" }, locales.entries.Lcz_TotalAvailability))))))));
  }
  static get style() { return iglLegendsCss; }
}, [2, "igl-legends", {
    "legendData": [16]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["igl-legends"];
  components.forEach(tagName => { switch (tagName) {
    case "igl-legends":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IglLegends);
      }
      break;
  } });
}

export { IglLegends as I, defineCustomElement as d };

//# sourceMappingURL=igl-legends2.js.map