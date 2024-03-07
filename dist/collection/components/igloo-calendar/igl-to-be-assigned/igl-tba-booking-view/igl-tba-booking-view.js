import { Host, h } from "@stencil/core";
import { ToBeAssignedService } from "../../../../services/toBeAssigned.service";
import { v4 } from "uuid";
import locales from "../../../../../../src/stores/locales.store";
import calendar_data from "../../../../../../src/stores/calendar-data";
import { isRequestPending } from "../../../../../../src/stores/ir-interceptor.store";
export class IglTbaBookingView {
  constructor() {
    this.highlightSection = false;
    this.allRoomsList = [];
    this.toBeAssignedService = new ToBeAssignedService();
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
    this.toBeAssignedService.setToken(calendar_data.token);
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
      data: { bookingId: this.eventData.ID, fromDate: this.eventData.FROM_DATE },
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
    this.selectedRoom = -1;
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
    return (h(Host, null, h("div", { class: "bookingContainer", onClick: () => this.handleHighlightAvailability() }, h("div", { class: `guestTitle ${this.highlightSection ? 'selectedOrder' : ''} pointer font-small-3`, "data-toggle": "tooltip", "data-placement": "top", "data-original-title": "Click to assign unit" }, `Book# ${this.eventData.BOOKING_NUMBER} - ${this.eventData.NAME}`), h("div", { class: "row m-0 p-0 actionsContainer" }, h("select", { class: "form-control input-sm room-select", id: v4(), onChange: evt => this.onSelectRoom(evt) }, h("option", { value: "", selected: this.selectedRoom == -1 }, locales.entries.Lcz_AssignUnit), this.allRoomsList.map(room => (h("option", { value: room.id, selected: this.selectedRoom == room.id }, room.name)))), this.highlightSection ? (h("div", { class: "d-flex buttonsContainer" }, h("button", { type: "button", class: "btn btn-secondary btn-sm", onClick: evt => this.handleCloseAssignment(evt) }, h("svg", { class: "m-0 p-0", xmlns: "http://www.w3.org/2000/svg", height: "12", width: "9", viewBox: "0 0 384 512" }, h("path", { fill: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" }))), h("ir-button", { isLoading: isRequestPending('/Assign_Exposed_Room'), size: "sm", text: locales.entries.Lcz_Assign, onClickHanlder: evt => this.handleAssignUnit(evt), btn_disabled: this.selectedRoom === -1 }))) : null), h("hr", null))));
  }
  static get is() { return "igl-tba-booking-view"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-tba-booking-view.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-tba-booking-view.css"]
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
      "selectedDate": {
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
        "attribute": "selected-date",
        "reflect": false
      },
      "eventData": {
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
        },
        "defaultValue": "{}"
      },
      "categoriesData": {
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
        },
        "defaultValue": "{}"
      },
      "categoryId": {
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
        "attribute": "category-id",
        "reflect": false
      },
      "categoryIndex": {
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
        "attribute": "category-index",
        "reflect": false
      },
      "eventIndex": {
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
        "attribute": "event-index",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "renderAgain": {},
      "selectedRoom": {}
    };
  }
  static get events() {
    return [{
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
        "method": "assignRoomEvent",
        "name": "assignRoomEvent",
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
      }];
  }
  static get listeners() {
    return [{
        "name": "highlightToBeAssignedBookingEvent",
        "method": "highlightBookingEvent",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=igl-tba-booking-view.js.map
