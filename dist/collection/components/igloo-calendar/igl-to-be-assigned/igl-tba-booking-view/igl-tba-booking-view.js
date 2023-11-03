import { Host, h, } from "@stencil/core";
import { ToBeAssignedService } from "../../../../services/toBeAssigned.service";
import { v4 } from "uuid";
// import $ from 'jquery';
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
    // Implement your custom logic here
    // console.log(propName, newValue, oldValue)
    if (propName === "selectedDate" && newValue !== oldValue) {
      this.highlightSection = false;
      this.selectedRoom = -1;
      return true; // Prevent update for a specific prop value
    }
    else if (propName === "eventData" && newValue !== oldValue) {
      this.selectedRoom = -1;
      return true;
    }
    // Default behavior, allow update
    return true;
  }
  componentWillLoad() {
    //console.log("eventIndex", this.eventIndex);
    if (this.categoryIndex === 0 && this.eventIndex === 0) {
      setTimeout(() => {
        this.handleHighlightAvailability();
      }, 100);
    }
  }
  // initializeToolTips(){
  // console.log($(this.element));
  // console.log($('[data-toggle="tooltip"]'))
  // console.log($(this.element + ' [data-toggle="tooltip"]'));
  // $('[data-toggle="tooltip"]').tooltip({
  //   container: 'body'
  // });
  // }
  async handleAssignUnit(event) {
    try {
      event.stopImmediatePropagation();
      event.stopPropagation();
      if (this.selectedRoom) {
        await this.toBeAssignedService.assignUnit(this.eventData.BOOKING_NUMBER, this.eventData.ID, this.selectedRoom);
        let assignEvent = Object.assign(Object.assign({}, this.eventData), { PR_ID: this.selectedRoom });
        /* Here need to work on saving to db on success run below 2 lines */
        this.calendarData.bookingEvents.push(assignEvent);
        this.addToBeAssignedEvent.emit({
          key: "tobeAssignedEvents",
          data: [assignEvent],
        });
        this.assignRoomEvent.emit({ key: "assignRoom", data: assignEvent });
      }
    }
    catch (error) {
      //   toastr.error(error);
    }
  }
  handleHighlightAvailability() {
    this.highlightToBeAssignedBookingEvent.emit({
      key: "highlightBookingId",
      data: { bookingId: this.eventData.ID },
    });
    if (!this.selectedDate) {
      return;
    }
    let filteredEvents = [];
    let allRoomsList = [];
    filteredEvents = this.eventData.availableRooms.map((room) => {
      allRoomsList.push({
        calendar_cell: null,
        id: room.PR_ID,
        name: room.roomName,
      });
      return Object.assign(Object.assign({}, room), { defaultDateRange: this.eventData.defaultDateRange, identifier: this.eventData.identifier });
    });
    this.allRoomsList = allRoomsList;
    this.addToBeAssignedEvent.emit({
      key: "tobeAssignedEvents",
      data: filteredEvents,
    });
    this.scrollPageToRoom.emit({
      key: "scrollPageToRoom",
      id: this.categoryId,
      refClass: "category_" + this.categoryId,
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
      key: "highlightBookingId",
      data: { bookingId: "----" },
    });
    this.onSelectRoom({ target: { value: "" } });
    this.addToBeAssignedEvent.emit({ key: "tobeAssignedEvents", data: [] });
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
    return (h(Host, null, h("div", { class: "bookingContainer", onClick: () => this.handleHighlightAvailability() }, h("div", { class: `guestTitle ${this.highlightSection ? "selectedOrder" : ""} pointer font-small-3`, "data-toggle": "tooltip", "data-placement": "top", "data-original-title": "Click to assign unit" }, `Book# ${this.eventData.BOOKING_NUMBER} , ${this.eventData.NAME}`), h("div", { class: "row m-0 p-0 actionsContainer" }, h("div", { class: "d-inline-block p-0 selectContainer" }, h("select", { class: "form-control input-sm", id: v4(), onChange: (evt) => this.onSelectRoom(evt) }, h("option", { value: "", selected: this.selectedRoom == -1 }, "Assign unit"), this.allRoomsList.map((room) => (h("option", { value: room.id, selected: this.selectedRoom == room.id }, room.name))))), this.highlightSection ? (h("div", { class: "d-inline-block text-right buttonsContainer" }, h("button", { type: "button", class: "btn btn-secondary btn-sm", onClick: (evt) => this.handleCloseAssignment(evt) }, "X"), h("button", { type: "button", class: "btn btn-primary btn-sm", onClick: (evt) => this.handleAssignUnit(evt), disabled: this.selectedRoom === -1 }, "Assign"))) : null), h("hr", null))));
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
