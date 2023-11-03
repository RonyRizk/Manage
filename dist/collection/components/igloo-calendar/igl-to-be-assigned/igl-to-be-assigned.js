import { Host, h, Fragment, } from "@stencil/core";
import { ToBeAssignedService } from "../../../services/toBeAssigned.service";
import { dateToFormattedString } from "../../../utils/utils";
export class IglToBeAssigned {
  constructor() {
    this.selectedDate = null;
    this.data = {};
    this.today = new Date();
    this.categoriesData = {};
    this.toBeAssignedService = new ToBeAssignedService();
    this.propertyid = undefined;
    this.from_date = undefined;
    this.to_date = undefined;
    this.loadingMessage = "Fetching For Unassigned Rooms";
    this.calendarData = undefined;
    this.showDatesList = false;
    this.renderAgain = false;
    this.orderedDatesList = [];
    this.isLoading = false;
  }
  componentWillLoad() {
    this.reArrangeData();
  }
  async updateCategories(key, calendarData) {
    try {
      let categorisedRooms = {};
      const result = await this.toBeAssignedService.getUnassignedRooms(this.propertyid, dateToFormattedString(new Date(+key)), calendarData.roomsInfo, calendarData.formattedLegendData);
      result.forEach((room) => {
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
      this.isLoading = true;
      this.today.setHours(0, 0, 0, 0);
      this.calendarData.roomsInfo.forEach((category) => {
        this.categoriesData[category.id] = {
          name: category.name,
          roomsList: category.physicalrooms,
          roomIds: category.physicalrooms.map((room) => {
            return room.id;
          }),
        };
      });
      this.selectedDate = null;
      this.unassignedDates = await this.toBeAssignedService.getUnassignedDates(this.propertyid, dateToFormattedString(new Date()), this.to_date);
      const firstKey = Object.keys(this.unassignedDates)[0];
      await this.updateCategories(firstKey, this.calendarData);
      this.data = this.unassignedDates;
      this.orderedDatesList = Object.keys(this.data).sort((a, b) => parseInt(a) - parseInt(b));
      if (!this.selectedDate && this.orderedDatesList.length) {
        this.selectedDate = this.orderedDatesList[0];
      }
    }
    catch (error) {
      console.error("Error fetching unassigned dates:", error);
      //  toastr.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  gotoDate(event) {
    this.showForDate(event.detail.data);
    this.showDatesList = false;
    this.renderView();
  }
  async showForDate(dateStamp) {
    try {
      this.isLoading = true;
      this.showUnassignedDate();
      await this.updateCategories(dateStamp, this.calendarData);
      this.addToBeAssignedEvent.emit({ key: "tobeAssignedEvents", data: [] });
      this.selectedDate = dateStamp;
      this.showBookingPopup.emit({
        key: "calendar",
        data: parseInt(dateStamp) - 86400000,
      });
      this.isLoading = false; // goto 1 days before.. // calendar moves another 1 day
    }
    catch (error) {
      // toastr.error(error);
    }
  }
  getDay(dt) {
    const currentDate = new Date(dt);
    const locale = "default"; //'en-US';
    const dayOfWeek = this.getLocalizedDayOfWeek(currentDate, locale);
    // const monthName = currentDate.toLocaleString("default", { month: 'short' })
    return (dayOfWeek + " " + currentDate.getDate() + ", " + currentDate.getFullYear());
  }
  getLocalizedDayOfWeek(date, locale) {
    const options = { weekday: "short" };
    return date.toLocaleDateString(locale, options);
  }
  handleOptionEvent(key, data = "") {
    this.highlightToBeAssignedBookingEvent.emit({
      key: "highlightBookingId",
      data: { bookingId: "----" },
    });
    this.addToBeAssignedEvent.emit({ key: "tobeAssignedEvents", data: [] });
    this.optionEvent.emit({ key, data });
  }
  showUnassignedDate() {
    this.showDatesList = !this.showDatesList;
  }
  getToBeAssignedEntities() {
    // toBeAssignedEvents
  }
  getCategoryView() {
    if (this.orderedDatesList.length &&
      this.selectedDate &&
      this.data[this.selectedDate]) {
      return Object.entries(this.data[this.selectedDate].categories).map(([id, eventDatas], ind) => (h("igl-tba-category-view", { calendarData: this.calendarData, selectedDate: this.selectedDate, categoryId: id, categoryIndex: ind, categoriesData: this.categoriesData, eventDatas: eventDatas, onAssignUnitEvent: (evt) => this.handleAssignUnit(evt) })));
    }
    else {
      return null;
    }
  }
  handleAssignUnit(event) {
    const opt = event.detail;
    const data = opt.data;
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (opt.key === "assignUnit") {
      this.data[data.selectedDate].categories[data.RT_ID] = this.data[data.selectedDate].categories[data.RT_ID].filter((eventData) => eventData.ID != data.assignEvent.ID);
      this.calendarData = data.calendarData; // RAJA
      // this.calendarData.bookingEvents.push(data.assignEvent);
      if (!this.data[data.selectedDate].categories[data.RT_ID].length) {
        delete this.data[data.selectedDate].categories[data.RT_ID];
        if (!Object.keys(this.data[data.selectedDate].categories).length) {
          delete this.data[data.selectedDate];
          this.orderedDatesList = this.orderedDatesList.filter((dateStamp) => dateStamp != data.selectedDate);
          this.selectedDate = this.orderedDatesList.length
            ? this.orderedDatesList[0]
            : null;
        }
      }
      this.reduceAvailableUnitEvent.emit({
        key: "reduceAvailableDays",
        data: { selectedDate: data.selectedDate },
      });
      this.renderView();
    }
  }
  renderView() {
    this.renderAgain = !this.renderAgain;
  }
  render() {
    return (h(Host, { class: "tobeAssignedContainer pr-1 text-left" }, h("div", null, h("div", null, h("div", { class: "stickyHeader" }, h("div", { class: "tobeAssignedHeader pt-1" }, "Assignments"), h("div", { class: "closeBtn pt-1", onClick: () => this.handleOptionEvent("closeSideMenu") }, h("i", { class: "ft-chevrons-left" })), h("hr", null), this.isLoading ? (h("p", null, this.loadingMessage)) : (h(Fragment, null, this.orderedDatesList.length ? (h("div", { class: `text-center ` + (this.showDatesList ? "show" : "") }, h("div", { onClick: () => this.showUnassignedDate() }, h("span", { class: "font-weight-bold" }, this.data[this.selectedDate].dateStr), h("i", { class: "la la-angle-down ml-2" })), this.showDatesList ? (h("div", { class: "dropdown-menu dropdown-menu-right full-width" }, this.orderedDatesList.map((ordDate) => (h("div", { class: "pointer dropdown-item pointer", onClick: () => this.showForDate(ordDate) }, this.data[ordDate].dateStr))))) : null)) : ("All bookings assigned")))), !this.isLoading && (h("div", { class: "scrollabledArea" }, this.orderedDatesList.length ? (Object.keys(this.data[this.selectedDate].categories)
      .length ? (this.getCategoryView()) : (h("div", { class: "mt-1" }, "All assigned for this day."))) : null))))));
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
      "loadingMessage": {
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
        "attribute": "loading-message",
        "reflect": false,
        "defaultValue": "\"Fetching For Unassigned Rooms\""
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
      "showDatesList": {},
      "renderAgain": {},
      "orderedDatesList": {},
      "isLoading": {}
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
