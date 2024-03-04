'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const utils = require('./utils-3a7c81a3.js');
const locales_store = require('./locales.store-0567c122.js');
const calendarData = require('./calendar-data-d3bf3294.js');
const v4 = require('./v4-d89fec7e.js');
const booking_service = require('./booking.service-01352181.js');
const events_service = require('./events.service-f22aa466.js');
const utils$1 = require('./utils-21be1cd4.js');
const room_service = require('./room.service-844758c4.js');
const Token = require('./Token-7fd57fe8.js');
const room_service$1 = require('./room.service-844758c42.js');

const iglApplicationInfoCss = ".sc-igl-application-info-h{display:block}@media only screen and (min-width: 908px){.aplicationInfoContainer.sc-igl-application-info{max-width:80%}.guest-info-container.sc-igl-application-info{max-width:300px}.preference-select-container.sc-igl-application-info{max-width:250px}}";

const IglApplicationInfo = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataUpdateEvent = index.createEvent(this, "dataUpdateEvent", 7);
    this.userRate = 0;
    this.guestInfo = undefined;
    this.currency = undefined;
    this.roomsList = [];
    this.guestRefKey = undefined;
    this.bedPreferenceType = [];
    this.selectedUnits = [];
    this.bookingType = 'PLUS_BOOKING';
    this.defaultGuestPreference = undefined;
    this.index = undefined;
    this.defaultGuestRoomId = undefined;
    this.dateDifference = undefined;
    this.filterdRoomList = [];
    this.isButtonPressed = false;
    this.guestData = undefined;
  }
  componentWillLoad() {
    console.log(this.guestInfo);
    if (this.guestInfo.isRateModified && this.guestInfo.rateType === 2) {
      this.userRate = this.guestInfo.rate * this.dateDifference;
    }
    else {
      this.userRate = this.guestInfo.rate;
    }
    this.guestData = this.guestInfo ? Object.assign({}, this.guestInfo) : {};
    this.guestData.roomId = '';
    if (this.defaultGuestRoomId && this.roomsList.filter(e => e.id.toString() === this.defaultGuestRoomId.toString()).length > 0) {
      this.guestData.roomId = this.defaultGuestRoomId;
    }
    this.guestData.preference = +this.defaultGuestPreference || '';
    this.updateRoomList();
  }
  componentDidLoad() {
    this.timeout = setTimeout(() => {
      this.updateData();
    }, 200);
  }
  disconnectedCallback() {
    clearTimeout(this.timeout);
  }
  async handleSelctedUnits() {
    this.updateRoomList();
  }
  updateRoomList() {
    const units = [...this.selectedUnits];
    units[this.index] = -1;
    this.filterdRoomList = this.roomsList.filter(e => !units.includes(e.id));
  }
  updateData() {
    this.dataUpdateEvent.emit({
      key: 'roomRatePlanUpdate',
      guestRefKey: this.guestRefKey,
      data: Object.assign({}, this.guestData),
    });
  }
  handleDataChange(key, value) {
    this.guestData[key] = +value;
    if (value === '') {
      this.guestData['roomName'] = value;
    }
    if (key === 'roomId' && value !== '') {
      this.guestData['roomName'] = this.filterdRoomList.find(room => room.id === +value).name || '';
    }
    console.log('guest data', this.guestData);
    this.updateData();
  }
  handleGuestNameChange(event) {
    // console.log("On Guest name Change::", event.target.value);
    this.guestData.guestName = event.target.value;
    this.updateData();
  }
  handleButtonClicked(event) {
    switch (event.detail.key) {
      case 'book':
      case 'bookAndCheckIn':
      case 'save':
        this.isButtonPressed = true;
        break;
    }
  }
  render() {
    //console.log(this.guestInfo, this.roomsList);
    return (index.h(index.Host, null, index.h("div", { class: "text-left mt-1 " }, index.h("div", { class: " mb-1 " }, this.bookingType === 'PLUS_BOOKING' || this.bookingType === 'ADD_ROOM' || this.bookingType === 'EDIT_BOOKING' ? (index.h("span", { class: "h5 mr-1" }, this.guestInfo.roomCategoryName)) : null, index.h("span", { class: " font-weight-bold" }, this.guestInfo.ratePlanName.replace(this.guestInfo.roomCategoryName + '/', ''), index.h("ir-tooltip", { class: " mr-1", message: this.guestInfo.cancelation + this.guestInfo.guarantee })), index.h("span", null, this.guestInfo.adult_child_offering)), index.h("div", { class: "d-flex flex-column flex-md-row m-0 p-0 align-items-md-center aplicationInfoContainer " }, index.h("div", { class: "mr-1 flex-fill guest-info-container" }, index.h("input", { id: v4.v4(), type: "email", class: `form-control ${this.isButtonPressed && this.guestData.guestName === '' && 'border-danger'}`, placeholder: locales_store.locales.entries.Lcz_GuestFirstnameAndLastname, name: "guestName", onInput: event => this.handleGuestNameChange(event), required: true, value: this.guestData.guestName })), index.h("div", { class: 'mt-1 mt-md-0 d-flex align-items-center flex-fill' }, calendarData.calendar_data.is_frontdesk_enabled && (this.bookingType === 'PLUS_BOOKING' || this.bookingType === 'ADD_ROOM' || this.bookingType === 'EDIT_BOOKING') ? (index.h("div", { class: "mr-1 p-0 flex-fill  preference-select-container" }, index.h("select", { class: `form-control  input-sm pr-0`, id: v4.v4(), onChange: event => this.handleDataChange('roomId', event.target.value) }, index.h("option", { value: "", selected: this.guestData.roomId === '' }, locales_store.locales.entries.Lcz_Assignunits), this.filterdRoomList.map(room => (index.h("option", { value: room.id, selected: +this.guestData.roomId === room.id }, room.name)))))) : null, this.guestData.is_bed_configuration_enabled && (index.h("div", { class: "mr-1 flex-fill" }, index.h("select", { class: `form-control input-sm ${this.isButtonPressed && (this.guestData.preference === '' || this.guestData.preference === 0) && 'border-danger'}`, id: v4.v4(), onChange: event => this.handleDataChange('preference', event.target.value) }, index.h("option", { value: "", selected: this.guestData.preference === '' }, locales_store.locales.entries.Lcz_BedConfiguration), this.bedPreferenceType.map(data => (index.h("option", { value: +data.CODE_NAME, selected: this.guestData.preference === +data.CODE_NAME }, data.CODE_VALUE_EN)))))), index.h("div", { class: "" }, utils.getCurrencySymbol(this.currency.code) + Number(this.userRate).toFixed(2), "/", locales_store.locales.entries.Lcz_Stay))))));
  }
  static get watchers() { return {
    "selectedUnits": ["handleSelctedUnits"]
  }; }
};
IglApplicationInfo.style = iglApplicationInfoCss;

const iglBlockDatesViewCss = ".sc-igl-block-dates-view-h{display:block}.sc-igl-block-dates-view-h .controlContainer.sc-igl-block-dates-view{width:24px}.sc-igl-block-dates-view-h .checkBoxContainer.sc-igl-block-dates-view input.sc-igl-block-dates-view{height:1.2rem !important;width:30px}.releaseTime.sc-igl-block-dates-view{padding-left:5px}.out-of-service-label.sc-igl-block-dates-view{margin-left:5px !important}";

const IglBlockDatesView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataUpdateEvent = index.createEvent(this, "dataUpdateEvent", 7);
    this.blockDatesData = {
      RELEASE_AFTER_HOURS: 0,
      OPTIONAL_REASON: '',
      OUT_OF_SERVICE: false,
    }; // Change of property name might require updates in booking-event-hover
    this.releaseList = [];
    this.bookingService = new booking_service.BookingService();
    this.defaultData = undefined;
    this.fromDate = undefined;
    this.toDate = undefined;
    this.entryDate = undefined;
    this.entryHour = undefined;
    this.isEventHover = false;
    this.entryMinute = undefined;
    this.renderAgain = false;
  }
  async componentWillLoad() {
    try {
      this.bookingService.setToken(calendarData.calendar_data.token);
      this.releaseList = await this.bookingService.getBlockedInfo();
      if (this.defaultData) {
        this.blockDatesData = Object.assign({}, this.defaultData);
      }
      else {
        this.blockDatesData.RELEASE_AFTER_HOURS = parseInt(this.releaseList[0].CODE_NAME);
        this.emitData();
      }
    }
    catch (error) {
      // toastr.error(error);
    }
  }
  handleOptionalReason(event) {
    this.blockDatesData.OPTIONAL_REASON = event.target.value;
    this.emitData();
  }
  handleReleaseAfterChange(evt) {
    if (this.entryDate)
      this.entryDate = undefined;
    this.blockDatesData.RELEASE_AFTER_HOURS = parseInt(evt.target.value);
    this.renderPage();
    this.emitData();
  }
  emitData() {
    this.dataUpdateEvent.emit({
      key: 'blockDatesData',
      data: Object.assign({}, this.blockDatesData),
    });
  }
  getReleaseHoursString() {
    // console.log("entry date", this.entryDate);
    // console.log("blocked date data", this.blockDatesData);
    let dt = this.entryDate ? new Date(this.entryDate) : new Date();
    if (this.entryDate && this.entryHour && this.entryMinute) {
      dt.setHours(this.entryHour, this.entryMinute, 0, 0);
    }
    else {
      dt.setHours(dt.getHours() + this.blockDatesData.RELEASE_AFTER_HOURS, dt.getMinutes(), 0, 0);
    }
    return dt.toLocaleString('default', { month: 'short' }) + ' ' + dt.getDate() + ', ' + this.formatNumber(dt.getHours()) + ':' + this.formatNumber(dt.getMinutes());
  }
  formatNumber(value) {
    return value < 10 ? `0${value}` : value;
  }
  handleOutOfService(evt) {
    this.blockDatesData.OUT_OF_SERVICE = evt.target.checked;
    if (this.blockDatesData.OUT_OF_SERVICE) {
      this.blockDatesData.OPTIONAL_REASON = '';
      this.blockDatesData.RELEASE_AFTER_HOURS = 0;
    }
    this.renderPage();
    this.emitData();
  }
  renderPage() {
    this.renderAgain = !this.renderAgain;
  }
  render() {
    console.log(this.fromDate);
    return (index.h(index.Host, null, index.h("div", { class: `m-0 p-0 mb-1` }, index.h("div", { class: "text-left p-0" }, index.h("ir-date-view", { from_date: this.fromDate, dateOption: "DD MMM YYYY", showDateDifference: false, to_date: this.toDate }))), index.h("div", { class: ` mb-1 text-left ${this.isEventHover && 'p-0'}` }, index.h("div", { class: "mb-1 " }, index.h("label", { class: "p-0 text-bold-700 font-medium-1 m-0 align-middle" }, locales_store.locales.entries.Lcz_Reason, ":"), index.h("div", { class: "p-0 m-0 pr-1  controlContainer checkBoxContainer d-inline-block align-middle" }, index.h("input", { class: "form-control", type: "checkbox", checked: this.blockDatesData.OUT_OF_SERVICE, id: "userinput6", onChange: event => this.handleOutOfService(event) })), index.h("span", { class: "align-middle out-of-service-label" }, locales_store.locales.entries.Lcz_OutOfservice)), !this.blockDatesData.OUT_OF_SERVICE ? (index.h("div", null, index.h("div", { class: "mb-1 d-flex  align-items-center" }, index.h("span", { class: "align-middle" }, locales_store.locales.entries.Lcz_Or, " "), index.h("div", { class: "d-inline-flex col pr-0 align-middle" }, index.h("input", { class: "form-control", type: "text", placeholder: locales_store.locales.entries.Lcz_OptionalReason, id: "optReason", value: this.blockDatesData.OPTIONAL_REASON, onInput: event => this.handleOptionalReason(event) }))), index.h("div", { class: "mb-1 w-100 pr-0 " }, index.h("span", { class: "text-bold-700 font-medium-1" }, locales_store.locales.entries.Lcz_AutomaticReleaseIn, ": "), index.h("div", { class: "d-inline-block" }, index.h("select", { class: "form-control input-sm", id: "zSmallSelect", onChange: evt => this.handleReleaseAfterChange(evt) }, this.releaseList.map(releaseItem => (index.h("option", { value: +releaseItem.CODE_NAME, selected: this.blockDatesData.RELEASE_AFTER_HOURS == +releaseItem.CODE_NAME }, releaseItem.CODE_VALUE_EN))))), this.blockDatesData.RELEASE_AFTER_HOURS ? (index.h("div", { class: "d-inline-block releaseTime" }, index.h("em", null, locales_store.locales.entries.Lcz_On, " ", this.getReleaseHoursString()))) : null))) : null)));
  }
};
IglBlockDatesView.style = iglBlockDatesViewCss;

//import { BookingService } from '../../../services/booking.service';
class IglBookPropertyService {
  setBookingInfoFromAutoComplete(context, res) {
    context.bookedByInfoData = {
      id: res.guest.id,
      email: res.guest.email,
      firstName: res.guest.first_name,
      lastName: res.guest.last_name,
      countryId: res.guest.country_id,
      isdCode: res.guest.country_id.toString(),
      contactNumber: res.guest.mobile,
      selectedArrivalTime: res.arrival,
      emailGuest: res.guest.subscribe_to_news_letter,
      message: res.remark,
      cardNumber: '',
      cardHolderName: '',
      expiryMonth: '',
      expiryYear: '',
      bookingNumber: res.booking_nbr,
      rooms: res.rooms,
      from_date: res.from_date,
      to_date: res.to_date,
    };
  }
  resetRoomsInfoAndMessage(context) {
    context.defaultData.roomsInfo = [];
    context.message = '';
  }
  onDataRoomUpdate(event, selectedUnits, isEdit, isEditBooking, name) {
    let units = selectedUnits;
    const { data, key, changedKey } = event.detail;
    const roomCategoryKey = `c_${data.roomCategoryId}`;
    const ratePlanKey = `p_${data.ratePlanId}`;
    if (this.shouldClearData(key)) {
      units = new Map();
    }
    this.initializeRoomCategoryIfNeeded(roomCategoryKey, units);
    if (isEditBooking) {
      if (changedKey === 'rate') {
        if (units.has(roomCategoryKey) && units.get(roomCategoryKey).has(ratePlanKey)) {
          this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, units, name, isEdit);
        }
      }
      else {
        if (changedKey !== 'rateType') {
          if (changedKey === 'adult_child_offering') {
            if (units.has(roomCategoryKey) && selectedUnits.get(roomCategoryKey).has(ratePlanKey)) {
              this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, units, name, isEdit);
            }
          }
          else {
            this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, units, name, isEdit);
          }
        }
      }
    }
    else {
      this.setSelectedRoomData(roomCategoryKey, ratePlanKey, data, units);
    }
    this.cleanupEmptyData(roomCategoryKey, units);
    return units;
  }
  shouldClearData(key) {
    return key === 'clearData' || key === 'EDIT_BOOKING';
  }
  initializeRoomCategoryIfNeeded(roomCategoryKey, selectedUnits) {
    if (!selectedUnits.has(roomCategoryKey)) {
      selectedUnits.set(roomCategoryKey, new Map());
    }
  }
  setSelectedRoomData(roomCategoryKey, ratePlanKey, data, selectedUnits) {
    let selectedRatePlans = selectedUnits.get(roomCategoryKey);
    if (data.totalRooms === 0 || data.inventory === 0) {
      selectedRatePlans.delete(ratePlanKey);
    }
    else {
      selectedUnits.set(roomCategoryKey, selectedRatePlans.set(ratePlanKey, Object.assign(Object.assign({}, data), { selectedUnits: Array(data.totalRooms).fill(-1) })));
    }
  }
  cleanupEmptyData(roomCategoryKey, selectedUnits) {
    if (selectedUnits.has(roomCategoryKey)) {
      let selectedRatePlans = selectedUnits.get(roomCategoryKey);
      if (selectedRatePlans.size === 0) {
        selectedUnits.delete(roomCategoryKey);
      }
    }
  }
  applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, selectedUnits, name, isEdit) {
    selectedUnits.clear();
    let res = {};
    if (isEdit) {
      res = Object.assign(Object.assign({}, data), { guestName: name || '', roomId: '' });
    }
    else {
      res = Object.assign({}, data);
    }
    selectedUnits.set(roomCategoryKey, new Map().set(ratePlanKey, res));
  }
  async prepareBookUserServiceParams(context, check_in, sourceOption) {
    try {
      const arrivalTime = context.isEventType('EDIT_BOOKING')
        ? context.getArrivalTimeForBooking()
        : context.isEventType('ADD_ROOM')
          ? context.bookingData.ARRIVAL.code
          : context.isEventType('SPLIT_BOOKING')
            ? context.bookedByInfoData.selectedArrivalTime.code
            : '';
      const pr_id = context.isEventType('BAR_BOOKING') ? context.bookingData.PR_ID : undefined;
      const bookingNumber = context.isEventType('EDIT_BOOKING') || context.isEventType('ADD_ROOM')
        ? context.bookingData.BOOKING_NUMBER
        : context.isEventType('SPLIT_BOOKING')
          ? context.bookedByInfoData.bookingNumber
          : undefined;
      let rooms = [];
      if (context.isEventType('ADD_ROOM')) {
        // const result = await (context.bookingService as BookingService).getExoposedBooking(bookingNumber, context.language);
        //rooms = result.rooms;
        rooms = context.bookingData.ROOMS;
      }
      else if (context.isEventType('SPLIT_BOOKING')) {
        rooms = context.bookedByInfoData.rooms;
      }
      else if (context.isEventType('EDIT_BOOKING')) {
        rooms = context.defaultData.ROOMS.filter(room => room.identifier !== context.bookingData.IDENTIFIER);
      }
      console.log('rooms', rooms);
      return [
        context.bookedByInfoData,
        check_in,
        new Date(context.dateRangeData.fromDate),
        new Date(context.dateRangeData.toDate),
        context.guestData,
        context.dateRangeData.dateDifference,
        sourceOption,
        context.propertyid,
        rooms,
        context.currency,
        bookingNumber,
        context.bookingData.GUEST,
        arrivalTime,
        pr_id,
        context.bookingData.IDENTIFIER,
      ];
    }
    catch (error) {
      console.log(error);
    }
  }
  getBookingPreferenceRoomId(bookingData) {
    return (bookingData.hasOwnProperty('PR_ID') && bookingData.PR_ID) || null;
  }
  getRoomCategoryByRoomId(bookingData) {
    var _a;
    return (_a = bookingData.roomsInfo) === null || _a === void 0 ? void 0 : _a.find(roomCategory => {
      return roomCategory.id === bookingData.RATE_TYPE;
    });
  }
  setEditingRoomInfo(bookingData, selectedUnits) {
    console.log(bookingData, bookingData.roomsInfo);
    console.log(this.getBookingPreferenceRoomId(bookingData));
    const category = this.getRoomCategoryByRoomId(bookingData);
    const room_id = !category ? '' : `c_${category === null || category === void 0 ? void 0 : category.id}`;
    const ratePlanId = `p_${bookingData.RATE_PLAN_ID}`;
    const data = {
      adultCount: bookingData.ADULTS_COUNT,
      rate: bookingData.RATE,
      rateType: bookingData.RATE_TYPE,
      ratePlanId: bookingData.RATE_PLAN_ID,
      roomCategoryId: category ? category.id : '',
      roomCategoryName: category ? category.name : '',
      totalRooms: 1,
      ratePlanName: bookingData.RATE_PLAN,
      roomId: bookingData.PR_ID,
      guestName: bookingData.NAME,
      cancelation: bookingData.cancelation,
      guarantee: bookingData.guarantee,
      adult_child_offering: bookingData.adult_child_offering,
    };
    selectedUnits.set(room_id, new Map().set(ratePlanId, data));
  }
}

const iglBookPropertyCss = ".sc-igl-book-property-h{position:fixed;top:0;right:0;width:100vw;height:100vh;z-index:99}.card-title.sc-igl-book-property{border-bottom:1px solid #e4e5ec;width:100%}.scrollContent.sc-igl-book-property{height:calc(100% - 79px);overflow:auto;position:relative}.background-overlay.sc-igl-book-property{position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.25)}.formContainer.sc-igl-book-property{height:calc(100% - 79px);overflow:auto}.gap-30.sc-igl-book-property{gap:30px}.block-date.sc-igl-book-property{width:100%}.sideWindow.sc-igl-book-property{position:absolute;top:0;right:0;height:100%;background-color:#ffffff;width:100vw;overflow-y:auto}.card.sc-igl-book-property{top:0;z-index:1000}.close.sc-igl-book-property{float:right;font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:0.5;padding:0;background-color:transparent;border:0;appearance:none}.close-icon.sc-igl-book-property{position:absolute;top:18px;right:33px;outline:none}button.sc-igl-book-property:not(:disabled),[type='button'].sc-igl-book-property:not(:disabled){cursor:pointer}.row.sc-igl-book-property{padding:0 0 0 15px;margin:0}@media only screen and (min-width: 1200px){.sideWindow.sc-igl-book-property{max-width:70%}}@media only screen and (min-width: 2000px){.sideWindow.sc-igl-book-property{max-width:40%}}@media only screen and (min-width: 768px) and (max-width: 1200px){.sideWindow.sc-igl-book-property{max-width:90%}}@media only screen and (min-width: 600px) and (max-width: 768px){.sideWindow.sc-igl-book-property{max-width:75%}}@media only screen and (min-width: 641px){.block-date.sc-igl-book-property{max-width:450px}}";

