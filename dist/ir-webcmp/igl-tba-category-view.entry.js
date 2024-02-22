import { r as registerInstance, a as createEvent, h, e as Host } from './index-b28ea4d3.js';

const iglTbaCategoryViewCss = ".sc-igl-tba-category-view-h{display:block}";

const IglTbaCategoryView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
IglTbaCategoryView.style = iglTbaCategoryViewCss;

export { IglTbaCategoryView as igl_tba_category_view };

//# sourceMappingURL=igl-tba-category-view.entry.js.map