'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const toBeAssigned_service = require('./toBeAssigned.service-553da14e.js');
const locales_store = require('./locales.store-0567c122.js');
const calendarData = require('./calendar-data-d3bf3294.js');
const v4 = require('./v4-d89fec7e.js');
require('./Token-7fd57fe8.js');
require('./utils-6a5b3cb5.js');
require('./moment-f96595e5.js');

const iglTbaBookingViewCss = ".sc-igl-tba-booking-view-h{display:block}.guestTitle.sc-igl-tba-booking-view{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:2px;margin-bottom:5px;margin-top:5px;padding-left:5px;padding-right:5px}.guestTitle.selectedOrder.sc-igl-tba-booking-view{background-color:#f9f9c9}.pointer.sc-igl-tba-booking-view{cursor:pointer}hr.sc-igl-tba-booking-view{margin-top:8px;margin-bottom:0px}.bookingContainer.sc-igl-tba-booking-view{background-color:#ececec}.actionsContainer.sc-igl-tba-booking-view{padding:5px !important;padding-right:0px !important}.selectContainer.sc-igl-tba-booking-view{width:195px;margin-right:8px}.buttonsContainer.sc-igl-tba-booking-view{width:100px}.btn-secondary.sc-igl-tba-booking-view{margin-right:8px !important}";