const IglBookProperty = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.closeBookingWindow = index.createEvent(this, "closeBookingWindow", 7);
    this.bookingCreated = index.createEvent(this, "bookingCreated", 7);
    this.blockedCreated = index.createEvent(this, "blockedCreated", 7);
    this.resetBookingData = index.createEvent(this, "resetBookingData", 7);
    this.animateIrButton = index.createEvent(this, "animateIrButton", 7);
    this.animateIrSelect = index.createEvent(this, "animateIrSelect", 7);
    this.toast = index.createEvent(this, "toast", 7);
    this.initialRoomIds = null;
    this.showSplitBookingOption = false;
    this.sourceOptions = [];
    this.guestData = [];
    this.bookedByInfoData = {};
    this.blockDatesData = {};
    this.ratePricingMode = [];
    this.selectedUnits = new Map();
    this.bedPreferenceType = [];
    this.bookingService = new booking_service.BookingService();
    this.bookPropertyService = new IglBookPropertyService();
    this.eventsService = new events_service.EventsService();
    this.propertyid = undefined;
    this.allowedBookingSources = undefined;
    this.language = undefined;
    this.countryNodeList = undefined;
    this.showPaymentDetails = false;
    this.currency = undefined;
    this.bookingData = undefined;
    this.adultChildConstraints = undefined;
    this.adultChildCount = {
      adult: 0,
      child: 0,
    };
    this.renderAgain = false;
    this.dateRangeData = undefined;
    this.defaultData = undefined;
    this.isLoading = undefined;
    this.buttonName = '';
  }
  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.closeWindow();
    }
    else
      return;
  }
  componentDidLoad() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  clearBooking(e) {
    if (this.isEventType('SPLIT_BOOKING')) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      this.bookedByInfoData = {};
      this.bookPropertyService.resetRoomsInfoAndMessage(this);
      this.renderPage();
    }
  }
  async handleSpiltBookingSelected(e) {
    e.stopImmediatePropagation();
    const { key, data } = e.detail;
    if (key === 'select') {
      const res = await this.bookingService.getExposedBooking(data.booking_nbr, this.language);
      this.bookPropertyService.setBookingInfoFromAutoComplete(this, res);
      this.sourceOption = res.source;
      this.renderPage();
    }
    else if (key === 'blur' && data !== '') {
      const res = await this.bookingService.getExposedBooking(data, this.language);
      this.bookPropertyService.setBookingInfoFromAutoComplete(this, res);
      this.sourceOption = res.source;
      this.renderPage();
    }
  }
  async componentWillLoad() {
    this.bookingService.setToken(calendarData.calendar_data.token);
    this.eventsService.setToken(calendarData.calendar_data.token);
    this.defaultDateRange = { from_date: this.bookingData.FROM_DATE, to_date: this.bookingData.TO_DATE };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    if (!this.bookingData.defaultDateRange) {
      return;
    }
    this.defaultData = this.bookingData;
    this.dateRangeData = Object.assign({}, this.defaultData.defaultDateRange);
    try {
      const setupEntries = await this.fetchSetupEntries();
      console.log(setupEntries);
      this.setSourceOptions(this.allowedBookingSources);
      this.setOtherProperties(setupEntries);
      if (this.isEventType('EDIT_BOOKING')) {
        this.adultChildCount = {
          adult: this.defaultData.ADULTS_COUNT,
          child: this.defaultData.CHILDREN_COUNT,
        };
        this.initialRoomIds = {
          roomName: this.defaultData.roomName,
          ratePlanId: this.defaultData.RATE_PLAN_ID,
          roomId: this.defaultData.PR_ID,
          roomTypeId: this.defaultData.RATE_TYPE,
        };
        this.bookPropertyService.setEditingRoomInfo(this.defaultData, this.selectedUnits);
      }
      if (!this.isEventType('BAR_BOOKING')) {
        this.bookPropertyService.resetRoomsInfoAndMessage(this);
      }
      if (this.defaultData.event_type === 'SPLIT_BOOKING') {
        this.showSplitBookingOption = true;
        this.page = 'page_one';
      }
      else if (this.defaultData.event_type === 'BLOCK_DATES') {
        this.page = 'page_block_date';
      }
      else {
        this.page = 'page_one';
      }
    }
    catch (error) {
      console.error('Error fetching setup entries:', error);
    }
  }
  async fetchSetupEntries() {
    console.log('fetch setup entries');
    return await this.bookingService.fetchSetupEntries();
  }
  isGuestDataIncomplete() {
    //|| data.roomId === '' || data.roomId === 0 if the roomId is required
    if (this.guestData.length === 0) {
      return true;
    }
    console.log(this.guestData);
    for (const data of this.guestData) {
      if (data.guestName === '' || ((data.preference === '' || data.preference === 0) && data.is_bed_configuration_enabled)) {
        return true;
      }
    }
    return false;
  }
  isButtonDisabled() {
    const isValidProperty = (property, key, comparedBy) => {
      if (!property) {
        return true;
      }
      if (property === this.guestData) {
        return this.isGuestDataIncomplete();
      }
      // const isCardDetails = ['cardNumber', 'cardHolderName', 'expiryMonth', 'expiryYear'].includes(key);
      // if (!this.showPaymentDetails && isCardDetails) {
      //   return false;
      // }
      if (key === 'selectedArrivalTime') {
        if (property[key] !== undefined) {
          return property[key].code === '';
        }
        else {
          return true;
        }
      }
      return property[key] === comparedBy || property[key] === undefined;
    };
    return (isValidProperty(this.guestData, 'guestName', '') ||
      // isValidProperty(this.bookedByInfoData, 'isdCode', '') ||
      // isValidProperty(this.bookedByInfoData, 'contactNumber', '') ||
      isValidProperty(this.bookedByInfoData, 'firstName', '') ||
      isValidProperty(this.bookedByInfoData, 'lastName', '') ||
      // isValidProperty(this.bookedByInfoData, 'countryId', -1) ||
      isValidProperty(this.bookedByInfoData, 'selectedArrivalTime', '') ||
      isValidProperty(this.bookedByInfoData, 'email', ''));
  }
  setSourceOptions(bookingSource) {
    this.sourceOptions = bookingSource.map(source => ({
      id: source.code,
      value: source.description,
      tag: source.tag,
      type: source.type,
    }));
    if (this.isEventType('EDIT_BOOKING')) {
      this.sourceOption = Object.assign({}, this.defaultData.SOURCE);
    }
    else {
      this.sourceOption = {
        code: bookingSource[0].code,
        description: bookingSource[0].description,
        tag: bookingSource[0].tag,
      };
    }
  }
  setOtherProperties(res) {
    this.ratePricingMode = res === null || res === void 0 ? void 0 : res.ratePricingMode;
    this.bookedByInfoData.arrivalTime = res.arrivalTime;
    this.bedPreferenceType = res.bedPreferenceType;
  }
  handleAdultChildChange(event) {
    if (this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING')) {
      this.bookPropertyService.resetRoomsInfoAndMessage(this);
    }
    this.adultChildCount = Object.assign({}, event.detail);
  }
  async initializeBookingAvailability(from_date, to_date) {
    try {
      const room_type_ids = this.defaultData.roomsInfo.map(room => room.id);
      const data = await this.bookingService.getBookingAvailability(from_date, to_date, this.propertyid, this.adultChildCount, this.language, room_type_ids, this.currency);
      if (!this.isEventType('EDIT_BOOKING')) {
        this.defaultData.defaultDateRange.fromDate = new Date(this.dateRangeData.fromDate);
        this.defaultData.defaultDateRange.toDate = new Date(this.dateRangeData.toDate);
      }
      this.defaultData = Object.assign(Object.assign({}, this.defaultData), { roomsInfo: data.roomtypes });
    }
    catch (error) {
      // toastr.error(error);
    }
  }
  getRoomCategoryByRoomId(roomId) {
    var _a;
    return (_a = this.defaultData.roomsInfo) === null || _a === void 0 ? void 0 : _a.find(roomCategory => {
      return roomCategory.physicalrooms.find(room => room.id === +roomId);
    });
  }
  getSplitBookings() {
    return (this.defaultData.hasOwnProperty('splitBookingEvents') && this.defaultData.splitBookingEvents) || [];
  }
  closeWindow() {
    this.dateRangeData = {};
    this.closeBookingWindow.emit();
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  isEventType(key) {
    return this.defaultData.event_type === key;
  }
  onDateRangeSelect(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const opt = event.detail;
    if (opt.key === 'selectedDateRange') {
      this.dateRangeData = opt.data;
      if (this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING')) {
        this.defaultData.roomsInfo = [];
      }
      else if (this.adultChildCount.adult !== 0) {
        this.initializeBookingAvailability(utils.dateToFormattedString(new Date(this.dateRangeData.fromDate)), utils.dateToFormattedString(new Date(this.dateRangeData.toDate)));
      }
    }
  }
  handleBlockDateUpdate(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const opt = event.detail;
    this.blockDatesData = opt.data;
  }
  handleGuestInfoUpdate(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const opt = event.detail;
    if (opt.guestRefKey) {
      if (this.isEventType('BAR_BOOKING') || this.isEventType('SPLIT_BOOKING')) {
        this.guestData[opt.guestRefKey] = Object.assign(Object.assign({}, opt.data), { roomId: this.defaultData.PR_ID });
      }
      else
        this.guestData[opt.guestRefKey] = opt.data;
    }
  }
  handleBookedByInfoUpdate(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const opt = event.detail;
    this.bookedByInfoData = opt.value.data;
  }
  handleSourceDropDown(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const value = event.detail;
    const selectedSource = this.sourceOptions.find(opt => opt.id === value.toString());
    this.sourceOption = {
      code: value,
      description: selectedSource.value || '',
      tag: selectedSource.tag,
    };
  }
  renderPage() {
    this.renderAgain = !this.renderAgain;
  }
  gotoSplitPageTwo() {
    this.gotoPage('page_two');
  }
  gotoPage(gotoPage) {
    this.page = gotoPage;
    this.renderPage();
  }
  showSplitBooking() {
    this.showSplitBookingOption = true;
    this.gotoPage('page_one');
  }
  getPageBlockDatesView() {
    return (index.h(index.Fragment, null, index.h("igl-block-dates-view", { fromDate: this.dateRangeData.fromDateStr, toDate: this.dateRangeData.toDateStr, entryDate: this.defaultData.ENTRY_DATE, onDataUpdateEvent: event => this.handleBlockDateUpdate(event) }), index.h("div", { class: "p-0 mb-1 mt-2 gap-30 d-flex align-items-center justify-content-between" }, index.h("button", { class: "btn btn-secondary flex-fill", onClick: () => this.closeWindow() }, locales_store.locales.entries.Lcz_Cancel), index.h("button", { class: "btn btn-primary flex-fill", onClick: () => this.handleBlockDate() }, locales_store.locales.entries.Lcz_Blockdates))));
  }
  handleButtonClicked(event) {
    var _a, _b;
    switch (event.detail.key) {
      case 'save':
        this.bookUser(false);
        break;
      case 'cancel':
        event.stopImmediatePropagation();
        event.stopPropagation();
        this.closeWindow();
        break;
      case 'back':
        event.stopImmediatePropagation();
        event.stopPropagation();
        this.gotoPage('page_one');
        break;
      case 'book':
        this.bookUser(false);
        this.buttonName = 'book';
        break;
      case 'bookAndCheckIn':
        this.bookUser(true);
        this.buttonName = 'bookAndCheckIn';
        break;
      case 'next':
        event.stopImmediatePropagation();
        event.stopPropagation();
        if (!((_a = this.adultChildCount) === null || _a === void 0 ? void 0 : _a.adult)) {
          this.animateIrSelect.emit('adult_child_select');
          break;
        }
        if (this.selectedUnits.size > 0) {
          this.gotoPage('page_two');
          break;
        }
        else {
          if (((_b = this.defaultData) === null || _b === void 0 ? void 0 : _b.roomsInfo.length) === 0) {
            this.animateIrButton.emit('check_availability');
            break;
          }
        }
        this.toast.emit({
          type: 'error',
          description: locales_store.locales.entries.Lcz_SelectRatePlan,
          title: locales_store.locales.entries.Lcz_SelectRatePlan,
        });
        break;
      case 'check':
        this.initializeBookingAvailability(utils.dateToFormattedString(new Date(this.dateRangeData.fromDate)), utils.dateToFormattedString(new Date(this.dateRangeData.toDate)));
        break;
    }
  }
  handlePageTwoDataUpdateEvent(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (event.detail.key === 'propertyBookedBy') {
      this.handleBookedByInfoUpdate(event);
    }
    else {
      this.handleGuestInfoUpdate(event);
    }
  }
  async handleBlockDate() {
    const releaseData = utils.getReleaseHoursString(+this.blockDatesData.RELEASE_AFTER_HOURS);
    const result = await this.bookingService.blockUnit(Object.assign({ from_date: utils.dateToFormattedString(this.defaultData.defaultDateRange.fromDate), to_date: utils.dateToFormattedString(this.defaultData.defaultDateRange.toDate), NOTES: this.blockDatesData.OPTIONAL_REASON || '', pr_id: this.defaultData.PR_ID.toString(), STAY_STATUS_CODE: this.blockDatesData.OUT_OF_SERVICE ? '004' : this.blockDatesData.RELEASE_AFTER_HOURS === 0 ? '002' : '003', DESCRIPTION: this.blockDatesData.RELEASE_AFTER_HOURS || '' }, releaseData));
    const blockedUnit = await booking_service.transformNewBLockedRooms(result);
    this.blockedCreated.emit(blockedUnit);
    this.closeWindow();
  }
  async bookUser(check_in) {
    this.setLoadingState(check_in);
    console.log('edit save clicked');
    if (this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM')) {
      if (this.isGuestDataIncomplete()) {
        this.isLoading = '';
        return;
      }
    }
    else {
      if (this.isButtonDisabled()) {
        this.isLoading = '';
        return;
      }
    }
    try {
      console.log('clicked');
      if (['003', '002', '004'].includes(this.defaultData.STATUS_CODE)) {
        this.eventsService.deleteEvent(this.defaultData.POOL);
      }
      if (this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM')) {
        this.bookedByInfoData.message = this.defaultData.NOTES;
      }
      const serviceParams = await this.bookPropertyService.prepareBookUserServiceParams(this, check_in, this.sourceOption);
      await this.bookingService.bookUser(...serviceParams);
      this.resetBookingData.emit(null);
    }
    catch (error) {
      // Handle error
    }
    finally {
      this.resetLoadingState();
    }
  }
  setLoadingState(assign_units) {
    if (this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM')) {
      this.isLoading = 'save';
    }
    else {
      this.isLoading = assign_units ? 'bookAndCheckIn' : 'book';
    }
  }
  getArrivalTimeForBooking() {
    return this.bookedByInfoData.arrivalTime.find(e => e.CODE_VALUE_EN === this.defaultData.ARRIVAL_TIME).CODE_NAME;
  }
  resetLoadingState() {
    this.isLoading = '';
    setTimeout(() => {
      this.closeWindow();
    }, 100);
  }
  onRoomDataUpdate(event) {
    const units = this.bookPropertyService.onDataRoomUpdate(event, this.selectedUnits, this.isEventType('EDIT_BOOKING'), this.isEventType('EDIT_BOOKING') || this.isEventType('SPLIT_BOOKING') || this.isEventType('BAR_BOOKING'), this.defaultData.NAME);
    this.selectedUnits = new Map(units);
    this.renderPage();
  }
  getCurrentPage(name) {
    return this.page === name;
  }
  render() {
    //console.log('render');
    return (index.h(index.Host, null, index.h("div", { class: "background-overlay", onClick: () => this.closeWindow() }), index.h("div", { class: 'sideWindow ' + (this.getCurrentPage('page_block_date') ? 'block-date' : '') }, index.h("div", { class: "card position-sticky mb-0 shadow-none p-0 " }, index.h("div", { class: "d-flex mt-2 align-items-center justify-content-between  " }, index.h("h3", { class: "card-title text-left pb-1 font-medium-2 px-2 px-md-3" }, this.getCurrentPage('page_block_date') ? this.defaultData.BLOCK_DATES_TITLE : this.defaultData.TITLE), index.h("ir-icon", { class: "close close-icon", onIconClickHandler: () => {
        this.closeWindow();
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, index.h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" }))))), index.h("div", { class: "px-2 px-md-3" }, this.getCurrentPage('page_one') && (index.h("igl-booking-overview-page", { initialRoomIds: this.initialRoomIds, defaultDaterange: this.defaultDateRange, class: 'p-0 mb-1', eventType: this.defaultData.event_type, selectedRooms: this.selectedUnits, currency: this.currency, showSplitBookingOption: this.showSplitBookingOption, ratePricingMode: this.ratePricingMode, dateRangeData: this.dateRangeData, bookingData: this.defaultData, adultChildCount: this.adultChildCount, bookedByInfoData: this.bookedByInfoData,
      // bookingDataDefaultDateRange={this.dateRangeData}
      adultChildConstraints: this.adultChildConstraints, onRoomsDataUpdate: evt => {
        this.onRoomDataUpdate(evt);
      }, sourceOptions: this.sourceOptions, propertyId: this.propertyid })), this.getCurrentPage('page_two') && (index.h("igl-pagetwo", { currency: this.currency, propertyId: this.propertyid, showPaymentDetails: this.showPaymentDetails, selectedGuestData: this.guestData, countryNodeList: this.countryNodeList, isLoading: this.isLoading, selectedRooms: this.selectedUnits, bedPreferenceType: this.bedPreferenceType, dateRangeData: this.dateRangeData, bookingData: this.defaultData, showSplitBookingOption: this.showSplitBookingOption, language: this.language, bookedByInfoData: this.bookedByInfoData, defaultGuestData: this.defaultData, isEditOrAddRoomEvent: this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM'), onDataUpdateEvent: event => this.handlePageTwoDataUpdateEvent(event) })), this.getCurrentPage('page_block_date') ? this.getPageBlockDatesView() : null))));
  }
};
IglBookProperty.style = iglBookPropertyCss;

const iglBookPropertyContainerCss = ".sc-igl-book-property-container-h{display:block;margin:0;padding:0;letter-spacing:0px !important;font-family:'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;font-size:1rem !important;font-weight:400 !important;line-height:1.45 !important;color:#6b6f82 !important;text-align:left !important}.book-container.sc-igl-book-property-container{width:min-content;margin:0;padding:0}h3.sc-igl-book-property-container{font-size:1rem}";

const IglBookPropertyContainer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.resetBookingData = index.createEvent(this, "resetBookingData", 7);
    this.bookingService = new utils$1.BookingService();
    this.roomService = new room_service.RoomService();
    this.language = '';
    this.ticket = '';
    this.baseurl = '';
    this.propertyid = undefined;
    this.from_date = undefined;
    this.to_date = undefined;
    this.withIrToastAndInterceptor = true;
    this.bookingItem = undefined;
    this.showPaymentDetails = undefined;
    this.countryNodeList = undefined;
    this.calendarData = {};
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
  async initializeApp() {
    try {
      const [roomResponse, languageTexts, countriesList] = await Promise.all([
        this.roomService.fetchData(this.propertyid, this.language),
        this.roomService.fetchLanguage(this.language),
        this.bookingService.getCountries(this.language),
      ]);
      if (!locales_store.locales.entries) {
        locales_store.locales.entries = languageTexts.entries;
        locales_store.locales.direction = languageTexts.direction;
      }
      this.countryNodeList = countriesList;
      const { allowed_payment_methods: paymentMethods, currency, allowed_booking_sources, adult_child_constraints, calendar_legends } = roomResponse['My_Result'];
      this.calendarData = { currency, allowed_booking_sources, adult_child_constraints, legendData: calendar_legends };
      this.setRoomsData(roomResponse);
      const paymentCodesToShow = ['001', '004'];
      this.showPaymentDetails = paymentMethods.some(method => paymentCodesToShow.includes(method.code));
    }
    catch (error) {
      console.error('Error initializing app:', error);
    }
  }
  componentWillLoad() {
    if (this.baseurl) {
      Token.axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      calendarData.calendar_data.token = this.ticket;
      this.bookingService.setToken(this.ticket);
      this.roomService.setToken(this.ticket);
      this.initializeApp();
    }
  }
  async ticketChanged() {
    calendarData.calendar_data.token = this.ticket;
    this.bookingService.setToken(this.ticket);
    this.roomService.setToken(this.ticket);
    this.initializeApp();
  }
  handleCloseBookingWindow() {
    this.bookingItem = null;
  }
  handleTriggerClicked() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.bookingItem = {
      FROM_DATE: this.from_date,
      defaultDateRange: {
        fromDate: new Date(),
        fromDateStr: '',
        toDate: tomorrow,
        toDateStr: '',
        dateDifference: 0,
        message: '',
      },
      TO_DATE: this.to_date,
      EMAIL: '',
      event_type: 'PLUS_BOOKING',
      ID: '',
      NAME: '',
      PHONE: '',
      REFERENCE_TYPE: '',
      TITLE: locales_store.locales.entries.Lcz_NewBooking,
    };
  }
  render() {
    return (index.h(index.Host, null, this.withIrToastAndInterceptor && (index.h(index.Fragment, null, index.h("ir-toast", null), index.h("ir-interceptor", null))), index.h("div", { class: "book-container", onClick: this.handleTriggerClicked.bind(this) }, index.h("slot", { name: "trigger" })), this.bookingItem && (index.h("igl-book-property", { allowedBookingSources: this.calendarData.allowed_booking_sources, adultChildConstraints: this.calendarData.adult_child_constraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onResetBookingData: (e) => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.resetBookingData.emit(null);
      }, onCloseBookingWindow: () => this.handleCloseBookingWindow() }))));
  }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IglBookPropertyContainer.style = iglBookPropertyContainerCss;

const initialState$1 = {};
const { state: interceptor_requests, onChange: onCalendarDatesChange } = locales_store.createStore(initialState$1);
function isRequestPending(url) {
  return interceptor_requests[url] === 'pending';
}

const iglBookPropertyFooterCss = ".sc-igl-book-property-footer-h{display:block;margin:0;padding:0}.sc-igl-book-property-footer-h>*.sc-igl-book-property-footer{margin:auto;padding:auto}.gap-30.sc-igl-book-property-footer{gap:30px}";

const IglBookPropertyFooter = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.buttonClicked = index.createEvent(this, "buttonClicked", 7);
    this.eventType = undefined;
    this.disabled = true;
  }
  isEventType(event) {
    return event === this.eventType;
  }
  editNext(label) {
    if (this.isEventType('EDIT_BOOKING')) {
      if (label === 'Cancel') {
        return 'flex-fill';
      }
      else {
        return 'd-none d-md-block  flex-fill';
      }
    }
    return 'flex-fill';
  }
  renderButton(type, label, disabled = false) {
    return (index.h("div", { class: this.shouldRenderTwoButtons() ? ` ${this.editNext(label)}` : 'flex-fill' }, index.h("button", { class: `btn btn-${type === 'cancel' ? 'secondary' : 'primary'} full-width`, onClick: () => this.buttonClicked.emit({ key: type }), disabled: disabled }, label)));
  }
  shouldRenderTwoButtons() {
    return this.isEventType('PLUS_BOOKING') || this.isEventType('ADD_ROOM') || this.isEventType('EDIT_BOOKING');
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "d-flex justify-content-between gap-30 align-items-center" }, this.isEventType('EDIT_BOOKING') ? (index.h(index.Fragment, null, this.renderButton('cancel', locales_store.locales.entries.Lcz_Cancel), this.shouldRenderTwoButtons() && this.renderButton('next', `${locales_store.locales.entries.Lcz_Next} >>`, isRequestPending('/Get_Exposed_Booking_Availability')))) : (index.h(index.Fragment, null, this.renderButton('cancel', locales_store.locales.entries.Lcz_Cancel), this.shouldRenderTwoButtons() && this.renderButton('next', `${locales_store.locales.entries.Lcz_Next} >>`))))));
  }
};
IglBookPropertyFooter.style = iglBookPropertyFooterCss;

const iglBookPropertyHeaderCss = ".sc-igl-book-property-header-h{display:block}.row.sc-igl-book-property-header{padding:0 0 0 15px;margin:0}.sourceContainer.sc-igl-book-property-header{max-width:350px}.message-label.sc-igl-book-property-header{font-size:80%}";

const IglBookPropertyHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.splitBookingDropDownChange = index.createEvent(this, "splitBookingDropDownChange", 7);
    this.sourceDropDownChange = index.createEvent(this, "sourceDropDownChange", 7);
    this.adultChild = index.createEvent(this, "adultChild", 7);
    this.checkClicked = index.createEvent(this, "checkClicked", 7);
    this.buttonClicked = index.createEvent(this, "buttonClicked", 7);
    this.toast = index.createEvent(this, "toast", 7);
    this.spiltBookingSelected = index.createEvent(this, "spiltBookingSelected", 7);
    this.animateIrButton = index.createEvent(this, "animateIrButton", 7);
    this.animateIrSelect = index.createEvent(this, "animateIrSelect", 7);
    this.sourceOption = {
      code: '',
      description: '',
      tag: '',
    };
    this.splitBookingId = '';
    this.bookingData = '';
    this.minDate = undefined;
    this.sourceOptions = [];
    this.message = undefined;
    this.bookingDataDefaultDateRange = undefined;
    this.showSplitBookingOption = false;
    this.adultChildConstraints = undefined;
    this.splitBookings = undefined;
    this.adultChildCount = undefined;
    this.dateRangeData = undefined;
    this.bookedByInfoData = undefined;
    this.defaultDaterange = undefined;
    this.propertyId = undefined;
  }
  getSplitBookingList() {
    return (index.h("fieldset", { class: "form-group  text-left" }, index.h("label", { class: "h5" }, locales_store.locales.entries.Lcz_Tobooking, "# "), index.h("div", { class: "btn-group ml-1" }, index.h("ir-autocomplete", { value: Object.keys(this.bookedByInfoData).length > 1 ? `${this.bookedByInfoData.bookingNumber} ${this.bookedByInfoData.firstName} ${this.bookedByInfoData.lastName}` : '', from_date: utils.hooks(this.bookingDataDefaultDateRange.fromDate).format('YYYY-MM-DD'), to_date: utils.hooks(this.bookingDataDefaultDateRange.toDate).format('YYYY-MM-DD'), propertyId: this.propertyId, placeholder: locales_store.locales.entries.Lcz_BookingNumber, onComboboxValue: e => {
        e.stopImmediatePropagation();
        this.spiltBookingSelected.emit(e.detail);
      }, isSplitBooking: true }))));
  }
  getSourceNode() {
    return (index.h("fieldset", { class: "d-flex flex-column text-left flex-lg-row align-items-lg-center" }, index.h("label", { class: "mr-lg-1" }, locales_store.locales.entries.Lcz_Source, " "), index.h("div", { class: "btn-group mt-1 mt-lg-0 sourceContainer" }, index.h("select", { class: "form-control input-sm", id: "xSmallSelect", onChange: evt => this.sourceDropDownChange.emit(evt.target.value) }, this.sourceOptions.map(option => {
      if (option.type === 'LABEL') {
        return index.h("optgroup", { label: option.value });
      }
      return (index.h("option", { value: option.id, selected: this.sourceOption.code === option.id }, option.value));
    })))));
  }
  handleAdultChildChange(key, value) {
    //const value = (event.target as HTMLSelectElement).value;
    let obj = {};
    if (value === '') {
      obj = Object.assign(Object.assign({}, this.adultChildCount), { [key]: 0 });
    }
    else {
      obj = Object.assign(Object.assign({}, this.adultChildCount), { [key]: value });
    }
    this.adultChild.emit(obj);
  }
  getAdultChildConstraints() {
    return (index.h("div", { class: 'mt-1 mt-lg-0 d-flex flex-column text-left' }, index.h("label", { class: "mb-1 d-lg-none" }, locales_store.locales.entries.Lcz_NumberOfGuests, " "), index.h("div", { class: "form-group my-lg-0 text-left d-flex align-items-center justify-content-between justify-content-sm-start" }, index.h("fieldset", null, index.h("div", { class: "btn-group " }, index.h("ir-select", { onSelectChange: e => this.handleAdultChildChange('adult', e.detail), select_id: "adult_child_select", firstOption: locales_store.locales.entries.Lcz_AdultsCaption, LabelAvailable: false, data: Array.from(Array(this.adultChildConstraints.adult_max_nbr), (_, i) => i + 1).map(option => ({
        text: option.toString(),
        value: option.toString(),
      })) }))), this.adultChildConstraints.child_max_nbr > 0 && (index.h("fieldset", null, index.h("div", { class: "btn-group ml-1" }, index.h("ir-select", { onSelectChange: e => this.handleAdultChildChange('child', e.detail), select_id: "child_select", firstOption: this.renderChildCaption(), LabelAvailable: false, data: Array.from(Array(this.adultChildConstraints.child_max_nbr), (_, i) => i + 1).map(option => ({
        text: option.toString(),
        value: option.toString(),
      })) })))), index.h("ir-button", { btn_id: "check_availability", isLoading: isRequestPending('/Get_Exposed_Booking_Availability'), icon: "", size: "sm", class: "ml-2", text: locales_store.locales.entries.Lcz_Check, onClickHanlder: () => this.handleButtonClicked() }))));
  }
  renderChildCaption() {
    const maxAge = this.adultChildConstraints.child_max_age;
    let years = locales_store.locales.entries.Lcz_Years;
    if (maxAge === 1) {
      years = locales_store.locales.entries.Lcz_Year;
    }
    return `${locales_store.locales.entries.Lcz_ChildCaption} < ${this.adultChildConstraints.child_max_age} ${years}`;
  }
  handleButtonClicked() {
    if (this.isEventType('SPLIT_BOOKING') && Object.keys(this.bookedByInfoData).length <= 1) {
      this.toast.emit({
        type: 'error',
        title: locales_store.locales.entries.Lcz_ChooseBookingNumber,
        description: '',
        position: 'top-right',
      });
    }
    else if (this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING')) {
      const initialToDate = utils.hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date));
      const initialFromDate = utils.hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date));
      const selectedFromDate = utils.hooks(new Date(this.dateRangeData.fromDate));
      const selectedToDate = utils.hooks(new Date(this.dateRangeData.toDate));
      if (selectedToDate.isBefore(initialFromDate) || selectedFromDate.isAfter(initialToDate)) {
        this.toast.emit({
          type: 'error',
          title: `${locales_store.locales.entries.Lcz_CheckInDateShouldBeMAx.replace('%1', utils.hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date)).format('ddd, DD MMM YYYY')).replace('%2', utils.hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date)).format('ddd, DD MMM YYYY'))}  `,
          description: '',
          position: 'top-right',
        });
        return;
      }
      else if (this.adultChildCount.adult === 0) {
        this.toast.emit({ type: 'error', title: locales_store.locales.entries.Lcz_PlzSelectNumberOfGuests, description: '', position: 'top-right' });
        this.animateIrSelect.emit('adult_child_select');
      }
      else {
        this.buttonClicked.emit({ key: 'check' });
      }
    }
    else if (this.minDate && new Date(this.dateRangeData.fromDate).getTime() > new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date).getTime()) {
      this.toast.emit({
        type: 'error',
        title: `${locales_store.locales.entries.Lcz_CheckInDateShouldBeMAx.replace('%1', utils.hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date)).format('ddd, DD MMM YYYY')).replace('%2', utils.hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date)).format('ddd, DD MMM YYYY'))}  `,
        description: '',
        position: 'top-right',
      });
    }
    else if (this.adultChildCount.adult === 0) {
      this.animateIrSelect.emit('adult_child_select');
      this.toast.emit({ type: 'error', title: locales_store.locales.entries.Lcz_PlzSelectNumberOfGuests, description: '', position: 'top-right' });
    }
    else {
      this.buttonClicked.emit({ key: 'check' });
    }
  }
  isEventType(key) {
    return this.bookingData.event_type === key;
  }
  render() {
    const showSourceNode = this.showSplitBookingOption ? this.getSplitBookingList() : this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM') ? false : true;
    return (index.h(index.Host, null, showSourceNode && this.getSourceNode(), index.h("div", { class: `d-flex flex-column flex-lg-row align-items-lg-center ${showSourceNode ? 'mt-1' : ''}` }, index.h("fieldset", { class: "mt-lg-0  " }, index.h("igl-date-range", { dateLabel: locales_store.locales.entries.Lcz_Dates, minDate: this.minDate, disabled: this.isEventType('BAR_BOOKING') || this.isEventType('SPLIT_BOOKING'), defaultData: this.bookingDataDefaultDateRange })), !this.isEventType('EDIT_BOOKING') && this.getAdultChildConstraints()), index.h("p", { class: "text-right mt-1 message-label" }, calendarData.calendar_data.tax_statement)));
  }
};
IglBookPropertyHeader.style = iglBookPropertyHeaderCss;

const iglBookingOverviewPageCss = ".sc-igl-booking-overview-page-h{display:block}.sc-igl-booking-overview-page-h>*.sc-igl-booking-overview-page{margin:0;padding:auto}.scrollContent.sc-igl-booking-overview-page{height:calc(100% - 79px);overflow:auto;position:relative}.loading-container.sc-igl-booking-overview-page{display:flex;align-items:center;justify-content:center;height:100%;background:white;position:absolute;inset:0;z-index:100}.loader.sc-igl-booking-overview-page{width:1.25rem;height:1.25rem;border:2.5px solid #3f3f3f;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}";

const IglBookingOverviewPage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.roomsDataUpdate = index.createEvent(this, "roomsDataUpdate", 7);
    this.bookingData = undefined;
    this.propertyId = undefined;
    this.message = undefined;
    this.showSplitBookingOption = undefined;
    this.eventType = undefined;
    this.currency = undefined;
    this.adultChildConstraints = undefined;
    this.ratePricingMode = undefined;
    this.dateRangeData = undefined;
    this.defaultDaterange = undefined;
    this.selectedRooms = undefined;
    this.adultChildCount = undefined;
    this.sourceOptions = undefined;
    this.bookedByInfoData = undefined;
    this.initialRoomIds = undefined;
  }
  getSplitBookings() {
    return (this.bookingData.hasOwnProperty('splitBookingEvents') && this.bookingData.splitBookingEvents) || [];
  }
  isEventType(event) {
    return event === this.eventType;
  }
  render() {
    var _a, _b;
    //console.log(this.bookingData);
    return (index.h(index.Host, null, index.h("igl-book-property-header", { bookedByInfoData: this.bookedByInfoData, defaultDaterange: this.defaultDaterange, dateRangeData: this.dateRangeData,
      // minDate={this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING') ? this.bookedByInfoData.from_date || this.bookingData.FROM_DATE : undefined}
      adultChildCount: this.adultChildCount, splitBookingId: this.showSplitBookingOption, bookingData: this.bookingData, sourceOptions: this.sourceOptions, message: this.message, bookingDataDefaultDateRange: this.bookingData.defaultDateRange, showSplitBookingOption: this.showSplitBookingOption, adultChildConstraints: this.adultChildConstraints, splitBookings: this.getSplitBookings(), propertyId: this.propertyId }), index.h("div", { class: " text-left" }, isRequestPending('/Get_Exposed_Booking_Availability') && this.isEventType('EDIT_BOOKING') ? (index.h("div", { class: "loading-container" }, index.h("div", { class: "loader" }))) : (index.h(index.Fragment, null, (_b = (_a = this.bookingData) === null || _a === void 0 ? void 0 : _a.roomsInfo) === null || _b === void 0 ? void 0 : _b.map(roomInfo => {
      //console.log(this.selectedRooms);
      return (index.h("igl-booking-rooms", { initialRoomIds: this.initialRoomIds, isBookDisabled: Object.keys(this.bookedByInfoData).length <= 1, key: `room-info-${roomInfo.id}`, currency: this.currency, ratePricingMode: this.ratePricingMode, dateDifference: this.dateRangeData.dateDifference, bookingType: this.bookingData.event_type, roomTypeData: roomInfo, class: "mt-2 mb-1 p-0", roomInfoId: this.selectedRooms.has(`c_${roomInfo.id}`) ? roomInfo.id : null, defaultData: this.selectedRooms.get(`c_${roomInfo.id}`), onDataUpdateEvent: evt => this.roomsDataUpdate.emit(evt.detail) }));
    })))), index.h("igl-book-property-footer", { class: 'p-0 mb-1 mt-3', eventType: this.bookingData.event_type, disabled: this.selectedRooms.size === 0 })));
  }
};
IglBookingOverviewPage.style = iglBookingOverviewPageCss;

const iglBookingRoomRatePlanCss = ".sc-igl-booking-room-rate-plan-h{display:block;margin-bottom:0.5rem}.currency.sc-igl-booking-room-rate-plan{display:block;position:absolute;margin:0;padding:0;height:auto;left:10px}.rate-input.sc-igl-booking-room-rate-plan{font-size:14px;line-height:0;padding:0;height:0;border-left:0}.rate-input-container.sc-igl-booking-room-rate-plan{display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;flex:1}.new-currency.sc-igl-booking-room-rate-plan{color:#3b4781;border:1px solid #cacfe7;font-size:0.975rem;height:2rem;background:white;border-right:0;border-top-right-radius:0;border-bottom-right-radius:0;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.input-group-prepend.sc-igl-booking-room-rate-plan span[data-state='focus'].sc-igl-booking-room-rate-plan{border-color:var(--blue)}.input-group-prepend.sc-igl-booking-room-rate-plan span[data-disabled].sc-igl-booking-room-rate-plan{background-color:#eceff1;border-color:rgba(118, 118, 118, 0.3)}@media only screen and (min-width: 1200px){.rateplan-name-container.sc-igl-booking-room-rate-plan{width:40%}.rateplan-container.sc-igl-booking-room-rate-plan{width:40%}}@media only screen and (min-width: 991px){.max-w-300.sc-igl-booking-room-rate-plan{max-width:200px}.rate-input-container.sc-igl-booking-room-rate-plan{max-width:100px}}@media only screen and (min-width: 991px) and (max-width: 1300px){.rateplan-name-container.sc-igl-booking-room-rate-plan{width:35%}}@media only screen and (max-width: 768px){.booking-btn.sc-igl-booking-room-rate-plan{width:100%}}.total-nights-container.sc-igl-booking-room-rate-plan{width:max-content}.nightBorder.sc-igl-booking-room-rate-plan{border-left-width:0;border-top-right-radius:3px !important;border-bottom-right-radius:3px !important}";

