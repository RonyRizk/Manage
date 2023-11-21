import { Host, h } from "@stencil/core";
import { ToBeAssignedService } from "../../../services/toBeAssigned.service";
import { dateToFormattedString } from "../../../utils/utils";
import { transformDateFormatWithMoment } from "../../../utils/events.utils";
import moment from "moment";
export class IglCalHeader {
  constructor() {
    this.searchValue = '';
    this.searchList = [];
    this.roomsList = [];
    this.toBeAssignedService = new ToBeAssignedService();
    this.calendarData = undefined;
    this.today = undefined;
    this.propertyid = undefined;
    this.unassignedDates = {};
    this.to_date = undefined;
    this.renderAgain = false;
    this.unassignedRoomsNumber = {};
  }
  componentWillLoad() {
    try {
      this.initializeRoomsList();
      if (!this.calendarData.is_vacation_rental && Object.keys(this.unassignedDates).length > 0) {
        this.fetchAndAssignUnassignedRooms();
      }
    }
    catch (error) {
      console.error('Error in componentWillLoad:', error);
    }
  }
  handleCalendarDataChanged() {
    this.fetchAndAssignUnassignedRooms();
  }
  initializeRoomsList() {
    this.roomsList = [];
    this.calendarData.roomsInfo.forEach(category => {
      this.roomsList = this.roomsList.concat(...category.physicalrooms);
    });
  }
  async fetchAndAssignUnassignedRooms() {
    //const days = await this.toBeAssignedService.getUnassignedDates(this.propertyid, dateToFormattedString(new Date()), this.to_date);
    const days = this.unassignedDates;
    await this.assignRoomsToDate(days);
  }
  async assignRoomsToDate(days) {
    for (const day of Object.keys(days)) {
      const result = await this.toBeAssignedService.getUnassignedRooms(this.propertyid, dateToFormattedString(new Date(+day)), this.calendarData.roomsInfo, this.calendarData.formattedLegendData);
      this.unassignedRoomsNumber = Object.assign(Object.assign({}, this.unassignedRoomsNumber), { [transformDateFormatWithMoment(days[day].dateStr)]: result.length });
    }
  }
  handleReduceAvailableUnitEvent(event) {
    const opt = event.detail;
    const data = opt.data;
    event.stopImmediatePropagation();
    event.stopPropagation();
    // return {day, dayDisplayName, currentDate, tobeAssignedCount: dates[currentDate]};
    if (opt.key === 'reduceAvailableDays') {
      const selectedDate = moment(+data.selectedDate).format('D_M_YYYY');
      this.unassignedRoomsNumber[selectedDate] = this.unassignedRoomsNumber[selectedDate] - 1;
      this.renderView();
    }
  }
  showToBeAssigned(dayInfo) {
    if (this.unassignedRoomsNumber[dayInfo.day] || 0) {
      this.handleOptionEvent('showAssigned');
      setTimeout(() => {
        this.gotoToBeAssignedDate.emit({
          key: 'gotoToBeAssignedDate',
          data: dayInfo.currentDate,
        });
      }, 100);
    }
    else {
      // do nothing as the value is 0;
    }
  }
  handleOptionEvent(key, data = '') {
    this.optionEvent.emit({ key, data });
  }
  handleDateSelect(event) {
    const inputElement = event.target;
    let selectedDate = inputElement.value;
    // // Manually close the date picker - for Safari
    const picker = this.element.querySelector('.datePickerHidden');
    picker.blur();
    if (selectedDate) {
      this.handleOptionEvent('calendar', selectedDate);
    }
  }
  handleClearSearch() {
    this.searchValue = '';
    this.searchList = [];
    this.renderView();
  }
  handleFilterRooms(event) {
    const inputElement = event.target;
    let value = inputElement.value.trim();
    this.searchValue = value;
    value = value.toLowerCase();
    if (value === '') {
      this.handleClearSearch();
    }
    else {
      this.searchList = this.roomsList.filter(room => room.name.toLocaleLowerCase().indexOf(value) != -1);
    }
    this.renderView();
  }
  handleScrollToRoom(roomId) {
    this.handleClearSearch();
    this.gotoRoomEvent.emit({ key: 'gotoRoom', roomId });
  }
  getStringDateFormat(dt) {
    return dt.getFullYear() + '-' + (dt.getMonth() < 9 ? '0' : '') + (dt.getMonth() + 1) + '-' + (dt.getDate() <= 9 ? '0' : '') + dt.getDate();
  }
  getNewBookingModel() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let from_date = this.getStringDateFormat(today);
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);
    let to_date = this.getStringDateFormat(today);
    return {
      ID: '',
      NAME: '',
      EMAIL: '',
      PHONE: '',
      REFERENCE_TYPE: 'PHONE',
      FROM_DATE: from_date,
      TO_DATE: to_date,
      roomsInfo: this.calendarData.roomsInfo,
      TITLE: 'New Booking',
      event_type: 'PLUS_BOOKING',
      legendData: this.calendarData.formattedLegendData,
      defaultDateRange: {
        fromDate: new Date(from_date),
        fromDateStr: '',
        toDate: new Date(to_date),
        toDateStr: '',
        dateDifference: 0,
        editabled: true,
        message: '',
      },
    };
  }
  renderView() {
    this.renderAgain = !this.renderAgain;
  }
  render() {
    return (h(Host, null, h("div", { class: "stickyCell align-items-center topLeftCell preventPageScroll" }, h("div", { class: "row justify-content-around no-gutters" }, !this.calendarData.is_vacation_rental && (h("div", { class: "caledarBtns", onClick: () => this.handleOptionEvent('showAssigned'), "data-toggle": "tooltip", "data-placement": "bottom", title: "Unassigned Units" }, h("i", { class: "la la-tasks" }))), h("div", { class: "caledarBtns", onClick: () => this.handleOptionEvent('calendar'), "data-toggle": "tooltip", "data-placement": "bottom", title: "Navigate" }, h("i", { class: "la la-calendar-o" }), h("input", { class: "datePickerHidden", type: "date", onChange: this.handleDateSelect.bind(this), title: "" })), h("div", { class: "caledarBtns", onClick: () => this.handleOptionEvent('gotoToday'), "data-toggle": "tooltip", "data-placement": "bottom", title: "Today" }, h("i", { class: "la la-clock-o" })), h("div", { class: "caledarBtns", onClick: () => this.handleOptionEvent('add', this.getNewBookingModel()), "data-toggle": "tooltip", "data-placement": "bottom", title: "Create new booking" }, h("i", { class: "la la-plus" }))), h("div", { class: "row justify-content-around no-gutters searchContiner" }, h("fieldset", { class: `form-group position-relative ${this.searchValue != '' ? 'show' : ''}` }, h("input", { type: "text", class: "form-control form-control-sm input-sm", id: "iconLeft7", value: this.searchValue, placeholder: "Find unit", onInput: event => this.handleFilterRooms(event) }), this.searchValue !== '' ? (h("div", { class: "form-control-position pointer", onClick: () => this.handleClearSearch(), "data-toggle": "tooltip", "data-placement": "top", "data-original-title": "Clear Selection" }, h("i", { class: "la la-close font-small-4" }))) : null, this.searchList.length ? (h("div", { class: "position-absolute searchListContainer dropdown-menu dropdown-menu-left min-width-full" }, this.searchList.map(room => (h("div", { class: "searchListItem1 dropdown-item px-1 text-left pointer", onClick: () => this.handleScrollToRoom(room.id) }, room.name))))) : null))), h("div", { class: "stickyCell headersContainer" }, h("div", { class: "monthsContainer" }, this.calendarData.monthsInfo.map(monthInfo => (h("div", { class: "monthCell", style: { width: monthInfo.daysCount * 70 + 'px' } }, h("div", { class: "monthTitle" }, monthInfo.monthName))))), this.calendarData.days.map(dayInfo => (h("div", { class: `headerCell align-items-center ${'day-' + dayInfo.day} ${dayInfo.day === this.today ? 'currentDay' : ''}`, "data-day": dayInfo.day }, !this.calendarData.is_vacation_rental && (h("div", { class: "preventPageScroll" }, h("span", { class: `badge badge-${this.unassignedRoomsNumber[dayInfo.day] || dayInfo.unassigned_units_nbr !== 0 ? 'info pointer' : 'light'} badge-pill`, onClick: () => this.showToBeAssigned(dayInfo) }, this.unassignedRoomsNumber[dayInfo.day] || dayInfo.unassigned_units_nbr))), h("div", { class: "dayTitle" }, dayInfo.dayDisplayName), h("div", { class: "dayCapacityPercent" }, dayInfo.occupancy, "%")))))));
  }
  static get is() { return "igl-cal-header"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-cal-header.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-cal-header.css"]
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
      "unassignedDates": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{}",
          "resolved": "{}",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "{}"
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
      }
    };
  }
  static get states() {
    return {
      "renderAgain": {},
      "unassignedRoomsNumber": {}
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
        "method": "gotoRoomEvent",
        "name": "gotoRoomEvent",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{\r\n    [key: string]: any;\r\n  }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        }
      }, {
        "method": "gotoToBeAssignedDate",
        "name": "gotoToBeAssignedDate",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{\r\n    [key: string]: any;\r\n  }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "unassignedDates",
        "methodName": "handleCalendarDataChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "reduceAvailableUnitEvent",
        "method": "handleReduceAvailableUnitEvent",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=igl-cal-header.js.map
