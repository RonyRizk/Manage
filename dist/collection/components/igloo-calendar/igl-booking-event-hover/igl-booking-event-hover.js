import { Host, h, Fragment } from "@stencil/core";
import { findCountry, formatDate, getCurrencySymbol } from "../../../utils/utils";
import { EventsService } from "../../../services/events.service";
import moment from "moment";
import locales from "../../../../../src/stores/locales.store";
//import { transformNewBLockedRooms } from '../../../utils/booking';
export class IglBookingEventHover {
  constructor() {
    this.todayTimeStamp = new Date().setHours(0, 0, 0, 0);
    this.eventService = new EventsService();
    this.hideButtons = false;
    this.bookingEvent = undefined;
    this.bubbleInfoTop = false;
    this.currency = undefined;
    this.countryNodeList = undefined;
    this.is_vacation_rental = false;
    this.isLoading = undefined;
    this.shouldHideUnassignUnit = false;
  }
  componentWillLoad() {
    console.log('this.bookingEvent', this.bookingEvent);
    let selectedRt = this.bookingEvent.roomsInfo.find(r => r.id === this.bookingEvent.RATE_TYPE);
    if (selectedRt) {
      console.log(selectedRt.physicalrooms.length === 1);
      this.shouldHideUnassignUnit = selectedRt.physicalrooms.length === 1;
    }
    if (moment(this.bookingEvent.TO_DATE, 'YYYY-MM-DD').isBefore(moment())) {
      this.hideButtons = true;
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.hideBubble();
    }
    else
      return;
  }
  hideBubble() {
    this.hideBubbleInfo.emit({
      key: 'hidebubble',
      currentInfoBubbleId: this.getBookingId(),
    });
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  componentDidLoad() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown);
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
    return this.bookingEvent.COUNTRY ? `${this.bookingEvent.is_direct ? this.getPhoneCode() + '-' : ''}${this.getPhoneNumber()} - ${this.getCountry()}` : this.getPhoneNumber();
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
    return this.bookingEvent.hasOwnProperty('splitBookingEvents') && this.bookingEvent.splitBookingEvents;
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
    this.bookingEvent.TITLE = locales.entries.Lcz_EditBookingFor;
    this.handleBookingOption('EDIT_BOOKING');
  }
  getStringDateFormat(dt) {
    return dt.getFullYear() + '-' + (dt.getMonth() < 9 ? '0' : '') + (dt.getMonth() + 1) + '-' + (dt.getDate() <= 9 ? '0' : '') + dt.getDate();
  }
  handleAddRoom() {
    let fromDate = new Date(this.bookingEvent.FROM_DATE);
    fromDate.setHours(0, 0, 0, 0);
    let from_date_str = this.getStringDateFormat(fromDate);
    let toDate = new Date(this.bookingEvent.TO_DATE);
    //toDate.setDate(toDate.getDate() + 1);
    toDate.setHours(0, 0, 0, 0);
    let to_date_str = this.getStringDateFormat(toDate);
    //console.log(this.bookingEvent);
    let eventData = {
      ID: '',
      NAME: '',
      BOOKING_NUMBER: this.bookingEvent.BOOKING_NUMBER,
      FROM_DATE: from_date_str,
      TO_DATE: to_date_str,
      roomsInfo: this.bookingEvent.roomsInfo,
      ARRIVAL: this.bookingEvent.ARRIVAL,
      ADD_ROOM_TO_BOOKING: this.bookingEvent.ID,
      TITLE: 'Add Room to #' + this.bookingEvent.BOOKING_NUMBER,
      event_type: 'ADD_ROOM',
      ROOMS: this.bookingEvent.ROOMS,
      GUEST: this.bookingEvent.GUEST,
      message: this.bookingEvent.NOTES,
      SOURCE: this.bookingEvent.SOURCE,
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
    this.hideBubble();
    this.deleteButton.emit(this.bookingEvent.POOL);
    console.log('Delete Event');
  }
  async handleUpdateBlockedDates() {
    try {
      this.isLoading = 'update';
      setTimeout(() => {
        this.hideBubble();
      }, 50);
      await this.eventService.updateBlockedEvent(this.bookingEvent);
      this.isLoading = '';
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
  renderTitle(eventType, roomInfo) {
    switch (eventType) {
      case 'EDIT_BOOKING':
        return `${locales.entries.Lcz_EditBookingFor} ${roomInfo.CATEGORY} ${roomInfo.ROOM_NAME}`;
      case 'ADD_ROOM':
        return `${locales.entries.Lcz_AddingUnitToBooking}# ${this.bookingEvent.BOOKING_NUMBER}`;
      case 'SPLIT_BOOKING':
        return locales.entries.Lcz_Adding + ` ${roomInfo.CATEGORY} ${roomInfo.ROOM_NAME}`;
      default:
        return `${locales.entries.Lcz_NewBookingFor} ${roomInfo.CATEGORY} ${roomInfo.ROOM_NAME}`;
    }
  }
  handleBookingOption(eventType, roomData = null) {
    const roomInfo = this.getRoomInfo();
    let data = roomData ? roomData : this.bookingEvent;
    data.event_type = eventType;
    data.TITLE = this.renderTitle(eventType, roomInfo);
    if (['003', '002', '004'].includes(this.bookingEvent.STATUS_CODE)) {
      data.roomsInfo = [roomInfo.ROOMS_INFO];
    }
    this.showBookingPopup.emit({
      key: 'add',
      data: Object.assign({}, data),
    });
    this.hideBubbleInfo.emit({
      key: 'hidebubble',
      currentInfoBubbleId: this.getBookingId(),
    });
  }
  getInfoElement() {
    var _a, _b;
    return (h("div", { class: `iglPopOver infoBubble ${this.bubbleInfoTop ? 'bubbleInfoAbove' : ''} text-left` }, h("div", { class: "row p-0 m-0 pb-1" }, h("div", { class: "pl-0 col-8 font-weight-bold font-medium-1 d-flex align-items-center" }, h("img", { src: (_b = (_a = this.bookingEvent) === null || _a === void 0 ? void 0 : _a.origin) === null || _b === void 0 ? void 0 : _b.Icon, alt: "icon", class: 'icon-image' }), h("p", { class: 'p-0 m-0' }, !this.bookingEvent.is_direct ? this.bookingEvent.channel_booking_nbr : this.bookingEvent.BOOKING_NUMBER)), h("div", { class: "pr-0 col-4 text-right" }, getCurrencySymbol(this.currency.code), this.getTotalPrice())), h("div", { class: "row p-0 m-0" }, h("div", { class: "pl-0 pr-0 col-12" }, h("span", { class: "font-weight-bold" }, locales.entries.Lcz_In, ": "), formatDate(this.bookingEvent.FROM_DATE, 'YYYY-MM-DD'), " - ", h("span", { class: "font-weight-bold" }, locales.entries.Lcz_Out, ": "), formatDate(this.bookingEvent.TO_DATE, 'YYYY-MM-DD'))), this.getArrivalTime() && (h("div", { class: "row p-0 m-0" }, h("div", { class: "pl-0 pr-0 col-12" }, h("span", { class: "font-weight-bold" }, locales.entries.Lcz_ArrivalTime, ": "), this.getArrivalTime()))), this.getTotalOccupants() && (h("div", { class: "row p-0 m-0" }, h("div", { class: "pl-0 pr-0 col-12" }, h("span", { class: "font-weight-bold" }, locales.entries.Lcz_Occupancy, ": "), this.getTotalOccupants()))), this.getPhoneNumber() && (h("div", { class: "row p-0 m-0" }, h("div", { class: "pl-0 pr-0 col-12 text-wrap" }, h("span", { class: "font-weight-bold" }, locales.entries.Lcz_Phone, ": "), this.renderPhone()))), this.getRatePlan() && (h("div", { class: "row p-0 m-0" }, h("div", { class: "pl-0 pr-0 col-12" }, h("span", { class: "font-weight-bold" }, locales.entries.Lcz_RatePlan, ": "), this.getRatePlan()))), this.getGuestNote() ? (h("div", { class: "row p-0 m-0" }, h("div", { class: "col-12 pl-0 pr-0 text-wrap" }, h("sapn", { class: "font-weight-bold" }, locales.entries.Lcz_Note, ": "), this.getGuestNote()))) : null, this.getInternalNote() ? (h("div", { class: "row p-0 m-0" }, h("div", { class: "col-12 pl-0 pr-0 text-wrap" }, h("span", { class: "font-weight-bold" }, locales.entries.Lcz_InternalRemark, ": "), this.getInternalNote()))) : null, h("div", { class: "row p-0 m-0 mt-2" }, h("div", { class: "full-width btn-group btn-group-sm font-small-3", role: "group" }, h("button", { type: "button", class: `btn btn-primary ${this.hideButtons ? 'mr-0' : 'mr-1'} ${this.shouldHideUnassignUnit ? 'w-50' : ''}`, onClick: _ => {
        this.handleEditBooking();
      }, disabled: !this.bookingEvent.IS_EDITABLE }, h("i", { class: "ft ft-edit font-small-3" }), " ", locales.entries.Lcz_Edit), this.bookingEvent.IS_EDITABLE && !this.hideButtons && (h("button", { type: "button", class: `btn btn-primary ${!this.shouldHideUnassignUnit ? 'mr-1' : 'w-50'}`, onClick: _ => {
        this.handleAddRoom();
      } }, h("i", { class: "ft ft-plus-circle font-small-3" }), " ", locales.entries.Lcz_AddRoom)), this.hideButtons
      ? null
      : !this.shouldHideUnassignUnit && (h("button", { type: "button", class: "btn btn-primary p-0", onClick: _ => {
          this.handleDeleteEvent();
        }, disabled: !this.bookingEvent.IS_EDITABLE || this.is_vacation_rental }, h("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", "fill-rule": "evenodd", "clip-rule": "evenodd" })), h("span", null, "\u00A0", locales.entries.Lcz_Unassign)))))));
  }
  getNewBookingOptions() {
    const shouldDisplayButtons = this.bookingEvent.roomsInfo[0].rateplans.some(rate => rate.is_active);
    return (h("div", { class: `iglPopOver newBookingOptions ${this.bubbleInfoTop ? 'bubbleInfoAbove' : ''} text-left` }, shouldDisplayButtons ? (h(Fragment, null, h("button", { type: "button", class: "d-block full-width btn btn-sm btn-primary mb-1 font-small-3 square", onClick: _ => {
        this.handleBookingOption('BAR_BOOKING');
      } }, locales.entries.Lcz_CreateNewBooking), this.hasSplitBooking() ? (h("button", { type: "button", class: "d-block full-width btn btn-sm btn-primary mb-1 font-small-3 square", onClick: _ => {
        this.handleBookingOption('SPLIT_BOOKING');
      } }, locales.entries.Lcz_AssignUnitToExistingBooking)) : null)) : (h("p", { class: 'text-danger' }, locales.entries.Lcz_NoRatePlanDefined)), h("button", { type: "button", class: "d-block full-width btn btn-sm btn-primary font-small-3 square", onClick: _ => {
        this.handleBookingOption('BLOCK_DATES');
      } }, locales.entries.Lcz_Blockdates)));
  }
  getBlockedView() {
    // let defaultData = {RELEASE_AFTER_HOURS: 0, OPTIONAL_REASON: "", OUT_OF_SERVICE: false};
    return (h("div", { class: `iglPopOver blockedView ${this.bubbleInfoTop ? 'bubbleInfoAbove' : ''} text-left` }, h("igl-block-dates-view", { isEventHover: true, entryHour: this.bookingEvent.ENTRY_HOUR, entryMinute: this.bookingEvent.ENTRY_MINUTE, defaultData: this.bookingEvent, fromDate: moment(this.bookingEvent.FROM_DATE, 'YYYY-MM-DD').format('DD MM YYYY'), toDate: moment(this.bookingEvent.TO_DATE, 'YYYY-MM-DD').format('DD MM YYYY'), entryDate: this.getEntryDate(), onDataUpdateEvent: event => this.handleBlockDateUpdate(event) }), h("div", { class: "row p-0 m-0 mt-2" }, h("div", { class: "full-width btn-group btn-group-sm font-small-3", role: "group" }, h("button", { disabled: this.isLoading === 'update', type: "button", class: "btn btn-primary mr-1", onClick: _ => {
        this.handleUpdateBlockedDates();
      } }, this.isLoading === 'update' ? h("i", { class: "la la-circle-o-notch spinner mx-1" }) : h("i", { class: "ft ft-edit font-small-3 updateBtnIcon" }), locales.entries.Lcz_Update), h("button", { type: "button", class: "btn btn-primary", onClick: _ => {
        this.handleConvertBlockedDateToBooking();
      } }, locales.entries.Lcz_ConvertToBooking), h("button", { type: "button", class: "btn btn-danger ml-1", onClick: _ => {
        this.handleDeleteEvent();
      } }, h("i", { class: "ft ft-trash-2 font-small-3" }), " ", locales.entries.Lcz_Delete)))));
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
      "isLoading": {},
      "shouldHideUnassignUnit": {}
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
      }, {
        "method": "bookingCreated",
        "name": "bookingCreated",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ pool?: string; data: any[] }",
          "resolved": "{ pool?: string; data: any[]; }",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
//# sourceMappingURL=igl-booking-event-hover.js.map