const IglBookingRoomRatePlan = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataUpdateEvent = index.createEvent(this, "dataUpdateEvent", 7);
    this.gotoSplitPageTwoEvent = index.createEvent(this, "gotoSplitPageTwoEvent", 7);
    this.initialRateValue = 0;
    this.defaultData = undefined;
    this.ratePlanData = undefined;
    this.totalAvailableRooms = undefined;
    this.index = undefined;
    this.ratePricingMode = [];
    this.currency = undefined;
    this.physicalrooms = undefined;
    this.shouldBeDisabled = undefined;
    this.dateDifference = undefined;
    this.bookingType = 'PLUS_BOOKING';
    this.fullyBlocked = undefined;
    this.isBookDisabled = false;
    this.defaultRoomId = undefined;
    this.selectedRoom = undefined;
    this.is_bed_configuration_enabled = undefined;
    this.isInputFocused = false;
    this.selectedData = undefined;
    this.ratePlanChangedState = false;
  }
  getAvailableRooms(assignable_units) {
    let result = [];
    assignable_units.forEach(unit => {
      if (unit.Is_Fully_Available) {
        result.push({ name: unit.name, id: unit.pr_id });
      }
    });
    return result;
  }
  componentWillLoad() {
    // console.log('default data', this.defaultData);
    this.updateSelectedRatePlan(this.ratePlanData);
  }
  disableForm() {
    if (this.bookingType === 'EDIT_BOOKING' && this.shouldBeDisabled) {
      return false;
    }
    else {
      return this.selectedData.is_closed || this.totalAvailableRooms === 0 || (calendarData.calendar_data.is_frontdesk_enabled && this.selectedData.physicalRooms.length === 0);
    }
  }
  setAvailableRooms(data) {
    let availableRooms = this.getAvailableRooms(data);
    if (this.bookingType === 'EDIT_BOOKING' && this.shouldBeDisabled) {
      if (this.selectedRoom) {
        availableRooms.push({
          id: this.selectedRoom.roomId,
          name: this.selectedRoom.roomName,
        });
        availableRooms.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
    }
    return availableRooms;
  }
  getSelectedOffering(value) {
    return this.ratePlanData.variations.find(variation => variation.adult_child_offering === value);
  }
  updateSelectedRatePlan(data) {
    var _a;
    this.selectedData = {
      is_bed_configuration_enabled: this.is_bed_configuration_enabled,
      ratePlanId: data.id,
      adult_child_offering: data.variations[data.variations.length - 1].adult_child_offering,
      rateType: 1,
      totalRooms: 0,
      rate: (_a = data.variations[data.variations.length - 1].amount) !== null && _a !== void 0 ? _a : 0,
      ratePlanName: data.name,
      adultCount: data.variations[data.variations.length - 1].adult_nbr,
      childrenCount: data.variations[data.variations.length - 1].child_nbr,
      cancelation: data.cancelation,
      guarantee: data.guarantee,
      isRateModified: false,
      defaultSelectedRate: 0,
      index: this.index,
      is_closed: data.is_closed,
      physicalRooms: this.setAvailableRooms(this.ratePlanData.assignable_units),
      dateDifference: this.dateDifference,
    };
    if (this.defaultData) {
      for (const [key, value] of Object.entries(this.defaultData)) {
        this.selectedData[key] = value;
      }
      this.selectedData['rateType'] = 1;
    }
    if (this.defaultData && this.defaultData.isRateModified) {
      console.log('object');
      if (this.selectedData.rateType === 1) {
        console.log('object1');
        this.initialRateValue = this.selectedData.rate;
      }
      else {
        console.log('object2');
        this.initialRateValue = this.selectedData.rate * this.dateDifference;
      }
    }
    else {
      this.initialRateValue = this.selectedData.rate / this.dateDifference;
    }
  }
  componentDidLoad() {
    if (this.defaultData) {
      this.dataUpdateEvent.emit({
        key: 'roomRatePlanUpdate',
        changedKey: 'physicalRooms',
        data: this.selectedData,
      });
    }
  }
  async ratePlanDataChanged(newData) {
    this.selectedData = Object.assign(Object.assign({}, this.selectedData), { adult_child_offering: newData.variations[newData.variations.length - 1].adult_child_offering, adultCount: newData.variations[newData.variations.length - 1].adult_nbr, childrenCount: newData.variations[newData.variations.length - 1].child_nbr, rate: this.handleRateDaysUpdate(), physicalRooms: this.setAvailableRooms(newData.assignable_units) });
    this.initialRateValue = this.selectedData.rateType === 2 ? this.selectedData.rate / this.dateDifference : this.selectedData.rate;
    this.dataUpdateEvent.emit({
      key: 'roomRatePlanUpdate',
      changedKey: 'rate',
      data: this.selectedData,
    });
  }
  handleRateDaysUpdate() {
    if (this.selectedData.isRateModified) {
      return this.selectedData.defaultSelectedRate;
    }
    const selectedOffering = this.getSelectedOffering(this.selectedData.adult_child_offering);
    return selectedOffering ? selectedOffering.amount : 0;
  }
  handleInput(event) {
    const inputElement = event.target;
    let inputValue = inputElement.value.replace(/[^0-9.]/g, '');
    const validDecimalNumber = /^\d*\.?\d*$/;
    if (!validDecimalNumber.test(inputValue)) {
      inputValue = inputValue.substring(0, inputValue.length - 1);
    }
    inputElement.value = inputValue;
    if (inputValue) {
      this.selectedData.isRateModified = true;
      this.handleDataChange('rate', event);
    }
    else {
      this.selectedData = Object.assign(Object.assign({}, this.selectedData), { rate: -1, totalRooms: 0 });
      this.dataUpdateEvent.emit({
        key: 'roomRatePlanUpdate',
        changedKey: 'rate',
        data: this.selectedData,
      });
    }
  }
  handleDataChange(key, evt) {
    const value = evt.target.value;
    switch (key) {
      case 'adult_child_offering':
        this.updateOffering(value);
        break;
      case 'rate':
        this.updateRate(value);
        break;
      default:
        this.updateGenericData(key, value);
        break;
    }
    this.dataUpdateEvent.emit({
      key: 'roomRatePlanUpdate',
      changedKey: key,
      data: this.selectedData,
    });
  }
  updateOffering(value) {
    const offering = this.getSelectedOffering(value);
    if (offering) {
      this.selectedData = Object.assign(Object.assign({}, this.selectedData), { adult_child_offering: value, adultCount: offering.adult_nbr, childrenCount: offering.child_nbr, rate: offering.amount, isRateModified: false });
    }
  }
  updateRate(value) {
    const numericValue = value === '' ? 0 : Number(value);
    this.selectedData = Object.assign(Object.assign({}, this.selectedData), { rate: numericValue, totalRooms: value === '' ? 0 : this.selectedData.totalRooms, defaultSelectedRate: this.selectedData.rateType === 2 ? numericValue / this.dateDifference : numericValue });
  }
  updateGenericData(key, value) {
    this.selectedData = Object.assign(Object.assign({}, this.selectedData), { [key]: value === '' ? 0 : parseInt(value) });
  }
  bookProperty() {
    this.dataUpdateEvent.emit({ key: 'clearData', data: this.selectedData });
    this.handleDataChange('totalRooms', { target: { value: '1' } });
    this.gotoSplitPageTwoEvent.emit({ key: 'gotoSplitPage', data: '' });
  }
  renderRate() {
    if (this.selectedData.isRateModified) {
      console.log('selectedData.rate', this.selectedData.rate);
      return this.selectedData.rate === -1 ? '' : this.selectedData.rate;
    }
    return this.selectedData.rateType === 1 ? Number(this.selectedData.rate).toFixed(2) : Number(this.initialRateValue).toFixed(2);
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "d-flex flex-column m-0 p-0 flex-lg-row align-items-lg-center justify-content-lg-between " }, index.h("div", { class: "rateplan-name-container" }, this.bookingType === 'BAR_BOOKING' ? (index.h(index.Fragment, null, index.h("span", { class: "font-weight-bold\t" }, this.ratePlanData.name.split('/')[0]), index.h("span", null, "/", this.ratePlanData.name.split('/')[1]))) : (index.h("span", null, this.ratePlanData.name)), index.h("ir-tooltip", { message: this.ratePlanData.cancelation + this.ratePlanData.guarantee })), index.h("div", { class: 'd-md-flex justify-content-md-end  align-items-md-center  flex-fill rateplan-container' }, index.h("div", { class: "mt-1 mt-lg-0 flex-fill max-w-300" }, index.h("fieldset", { class: "position-relative" }, index.h("select", { disabled: this.disableForm(), class: "form-control  input-sm", id: v4.v4(), onChange: evt => this.handleDataChange('adult_child_offering', evt) }, this.ratePlanData.variations.map(variation => (index.h("option", { value: variation.adult_child_offering, selected: this.selectedData.adult_child_offering === variation.adult_child_offering }, variation.adult_child_offering)))))), index.h("div", { class: 'm-0 p-0 d-md-flex justify-content-between ml-md-1 ' }, index.h("div", { class: " d-flex mt-1  mt-lg-0 m-0 p-0 rate-total-night-view   " }, index.h("fieldset", { class: "position-relative has-icon-left m-0 p-0 rate-input-container  " }, index.h("div", { class: "input-group-prepend" }, index.h("span", { "data-disabled": this.disableForm(), "data-state": this.isInputFocused ? 'focus' : '', class: "input-group-text new-currency", id: "basic-addon1" }, utils.getCurrencySymbol(this.currency.code))), index.h("input", { onFocus: () => (this.isInputFocused = true), onBlur: () => (this.isInputFocused = false), disabled: this.disableForm(), type: "text", class: "form-control pl-0 input-sm rate-input py-0 m-0 rounded-0 rateInputBorder", value: this.renderRate(), id: v4.v4(), placeholder: locales_store.locales.entries.Lcz_Rate || 'Rate', onInput: (event) => this.handleInput(event) })), index.h("fieldset", { class: "position-relative m-0 total-nights-container p-0 " }, index.h("select", { disabled: this.disableForm(), class: "form-control input-sm m-0 nightBorder rounded-0  py-0", id: v4.v4(), onChange: evt => this.handleDataChange('rateType', evt) }, this.ratePricingMode.map(data => (index.h("option", { value: data.CODE_NAME, selected: this.selectedData.rateType === +data.CODE_NAME }, data.CODE_VALUE_EN)))))), this.bookingType === 'PLUS_BOOKING' || this.bookingType === 'ADD_ROOM' ? (index.h("div", { class: "flex-lg-fill  mt-lg-0 ml-md-2 m-0 mt-1 p-0" }, index.h("fieldset", { class: "position-relative" }, index.h("select", { disabled: this.selectedData.rate === 0 || this.disableForm(), class: "form-control input-sm", id: v4.v4(), onChange: evt => this.handleDataChange('totalRooms', evt) }, Array.from({ length: this.totalAvailableRooms + 1 }, (_, i) => i).map(i => (index.h("option", { value: i, selected: this.selectedData.totalRooms === i }, i))))))) : null), this.bookingType === 'EDIT_BOOKING' ? (index.h(index.Fragment, null, index.h("div", { class: " m-0 p-0  mt-lg-0  ml-md-1 mt-md-1 d-none d-md-block" }, index.h("fieldset", { class: "position-relative" }, index.h("input", { disabled: this.disableForm(), type: "radio", name: "ratePlanGroup", value: "1", onChange: evt => this.handleDataChange('totalRooms', evt), checked: this.selectedData.totalRooms === 1 }))), index.h("button", { disabled: this.selectedData.rate === -1 || this.disableForm(), type: "button", class: "btn btn-primary booking-btn mt-lg-0 btn-sm ml-md-1  mt-1 d-md-none ", onClick: () => this.bookProperty() }, this.selectedData.totalRooms === 1 ? locales_store.locales.entries.Lcz_Current : locales_store.locales.entries.Lcz_Select))) : null, this.bookingType === 'BAR_BOOKING' || this.bookingType === 'SPLIT_BOOKING' ? (index.h("button", { disabled: this.selectedData.rate === -1 || this.disableForm() || (this.bookingType === 'SPLIT_BOOKING' && this.isBookDisabled), type: "button", class: "btn btn-primary booking-btn mt-lg-0 btn-sm ml-md-1  mt-1 ", onClick: () => this.bookProperty() }, locales_store.locales.entries.Lcz_Book)) : null))));
  }
  static get watchers() { return {
    "ratePlanData": ["ratePlanDataChanged"]
  }; }
};
IglBookingRoomRatePlan.style = iglBookingRoomRatePlanCss;

const iglBookingRoomsCss = ".sc-igl-booking-rooms-h{display:block}.margin-bottom-8.sc-igl-booking-rooms{margin-bottom:8px !important}";

const IglBookingRooms = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataUpdateEvent = index.createEvent(this, "dataUpdateEvent", 7);
    this.validBookingTypes = ['PLUS_BOOKING', 'ADD_ROOM', 'EDIT_BOOKING', 'SPLIT_BOOKING'];
    this.roomTypeData = undefined;
    this.defaultData = undefined;
    this.bookingType = 'PLUS_BOOKING';
    this.dateDifference = undefined;
    this.ratePricingMode = [];
    this.roomInfoId = null;
    this.currency = undefined;
    this.selectedRooms = [];
    this.totalRooms = undefined;
    this.isBookDisabled = undefined;
    this.initialRoomIds = undefined;
    this.roomsDistributions = [];
  }
  componentWillLoad() {
    this.initializeRoomData();
  }
  initializeRoomData() {
    const { inventory, rateplans } = this.roomTypeData;
    this.totalRooms = inventory || 0;
    this.selectedRooms = new Array(rateplans.length).fill(0);
    this.roomsDistributions = this.calculateInitialDistributions(rateplans, inventory);
  }
  handleRoomTypeData() {
    this.initializeRoomData();
  }
  calculateInitialDistributions(rateplans, inventory) {
    let distributions = new Array(rateplans.length).fill(inventory);
    if (this.defaultData && this.bookingType !== 'EDIT_BOOKING' && inventory > 0) {
      let selectedIndexes = [];
      let sum = 0;
      this.defaultData.forEach(category => {
        this.selectedRooms[category.index] = category.totalRooms;
        distributions[category.index] = category.totalRooms;
        sum += category.totalRooms;
        selectedIndexes.push(category.index);
      });
      if (selectedIndexes.length < distributions.length) {
        distributions.forEach((_, index) => {
          if (!selectedIndexes.includes(index)) {
            if (sum === this.totalRooms) {
              distributions[index] = 0;
            }
            else {
              distributions[index] = distributions[index] - sum;
            }
          }
          else {
            if (sum < this.totalRooms) {
              distributions[index] = this.totalRooms - sum + distributions[index];
            }
          }
        });
      }
    }
    else {
      distributions.fill(inventory);
    }
    return distributions;
  }
  onRoomDataUpdate(event, index) {
    event.stopImmediatePropagation();
    const { detail: { data, changedKey }, } = event;
    let updatedData = Object.assign({}, data);
    if (changedKey === 'totalRooms') {
      this.handleTotalRoomsUpdate(index, updatedData.totalRooms);
    }
    updatedData = Object.assign(Object.assign({}, updatedData), { roomCategoryId: this.roomTypeData.id, roomCategoryName: this.roomTypeData.name, inventory: this.roomTypeData.inventory });
    this.dataUpdateEvent.emit({ key: data.key, data: updatedData, changedKey });
  }
  handleTotalRoomsUpdate(index, newValue) {
    if (this.selectedRooms[index] !== newValue) {
      this.selectedRooms[index] = newValue;
      this.updateRatePlanTotalRooms(index);
    }
  }
  updateRatePlanTotalRooms(ratePlanIndex) {
    const calculateTotalSelectedRoomsExcludingIndex = excludedIndex => {
      return this.selectedRooms.reduce((acc, rooms, idx) => (idx !== excludedIndex ? acc + rooms : acc), 0);
    };
    const newRoomsDistributions = this.selectedRooms.map((_, index) => {
      if (index === ratePlanIndex) {
        return this.roomsDistributions[index];
      }
      const totalSelectedRoomsExcludingCurrent = calculateTotalSelectedRoomsExcludingIndex(index);
      const availableRooms = this.totalRooms - totalSelectedRoomsExcludingCurrent;
      return availableRooms > 0 ? availableRooms : 0;
    });
    if (JSON.stringify(this.roomsDistributions) !== JSON.stringify(newRoomsDistributions)) {
      this.roomsDistributions = [...newRoomsDistributions];
    }
  }
  render() {
    const isValidBookingType = this.validBookingTypes.includes(this.bookingType);
    return (index.h(index.Host, null, isValidBookingType && index.h("div", { class: "font-weight-bold font-medium-1 margin-bottom-8 " }, this.roomTypeData.name), this.roomTypeData.rateplans.map((ratePlan, index$1) => {
      if (ratePlan.variations !== null) {
        let shouldBeDisabled = this.roomInfoId && this.roomInfoId === this.roomTypeData.id;
        let roomId = -1;
        if (shouldBeDisabled && this.initialRoomIds) {
          roomId = this.initialRoomIds.roomId;
        }
        return (index.h("igl-booking-room-rate-plan", { is_bed_configuration_enabled: this.roomTypeData.is_bed_configuration_enabled, index: index$1, isBookDisabled: this.isBookDisabled, key: `rate-plan-${ratePlan.id}`, ratePricingMode: this.ratePricingMode, class: isValidBookingType ? '' : '', currency: this.currency, dateDifference: this.dateDifference, ratePlanData: ratePlan, totalAvailableRooms: this.roomsDistributions[index$1], bookingType: this.bookingType, defaultData: (this.defaultData && this.defaultData.get(`p_${ratePlan.id}`)) || null, shouldBeDisabled: shouldBeDisabled, onDataUpdateEvent: evt => this.onRoomDataUpdate(evt, index$1), physicalrooms: this.roomTypeData.physicalrooms, defaultRoomId: roomId, selectedRoom: this.initialRoomIds }));
      }
      else {
        return null;
      }
    })));
  }
  static get watchers() { return {
    "roomTypeData": ["handleRoomTypeData"]
  }; }
};
IglBookingRooms.style = iglBookingRoomsCss;

const iglDateRangeCss = ".sc-igl-date-range-h{display:flex;align-items:center !important}.date-range-input.sc-igl-date-range{margin:0;padding:0;display:flex;flex:1;cursor:pointer;width:220px !important;opacity:0;user-select:none}.iglRangeNights.sc-igl-date-range{margin:0;padding:0}.date-view.sc-igl-date-range{position:absolute;background:white;pointer-events:none;cursor:pointer;display:block;margin-left:1rem;margin-right:1rem;font-size:0.975rem !important;display:flex;align-items:center}.date-view.sc-igl-date-range svg.sc-igl-date-range{padding:0 !important;margin:0;margin-right:10px}.calendarPickerContainer.sc-igl-date-range{display:flex !important;position:relative !important;text-align:left;align-items:center !important;padding:0 !important;margin:0;border:1px solid var(--ir-date-range-border, #379ff2);width:var(--ir-date-range-width, 242px);transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.calendarPickerContainer.sc-igl-date-range:focus-within{border-color:#379ff2}.calendarPickerContainer[data-state='disabled'].sc-igl-date-range{border:0px;width:280px}.date-view[data-state='disabled'].sc-igl-date-range,.date-range-input[data-state='disabled'].sc-igl-date-range{margin:0;cursor:default}";

const IglDateRange = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dateSelectEvent = index.createEvent(this, "dateSelectEvent", 7);
    this.toast = index.createEvent(this, "toast", 7);
    this.totalNights = 0;
    this.fromDateStr = 'from';
    this.toDateStr = 'to';
    this.defaultData = undefined;
    this.disabled = false;
    this.minDate = undefined;
    this.dateLabel = undefined;
    this.maxDate = undefined;
    this.withDateDifference = true;
    this.renderAgain = false;
  }
  getStringDateFormat(dt) {
    return dt.getFullYear() + '-' + (dt.getMonth() < 9 ? '0' : '') + (dt.getMonth() + 1) + '-' + (dt.getDate() <= 9 ? '0' : '') + dt.getDate();
  }
  initializeDates() {
    let dt = new Date();
    dt.setHours(0, 0, 0, 0);
    dt.setDate(dt.getDate() + 1);
    if (this.defaultData) {
      if (this.defaultData.fromDate) {
        this.fromDate = new Date(this.defaultData.fromDate);
        this.fromDate.setHours(0, 0, 0, 0);
        this.fromDateStr = this.getFormattedDateString(this.fromDate);
      }
      if (this.defaultData.toDate) {
        this.toDate = new Date(this.defaultData.toDate);
        this.toDate.setHours(0, 0, 0, 0);
        this.toDateStr = this.getFormattedDateString(this.toDate);
      }
    }
    if (this.fromDate && this.toDate) {
      this.calculateTotalNights();
      this.handleDateSelectEvent('selectedDateRange', {
        fromDate: this.fromDate.getTime(),
        toDate: this.toDate.getTime(),
        fromDateStr: this.fromDateStr,
        toDateStr: this.toDateStr,
        dateDifference: this.totalNights,
      });
    }
  }
  componentWillLoad() {
    this.initializeDates();
  }
  handleDataChange(newValue, oldValue) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this.initializeDates();
    }
  }
  calculateTotalNights() {
    this.totalNights = utils$1.calculateDaysBetweenDates(utils.hooks(this.fromDate).format('YYYY-MM-DD'), utils.hooks(this.toDate).format('YYYY-MM-DD'));
  }
  getFormattedDateString(dt) {
    return dt.getDate() + ' ' + dt.toLocaleString('default', { month: 'short' }).toLowerCase() + ' ' + dt.getFullYear();
  }
  handleDateSelectEvent(key, data = '') {
    this.dateSelectEvent.emit({ key, data });
  }
  handleDateChange(evt) {
    const { start, end } = evt.detail;
    this.fromDate = start.toDate();
    this.toDate = end.toDate();
    this.calculateTotalNights();
    this.handleDateSelectEvent('selectedDateRange', {
      fromDate: this.fromDate.getTime(),
      toDate: this.toDate.getTime(),
      fromDateStr: start.format('DD MMM YYYY'),
      toDateStr: end.format('DD MMM YYYY'),
      dateDifference: this.totalNights,
    });
    this.renderAgain = !this.renderAgain;
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "calendarPickerContainer form-control input-sm", "data-state": this.disabled ? 'disabled' : 'active' }, index.h("ir-date-picker", { maxDate: this.maxDate, class: 'date-range-input', disabled: this.disabled, fromDate: this.fromDate, toDate: this.toDate, minDate: this.minDate, autoApply: true, "data-state": this.disabled ? 'disabled' : 'active', onDateChanged: evt => {
        this.handleDateChange(evt);
      } }), index.h("div", { "data-state": this.disabled ? 'disabled' : 'active', class: "date-view" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "12", width: "10.5", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" })), index.h("ir-date-view", { showDateDifference: this.disabled, from_date: this.fromDate, to_date: this.toDate }))), this.withDateDifference && (index.h("span", null, this.totalNights && !this.disabled ? (index.h("span", { class: "iglRangeNights mx-1" }, this.totalNights + (this.totalNights > 1 ? ` ${locales_store.locales.entries.Lcz_Nights}` : ` ${locales_store.locales.entries.Lcz_Night}`))) : ('')))));
  }
  static get watchers() { return {
    "defaultData": ["handleDataChange"]
  }; }
};
IglDateRange.style = iglDateRangeCss;

const iglPagetwoCss = ".sc-igl-pagetwo-h{display:block}.card-title.sc-igl-pagetwo{border-bottom:1px solid #e4e5ec}.scrollContent.sc-igl-pagetwo{height:calc(100% - 79px);overflow:auto;position:relative}.background-overlay.sc-igl-pagetwo{position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.25)}.formContainer.sc-igl-pagetwo{height:calc(100% - 79px);overflow:auto}.sideWindow.sc-igl-pagetwo{position:absolute;top:0;right:0;height:100%;background-color:#ffffff}.close.sc-igl-pagetwo{float:right;font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:0.5;padding:0;background-color:transparent;border:0;appearance:none}.close-icon.sc-igl-pagetwo{position:absolute;top:18px;right:33px;outline:none}button.sc-igl-pagetwo:not(:disabled),[type='button'].sc-igl-pagetwo:not(:disabled){cursor:pointer}.row.sc-igl-pagetwo{padding:0 0 0 15px;margin:0}";

const IglPagetwo = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataUpdateEvent = index.createEvent(this, "dataUpdateEvent", 7);
    this.buttonClicked = index.createEvent(this, "buttonClicked", 7);
    this.showPaymentDetails = undefined;
    this.currency = undefined;
    this.isEditOrAddRoomEvent = undefined;
    this.dateRangeData = undefined;
    this.bookingData = undefined;
    this.showSplitBookingOption = undefined;
    this.language = undefined;
    this.bookedByInfoData = undefined;
    this.propertyId = undefined;
    this.bedPreferenceType = undefined;
    this.selectedRooms = undefined;
    this.isLoading = undefined;
    this.countryNodeList = undefined;
    this.selectedGuestData = undefined;
    this.defaultGuestData = undefined;
    this.selectedBookedByData = undefined;
    this.guestData = undefined;
    this.selectedUnits = {};
  }
  componentWillLoad() {
    this.initializeGuestData();
    this.selectedBookedByData = this.bookedByInfoData;
  }
  initializeGuestData() {
    let total = 0;
    const newSelectedUnits = Object.assign({}, this.selectedUnits);
    const getRate = (rate, totalNights, isRateModified, preference) => {
      if (isRateModified && preference === 2) {
        return rate * totalNights;
      }
      return rate;
    };
    this.selectedUnits = newSelectedUnits;
    this.guestData = [];
    this.selectedRooms.forEach((room, key) => {
      room.forEach(rate_plan => {
        newSelectedUnits[key] = rate_plan.selectedUnits;
        total += rate_plan.totalRooms * getRate(rate_plan.rate, this.dateRangeData.dateDifference, rate_plan.isRateModified, rate_plan.rateType);
        for (let i = 1; i <= rate_plan.totalRooms; i++) {
          this.guestData.push(Object.assign({ guestName: '', roomId: '', preference: '' }, rate_plan));
        }
      });
    });
    this.bookingData.TOTAL_PRICE = total;
  }
  handleOnApplicationInfoDataUpdateEvent(event, index) {
    const opt = event.detail;
    const categoryIdKey = `c_${opt.data.roomCategoryId}`;
    const updatedUnits = [...(this.selectedUnits[categoryIdKey] || [])];
    updatedUnits[index] = opt.data.roomId;
    this.selectedUnits = Object.assign(Object.assign({}, this.selectedUnits), { [categoryIdKey]: updatedUnits });
    this.dataUpdateEvent.emit({
      key: 'applicationInfoUpdateEvent',
      value: event.detail,
    });
  }
  handleEventData(event, key, index) {
    if (key === 'application-info') {
      this.handleOnApplicationInfoDataUpdateEvent(event, index);
    }
    else {
      this.selectedBookedByData = event.detail.data;
      this.dataUpdateEvent.emit({
        key: 'propertyBookedBy',
        value: event.detail,
      });
    }
  }
  isGuestDataIncomplete() {
    if (this.selectedGuestData.length !== this.guestData.length) {
      return true;
    }
    for (const data of this.selectedGuestData) {
      if (data.guestName === '' || data.preference === '' || data.roomId === '') {
        return true;
      }
    }
    return false;
  }
  isButtonDisabled(key) {
    const isValidProperty = (property, key, comparedBy) => {
      if (!property) {
        return true;
      }
      if (property === this.selectedGuestData) {
        return this.isGuestDataIncomplete();
      }
      // const isCardDetails = ['cardNumber', 'cardHolderName', 'expiryMonth', 'expiryYear'].includes(key);
      // if (!this.showPaymentDetails && isCardDetails) {
      //   return false;
      // }
      if (key === 'selectedArrivalTime') {
        if (property[key] !== undefined) {
          return property[key].code === '';
        }
        else {
          return true;
        }
      }
      return property[key] === comparedBy || property[key] === undefined;
    };
    return (this.isLoading === key ||
      isValidProperty(this.selectedGuestData, 'guestName', '') ||
      isValidProperty(this.selectedBookedByData, 'isdCode', '') ||
      isValidProperty(this.selectedBookedByData, 'contactNumber', '') ||
      isValidProperty(this.selectedBookedByData, 'firstName', '') ||
      isValidProperty(this.selectedBookedByData, 'lastName', '') ||
      isValidProperty(this.selectedBookedByData, 'countryId', -1) ||
      isValidProperty(this.selectedBookedByData, 'selectedArrivalTime', '') ||
      isValidProperty(this.selectedBookedByData, 'email', ''));
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "d-flex flex-wrap" }, index.h("ir-date-view", { class: "mr-1 flex-fill font-weight-bold font-medium-1", from_date: this.dateRangeData.fromDateStr, to_date: this.dateRangeData.toDateStr, dateOption: "DD MMM YYYY" }), this.guestData.length > 1 && (index.h("div", { class: "mt-1 mt-md-0 text-right" }, locales_store.locales.entries.Lcz_TotalPrice, " ", index.h("span", { class: "font-weight-bold font-medium-1" }, utils.getCurrencySymbol(this.currency.code) + this.bookingData.TOTAL_PRICE || '$0.00')))), this.guestData.map((roomInfo, index$1) => {
      return (index.h("igl-application-info", { dateDifference: this.dateRangeData.dateDifference, defaultGuestPreference: this.defaultGuestData.bed_preference, defaultGuestRoomId: this.defaultGuestData.PR_ID, currency: this.currency, bedPreferenceType: this.bedPreferenceType, index: index$1, selectedUnits: this.selectedUnits[`c_${roomInfo.roomCategoryId}`], guestInfo: roomInfo, guestRefKey: index$1, bookingType: this.bookingData.event_type, roomsList: roomInfo.physicalRooms, onDataUpdateEvent: event => this.handleEventData(event, 'application-info', index$1) }));
    }), this.isEditOrAddRoomEvent || this.showSplitBookingOption ? null : (index.h("igl-property-booked-by", { propertyId: this.propertyId, countryNodeList: this.countryNodeList, language: this.language, showPaymentDetails: this.showPaymentDetails, defaultData: this.bookedByInfoData, onDataUpdateEvent: event => 
      // this.dataUpdateEvent.emit({
      //   key: "propertyBookedBy",
      //   value: event.detail,
      // })
      this.handleEventData(event, 'propertyBookedBy', 0) })), this.isEditOrAddRoomEvent ? (index.h("div", { class: "d-flex p-0 mb-1 mt-2" }, index.h("div", { class: "flex-fill mr-2" }, index.h("ir-button", { icon: "", text: locales_store.locales.entries.Lcz_Back, class: "full-width", btn_color: "secondary", btn_styles: "justify-content-center", onClickHanlder: () => this.buttonClicked.emit({ key: 'back' }) })), index.h("div", { class: "flex-fill" }, index.h("ir-button", { isLoading: this.isLoading === 'save', onClickHanlder: () => this.buttonClicked.emit({ key: 'save' }), btn_styles: "full-width align-items-center justify-content-center", text: locales_store.locales.entries.Lcz_Save })))) : (index.h("div", { class: "d-flex flex-column flex-md-row p-0 mb-1 mt-2 justify-content-md-between align-items-md-center" }, index.h("div", { class: "flex-fill mr-md-1" }, index.h("button", { type: "button", class: "btn btn-secondary full-width", onClick: () => this.buttonClicked.emit({ key: 'back' }) }, index.h("span", { class: 'd-none d-md-inline-flex' }, " <<"), " ", locales_store.locales.entries.Lcz_Back)), index.h("div", { class: "mt-1 mt-md-0 flex-fill" }, index.h("ir-button", { isLoading: this.isLoading === 'book', btn_styles: "full-width align-items-center justify-content-center", onClickHanlder: () => this.buttonClicked.emit({ key: 'book' }), text: locales_store.locales.entries.Lcz_Book }))))));
  }
};
IglPagetwo.style = iglPagetwoCss;

