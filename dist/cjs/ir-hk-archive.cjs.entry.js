'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const housekeeping_service = require('./housekeeping.service-4450f5c3.js');
const moment = require('./moment-f96595e5.js');
require('./axios-77201e24.js');
require('./index-797ee4c0.js');

const irHkArchiveCss = ".sc-ir-hk-archive-h{display:block}";

const IrHkArchive = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.houseKeepingService = new housekeeping_service.HouseKeepingService();
    this.selectedDates = {
      start: moment.hooks().add(-90, 'days').format('YYYY-MM-DD'),
      end: moment.hooks().format('YYYY-MM-DD'),
    };
  }
  componentWillLoad() {
    this.houseKeepingService.setToken(housekeeping_service.housekeeping_store.default_properties.token);
    this.initializeData();
  }
  async initializeData() { }
  handleDateRangeChange(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    const { start, end } = e.detail;
    this.selectedDates = {
      start: start.format('YYYY-MM-DD'),
      end: end.format('YYYY-MM-DD'),
    };
  }
  async searchArchive(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
  }
  async exportArchive(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
  }
  render() {
    return (index.h(index.Host, null, index.h("ir-title", { class: "px-1", label: "Cleaning Archives (90 days)", displayContext: "sidebar" }), index.h("section", { class: "px-1" }, index.h("div", { class: "d-flex" }, index.h("ir-select", { class: "w-100", LabelAvailable: false, data: [], firstOption: "All units" }), index.h("ir-select", { class: "ml-1 w-100", LabelAvailable: false, data: [], firstOption: "All housekeepers" })), index.h("div", { class: "d-flex mt-1 align-items-center" }, index.h("igl-date-range", { class: "mr-1", withDateDifference: false, minDate: moment.hooks().add(-90, 'days').format('YYYY-MM-DD'), defaultData: {
        fromDate: this.selectedDates.start,
        toDate: this.selectedDates.end,
      } }), index.h("ir-icon", { onIconClickHandler: this.searchArchive.bind(this), class: "mr-1" }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }))), index.h("ir-icon", { onIconClickHandler: this.exportArchive.bind(this) }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "15", viewBox: "0 0 384 512" }, index.h("path", { fill: "currentColor", d: "M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z" })))))));
  }
};
IrHkArchive.style = irHkArchiveCss;

exports.ir_hk_archive = IrHkArchive;

//# sourceMappingURL=ir-hk-archive.cjs.entry.js.map