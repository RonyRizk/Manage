import { Host, h, Fragment } from "@stencil/core";
import { ToBeAssignedService } from "../../../services/toBeAssigned.service";
import { dateToFormattedString } from "../../../utils/utils";
import moment from "moment";
import locales from "../../../../../src/stores/locales.store";
import { getUnassignedDates } from "../../../../../src/stores/unassigned_dates.store";
import calendar_data from "../../../../../src/stores/calendar-data";
//import { updateCategories } from '../../../utils/events.utils';
export class IglToBeAssigned {
  constructor() {
    this.isGotoToBeAssignedDate = false;
    this.isLoading = true;
    this.selectedDate = null;
    this.data = {};
    this.today = new Date();
    this.categoriesData = {};
    this.toBeAssignedService = new ToBeAssignedService();
    this.unassignedDatesProp = undefined;
    this.propertyid = undefined;
    this.from_date = undefined;
    this.to_date = undefined;
    this.calendarData = undefined;
    this.loadingMessage = undefined;
    this.showDatesList = false;
    this.renderAgain = false;
    this.orderedDatesList = [];
    this.noScroll = false;
  }
  componentWillLoad() {
    this.toBeAssignedService.setToken(calendar_data.token);
    this.reArrangeData();
    this.loadingMessage = locales.entries.Lcz_FetchingUnAssignedUnits;
  }
  handleUnassignedDatesToBeAssignedChange(newValue) {
    const { fromDate, toDate, data } = newValue;
    let dt = new Date(fromDate);
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    let endDate = dt.getTime();
    while (endDate <= new Date(toDate).getTime()) {
      if (data && !data[endDate] && this.unassignedDates.hasOwnProperty(endDate)) {
        delete this.unassignedDates[endDate];
      }
      else if (data && data[endDate]) {
        this.unassignedDates[endDate] = data[endDate];
      }
      endDate = moment(endDate).add(1, 'days').toDate().getTime();
    }
    this.data = Object.assign({}, this.unassignedDates);
    this.orderedDatesList = Object.keys(this.data).sort((a, b) => parseInt(a) - parseInt(b));
    if (this.orderedDatesList.length) {
      if (!this.data.hasOwnProperty(this.selectedDate)) {
        this.selectedDate = this.orderedDatesList.length ? this.orderedDatesList[0] : null;
      }
      this.showForDate(this.selectedDate, false);
      this.renderView();
    }
    else {
      this.selectedDate = null;
    }
  }
  handleAssignUnit(event) {
    const opt = event.detail;
    const data = opt.data;
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (opt.key === 'assignUnit') {
      if (Object.keys(this.data[data.selectedDate].categories).length === 1) {
        this.isLoading = true;
        this.noScroll = true;
      }
      this.data[data.selectedDate].categories[data.RT_ID] = this.data[data.selectedDate].categories[data.RT_ID].filter(eventData => eventData.ID != data.assignEvent.ID);
      this.calendarData = data.calendarData;
      // this.calendarData.bookingEvents.push(data.assignEvent);
      // if (!this.data[data.selectedDate].categories[data.RT_ID].length) {
      //   delete this.data[data.selectedDate].categories[data.RT_ID];
      //   if (!Object.keys(this.data[data.selectedDate].categories).length) {
      //     delete this.data[data.selectedDate];
      //     //this.orderedDatesList = this.orderedDatesList.filter(dateStamp => dateStamp != data.selectedDate);
      //     //this.selectedDate = this.orderedDatesList.length ? this.orderedDatesList[0] : null;
      //   }
      // }
      this.renderView();
      // this.reduceAvailableUnitEvent.emit({key: "reduceAvailableDays", data: {selectedDate: data.selectedDate}});
    }
  }
  async updateCategories(key, calendarData) {
    try {
      //console.log("called")
      let categorisedRooms = {};
      const result = await this.toBeAssignedService.getUnassignedRooms({ from_date: calendarData.from_date, to_date: calendarData.to_date }, this.propertyid, dateToFormattedString(new Date(+key)), calendarData.roomsInfo, calendarData.formattedLegendData);
      result.forEach(room => {
        if (!categorisedRooms.hasOwnProperty(room.RT_ID)) {
          categorisedRooms[room.RT_ID] = [room];
        }
        else {
          categorisedRooms[room.RT_ID].push(room);
        }
      });
      this.unassignedDates[key].categories = categorisedRooms;
    }
    catch (error) {
      //  toastr.error(error);
    }
  }
  async reArrangeData() {
    try {
      this.today.setHours(0, 0, 0, 0);
      this.calendarData.roomsInfo.forEach(category => {
        this.categoriesData[category.id] = {
          name: category.name,
          roomsList: category.physicalrooms,
          roomIds: category.physicalrooms.map(room => {
            return room.id;
          }),
        };
      });
      this.selectedDate = null;
      //this.unassignedDates = await this.toBeAssignedService.getUnassignedDates(this.propertyid, dateToFormattedString(new Date()), this.to_date);
      this.unassignedDates = getUnassignedDates();
      console.log(this.unassignedDates);
      this.data = this.unassignedDates;
      this.orderedDatesList = Object.keys(this.data).sort((a, b) => parseInt(a) - parseInt(b));
      if (!this.selectedDate && this.orderedDatesList.length) {
        this.selectedDate = this.orderedDatesList[0];
      }
    }
    catch (error) {
      console.error('Error fetching unassigned dates:', error);
      //  toastr.error(error);
    }
  }
  async componentDidLoad() {
    setTimeout(() => {
      if (!this.isGotoToBeAssignedDate && Object.keys(this.unassignedDates).length > 0) {
        //console.log(this.isGotoToBeAssignedDate);
        const firstKey = Object.keys(this.unassignedDates)[0];
        this.showForDate(firstKey);
      }
    }, 100);
  }
  async gotoDate(event) {
    this.isGotoToBeAssignedDate = true;
    this.showForDate(event.detail.data);
    this.showDatesList = false;
    this.renderView();
  }
  handleToBeAssignedDate(e) {
    this.showBookingPopup.emit({
      key: 'calendar',
      data: new Date(e.detail.data.fromDate).getTime() - 86400000,
      noScroll: false,
    });
  }
  async showForDate(dateStamp, withLoading = true) {
    try {
      if (withLoading) {
        this.isLoading = true;
      }
      if (this.showDatesList) {
        this.showUnassignedDate();
      }
      await this.updateCategories(dateStamp, this.calendarData);
      this.addToBeAssignedEvent.emit({ key: 'tobeAssignedEvents', data: [] });
      this.showBookingPopup.emit({
        key: 'calendar',
        data: parseInt(dateStamp) - 86400000,
        noScroll: this.noScroll,
      });
      if (this.isGotoToBeAssignedDate) {
        this.isGotoToBeAssignedDate = false;
      }
      this.isLoading = false;
      this.selectedDate = dateStamp;
      this.renderView();
    }
    catch (error) {
      // toastr.error(error);
    }
  }
  getDay(dt) {
    const currentDate = new Date(dt);
    const locale = 'default'; //'en-US';
    const dayOfWeek = this.getLocalizedDayOfWeek(currentDate, locale);
    // const monthName = currentDate.toLocaleString("default", { month: 'short' })
    return dayOfWeek + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear();
  }
  getLocalizedDayOfWeek(date, locale) {
    const options = { weekday: 'short' };
    return date.toLocaleDateString(locale, options);
  }
  handleOptionEvent(key, data = '') {
    this.highlightToBeAssignedBookingEvent.emit({
      key: 'highlightBookingId',
      data: { bookingId: '----' },
    });
    this.addToBeAssignedEvent.emit({ key: 'tobeAssignedEvents', data: [] });
    this.optionEvent.emit({ key, data });
  }
  showUnassignedDate() {
    this.showDatesList = !this.showDatesList;
  }
  getToBeAssignedEntities() {
    // toBeAssignedEvents
  }
  getCategoryView() {
    if (this.orderedDatesList.length && this.selectedDate && this.data[this.selectedDate]) {
      return Object.entries(this.data[this.selectedDate].categories).map(([id, eventDatas], ind) => (h("igl-tba-category-view", { calendarData: this.calendarData, selectedDate: this.selectedDate, categoryId: id, categoryIndex: ind, categoriesData: this.categoriesData, eventDatas: eventDatas, onAssignUnitEvent: evt => this.handleAssignUnit(evt) })));
    }
    else {
      return null;
    }
  }
  renderView() {
    this.renderAgain = !this.renderAgain;
  }
  render() {
    var _a;
    return (h(Host, { class: "tobeAssignedContainer pr-1 text-left" }, h("div", null, h("div", null, h("div", { class: "stickyHeader pt-1" }, h("p", { class: "tobeAssignedHeader " }, locales.entries.Lcz_Assignments), h("ir-icon", { class: "closeBtn pt-2", onIconClickHandler: () => this.handleOptionEvent('closeSideMenu') }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", height: 18, width: 18 }, h("path", { fill: "#6b6f82", d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" }))), h("hr", null), Object.keys(this.data).length === 0 ? (h("p", null, locales.entries.Lcz_AllBookingsAreAssigned)) : this.isLoading ? (h("p", { class: "d-flex align-items-center" }, h("span", { class: "p-0" }, this.loadingMessage), h("div", { class: "dots" }, h("div", { class: "dot" }), h("div", { class: "dot" }), h("div", { class: "dot" })))) : (h(Fragment, null, this.orderedDatesList.length ? (h("div", { class: `custom-dropdown border border-light rounded text-center ` + (this.showDatesList ? 'show' : ''), id: "dropdownMenuButton", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, h("div", { class: 'dropdown-toggle' }, h("span", { class: "font-weight-bold" }, this.data[this.selectedDate].dateStr), h("svg", { class: 'caret-icon', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", height: 14, width: 14 }, h("path", { fill: "#6b6f82", d: "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" }))), h("div", { class: "dropdown-menu dropdown-menu-right full-width", "aria-labelledby": "dropdownMenuButton" }, (_a = this.orderedDatesList) === null || _a === void 0 ? void 0 : _a.map(ordDate => (h("div", { class: "dropdown-item pointer", onClick: () => this.showForDate(ordDate) }, this.data[ordDate].dateStr)))))) : (locales.entries.Lcz_AllBookingsAreAssigned)))), !this.isLoading && (h("div", { class: "scrollabledArea" }, this.orderedDatesList.length ? (Object.keys(this.data[this.selectedDate].categories).length ? (this.getCategoryView()) : (h("div", { class: "mt-1" }, locales.entries.Lcz_AllAssignForThisDay))) : null))))));
  }
  static get is() { return "igl-to-be-assigned"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-to-be-assigned.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-to-be-assigned.css"]
    };
  }
  static get properties() {
    return {
      "unassignedDatesProp": {
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
        "attribute": "unassigned-dates-prop",
        "reflect": false
      },
      "propertyid": {
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
        "attribute": "propertyid",
        "reflect": false
      },
      "from_date": {
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
        "attribute": "from_date",
        "reflect": false
      },
      "to_date": {
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
        "attribute": "to_date",
        "reflect": false
      },
      "calendarData": {
        "type": "unknown",
        "mutable": true,
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
  static get states() {
    return {
      "loadingMessage": {},
      "showDatesList": {},
      "renderAgain": {},
      "orderedDatesList": {},
      "noScroll": {}
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
      }, {
        "method": "reduceAvailableUnitEvent",
        "name": "reduceAvailableUnitEvent",
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
      }, {
        "method": "showBookingPopup",
        "name": "showBookingPopup",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "addToBeAssignedEvent",
        "name": "addToBeAssignedEvent",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "highlightToBeAssignedBookingEvent",
        "name": "highlightToBeAssignedBookingEvent",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get watchers() {
    return [{
        "propName": "unassignedDatesProp",
        "methodName": "handleUnassignedDatesToBeAssignedChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "gotoToBeAssignedDate",
        "method": "gotoDate",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "highlightToBeAssignedBookingEvent",
        "method": "handleToBeAssignedDate",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=igl-to-be-assigned.js.map