const iglPropertyBookedByCss = ".sc-igl-property-booked-by-h{display:block}.row.sc-igl-property-booked-by{padding:0 0 0 15px;margin:0}.bookedByEmailContainer.sc-igl-property-booked-by{flex:auto;max-width:350px}.bookedDetailsForm.sc-igl-property-booked-by label.sc-igl-property-booked-by{min-width:125px;max-width:125px}.bookedDetailsForm.sc-igl-property-booked-by .form-group.sc-igl-property-booked-by{margin-bottom:10px !important}.bookedDetailsForm.sc-igl-property-booked-by .checkBoxContainer.sc-igl-property-booked-by input.sc-igl-property-booked-by{height:1.2rem !important;width:30px}.controlContainer.sc-igl-property-booked-by textarea.sc-igl-property-booked-by{height:60px !important}.margin3.sc-igl-property-booked-by{margin-bottom:5px !important}@media (min-width: 768px){.bookedByEmailContainer.sc-igl-property-booked-by{margin-left:37px}}";

const IglPropertyBookedBy = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataUpdateEvent = index.createEvent(this, "dataUpdateEvent", 7);
    this.bookingService = new booking_service.BookingService();
    this.arrivalTimeList = [];
    this.expiryMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    this.expiryYears = [];
    this.currentMonth = '01';
    this.language = undefined;
    this.showPaymentDetails = false;
    this.defaultData = undefined;
    this.countryNodeList = [];
    this.propertyId = undefined;
    this.isButtonPressed = false;
    this.bookedByData = {
      id: undefined,
      email: '',
      firstName: '',
      lastName: '',
      countryId: '',
      isdCode: '',
      contactNumber: '',
      selectedArrivalTime: {
        code: '',
        description: '',
      },
      emailGuest: true,
      message: '',
      cardNumber: '',
      cardHolderName: '',
      expiryMonth: '',
      expiryYear: '',
    };
  }
  async componentWillLoad() {
    this.bookingService.setToken(calendarData.calendar_data.token);
    this.assignCountryCode();
    this.initializeExpiryYears();
    this.initializeDateData();
    this.populateBookedByData();
  }
  initializeExpiryYears() {
    const currentYear = new Date().getFullYear();
    this.expiryYears = Array.from({ length: 4 }, (_, index) => (currentYear + index).toString());
  }
  async assignCountryCode() {
    const country = await this.bookingService.getUserDefaultCountry();
    const countryId = country['COUNTRY_ID'];
    this.country = countryId;
    this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { isdCode: countryId.toString(), countryId });
  }
  initializeDateData() {
    const dt = new Date();
    const month = dt.getMonth() + 1;
    this.currentMonth = month < 10 ? `0${month}` : month.toString();
  }
  populateBookedByData() {
    var _a;
    this.bookedByData = this.defaultData ? Object.assign(Object.assign({}, this.bookedByData), this.defaultData) : {};
    this.arrivalTimeList = ((_a = this.defaultData) === null || _a === void 0 ? void 0 : _a.arrivalTime) || [];
    this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { selectedArrivalTime: { code: this.arrivalTimeList[0].CODE_NAME, description: this.arrivalTimeList[0].CODE_VALUE_EN } });
    if (!this.bookedByData.expiryMonth) {
      this.bookedByData.expiryMonth = this.currentMonth;
    }
    if (!this.bookedByData.expiryYear) {
      this.bookedByData.expiryYear = new Date().getFullYear();
    }
  }
  handleDataChange(key, event) {
    const foundTime = this.arrivalTimeList.find(time => time.CODE_NAME === event.target.value);
    this.bookedByData[key] =
      key === 'emailGuest'
        ? event.target.checked
        : key === 'arrivalTime'
          ? {
            code: event.target.value,
            description: (foundTime && foundTime.CODE_VALUE_EN) || '',
          }
          : event.target.value;
    this.dataUpdateEvent.emit({
      key: 'bookedByInfoUpdated',
      data: Object.assign({}, this.bookedByData),
    });
    if (key === 'countryId') {
      this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { isdCode: event.target.value });
    }
  }
  handleNumberInput(key, event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    // Regular expression to match only numeric characters (0-9)
    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(inputValue)) {
      // If the input is not numeric, prevent it from being entered
      inputElement.value = inputValue.replace(/[^0-9]/g, '');
    }
    if (inputValue === inputElement.value) {
      this.handleDataChange(key, event);
    }
  }
  async handleEmailInput(key, event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    if (this.isValidEmail(inputValue)) {
      this.handleDataChange(key, event);
    }
  }
  async checkUser() {
    try {
      const email = this.bookedByData.email;
      if (this.isValidEmail(email)) {
        const res = await this.bookingService.getUserInfo(email);
        if (res !== null) {
          this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: res.id, firstName: res.first_name, lastName: res.last_name, contactNumber: res.mobile, countryId: res.country_id, isdCode: res.country_id.toString() });
        }
        else {
          this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: undefined, firstName: '', lastName: '', contactNumber: '', countryId: '', isdCode: '' });
        }
        this.dataUpdateEvent.emit({
          key: 'bookedByInfoUpdated',
          data: Object.assign({}, this.bookedByData),
        });
      }
    }
    catch (error) {
      //   toastr.error(error);
    }
  }
  isValidEmail(emailId) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(emailId);
  }
  handleComboboxChange(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    const { key, data } = e.detail;
    switch (key) {
      case 'blur':
        if (data !== '') {
          this.bookedByData.email = data;
          this.checkUser();
        }
        break;
      case 'select':
        this.bookedByData.email = data.email;
        this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: data.id, firstName: data.first_name, lastName: data.last_name, contactNumber: data.mobile, countryId: data.country_id, isdCode: data.country_id.toString() });
        this.dataUpdateEvent.emit({
          key: 'bookedByInfoUpdated',
          data: this.bookedByData,
        });
        break;
    }
  }
  clearEvent() {
    this.bookedByData.email = '';
    this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: '', firstName: '', lastName: '', contactNumber: '', isdCode: this.country.toString(), countryId: this.country });
    this.dataUpdateEvent.emit({
      key: 'bookedByInfoUpdated',
      data: Object.assign({}, this.bookedByData),
    });
  }
  handleButtonClicked(event) {
    switch (event.detail.key) {
      case 'book':
      case 'bookAndCheckIn':
        this.isButtonPressed = true;
        break;
    }
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "text-left mt-3" }, index.h("div", { class: "form-group d-flex flex-column flex-md-row align-items-md-center text-left " }, index.h("label", { class: "p-0 m-0 label-control mr-1 font-weight-bold" }, locales_store.locales.entries.Lcz_BookedBy), index.h("div", { class: "bookedByEmailContainer mt-1 mt-md-0" }, index.h("ir-autocomplete", { danger_border: this.isButtonPressed && this.bookedByData.email === '', onComboboxValue: this.handleComboboxChange.bind(this), propertyId: this.propertyId, type: "email", value: this.bookedByData.email, required: true, placeholder: locales_store.locales.entries.Lcz_FindEmailAddress, onInputCleared: () => this.clearEvent() })))), index.h("div", { class: "bookedDetailsForm text-left mt-2 font-small-3 " }, index.h("div", { class: "d-flex flex-column flex-md-row  justify-content-md-between " }, index.h("div", { class: "p-0 flex-fill " }, index.h("div", { class: "form-group d-flex flex-column flex-md-row align-items-md-center p-0 flex-fill " }, index.h("label", { class: "p-0 m-0 margin3" }, locales_store.locales.entries.Lcz_FirstName), index.h("div", { class: "p-0 m-0  controlContainer flex-fill  " }, index.h("input", { class: `form-control flex-fill ${this.isButtonPressed && this.bookedByData.firstName === '' && 'border-danger'}`, type: "text", placeholder: locales_store.locales.entries.Lcz_FirstName, id: v4.v4(), value: this.bookedByData.firstName, onInput: event => this.handleDataChange('firstName', event), required: true }))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, locales_store.locales.entries.Lcz_LastName), index.h("div", { class: "p-0 m-0  controlContainer flex-fill" }, index.h("input", { class: `form-control ${this.isButtonPressed && this.bookedByData.lastName === '' && 'border-danger'}`, type: "text", placeholder: locales_store.locales.entries.Lcz_LastName, id: v4.v4(), value: this.bookedByData.lastName, onInput: event => this.handleDataChange('lastName', event) }))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, locales_store.locales.entries.Lcz_Country), index.h("div", { class: "p-0 m-0  controlContainer flex-fill" }, index.h("select", { class: `form-control input-sm pr-0`, id: v4.v4(), onChange: event => this.handleDataChange('countryId', event) }, index.h("option", { value: "", selected: this.bookedByData.countryId === '' }, locales_store.locales.entries.Lcz_Select), this.countryNodeList.map(countryNode => (index.h("option", { value: countryNode.id, selected: this.bookedByData.countryId === countryNode.id }, countryNode.name)))))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, locales_store.locales.entries.Lcz_MobilePhone), index.h("div", { class: "p-0 m-0  d-flex  controlContainer flex-fill" }, index.h("div", { class: " p-0 m-0" }, index.h("select", { class: `form-control input-sm pr-0`, id: v4.v4(), onChange: event => this.handleDataChange('isdCode', event) }, index.h("option", { value: "", selected: this.bookedByData.isdCode === '' }, locales_store.locales.entries.Lcz_Isd), this.countryNodeList.map(country => (index.h("option", { value: country.id, selected: this.bookedByData.isdCode === country.id.toString() }, country.phone_prefix))))), index.h("div", { class: "flex-fill p-0 m-0" }, index.h("input", { class: `form-control
                     
                      `, type: "tel", placeholder: locales_store.locales.entries.Lcz_ContactNumber, id: v4.v4(), value: this.bookedByData.contactNumber, onInput: event => this.handleNumberInput('contactNumber', event) })))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, locales_store.locales.entries.Lcz_YourArrivalTime), index.h("div", { class: "p-0 m-0  controlContainer flex-fill" }, index.h("select", { class: `form-control input-sm pr-0 ${this.isButtonPressed && this.bookedByData.selectedArrivalTime.code === '' && 'border-danger'}`, id: v4.v4(), onChange: event => this.handleDataChange('selectedArrivalTime', event) }, this.arrivalTimeList.map(time => (index.h("option", { value: time.CODE_NAME, selected: this.bookedByData.selectedArrivalTime.code === time.CODE_NAME }, time.CODE_VALUE_EN))))))), index.h("div", { class: "p-0 flex-fill  ml-md-3" }, index.h("div", { class: "  p-0 d-flex flex-column flex-md-row align-items-md-center " }, index.h("label", { class: "p-0 m-0 margin3" }, locales_store.locales.entries.Lcz_AnyMessageForUs), index.h("div", { class: "p-0 m-0  controlContainer flex-fill " }, index.h("textarea", { id: v4.v4(), rows: 4, class: "form-control ", name: "message", value: this.bookedByData.message, onInput: event => this.handleDataChange('message', event) }))), this.showPaymentDetails && (index.h(index.Fragment, null, index.h("div", { class: "form-group mt-md-1  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, locales_store.locales.entries.Lcz_CardNumber), index.h("div", { class: "p-0 m-0  controlContainer flex-fill" }, index.h("input", { class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4.v4(), value: this.bookedByData.cardNumber, onInput: event => this.handleNumberInput('cardNumber', event) }))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, locales_store.locales.entries.Lcz_CardHolderName), index.h("div", { class: "p-0 m-0  controlContainer flex-fill" }, index.h("input", { class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4.v4(), value: this.bookedByData.cardHolderName, onInput: event => this.handleDataChange('cardHolderName', event) }))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, locales_store.locales.entries.Lcz_ExpiryDate), index.h("div", { class: "p-0 m-0 row  controlContainer flex-fill" }, index.h("div", { class: "p-0 m-0" }, index.h("select", { class: "form-control input-sm pr-0", id: v4.v4(), onChange: event => this.handleDataChange('expiryMonth', event) }, this.expiryMonths.map(month => (index.h("option", { value: month, selected: month === this.bookedByData.expiryMonth }, month))))), index.h("div", { class: "p-0 m-0 ml-1" }, index.h("select", { class: "form-control input-sm pr-0", id: v4.v4(), onChange: event => this.handleDataChange('expiryYear', event) }, this.expiryYears.map((year, index$1) => (index.h("option", { value: year, selected: index$1 === this.bookedByData.expiryYear }, year))))))))), index.h("div", { class: "form-group mt-1 p-0 d-flex flex-row align-items-center" }, index.h("label", { class: "p-0 m-0", htmlFor: 'emailTheGuestId' }, locales_store.locales.entries.Lcz_EmailTheGuest), index.h("div", { class: "p-0 m-0  controlContainer flex-fill checkBoxContainer" }, index.h("input", { class: "form-control", type: "checkbox", checked: this.bookedByData.emailGuest, id: 'emailTheGuestId', onChange: event => this.handleDataChange('emailGuest', event) }))))))));
  }
};
IglPropertyBookedBy.style = iglPropertyBookedByCss;

const irAutocompleteCss = ".sc-ir-autocomplete-h{display:block;position:relative}.selected.sc-ir-autocomplete{color:#fff;text-decoration:none;background-color:#666ee8}input.sc-ir-autocomplete{width:100%;position:relative;border-top-left-radius:0px !important;border-left:0 !important;border-bottom-left-radius:0px !important}label.sc-ir-autocomplete{margin:0;border-top-right-radius:0px !important;border-right:0 !important;border-bottom-right-radius:0px !important;width:fit-content;display:flex;align-items:center;padding-right:3px !important;justify-content:center;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}label[data-state='focused'].sc-ir-autocomplete{border-color:var(--blue)}.combobox.sc-ir-autocomplete{margin:0;top:30px;min-width:100%;width:max-content;display:block;z-index:10000;padding:1px;background:white;box-shadow:0px 8px 16px 0px rgba(0, 0, 0, 0.2);padding:5px 0;max-height:250px;overflow-y:auto}.dropdown-item.sc-ir-autocomplete{cursor:pointer}button.sc-ir-autocomplete{all:unset;right:4px}.combobox.sc-ir-autocomplete p.sc-ir-autocomplete,span.sc-ir-autocomplete,loader-container.sc-ir-autocomplete{padding:5px 16px;margin:0px;margin-top:2px;width:100%}.combobox.sc-ir-autocomplete p.sc-ir-autocomplete{cursor:pointer}.combobox.sc-ir-autocomplete p.sc-ir-autocomplete:hover{background:#f4f5fa}.combobox.sc-ir-autocomplete p[data-selected].sc-ir-autocomplete,.combobox.sc-ir-autocomplete p[data-selected].sc-ir-autocomplete:hover{color:#fff;text-decoration:none;background-color:#666ee8}.loader.sc-ir-autocomplete{width:14px;height:14px;border:2px solid #0f0f0f;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const IrAutocomplete = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.comboboxValue = index.createEvent(this, "comboboxValue", 7);
    this.inputCleared = index.createEvent(this, "inputCleared", 7);
    this.toast = index.createEvent(this, "toast", 7);
    this.bookingService = new booking_service.BookingService();
    this.no_result_found = '';
    this.duration = 300;
    this.placeholder = '';
    this.propertyId = undefined;
    this.isSplitBooking = false;
    this.type = 'text';
    this.name = '';
    this.inputId = v4.v4();
    this.required = false;
    this.disabled = false;
    this.value = undefined;
    this.from_date = '';
    this.to_date = '';
    this.danger_border = undefined;
    this.inputValue = '';
    this.data = [];
    this.selectedIndex = -1;
    this.isComboBoxVisible = false;
    this.isLoading = true;
    this.isItemSelected = undefined;
    this.inputFocused = false;
  }
  componentWillLoad() {
    this.bookingService.setToken(calendarData.calendar_data.token);
    this.no_result_found = locales_store.locales.entries.Lcz_NoResultsFound;
  }
  handleKeyDown(event) {
    var _a;
    const dataSize = this.data.length;
    const itemHeight = this.getHeightOfPElement();
    if (dataSize > 0) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.selectedIndex = (this.selectedIndex - 1 + dataSize) % dataSize;
          this.adjustScrollPosition(itemHeight);
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.selectedIndex = (this.selectedIndex + 1) % dataSize;
          this.adjustScrollPosition(itemHeight);
          break;
        case 'Enter':
        case ' ':
        case 'ArrowRight':
          event.preventDefault();
          this.selectItem(this.selectedIndex);
          break;
        case 'Escape':
          (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.blur();
          this.isComboBoxVisible = false;
          break;
      }
    }
  }
  getHeightOfPElement() {
    const combobox = this.el.querySelector('.combobox');
    if (combobox) {
      const pItem = combobox.querySelector('p');
      return pItem ? pItem.offsetHeight : 0;
    }
    return 0;
  }
  adjustScrollPosition(itemHeight, visibleHeight = 250) {
    const combobox = this.el.querySelector('.combobox');
    if (combobox) {
      const margin = 2;
      const itemTotalHeight = itemHeight + margin;
      const selectedPosition = itemTotalHeight * this.selectedIndex;
      let newScrollTop = selectedPosition - visibleHeight / 2 + itemHeight / 2;
      newScrollTop = Math.max(0, Math.min(newScrollTop, combobox.scrollHeight - visibleHeight));
      combobox.scrollTo({
        top: newScrollTop,
        behavior: 'auto',
      });
    }
  }
  selectItem(index) {
    if (this.data[index]) {
      this.isItemSelected = true;
      this.comboboxValue.emit({ key: 'select', data: this.data[index] });
      this.inputValue = '';
      this.resetCombobox();
    }
  }
  debounceFetchData() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.fetchData();
    }, this.duration);
  }
  async fetchData() {
    try {
      this.isLoading = true;
      let data = [];
      if (!this.isSplitBooking) {
        data = await this.bookingService.fetchExposedGuest(this.inputValue, this.propertyId);
      }
      else {
        if (this.inputValue.split(' ').length === 1) {
          data = await this.bookingService.fetchExposedBookings(this.inputValue, this.propertyId, this.from_date, this.to_date);
        }
      }
      this.data = data;
      if (!this.isComboBoxVisible) {
        this.isComboBoxVisible = true;
      }
    }
    catch (error) {
      console.log('error', error);
    }
    finally {
      this.isLoading = false;
    }
  }
  handleInputChange(event) {
    this.inputValue = event.target.value;
    if (this.inputValue) {
      this.debounceFetchData();
    }
    else {
      clearTimeout(this.debounceTimer);
      this.resetCombobox(false);
    }
  }
  handleDocumentClick(event) {
    const target = event.target;
    if (!this.el.contains(target)) {
      this.isComboBoxVisible = false;
    }
  }
  handleBlur() {
    this.inputFocused = false;
    setTimeout(() => {
      if (this.isDropdownItem(document.activeElement)) {
        return;
      }
      if (this.isSplitBooking) {
        if (!this.isItemSelected) {
          if (this.data.length > 0) {
            this.comboboxValue.emit({ key: 'blur', data: this.inputValue });
          }
          else {
            if (this.inputValue !== '') {
              this.toast.emit({
                type: 'error',
                description: '',
                title: `The Booking #${this.inputValue} is not Available`,
                position: 'top-right',
              });
              this.inputCleared.emit();
            }
          }
          this.inputValue = '';
          this.resetCombobox();
        }
        else {
          this.isItemSelected = false;
        }
      }
      else {
        if (!this.isItemSelected) {
          this.comboboxValue.emit({ key: 'blur', data: this.inputValue });
          this.inputValue = '';
          this.resetCombobox();
        }
        else {
          this.isItemSelected = false;
        }
      }
    }, 200);
  }
  isDropdownItem(element) {
    return element && element.closest('.combobox');
  }
  disconnectedCallback() {
    var _a, _b, _c, _d;
    clearTimeout(this.debounceTimer);
    (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.removeEventListener('blur', this.handleBlur);
    (_b = this.inputRef) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', this.selectItem);
    (_c = this.inputRef) === null || _c === void 0 ? void 0 : _c.removeEventListener('keydown', this.handleKeyDown);
    (_d = this.inputRef) === null || _d === void 0 ? void 0 : _d.removeEventListener('focus', this.handleFocus);
  }
  handleItemKeyDown(event, index) {
    var _a;
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowRight') {
      this.selectItem(index);
      event.preventDefault();
    }
    else if (event.key === 'Escape') {
      this.isComboBoxVisible = false;
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.blur();
      event.preventDefault();
    }
    else {
      return;
    }
  }
  renderDropdown() {
    var _a;
    if (this.inputValue !== '') {
      return (index.h("div", { class: `position-absolute border rounded combobox` }, (_a = this.data) === null || _a === void 0 ? void 0 :
        _a.map((d, index$1) => (index.h("p", { role: "button", onKeyDown: e => this.handleItemKeyDown(e, index$1), "data-selected": this.selectedIndex === index$1, tabIndex: 0, onClick: () => this.selectItem(index$1) }, this.isSplitBooking ? (index.h(index.Fragment, null, `${d.booking_nbr} ${d.guest.first_name} ${d.guest.last_name}`)) : (index.h("div", { class: 'd-flex align-items-center flex-fill' }, index.h("p", { class: 'p-0 m-0' }, `${d.email}`, " ", index.h("span", { class: 'p-0 m-0' }, ` - ${d.first_name} ${d.last_name}`))))))), this.isLoading && (index.h("div", { class: "loader-container d-flex align-items-center justify-content-center" }, index.h("div", { class: "loader" }))), this.data.length === 0 && !this.isLoading && index.h("span", { class: 'text-center' }, this.no_result_found)));
    }
  }
  handleFocus() {
    this.isComboBoxVisible = true;
    this.inputFocused = true;
  }
  clearInput() {
    this.inputValue = '';
    this.resetCombobox();
    this.inputCleared.emit(null);
  }
  resetCombobox(withblur = true) {
    var _a;
    if (withblur) {
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.blur();
    }
    this.data = [];
    this.selectedIndex = -1;
    this.isComboBoxVisible = false;
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: 'd-flex align-items-center ' }, index.h("label", { "data-state": this.inputFocused ? 'focused' : 'blured', htmlFor: this.inputId, class: `form-control input-sm ${this.danger_border && 'border-danger'}` }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "12", width: "12", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }))), index.h("input", { required: this.required, disabled: this.disabled, id: this.inputId, onKeyDown: this.handleKeyDown.bind(this), class: `form-control input-sm flex-full ${this.danger_border && 'border-danger'}`, type: this.type, name: this.name, value: this.value || this.inputValue, placeholder: this.placeholder, onBlur: this.handleBlur.bind(this), onInput: this.handleInputChange.bind(this), onFocus: this.handleFocus.bind(this), ref: el => (this.inputRef = el) }), this.inputValue && (index.h("button", { type: "button", class: 'position-absolute d-flex align-items-center justify-content-center ', onClick: this.clearInput.bind(this) }, index.h("p", { class: 'sr-only' }, "clear input"), index.h("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", "fill-rule": "evenodd", "clip-rule": "evenodd" }))))), this.isComboBoxVisible && this.renderDropdown()));
  }
  get el() { return index.getElement(this); }
};
IrAutocomplete.style = irAutocompleteCss;

const _formatDate = (date) => {
  // Month Name 3 letters, Day, Year
  return utils.hooks(date).format('MMM DD, YYYY');
};
const _formatAmount = (amount, currency = 'USD') => {
  // format the amount using accounting.js
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
};
const _getDay = (date) => {
  // formate it as day number/month number and day name
  return utils.hooks(date).format('DD/MM ddd');
};
const _formatTime = (hour, minute) => {
  // format them as AM/PM using moment.js
  return utils.hooks(`${hour}:${minute}`, 'HH:mm').format('hh:mm A');
};

const irBookingDetailsCss = ".sc-ir-booking-details-h{overflow-x:hidden}.confirmed.sc-ir-booking-details{color:#fff;display:flex;align-items:center}.bg-ir-green.sc-ir-booking-details{background:#629a4c;height:28px;padding-top:0 !important;padding-bottom:0 !important}.h-28.sc-ir-booking-details{height:2rem}.mx-01.sc-ir-booking-details{--m:5px;margin-right:var(--m) !important;margin-left:var(--m) !important}.bg-ir-red.sc-ir-booking-details{background:#ff4961;height:28px;padding-top:0 !important;padding-bottom:0 !important}.bg-ir-orange.sc-ir-booking-details{background:#ff9149;height:28px;padding-top:0 !important;padding-bottom:0 !important}.date-margin.sc-ir-booking-details{margin-right:5px}.pickup-margin.sc-ir-booking-details{margin-bottom:7px !important}.header-date.sc-ir-booking-details{padding-left:5px !important}.pointer.sc-ir-booking-details{cursor:pointer}.sc-ir-booking-details:root{--sidebar-width:50rem}.sm-padding-right.sc-ir-booking-details{padding-right:0.2rem}.sm-padding-left.sc-ir-booking-details{padding-left:0.2rem}.sm-padding-top.sc-ir-booking-details{padding-top:0.2rem}.sm-padding-bottom.sc-ir-booking-details{padding-bottom:0.2rem}.info-notes.sc-ir-booking-details{list-style:none;padding-left:0}.light-blue-bg.sc-ir-booking-details{background-color:#acecff;padding:0rem 0.1rem}.iframeHeight.sc-ir-booking-details{height:17.5rem}";