const IglTbaBookingView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.highlightToBeAssignedBookingEvent = index.createEvent(this, "highlightToBeAssignedBookingEvent", 7);
    this.addToBeAssignedEvent = index.createEvent(this, "addToBeAssignedEvent", 7);
    this.scrollPageToRoom = index.createEvent(this, "scrollPageToRoom", 7);
    this.assignRoomEvent = index.createEvent(this, "assignRoomEvent", 7);
    this.highlightSection = false;
    this.allRoomsList = [];
    this.toBeAssignedService = new toBeAssigned_service.ToBeAssignedService();
    this.calendarData = undefined;
    this.selectedDate = undefined;
    this.eventData = {};
    this.categoriesData = {};
    this.categoryId = undefined;
    this.categoryIndex = undefined;
    this.eventIndex = undefined;
    this.renderAgain = false;
    this.selectedRoom = -1;
  }
  onSelectRoom(evt) {
    if (evt.stopImmediatePropagation) {
      evt.stopImmediatePropagation();
      evt.stopPropagation();
    }
    this.selectedRoom = parseInt(evt.target.value);
  }
  // componentDidLoad(){
  //   this.initializeToolTips();
  // }
  componentShouldUpdate(newValue, oldValue, propName) {
    if (propName === 'selectedDate' && newValue !== oldValue) {
      this.highlightSection = false;
      this.selectedRoom = -1;
      return true; // Prevent update for a specific prop value
    }
    else if (propName === 'eventData' && newValue !== oldValue) {
      this.selectedRoom = -1;
      return true;
    }
    return true;
  }
  componentWillLoad() {
    this.toBeAssignedService.setToken(calendarData.calendar_data.token);
    if (this.categoryIndex === 0 && this.eventIndex === 0) {
      setTimeout(() => {
        this.handleHighlightAvailability();
      }, 100);
    }
  }
  async handleAssignUnit(event) {
    try {
      event.stopImmediatePropagation();
      event.stopPropagation();
      if (this.selectedRoom) {
        await this.toBeAssignedService.assignUnit(this.eventData.BOOKING_NUMBER, this.eventData.ID, this.selectedRoom);
        // //let assignEvent = transformNewBooking(result);
        // const newEvent = { ...this.eventData, ID: this.eventData.ID };
        // //this.calendarData.bookingEvents.push(newEvent);
        // //console.log(newEvent);
        // this.addToBeAssignedEvent.emit({
        //   key: 'tobeAssignedEvents',
        //   //data: [assignEvent[0]],
        // });
        //this.assignRoomEvent.emit({ key: 'assignRoom', data: newEvent });
        let assignEvent = Object.assign(Object.assign({}, this.eventData), { PR_ID: this.selectedRoom });
        this.addToBeAssignedEvent.emit({
          key: 'tobeAssignedEvents',
          data: [assignEvent],
        });
        this.assignRoomEvent.emit({ key: 'assignRoom', data: assignEvent });
      }
    }
    catch (error) {
      //   toastr.error(error);
    }
  }
  handleHighlightAvailability() {
    this.highlightToBeAssignedBookingEvent.emit({
      key: 'highlightBookingId',
      data: { bookingId: this.eventData.ID },
    });
    if (!this.selectedDate) {
      return;
    }
    let filteredEvents = [];
    let allRoomsList = [];
    filteredEvents = this.eventData.availableRooms.map(room => {
      allRoomsList.push({
        calendar_cell: null,
        id: room.PR_ID,
        name: room.roomName,
      });
      return Object.assign(Object.assign({}, room), { defaultDateRange: this.eventData.defaultDateRange, identifier: this.eventData.identifier });
    });
    this.allRoomsList = allRoomsList;
    this.addToBeAssignedEvent.emit({
      key: 'tobeAssignedEvents',
      data: filteredEvents,
    });
    this.scrollPageToRoom.emit({
      key: 'scrollPageToRoom',
      id: this.categoryId,
      refClass: 'category_' + this.categoryId,
    });
    // ID: "NEW_TEMP_EVENT",
    // STATUS: "PENDING_CONFIRMATION"
    this.renderView();
  }
  handleCloseAssignment(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.highlightSection = false;
    this.highlightToBeAssignedBookingEvent.emit({
      key: 'highlightBookingId',
      data: { bookingId: '----' },
    });
    this.onSelectRoom({ target: { value: '' } });
    this.addToBeAssignedEvent.emit({ key: 'tobeAssignedEvents', data: [] });
    this.renderView();
  }
  highlightBookingEvent(event) {
    let data = event.detail.data;
    if (data.bookingId != this.eventData.ID) {
      this.highlightSection = false;
      this.selectedRoom = -1;
      this.renderView();
    }
    else {
      this.highlightSection = true;
      this.renderView();
    }
  }
  renderView() {
    this.renderAgain = !this.renderAgain;
    // this.initializeToolTips();
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "bookingContainer", onClick: () => this.handleHighlightAvailability() }, index.h("div", { class: `guestTitle ${this.highlightSection ? 'selectedOrder' : ''} pointer font-small-3`, "data-toggle": "tooltip", "data-placement": "top", "data-original-title": "Click to assign unit" }, `Book# ${this.eventData.BOOKING_NUMBER} - ${this.eventData.NAME}`), index.h("div", { class: "row m-0 p-0 actionsContainer" }, index.h("div", { class: "d-inline-block p-0 selectContainer" }, index.h("select", { class: "form-control input-sm", id: v4.v4(), onChange: evt => this.onSelectRoom(evt) }, index.h("option", { value: "", selected: this.selectedRoom == -1 }, locales_store.locales.entries.Lcz_AssignUnit), this.allRoomsList.map(room => (index.h("option", { value: room.id, selected: this.selectedRoom == room.id }, room.name))))), this.highlightSection ? (index.h("div", { class: "d-inline-block text-right buttonsContainer" }, index.h("button", { type: "button", class: "btn btn-secondary btn-sm", onClick: evt => this.handleCloseAssignment(evt) }, "X"), index.h("button", { type: "button", class: "btn btn-primary btn-sm", onClick: evt => this.handleAssignUnit(evt), disabled: this.selectedRoom === -1 }, locales_store.locales.entries.Lcz_Assign))) : null), index.h("hr", null))));
  }
};
IglTbaBookingView.style = iglTbaBookingViewCss;

const iglTbaCategoryViewCss = ".sc-igl-tba-category-view-h{display:block}";

const IglTbaCategoryView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.assignUnitEvent = index.createEvent(this, "assignUnitEvent", 7);
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
    return eventDatas.map((eventData, ind) => (index.h("igl-tba-booking-view", { calendarData: this.calendarData, selectedDate: this.selectedDate, eventData: eventData, categoriesData: this.categoriesData, categoryId: categoryId, categoryIndex: this.categoryIndex, eventIndex: ind, onAssignRoomEvent: (evt) => this.handleAssignRoomEvent(evt) })));
  }
  renderView() {
    this.renderAgain = !this.renderAgain;
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "sectionContainer" }, index.h("div", { class: "font-weight-bold mt-1 font-small-3" }, this.categoriesData[this.categoryId].name), this.getEventView(this.categoryId, this.eventDatas))));
  }
};
IglTbaCategoryView.style = iglTbaCategoryViewCss;

exports.igl_tba_booking_view = IglTbaBookingView;
exports.igl_tba_category_view = IglTbaCategoryView;

//# sourceMappingURL=igl-tba-booking-view_2.cjs.entry.js.map