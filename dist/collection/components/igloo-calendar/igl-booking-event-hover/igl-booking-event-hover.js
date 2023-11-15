import { Host, h } from "@stencil/core";
import { findCountry, getCurrencySymbol } from "../../../utils/utils";
import { EventsService } from "../../../services/events.service";
export class IglBookingEventHover {
  constructor() {
    this.todayTimeStamp = new Date().setHours(0, 0, 0, 0);
    this.eventService = new EventsService();
    this.bookingEvent = undefined;
    this.bubbleInfoTop = false;
    this.currency = undefined;
    this.countryNodeList = undefined;
    this.is_vacation_rental = false;
    this.isLoading = undefined;
  }
  getBookingId() {
    return this.bookingEvent.ID;
  }
  getTotalOccupants() {
    return this.bookingEvent.ADULTS_COUNT;
  }
  getPhoneNumber() {
    return this.bookingEvent.PHONE;
  }
  getCountry() {
    return findCountry(this.bookingEvent.COUNTRY, this.countryNodeList).name;
  }
  getPhoneCode() {
    return findCountry(this.bookingEvent.COUNTRY, this.countryNodeList).phone_prefix;
  }
  renderPhone() {
    return this.bookingEvent.COUNTRY ? `${this.getPhoneCode()}-${this.getPhoneNumber()} - ${this.getCountry()}` : this.getPhoneNumber();
  }
  getGuestNote() {
    return this.bookingEvent.NOTES;
  }
  getInternalNote() {
    return this.bookingEvent.INTERNAL_NOTE;
  }
  getTotalPrice() {
    return this.bookingEvent.TOTAL_PRICE;
  }
  getCheckInDate() {
    return this.bookingEvent.FROM_DATE_STR;
  }
  getCheckOutDate() {
    return this.bookingEvent.TO_DATE_STR;
  }
  getArrivalTime() {
    return this.bookingEvent.ARRIVAL_TIME;
  }
  getRatePlan() {
    return this.bookingEvent.RATE_PLAN;
  }
  getEntryDate() {
    return this.bookingEvent.ENTRY_DATE;
  }
  getReleaseAfterHours() {
    return this.bookingEvent.RELEASE_AFTER_HOURS;
  }
  isNewBooking() {
    return this.getBookingId() === 'NEW_TEMP_EVENT';
  }
  isCheckedIn() {
    return this.bookingEvent.STATUS === 'CHECKED-IN';
  }
  isCheckedOut() {
    return this.bookingEvent.STATUS === 'CHECKED-OUT';
  }
  isBlockedDateEvent() {
    return this.bookingEvent.STATUS === 'BLOCKED' || this.bookingEvent.STATUS === 'BLOCKED-WITH-DATES';
  }
  getRoomId() {
    return this.bookingEvent.PR_ID;
  }
  getCategoryByRoomId(roomId) {
    // console.log("room id ",roomId)
    // console.log("booking event",this.bookingEvent)
    return this.bookingEvent.roomsInfo.find(roomCategory => roomCategory.physicalrooms.find(room => room.id === roomId));
  }
  hasSplitBooking() {
    return this.bookingEvent.hasOwnProperty('splitBookingEvents') && this.bookingEvent.splitBookingEvents.length;
  }
  canCheckIn() {
    if (!this.fromTimeStamp) {
      let dt = new Date(this.getCheckInDate());
      dt.setHours(0, 0, 0, 0);
      this.fromTimeStamp = dt.getTime();
    }
    if (!this.toTimeStamp) {
      let dt = new Date(this.getCheckOutDate());
      dt.setHours(0, 0, 0, 0);
      this.toTimeStamp = dt.getTime();
    }
    if (this.isCheckedIn() || this.isCheckedOut()) {
      return false;
    }
    if (this.fromTimeStamp <= this.todayTimeStamp && this.todayTimeStamp <= this.toTimeStamp) {
      return true;
    }
    else {
      return false;
    }
  }
  canCheckOut() {
    if (this.isCheckedIn() && this.todayTimeStamp <= this.toTimeStamp) {
      return true;
    }
    else {
      return false;
    }
  }
  handleBlockDateUpdate(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const opt = event.detail;
    this.bookingEvent = Object.assign(Object.assign({}, this.bookingEvent), opt.data);
    //console.log("blocked date booking event", this.bookingEvent);
  }
  handleEditBooking() {
    // console.log("Edit booking");
    this.bookingEvent.TITLE = 'Edit Room';
    this.handleBookingOption('EDIT_BOOKING');
  }
  getStringDateFormat(dt) {
    return dt.getFullYear() + '-' + (dt.getMonth() < 9 ? '0' : '') + (dt.getMonth() + 1) + '-' + (dt.getDate() <= 9 ? '0' : '') + dt.getDate();
  }
  handleAddRoom() {
    let fromDate = new Date();
    fromDate.setHours(0, 0, 0, 0);
    let from_date_str = this.getStringDateFormat(fromDate);
    let toDate = new Date();
    toDate.setDate(toDate.getDate() + 1);
    toDate.setHours(0, 0, 0, 0);
    let to_date_str = this.getStringDateFormat(toDate);
    let eventData = {
      ID: '',
      NAME: '',
      FROM_DATE: from_date_str,
      TO_DATE: to_date_str,
      roomsInfo: this.bookingEvent.roomsInfo,
      ADD_ROOM_TO_BOOKING: this.bookingEvent.ID,
      TITLE: 'Add Room to #' + this.bookingEvent.ID + ' - ' + this.bookingEvent.NAME,
      event_type: 'ADD_ROOM',
      defaultDateRange: {
        fromDate: fromDate,
        fromDateStr: '',
        toDate: toDate,
        toDateStr: '',
        dateDifference: 0,
        editabled: true,
        message: 'Including 5.00% City Tax - Excluding 11.00% VAT',
      },
    };
    this.handleBookingOption('ADD_ROOM', eventData);
  }
  handleCustomerCheckIn() {
    console.log('Handle Customer Check In');
  }
  handleCustomerCheckOut() {
    console.log('Handle Customer Check Out');
  }
  handleDeleteEvent() {
    this.deleteButton.emit(this.bookingEvent.POOL);
    console.log('Delete Event');
  }
  async handleUpdateBlockedDates() {
    try {
      this.isLoading = 'update';
      await this.eventService.updateBlockedEvent(this.bookingEvent);
      this.hideBubbleInfo.emit({
        key: 'hidebubble',
        currentInfoBubbleId: this.getBookingId(),
      });
      this.isLoading = '';
      console.log('Updated blocked dates');
    }
    catch (error) {
      //   toastr.error(error);
    }
  }
  handleConvertBlockedDateToBooking() {
    this.handleBookingOption('BAR_BOOKING');
  }
  getRoomInfo() {
    const roomIdToFind = +this.bookingEvent.PR_ID;
    let selectedRoom = {};
    for (const room of this.bookingEvent.roomsInfo) {
      for (const physicalRoom of room.physicalrooms) {
        if (roomIdToFind === physicalRoom.id) {
          selectedRoom.CATEGORY = room.name;
          selectedRoom.ROOM_NAME = physicalRoom.name;
          selectedRoom.ROOMS_INFO = room;
          return selectedRoom;
        }
      }
    }
    return selectedRoom;
  }
  handleBookingOption(eventType, roomData = null) {
    const roomInfo = this.getRoomInfo();
    let data = roomData ? roomData : this.bookingEvent;
    data.event_type = eventType;
    if (['003', '002', '004'].includes(this.bookingEvent.STATUS_CODE)) {
      data.roomsInfo = [roomInfo.ROOMS_INFO];
    }
    this.showBookingPopup.emit({
      key: 'add',
      data: Object.assign(Object.assign({}, data), { TITLE: `New Booking for ${roomInfo.CATEGORY} ${roomInfo.ROOM_NAME}` }),
    });
    this.hideBubbleInfo.emit({
      key: 'hidebubble',
      currentInfoBubbleId: this.getBookingId(),
    });
  }
  getInfoElement() {
    return (h("div", { class: `iglPopOver infoBubble ${this.bubbleInfoTop ? 'bubbleInfoAbove' : ''} text-left` }, h("div", { class: "row p-0 m-0 pb-1" }, h("div", { class: "pl-0 col-8 font-weight-bold font-medium-1 d-flex align-items-center" }, h("img", { src: this.bookingEvent.origin.Icon, alt: "icon", class: 'icon-image' }), h("p", { class: 'p-0 m-0' }, !this.bookingEvent.is_direct ? this.bookingEvent.channel_booking_nbr : this.bookingEvent.BOOKING_NUMBER)), h("div", { class: "pr-0 col-4 text-right" }, getCurrencySymbol(this.currency.code), this.getTotalPrice())), h("div", { class: "row p-0 m-0" }, h("div", { class: "pl-0 pr-0 col-12" }, h("span", { class: "font-weight-bold" }, "In: "), this.getCheckInDate(), " - ", h("span", { class: "font-weight-bold" }, "Out: "), this.getCheckOutDate())), this.getArrivalTime() && (h("div", { class: "row p-0 m-0" }, h("div", { class: "pl-0 pr-0 col-12" }, h("span", { class: "font-weight-bold" }, "Arrival time: "), this.getArrivalTime()))), this.getTotalOccupants() && (h("div", { class: "row p-0 m-0" }, h("div", { class: "pl-0 pr-0 col-12" }, h("span", { class: "font-weight-bold" }, "Occupancy: "), this.getTotalOccupants()))), this.getPhoneNumber() && (h("div", { class: "row p-0 m-0" }, h("div", { class: "pl-0 pr-0 col-12 text-wrap" }, h("span", { class: "font-weight-bold" }, "Phone: "), this.renderPhone()))), this.getRatePlan() && (h("div", { class: "row p-0 m-0" }, h("div", { class: "pl-0 pr-0 col-12" }, h("span", { class: "font-weight-bold" }, "Rate plan: "), this.getRatePlan()))), this.getGuestNote() ? (h("div", { class: "row p-0 m-0" }, h("div", { class: "col-12 pl-0 pr-0 text-wrap" }, h("sapn", { class: "font-weight-bold" }, "Note: "), this.getGuestNote()))) : null, this.getInternalNote() ? (h("div", { class: "row p-0 m-0" }, h("div", { class: "col-12 pl-0 pr-0 text-wrap" }, h("span", { class: "font-weight-bold" }, "Internal remark: "), this.getInternalNote()))) : null, h("div", { class: "row p-0 m-0 mt-2" }, h("div", { class: "full-width btn-group btn-group-sm font-small-3", role: "group" }, h("button", { type: "button", class: "btn btn-primary mr-1", onClick: _ => {
        this.handleEditBooking();
      }, disabled: !this.bookingEvent.IS_EDITABLE }, h("i", { class: "ft ft-edit font-small-3" }), " Edit"), h("button", { type: "button", class: "btn btn-primary mr-1", onClick: _ => {
        this.handleAddRoom();
      }, disabled: !this.bookingEvent.IS_EDITABLE }, h("i", { class: "ft ft-plus-circle font-small-3" }), " Add room"), this.canCheckIn() ? (h("button", { type: "button", class: "btn btn-primary p-0 mr-1", onClick: _ => {
        this.handleCustomerCheckIn();
      }, disabled: !this.bookingEvent.IS_EDITABLE }, h("i", { class: "ft ft-edit font-small-3" }), " Check-in")) : null, this.canCheckOut() ? (h("button", { type: "button", class: "btn btn-primary p-0 mr-1", onClick: _ => {
        this.handleCustomerCheckOut();
      }, disabled: !this.bookingEvent.IS_EDITABLE }, h("i", { class: "ft ft-log-out font-small-3" }), " Check-out")) : null, h("button", { type: "button", class: "btn btn-danger p-0", onClick: _ => {
        this.handleDeleteEvent();
      }, disabled: !this.bookingEvent.IS_EDITABLE || this.is_vacation_rental }, h("i", { class: "ft ft-trash-2 font-small-3" }), " Delete")))));
  }
  getNewBookingOptions() {
    return (h("div", { class: `iglPopOver newBookingOptions ${this.bubbleInfoTop ? 'bubbleInfoAbove' : ''} text-left` }, h("button", { type: "button", class: "d-block full-width btn btn-sm btn-primary mb-1 font-small-3 square", onClick: _ => {
        this.handleBookingOption('BAR_BOOKING');
      } }, "Create new booking"), this.hasSplitBooking() ? (h("button", { type: "button", class: "d-block full-width btn btn-sm btn-primary mb-1 font-small-3 square", onClick: _ => {
        this.handleBookingOption('SPLIT_BOOKING');
      } }, "Assign unit to existing booking")) : null, h("button", { type: "button", class: "d-block full-width btn btn-sm btn-primary font-small-3 square", onClick: _ => {
        this.handleBookingOption('BLOCK_DATES');
      } }, "Block dates")));
  }
  getBlockedView() {
    // let defaultData = {RELEASE_AFTER_HOURS: 0, OPTIONAL_REASON: "", OUT_OF_SERVICE: false};
    return (h("div", { class: `iglPopOver blockedView ${this.bubbleInfoTop ? 'bubbleInfoAbove' : ''} text-left` }, h("igl-block-dates-view", { entryHour: this.bookingEvent.ENTRY_HOUR, entryMinute: this.bookingEvent.ENTRY_MINUTE, defaultData: this.bookingEvent, fromDate: this.getCheckInDate(), toDate: this.getCheckOutDate(), entryDate: this.getEntryDate(), onDataUpdateEvent: event => this.handleBlockDateUpdate(event) }), h("div", { class: "row p-0 m-0 mt-2" }, h("div", { class: "full-width btn-group btn-group-sm font-small-3", role: "group" }, h("button", { disabled: this.isLoading === 'update', type: "button", class: "btn btn-primary mr-1", onClick: _ => {
        this.handleUpdateBlockedDates();
      } }, this.isLoading === 'update' ? h("i", { class: "la la-circle-o-notch spinner mx-1" }) : h("i", { class: "ft ft-edit font-small-3 updateBtnIcon" }), "Update"), h("button", { type: "button", class: "btn btn-primary", onClick: _ => {
        this.handleConvertBlockedDateToBooking();
      } }, "Convert to booking"), h("button", { type: "button", class: "btn btn-danger ml-1", onClick: _ => {
        this.handleDeleteEvent();
      } }, h("i", { class: "ft ft-trash-2 font-small-3" }), " Delete")))));
  }
  render() {
    return (h(Host, null, h("div", { class: `pointerContainer ${this.bubbleInfoTop ? 'pointerContainerTop' : ''}` }, h("div", { class: `bubblePointer ${this.bubbleInfoTop ? 'bubblePointTop' : 'bubblePointBottom'}` })), this.isBlockedDateEvent() ? this.getBlockedView() : null, this.isNewBooking() ? this.getNewBookingOptions() : null, !this.isBlockedDateEvent() && !this.isNewBooking() ? this.getInfoElement() : null));
  }
  static get is() { return "igl-booking-event-hover"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-booking-event-hover.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-booking-event-hover.css"]
    };
  }
  static get properties() {
    return {
      "bookingEvent": {
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
      },
      "bubbleInfoTop": {
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
        "attribute": "bubble-info-top",
        "reflect": false,
        "defaultValue": "false"
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
      "countryNodeList": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ICountry[]",
          "resolved": "ICountry[]",
          "references": {
            "ICountry": {
              "location": "import",
              "path": "../../../models/IBooking",
              "id": "src/models/IBooking.ts::ICountry"
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
      "is_vacation_rental": {
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
        "attribute": "is_vacation_rental",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "isLoading": {}
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
        "method": "hideBubbleInfo",
        "name": "hideBubbleInfo",
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
        "method": "deleteButton",
        "name": "deleteButton",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=igl-booking-event-hover.js.map