const IrBookingDetails = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.toast = index.createEvent(this, "toast", 7);
    this.bookingChanged = index.createEvent(this, "bookingChanged", 7);
    this.bookingService = new booking_service.BookingService();
    this.roomService = new room_service$1.RoomService();
    this.language = '';
    this.ticket = '';
    this.bookingNumber = '';
    this.baseurl = '';
    this.propertyid = undefined;
    this.is_from_front_desk = false;
    this.hasPrint = false;
    this.hasReceipt = false;
    this.hasDelete = false;
    this.hasMenu = false;
    this.hasRoomEdit = false;
    this.hasRoomDelete = false;
    this.hasRoomAdd = false;
    this.hasCheckIn = false;
    this.hasCheckOut = false;
    this.bookingItem = null;
    this.statusData = [];
    this.tempStatus = null;
    this.showPaymentDetails = undefined;
    this.bookingData = undefined;
    this.countryNodeList = undefined;
    this.calendarData = {};
    this.guestData = null;
    this.defaultTexts = undefined;
    this.rerenderFlag = false;
    this.sidebarState = null;
    this.isUpdateClicked = false;
  }
  componentDidLoad() {
    if (this.baseurl) {
      Token.axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      calendarData.calendar_data.token = this.ticket;
      this.bookingService.setToken(this.ticket);
      this.roomService.setToken(this.ticket);
      this.initializeApp();
    }
  }
  async ticketChanged() {
    calendarData.calendar_data.token = this.ticket;
    this.bookingService.setToken(this.ticket);
    this.roomService.setToken(this.ticket);
    this.initializeApp();
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
  async initializeApp() {
    try {
      const [roomResponse, languageTexts, countriesList, bookingDetails] = await Promise.all([
        this.roomService.fetchData(this.propertyid, this.language),
        this.roomService.fetchLanguage(this.language),
        this.bookingService.getCountries(this.language),
        this.bookingService.getExposedBooking(this.bookingNumber, this.language),
      ]);
      if (!locales_store.locales.entries) {
        locales_store.locales.entries = languageTexts.entries;
        locales_store.locales.direction = languageTexts.direction;
      }
      this.defaultTexts = languageTexts;
      this.countryNodeList = countriesList;
      const { allowed_payment_methods: paymentMethods, currency, allowed_booking_sources, adult_child_constraints, calendar_legends } = roomResponse['My_Result'];
      this.calendarData = { currency, allowed_booking_sources, adult_child_constraints, legendData: calendar_legends };
      this.setRoomsData(roomResponse);
      const paymentCodesToShow = ['001', '004'];
      this.showPaymentDetails = paymentMethods.some(method => paymentCodesToShow.includes(method.code));
      this.guestData = bookingDetails.guest;
      this.bookingData = bookingDetails;
      this.rerenderFlag = !this.rerenderFlag;
    }
    catch (error) {
      console.error('Error initializing app:', error);
    }
  }
  handleIconClick(e) {
    const target = e.target;
    switch (target.id) {
      case 'pickup':
        this.sidebarState = 'pickup';
        return;
      case 'print':
        window.open(`https://x.igloorooms.com/manage/AcBookingEdit.aspx?IRID=${this.bookingData.system_id}&&PM=B&TK=${this.ticket}`);
        return;
      case 'receipt':
        window.open(`https://x.igloorooms.com/manage/AcBookingEdit.aspx?IRID=${this.bookingData.system_id}&&PM=I&TK=${this.ticket}`);
        return;
      case 'book-delete':
        return;
      case 'menu':
        window.location.href = 'https://x.igloorooms.com/manage/acbookinglist.aspx';
        return;
      case 'room-add':
        this.bookingItem = {
          ID: '',
          NAME: this.bookingData.guest.last_name,
          EMAIL: this.bookingData.guest.email,
          PHONE: this.bookingData.guest.mobile,
          REFERENCE_TYPE: '',
          FROM_DATE: this.bookingData.from_date,
          ARRIVAL: this.bookingData.arrival,
          TO_DATE: this.bookingData.to_date,
          TITLE: `${locales_store.locales.entries.Lcz_AddingUnitToBooking}# ${this.bookingData.booking_nbr}`,
          defaultDateRange: {
            fromDate: new Date(this.bookingData.from_date),
            fromDateStr: '',
            toDate: new Date(this.bookingData.to_date),
            toDateStr: '',
            dateDifference: 0,
            message: '',
          },
          event_type: 'ADD_ROOM',
          BOOKING_NUMBER: this.bookingData.booking_nbr,
          ADD_ROOM_TO_BOOKING: this.bookingData.booking_nbr,
          GUEST: this.bookingData.guest,
          message: this.bookingData.remark,
          SOURCE: this.bookingData.source,
          ROOMS: this.bookingData.rooms,
        };
        return;
      case 'add-payment':
        return;
    }
  }
  handleEditSidebar() {
    this.sidebarState = 'guest';
  }
  handleSelectChange(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    const target = e.target;
    this.tempStatus = target.selectedValue;
  }
  openEditSidebar() {
    const sidebar = document.querySelector('ir-sidebar#editGuestInfo');
    sidebar.open = true;
  }
  async updateStatus() {
    if (this.tempStatus !== '' && this.tempStatus !== null) {
      try {
        this.isUpdateClicked = true;
        await Token.axios.post(`/Change_Exposed_Booking_Status?Ticket=${this.ticket}`, {
          book_nbr: this.bookingNumber,
          status: this.tempStatus,
        });
        this.toast.emit({
          type: 'success',
          description: '',
          title: locales_store.locales.entries.Lcz_StatusUpdatedSuccessfully,
          position: 'top-right',
        });
        await this.resetBookingData();
      }
      catch (error) {
        console.log(error);
      }
      finally {
        this.isUpdateClicked = false;
      }
    }
    else {
      this.toast.emit({
        type: 'error',
        description: '',
        title: locales_store.locales.entries.Lcz_SelectStatus,
        position: 'top-right',
      });
    }
  }
  handleEditInitiated(e) {
    this.bookingItem = e.detail;
  }
  handleCloseBookingWindow() {
    this.bookingItem = null;
  }
  handleDeleteFinish(e) {
    this.bookingData = Object.assign(Object.assign({}, this.bookingData), { rooms: this.bookingData.rooms.filter(room => room.identifier !== e.detail) });
  }
  async resetBookingData() {
    try {
      const booking = await this.bookingService.getExposedBooking(this.bookingNumber, this.language);
      this.bookingData = Object.assign({}, booking);
      this.bookingChanged.emit(this.bookingData);
    }
    catch (error) {
      console.log(error);
    }
  }
  async handleResetBookingData(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    await this.resetBookingData();
  }
  render() {
    var _a;
    if (!this.bookingData) {
      return null;
    }
    let confirmationBG = '';
    switch (this.bookingData.status.code) {
      case '001':
        confirmationBG = 'bg-ir-orange';
        break;
      case '002':
        confirmationBG = 'bg-ir-green';
        break;
      case '003':
        confirmationBG = 'bg-ir-red';
        break;
      case '004':
        confirmationBG = 'bg-ir-red';
        break;
    }
    return [
      index.h(index.Fragment, null, !this.is_from_front_desk && (index.h(index.Fragment, null, index.h("ir-toast", null), index.h("ir-interceptor", null)))),
      index.h("div", { class: "fluid-container p-1" }, index.h("div", { class: "d-flex flex-column p-0 mx-0 flex-lg-row align-items-md-center justify-content-between mt-1" }, index.h("div", { class: "m-0 p-0 mb-1 mb-lg-0 mt-md-0  d-flex justify-content-start align-items-center" }, index.h("p", { class: "font-size-large m-0 p-0" }, `${this.defaultTexts.entries.Lcz_Booking}#${this.bookingNumber}`), index.h("p", { class: "m-0 p-0 ml-1" }, !this.bookingData.is_direct && (index.h("span", { class: "mr-1 m-0" }, this.bookingData.channel_booking_nbr, " ")), index.h("span", { class: "date-margin" }, _formatDate(this.bookingData.booked_on.date)), _formatTime(this.bookingData.booked_on.hour.toString(), +' ' + this.bookingData.booked_on.minute.toString()))), index.h("div", { class: "d-flex justify-content-end align-items-center" }, index.h("span", { class: `confirmed btn-sm m-0 mr-2 ${confirmationBG}` }, this.bookingData.status.description), this.bookingData.allowed_actions.length > 0 && (index.h(index.Fragment, null, index.h("ir-select", { selectContainerStyle: "h-28", selectStyles: "d-flex align-items-center h-28", firstOption: locales_store.locales.entries.Lcz_Select, id: "update-status", size: "sm", "label-available": "false", data: this.bookingData.allowed_actions.map(b => ({ text: b.description, value: b.code })), textSize: "sm", class: "sm-padding-right m-0" }), index.h("ir-button", { onClickHanlder: this.updateStatus.bind(this), btn_styles: "h-28", isLoading: this.isUpdateClicked, btn_disabled: this.isUpdateClicked, id: "update-status-btn", size: "sm", text: "Update" }))), this.hasReceipt && (index.h("ir-icon", { id: "receipt", class: "mx-1" }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", stroke: "#104064", height: "24", width: "19", viewBox: "0 0 384 512" }, index.h("path", { fill: "#104064", d: "M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z" })))), this.hasPrint && (index.h("ir-icon", { id: "print", icon: "ft-printer h1 color-ir-dark-blue-hover m-0 ml-1  pointer" }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 512 512" }, index.h("path", { fill: "#104064", d: "M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" })))), this.hasDelete && index.h("ir-icon", { id: "book-delete", icon: "ft-trash-2 h1 danger m-0 ml-1 pointer" }), this.hasMenu && (index.h("ir-icon", { id: "menu", class: "m-0 ml-1 pointer" }, index.h("svg", { slot: "icon", height: 24, width: 24, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, index.h("path", { fill: "#104064", d: "M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" }))))))),
      index.h("div", { class: "fluid-container p-1 text-left mx-0" }, index.h("div", { class: "row m-0" }, index.h("div", { class: "col-12 p-0 mx-0 pr-lg-1 col-lg-6" }, index.h("div", { class: "card" }, index.h("div", { class: "p-1" }, this.bookingData.property.name || '', index.h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Source}:`, value: this.bookingData.origin.Label, imageSrc: this.bookingData.origin.Icon }), index.h("ir-label", { label: `${this.defaultTexts.entries.Lcz_BookedBy}:`, value: `${this.bookingData.guest.first_name} ${this.bookingData.guest.last_name}`, iconShown: true }), index.h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Phone}:`, value: this.bookingData.guest.mobile }), index.h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Email}:`, value: this.bookingData.guest.email }), this.bookingData.guest.alternative_email && (index.h("ir-label", { label: `${this.defaultTexts.entries.Lcz_AlternativeEmail}:`, value: this.bookingData.guest.alternative_email })), index.h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Address}:`, value: this.bookingData.guest.address }), this.bookingData.is_direct && index.h("ir-label", { label: `${this.defaultTexts.entries.Lcz_ArrivalTime}:`, value: this.bookingData.arrival.description }), this.bookingData.is_direct ? (index.h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Note}:`, value: this.bookingData.remark })) : (index.h("ota-label", { label: `${this.defaultTexts.entries.Lcz_Note}:`, remarks: this.bookingData.ota_notes })))), index.h("div", { class: "font-size-large d-flex justify-content-between align-items-center mb-1" }, index.h("ir-date-view", { from_date: this.bookingData.from_date, to_date: this.bookingData.to_date }), this.hasRoomAdd && this.bookingData.is_direct && (index.h("ir-icon", { id: "room-add" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512", slot: "icon" }, index.h("path", { fill: "#6b6f82", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" }))))), index.h("div", { class: "card p-0 mx-0" }, this.bookingData.rooms.map((room, index$1) => {
        const mealCodeName = room.rateplan.name;
        const myRoomTypeFoodCat = room.roomtype.name;
        return [
          index.h("ir-room", { defaultTexts: this.defaultTexts, legendData: this.calendarData.legendData, roomsInfo: this.calendarData.roomsInfo, myRoomTypeFoodCat: myRoomTypeFoodCat, mealCodeName: mealCodeName, currency: this.bookingData.currency.code, hasRoomEdit: this.hasRoomEdit && this.bookingData.status.code !== '003' && this.bookingData.is_direct, hasRoomDelete: this.hasRoomDelete && this.bookingData.status.code !== '003' && this.bookingData.is_direct, hasCheckIn: this.hasCheckIn, hasCheckOut: this.hasCheckOut, bookingEvent: this.bookingData, bookingIndex: index$1, ticket: this.ticket, onDeleteFinished: this.handleDeleteFinish.bind(this) }),
          // add separator if not last item with marginHorizontal and alignCenter
          index$1 !== this.bookingData.rooms.length - 1 && index.h("hr", { class: "mr-2 ml-2 my-0 p-0" }),
        ];
      })), calendarData.calendar_data.pickup_service.is_enabled && this.bookingData.is_direct && (index.h("div", { class: "mb-1" }, index.h("div", { class: 'd-flex w-100 mb-1 align-items-center justify-content-between' }, index.h("p", { class: 'font-size-large p-0 m-0 ' }, locales_store.locales.entries.Lcz_Pickup), index.h("ir-icon", { class: "pointer ", id: "pickup" }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, index.h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" })))), this.bookingData.pickup_info && (index.h("div", { class: 'card' }, index.h("div", { class: 'p-1' }, index.h("div", { class: 'd-flex align-items-center py-0 my-0 pickup-margin' }, index.h("p", { class: 'font-weight-bold mr-1 py-0 my-0' }, locales_store.locales.entries.Lcz_Date, ": ", index.h("span", { class: 'font-weight-normal' }, utils.hooks(this.bookingData.pickup_info.date, 'YYYY-MM-DD').format('MMM DD, YYYY'))), index.h("p", { class: 'font-weight-bold flex-fill py-0 my-0' }, locales_store.locales.entries.Lcz_Time, ":", index.h("span", { class: 'font-weight-normal' }, " ", `${utils$1.renderTime(this.bookingData.pickup_info.hour)}:${utils$1.renderTime(this.bookingData.pickup_info.minute)}`)), index.h("p", { class: 'font-weight-bold py-0 my-0' }, locales_store.locales.entries.Lcz_DueUponBooking, ":", ' ', index.h("span", { class: 'font-weight-normal' }, this.bookingData.pickup_info.currency.symbol, this.bookingData.pickup_info.total))), index.h("p", { class: 'font-weight-bold py-0 my-0' }, locales_store.locales.entries.Lcz_FlightDetails, ":", index.h("span", { class: 'font-weight-normal' }, " ", `${this.bookingData.pickup_info.details}`)), index.h("p", { class: 'py-0 my-0 pickup-margin' }, `${this.bookingData.pickup_info.selected_option.vehicle.description}`), index.h("p", { class: 'font-weight-bold py-0 my-0 pickup-margin' }, locales_store.locales.entries.Lcz_NbrOfVehicles, ":", index.h("span", { class: 'font-weight-normal' }, " ", `${this.bookingData.pickup_info.nbr_of_units}`)), index.h("p", { class: 'small py-0 my-0 pickup-margin' }, calendarData.calendar_data.pickup_service.pickup_instruction.description, calendarData.calendar_data.pickup_service.pickup_cancelation_prepayment.description))))))), index.h("div", { class: "col-12 p-0 m-0 pl-lg-1 col-lg-6" }, index.h("ir-payment-details", { defaultTexts: this.defaultTexts, bookingDetails: this.bookingData })))),
      index.h("ir-sidebar", { open: this.sidebarState !== null, side: 'right', id: "editGuestInfo", onIrSidebarToggle: e => {
          e.stopImmediatePropagation();
          e.stopPropagation();
          this.sidebarState = null;
        }, showCloseButton: false }, this.sidebarState === 'guest' && (index.h("ir-guest-info", { booking_nbr: this.bookingNumber, defaultTexts: this.defaultTexts, email: (_a = this.bookingData) === null || _a === void 0 ? void 0 : _a.guest.email, language: this.language, onCloseSideBar: () => (this.sidebarState = null) })), this.sidebarState === 'pickup' && (index.h("ir-pickup", { defaultPickupData: this.bookingData.pickup_info, bookingNumber: this.bookingData.booking_nbr, numberOfPersons: this.bookingData.occupancy.adult_nbr + this.bookingData.occupancy.children_nbr, onCloseModal: () => (this.sidebarState = null) }))),
      index.h(index.Fragment, null, this.bookingItem && (index.h("igl-book-property", { allowedBookingSources: this.calendarData.allowed_booking_sources, adultChildConstraints: this.calendarData.adult_child_constraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onCloseBookingWindow: () => this.handleCloseBookingWindow() }))),
    ];
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrBookingDetails.style = irBookingDetailsCss;

const initialState = {
  channels: [],
  settlement_methods: [],
  statuses: [],
  types: [],
  token: '',
  rowCount: 10,
  bookings: [],
  userSelection: {
    from: utils.hooks().add(-7, 'days').format('YYYY-MM-DD'),
    to: utils.hooks().format('YYYY-MM-DD'),
    channel: '',
    property_id: null,
    start_row: 0,
    end_row: 20,
    total_count: 0,
    filter_type: null,
    name: '',
    book_nbr: '',
    booking_status: '',
    affiliate_id: 0,
    is_mpo_managed: false,
    is_mpo_used: false,
    is_for_mobile: false,
    is_combined_view: false,
    is_to_export: false,
  },
  download_url: null,
};
const { state: booking_listing, onChange: onBookingListingChange } = locales_store.createStore(initialState);
function initializeUserSelection() {
  //booking_listing.channels[0].name
  booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { channel: '', booking_status: booking_listing.statuses[0].code, filter_type: booking_listing.types[0].id, book_nbr: '', name: '', from: utils.hooks().add(-7, 'days').format('YYYY-MM-DD'), to: utils.hooks().format('YYYY-MM-DD'), start_row: 0, end_row: booking_listing.rowCount });
}
function updateUserSelection(key, value) {
  booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { [key]: value });
}

class BookingListingService extends Token.Token {
  async getExposedBookingsCriteria() {
    const token = this.getToken();
    if (!token) {
      throw new Error('Invalid token');
    }
    const { data } = await Token.axios.post(`/Get_Exposed_Bookings_Criteria?Ticket=${token}`);
    const result = data.My_Result;
    booking_listing.channels = result.channels;
    booking_listing.settlement_methods = result.settlement_methods;
    booking_listing.statuses = result.statuses;
    booking_listing.types = result.types;
    initializeUserSelection();
  }
  async getExposedBookings(params) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Invalid token');
    }
    const { data } = await Token.axios.post(`/Get_Exposed_Bookings?Ticket=${token}`, params);
    const result = data.My_Result;
    const header = data.My_Params_Get_Exposed_Bookings;
    booking_listing.bookings = [...result];
    booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { total_count: header.total_count });
    booking_listing.download_url = header.exported_data_url;
  }
  async removeExposedBooking(booking_nbr, is_to_revover) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Invalid token');
    }
    await Token.axios.post(`/Remove_Exposed_Booking?Ticket=${token}`, {
      booking_nbr,
      is_to_revover,
    });
  }
}

const irBookingListingCss = ".sc-ir-booking-listing-h{display:block;height:100vh}.card.sc-ir-booking-listing{overflow-x:auto}.secondary-p.sc-ir-booking-listing{font-size:12px !important}.h-screen.sc-ir-booking-listing{height:100vh}.main-container.sc-ir-booking-listing{height:100vh;overflow-y:auto}.bg-ir-red.sc-ir-booking-listing{background:#ff4961;height:28px;padding-top:0 !important;padding-bottom:0 !important}.due-btn.sc-ir-booking-listing{border:1px solid #ff4961;color:#ff4961;cursor:pointer;padding:1px 0.25rem !important;font-size:12px !important}.due-btn.sc-ir-booking-listing:hover{background:#ff4961;color:white}.booking_number.sc-ir-booking-listing{all:unset;cursor:pointer}.booking_number.sc-ir-booking-listing:hover{color:#1e9ff2}.in-out.sc-ir-booking-listing{width:150px !important}.buttons-container.sc-ir-booking-listing{gap:10px}td.sc-ir-booking-listing ul.sc-ir-booking-listing{width:max-content !important}td.sc-ir-booking-listing{width:max-content !important}.date-p.sc-ir-booking-listing{width:max-content !important;min-width:100%;text-align:center !important}";

const IrBookingListing = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.bookingListingService = new BookingListingService();
    this.roomService = new room_service.RoomService();
    this.statusColors = {
      '001': 'badge-warning',
      '002': 'badge-success',
      '003': 'badge-danger',
      '004': 'badge-danger',
    };
    this.language = '';
    this.ticket = '';
    this.baseurl = '';
    this.propertyid = undefined;
    this.rowCount = 10;
    this.isLoading = false;
    this.currentPage = 1;
    this.totalPages = 1;
    this.oldStartValue = 0;
    this.editBookingItem = null;
  }
  componentWillLoad() {
    updateUserSelection('end_row', this.rowCount);
    booking_listing.rowCount = this.rowCount;
    if (this.baseurl) {
      Token.axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.bookingListingService.setToken(this.ticket);
      this.roomService.setToken(this.ticket);
      booking_listing.token = this.ticket;
      this.initializeApp();
    }
    onBookingListingChange('userSelection', async (newValue) => {
      const newTotal = newValue.total_count;
      if (newTotal && this.totalPages !== newTotal) {
        this.totalPages = Math.round(newTotal / this.rowCount);
      }
    });
  }
  async ticketChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.bookingListingService.setToken(this.ticket);
      this.roomService.setToken(this.ticket);
      booking_listing.token = this.ticket;
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      this.isLoading = true;
      updateUserSelection('property_id', this.propertyid);
      await Promise.all([this.bookingListingService.getExposedBookingsCriteria(), this.roomService.fetchLanguage(this.language, ['_BOOKING_LIST_FRONT'])]);
      await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({}, booking_listing.userSelection), { is_to_export: false }));
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  handleSideBarToggle(e) {
    if (e.detail && this.editBookingItem) {
      this.editBookingItem = null;
    }
  }
  getPaginationBounds() {
    const totalCount = booking_listing.userSelection.total_count;
    const startItem = (this.currentPage - 1) * this.rowCount;
    let endItem = this.currentPage * this.rowCount;
    endItem = endItem > totalCount ? totalCount : endItem;
    return { startItem, endItem, totalCount };
  }
  openModal() {
    this.listingModalTimeout = setTimeout(() => {
      this.listingModal = this.el.querySelector('ir-listing-modal');
      this.listingModal.editBooking = this.editBookingItem;
      this.listingModal.openModal();
    }, 100);
  }
  disconnectedCallback() {
    clearTimeout(this.listingModalTimeout);
  }
  async handleResetData(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({}, booking_listing.userSelection), { is_to_export: false }));
  }
  async handleResetStoreData(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({}, booking_listing.userSelection), { is_to_export: false }));
  }
  handleBookingChanged(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    booking_listing.bookings = [
      ...booking_listing.bookings.map(b => {
        if (b.booking_nbr === e.detail.booking_nbr) {
          return e.detail;
        }
        return b;
      }),
    ];
  }
  renderItemRange() {
    const { endItem, startItem, totalCount } = this.getPaginationBounds();
    return `${locales_store.locales.entries.Lcz_View} ${startItem} - ${endItem} ${locales_store.locales.entries.Lcz_Of} ${totalCount}`;
  }
  async updateData() {
    const { endItem, startItem } = this.getPaginationBounds();
    await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({}, booking_listing.userSelection), { is_to_export: false, start_row: startItem, end_row: endItem }));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    if (this.isLoading || this.ticket === '') {
      return index.h("ir-loading-screen", null);
    }
    return (index.h(index.Host, null, index.h("ir-interceptor", null), index.h("ir-toast", null), index.h("div", { class: "p-1 main-container" }, index.h("ir-listing-header", { propertyId: this.propertyid, language: this.language, baseurl: this.baseurl }), index.h("section", null, index.h("div", { class: "card p-1 flex-fill m-0 mt-2" }, index.h("table", { class: "table table-striped table-bordered no-footer dataTable" }, index.h("thead", null, index.h("tr", null, index.h("th", { scope: "col", class: "text-left" }, (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 :
      _a.Lcz_Bookings, "#"), index.h("th", { scope: "col" }, (_b = locales_store.locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_BookedOn), index.h("th", { scope: "col" }, (_c = locales_store.locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_GuestSource), index.h("th", { scope: "col" }, index.h("p", { class: 'm-0' }, (_d = locales_store.locales.entries) === null || _d === void 0 ? void 0 : _d.Lcz_Price), index.h("ir-tooltip", { customSlot: true, message: `<span style="width:100%;display:block;">${(_e = locales_store.locales.entries) === null || _e === void 0 ? void 0 : _e.Lcz_BookingBalance}</span><span>${(_f = locales_store.locales.entries) === null || _f === void 0 ? void 0 : _f.Lcz_ClickToSettle}</span>` }, index.h("p", { slot: "tooltip-trigger", class: 'm-0 btn due-btn' }, (_g = locales_store.locales.entries) === null || _g === void 0 ? void 0 : _g.Lcz_Balance))), index.h("th", { scope: "col", class: "text-left services-cell" }, (_h = locales_store.locales.entries) === null || _h === void 0 ? void 0 : _h.Lcz_Services), index.h("th", { scope: "col", class: "in-out" }, (_j = locales_store.locales.entries) === null || _j === void 0 ? void 0 : _j.Lcz_InOut), index.h("th", { scope: "col" }, (_k = locales_store.locales.entries) === null || _k === void 0 ? void 0 : _k.Lcz_Status), index.h("th", { scope: "col" }, index.h("p", { class: "sr-only" }, "actions")))), index.h("tbody", { class: "" }, booking_listing.bookings.length === 0 && (index.h("tr", null, index.h("td", { colSpan: 8 }, (_l = locales_store.locales.entries) === null || _l === void 0 ? void 0 : _l.Lcz_NoDataAvailable))), (_m = booking_listing.bookings) === null || _m === void 0 ? void 0 :
      _m.map(booking => {
        var _a, _b, _c;
        let confirmationBG = this.statusColors[booking.status.code];
        return (index.h("tr", { key: booking.booking_nbr }, index.h("td", { class: "text-left" }, index.h("div", { class: "h-100 d-flex align-items-center justify-content-between" }, index.h("button", { onClick: () => (this.editBookingItem = { booking, cause: 'edit' }), class: "booking_number" }, booking.booking_nbr), ' ', index.h("img", { class: "ml-2", src: booking.origin.Icon, alt: "logo" }))), index.h("td", null, index.h("p", { class: "p-0 m-0 date-p" }, utils.hooks(booking.booked_on.date, 'YYYY-MM-DD').format('DD-MMM-YYYY')), index.h("p", { class: "p-0 m-0 secondary-p" }, booking.booked_on.hour, ":", booking.booked_on.minute)), index.h("td", null, index.h("p", { class: "p-0 m-0" }, booking.guest.first_name, " ", (_a = booking.guest.last_name) !== null && _a !== void 0 ? _a : '', " ", booking.occupancy.adult_nbr, locales_store.locales.entries.Lcz_P), index.h("p", { class: "p-0 m-0 secondary-p" }, booking.origin.Label)), index.h("td", null, index.h("p", { class: "p-0 m-0" }, utils$1.formatAmount(booking.currency.code, (_c = (_b = booking.financial) === null || _b === void 0 ? void 0 : _b.gross_total) !== null && _c !== void 0 ? _c : 0)), booking.financial.due_amount > 0 && (index.h("buuton", { onClick: () => {
            this.editBookingItem = { booking, cause: 'payment' };
            this.openModal();
          }, class: "btn p-0 m-0 due-btn" }, utils$1.formatAmount(booking.currency.code, booking.financial.due_amount)))), index.h("td", null, index.h("ul", null, booking.rooms.map(room => (index.h("li", null, room.roomtype.name))))), index.h("td", null, index.h("p", { class: "p-0 m-0 date-p" }, utils.hooks(booking.from_date, 'YYYY-MM-DD').format('DD-MMM-YYYY')), index.h("p", { class: "p-0 m-0 date-p" }, utils.hooks(booking.to_date, 'YYYY-MM-DD').format('DD-MMM-YYYY'))), index.h("td", null, index.h("p", { class: `m-0 badge ${confirmationBG}` }, booking.status.description)), index.h("td", null, index.h("div", { class: "d-flex justify-content-center align-items-center" }, index.h("ir-icon", { onIconClickHandler: () => (this.editBookingItem = { booking, cause: 'edit' }) }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, index.h("path", { fill: "#104064", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" }))), index.h("ir-icon", { onIconClickHandler: () => {
            this.editBookingItem = { booking, cause: 'delete' };
            this.openModal();
          }, class: "ml-1" }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, index.h("path", { fill: "#ff4961", d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })))))));
      }))), this.totalPages > 1 && (index.h("section", { class: 'd-flex flex-column flex-md-row align-items-center justify-content-between' }, index.h("p", { class: "m-0 mb-1 mb-md-0" }, this.renderItemRange()), index.h("div", { class: 'd-flex align-items-center buttons-container' }, index.h("ir-button", { size: "sm", btn_disabled: this.currentPage === 1, onClickHanlder: async () => {
        this.currentPage = 1;
        await this.updateData();
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "14", viewBox: "0 0 512 512" }, index.h("path", { fill: "white", d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" }))), index.h("ir-button", { size: "sm", btn_disabled: this.currentPage === 1, onClickHanlder: async () => {
        this.currentPage = this.currentPage - 1;
        console.log(this.currentPage);
        await this.updateData();
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "8.75", viewBox: "0 0 320 512" }, index.h("path", { fill: "white", d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" }))), index.h("ir-select", { selectedValue: this.currentPage.toString(), LabelAvailable: false, showFirstOption: false, onSelectChange: async (e) => {
        this.currentPage = +e.detail;
        await this.updateData();
      }, data: Array.from(Array(this.totalPages), (_, i) => i + 1).map(i => ({
        text: i.toString(),
        value: i.toString(),
      })) }), index.h("ir-button", { size: "sm", btn_disabled: this.currentPage === this.totalPages, onClickHanlder: async () => {
        this.currentPage = this.currentPage + 1;
        await this.updateData();
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "8.75", viewBox: "0 0 320 512" }, index.h("path", { fill: "white", d: "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" }))), index.h("ir-button", { size: "sm", btn_disabled: this.currentPage === this.totalPages, onClickHanlder: async () => {
        this.currentPage = this.totalPages;
        console.log(this.currentPage);
        await this.updateData();
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "14", viewBox: "0 0 512 512" }, index.h("path", { fill: "white", d: "M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" }))))))))), this.editBookingItem && index.h("ir-listing-modal", { onModalClosed: () => (this.editBookingItem = null) }), index.h("ir-sidebar", { onIrSidebarToggle: this.handleSideBarToggle.bind(this), open: this.editBookingItem !== null && this.editBookingItem.cause === 'edit', showCloseButton: this.editBookingItem !== null, sidebarStyles: { width: this.editBookingItem ? '80rem' : 'var(--sidebar-width,40rem)', background: '#F2F3F8' } }, ((_o = this.editBookingItem) === null || _o === void 0 ? void 0 : _o.cause) === 'edit' && (index.h("ir-booking-details", { hasPrint: true, hasReceipt: true, is_from_front_desk: true, propertyid: this.propertyid, hasRoomEdit: true, hasRoomDelete: true, bookingNumber: this.editBookingItem.booking.booking_nbr, ticket: this.ticket, baseurl: this.baseurl, language: this.language, hasRoomAdd: true })))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrBookingListing.style = irBookingListingCss;

const irButtonCss = ".button-icon.sc-ir-button{padding:0;margin-top:0}.button-icon[data-state='loading'].sc-ir-button{display:none}.button-text.sc-ir-button{padding:0 5px}.bounce-3.sc-ir-button{animation:bounce 1s 1}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.loader.sc-ir-button{width:15px;height:10px;--c:no-repeat linear-gradient(#ffffff 0 0);background:var(--c) 0% 50%, var(--c) 50% 50%, var(--c) 100% 50%;background-size:20% 100%;animation:l1 1s infinite linear}@keyframes l1{0%{background-size:20% 100%, 20% 100%, 20% 100%}33%{background-size:20% 10%, 20% 100%, 20% 100%}50%{background-size:20% 100%, 20% 10%, 20% 100%}66%{background-size:20% 100%, 20% 100%, 20% 10%}100%{background-size:20% 100%, 20% 100%, 20% 100%}}@keyframes bounce{0%,100%{transform:scale(1);animation-timing-function:cubic-bezier(0.8, 0, 1, 1)}50%{transform:scale(1.2);animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}}@keyframes ping{75%,100%{transform:scale(1.2)}}";

const IrButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.clickHanlder = index.createEvent(this, "clickHanlder", 7);
    this.name = undefined;
    this.text = undefined;
    this.icon = 'ft-save';
    this.btn_color = 'primary';
    this.size = 'md';
    this.textSize = 'md';
    this.btn_block = true;
    this.btn_disabled = false;
    this.btn_type = 'button';
    this.isLoading = false;
    this.btn_styles = undefined;
    this.btn_id = v4.v4();
  }
  handleButtonAnimation(e) {
    if (!this.buttonEl || e.detail !== this.btn_id) {
      return;
    }
    e.stopImmediatePropagation();
    e.stopPropagation();
    this.buttonEl.classList.remove('bounce-3');
    this.buttonEl.classList.add('bounce-3');
  }
  render() {
    let blockClass = this.btn_block ? 'btn-block' : '';
    return (index.h("button", { id: this.btn_id, ref: el => (this.buttonEl = el), onClick: () => this.clickHanlder.emit(), class: `btn btn-${this.btn_color} ${this.btn_styles} d-flex align-items-center btn-${this.size} text-${this.textSize} ${blockClass}`, type: this.btn_type, disabled: this.btn_disabled }, index.h("span", { class: "button-icon", "data-state": this.isLoading ? 'loading' : '' }, index.h("slot", { name: "icon" })), this.text && index.h("span", { class: "button-text m-0" }, this.text), this.isLoading && index.h("div", { class: "loader m-0 p-0" })));
  }
};
IrButton.style = irButtonCss;

const onlineResources = [
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/jquery.min.js",
  // },
  {
    isCSS: true,
    link: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i%7CQuicksand:300,400,500,700',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/bootstrap.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/bootstrap-extended.css',
  },
  { isCSS: true, link: 'https://x.igloorooms.com/app-assets/css/colors.css' },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/core/menu/menu-types/horizontal-menu.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/core/colors/palette-gradient.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/components.css',
  },
  { isCSS: true, link: 'https://x.igloorooms.com/assets/css/style.css' },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/vendors/css/forms/icheck/icheck.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/vendors/css/forms/icheck/custom.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/pages/login-register.css',
  },
  // {
  //   isCSS: true,
  //   link: 'https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/daterangepicker.css',
  // },
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/moment.min.js",
  // },
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/daterangepicker.js",
  // },
];

const IrCommon = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.extraResources = '';
    this.resources = onlineResources;
  }
  componentWillLoad() {
    this.parseRefs();
  }
  componentDidLoad() {
    this.initializeStyles();
  }
  hrefsChanged() {
    this.parseRefs();
    this.initializeStyles();
  }
  parseRefs() {
    if (this.extraResources !== '')
      this.resources.push(JSON.parse(this.extraResources));
  }
  appendTag(tagName, attributes) {
    const tag = document.createElement(tagName);
    const selectorParts = [];
    Object.keys(attributes).forEach(attr => {
      tag.setAttribute(attr, attributes[attr]);
      selectorParts.push(`[${attr}="${attributes[attr]}"]`);
    });
    const selector = `${tagName}${selectorParts.join('')}`;
    const existingTag = document.querySelector(selector);
    if (!existingTag) {
      document.head.appendChild(tag);
    }
  }
  initializeStyles() {
    this.resources.forEach(res => {
      if (res.isCSS) {
        this.appendTag('link', {
          href: res.link,
          rel: 'stylesheet',
          type: 'text/css',
        });
      }
      if (res.isJS) {
        this.appendTag('script', {
          src: res.link,
        });
      }
    });
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", null)));
  }
  static get watchers() { return {
    "extraResources": ["hrefsChanged"]
  }; }
};

const irDatePickerCss = "input.sc-ir-date-picker{all:unset;box-sizing:border-box !important;padding:0;margin:0;width:100%;text-align:center}input.sc-ir-date-picker:disabled{text-align:start;font-size:14px;width:100%}.sc-ir-date-picker-h{position:relative;box-sizing:border-box}.icon.sc-ir-date-picker{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}";

const IrDatePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dateChanged = index.createEvent(this, "dateChanged", 7);
    this.fromDate = undefined;
    this.toDate = undefined;
    this.opens = undefined;
    this.autoApply = undefined;
    this.firstDay = 1;
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.format = 'MMM DD, YYYY';
    this.separator = ' - ';
    this.applyLabel = 'Apply';
    this.cancelLabel = 'Cancel';
    this.fromLabel = 'Form';
    this.toLabel = 'To';
    this.customRangeLabel = 'Custom';
    this.weekLabel = 'W';
    this.disabled = false;
    this.singleDatePicker = false;
    this.minDate = undefined;
    this.maxDate = undefined;
    this.maxSpan = {
      days: 240,
    };
  }
  componentDidLoad() {
    this.dateRangeInput = this.element.querySelector('.date-range-input');
    $(this.dateRangeInput).daterangepicker({
      singleDatePicker: this.singleDatePicker,
      opens: this.opens,
      startDate: utils.hooks(this.fromDate),
      endDate: utils.hooks(this.toDate),
      minDate: utils.hooks(this.minDate || utils.hooks(new Date()).format('YYYY-MM-DD')),
      maxDate: this.maxDate ? utils.hooks(this.maxDate) : undefined,
      maxSpan: this.maxSpan,
      autoApply: this.autoApply,
      locale: {
        format: this.format,
        separator: this.separator,
        applyLabel: this.applyLabel,
        cancelLabel: this.cancelLabel,
        fromLabel: this.fromLabel,
        toLabel: this.toLabel,
        customRangeLabel: this.customRangeLabel,
        weekLabel: this.weekLabel,
        daysOfWeek: this.daysOfWeek,
        monthNames: this.monthNames,
        firstDay: this.firstDay,
      },
    }, (start, end) => {
      this.dateChanged.emit({ start, end });
    });
  }
  render() {
    return (index.h(index.Host, null, index.h("input", { class: "date-range-input", type: "text", disabled: this.disabled })));
  }
  get element() { return index.getElement(this); }
};
IrDatePicker.style = irDatePickerCss;

const irDateViewCss = ".sc-ir-date-view-h{display:block}.mx-01.sc-ir-date-view{--m:5px;margin-right:var(--m) !important;margin-left:var(--m) !important}";

const IrDateView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.from_date = undefined;
    this.to_date = undefined;
    this.showDateDifference = true;
    this.dateOption = 'YYYY-MM-DD';
    this.dates = undefined;
  }
  componentWillLoad() {
    this.initializeDates();
  }
  handleFromDateChange(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.initializeDates();
    }
  }
  handleToDateChange(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.initializeDates();
    }
  }
  initializeDates() {
    this.convertDate('from_date', this.from_date);
    this.convertDate('to_date', this.to_date);
    const fromDate = utils.hooks(this.dates.from_date, 'MMM DD, YYYY').format('YYYY-MM-DD');
    const toDate = utils.hooks(this.dates.to_date, 'MMM DD, YYYY').format('YYYY-MM-DD');
    this.dates.date_diffrence = utils$1.calculateDaysBetweenDates(fromDate, toDate);
  }
  convertDate(key, date) {
    this.dates = this.dates || {
      from_date: '',
      to_date: '',
      date_diffrence: 0,
    };
    if (typeof date === 'string') {
      this.dates[key] = utils.hooks(date, this.dateOption).format('MMM DD, YYYY');
    }
    else if (date instanceof Date) {
      this.dates[key] = utils.hooks(date).format('MMM DD, YYYY');
    }
    else if (utils.hooks.isMoment(date)) {
      this.dates[key] = date.format('MMM DD, YYYY');
    }
    else {
      console.error('Unsupported date type');
    }
  }
  render() {
    return (index.h(index.Host, { class: "d-flex align-items-center" }, index.h("span", null, this.dates.from_date), ' ', index.h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "mx-01", height: "14", width: "14", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" })), index.h("span", null, this.dates.to_date, ' ', this.showDateDifference && (index.h("span", { class: "mx-01" }, this.dates.date_diffrence, '   ', this.dates.date_diffrence > 1 ? ` ${locales_store.locales.entries.Lcz_Nights}` : ` ${locales_store.locales.entries.Lcz_Night}`)))));
  }
  static get watchers() { return {
    "from_date": ["handleFromDateChange"],
    "to_date": ["handleToDateChange"]
  }; }
};
IrDateView.style = irDateViewCss;

const irGuestInfoCss = ".input-group-text.sc-ir-guest-info{min-width:10rem;text-align:left}.mobilePrefixSelect.sc-ir-guest-info{border-right-width:0;border-top-right-radius:0;border-bottom-right-radius:0}.mobilePrefixInput.sc-ir-guest-info{border-top-left-radius:0;border-bottom-left-radius:0}.check-container.sc-ir-guest-info{position:relative;cursor:pointer;font-size:14px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;align-items:center}.check-container.sc-ir-guest-info input.sc-ir-guest-info{position:relative;opacity:0;cursor:pointer;height:0;width:0}.check-container.sc-ir-guest-info .checkmark.sc-ir-guest-info{position:relative;top:0;left:0;height:20px;width:20px;border:1px solid #cacfe7;border-radius:4px;transition:all 0.3s ease}.check-container.sc-ir-guest-info input.sc-ir-guest-info:checked~.checkmark.sc-ir-guest-info{background-color:#1e9ff2;border-color:#1e9ff2}.checkmark.sc-ir-guest-info:after{content:'';position:absolute;display:none}.check-container.sc-ir-guest-info input.sc-ir-guest-info:checked~.checkmark.sc-ir-guest-info:after{display:block}.check-label.sc-ir-guest-info{margin-left:10px !important}.check-container.sc-ir-guest-info .checkmark.sc-ir-guest-info:after{left:6px;top:3px;width:6px;height:10px;border:solid white;border-width:0 2px 2px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.ir-card-header.sc-ir-guest-info{width:100%;border-bottom:1px solid #e4e5ec}.close-icon.sc-ir-guest-info{margin:0}.border-theme.sc-ir-guest-info{border:1px solid #cacfe7}";

const GuestInfo = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.closeSideBar = index.createEvent(this, "closeSideBar", 7);
    this.resetBookingData = index.createEvent(this, "resetBookingData", 7);
    this.bookingService = new utils$1.BookingService();
    this.setupDataCountries = null;
    this.setupDataCountriesCode = null;
    this.defaultTexts = undefined;
    this.language = undefined;
    this.email = undefined;
    this.booking_nbr = undefined;
    this.countries = undefined;
    this.submit = false;
    this.guest = null;
    this.isLoading = false;
  }
  async componentWillLoad() {
    this.bookingService.setToken(calendarData.calendar_data.token);
    await this.init();
  }
  async init() {
    try {
      const [guest, countries] = await Promise.all([this.bookingService.fetchGuest(this.email), this.bookingService.getCountries(this.language)]);
      this.countries = countries;
      this.guest = guest;
    }
    catch (error) {
      console.log(error);
    }
  }
  handleInputChange(key, value) {
    this.guest = Object.assign(Object.assign({}, this.guest), { [key]: value });
  }
  async editGuest() {
    try {
      this.isLoading = true;
      await this.bookingService.editExposedGuest(this.guest, this.booking_nbr);
      this.closeSideBar.emit(null);
      this.resetBookingData.emit(null);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      this.isLoading = false;
      console.log('done');
    }
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    if (!this.guest) {
      return null;
    }
    return [
      index.h("div", { class: "p-0" }, index.h("div", { class: "position-sticky mb-1 shadow-none p-0" }, index.h("div", { class: "d-flex align-items-center justify-content-between ir-card-header py-1 p-0" }, index.h("h3", { class: "card-title text-left font-medium-2 px-1 my-0" }, this.defaultTexts.entries.Lcz_GuestDetails), index.h("ir-icon", { class: "close close-icon px-1", onIconClickHandler: () => {
          this.closeSideBar.emit(null);
        } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, index.h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" }))))), index.h("div", { class: "card-content collapse show" }, index.h("div", { class: "card-body pt-0 px-1" }, index.h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_FirstName, name: "firstName", submited: this.submit, value: (_a = this.guest) === null || _a === void 0 ? void 0 : _a.first_name, required: true, onTextChange: e => this.handleInputChange('first_name', e.detail) }), index.h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_LastName, name: "lastName", submited: this.submit, value: (_b = this.guest) === null || _b === void 0 ? void 0 : _b.last_name, required: true, onTextChange: e => this.handleInputChange('last_name', e.detail) }), index.h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_Email, name: "email", submited: this.submit, value: (_c = this.guest) === null || _c === void 0 ? void 0 : _c.email, required: true, onTextChange: e => this.handleInputChange('email', e.detail) }), index.h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_AlternativeEmail, name: "altEmail", value: (_d = this.guest) === null || _d === void 0 ? void 0 : _d.alternative_email, onTextChange: e => this.handleInputChange('alternative_email', e.detail) }), index.h("ir-select", { selectContainerStyle: "mb-1", required: true, name: "country", submited: this.submit, label: this.defaultTexts.entries.Lcz_Country, selectedValue: (_f = (_e = this.guest.country_id) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : '', data: this.countries.map(item => {
          return {
            value: item.id.toString(),
            text: item.name,
          };
        }), firstOption: '...', onSelectChange: e => this.handleInputChange('country_id', e.detail) }), index.h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_City, name: "city", value: this.guest.city, onTextChange: e => this.handleInputChange('city', e.detail) }), index.h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_Address, name: "address", value: this.guest.address, onTextChange: e => this.handleInputChange('address', e.detail) }), index.h("div", { class: "form-group mr-0" }, index.h("div", { class: "input-group row m-0 p-0" }, index.h("div", { class: `input-group-prepend col-3 p-0 text-dark border-none` }, index.h("label", { class: `input-group-text  border-theme flex-grow-1 text-dark  ` }, this.defaultTexts.entries.Lcz_MobilePhone, '*')), index.h("select", { class: ` form-control text-md  col-2 py-0 mobilePrefixSelect`, onInput: e => this.handleInputChange('country_id', e.target.value), required: true }, index.h("option", { value: null }, "..."), this.countries.map(item => {
        var _a;
        return (index.h("option", { selected: ((_a = this.guest.country_id) === null || _a === void 0 ? void 0 : _a.toString()) === item.id.toString(), value: item.id }, item.phone_prefix));
      })), index.h("input", { type: "text", required: true, value: this.guest.mobile, class: 'form-control flex-fill mobilePrefixInput', onInput: e => this.handleInputChange('mobile', e.target.value) }))), index.h("div", { class: 'p-0 m-0' }, index.h("label", { class: `check-container m-0 p-0` }, index.h("input", { class: 'm-0 p-0', type: "checkbox", name: "newsletter", checked: this.guest.subscribe_to_news_letter, onInput: e => this.handleInputChange('subscribe_to_news_letter', e.target.checked) }), index.h("span", { class: "checkmark m-0 p-0" }), index.h("span", { class: 'm-0 p-0  check-label' }, this.defaultTexts.entries.Lcz_Newsletter))), index.h("hr", null), index.h("ir-button", { isLoading: this.isLoading, btn_disabled: this.isLoading, btn_styles: "d-flex align-items-center justify-content-center", text: this.defaultTexts.entries.Lcz_Save, onClickHanlder: this.editGuest.bind(this), color: "btn-primary" })))),
    ];
  }
};
GuestInfo.style = irGuestInfoCss;

const irIconCss = ".sc-ir-icon-h{margin:0;padding:0}.icon-button.sc-ir-icon{all:unset;margin:0;padding:0;color:#104064}.icon-button.sc-ir-icon:hover{cursor:pointer;color:#1a6aa7}";

const IrIcon = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.iconClickHandler = index.createEvent(this, "iconClickHandler", 7);
    this.icon = 'ft-check';
  }
  render() {
    return (index.h("button", { class: "icon-button", onClick: () => this.iconClickHandler.emit() }, index.h("slot", { name: "icon" })));
  }
};
IrIcon.style = irIconCss;

const irInputTextCss = ".sc-ir-input-text-h{margin:0;padding:0}.border-theme.sc-ir-input-text{border:1px solid #cacfe7}.icon-container.sc-ir-input-text{color:#3b4781;border:1px solid #cacfe7;font-size:0.975rem;height:2rem;background:rgb(255, 255, 255);padding-right:0 !important;border-right:0;border-top-right-radius:0;border-bottom-right-radius:0;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.input-container.sc-ir-input-text{display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;flex:1}.input-container.sc-ir-input-text input.sc-ir-input-text{padding-left:5px !important;padding-right:5px !important;border-left:0;border-top-left-radius:0 !important;border-bottom-left-radius:0 !important}.icon-container[data-state='focus'].sc-ir-input-text{border-color:var(--blue)}.icon-container[data-disabled].sc-ir-input-text{background-color:#eceff1;border-color:rgba(118, 118, 118, 0.3)}.danger-border.sc-ir-input-text{border-color:var(--red)}";

const IrInputText = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.textChange = index.createEvent(this, "textChange", 7);
    this.name = undefined;
    this.value = undefined;
    this.label = '<label>';
    this.placeholder = '<placeholder>';
    this.inputStyles = '';
    this.required = undefined;
    this.LabelAvailable = true;
    this.readonly = false;
    this.type = 'text';
    this.submited = false;
    this.inputStyle = true;
    this.size = 'md';
    this.textSize = 'md';
    this.labelPosition = 'left';
    this.labelBackground = null;
    this.labelColor = 'dark';
    this.labelBorder = 'theme';
    this.labelWidth = 3;
    this.variant = 'default';
    this.disabled = false;
    this.error = false;
    this.valid = undefined;
    this.initial = true;
    this.inputFocused = false;
  }
  connectedCallback() { }
  disconnectedCallback() { }
  watchHandler(newValue) {
    if (newValue !== '' && this.required) {
      this.valid = true;
    }
  }
  watchHandler2(newValue) {
    if (newValue && this.required) {
      this.initial = false;
    }
  }
  handleInputChange(event) {
    this.initial = false;
    if (this.required) {
      this.valid = event.target.checkValidity();
      const value = event.target.value;
      this.textChange.emit(value);
    }
    else {
      this.textChange.emit(event.target.value);
    }
  }
  render() {
    const id = v4.v4();
    if (this.variant === 'icon') {
      return (index.h("fieldset", { class: "position-relative has-icon-left input-container" }, index.h("label", { htmlFor: id, class: "input-group-prepend bg-white m-0" }, index.h("span", { "data-disabled": this.disabled, "data-state": this.inputFocused ? 'focus' : '', class: `input-group-text icon-container bg-white ${this.error && 'danger-border'}`, id: "basic-addon1" }, index.h("slot", { name: "icon" }))), index.h("input", { type: "text", onFocus: () => (this.inputFocused = true), required: this.required, onBlur: () => (this.inputFocused = false), disabled: this.disabled, class: `form-control bg-white pl-0 input-sm rate-input py-0 m-0 rateInputBorder ${this.error && 'danger-border'}`, id: id, value: this.value, placeholder: this.placeholder, onInput: this.handleInputChange.bind(this) })));
    }
    let className = 'form-control';
    let label = (index.h("div", { class: `input-group-prepend col-${this.labelWidth} p-0 text-${this.labelColor}` }, index.h("label", { class: `input-group-text ${this.labelPosition === 'right' ? 'justify-content-end' : this.labelPosition === 'center' ? 'justify-content-center' : ''} ${this.labelBackground ? 'bg-' + this.labelBackground : ''} flex-grow-1 text-${this.labelColor} border-${this.labelBorder === 'none' ? 0 : this.labelBorder} ` }, this.label, this.required ? '*' : '')));
    if (!this.LabelAvailable) {
      label = '';
    }
    if (this.inputStyle === false) {
      className = '';
    }
    if (this.required && !this.valid && !this.initial) {
      className = `${className} border-danger`;
    }
    return (index.h("div", { class: "form-group" }, index.h("div", { class: "input-group row m-0" }, label, index.h("input", { readOnly: this.readonly, type: this.type, class: `${className} form-control-${this.size} text-${this.textSize} col-${this.LabelAvailable ? 12 - this.labelWidth : 12} ${this.readonly && 'bg-white'} ${this.inputStyles}`, placeholder: this.placeholder, value: this.value, onInput: this.handleInputChange.bind(this), required: this.required }))));
  }
  static get watchers() { return {
    "value": ["watchHandler"],
    "submited": ["watchHandler2"]
  }; }
};
IrInputText.style = irInputTextCss;

const irInterceptorCss = ".loader.sc-ir-interceptor{width:1.25rem;height:1.25rem;border:2.5px solid #3f3f3f;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}.loaderContainer.sc-ir-interceptor{padding:20px;display:flex;align-items:center;justify-content:center;border-radius:5px;background:white}.loadingScreenContainer.sc-ir-interceptor{position:fixed;top:0;left:0;height:100vh;width:100vw;z-index:100000;background:rgba(0, 0, 0, 0.2);pointer-events:all;display:flex;align-items:center;justify-content:center}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const IrInterceptor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.toast = index.createEvent(this, "toast", 7);
    this.isShown = false;
    this.isLoading = false;
    this.isUnassignedUnit = false;
    this.handledEndpoints = ['/ReAllocate_Exposed_Room', '/Do_Payment', '/Get_Exposed_Bookings'];
  }
  componentWillLoad() {
    this.setupAxiosInterceptors();
  }
  setupAxiosInterceptors() {
    Token.axios.interceptors.request.use(this.handleRequest.bind(this), this.handleError.bind(this));
    Token.axios.interceptors.response.use(this.handleResponse.bind(this), this.handleError.bind(this));
  }
  extractEndpoint(url) {
    return url.split('?')[0];
  }
  isHandledEndpoint(url) {
    return this.handledEndpoints.includes(url);
  }
  handleRequest(config) {
    const extractedUrl = this.extractEndpoint(config.url);
    interceptor_requests[extractedUrl] = 'pending';
    if (this.isHandledEndpoint(extractedUrl)) {
      this.isLoading = true;
    }
    return config;
  }
  handleResponse(response) {
    var _a;
    const extractedUrl = this.extractEndpoint(response.config.url);
    if (this.isHandledEndpoint(extractedUrl)) {
      this.isLoading = false;
    }
    interceptor_requests[extractedUrl] = 'done';
    if ((_a = response.data.ExceptionMsg) === null || _a === void 0 ? void 0 : _a.trim()) {
      this.handleError(response.data.ExceptionMsg);
      throw new Error(response.data.ExceptionMsg);
    }
    return response;
  }
  handleError(error) {
    this.toast.emit({
      type: 'error',
      title: error,
      description: '',
      position: 'top-right',
    });
    return Promise.reject(error);
  }
  render() {
    return (index.h(index.Host, null, this.isLoading && (index.h("div", { class: "loadingScreenContainer" }, index.h("div", { class: "loaderContainer" }, index.h("span", { class: "loader" }))))));
  }
};
IrInterceptor.style = irInterceptorCss;

const irLabelCss = "*.sc-ir-label{margin:0;padding:0}.sc-ir-label-h{display:flex;margin-bottom:5px;gap:5px}.icon.sc-ir-label{margin-left:3px;padding:0;margin-top:0;display:flex;align-items:center}p.sc-ir-label{margin:0 3px;padding:0}.icon-container.sc-ir-label{margin:0;padding:0}svg.sc-ir-label{margin:0;padding:0}";

const IrLabel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.editSidebar = index.createEvent(this, "editSidebar", 7);
    this.label = undefined;
    this.value = undefined;
    this.iconShown = false;
    this.imageSrc = undefined;
  }
  openEditSidebar() {
    this.editSidebar.emit();
  }
  render() {
    if (!this.value) {
      return null;
    }
    return (index.h(index.Host, { class: this.imageSrc ? 'align-items-center' : '' }, index.h("strong", null, this.label), this.imageSrc && index.h("img", { src: this.imageSrc, class: "p-0 m-0" }), index.h("p", null, this.value), this.iconShown && (index.h("div", { class: "icon-container" }, index.h("ir-icon", { class: "pointer icon", id: "pickup", onIconClickHandler: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.openEditSidebar();
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "15", width: "15", viewBox: "0 0 512 550" }, index.h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" })))))));
  }
};
IrLabel.style = irLabelCss;

const irListingHeaderCss = ".sc-ir-listing-header-h{display:block;margin:0;padding:0;--ir-date-range-border:#cacfe7;--ir-date-range-width:242px;position:relative}h3.sc-ir-listing-header{margin:0}ir-input-text.sc-ir-listing-header{width:300px}.booking-search-field.sc-ir-listing-header{margin-left:0px;display:flex;align-items:center;gap:14px}.booking-container.sc-ir-listing-header{gap:14px}.filters-container.sc-ir-listing-header{gap:10px;justify-content:space-between}.buttons-container.sc-ir-listing-header{gap:14px;color:#104064}.new-booking-container.sc-ir-listing-header{position:absolute;right:10px;top:5px}.new-booking-btn.sc-ir-listing-header{all:unset;cursor:pointer;color:#104064}.new-booking-btn.sc-ir-listing-header:hover{color:#0b2538}.seperator-container.sc-ir-listing-header{margin-top:10px;justify-content:center !important;gap:14px}.seperator-container.sc-ir-listing-header span.sc-ir-listing-header{display:block;height:1px;background:var(--gray);width:45%;max-width:200px;margin:0}@media (max-width: 575.98px){.sc-ir-listing-header-h{--ir-date-range-width:100%}.flex-fill-sm-none.sc-ir-listing-header{flex:1 1 auto}.flex-fill-sm-none.sc-ir-listing-header label.sc-ir-listing-header{width:100px}.buttons-container.sc-ir-listing-header{justify-content:center !important;align-items:center !important;gap:40px}}@media (min-width: 1200px){.booking-search-field.sc-ir-listing-header{margin-left:40px}}@media (min-width: 1600px){.flex-fill-sm-none.sc-ir-listing-header{flex:0 0 auto}.booking-search-field.sc-ir-listing-header{margin-left:40px}}";

const IrListingHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.bookingListingService = new BookingListingService();
    this.propertyId = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.inputValue = '';
  }
  componentWillLoad() {
    this.bookingListingService.setToken(booking_listing.token);
  }
  handleDateRangeChange(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    const { start, end } = e.detail;
    booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { from: start.format('YYYY-MM-DD'), to: end.format('YYYY-MM-DD') });
  }
  async handleSearchClicked(is_to_export) {
    if (this.inputValue !== '') {
      if (/^-?\d+$/.test(this.inputValue)) {
        updateUserSelection('book_nbr', this.inputValue);
      }
      else if (this.inputValue[3] === '-') {
        updateUserSelection('book_nbr', this.inputValue);
      }
      else {
        updateUserSelection('name', this.inputValue);
      }
    }
    if (this.inputValue === '' && (booking_listing.userSelection.book_nbr !== '' || booking_listing.userSelection.name !== '')) {
      booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { name: '', book_nbr: '' });
    }
    await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({}, booking_listing.userSelection), { start_row: 0, end_row: 20, is_to_export }));
    if (booking_listing.download_url) {
      const url = booking_listing.download_url;
      this.downloadUrlTag.href = url;
      this.downloadUrlTag.download = url;
      this.downloadUrlTag.click();
      booking_listing.download_url = null;
    }
  }
  async handleClearUserField() {
    initializeUserSelection();
    if (this.inputValue) {
      this.inputValue = '';
    }
    await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({}, booking_listing.userSelection), { start_row: 0, end_row: 20, is_to_export: false }));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return (index.h(index.Host, null, index.h("a", { ref: el => (this.downloadUrlTag = el) }, index.h("p", { class: "sr-only" }, "download url")), index.h("section", { class: "d-flex align-items-center " }, index.h("div", { class: "d-flex flex-fill flex-column flex-md-row align-items-md-center booking-container" }, index.h("div", { class: "d-flex mb-1 d-md-none align-items-center justify-content-bettween width-fill" }, index.h("h3", { class: "flex-fill" }, (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_Bookings), index.h("div", null, booking_listing.token && (index.h("igl-book-property-container", { withIrToastAndInterceptor: false, propertyid: this.propertyId, language: this.language, baseurl: this.baseurl, ticket: booking_listing.token }, index.h("button", { slot: "trigger", class: 'new-booking-btn' }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" }))))))), index.h("h3", { class: "d-none d-md-block" }, (_b = locales_store.locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_Bookings), index.h("form", { onSubmit: e => {
        e.preventDefault();
        console.log(this.inputValue);
        this.handleSearchClicked(false);
      }, class: "booking-search-field width-fill" }, index.h("ir-input-text", { class: 'flex-fill', value: this.inputValue, onTextChange: e => (this.inputValue = e.detail), variant: "icon", placeholder: (_c = locales_store.locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_FindBookNbrorName }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "14", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }))), index.h("h5", { class: "m-0 font-weight-bold d-none d-sm-block" }, (_d = locales_store.locales.entries) === null || _d === void 0 ? void 0 : _d.Lcz_Or))), index.h("div", { class: "d-none d-md-block" }, booking_listing.token && (index.h("igl-book-property-container", { withIrToastAndInterceptor: false, propertyid: this.propertyId, language: this.language, baseurl: this.baseurl, ticket: booking_listing.token }, index.h("button", { slot: "trigger", class: 'new-booking-btn' }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" }))))))), index.h("section", { class: "d-flex align-items-center justify-evenly seperator-container d-sm-none" }, index.h("span", null), index.h("h5", { class: "m-0 font-weight-bold" }, (_e = locales_store.locales.entries) === null || _e === void 0 ? void 0 : _e.Lcz_Or), index.h("span", null)), index.h("section", { class: "d-flex flex-column align-items-sm-center flex-sm-row flex-sm-wrap filters-container justify-content-lg-start mt-1" }, index.h("fieldset", { class: "d-flex align-items-center flex-sm-column align-items-sm-start flex-fill-sm-none" }, index.h("label", { htmlFor: "dateTo" }, (_f = locales_store.locales.entries) === null || _f === void 0 ? void 0 : _f.Lcz_DateOf), index.h("ir-select", { onSelectChange: e => updateUserSelection('filter_type', e.detail), showFirstOption: false, data: booking_listing === null || booking_listing === void 0 ? void 0 : booking_listing.types.map(t => ({
        value: t.id.toString(),
        text: t.name,
      })), class: "flex-fill", selectedValue: booking_listing.userSelection.filter_type, select_id: "dateTo", LabelAvailable: false })), index.h("fieldset", { class: "d-flex align-items-center flex-sm-column align-items-sm-start flex-fill-sm-none" }, index.h("label", { htmlFor: "dates" }, (_g = locales_store.locales.entries) === null || _g === void 0 ? void 0 : _g.Lcz_Dates), index.h("igl-date-range", { class: "flex-fill", minDate: "2000-01-01", withDateDifference: false, defaultData: {
        fromDate: booking_listing.userSelection.from,
        toDate: booking_listing.userSelection.to,
      } })), index.h("fieldset", { class: "d-flex align-items-center flex-sm-column align-items-sm-start flex-fill-sm-none" }, index.h("label", { htmlFor: "booking_status" }, (_h = locales_store.locales.entries) === null || _h === void 0 ? void 0 : _h.Lcz_BookingStatus), index.h("ir-select", { class: "flex-fill", selectedValue: booking_listing.userSelection.booking_status, onSelectChange: e => updateUserSelection('booking_status', e.detail), showFirstOption: false, data: booking_listing === null || booking_listing === void 0 ? void 0 : booking_listing.statuses.map(status => ({
        value: status.code,
        text: status.name,
      })), select_id: "booking_status", LabelAvailable: false })), index.h("fieldset", { class: "d-flex align-items-center flex-sm-column align-items-sm-start flex-fill-sm-none" }, index.h("label", { htmlFor: "channels" }, (_j = locales_store.locales.entries) === null || _j === void 0 ? void 0 : _j.Lcz_Channels), index.h("ir-select", { class: "flex-fill", selectedValue: booking_listing.userSelection.channel, onSelectChange: e => updateUserSelection('channel', e.detail), LabelAvailable: false, data: booking_listing === null || booking_listing === void 0 ? void 0 : booking_listing.channels.map(channel => ({
        value: channel.name,
        text: channel.name,
      })), select_id: "channels", firstOption: (_k = locales_store.locales.entries) === null || _k === void 0 ? void 0 : _k.Lcz_All })), index.h("div", { class: "d-flex flex-fill align-items-end m-0 mt-2 buttons-container" }, index.h("ir-icon", { title: (_l = locales_store.locales.entries) === null || _l === void 0 ? void 0 : _l.Lcz_Search, onIconClickHandler: () => this.handleSearchClicked(false) }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }))), index.h("ir-icon", { title: (_m = locales_store.locales.entries) === null || _m === void 0 ? void 0 : _m.Lcz_Erase, onIconClickHandler: () => this.handleClearUserField() }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "22.5", viewBox: "0 0 576 512" }, index.h("path", { fill: "currentColor", d: "M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" }))), index.h("ir-icon", { onIconClickHandler: () => this.handleSearchClicked(true), title: (_o = locales_store.locales.entries) === null || _o === void 0 ? void 0 : _o.Lcz_ExportToExcel }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "15", viewBox: "0 0 384 512" }, index.h("path", { fill: "currentColor", d: "M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z" })))))));
  }
};
IrListingHeader.style = irListingHeaderCss;

class PaymentService extends Token.Token {
  async AddPayment(payment, book_nbr) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await Token.axios.post(`/Do_Payment?Ticket=${token}`, { payment: Object.assign(Object.assign({}, payment), { book_nbr }) });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async CancelPayment(id) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await Token.axios.post(`/Cancel_Payment?Ticket=${token}`, { id });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

const irListingModalCss = ".backdropModal.sc-ir-listing-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-listing-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-listing-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-listing-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-listing-modal{z-index:1001 !important}.modal-dialog.sc-ir-listing-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-listing-modal{gap:10px}.exit-icon.sc-ir-listing-modal{position:absolute;right:10px;top:5px;margin:0}.ir-modal.sc-ir-listing-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-listing-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";

const IrListingModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.modalClosed = index.createEvent(this, "modalClosed", 7);
    this.resetData = index.createEvent(this, "resetData", 7);
    this.bookingListingsService = new BookingListingService();
    this.paymentService = new PaymentService();
    this.modalTitle = 'Modal Title';
    this.editBooking = undefined;
    this.isOpen = false;
    this.deletionStage = 1;
    this.selectedDesignation = undefined;
    this.loadingBtn = null;
  }
  componentWillLoad() {
    this.bookingListingsService.setToken(booking_listing.token);
    this.paymentService.setToken(booking_listing.token);
    this.selectedDesignation = booking_listing.settlement_methods[0].name;
  }
  async closeModal() {
    this.isOpen = false;
    this.deletionStage = 1;
    this.selectedDesignation = booking_listing.settlement_methods[0].name;
    this.modalClosed.emit(null);
  }
  async openModal() {
    this.isOpen = true;
  }
  filterBookings() {
    booking_listing.bookings = booking_listing.bookings.filter(booking => booking.booking_nbr !== this.editBooking.booking.booking_nbr);
  }
  async btnClickHandler(event) {
    let target = event.target;
    let name = target.name;
    try {
      if (name === 'confirm') {
        if (this.editBooking.cause === 'payment') {
          await this.paymentService.AddPayment({
            amount: this.editBooking.booking.financial.due_amount,
            currency: this.editBooking.booking.currency,
            date: utils.hooks().format('YYYY-MM-DD'),
            designation: this.selectedDesignation,
            id: -1,
            reference: '',
          }, this.editBooking.booking.booking_nbr);
          this.resetData.emit(this.editBooking.booking.booking_nbr);
          this.closeModal();
        }
        else {
          if (this.deletionStage === 2) {
            this.loadingBtn = 'recover_and_delete';
            await this.bookingListingsService.removeExposedBooking(this.editBooking.booking.booking_nbr, true);
            this.filterBookings();
          }
          if (this.deletionStage === 1) {
            this.deletionStage = 2;
          }
        }
      }
      if (name === 'cancel') {
        if (this.deletionStage === 2) {
          this.loadingBtn = 'just_delete';
          await this.bookingListingsService.removeExposedBooking(this.editBooking.booking.booking_nbr, false);
          this.filterBookings();
        }
        else {
          this.closeModal();
        }
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      if (this.loadingBtn) {
        this.loadingBtn = null;
        this.closeModal();
      }
    }
  }
  renderTitle() {
    var _a, _b;
    if (this.editBooking.cause === 'payment') {
      return (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_MarkBookingAsPaid.replace('%1', this.editBooking.booking.booking_nbr);
    }
    else {
      if (this.deletionStage === 1) {
        return locales_store.locales.entries.Lcz_SureYouWantToDeleteBookingNbr + ((_b = this.editBooking) === null || _b === void 0 ? void 0 : _b.booking.booking_nbr);
      }
      return locales_store.locales.entries.Lcz_WantToRecoverAllotment;
    }
  }
  renderConfirmationTitle() {
    if (this.deletionStage === 2) {
      return locales_store.locales.entries.Lcz_RecoverAndDelete;
    }
    return locales_store.locales.entries.Lcz_Confirm;
  }
  renderCancelationTitle() {
    if (this.deletionStage === 2) {
      return locales_store.locales.entries.Lcz_JustDelete;
    }
    return locales_store.locales.entries.Lcz_Cancel;
  }
  render() {
    if (!this.editBooking) {
      return null;
    }
    return [
      index.h("div", { class: `backdropModal ${this.isOpen ? 'active' : ''}`, onClick: () => {
          if (this.editBooking.cause === 'delete') {
            return;
          }
          this.closeModal();
        } }),
      index.h("div", { "data-state": this.isOpen ? 'opened' : 'closed', class: `ir-modal`, tabindex: "-1" }, this.isOpen && (index.h("div", { class: `ir-alert-content p-2` }, index.h("div", { class: `ir-alert-header align-items-center border-0 py-0 m-0 ` }, index.h("p", { class: "font-weight-bold p-0 my-0 mb-1" }, this.renderTitle()), index.h("ir-icon", { class: "exit-icon", style: { cursor: 'pointer' }, onClick: () => {
          this.closeModal();
        } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "10.5", viewBox: "0 0 384 512" }, index.h("path", { fill: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), index.h("div", { class: "modal-body text-left p-0 mb-2" }, this.editBooking.cause === 'payment' ? (index.h("ir-select", { selectedValue: this.selectedDesignation, onSelectChange: e => (this.selectedDesignation = e.detail), showFirstOption: false, LabelAvailable: false, data: booking_listing.settlement_methods.map(m => ({
          value: m.name,
          text: m.name,
        })) })) : null), index.h("div", { class: `ir-alert-footer border-0 d-flex justify-content-end` }, index.h("ir-button", { isLoading: this.loadingBtn === 'just_delete', icon: '', btn_color: 'secondary', btn_block: true, text: this.renderCancelationTitle(), name: 'cancel' }), index.h("ir-button", { isLoading: this.loadingBtn === 'recover_and_delete', icon: '', btn_color: 'primary', btn_block: true, text: this.renderConfirmationTitle(), name: 'confirm' }))))),
    ];
  }
};
IrListingModal.style = irListingModalCss;

const irLoadingScreenCss = ".sc-ir-loading-screen-h{display:fixed;height:100vh;width:100vw;z-index:1000;top:0;left:0;display:flex;align-items:center;justify-content:center;background:white}.loader.sc-ir-loading-screen{width:1.25rem;height:1.25rem;border:2.5px solid #3f3f3f;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}.loaderContainer.sc-ir-loading-screen{position:absolute;z-index:100001;padding:20px;top:50%;left:50%;transform:translate(-50%, -50%);background:white;display:flex;align-items:center;justify-content:center;gap:20px;border-radius:5px}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const IrLoadingScreen = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.message = '';
  }
  render() {
    return (index.h(index.Host, null, index.h("span", { class: "loader" })));
  }
};
IrLoadingScreen.style = irLoadingScreenCss;

const irModalCss = ".backdropModal.sc-ir-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-modal{z-index:1001 !important}.modal-dialog.sc-ir-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-modal{gap:10px}.ir-modal.sc-ir-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";

const IrModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.confirmModal = index.createEvent(this, "confirmModal", 7);
    this.cancelModal = index.createEvent(this, "cancelModal", 7);
    this.modalTitle = 'Modal Title';
    this.modalBody = 'Modal Body';
    this.rightBtnActive = true;
    this.leftBtnActive = true;
    this.rightBtnText = 'Confirm';
    this.leftBtnText = 'Close';
    this.rightBtnColor = 'primary';
    this.leftBtnColor = 'secondary';
    this.btnPosition = 'right';
    this.iconAvailable = false;
    this.icon = '';
    this.isOpen = false;
    this.item = {};
  }
  async closeModal() {
    this.isOpen = false;
  }
  async openModal() {
    this.isOpen = true;
  }
  btnClickHandler(event) {
    let target = event.target;
    let name = target.name;
    if (name === this.leftBtnText) {
      this.cancelModal.emit();
      this.item = {};
      this.closeModal();
    }
    else if (name === this.rightBtnText) {
      this.confirmModal.emit(this.item);
      this.item = {};
      this.closeModal();
    }
  }
  render() {
    return [
      index.h("div", { class: `backdropModal ${this.isOpen ? 'active' : ''}`, onClick: () => {
          this.closeModal();
        } }),
      index.h("div", { "data-state": this.isOpen ? 'opened' : 'closed', class: `ir-modal`, tabindex: "-1" }, index.h("div", { class: `ir-alert-content p-2` }, index.h("div", { class: `ir-alert-header align-items-center border-0 py-0 m-0 ` }), index.h("div", { class: "modal-body text-left p-0 mb-2" }, index.h("div", null, this.modalBody)), index.h("div", { class: `ir-alert-footer border-0  d-flex justify-content-${this.btnPosition === 'center' ? 'center' : this.btnPosition === 'left' ? 'start' : 'end'}` }, this.leftBtnActive && index.h("ir-button", { icon: '', btn_color: this.leftBtnColor, btn_block: true, text: this.leftBtnText, name: this.leftBtnText }), this.rightBtnActive && index.h("ir-button", { icon: '', btn_color: this.rightBtnColor, btn_block: true, text: this.rightBtnText, name: this.rightBtnText })))),
    ];
  }
};
IrModal.style = irModalCss;

const irPaymentDetailsCss = ".sm-margin-right.sc-ir-payment-details{margin-right:5px !important;background:#000}.action_icons.sc-ir-payment-details{width:60px}.w-60.sc-ir-payment-details{width:100px;padding:0 5px}.payments-height.sc-ir-payment-details{height:30px}.payment_date.sc-ir-payment-details{width:100px}.iframeHeight.sc-ir-payment-details{height:max-content;height:22.5rem}.designation.sc-ir-payment-details{width:120px}";

const IrPaymentDetails = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.resetBookingData = index.createEvent(this, "resetBookingData", 7);
    this.toast = index.createEvent(this, "toast", 7);
    this.paymentService = new PaymentService();
    this.bookingService = new utils$1.BookingService();
    this.bookingDetails = undefined;
    this.defaultTexts = undefined;
    this.newTableRow = false;
    this.collapsedPayment = false;
    this.collapsedGuarantee = false;
    this.flag = false;
    this.confirmModal = false;
    this.toBeDeletedItem = undefined;
    this.paymentDetailsUrl = '';
    this.paymentExceptionMessage = '';
  }
  async componentWillLoad() {
    try {
      this.paymentService.setToken(calendarData.calendar_data.token);
      this.bookingService.setToken(calendarData.calendar_data.token);
      this.initializeItemToBeAdded();
    }
    catch (error) {
      if (!this.bookingDetails.is_direct && this.bookingDetails.channel_booking_nbr) {
        this.paymentExceptionMessage = error;
      }
    }
  }
  initializeItemToBeAdded() {
    this.itemToBeAdded = {
      id: -1,
      date: utils.hooks().format('YYYY-MM-DD'),
      amount: null,
      currency: this.bookingDetails.currency,
      designation: '',
      reference: '',
    };
  }
  async _handleSave() {
    try {
      console.log(this.itemToBeAdded);
      if (this.itemToBeAdded.amount === null) {
        this.toast.emit({
          type: 'error',
          title: this.defaultTexts.entries.Lcz_EnterAmount,
          description: '',
          position: 'top-right',
        });
        return;
      }
      await this.paymentService.AddPayment(this.itemToBeAdded, this.bookingDetails.booking_nbr);
      this.initializeItemToBeAdded();
      this.resetBookingData.emit(null);
    }
    catch (error) {
      console.log(error);
    }
  }
  handlePaymentInputChange(key, value, event) {
    if (key === 'amount') {
      if (!isNaN(value) || value === '') {
        if (value === '') {
          this.itemToBeAdded = Object.assign(Object.assign({}, this.itemToBeAdded), { [key]: null });
        }
        else {
          this.itemToBeAdded = Object.assign(Object.assign({}, this.itemToBeAdded), { [key]: parseFloat(value) });
        }
      }
      else if (event && event.target) {
        let inputElement = event.target;
        let inputValue = inputElement.value;
        inputValue = inputValue.replace(/[^\d-]|(?<!^)-/g, '');
        inputElement.value = inputValue;
      }
    }
    else {
      this.itemToBeAdded = Object.assign(Object.assign({}, this.itemToBeAdded), { [key]: value });
    }
  }
  async handleConfirmModal(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    try {
      await this.paymentService.CancelPayment(this.toBeDeletedItem.id);
      const newPaymentArray = this.bookingDetails.financial.payments.filter((item) => item.id !== this.toBeDeletedItem.id);
      this.bookingDetails = Object.assign(Object.assign({}, this.bookingDetails), { financial: Object.assign(Object.assign({}, this.bookingDetails.financial), { payments: newPaymentArray }) });
      this.confirmModal = !this.confirmModal;
      this.resetBookingData.emit(null);
      this.toBeDeletedItem = null;
    }
    catch (error) {
      console.log(error);
    }
  }
  handleBookingDetails() {
    if (this.newTableRow) {
      this.newTableRow = false;
    }
  }
  handleDateChange(e) {
    this.handlePaymentInputChange('date', e.detail.end.format('YYYY-MM-DD'));
  }
  _renderTableRow(item, rowMode = 'normal') {
    return (index.h(index.Fragment, null, index.h("tr", null, index.h("td", { class: 'border payments-height border-light border-bottom-0 text-center' }, rowMode === 'normal' ? (index.h("span", { class: "sm-padding-left" }, _formatDate(item.date))) : (index.h("ir-date-picker", { minDate: utils.hooks().add(-2, 'months').startOf('month').format('YYYY-MM-DD'), singleDatePicker: true, autoApply: true, onDateChanged: this.handleDateChange.bind(this) }))), index.h("td", { class: 'border payments-height border-light border-bottom-0 text-center ' }, rowMode === 'normal' ? (index.h("span", { class: "sm-padding-right" }, "$", Number(item.amount).toFixed(2))) : (index.h("input", { type: "text", class: "border-0  form-control py-0 m-0 w-100", value: this.itemToBeAdded.amount === null ? '' : Number(this.itemToBeAdded.amount).toFixed(2), onInput: event => this.handlePaymentInputChange('amount', +event.target.value, event) }))), index.h("td", { class: 'border payments-height border-light border-bottom-0 text-center' }, rowMode === 'normal' ? (index.h("span", { class: "sm-padding-left" }, item.designation)) : (index.h("input", { class: "border-0 w-100 form-control py-0 m-0", onInput: event => this.handlePaymentInputChange('designation', event.target.value), type: "text" }))), index.h("td", { rowSpan: 2, class: 'border payments-height border-light border-bottom-0 text-center' }, index.h("ir-icon", { icon: "ft-save color-ir-light-blue-hover h5 pointer sm-margin-right", onClick: rowMode === 'add'
        ? () => {
          this._handleSave();
        }
        : () => { } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "14.25", viewBox: "0 0 448 512" }, index.h("path", { fill: "#6b6f82", d: "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" }))), index.h("span", null, " \u00A0"), index.h("ir-icon", { icon: "ft-trash-2 danger h5 pointer", onClick: rowMode === 'add'
        ? () => {
          this.newTableRow = false;
          this.initializeItemToBeAdded();
        }
        : () => {
          this.toBeDeletedItem = item;
          const modal = document.querySelector('.delete-record-modal');
          modal.openModal();
        } }, index.h("svg", { slot: "icon", fill: "#ff2441", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "14.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" }))))), index.h("tr", null, index.h("td", { colSpan: 3, class: 'border border-light payments-height border-bottom-0 text-center' }, rowMode === 'normal' ? (index.h("span", { class: "sm-padding-left " }, item.reference)) : (index.h("input", { class: "border-0 w-100  form-control py-0 m-0", onKeyPress: event => {
        if (event.key === 'Enter') {
          this.newTableRow = false;
          this._handleSave();
        }
      }, onInput: event => this.handlePaymentInputChange('reference', event.target.value), type: "text" }))))));
  }
  bookingGuarantee() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    if (this.bookingDetails.is_direct && !this.bookingDetails.guest.cci) {
      return null;
    }
    return (index.h("div", null, index.h("div", { class: "d-flex align-items-center" }, index.h("strong", { class: "mr-1" }, this.defaultTexts.entries.Lcz_BookingGuarantee), index.h("ir-icon", { id: "drawer-icon", "data-toggle": "collapse", "data-target": `.guarrantee`, "aria-expanded": "false", "aria-controls": "myCollapse", class: "sm-padding-right pointer", onClick: async () => {
        if (!this.bookingDetails.is_direct && this.bookingDetails.channel_booking_nbr) {
          this.paymentDetailsUrl = await this.bookingService.getPCICardInfoURL(this.bookingDetails.booking_nbr);
        }
        this.collapsedGuarantee = !this.collapsedGuarantee;
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "22.5", viewBox: "0 0 576 512" }, index.h("path", { fill: "#104064", d: "M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" })))), index.h("div", { class: "collapse guarrantee " }, this.bookingDetails.is_direct ? ([
      index.h("div", null, ((_b = (_a = this.bookingDetails) === null || _a === void 0 ? void 0 : _a.guest) === null || _b === void 0 ? void 0 : _b.cci) && 'Card:', " ", index.h("span", null, ((_e = (_d = (_c = this.bookingDetails) === null || _c === void 0 ? void 0 : _c.guest) === null || _d === void 0 ? void 0 : _d.cci) === null || _e === void 0 ? void 0 : _e.nbr) || ''), " ", ((_h = (_g = (_f = this.bookingDetails) === null || _f === void 0 ? void 0 : _f.guest) === null || _g === void 0 ? void 0 : _g.cci) === null || _h === void 0 ? void 0 : _h.expiry_month) && 'Expiry: ', index.h("span", null, ' ', ((_l = (_k = (_j = this.bookingDetails) === null || _j === void 0 ? void 0 : _j.guest) === null || _k === void 0 ? void 0 : _k.cci) === null || _l === void 0 ? void 0 : _l.expiry_month) || '', " ", ((_p = (_o = (_m = this.bookingDetails) === null || _m === void 0 ? void 0 : _m.guest) === null || _o === void 0 ? void 0 : _o.cci) === null || _p === void 0 ? void 0 : _p.expiry_year) && '/' + ((_s = (_r = (_q = this.bookingDetails) === null || _q === void 0 ? void 0 : _q.guest) === null || _r === void 0 ? void 0 : _r.cci) === null || _s === void 0 ? void 0 : _s.expiry_year))),
      index.h("div", null, ((_u = (_t = this.bookingDetails) === null || _t === void 0 ? void 0 : _t.guest) === null || _u === void 0 ? void 0 : _u.cci.holder_name) && 'Name:', " ", index.h("span", null, ((_x = (_w = (_v = this.bookingDetails) === null || _v === void 0 ? void 0 : _v.guest) === null || _w === void 0 ? void 0 : _w.cci) === null || _x === void 0 ? void 0 : _x.holder_name) || ''), ' ', ((_0 = (_z = (_y = this.bookingDetails) === null || _y === void 0 ? void 0 : _y.guest) === null || _z === void 0 ? void 0 : _z.cci) === null || _0 === void 0 ? void 0 : _0.cvc) && '- CVC:', " ", index.h("span", null, " ", ((_3 = (_2 = (_1 = this.bookingDetails) === null || _1 === void 0 ? void 0 : _1.guest) === null || _2 === void 0 ? void 0 : _2.cci) === null || _3 === void 0 ? void 0 : _3.cvc) || '')),
    ]) : this.paymentDetailsUrl ? (index.h("iframe", { src: this.paymentDetailsUrl, width: "100%", class: "iframeHeight", frameborder: "0", name: "payment" })) : (index.h("div", { class: "text-center" }, this.paymentExceptionMessage)))));
  }
  _renderDueDate(item) {
    return (index.h("tr", null, index.h("td", { class: 'pr-1' }, _formatDate(item.date)), index.h("td", { class: 'pr-1' }, _formatAmount(item.amount, this.bookingDetails.currency.code)), index.h("td", { class: 'pr-1' }, item.description), index.h("td", { class: "collapse font-size-small roomName" }, item.room)));
  }
  render() {
    var _a, _b, _c, _d;
    if (!this.bookingDetails.financial) {
      return null;
    }
    return [
      index.h("div", { class: "card m-0" }, index.h("div", { class: "p-1" }, index.h("div", { class: "mb-2 h4" }, this.defaultTexts.entries.Lcz_DueBalance, ":", ' ', index.h("span", { class: "danger font-weight-bold" }, _formatAmount(this.bookingDetails.financial.due_amount, this.bookingDetails.currency.code))), this.bookingGuarantee(), index.h("div", { class: "mt-2" }, index.h("div", null, ((_b = (_a = this.bookingDetails.financial) === null || _a === void 0 ? void 0 : _a.due_dates) === null || _b === void 0 ? void 0 : _b.length) > 0 && (index.h(index.Fragment, null, index.h("div", { class: "d-flex align-items-center" }, index.h("strong", { class: "mr-1" }, this.defaultTexts.entries.Lcz_PaymentDueDates), index.h("ir-icon", { id: "drawer-icon", "data-toggle": "collapse", "data-target": `.roomName`, "aria-expanded": "false", "aria-controls": "myCollapse", class: "sm-padding-right pointer", onClick: () => {
          this.collapsedPayment = !this.collapsedPayment;
        } }, !this.collapsedPayment ? (index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "22.5", viewBox: "0 0 576 512" }, index.h("path", { fill: "#104064", d: "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" }))) : (index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "25", viewBox: "0 0 640 512", slot: "icon" }, index.h("path", { fill: "#104064", d: "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" }))))), index.h("table", null, (_c = this.bookingDetails.financial.due_dates) === null || _c === void 0 ? void 0 : _c.map(item => this._renderDueDate(item))))))), index.h("div", { class: "mt-2 d-flex  flex-column rounded payment-container" }, index.h("strong", null, this.defaultTexts.entries.Lcz_Payments), index.h("table", { class: "mt-1" }, index.h("thead", null, index.h("tr", null, index.h("th", { class: 'border border-light border-bottom-0 text-center payment_date' }, this.defaultTexts.entries.Lcz_Dates), index.h("th", { class: 'border border-light border-bottom-0 text-center w-60' }, this.defaultTexts.entries.Lcz_Amount), index.h("th", { class: 'border border-light border-bottom-0 text-center designation' }, this.defaultTexts.entries.Lcz_Designation), index.h("th", { class: 'border border-light border-bottom-0 text-center action_icons' }, index.h("span", { class: 'sr-only' }, "payment actions"), index.h("ir-icon", { id: "add-payment", icon: "font-weight-bold p-0", onClick: () => {
          this.newTableRow = true;
        } }, index.h("svg", { height: 14, width: 14, slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" }, index.h("path", { d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" })))))), index.h("tbody", null, (_d = this.bookingDetails.financial.payments) === null || _d === void 0 ? void 0 :
        _d.map((item) => this._renderTableRow(item)), this.newTableRow ? this._renderTableRow(null, 'add') : null))))),
      index.h("ir-modal", { item: this.toBeDeletedItem, class: 'delete-record-modal', modalTitle: this.defaultTexts.entries.Lcz_Confirmation, modalBody: "If deleted it will be permnantly lost!", iconAvailable: true, icon: "ft-alert-triangle danger h1", leftBtnText: this.defaultTexts.entries.Lcz_Cancel, rightBtnText: this.defaultTexts.entries.Lcz_Delete, leftBtnColor: "secondary", rightBtnColor: "danger", onConfirmModal: this.handleConfirmModal.bind(this) }),
    ];
  }
  static get watchers() { return {
    "bookingDetails": ["handleBookingDetails"]
  }; }
};
IrPaymentDetails.style = irPaymentDetailsCss;

class PickupService {
  async savePickup(params, booking_nbr, is_remove) {
    try {
      const splitTime = params.arrival_time.split(':');
      await Token.axios.post(`/Do_Pickup?Ticket=${calendarData.calendar_data.token}`, {
        booking_nbr,
        is_remove,
        currency: params.currency,
        date: params.arrival_date,
        details: params.flight_details,
        hour: splitTime[0],
        minute: splitTime[1],
        nbr_of_units: params.number_of_vehicles,
        selected_option: params.selected_option,
        total: +params.due_upon_booking,
      });
    }
    catch (error) {
      console.log(error);
    }
  }
  transformDefaultPickupData(data) {
    const arrival_time = utils$1.renderTime(data.hour) + ':' + utils$1.renderTime(data.minute);
    return {
      arrival_date: data.date,
      arrival_time,
      currency: data.currency,
      due_upon_booking: data.total.toFixed(2),
      flight_details: data.details,
      location: data.selected_option.location.id,
      number_of_vehicles: data.nbr_of_units,
      selected_option: data.selected_option,
      vehicle_type_code: data.selected_option.vehicle.code,
    };
  }
  getAvailableLocations(message) {
    let locations = [];
    calendarData.calendar_data.pickup_service.allowed_options.forEach(option => {
      if (locations.filter(location => location.value === option.location.id).length === 0) {
        locations.push({
          text: message + ' ' + option.location.description,
          value: option.location.id,
        });
      }
    });
    return locations;
  }
  validateForm(params) {
    if (params.arrival_time.split(':').length !== 2) {
      return {
        error: true,
        cause: 'arrival_time',
      };
    }
    if (params.flight_details === '') {
      return {
        error: true,
        cause: 'flight_details',
      };
    }
    if (params.vehicle_type_code === '') {
      return {
        error: true,
        cause: 'vehicle_type_code',
      };
    }
    if (params.number_of_vehicles === 0) {
      return {
        error: true,
        cause: 'number_of_vehicles',
      };
    }
    return { error: false };
  }
  getNumberOfVehicles(capacity, numberOfPersons) {
    let total_number_of_vehicles = Math.ceil(numberOfPersons / capacity);
    let startNumber = total_number_of_vehicles > 1 ? total_number_of_vehicles : 1;
    let bonus_number = total_number_of_vehicles > 1 ? 2 : 3;
    return Array.from({ length: total_number_of_vehicles + bonus_number }, (_, i) => startNumber + i);
  }
  getPickUpPersonStatus(code) {
    const getCodeDescription = calendarData.calendar_data.pickup_service.allowed_pricing_models.find(model => model.code === code);
    if (!getCodeDescription) {
      return null;
    }
    return getCodeDescription.description;
  }
  updateDue(params) {
    const getCodeDescription = this.getPickUpPersonStatus(params.code);
    if (!getCodeDescription) {
      return;
    }
    if (getCodeDescription === 'Person') {
      return params.amount * params.numberOfPersons;
    }
    else {
      return params.amount * params.number_of_vehicles;
    }
  }
}

const irPickupCss = ".sc-ir-pickup-h{display:block}.custom-card-container.sc-ir-pickup{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e4e5ec}.card-title.sc-ir-pickup{flex:1}.border-theme.sc-ir-pickup{border:1px solid #cacfe7}";

const IrPickup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.closeModal = index.createEvent(this, "closeModal", 7);
    this.resetBookingData = index.createEvent(this, "resetBookingData", 7);
    this.pickupService = new PickupService();
    this.defaultPickupData = undefined;
    this.numberOfPersons = 0;
    this.bookingNumber = undefined;
    this.isLoading = false;
    this.allowedOptionsByLocation = [];
    this.pickupData = {
      location: -1,
      flight_details: '',
      due_upon_booking: '',
      number_of_vehicles: 1,
      vehicle_type_code: '',
      currency: undefined,
      arrival_time: '',
      arrival_date: utils.hooks().format('YYYY-MM-DD'),
      selected_option: undefined,
    };
    this.vehicleCapacity = [];
    this.cause = null;
  }
  componentWillLoad() {
    if (this.defaultPickupData) {
      const transformedData = this.pickupService.transformDefaultPickupData(this.defaultPickupData);
      this.vehicleCapacity = this.pickupService.getNumberOfVehicles(transformedData.selected_option.vehicle.capacity, this.numberOfPersons);
      this.allowedOptionsByLocation = calendarData.calendar_data.pickup_service.allowed_options.filter(option => option.location.id === transformedData.location);
      this.pickupData = Object.assign({}, transformedData);
    }
  }
  handleLocationChange(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const value = event.detail;
    if (value === '') {
      this.updatePickupData('location', -1);
    }
    if (value !== '') {
      this.allowedOptionsByLocation = calendarData.calendar_data.pickup_service.allowed_options.filter(option => option.location.id.toString() === value);
      let locationChoice = this.allowedOptionsByLocation[0];
      if (!locationChoice) {
        return;
      }
      this.vehicleCapacity = this.pickupService.getNumberOfVehicles(locationChoice.vehicle.capacity, this.numberOfPersons);
      this.pickupData = Object.assign(Object.assign({}, this.pickupData), { location: value, selected_option: locationChoice, number_of_vehicles: this.vehicleCapacity[0], due_upon_booking: this.pickupService
          .updateDue({
          amount: locationChoice.amount,
          code: locationChoice.pricing_model.code,
          numberOfPersons: this.numberOfPersons,
          number_of_vehicles: this.vehicleCapacity[0],
        })
          .toFixed(2), vehicle_type_code: locationChoice.vehicle.code, currency: locationChoice.currency });
      const input = this.el.querySelector('#pickup-time');
      if (!input) {
        setTimeout(() => {
          this.initializeInputMask();
        }, 100);
      }
    }
  }
  initializeInputMask() {
    const input = this.el.querySelector('#pickup-time');
    // if (this.pickupData) {
    //   (input as HTMLInputElement).value = this.pickupData.arrival_time;
    // }
    if (input) {
      Inputmask('Hh:Mm', {
        placeholder: 'HH:mm',
        definitions: {
          H: {
            validator: '[0-2]',
          },
          h: {
            validator: function (ch, maskset, pos) {
              var firstDigit = maskset.buffer[pos - 1];
              if (firstDigit === '2') {
                return /[0-3]/.test(ch);
              }
              else {
                return /[0-9]/.test(ch);
              }
            },
          },
          M: {
            validator: '[0-5]',
          },
          m: {
            validator: '[0-9]',
          },
        },
        insertMode: true,
        showMaskOnHover: false,
        inputmode: 'numeric',
        alias: 'datetime',
        oncomplete: () => {
          this.updatePickupData('arrival_time', input.value);
        },
        oncleared: () => {
          this.updatePickupData('arrival_time', '');
        },
        onincomplete: () => {
          this.updatePickupData('arrival_time', input.value);
        },
      }).mask(input);
    }
  }
  handleVehicleQuantityChange(e) {
    if (e.detail === '') {
      return;
    }
    const value = +e.detail;
    this.pickupData = Object.assign(Object.assign({}, this.pickupData), { number_of_vehicles: value, due_upon_booking: this.pickupService
        .updateDue({
        amount: this.pickupData.selected_option.amount,
        code: this.pickupData.selected_option.pricing_model.code,
        numberOfPersons: this.numberOfPersons,
        number_of_vehicles: value,
      })
        .toFixed(2) });
  }
  componentDidLoad() {
    if (this.defaultPickupData) {
      this.initializeInputMask();
    }
  }
  handleVehicleTypeChange(e) {
    if (e.detail === '') {
      this.pickupData = Object.assign(Object.assign({}, this.pickupData), { due_upon_booking: '', vehicle_type_code: '' });
      return;
    }
    let locationChoice = calendarData.calendar_data.pickup_service.allowed_options.find(option => option.location.id === +this.pickupData.location && option.vehicle.code === e.detail);
    if (!locationChoice) {
      return;
    }
    this.vehicleCapacity = [...this.pickupService.getNumberOfVehicles(locationChoice.vehicle.capacity, this.numberOfPersons)];
    this.pickupData = Object.assign(Object.assign({}, this.pickupData), { selected_option: locationChoice, number_of_vehicles: this.vehicleCapacity[0], due_upon_booking: this.pickupService
        .updateDue({
        amount: locationChoice.amount,
        code: locationChoice.pricing_model.code,
        numberOfPersons: this.numberOfPersons,
        number_of_vehicles: this.vehicleCapacity[0],
      })
        .toFixed(2), vehicle_type_code: locationChoice.vehicle.code });
  }
  updatePickupData(key, value) {
    this.pickupData = Object.assign(Object.assign({}, this.pickupData), { [key]: value });
  }
  async savePickup() {
    try {
      this.isLoading = true;
      const isValid = this.pickupService.validateForm(this.pickupData);
      if (isValid.error) {
        this.cause = isValid.cause;
        return;
      }
      if (this.cause) {
        this.cause = null;
      }
      await this.pickupService.savePickup(this.pickupData, this.bookingNumber, this.defaultPickupData !== null && this.pickupData.location === -1);
      this.resetBookingData.emit(null);
      this.closeModal.emit(null);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  render() {
    return (index.h(index.Host, { class: 'p-0' }, index.h("div", { class: "position-sticky mb-0 shadow-none p-0" }, index.h("div", { class: "mt-2 custom-card-container pb-1 mb-3 px-1" }, index.h("h3", { class: "card-title p-0  m-0 text-left font-medium-2" }, locales_store.locales.entries.Lcz_Pickup), index.h("div", null, index.h("ir-icon", { class: 'close m-0 p-0 ', onIconClickHandler: () => {
        this.closeModal.emit(null);
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", class: "m-0 p-0", viewBox: "0 0 384 512", height: 20, width: 20 }, index.h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))))), index.h("section", { class: 'px-1' }, index.h("ir-select", { selectedValue: this.pickupData.location, selectContainerStyle: "mb-1", onSelectChange: this.handleLocationChange.bind(this), firstOption: locales_store.locales.entries.Lcz_Pickup_NoThankYou, class: 'm-0 mb-1', LabelAvailable: false, data: this.pickupService.getAvailableLocations(locales_store.locales.entries.Lcz_Pickup_YesFrom) }), this.pickupData.location > 0 && (index.h(index.Fragment, null, index.h("div", { class: 'd-flex' }, index.h("div", { class: "form-group  mr-1" }, index.h("div", { class: "input-group row m-0" }, index.h("div", { class: `input-group-prepend col-5 p-0 text-dark border-0` }, index.h("label", { class: `input-group-text  flex-grow-1 text-dark border-theme ` }, locales_store.locales.entries.Lcz_ArrivalDate)), index.h("div", { class: "form-control form-control-md col-7 d-flex align-items-center pl-0" }, index.h("ir-date-picker", { minDate: utils.hooks().format('YYYY-MM-DD'), autoApply: true,
      // format="ddd, DD M YYYY"
      singleDatePicker: true, onDateChanged: evt => {
        this.updatePickupData('arrival_date', evt.detail.start.format('YYYY-MM-DD'));
      } })))), index.h("div", { class: "form-group" }, index.h("div", { class: "input-group  row m-0" }, index.h("div", { class: `input-group-prepend col-4 col-sm-3 p-0 text-dark border-0` }, index.h("label", { htmlFor: "pickup", class: `input-group-text flex-grow-1 text-dark border-theme` }, locales_store.locales.entries.Lcz_Time)), index.h("input", { type: "text", value: this.pickupData.arrival_time, id: "pickup-time", class: `form-control col-8 col-sm-4 ${this.cause === 'arrival_time' && 'border-danger'}` })))), index.h("ir-input-text", { value: this.pickupData.flight_details, label: locales_store.locales.entries.Lcz_FlightDetails, onTextChange: e => this.updatePickupData('flight_details', e.detail), placeholder: "", inputStyles: this.cause === 'flight_details' ? 'border-danger' : '' }), index.h("ir-select", { selectContainerStyle: "mb-1", selectStyles: this.cause === 'vehicle_type_code' ? 'border-danger' : '', onSelectChange: this.handleVehicleTypeChange.bind(this), firstOption: locales_store.locales.entries.Lcz_Select, selectedValue: this.pickupData.vehicle_type_code, class: 'm-0', LabelAvailable: false, data: this.allowedOptionsByLocation.map(option => ({
        text: option.vehicle.description,
        value: option.vehicle.code,
      })) }), index.h("div", { class: 'd-flex flex-column flex-md-row' }, index.h("ir-select", { labelBorder: "theme", selectContainerStyle: "mb-1", onSelectChange: this.handleVehicleQuantityChange.bind(this), selectStyles: this.cause === 'number_of_vehicles' ? 'border-danger' : '', selectedValue: this.pickupData.number_of_vehicles, labelWidth: 7, class: 'm-0  mb-md-0 mr-md-1 flex-fill', label: locales_store.locales.entries.Lcz_NbrOfVehicles, data: this.vehicleCapacity.map(i => ({
        text: i,
        value: i,
      })) }), index.h("ir-input-text", { labelBorder: "theme", readonly: true, value: this.pickupData.due_upon_booking, labelWidth: 7, label: `${locales_store.locales.entries.Lcz_DueUponBooking}  ${this.pickupData.currency.symbol}`, placeholder: "", class: "" })))), index.h("div", { class: 'd-flex flex-column flex-sm-row mt-3' }, index.h("ir-button", { onClick: () => this.closeModal.emit(null), btn_styles: "justify-content-center", class: `mb-1 mb-sm-0 flex-fill  ${this.defaultPickupData || this.pickupData.location !== -1 ? 'mr-sm-1' : ''}`, icon: "", text: locales_store.locales.entries.Lcz_Cancel, btn_color: "secondary" }), (this.defaultPickupData || this.pickupData.location !== -1) && (index.h("ir-button", { btn_styles: "justify-content-center align-items-center", class: 'm-0 flex-fill text-center', icon: "", isLoading: this.isLoading, text: locales_store.locales.entries.Lcz_Save, btn_color: "primary", onClick: this.savePickup.bind(this) }))))));
  }
  get el() { return index.getElement(this); }
};
IrPickup.style = irPickupCss;

const irRoomCss = ".light-blue-bg.sc-ir-room{background:#acecff;padding:0.2rem 0.3rem;border-radius:5px}.payment-container.sc-ir-room{position:absolute;right:1rem;height:fit-content}.sc-ir-room-h{position:relative}.sm-mr.sc-ir-room{margin-right:3px}.mx-0-5.sc-ir-room{margin-left:2px !important;margin-right:2px !important}.tax-width.sc-ir-room{font-size:10px}.sm-mb-1.sc-ir-room{margin-bottom:5px !important}.sm-mt-1.sc-ir-room{margin-top:5px !important}.mx-01.sc-ir-room{--m:5px;margin-right:var(--m) !important;margin-left:var(--m) !important}";

const IrRoom = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.deleteFinished = index.createEvent(this, "deleteFinished", 7);
    this.pressCheckIn = index.createEvent(this, "pressCheckIn", 7);
    this.pressCheckOut = index.createEvent(this, "pressCheckOut", 7);
    this.editInitiated = index.createEvent(this, "editInitiated", 7);
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
  getDateStr(date, locale = 'default') {
    return date.getDate() + ' ' + date.toLocaleString(locale, { month: 'short' }) + ' ' + date.getFullYear();
  }
  handleEditClick() {
    var _a, _b, _c, _d, _e, _f;
    this.editInitiated.emit({
      event_type: 'EDIT_BOOKING',
      ID: this.item['assigned_units_pool'],
      NAME: booking_service.formatName(this.item.guest.first_name, this.item.guest.last_name),
      EMAIL: this.bookingEvent.guest.email,
      PHONE: this.bookingEvent.guest.mobile,
      REFERENCE_TYPE: '',
      FROM_DATE: this.bookingEvent.from_date,
      TO_DATE: this.bookingEvent.to_date,
      TITLE: `${this.defaultTexts.entries.Lcz_EditBookingFor} ${(_b = (_a = this.item) === null || _a === void 0 ? void 0 : _a.roomtype) === null || _b === void 0 ? void 0 : _b.name} ${((_d = (_c = this.item) === null || _c === void 0 ? void 0 : _c.unit) === null || _d === void 0 ? void 0 : _d.name) || ''}`,
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
      PR_ID: (_e = this.item.unit) === null || _e === void 0 ? void 0 : _e.id,
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
      roomName: ((_f = this.item.unit) === null || _f === void 0 ? void 0 : _f.name) || '',
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
      const { data } = await Token.axios.post(`/DoReservation?Ticket=${this.ticket}`, body);
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
    return (index.h(index.Host, { class: "p-1 d-flex m-0" }, index.h("ir-icon", { id: "drawer-icon", "data-toggle": "collapse", "data-target": `#roomCollapse-${this.item.identifier.split(' ').join('')}`, "aria-expanded": "false", "aria-controls": "collapseExample", class: "pointer mr-1", onClick: () => {
        this.collapsed = !this.collapsed;
      } }, !this.collapsed ? (index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "22.5", viewBox: "0 0 576 512" }, index.h("path", { fill: "#104064", d: "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" }))) : (index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "25", viewBox: "0 0 640 512", slot: "icon" }, index.h("path", { fill: "#104064", d: "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" })))), index.h("div", { class: "flex-fill m-0 " }, index.h("div", { class: "d-flex align-items-start justify-content-between sm-mb-1" }, index.h("p", { class: "m-0 p-0" }, index.h("strong", { class: "m-0 p-0" }, this.myRoomTypeFoodCat || '', " "), " ", this.mealCodeName, ' ', this.item.rateplan.is_non_refundable && ` - ${this.defaultTexts.entries.Lcz_NonRefundable}`, ' '), index.h("div", { class: "d-flex m-0 p-0 align-items-center" }, index.h("span", { class: "p-0 m-0 ml-1 font-weight-bold" }, _formatAmount(this.item['gross_total'], this.currency)), this.hasRoomEdit && (index.h("ir-icon", { id: `roomEdit-${this.item.identifier}`, class: "pointer mx-1", onClick: this.handleEditClick.bind(this) }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16", viewBox: "0 0 512 512" }, index.h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" })))), this.hasRoomDelete && (index.h("ir-icon", { onClick: this.handleDeleteClick.bind(this), id: `roomDelete-${this.item.identifier}`, class: "pointer" }, index.h("svg", { slot: "icon", fill: "#ff2441", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "14.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })))))), index.h("div", { class: "d-flex align-items-center sm-mb-1" }, index.h("ir-date-view", { class: "mr-1", from_date: this.item.from_date, to_date: this.item.to_date, showDateDifference: false }), calendarData.calendar_data.is_frontdesk_enabled && this.item.unit && index.h("span", { class: "light-blue-bg mr-2 " }, this.item.unit.name), this.hasCheckIn && index.h("ir-button", { id: "checkin", icon: "", class: "mr-1", btn_color: "info", size: "sm", text: "Check in" }), this.hasCheckOut && index.h("ir-button", { id: "checkout", icon: "", btn_color: "info", size: "sm", text: "Check out" })), index.h("div", null, index.h("span", { class: "mr-1" }, `${this.item.guest.first_name || ''} ${this.item.guest.last_name || ''}`), this.item.rateplan.selected_variation.adult_nbr > 0 && index.h("span", null, " ", this.item.rateplan.selected_variation.adult_child_offering)), index.h("div", { class: "collapse", id: `roomCollapse-${this.item.identifier.split(' ').join('')}` }, index.h("div", { class: "d-flex sm-mb-1 sm-mt-1" }, index.h("div", { class: " sm-padding-top" }, index.h("strong", { class: "sm-padding-right" }, `${this.defaultTexts.entries.Lcz_Breakdown}:`)), index.h("div", { class: 'flex-fill' }, index.h("table", null, this.item.days.length > 0 &&
      this.item.days.map(item => (index.h("tr", null, index.h("td", { class: 'pr-2 text-right' }, _getDay(item.date)), " ", index.h("td", { class: "text-right" }, _formatAmount(item.amount, this.currency))))), index.h("tr", null, index.h("th", { class: "text-right pr-2" }, this.defaultTexts.entries.Lcz_SubTotal), index.h("th", { class: "text-right" }, _formatAmount(this.item.total, this.currency))), this.bookingEvent.is_direct ? (index.h(index.Fragment, null, (() => {
      const filtered_data = calendarData.calendar_data.taxes.filter(tx => tx.pct > 0);
      return filtered_data.map(d => {
        return (index.h("tr", null, index.h("td", { class: "text-right pr-2" }, d.is_exlusive ? this.defaultTexts.entries.Lcz_Excluding : this.defaultTexts.entries.Lcz_Including, " ", d.name, " (", d.pct, "%)"), index.h("td", { class: "text-right" }, _formatAmount((this.item.total * d.pct) / 100, this.currency))));
      });
    })())) : (index.h(index.Fragment, null, (() => {
      const filtered_data = this.item.ota_taxes.filter(tx => tx.amount > 0);
      return filtered_data.map(d => {
        return (index.h("tr", null, index.h("td", { class: "text-right pr-2" }, d.is_exlusive ? this.defaultTexts.entries.Lcz_Excluding : this.defaultTexts.entries.Lcz_Including, " ", d.name), index.h("td", { class: "text-right" }, d.currency.symbol, d.amount)));
      });
    })()))))), index.h("div", { class: "sm-mb-1", innerHTML: this.item.rateplan.cancelation || '' }), index.h("div", { class: "sm-mb-1", innerHTML: this.item.rateplan.guarantee || '' }), index.h("ir-label", { label: `${this.defaultTexts.entries.Lcz_MealPlan}:`, value: this.mealCodeName }))), index.h("ir-modal", { onConfirmModal: this.deleteRoom.bind(this), iconAvailable: true, icon: "ft-alert-triangle danger h1", leftBtnText: this.defaultTexts.entries.Lcz_Cancel, rightBtnText: this.defaultTexts.entries.Lcz_Delete, leftBtnColor: "secondary", rightBtnColor: "danger", modalTitle: this.defaultTexts.entries.Lcz_Confirmation, modalBody: `${this.defaultTexts.entries['Lcz_AreYouSureDoYouWantToRemove ']} ${this.item.roomtype.name} ${this.item.unit ? this.item.unit.name : ''} ${this.defaultTexts.entries.Lcz_FromThisBooking}` })));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "bookingEvent": ["handleBookingEventChange"]
  }; }
};
IrRoom.style = irRoomCss;

