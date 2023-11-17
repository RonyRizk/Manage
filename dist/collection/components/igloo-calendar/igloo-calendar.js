import { Host, h } from "@stencil/core";
import { RoomService } from "../../services/room.service";
import { BookingService } from "../../services/booking.service";
import { computeEndDate, convertDMYToISO, dateToFormattedString, formatLegendColors } from "../../utils/utils";
import axios from "axios";
import { EventsService } from "../../services/events.service";
import moment from "moment";
import { ToBeAssignedService } from "../../services/toBeAssigned.service";
export class IglooCalendar {
  constructor() {
    this.bookingService = new BookingService();
    this.countryNodeList = [];
    this.visibleCalendarCells = { x: [], y: [] };
    this.today = '';
    this.roomService = new RoomService();
    this.eventsService = new EventsService();
    this.toBeAssignedService = new ToBeAssignedService();
    this.scrollViewDragPos = { top: 0, left: 0, x: 0, y: 0 };
    this.onScrollContentMoveHandler = (event) => {
      // How far the mouse has been moved
      const dx = event.clientX - this.scrollViewDragPos.x;
      const dy = event.clientY - this.scrollViewDragPos.y;
      // Scroll the element
      this.scrollContainer.scrollTop = this.scrollViewDragPos.top - dy;
      this.scrollContainer.scrollLeft = this.scrollViewDragPos.left - dx;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        this.scrollViewDragging = true;
      }
    };
    this.onScrollContentMoveEndHandler = () => {
      document.removeEventListener('mousemove', this.onScrollContentMoveHandler);
      document.removeEventListener('mouseup', this.onScrollContentMoveEndHandler);
    };
    this.propertyid = undefined;
    this.from_date = undefined;
    this.to_date = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.loadingMessage = undefined;
    this.currencyName = undefined;
    this.ticket = '';
    this.calendarData = new Object();
    this.days = new Array();
    this.scrollViewDragging = false;
    this.bookingItem = null;
    this.showLegend = false;
    this.showPaymentDetails = false;
    this.showToBeAssigned = false;
  }
  async ticketChanged() {
    sessionStorage.setItem('token', JSON.stringify(this.ticket));
    this.initializeApp();
  }
  async componentWillLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  initializeApp() {
    try {
      this.roomService.fetchData(this.propertyid, this.language).then(roomResp => {
        this.setRoomsData(roomResp);
        this.bookingService.getCalendarData(this.propertyid, this.from_date, this.to_date).then(async (bookingResp) => {
          this.countryNodeList = await this.bookingService.getCountries(this.language);
          this.calendarData.currency = roomResp['My_Result'].currency;
          this.calendarData.legendData = this.getLegendData(roomResp);
          this.calendarData.is_vacation_rental = roomResp['My_Result'].is_vacation_rental;
          if (!this.calendarData.is_vacation_rental) {
            this.calendarData.unassignedDates = await this.toBeAssignedService.getUnassignedDates(this.propertyid, dateToFormattedString(new Date()), this.to_date);
          }
          this.calendarData.startingDate = new Date(bookingResp.My_Params_Get_Rooming_Data.FROM).getTime();
          this.calendarData.endingDate = new Date(bookingResp.My_Params_Get_Rooming_Data.TO).getTime();
          this.calendarData.formattedLegendData = formatLegendColors(this.calendarData.legendData);
          this.calendarData.bookingEvents = bookingResp.myBookings || [];
          this.calendarData.toBeAssignedEvents = [];
          let paymentMethods = roomResp['My_Result']['allowed_payment_methods'];
          this.showPaymentDetails = paymentMethods.some(item => item.code === '001' || item.code === '004');
          this.updateBookingEventsDateRange(this.calendarData.bookingEvents);
          this.updateBookingEventsDateRange(this.calendarData.toBeAssignedEvents);
          this.today = this.transformDateForScroll(new Date());
          let startingDay = new Date(this.getStartingDateOfCalendar());
          startingDay.setHours(0, 0, 0, 0);
          this.days = bookingResp.days;
          this.calendarData.days = this.days;
          this.calendarData.monthsInfo = bookingResp.months;
          setTimeout(() => {
            this.scrollToElement(this.today);
          }, 200);
        });
      });
    }
    catch (error) { }
  }
  componentDidLoad() {
    this.scrollToElement(this.today);
  }
  async handledeleteEvent(ev) {
    try {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      const bookingEvent = [...this.calendarData.bookingEvents];
      await this.eventsService.deleteEvent(ev.detail);
      this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: bookingEvent.filter(e => e.POOL !== ev.detail) });
    }
    catch (error) {
      //toastr.error(error);
    }
  }
  updateBookingEventsDateRange(eventData) {
    eventData.forEach(bookingEvent => {
      bookingEvent.legendData = this.calendarData.formattedLegendData;
      bookingEvent.defaultDateRange = {};
      bookingEvent.defaultDateRange.fromDate = new Date(bookingEvent.FROM_DATE + 'T00:00:00');
      bookingEvent.defaultDateRange.fromDateStr = this.getDateStr(bookingEvent.defaultDateRange.fromDate);
      bookingEvent.defaultDateRange.fromDateTimeStamp = bookingEvent.defaultDateRange.fromDate.getTime();
      bookingEvent.defaultDateRange.toDate = new Date(bookingEvent.TO_DATE + 'T00:00:00');
      bookingEvent.defaultDateRange.toDateStr = this.getDateStr(bookingEvent.defaultDateRange.toDate);
      bookingEvent.defaultDateRange.toDateTimeStamp = bookingEvent.defaultDateRange.toDate.getTime();
      bookingEvent.defaultDateRange.dateDifference = bookingEvent.NO_OF_DAYS; // (bookingEvent.defaultDateRange.toDate.getTime() - bookingEvent.defaultDateRange.fromDate.getTime())/(86400000);
      bookingEvent.roomsInfo = [...this.calendarData.roomsInfo];
    });
  }
  setRoomsData(roomServiceResp) {
    var _a, _b;
    let roomsData = new Array();
    if ((_b = (_a = roomServiceResp.My_Result) === null || _a === void 0 ? void 0 : _a.roomtypes) === null || _b === void 0 ? void 0 : _b.length) {
      roomsData = roomServiceResp.My_Result.roomtypes;
      roomServiceResp.My_Result.roomtypes.forEach(roomCategory => {
        roomCategory.expanded = true;
      });
    }
    this.calendarData.roomsInfo = roomsData;
  }
  getLegendData(aData) {
    return aData['My_Result'].calendar_legends;
  }
  getStartingDateOfCalendar() {
    return this.calendarData.startingDate;
  }
  getEndingDateOfCalendar() {
    return this.calendarData.endingDate;
  }
  getDay(dt) {
    const currentDate = new Date(dt);
    const locale = 'en-US';
    const dayOfWeek = this.getLocalizedDayOfWeek(currentDate, locale);
    return dayOfWeek + ' ' + currentDate.getDate();
  }
  getLocalizedDayOfWeek(date, locale) {
    const options = { weekday: 'short' };
    return date.toLocaleDateString(locale, options);
  }
  getLocalizedMonth(date, locale = 'default') {
    return date.toLocaleString(locale, { month: 'short' }) + ' ' + date.getFullYear();
  }
  getDateStr(date, locale = 'default') {
    return date.getDate() + ' ' + date.toLocaleString(locale, { month: 'short' }) + ' ' + date.getFullYear();
  }
  scrollToElement(goToDate) {
    console.log(goToDate);
    this.scrollContainer = this.scrollContainer || this.element.querySelector('.calendarScrollContainer');
    const topLeftCell = this.element.querySelector('.topLeftCell');
    const gotoDay = this.element.querySelector('.day-' + goToDate);
    if (gotoDay) {
      this.scrollContainer.scrollTo({ left: 0 });
      const gotoRect = gotoDay.getBoundingClientRect();
      const containerRect = this.scrollContainer.getBoundingClientRect();
      const topLeftCellRect = topLeftCell.getBoundingClientRect();
      this.scrollContainer.scrollTo({
        left: gotoRect.left - containerRect.left - topLeftCellRect.width - gotoRect.width,
      });
    }
  }
  onBookingCreation(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    this.updateBookingEventsDateRange(event.detail);
    this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: [...this.calendarData.bookingEvents, ...event.detail] });
    setTimeout(() => {
      this.scrollToElement(this.transformDateForScroll(new Date(event.detail[0].FROM_DATE)));
    }, 200);
  }
  onBlockCreation(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    this.updateBookingEventsDateRange([event.detail]);
    this.calendarData = Object.assign(Object.assign({}, this.calendarData), { bookingEvents: [...this.calendarData.bookingEvents, event.detail] });
    // setTimeout(() => {
    //   this.scrollToElement(this.transformDateForScroll(new Date(event.detail.FROM_DATE)));
    // }, 200);
  }
  transformDateForScroll(date) {
    return moment(date).format('D_M_YYYY');
  }
  scrollPageToRoom(event) {
    let targetScrollClass = event.detail.refClass;
    this.scrollContainer = this.scrollContainer || this.element.querySelector('.calendarScrollContainer');
    const topLeftCell = this.element.querySelector('.topLeftCell');
    const gotoRoom = this.element.querySelector('.' + targetScrollClass);
    if (gotoRoom) {
      this.scrollContainer.scrollTo({ top: 0 });
      const gotoRect = gotoRoom.getBoundingClientRect();
      const containerRect = this.scrollContainer.getBoundingClientRect();
      const topLeftCellRect = topLeftCell.getBoundingClientRect();
      this.scrollContainer.scrollTo({
        top: gotoRect.top - containerRect.top - topLeftCellRect.height - gotoRect.height,
      });
    }
  }
  shouldRenderCalendarView() {
    // console.log("rendering...")
    return this.calendarData && this.calendarData.days && this.calendarData.days.length;
  }
  onOptionSelect(event) {
    const opt = event.detail;
    const calendarElement = this.element.querySelector('#iglooCalendar');
    switch (opt.key) {
      case 'showAssigned':
        calendarElement.classList.remove('showLegend');
        calendarElement.classList.remove('showToBeAssigned');
        calendarElement.classList.toggle('showToBeAssigned');
        this.showLegend = false;
        this.showToBeAssigned = true;
        break;
      case 'showLegend':
        calendarElement.classList.remove('showToBeAssigned');
        calendarElement.classList.remove('showLegend');
        calendarElement.classList.toggle('showLegend');
        this.showLegend = true;
        this.showToBeAssigned = false;
        break;
      case 'calendar':
        let dt = new Date(opt.data);
        this.scrollToElement(dt.getDate() + '_' + (dt.getMonth() + 1) + '_' + dt.getFullYear());
        break;
      case 'search':
        break;
      case 'add':
        this.bookingItem = opt.data;
        break;
      case 'gotoToday':
        this.scrollToElement(this.today);
        break;
      case 'closeSideMenu':
        this.closeSideMenu();
        break;
    }
  }
  closeSideMenu() {
    const calendarElement = this.element.querySelector('#iglooCalendar');
    calendarElement.classList.remove('showToBeAssigned');
    calendarElement.classList.remove('showLegend');
    this.showLegend = false;
    this.showToBeAssigned = false;
  }
  dragScrollContent(event) {
    this.scrollViewDragging = false;
    let isPreventPageScroll = event && event.target ? this.hasAncestorWithClass(event.target, 'preventPageScroll') : false;
    if (!isPreventPageScroll) {
      this.scrollViewDragPos = {
        // The current scroll
        left: this.scrollContainer.scrollLeft,
        top: this.scrollContainer.scrollTop,
        // Get the current mouse position
        x: event.clientX,
        y: event.clientY,
      };
      document.addEventListener('mousemove', this.onScrollContentMoveHandler);
      document.addEventListener('mouseup', this.onScrollContentMoveEndHandler);
    }
  }
  calendarScrolling() {
    const containerRect = this.scrollContainer.getBoundingClientRect();
    let leftSideMenuSize = 170;
    let maxWidth = containerRect.width - leftSideMenuSize;
    let leftX = containerRect.x + leftSideMenuSize;
    let rightX = containerRect.x + containerRect.width;
    let cells = Array.from(this.element.querySelectorAll('.monthCell'));
    if (cells.length) {
      cells.map((monthContainer) => {
        let monthRect = monthContainer.getBoundingClientRect();
        if (monthRect.x + monthRect.width < leftX) {
          // item end is scrolled outside view, in -x
        }
        else if (monthRect.x > rightX) {
          // item is outside scrollview, in +x
        }
        else {
          let titleElement = monthContainer.querySelector('.monthTitle');
          let marginLeft = 0;
          let monthWidth = monthRect.width;
          if (monthRect.x < leftX) {
            marginLeft = Math.abs(monthRect.x) - leftX;
            marginLeft = monthRect.x < 0 ? Math.abs(monthRect.x) + leftX : Math.abs(marginLeft);
            monthWidth = monthRect.x + monthRect.width > rightX ? maxWidth : monthRect.x + monthRect.width - leftX;
          }
          else {
            monthWidth = maxWidth - monthWidth > monthWidth ? monthWidth : maxWidth - monthRect.x + leftX;
          }
          titleElement.style.marginLeft = marginLeft + 'px';
          titleElement.style.width = monthWidth + 'px';
        }
      });
    }
  }
  hasAncestorWithClass(element, className) {
    let currentElement = element;
    while (currentElement !== null) {
      if (currentElement.matches(`.${className}`)) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }
  showBookingPopupEventDataHandler(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.onOptionSelect(event);
    //console.log("show booking event", event);
  }
  updateEventDataHandler(event) {
    let bookedData = this.calendarData.bookingEvents.find(bookedEvent => bookedEvent.id === event.detail.id);
    if (bookedData && event.detail && event.detail.data) {
      Object.entries(event.detail.data).forEach(([key, value]) => {
        bookedData[key] = value;
      });
    }
  }
  dragOverEventDataHandler(event) {
    if (event.detail.id === 'CALCULATE_DRAG_OVER_BOUNDS') {
      let topLeftCell = document.querySelector('igl-cal-header .topLeftCell');
      let containerDays = document.querySelectorAll('.headersContainer .headerCell');
      let containerRooms = document.querySelectorAll('.bodyContainer .roomRow .roomTitle');
      this.visibleCalendarCells = { x: [], y: [] };
      containerDays.forEach(element => {
        const htmlElement = element;
        this.visibleCalendarCells.x.push({
          left: htmlElement.offsetLeft + topLeftCell.offsetWidth,
          width: htmlElement.offsetWidth,
          id: htmlElement.getAttribute('data-day'),
        });
      });
      containerRooms.forEach(element => {
        const htmlElement = element;
        this.visibleCalendarCells.y.push({
          top: htmlElement.offsetTop,
          height: htmlElement.offsetHeight,
          id: htmlElement.getAttribute('data-room'),
        });
      });
      this.highlightDragOver(true, event.detail.data);
    }
    else if (event.detail.id === 'DRAG_OVER') {
      this.highlightDragOver(true, event.detail.data);
    }
    else if (event.detail.id === 'DRAG_OVER_END') {
      this.highlightDragOver(false, event.detail.data);
    }
    else if (event.detail.id === 'STRETCH_OVER_END') {
      this.highlightDragOver(false, event.detail.data);
    }
  }
  async highlightDragOver(hightLightElement, currentPosition) {
    let xElement, yElement;
    if (currentPosition) {
      xElement = this.visibleCalendarCells.x.find(pos => pos.left < currentPosition.x && currentPosition.x <= pos.left + pos.width);
      yElement = this.visibleCalendarCells.y.find(pos => pos.top < currentPosition.y && currentPosition.y <= pos.top + pos.height);
    }
    // console.log(hightLightElement+":::"+yElement.id+"_"+xElement.id);
    if (hightLightElement && xElement && yElement) {
      this.dragOverHighlightElement.emit({
        dragOverElement: yElement.id + '_' + xElement.id,
      });
    }
    else {
      this.dragOverHighlightElement.emit({ dragOverElement: '' });
    }
    if (!hightLightElement) {
      this.moveBookingTo.emit({
        bookingId: currentPosition.id,
        fromRoomId: currentPosition.fromRoomId,
        toRoomId: (yElement && yElement.id) || 'revert',
        moveToDay: (xElement && xElement.id) || 'revert',
        pool: currentPosition.pool,
        from_date: convertDMYToISO(xElement && xElement.id),
        to_date: computeEndDate(xElement && xElement.id, currentPosition.nbOfDays),
      });
    }
  }
  render() {
    return (h(Host, null, h("ir-interceptor", null), h("ir-common", null), h("div", { id: "iglooCalendar", class: "igl-calendar" }, this.shouldRenderCalendarView() ? ([
      this.showToBeAssigned ? (h("igl-to-be-assigned", { loadingMessage: 'Fetching unassigned units', to_date: this.to_date, from_date: this.from_date, propertyid: this.propertyid, class: "tobeAssignedContainer", calendarData: this.calendarData, onOptionEvent: evt => this.onOptionSelect(evt) })) : null,
      this.showLegend ? (h("igl-legends", { class: "legendContainer", legendData: this.calendarData.legendData, onOptionEvent: evt => this.onOptionSelect(evt) })) : null,
      h("div", { class: "calendarScrollContainer", onMouseDown: event => this.dragScrollContent(event), onScroll: () => this.calendarScrolling() }, h("div", { id: "calendarContainer" }, h("igl-cal-header", { to_date: this.to_date, propertyid: this.propertyid, today: this.today, calendarData: this.calendarData, onOptionEvent: evt => this.onOptionSelect(evt) }), h("igl-cal-body", { countryNodeList: this.countryNodeList, currency: this.calendarData.currency, today: this.today, isScrollViewDragging: this.scrollViewDragging, calendarData: this.calendarData }), h("igl-cal-footer", { today: this.today, calendarData: this.calendarData, onOptionEvent: evt => this.onOptionSelect(evt) }))),
    ]) : (h("ir-loading-screen", { message: "Preparing Calendar Data" })), this.bookingItem && (h("igl-book-property", { showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onCloseBookingWindow: _ => (this.bookingItem = null) })))));
  }
  static get is() { return "igloo-calendar"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igloo-calendar.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igloo-calendar.css"]
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
      "baseurl": {
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
        "attribute": "baseurl",
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
        "reflect": false
      },
      "currencyName": {
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
        "attribute": "currency-name",
        "reflect": false
      },
      "ticket": {
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
        "attribute": "ticket",
        "reflect": true,
        "defaultValue": "''"
      }
    };
  }
  static get states() {
    return {
      "calendarData": {},
      "days": {},
      "scrollViewDragging": {},
      "bookingItem": {},
      "showLegend": {},
      "showPaymentDetails": {},
      "showToBeAssigned": {}
    };
  }
  static get events() {
    return [{
        "method": "dragOverHighlightElement",
        "name": "dragOverHighlightElement",
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
        "method": "moveBookingTo",
        "name": "moveBookingTo",
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
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "ticket",
        "methodName": "ticketChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "deleteButton",
        "method": "handledeleteEvent",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "bookingCreated",
        "method": "onBookingCreation",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "blockedCreated",
        "method": "onBlockCreation",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "scrollPageToRoom",
        "method": "scrollPageToRoom",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "showBookingPopup",
        "method": "showBookingPopupEventDataHandler",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "updateEventData",
        "method": "updateEventDataHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "dragOverEventData",
        "method": "dragOverEventDataHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=igloo-calendar.js.map
