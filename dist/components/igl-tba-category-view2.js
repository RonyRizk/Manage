import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$1 } from './igl-tba-booking-view2.js';

const iglTbaCategoryViewCss = ".sc-igl-tba-category-view-h{display:block}";

const IglTbaCategoryView = /*@__PURE__*/ proxyCustomElement(class IglTbaCategoryView extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.assignUnitEvent = createEvent(this, "assignUnitEvent", 7);
    this.calendarData = undefined;
    this.selectedDate = undefined;
    this.categoriesData = {};
    this.categoryId = undefined;
    this.eventDatas = undefined;
    this.categoryIndex = undefined;
    this.renderAgain = false;
  }
  // private localEventDatas;
  componentWillLoad() {
    // this.localEventDatas = this.eventDatas;
  }
  handleAssignRoomEvent(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const opt = event.detail;
    this.eventDatas = this.eventDatas.filter((eventData) => eventData.ID != opt.data.ID);
    this.calendarData.bookingEvents.push(opt.data);
    this.assignUnitEvent.emit({
      key: "assignUnit",
      data: {
        RT_ID: this.categoryId,
        selectedDate: this.selectedDate,
        assignEvent: opt.data,
        calendarData: this.calendarData,
      },
    });
    // if(this.localEventDatas.length){
    this.renderView();
    // }
  }
  getEventView(categoryId, eventDatas) {
    return eventDatas.map((eventData, ind) => (h("igl-tba-booking-view", { calendarData: this.calendarData, selectedDate: this.selectedDate, eventData: eventData, categoriesData: this.categoriesData, categoryId: categoryId, categoryIndex: this.categoryIndex, eventIndex: ind, onAssignRoomEvent: (evt) => this.handleAssignRoomEvent(evt) })));
  }
  renderView() {
    this.renderAgain = !this.renderAgain;
  }
  render() {
    return (h(Host, null, h("div", { class: "sectionContainer" }, h("div", { class: "font-weight-bold mt-1 font-small-3" }, this.categoriesData[this.categoryId].name), this.getEventView(this.categoryId, this.eventDatas))));
  }
  static get style() { return iglTbaCategoryViewCss; }
}, [2, "igl-tba-category-view", {
    "calendarData": [16],
    "selectedDate": [8, "selected-date"],
    "categoriesData": [16],
    "categoryId": [8, "category-id"],
    "eventDatas": [1032, "event-datas"],
    "categoryIndex": [8, "category-index"],
    "renderAgain": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["igl-tba-category-view", "igl-tba-booking-view"];
  components.forEach(tagName => { switch (tagName) {
    case "igl-tba-category-view":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IglTbaCategoryView);
      }
      break;
    case "igl-tba-booking-view":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IglTbaCategoryView as I, defineCustomElement as d };

//# sourceMappingURL=igl-tba-category-view2.js.map