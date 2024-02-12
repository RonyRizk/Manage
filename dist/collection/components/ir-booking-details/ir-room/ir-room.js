import { h } from "@stencil/core";
import { _formatAmount, _formatDate, _getDay } from "../functions";
import { formatName } from "../../../utils/booking";
import axios from "axios";
export class IrRoom {
  constructor() {
    this.bookingEvent = undefined;
    this.bookingIndex = undefined;
    this.mealCodeName = undefined;
    this.myRoomTypeFoodCat = undefined;
    this.currency = 'USD';
    this.legendData = undefined;
    this.roomsInfo = undefined;
    this.collapsed = false;
    this.defaultTexts = undefined;
    this.ticket = undefined;
    this.hasRoomEdit = false;
    this.hasRoomDelete = false;
    this.hasRoomAdd = false;
    this.hasCheckIn = false;
    this.hasCheckOut = false;
    this.item = undefined;
    this.isLoading = false;
    this.isModelOpen = false;
  }
  componentWillLoad() {
    if (this.bookingEvent) {
      this.item = this.bookingEvent.rooms[this.bookingIndex];
    }
    //console.log("item",this.item)
  }
  handleBookingEventChange() {
    this.item = this.bookingEvent.rooms[this.bookingIndex];
  }
  componentDidLoad() {
    this.modal = this.element.querySelector('ir-modal');
  }
  handleClick(e) {
    let target = e.target;
    if (target.id == 'checkin') {
      this.pressCheckIn.emit(this.item);
    }
    else if (target.id == 'checkout') {
      this.pressCheckOut.emit(this.item);
    }
  }
  // _getFoodArrangeCat(catCode: string) {
  //   // get the category from the foodArrangeCats array
  //   const cat = this.mealCode.find((cat: any) => cat.CODE_NAME === catCode);
  //   // return the category
  //   return cat.CODE_VALUE_EN;
  // }
  /*
  
  bookingEvent.defaultDateRange = {};
      bookingEvent.defaultDateRange.fromDate = new Date(bookingEvent.FROM_DATE + 'T00:00:00');
      bookingEvent.defaultDateRange.fromDateStr = this.getDateStr(bookingEvent.defaultDateRange.fromDate);
      bookingEvent.defaultDateRange.fromDateTimeStamp = bookingEvent.defaultDateRange.fromDate.getTime();
      bookingEvent.defaultDateRange.toDate = new Date(bookingEvent.TO_DATE + 'T00:00:00');
      bookingEvent.defaultDateRange.toDateStr = this.getDateStr(bookingEvent.defaultDateRange.toDate);
      bookingEvent.defaultDateRange.toDateTimeStamp = bookingEvent.defaultDateRange.toDate.getTime();
      bookingEvent.defaultDateRange.dateDifference = bookingEvent.NO_OF_DAYS;
  */
  getDateStr(date, locale = 'default') {
    return date.getDate() + ' ' + date.toLocaleString(locale, { month: 'short' }) + ' ' + date.getFullYear();
  }
  handleEditClick() {
    this.editInitiated.emit({
      event_type: 'EDIT_BOOKING',
      ID: this.item['assigned_units_pool'],
      NAME: formatName(this.item.guest.first_name, this.item.guest.last_name),
      EMAIL: this.bookingEvent.guest.email,
      PHONE: this.bookingEvent.guest.mobile,
      REFERENCE_TYPE: '',
      FROM_DATE: this.bookingEvent.from_date,
      TO_DATE: this.bookingEvent.to_date,
      TITLE: `${this.defaultTexts.entries.Lcz_EditBookingFor} ${this.item.roomtype.name} ${this.item.unit.name}`,
      defaultDateRange: {
        dateDifference: this.item.days.length,
        fromDate: new Date(this.item.from_date + 'T00:00:00'),
        fromDateStr: this.getDateStr(new Date(this.item.from_date + 'T00:00:00')),
        toDate: new Date(this.item.to_date + 'T00:00:00'),
        toDateStr: this.getDateStr(new Date(this.item.to_date + 'T00:00:00')),
        message: '',
      },
      bed_preference: this.item.bed_preference,
      adult_child_offering: this.item.rateplan.selected_variation.adult_child_offering,
      ADULTS_COUNT: this.item.rateplan.selected_variation.adult_nbr,
      ARRIVAL: this.bookingEvent.arrival,
      ARRIVAL_TIME: this.bookingEvent.arrival.description,
      BOOKING_NUMBER: this.bookingEvent.booking_nbr,
      cancelation: this.item.rateplan.cancelation,
      channel_booking_nbr: this.bookingEvent.channel_booking_nbr,
      CHILDREN_COUNT: this.item.rateplan.selected_variation.child_nbr,
      COUNTRY: this.bookingEvent.guest.country_id,
      ENTRY_DATE: this.bookingEvent.from_date,
      FROM_DATE_STR: this.bookingEvent.format.from_date,
      guarantee: this.item.rateplan.guarantee,
      GUEST: this.bookingEvent.guest,
      IDENTIFIER: this.item.identifier,
      is_direct: this.bookingEvent.is_direct,
      IS_EDITABLE: this.bookingEvent.is_editable,
      NO_OF_DAYS: this.item.days.length,
      NOTES: this.bookingEvent.remark,
      origin: this.bookingEvent.origin,
      POOL: this.item['assigned_units_pool'],
      PR_ID: this.item.unit.id,
      RATE: this.item.total,
      RATE_PLAN: this.item.rateplan.name,
      RATE_PLAN_ID: this.item.rateplan.id,
      RATE_TYPE: this.item.roomtype.id,
      ROOMS: this.bookingEvent.rooms,
      SOURCE: this.bookingEvent.source,
      SPLIT_BOOKING: false,
      STATUS: 'IN-HOUSE',
      TO_DATE_STR: this.bookingEvent.format.to_date,
      TOTAL_PRICE: this.bookingEvent.total,
      legendData: this.legendData,
      roomsInfo: this.roomsInfo,
      roomName: this.item.unit.name,
    });
  }
  handleDeleteClick() {
    this.modal.openModal();
  }
  async deleteRoom() {
    try {
      this.isLoading = true;
      let oldRooms = [...this.bookingEvent.rooms];
      oldRooms = oldRooms.filter(room => room.identifier !== this.item.identifier);
      const body = {
        assign_units: true,
        check_in: true,
        is_pms: true,
        is_direct: true,
        booking: {
          booking_nbr: this.bookingEvent.booking_nbr,
          from_date: this.bookingEvent.from_date,
          to_date: this.bookingEvent.to_date,
          remark: this.bookingEvent.remark,
          property: this.bookingEvent.property,
          source: this.bookingEvent.source,
          currency: this.bookingEvent.currency,
          arrival: this.bookingEvent.arrival,
          guest: this.bookingEvent.guest,
          rooms: oldRooms,
        },
      };
      console.log('body:', body);
      const { data } = await axios.post(`/DoReservation?Ticket=${this.ticket}`, body);
      if (data.ExceptionMsg !== '') {
        throw new Error(data.ExceptionMsg);
      }
      this.deleteFinished.emit(this.item.identifier);
    }
    catch (error) {
    }
    finally {
      this.isLoading = false;
    }
  }
  render() {
    return (h("div", { class: "p-1 d-flex m-0" }, h("ir-icon", { id: "drawer-icon", "data-toggle": "collapse", "data-target": `#roomCollapse-${this.item.identifier.split(' ').join('')}`, "aria-expanded": "false", "aria-controls": "collapseExample", class: "pointer mr-1", onClick: () => {
        this.collapsed = !this.collapsed;
      } }, !this.collapsed ? (h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "#104064", height: 20, width: 20, slot: "icon" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" }), h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" }))) : (h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "#104064", height: 20, width: 20, slot: "icon" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" })))), h("div", { class: "w-100 m-0" }, h("div", { class: "d-flex align-items-end justify-content-between" }, h("div", null, h("strong", null, this.myRoomTypeFoodCat || '', " "), " ", this.mealCodeName, " ", this.item.rateplan.is_non_refundable && ` - ${this.defaultTexts.entries.Lcz_NonRefundable}`, ' '), h("div", { class: "d-flex" }, h("p", { class: "mr-1 p-0 m-0 " }, _formatAmount(this.item.total, this.currency)), this.hasRoomEdit && (h("ir-icon", { id: `roomEdit-${this.item.identifier}`, class: "pointer mr-1", onClick: this.handleEditClick.bind(this) }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16", viewBox: "0 0 512 512" }, h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" })))), this.hasRoomDelete && (h("ir-icon", { onClick: this.handleDeleteClick.bind(this), id: `roomDelete-${this.item.identifier}`, class: "pointer mr-1" }, h("svg", { slot: "icon", fill: "#ff2441", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "14.25", viewBox: "0 0 448 512" }, h("path", { d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })))))), h("div", null, h("span", { class: "mr-1" }, `${this.item.guest.first_name || ''} ${this.item.guest.last_name || ''}`), this.item.rateplan.selected_variation.adult_nbr > 0 && h("span", null, " ", this.item.rateplan.selected_variation.adult_child_offering)), h("div", { class: "d-flex align-items-center" }, h("span", { class: " mr-1" }, _formatDate(this.item.from_date), " - ", _formatDate(this.item.to_date)), this.item.unit && h("span", { class: "light-blue-bg mr-2 " }, this.item.unit.name), this.hasCheckIn && h("ir-button", { id: "checkin", icon: "", class: "mr-1", btn_color: "info", size: "sm", text: "Check in" }), this.hasCheckOut && h("ir-button", { id: "checkout", icon: "", btn_color: "info", size: "sm", text: "Check out" })), h("div", { class: "collapse", id: `roomCollapse-${this.item.identifier.split(' ').join('')}` }, h("div", { class: "d-flex" }, h("div", { class: " sm-padding-top" }, h("strong", { class: "sm-padding-right" }, `${this.defaultTexts.entries.Lcz_Breakdown}:`)), h("div", { class: 'flex-fill' }, h("table", null, this.item.days.length > 0 &&
      this.item.days.map(item => (h("tr", null, h("td", { class: 'pr-2' }, _getDay(item.date)), " ", h("td", null, _formatAmount(item.amount, this.currency)))))))), h("div", { innerHTML: this.item.rateplan.cancelation || '' }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_MealPlan}:`, value: this.mealCodeName }))), h("ir-modal", { onConfirmModal: this.deleteRoom.bind(this), iconAvailable: true, icon: "ft-alert-triangle danger h1", leftBtnText: this.defaultTexts.entries.Lcz_Cancel, rightBtnText: this.defaultTexts.entries.Lcz_Delete, leftBtnColor: "secondary", rightBtnColor: "danger", modalTitle: this.defaultTexts.entries.Lcz_Confirmation, modalBody: `${this.defaultTexts.entries['Lcz_AreYouSureDoYouWantToRemove ']} ${this.item.roomtype.name} ${this.item.unit && this.item.unit.name} ${this.defaultTexts.entries.Lcz_FromThisBooking}` })));
  }
  static get is() { return "ir-room"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-room.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-room.css"]
    };
  }
  static get properties() {
    return {
      "bookingEvent": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Booking",
          "resolved": "Booking",
          "references": {
            "Booking": {
              "location": "import",
              "path": "../../../models/booking.dto",
              "id": "src/models/booking.dto.ts::Booking"
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
      "bookingIndex": {
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
        "attribute": "booking-index",
        "reflect": false
      },
      "mealCodeName": {
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
        "attribute": "meal-code-name",
        "reflect": false
      },
      "myRoomTypeFoodCat": {
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
        "attribute": "my-room-type-food-cat",
        "reflect": false
      },
      "currency": {
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
        "attribute": "currency",
        "reflect": false,
        "defaultValue": "'USD'"
      },
      "legendData": {
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
        "attribute": "legend-data",
        "reflect": false
      },
      "roomsInfo": {
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
        "attribute": "rooms-info",
        "reflect": false
      },
      "defaultTexts": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ILocale",
          "resolved": "ILocale",
          "references": {
            "ILocale": {
              "location": "import",
              "path": "@/stores/locales.store",
              "id": "src/stores/locales.store.ts::ILocale"
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
      "ticket": {
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
        "attribute": "ticket",
        "reflect": false
      },
      "hasRoomEdit": {
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
        "attribute": "has-room-edit",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasRoomDelete": {
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
        "attribute": "has-room-delete",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasRoomAdd": {
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
        "attribute": "has-room-add",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasCheckIn": {
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
        "attribute": "has-check-in",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasCheckOut": {
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
        "attribute": "has-check-out",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "collapsed": {},
      "item": {},
      "isLoading": {},
      "isModelOpen": {}
    };
  }
  static get events() {
    return [{
        "method": "deleteFinished",
        "name": "deleteFinished",
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
        "method": "pressCheckIn",
        "name": "pressCheckIn",
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
        "method": "pressCheckOut",
        "name": "pressCheckOut",
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
        "method": "editInitiated",
        "name": "editInitiated",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "TIglBookPropertyPayload",
          "resolved": "IglBookPropertyPayloadAddRoom | IglBookPropertyPayloadBarBooking | IglBookPropertyPayloadBlockDates | IglBookPropertyPayloadEditBooking | IglBookPropertyPayloadPlusBooking | IglBookPropertyPayloadSplitBooking",
          "references": {
            "TIglBookPropertyPayload": {
              "location": "import",
              "path": "../../../models/igl-book-property",
              "id": "src/models/igl-book-property.d.ts::TIglBookPropertyPayload"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "bookingEvent",
        "methodName": "handleBookingEventChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "clickHanlder",
        "method": "handleClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-room.js.map
