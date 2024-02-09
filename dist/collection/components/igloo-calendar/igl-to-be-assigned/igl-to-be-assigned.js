import { Host, h, Fragment } from "@stencil/core";
import { ToBeAssignedService } from "../../../services/toBeAssigned.service";
import { dateToFormattedString } from "../../../utils/utils";
import moment from "moment";
import locales from "../../../../../src/stores/locales.store";
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
    this.loadingMessage = undefined;
    this.calendarData = undefined;
    this.showDatesList = false;
    this.renderAgain = false;
    this.orderedDatesList = [];
  }
  componentWillLoad() {
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
      const result = await this.toBeAssignedService.getUnassignedRooms(this.propertyid, dateToFormattedString(new Date(+key)), calendarData.roomsInfo, calendarData.formattedLegendData);
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
      this.unassignedDates = this.calendarData.unassignedDates;
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
    return (h(Host, { class: "tobeAssignedContainer pr-1 text-left" }, h("div", null, h("div", null, h("div", { class: "stickyHeader" }, h("div", { class: "tobeAssignedHeader pt-1" }, locales.entries.Lcz_Assignments), h("div", { class: "closeBtn pt-1", onClick: () => this.handleOptionEvent('closeSideMenu') }, h("i", { class: "ft-chevrons-left" })), h("hr", null), Object.keys(this.data).length === 0 ? (h("p", null, locales.entries.Lcz_AllBookingsAreAssigned)) : this.isLoading ? (h("p", null, this.loadingMessage)) : (h(Fragment, null, this.orderedDatesList.length ? (h("div", { class: `custom-dropdown border border-light rounded text-center ` + (this.showDatesList ? 'show' : ''), id: "dropdownMenuButton", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, h("div", { class: 'dropdown-toggle' }, h("span", { class: "font-weight-bold" }, this.data[this.selectedDate].dateStr)), h("div", { class: "dropdown-menu dropdown-menu-right full-width", "aria-labelledby": "dropdownMenuButton" }, (_a = this.orderedDatesList) === null || _a === void 0 ? void 0 : _a.map(ordDate => (h("div", { class: "dropdown-item pointer", onClick: () => this.showForDate(ordDate) }, this.data[ordDate].dateStr)))))) : (locales.entries.Lcz_AllBookingsAreAssigned)))), !this.isLoading && (h("div", { class: "scrollabledArea" }, this.orderedDatesList.length ? (Object.keys(this.data[this.selectedDate].categories).length ? (this.getCategoryView()) : (h("div", { class: "mt-1" }, locales.entries.Lcz_AllAssignForThisDay))) : null))))));
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
      "orderedDatesList": {}
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
      }];
  }
}
//# sourceMappingURL=igl-to-be-assigned.js.map
