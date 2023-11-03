import { Host, h, } from "@stencil/core";
import { BookingService } from "../../../services/booking.service";
import { dateToFormattedString, getReleaseHoursString, } from "../../../utils/utils";
import { EventsService } from "../../../services/events.service";
export class IglBookProperty {
  constructor() {
    this.PAGE_ZERO = "page_zero";
    this.PAGE_ONE = "page_one";
    this.PAGE_TWO = "page_two";
    this.PAGE_BLOCK_DATES = "page_block_date";
    this.showSplitBookingOption = false;
    this.sourceOptions = [];
    this.selectedRooms = {};
    this.guestData = [];
    this.bookedByInfoData = {};
    this.blockDatesData = {};
    this.ratePricingMode = [];
    this.bedPreferenceType = [];
    this.bookingService = new BookingService();
    this.eventsService = new EventsService();
    this.propertyid = undefined;
    this.language = undefined;
    this.countryNodeList = undefined;
    this.currency = undefined;
    this.bookingData = undefined;
    this.sourceOption = {
      code: "",
      description: "",
    };
    this.splitBookingId = "";
    this.renderAgain = false;
    this.message = "";
    this.isLoading = undefined;
    this.isConvertedBooking = undefined;
    this.dateRangeData = undefined;
    this.selectedUnits = {};
  }
  async componentWillLoad() {
    if (!this.bookingData.defaultDateRange) {
      return;
    }
    this.dateRangeData = Object.assign({}, this.bookingData.defaultDateRange);
    try {
      const setupEntries = await this.fetchSetupEntries();
      this.setSourceOptions(setupEntries.bookingSource);
      this.setOtherProperties(setupEntries);
      if (this.isEventType("EDIT_BOOKING")) {
        this.setEditingRoomInfo();
      }
      //this.bookingData.roomsInfo = [];
      this.page = this.getDefaultPage();
    }
    catch (error) {
      console.error("Error fetching setup entries:", error);
    }
  }
  async fetchSetupEntries() {
    return await this.bookingService.fetchSetupEntries();
  }
  setSourceOptions(bookingSource) {
    this.sourceOptions = bookingSource.map((source) => ({
      id: source.CODE_NAME,
      value: source.CODE_VALUE_EN,
    }));
    this.sourceOption = {
      code: bookingSource[0].CODE_NAME,
      description: bookingSource[0].CODE_VALUE_EN,
    };
  }
  setOtherProperties(res) {
    this.ratePricingMode = res.ratePricingMode;
    this.bookedByInfoData.arrivalTime = res.arrivalTime;
    this.bedPreferenceType = res.bedPreferenceType;
  }
  setEditingRoomInfo() {
    const category = this.getRoomCategoryByRoomId(this.getBookingPreferenceRoomId());
    const key = `c_${category.id}`;
    this.selectedRooms[key] = {
      [`p_${this.bookingData.RATE_PLAN_ID}`]: {
        adultCount: this.bookingData.ADULTS_COUNT,
        rate: this.bookingData.RATE,
        rateType: this.bookingData.RATE_TYPE,
        ratePlanId: this.bookingData.RATE_PLAN_ID,
        roomCategoryId: category.id,
        roomCategoryName: category.name,
        totalRooms: 1,
        ratePlanName: this.bookingData.RATE_PLAN,
        roomId: this.bookingData.PR_ID,
        guestName: this.bookingData.NAME,
      },
    };
  }
  async initializeBookingAvailability(from_date, to_date) {
    try {
      const room_type_ids = this.bookingData.roomsInfo.map((room) => room.id);
      const data = await this.bookingService.getBookingAvailability(from_date, to_date, this.propertyid, this.language, room_type_ids, this.currency);
      this.message = "";
      this.bookingData = Object.assign(Object.assign({}, this.bookingData), { roomsInfo: data.roomtypes });
      this.message = data.tax_statement;
    }
    catch (error) {
      // toastr.error(error);
    }
  }
  getRoomCategoryByRoomId(roomId) {
    var _a;
    return (_a = this.bookingData.roomsInfo) === null || _a === void 0 ? void 0 : _a.find((roomCategory) => {
      return roomCategory.physicalrooms.find((room) => room.id === +roomId);
    });
  }
  getDefaultPage() {
    if (this.bookingData.event_type === "BLOCK_DATES") {
      return this.PAGE_BLOCK_DATES;
    }
    else if (this.bookingData.event_type === "SPLIT_BOOKING") {
      this.showSplitBookingOption = true;
      return this.PAGE_ONE;
    }
    else {
      // if( || this.bookingData.event_type === "NEW_BOOKING")
      return this.PAGE_ONE;
    }
  }
  getBookingPreferenceRoomId() {
    //console.log(this.bookingData);
    return ((this.bookingData.hasOwnProperty("PR_ID") && this.bookingData.PR_ID) ||
      null);
  }
  getSplitBookings() {
    return ((this.bookingData.hasOwnProperty("splitBookingEvents") &&
      this.bookingData.splitBookingEvents) ||
      []);
  }
  isEventType(key) {
    return this.bookingData.event_type === key;
  }
  closeWindow() {
    this.isConvertedBooking = false;
    this.closeBookingWindow.emit();
  }
  isEditBooking() {
    return this.bookingData.event_type === "EDIT_BOOKING";
  }
  onRoomsDataUpdate(event) {
    const { data, key, changedKey } = event.detail;
    const roomCategoryKey = this.getRoomCategoryKey(data.roomCategoryId);
    const ratePlanKey = this.getRatePlanKey(data.ratePlanId);
    if (this.shouldClearData(key)) {
      this.selectedRooms = {};
    }
    this.initializeRoomCategoryIfNeeded(roomCategoryKey);
    if (this.isEditBooking()) {
      if (changedKey === "rate") {
        if (this.selectedRooms.hasOwnProperty(roomCategoryKey) &&
          this.selectedRooms[roomCategoryKey].hasOwnProperty(ratePlanKey)) {
          this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data);
        }
      }
      else {
        if (changedKey !== "rateType") {
          if (changedKey === "adult_child_offering") {
            if (this.selectedRooms.hasOwnProperty(roomCategoryKey) &&
              this.selectedRooms[roomCategoryKey].hasOwnProperty(ratePlanKey)) {
              this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data);
            }
          }
          else {
            this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data);
          }
        }
      }
    }
    else {
      this.setSelectedRoomData(roomCategoryKey, ratePlanKey, data);
    }
    this.cleanupEmptyData(roomCategoryKey, ratePlanKey);
    this.renderPage();
  }
  getRoomCategoryKey(roomCategoryId) {
    return `c_${roomCategoryId}`;
  }
  getRatePlanKey(ratePlanId) {
    return `p_${ratePlanId}`;
  }
  shouldClearData(key) {
    return key === "clearData" || this.isEditBookingEvent(key);
  }
  isEditBookingEvent(key) {
    return key === "EDIT_BOOKING";
  }
  initializeRoomCategoryIfNeeded(roomCategoryKey) {
    if (!this.selectedRooms[roomCategoryKey]) {
      this.selectedRooms[roomCategoryKey] = {};
    }
  }
  setSelectedRoomData(roomCategoryKey, ratePlanKey, data) {
    this.selectedRooms[roomCategoryKey][ratePlanKey] = data;
  }
  hasSelectedRoomData(roomCategoryKey, ratePlanKey) {
    return (this.selectedRooms[roomCategoryKey] &&
      this.selectedRooms[roomCategoryKey][ratePlanKey]);
  }
  cleanupEmptyData(roomCategoryKey, ratePlanKey) {
    var _a;
    if (((_a = this.selectedRooms[roomCategoryKey][ratePlanKey]) === null || _a === void 0 ? void 0 : _a.totalRooms) === 0) {
      delete this.selectedRooms[roomCategoryKey][ratePlanKey];
    }
    if (!Object.keys(this.selectedRooms[roomCategoryKey]).length) {
      delete this.selectedRooms[roomCategoryKey];
    }
  }
  applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data) {
    this.selectedRooms = {
      [roomCategoryKey]: {
        [ratePlanKey]: Object.assign(Object.assign({}, data), { guestName: this.bookingData.NAME, roomId: this.bookingData.PR_ID }),
      },
    };
  }
  onDateRangeSelect(event) {
    const opt = event.detail;
    if (opt.key === "selectedDateRange") {
      this.dateRangeData = opt.data;
      this.bookingData.defaultDateRange.fromDate = new Date(this.dateRangeData.fromDate);
      this.bookingData.defaultDateRange.toDate = new Date(this.dateRangeData.toDate);
      this.initializeBookingAvailability(dateToFormattedString(this.bookingData.defaultDateRange.fromDate), dateToFormattedString(this.bookingData.defaultDateRange.toDate));
    }
  }
  handleBlockDateUpdate(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const opt = event.detail;
    this.blockDatesData = opt.data;
    //console.log("blocked date data", this.blockDatesData);
  }
  handleSubmit(event) {
    event.preventDefault();
    //console.log(event);
  }
  handleGuestInfoUpdate(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const opt = event.detail;
    if (opt.guestRefKey) {
      this.guestData[opt.guestRefKey] = opt.data;
    }
  }
  handleBookedByInfoUpdate(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const opt = event.detail;
    this.bookedByInfoData = opt.value.data;
  }
  isActiveSouceOption(srcIndex) {
    return this.sourceOption === srcIndex ? "active" : "";
  }
  handleSourceDropDown(selectedOption) {
    this.sourceOption = {
      code: selectedOption.target.value,
      description: this.sourceOptions.find((opt) => opt.id === selectedOption.target.value.toString()).value || "",
    };
  }
  renderPage() {
    this.renderAgain = !this.renderAgain;
  }
  gotoSplitPageTwo() {
    this.gotoPage(this.PAGE_TWO);
  }
  gotoPage(gotoPage) {
    this.page = gotoPage;
    this.renderPage();
  }
  showSplitBooking() {
    this.showSplitBookingOption = true;
    this.gotoPage(this.PAGE_ONE);
  }
  getSelectedSplitBookingName(bookingId) {
    let splitBooking = this.getSplitBookings().find((booking) => booking.ID === bookingId);
    return splitBooking.ID + " " + splitBooking.NAME;
  }
  isActiveSplitBookingOption(spltIndex) {
    return this.splitBookingId === spltIndex ? "active" : "";
  }
  handleSplitBookingDropDown(evt) {
    this.splitBookingId = evt.target.value;
  }
  isPageZero() {
    return this.page === this.PAGE_ZERO;
  }
  isPageOne() {
    return this.page === this.PAGE_ONE;
  }
  isPageTwo() {
    return this.page === this.PAGE_TWO;
  }
  isPageBlockDates() {
    return this.page === this.PAGE_BLOCK_DATES;
  }
  getSplitBookingList() {
    return (h("fieldset", { class: "form-group col-12 text-left" }, h("label", { class: "h5" }, "To booking# "), h("div", { class: "btn-group ml-1" }, h("select", { class: "form-control input-sm", id: "xSmallSelect", onChange: (evt) => this.handleSplitBookingDropDown(evt) }, h("option", { value: "", selected: this.splitBookingId != "" }, "Select"), this.getSplitBookings().map((option) => (h("option", { value: option.ID, selected: this.splitBookingId === option.ID }, this.getSelectedSplitBookingName(option.ID))))))));
  }
  getSourceNode() {
    return (h("fieldset", { class: "form-group col-12 text-left" }, h("label", { class: "h5" }, "Source "), h("div", { class: "btn-group ml-1" }, h("select", { class: "form-control input-sm", id: "xSmallSelect", onChange: (evt) => this.handleSourceDropDown(evt) }, this.sourceOptions.map((option) => (h("option", { value: option.id, selected: this.sourceOption.code === option.id }, option.value)))))));
  }
  getRoomsListFromCategoryId(categoryId) {
    var _a;
    let category = (_a = this.bookingData.roomsInfo) === null || _a === void 0 ? void 0 : _a.find((category) => category.id === categoryId);
    return (category && category.physicalrooms) || [];
  }
  getPageZeroView() {
    return (h("div", { class: "scrollContent" }, h("div", { class: "row p-0 mb-1" }, h("div", { class: "col-md-3 col-sm-12 mb-1" }, h("button", { class: "btn btn-primary full-width", onClick: () => this.gotoPage(this.PAGE_ONE) }, "Create New Booking")), this.getSplitBookings().length ? (h("div", { class: "col-md-3 col-sm-12 mb-1" }, h("button", { class: "btn btn-primary full-width", onClick: () => this.showSplitBooking() }, "Add Unit to Existing Booking"))) : null, h("div", { class: "col-md-3 col-sm-12 mb-1" }, h("button", { class: "btn btn-primary full-width", onClick: () => this.gotoPage(this.PAGE_BLOCK_DATES) }, "Block Dates")), h("div", { class: "col-md-3 col-sm-12 mb-1" }, h("button", { class: "btn btn-secondary full-width", onClick: () => this.closeWindow() }, "Cancel")))));
  }
  getPageOneView() {
    var _a;
    return (h("div", { class: "scrollContent" }, this.showSplitBookingOption
      ? this.getSplitBookingList()
      : this.isEventType("EDIT_BOOKING") || this.isEventType("ADD_ROOM")
        ? null
        : this.getSourceNode(), h("fieldset", { class: "form-group col-12 row" }, h("igl-date-range", { message: this.message, defaultData: this.bookingData.defaultDateRange, onDateSelectEvent: (evt) => this.onDateRangeSelect(evt) })), h("div", { class: "col text-left" }, (_a = this.bookingData.roomsInfo) === null || _a === void 0 ? void 0 : _a.map((roomInfo) => (h("igl-booking-rooms", { currency: this.currency, ratePricingMode: this.ratePricingMode, dateDifference: this.dateRangeData.dateDifference, bookingType: this.bookingData.event_type, roomTypeData: roomInfo, class: "mt-2 mb-1", defaultData: this.selectedRooms["c_" + roomInfo.id], onDataUpdateEvent: (evt) => this.onRoomsDataUpdate(evt) })))), this.isEventType("EDIT_BOOKING") ? (h("div", { class: "row p-0 mb-1 mt-2" }, h("div", { class: "col-6" }, h("button", { class: "btn btn-secondary full-width", onClick: () => this.closeWindow() }, "Cancel")), h("div", { class: "col-6" }, h("button", { class: "btn btn-primary full-width", onClick: () => this.gotoPage(this.PAGE_TWO) }, "Next >>")))) : (h("div", { class: "row p-0 mb-1 mt-2" }, h("div", { class: this.bookingData.event_type === "PLUS_BOOKING" ||
        this.isEventType("ADD_ROOM")
        ? "col-6"
        : "col-12" }, h("button", { class: "btn btn-secondary full-width", onClick: () => this.closeWindow() }, "Cancel")), this.bookingData.event_type === "PLUS_BOOKING" ||
      this.isEventType("ADD_ROOM") ? (h("div", { class: "col-6" }, h("button", { class: "btn btn-primary full-width", disabled: Object.keys(this.selectedRooms).length === 0, onClick: () => this.gotoPage(this.PAGE_TWO) }, "Next >>"))) : null))));
  }
  getPageBlockDatesView() {
    return (h("div", { class: "scrollContent blockDatesForm" }, h("igl-block-dates-view", { fromDate: this.dateRangeData.fromDateStr, toDate: this.dateRangeData.toDateStr, entryDate: this.bookingData.ENTRY_DATE, onDataUpdateEvent: (event) => this.handleBlockDateUpdate(event) }), h("div", { class: "row p-0 mb-1 mt-2" }, h("div", { class: "col-6" }, h("button", { class: "btn btn-secondary full-width", onClick: () => this.closeWindow() }, "Cancel")), h("div", { class: "col-6" }, h("button", { class: "btn btn-primary full-width", onClick: () => this.handleBlockDate() }, "Block dates")))));
  }
  handleButtonClicked(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    switch (event.detail.key) {
      case "save":
        this.bookUser(true);
        break;
      case "cancel":
        this.closeWindow();
        break;
      case "back":
        this.gotoPage(this.PAGE_ONE);
        break;
      case "book":
        this.bookUser(false);
        break;
      case "bookAndCheckIn":
        this.bookUser(true);
        break;
      default:
        break;
    }
  }
  handlePageTwoDataUpdateEvent(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (event.detail.key === "propertyBookedBy") {
      this.handleBookedByInfoUpdate(event);
    }
    else {
      this.handleGuestInfoUpdate(event);
    }
  }
  async handleBlockDate() {
    const releaseData = getReleaseHoursString(+this.blockDatesData.RELEASE_AFTER_HOURS);
    await this.bookingService.blockUnit(Object.assign({ from_date: dateToFormattedString(this.bookingData.defaultDateRange.fromDate), to_date: dateToFormattedString(this.bookingData.defaultDateRange.toDate), NOTES: this.blockDatesData.OPTIONAL_REASON || "", pr_id: this.bookingData.PR_ID.toString(), STAY_STATUS_CODE: this.blockDatesData.OUT_OF_SERVICE
        ? "004"
        : this.blockDatesData.RELEASE_AFTER_HOURS === 0
          ? "002"
          : "003", DESCRIPTION: this.blockDatesData.RELEASE_AFTER_HOURS || "" }, releaseData));
    this.closeWindow();
  }
  async bookUser(assign_units) {
    this.setLoadingState(assign_units);
    try {
      if (["003", "002", "004"].includes(this.bookingData.STATUS_CODE)) {
        this.eventsService.deleteEvent(this.bookingData.POOL);
      }
      const arrivalTime = this.isEventType("EDIT_BOOKING")
        ? this.getArrivalTimeForBooking()
        : "";
      const pr_id = this.isEventType("BAR_BOOKING")
        ? this.bookingData.PR_ID
        : undefined;
      const booking_nbr = this.isEventType("EDIT_BOOKING")
        ? this.bookingData.ID
        : undefined;
      await this.bookingService.bookUser(this.bookedByInfoData, assign_units, this.bookingData.defaultDateRange.fromDate, this.bookingData.defaultDateRange.toDate, this.guestData, this.dateRangeData.dateDifference, this.sourceOption, this.propertyid, this.currency, booking_nbr, this.bookingData.GUEST, arrivalTime, pr_id);
      //console.log("booking data ", this.bookingData);
    }
    catch (error) {
      //  toastr.error(error);
    }
    finally {
      this.resetLoadingState();
    }
  }
  setLoadingState(assign_units) {
    if (this.isEventType("EDIT_BOOKING")) {
      this.isLoading = "save";
    }
    else {
      this.isLoading = assign_units ? "bookAndCheckIn" : "book";
    }
  }
  getArrivalTimeForBooking() {
    return this.bookedByInfoData.arrivalTime.find((e) => e.CODE_VALUE_EN === this.bookingData.ARRIVAL_TIME).CODE_NAME;
  }
  resetLoadingState() {
    this.isLoading = "";
    setTimeout(() => {
      this.closeWindow();
    }, 100);
  }
  render() {
    return (h(Host, null, h("div", { class: "background-overlay", onClick: () => this.closeWindow() }), h("div", { class: "sideWindow " +
        (this.isPageBlockDates()
          ? "col-sm-12 col-md-6 col-lg-5 col-xl-4"
          : "col-sm-12 col-md-11 col-lg-9 col-xl-8") }, h("div", { class: "card mb-0 shadow-none p-0" }, h("div", { class: "card-header" }, h("h3", { class: "card-title text-left pb-1 font-medium-2" }, this.isPageBlockDates()
      ? this.bookingData.BLOCK_DATES_TITLE
      : this.bookingData.TITLE), h("button", { type: "button", class: "close close-icon", onClick: () => this.closeWindow() }, h("i", { class: "ft-x" })))), this.isPageZero() && this.getPageZeroView(), this.isPageOne() && this.getPageOneView(), this.isPageTwo() && (h("igl-pagetwo", { countryNodeList: this.countryNodeList, isLoading: this.isLoading, selectedRooms: this.selectedRooms, bedPreferenceType: this.bedPreferenceType, dateRangeData: this.dateRangeData, bookingData: this.bookingData, showSplitBookingOption: this.showSplitBookingOption, language: this.language, bookedByInfoData: this.bookedByInfoData, isEditOrAddRoomEvent: this.isEventType("EDIT_BOOKING") || this.isEventType("ADD_ROOM"), onDataUpdateEvent: (event) => this.handlePageTwoDataUpdateEvent(event), onButtonClicked: (event) => this.handleButtonClicked(event) })), this.isPageBlockDates() ? this.getPageBlockDatesView() : null)));
  }
  static get is() { return "igl-book-property"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-book-property.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-book-property.css"]
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
      },
      "currency": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{ id: number; code: string }",
          "resolved": "{ id: number; code: string; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "bookingData": {
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
      "sourceOption": {},
      "splitBookingId": {},
      "renderAgain": {},
      "message": {},
      "isLoading": {},
      "isConvertedBooking": {},
      "dateRangeData": {},
      "selectedUnits": {}
    };
  }
  static get events() {
    return [{
        "method": "closeBookingWindow",
        "name": "closeBookingWindow",
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
        "name": "gotoSplitPageTwoEvent",
        "method": "gotoSplitPageTwo",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=igl-book-property.js.map