const irSelectCss = ".border-theme.sc-ir-select{border:1px solid #cacfe7}@keyframes bounce{0%,100%{transform:scale(1);animation-timing-function:cubic-bezier(0.8, 0, 1, 1)}50%{transform:scale(1.2);animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}}.bounce-3.sc-ir-select{animation:bounce 1s 1}";

const IrSelect = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.selectChange = index.createEvent(this, "selectChange", 7);
    this.count = 0;
    this.name = undefined;
    this.data = undefined;
    this.label = '<label>';
    this.selectStyles = undefined;
    this.selectContainerStyle = undefined;
    this.selectedValue = null;
    this.required = undefined;
    this.LabelAvailable = true;
    this.firstOption = 'Select';
    this.selectStyle = true;
    this.showFirstOption = true;
    this.submited = false;
    this.size = 'md';
    this.textSize = 'md';
    this.labelPosition = 'left';
    this.labelBackground = null;
    this.labelColor = 'dark';
    this.labelBorder = 'theme';
    this.labelWidth = 3;
    this.select_id = v4.v4();
    this.initial = true;
    this.valid = false;
  }
  watchHandler(newValue) {
    if (newValue !== null && this.required) {
      this.valid = true;
    }
  }
  watchHandler2(newValue) {
    if (newValue && this.required) {
      this.initial = false;
    }
  }
  handleButtonAnimation(e) {
    console.log(e.detail, this.select_id, e.detail === this.select_id);
    if (!this.selectEl || e.detail !== this.select_id) {
      return;
    }
    console.log('first1');
    e.stopImmediatePropagation();
    e.stopPropagation();
    this.selectEl.classList.add('border-danger');
  }
  componentwillload() { }
  disconnectedCallback() { }
  handleSelectChange(event) {
    this.selectEl.classList.remove('border-danger');
    if (this.required) {
      this.initial = false;
      this.valid = event.target.checkValidity();
      this.selectedValue = event.target.value;
      this.selectChange.emit(this.selectedValue);
    }
    else {
      this.selectedValue = event.target.value;
      this.selectChange.emit(this.selectedValue);
    }
  }
  render() {
    let className = 'form-control';
    let label = (index.h("div", { class: `input-group-prepend col-${this.labelWidth} p-0 text-${this.labelColor}` }, index.h("label", { htmlFor: this.select_id, class: `input-group-text ${this.labelPosition === 'right' ? 'justify-content-end' : this.labelPosition === 'center' ? 'justify-content-center' : ''} ${this.labelBackground ? 'bg-' + this.labelBackground : ''} flex-grow-1 text-${this.labelColor} border-${this.labelBorder === 'none' ? 0 : this.labelBorder} ` }, this.label, this.required ? '*' : '')));
    if (this.selectStyle === false) {
      className = '';
    }
    if (this.required && !this.valid && !this.initial) {
      className = `${className} border-danger`;
    }
    if (!this.LabelAvailable) {
      label = '';
    }
    return (index.h("div", { class: `form-group m-0 ${this.selectContainerStyle}` }, index.h("div", { class: "input-group row m-0" }, label, index.h("select", { ref: el => (this.selectEl = el), id: this.select_id, class: `${this.selectStyles} ${className} form-control-${this.size} text-${this.textSize} col-${this.LabelAvailable ? 12 - this.labelWidth : 12}`, onInput: this.handleSelectChange.bind(this), required: this.required }, this.showFirstOption && index.h("option", { value: '' }, this.firstOption), this.data.map(item => {
      if (this.selectedValue === item.value) {
        return (index.h("option", { selected: true, value: item.value }, item.text));
      }
      else {
        return index.h("option", { value: item.value }, item.text);
      }
    })))));
  }
  static get watchers() { return {
    "selectedValue": ["watchHandler"],
    "submited": ["watchHandler2"]
  }; }
};
IrSelect.style = irSelectCss;

