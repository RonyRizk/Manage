import { Host, h } from "@stencil/core";
import calendar_dates from "../../../../../src/stores/calendar-dates.store";
import locales from "../../../../../src/stores/locales.store";
export class IglCalBody {
  constructor() {
    this.selectedRooms = {};
    this.fromRoomId = -1;
    this.currentDate = new Date();
    this.isScrollViewDragging = undefined;
    this.calendarData = undefined;
    this.today = undefined;
    this.currency = undefined;
    this.language = undefined;
    this.countryNodeList = undefined;
    this.dragOverElement = '';
    this.renderAgain = false;
  }
  componentWillLoad() {
    this.currentDate.setHours(0, 0, 0, 0);
  }
  dragOverHighlightElementHandler(event) {
    this.dragOverElement = event.detail.dragOverElement;
  }
  gotoRoom(event) {
    let roomId = event.detail.roomId;
    let category = this.getRoomCategoryByRoomId(roomId);
    if (!category.expanded) {
      this.toggleCategory(category);
      setTimeout(() => {
        this.scrollToRoom(roomId);
      }, 10);
    }
    else {
      this.scrollToRoom(roomId);
    }
  }
  addToBeAssignedEvents(event) {
    // let roomId = event.detail.roomId;
    this.addBookingDatas(event.detail.data);
    this.renderElement();
  }
  scrollToRoom(roomId) {
    this.scrollPageToRoom.emit({
      key: 'scrollPageToRoom',
      id: roomId,
      refClass: 'room_' + roomId,
    });
  }
  getRoomCategoryByRoomId(roomId) {
    return this.calendarData.roomsInfo.find(roomCategory => {
      return this.getCategoryRooms(roomCategory).find(room => this.getRoomId(room) === roomId);
    });
  }
  getCategoryName(roomCategory) {
    return roomCategory.name;
  }
  getCategoryId(roomCategory) {
    return roomCategory.id;
  }
  getTotalPhysicalRooms(roomCategory) {
    return this.getCategoryRooms(roomCategory).length;
  }
  getCategoryRooms(roomCategory) {
    return (roomCategory && roomCategory.physicalrooms) || [];
  }
  getRoomName(roomInfo) {
    return roomInfo.name;
  }
  getRoomId(roomInfo) {
    return roomInfo.id;
  }
  getRoomById(physicalRooms, roomId) {
    return physicalRooms.find(physical_room => this.getRoomId(physical_room) === roomId);
  }
  getBookingData() {
    return this.calendarData.bookingEvents;
  }
  addBookingDatas(aData) {
    this.addBookingDatasEvent.emit(aData);
  }
  getSelectedCellRefName(roomId, selectedDay) {
    return 'room_' + roomId + '_' + selectedDay.currentDate;
  }
  // getSplitBookingEvents(newEvent) {
  //   return this.getBookingData().some(bookingEvent => !['003', '002', '004'].includes(bookingEvent.STATUS_CODE) && newEvent.FROM_DATE === bookingEvent.FROM_DATE);
  // }
  getSplitBookingEvents(newEvent) {
    console.log(newEvent.FROM_DATE);
    return this.getBookingData().some(bookingEvent => {
      if (!['003', '002', '004'].includes(bookingEvent.STATUS_CODE)) {
        if (new Date(newEvent.FROM_DATE).getTime() >= new Date(bookingEvent.FROM_DATE).getTime() &&
          new Date(newEvent.FROM_DATE).getTime() <= new Date(bookingEvent.TO_DATE).getTime()) {
          return bookingEvent;
        }
      }
    });
  }
  closeWindow() {
    let ind = this.getBookingData().findIndex(ev => ev.ID === 'NEW_TEMP_EVENT');
    if (ind !== -1) {
      this.getBookingData().splice(ind, 1);
      console.log('removed item..');
      this.renderElement();
    }
  }
  addNewEvent(roomCategory) {
    let keys = Object.keys(this.selectedRooms);
    let startDate, endDate;
    if (this.selectedRooms[keys[0]].currentDate < this.selectedRooms[keys[1]].currentDate) {
      startDate = new Date(this.selectedRooms[keys[0]].currentDate);
      endDate = new Date(this.selectedRooms[keys[1]].currentDate);
    }
    else {
      startDate = new Date(this.selectedRooms[keys[1]].currentDate);
      endDate = new Date(this.selectedRooms[keys[0]].currentDate);
    }
    this.newEvent = {
      ID: 'NEW_TEMP_EVENT',
      NAME: h("span", null, "\u00A0"),
      EMAIL: '',
      PHONE: '',
      convertBooking: false,
      REFERENCE_TYPE: 'PHONE',
      FROM_DATE: startDate.getFullYear() + '-' + this.getTwoDigitNumStr(startDate.getMonth() + 1) + '-' + this.getTwoDigitNumStr(startDate.getDate()),
      TO_DATE: endDate.getFullYear() + '-' + this.getTwoDigitNumStr(endDate.getMonth() + 1) + '-' + this.getTwoDigitNumStr(endDate.getDate()),
      BALANCE: '',
      NOTES: '',
      RELEASE_AFTER_HOURS: 0,
      PR_ID: this.selectedRooms[keys[0]].roomId,
      ENTRY_DATE: '',
      NO_OF_DAYS: (endDate - startDate) / 86400000,
      ADULTS_COUNT: 1,
      COUNTRY: '',
      INTERNAL_NOTE: '',
      RATE: '',
      TOTAL_PRICE: '',
      RATE_PLAN: '',
      ARRIVAL_TIME: '',
      TITLE: locales.entries.Lcz_NewBookingFor,
      roomsInfo: [roomCategory],
      CATEGORY: roomCategory.name,
      event_type: 'BAR_BOOKING',
      STATUS: 'TEMP-EVENT',
      defaultDateRange: {
        fromDate: null,
        fromDateStr: '',
        toDate: null,
        toDateStr: '',
        dateDifference: (endDate - startDate) / 86400000,
        editable: false,
        message: 'Including 5.00% City Tax - Excluding 11.00% VAT',
      },
    };
    let popupTitle = roomCategory.name + ' ' + this.getRoomName(this.getRoomById(this.getCategoryRooms(roomCategory), this.selectedRooms[keys[0]].roomId));
    this.newEvent.BLOCK_DATES_TITLE = locales.entries.Lcz_BlockDatesFor + popupTitle;
    this.newEvent.TITLE += popupTitle;
    this.newEvent.defaultDateRange.toDate = new Date(this.newEvent.TO_DATE + 'T00:00:00');
    this.newEvent.defaultDateRange.fromDate = new Date(this.newEvent.FROM_DATE + 'T00:00:00');
    this.newEvent.defaultDateRange.fromDateStr = this.getDateStr(this.newEvent.defaultDateRange.fromDate);
    this.newEvent.defaultDateRange.toDateStr = this.getDateStr(this.newEvent.defaultDateRange.toDate);
    this.newEvent.ENTRY_DATE = new Date().toISOString();
    this.newEvent.legendData = this.calendarData.formattedLegendData;
    let splitBookingEvents = this.getSplitBookingEvents(this.newEvent);
    if (splitBookingEvents) {
      this.newEvent.splitBookingEvents = splitBookingEvents;
    }
    this.getBookingData().push(this.newEvent);
    return this.newEvent;
  }
  getTwoDigitNumStr(num) {
    return num <= 9 ? '0' + num : num;
  }
  getDateStr(date, locale = 'default') {
    return date.getDate() + ' ' + date.toLocaleString(locale, { month: 'short' }) + ' ' + date.getFullYear();
  }
  removeNewEvent() {
    this.calendarData.bookingEvents = this.calendarData.bookingEvents.filter(events => events.ID !== 'NEW_TEMP_EVENT');
    this.newEvent = null;
  }
  clickCell(roomId, selectedDay, roomCategory) {
    if (!this.isScrollViewDragging && selectedDay.currentDate >= this.currentDate.getTime()) {
      let refKey = this.getSelectedCellRefName(roomId, selectedDay);
      if (this.selectedRooms.hasOwnProperty(refKey)) {
        this.removeNewEvent();
        delete this.selectedRooms[refKey];
        this.renderElement();
        return;
      }
      else if (Object.keys(this.selectedRooms).length != 1 || this.fromRoomId != roomId) {
        this.removeNewEvent();
        this.selectedRooms = {};
        this.selectedRooms[refKey] = Object.assign(Object.assign({}, selectedDay), { roomId });
        this.fromRoomId = roomId;
        this.renderElement();
      }
      else {
        // create bar;
        this.selectedRooms[refKey] = Object.assign(Object.assign({}, selectedDay), { roomId });
        this.addNewEvent(roomCategory);
        this.selectedRooms = {};
        this.renderElement();
        this.showNewBookingPopup(this.newEvent);
      }
    }
  }
  showNewBookingPopup(data) {
    console.log(data);
    // this.showBookingPopup.emit({key: "add", data});
  }
  renderElement() {
    this.renderAgain = !this.renderAgain;
  }
  getGeneralCategoryDayColumns(addClass, isCategory = false, index) {
    return calendar_dates.days.map(dayInfo => {
      return (h("div", { class: `cellData  font-weight-bold categoryPriceColumn ${addClass + '_' + dayInfo.day} ${dayInfo.day === this.today ? 'currentDay' : ''}` }, isCategory ? (h("span", { class: 'categoryName' }, dayInfo.rate[index].exposed_inventory.rts)) : ('')));
    });
  }
  getGeneralRoomDayColumns(roomId, roomCategory) {
    // onDragOver={event => this.handleDragOver(event)} onDrop={event => this.handleDrop(event, addClass+"_"+dayInfo.day)}
    return this.calendarData.days.map(dayInfo => (h("div", { class: `cellData ${'room_' + roomId + '_' + dayInfo.day} ${dayInfo.day === this.today ? 'currentDay' : ''} ${this.dragOverElement === roomId + '_' + dayInfo.day ? 'dragOverHighlight' : ''} ${this.selectedRooms.hasOwnProperty(this.getSelectedCellRefName(roomId, dayInfo)) ? 'selectedDay' : ''}`, onClick: () => this.clickCell(roomId, dayInfo, roomCategory) })));
  }
  toggleCategory(roomCategory) {
    roomCategory.expanded = !roomCategory.expanded;
    this.renderElement();
  }
  getRoomCategoryRow(roomCategory, index) {
    if (this.getTotalPhysicalRooms(roomCategory) <= 1) {
      return null;
    }
    return (h("div", { class: "roomRow" }, h("div", { class: `cellData text-left align-items-center roomHeaderCell categoryTitle ${'category_' + this.getCategoryId(roomCategory)}`, onClick: () => this.toggleCategory(roomCategory) }, h("div", { class: 'categoryName' }, this.getCategoryName(roomCategory)), roomCategory.expanded ? (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", height: 14, width: 14 }, h("path", { fill: "#6b6f82", d: "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" }))) : (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512", height: 14, width: 14 }, h("path", { fill: "#6b6f82", d: "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" })))), this.getGeneralCategoryDayColumns('category_' + this.getCategoryId(roomCategory), true, index)));
  }
  getRoomsByCategory(roomCategory) {
    var _a;
    // Check accordion is expanded.
    if (!roomCategory.expanded) {
      return [];
    }
    return (_a = this.getCategoryRooms(roomCategory)) === null || _a === void 0 ? void 0 : _a.map(room => (h("div", { class: "roomRow" }, h("div", { class: `cellData text-left align-items-center roomHeaderCell  roomTitle ${this.getTotalPhysicalRooms(roomCategory) <= 1 ? 'pl10' : ''} ${'room_' + this.getRoomId(room)}`, "data-room": this.getRoomId(room) }, h("div", null, this.getTotalPhysicalRooms(roomCategory) <= 1 ? this.getCategoryName(roomCategory) : this.getRoomName(room))), this.getGeneralRoomDayColumns(this.getRoomId(room), roomCategory))));
  }
  getRoomRows() {
    return this.calendarData.roomsInfo.map((roomCategory, index) => {
      if (roomCategory.is_active) {
        return [this.getRoomCategoryRow(roomCategory, index), this.getRoomsByCategory(roomCategory)];
      }
      else {
        return null;
      }
    });
  }
  render() {
    var _a;
    // onDragStart={event => this.handleDragStart(event)} draggable={true}
    return (h(Host, null, h("div", { class: "bodyContainer" }, this.getRoomRows(), h("div", { class: "bookingEventsContainer preventPageScroll" }, (_a = this.getBookingData()) === null || _a === void 0 ? void 0 : _a.map(bookingEvent => (h("igl-booking-event", { language: this.language, is_vacation_rental: this.calendarData.is_vacation_rental, countryNodeList: this.countryNodeList, currency: this.currency, "data-component-id": bookingEvent.ID, bookingEvent: bookingEvent, allBookingEvents: this.getBookingData() })))))));
  }
  static get is() { return "igl-cal-body"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-cal-body.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-cal-body.css"]
    };
  }
  static get properties() {
    return {
      "isScrollViewDragging": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "is-scroll-view-dragging",
        "reflect": false
      },
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
      "currency": {
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
        "attribute": "currency",
        "reflect": false
      },
      "language": {
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
        "attribute": "language",
        "reflect": false
      },
      "countryNodeList": {
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
        "attribute": "country-node-list",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "dragOverElement": {},
      "renderAgain": {}
    };
  }
  static get events() {
    return [{
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
        "method": "scrollPageToRoom",
        "name": "scrollPageToRoom",
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
        "method": "addBookingDatasEvent",
        "name": "addBookingDatasEvent",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any[]",
          "resolved": "any[]",
          "references": {}
        }
      }];
  }
  static get listeners() {
    return [{
        "name": "dragOverHighlightElement",
        "method": "dragOverHighlightElementHandler",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "gotoRoomEvent",
        "method": "gotoRoom",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "addToBeAssignedEvent",
        "method": "addToBeAssignedEvents",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "closeBookingWindow",
        "method": "closeWindow",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=igl-cal-body.js.map