const irSidebarCss = ".backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;cursor:pointer;background:rgba(0, 0, 0, 0.5);z-index:99;transition:all 0.5s;opacity:0;pointer-events:none;transition:all 0.5s}.backdrop.active{opacity:1;pointer-events:all}.sidebar-right{position:fixed;top:0;right:-120%;bottom:0;width:var(--sidebar-width, 40rem);max-width:100%;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);transition:all 0.5s;z-index:100;overflow-y:hidden;color:var(--sidebar-color, #000);background-color:var(--sidebar-backgound, #fff);padding:0.5rem}.sidebar-right.active{right:0;overflow-y:auto}.sidebar-left{position:fixed;top:0;left:-100%;bottom:0;width:var(--sidebar-width, 30rem);max-width:100%;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);transition:all 0.5s;z-index:200;overflow-y:hidden;color:var(--sidebar-color, #000);background:var(--sidebar-backgound, #fff);padding:0.5rem}.sidebar-left.active{left:0;overflow-y:scroll}.close{position:absolute;top:0.5rem;right:1rem;width:1rem;height:1rem;cursor:pointer}";

const IrSidebar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.irSidebarToggle = index.createEvent(this, "irSidebarToggle", 7);
    this.name = undefined;
    this.side = 'right';
    this.showCloseButton = true;
    this.open = false;
    this.sidebarStyles = undefined;
  }
  applyStyles() {
    for (const property in this.sidebarStyles) {
      if (this.sidebarStyles.hasOwnProperty(property)) {
        this.sidebarRef.style[property] = this.sidebarStyles[property];
      }
    }
  }
  handleSidebarStylesChange() {
    this.applyStyles();
  }
  componentWillLoad() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidLoad() {
    // If esc key is pressed, close the modal
    this.applyStyles();
    document.addEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.key === 'Escape') {
      return this.toggleSidebar();
    }
    else {
      return;
    }
  }
  // Unsubscribe to the event when the component is removed from the DOM
  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  async toggleSidebar() {
    this.irSidebarToggle.emit(this.open);
  }
  render() {
    let className = '';
    if (this.open) {
      className = 'active';
    }
    else {
      className = '';
    }
    return [
      index.h("div", { class: `backdrop ${className}`, onClick: () => {
          this.toggleSidebar();
        } }),
      index.h("div", { ref: el => (this.sidebarRef = el), class: `sidebar-${this.side} ${className}` }, this.showCloseButton && (index.h("ir-icon", { class: "close", onIconClickHandler: () => {
          this.toggleSidebar();
        } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, index.h("path", { fill: "#6b6f82", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), index.h("slot", null)),
    ];
  }
  static get watchers() { return {
    "sidebarStyles": ["handleSidebarStylesChange"]
  }; }
};
IrSidebar.style = irSidebarCss;

const irToastCss = "button.sc-ir-toast,p.sc-ir-toast,h3.sc-ir-toast,div.sc-ir-toast{all:unset}.sc-ir-toast-h{--rd-viewport-padding:25px;--rd-success:#2b9a66;position:fixed;bottom:0;right:0;display:flex;flex-direction:column;padding:var(--rd-viewport-padding);gap:10px;max-width:100vw;margin:0;list-style:none;z-index:2147483647;outline:none;pointer-events:none;-webkit-user-select:none;user-select:none}@media (prefers-color-scheme: dark){.sc-ir-toast-h{--rd-success:#33b074}}p.sc-ir-toast{color:hsla(222.2, 84%, 4.9%, 0.8);font-size:13px;line-height:1.3}h1.sc-ir-toast,h2.sc-ir-toast,h3.sc-ir-toast,h4.sc-ir-toast,h5.sc-ir-toast,h6.sc-ir-toast{font-weight:500;color:hsl(222.2, 84%, 4.9%);font-size:15px}[position='top-left'].sc-ir-toast-h{top:0;left:0}[position='top-right'].sc-ir-toast-h{top:0;right:0}[position='bottom-left'].sc-ir-toast-h{bottom:0;left:0}[position='bottom-right'].sc-ir-toast-h{bottom:0;right:0}.icon-container.sc-ir-toast{height:25px;width:25px;border-radius:25px;display:flex;align-items:center;justify-content:center;padding:0;margin:0}.icon-container.sc-ir-toast>svg.sc-ir-toast{margin:0;color:white;stroke-width:5px}.success.sc-ir-toast{background-color:var(--rd-success)}.error.sc-ir-toast{background-color:red}.ToastRoot.sc-ir-toast{background-color:hsl(0, 0%, 100%);border-radius:0.5rem;box-shadow:hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;padding:15px;display:grid;grid-template-areas:'title action' 'description action';grid-template-columns:auto max-content;column-gap:15px;align-items:center;pointer-events:none;opacity:0;border:1px solid hsl(214.3, 31.8%, 91.4%);position:relative}.ToastRoot[data-state='open'].sc-ir-toast{pointer-events:all;animation:slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)}.ToastRoot[data-state='closed'].sc-ir-toast{pointer-events:none;animation:hide 100ms ease-in}@-webkit-keyframes slideIn{from{transform:translateX(var(--rd-offset-width))}to{transform:translateX(0)}}@keyframes slideIn{from{transform:translateX(var(--rd-offset-width))}to{transform:translateX(0)}}.ToastTitle.sc-ir-toast{grid-area:title;font-weight:500;color:hsl(222.2, 84%, 4.9%);font-size:15px}.ToastDescription.sc-ir-toast{grid-area:description;margin:0;margin-top:5px;color:hsla(222.2, 84%, 4.9%, 0.8);font-size:13px;line-height:1.3;overflow:hidden;text-overflow:ellipsis}.ToastAction.sc-ir-toast{grid-area:action}";

const IrToast = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.position = 'bottom-left';
    this.toasts = [];
  }
  onToast(event) {
    const toast = event.detail;
    this.showToast(toast);
  }
  showToast(toast) {
    const toastrOptions = {
      positionClass: 'toast-top-right',
      closeButton: true,
      timeOut: toast.duration || 5000,
    };
    switch (toast.type) {
      case 'success':
        toastr.success(toast.title, '', toastrOptions);
        break;
      case 'error':
        toastr.error(toast.title, '', toastrOptions);
        break;
    }
  }
  render() {
    return index.h(index.Host, null);
  }
  get element() { return index.getElement(this); }
};
IrToast.style = irToastCss;

const irTooltipCss = ".sc-ir-tooltip-h{position:relative}.tooltip-icon.sc-ir-tooltip{margin:0 5px;padding:0}.tooltip-inner-custom.sc-ir-tooltip{min-width:max-content !important}";

const IrTooltip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.message = undefined;
    this.withHtml = true;
    this.customSlot = false;
    this.open = undefined;
  }
  toggleOpen(shouldOpen) {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
    if (shouldOpen) {
      this.tooltipTimeout = setTimeout(() => {
        this.open = true;
      }, 300);
    }
    else {
      this.open = false;
    }
  }
  render() {
    return (index.h(index.Host, { class: "m-0 p-0" }, index.h("span", { onMouseEnter: () => this.toggleOpen(true), onMouseLeave: () => this.toggleOpen(false) }, !this.customSlot ? (index.h("svg", { "data-toggle": "tooltip", "data-placement": "top", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16", class: "tooltip-icon", viewBox: "0 0 512 512" }, index.h("path", { fill: "#6b6f82", d: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" }))) : (index.h("slot", { name: "tooltip-trigger" }))), this.open && (index.h("div", { class: "tooltip bottom show position-absolute", role: "tooltip" }, index.h("div", { class: "tooltip-arrow" }), index.h("div", { class: `tooltip-inner fit ${this.customSlot && 'tooltip-inner-custom'}` }, index.h("span", { innerHTML: this.message }))))));
  }
};
IrTooltip.style = irTooltipCss;

const otaLabelCss = "*.sc-ota-label{margin:0;padding:0}.sc-ota-label-h{display:flex;margin-bottom:5px;gap:5px}strong.sc-ota-label{margin:0;padding:0}ul.sc-ota-label{margin:0 3px;padding:0;flex:1;list-style:none}li.sc-ota-label{margin:0;padding:0}";

const OtaLabel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.label = undefined;
    this.remarks = undefined;
  }
  render() {
    var _a;
    if (!this.remarks) {
      return null;
    }
    return (index.h(index.Host, null, index.h("strong", null, this.label), index.h("ul", null, (_a = this.remarks) === null || _a === void 0 ? void 0 : _a.map(remark => (index.h("li", { key: v4.v4() }, "- ", remark.statement))))));
  }
};
OtaLabel.style = otaLabelCss;

exports.igl_application_info = IglApplicationInfo;
exports.igl_block_dates_view = IglBlockDatesView;
exports.igl_book_property = IglBookProperty;
exports.igl_book_property_container = IglBookPropertyContainer;
exports.igl_book_property_footer = IglBookPropertyFooter;
exports.igl_book_property_header = IglBookPropertyHeader;
exports.igl_booking_overview_page = IglBookingOverviewPage;
exports.igl_booking_room_rate_plan = IglBookingRoomRatePlan;
exports.igl_booking_rooms = IglBookingRooms;
exports.igl_date_range = IglDateRange;
exports.igl_pagetwo = IglPagetwo;
exports.igl_property_booked_by = IglPropertyBookedBy;
exports.ir_autocomplete = IrAutocomplete;
exports.ir_booking_details = IrBookingDetails;
exports.ir_booking_listing = IrBookingListing;
exports.ir_button = IrButton;
exports.ir_common = IrCommon;
exports.ir_date_picker = IrDatePicker;
exports.ir_date_view = IrDateView;
exports.ir_guest_info = GuestInfo;
exports.ir_icon = IrIcon;
exports.ir_input_text = IrInputText;
exports.ir_interceptor = IrInterceptor;
exports.ir_label = IrLabel;
exports.ir_listing_header = IrListingHeader;
exports.ir_listing_modal = IrListingModal;
exports.ir_loading_screen = IrLoadingScreen;
exports.ir_modal = IrModal;
exports.ir_payment_details = IrPaymentDetails;
exports.ir_pickup = IrPickup;
exports.ir_room = IrRoom;
exports.ir_select = IrSelect;
exports.ir_sidebar = IrSidebar;
exports.ir_toast = IrToast;
exports.ir_tooltip = IrTooltip;
exports.ota_label = OtaLabel;

//# sourceMappingURL=igl-application-info_36.cjs.entry.js.map