'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');
const utils = require('./utils-bfd564ee.js');
const axios = require('./axios-394374e5.js');
const calendarData = require('./calendar-data-00cf91e3.js');
const v4 = require('./v4-d89fec7e.js');
const moment = require('./moment-f96595e5.js');
const irInterceptor_store = require('./ir-interceptor.store-24a471ee.js');
const booking_service = require('./booking.service-2fe4746b2.js');
require('./booking-1be13c43.js');

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
    return (index.h(index.Host, null, index.h("div", { class: "text-left mt-1 " }, index.h("div", { class: " mb-1 " }, this.bookingType === 'PLUS_BOOKING' || this.bookingType === 'ADD_ROOM' || this.bookingType === 'EDIT_BOOKING' ? (index.h("span", { class: "h5 mr-1" }, this.guestInfo.roomCategoryName)) : null, index.h("span", { class: " font-weight-bold" }, this.guestInfo.ratePlanName.replace(this.guestInfo.roomCategoryName + '/', ''), index.h("ir-tooltip", { class: " mr-1", message: this.guestInfo.cancelation + this.guestInfo.guarantee })), index.h("span", null, this.guestInfo.adult_child_offering)), index.h("div", { class: "d-flex flex-column flex-md-row m-0 p-0 align-items-md-center aplicationInfoContainer " }, index.h("div", { class: "mr-1 flex-fill guest-info-container" }, index.h("input", { id: v4.v4(), type: "email", class: `form-control ${this.isButtonPressed && this.guestData.guestName === '' && 'border-danger'}`, placeholder: axios.locales.entries.Lcz_GuestFirstnameAndLastname, name: "guestName", onInput: event => this.handleGuestNameChange(event), required: true, value: this.guestData.guestName })), index.h("div", { class: 'mt-1 mt-md-0 d-flex align-items-center flex-fill' }, calendarData.calendar_data.is_frontdesk_enabled && (this.bookingType === 'PLUS_BOOKING' || this.bookingType === 'ADD_ROOM' || this.bookingType === 'EDIT_BOOKING') ? (index.h("div", { class: "mr-1 p-0 flex-fill  preference-select-container" }, index.h("select", { class: `form-control  input-sm pr-0`, id: v4.v4(), onChange: event => this.handleDataChange('roomId', event.target.value) }, index.h("option", { value: "", selected: this.guestData.roomId === '' }, axios.locales.entries.Lcz_Assignunits), this.filterdRoomList.map(room => (index.h("option", { value: room.id, selected: +this.guestData.roomId === room.id }, room.name)))))) : null, index.h("div", { class: "mr-1 flex-fill" }, index.h("select", { class: `form-control input-sm ${this.isButtonPressed && (this.guestData.preference === '' || this.guestData.preference === 0) && 'border-danger'}`, id: v4.v4(), onChange: event => this.handleDataChange('preference', event.target.value) }, index.h("option", { value: "", selected: this.guestData.preference === '' }, axios.locales.entries.Lcz_BedConfiguration), this.bedPreferenceType.map(data => (index.h("option", { value: +data.CODE_NAME, selected: this.guestData.preference === +data.CODE_NAME }, data.CODE_VALUE_EN))))), index.h("div", { class: "" }, utils.getCurrencySymbol(this.currency.code) + Number(this.userRate).toFixed(2), "/", axios.locales.entries.Lcz_Stay))))));
  }
  static get watchers() { return {
    "selectedUnits": ["handleSelctedUnits"]
  }; }
};
IglApplicationInfo.style = iglApplicationInfoCss;

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
    return (index.h(index.Host, null, index.h("div", { class: "d-flex justify-content-between gap-30 align-items-center" }, this.isEventType('EDIT_BOOKING') ? (index.h(index.Fragment, null, this.renderButton('cancel', axios.locales.entries.Lcz_Cancel), this.shouldRenderTwoButtons() && this.renderButton('next', `${axios.locales.entries.Lcz_Next} >>`))) : (index.h(index.Fragment, null, this.renderButton('cancel', axios.locales.entries.Lcz_Cancel), this.shouldRenderTwoButtons() && this.renderButton('next', `${axios.locales.entries.Lcz_Next} >>`, this.disabled))))));
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
    return (index.h("fieldset", { class: "form-group  text-left" }, index.h("label", { class: "h5" }, axios.locales.entries.Lcz_Tobooking, "# "), index.h("div", { class: "btn-group ml-1" }, index.h("ir-autocomplete", { value: Object.keys(this.bookedByInfoData).length > 1 ? `${this.bookedByInfoData.bookingNumber} ${this.bookedByInfoData.firstName} ${this.bookedByInfoData.lastName}` : '', from_date: moment.hooks(this.bookingDataDefaultDateRange.fromDate).format('YYYY-MM-DD'), to_date: moment.hooks(this.bookingDataDefaultDateRange.toDate).format('YYYY-MM-DD'), propertyId: this.propertyId, placeholder: axios.locales.entries.Lcz_BookingNumber, onComboboxValue: e => {
        e.stopImmediatePropagation();
        this.spiltBookingSelected.emit(e.detail);
      }, isSplitBooking: true }))));
  }
  getSourceNode() {
    return (index.h("fieldset", { class: "d-flex flex-column text-left flex-lg-row align-items-lg-center" }, index.h("label", { class: "mr-lg-1" }, axios.locales.entries.Lcz_Source, " "), index.h("div", { class: "btn-group mt-1 mt-lg-0 sourceContainer" }, index.h("select", { class: "form-control input-sm", id: "xSmallSelect", onChange: evt => this.sourceDropDownChange.emit(evt.target.value) }, this.sourceOptions.map(option => {
      if (option.type === 'LABEL') {
        return index.h("optgroup", { label: option.value });
      }
      return (index.h("option", { value: option.id, selected: this.sourceOption.code === option.id }, option.value));
    })))));
  }
  handleAdultChildChange(key, event) {
    const value = event.target.value;
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
    return (index.h("div", { class: 'mt-1 mt-lg-0 d-flex flex-column text-left' }, index.h("label", { class: "mb-1 d-lg-none" }, axios.locales.entries.Lcz_NumberOfGuests, " "), index.h("div", { class: "form-group my-lg-0 text-left d-flex align-items-center justify-content-between justify-content-sm-start" }, index.h("fieldset", null, index.h("div", { class: "btn-group " }, index.h("select", { class: "form-control input-sm", id: "xAdultSmallSelect", onChange: evt => this.handleAdultChildChange('adult', evt) }, index.h("option", { value: "" }, axios.locales.entries.Lcz_AdultsCaption), Array.from(Array(this.adultChildConstraints.adult_max_nbr), (_, i) => i + 1).map(option => (index.h("option", { value: option }, option)))))), this.adultChildConstraints.child_max_nbr > 0 && (index.h("fieldset", null, index.h("div", { class: "btn-group ml-1" }, index.h("select", { class: "form-control input-sm", id: "xChildrenSmallSelect", onChange: evt => this.handleAdultChildChange('child', evt) }, index.h("option", { value: '' }, this.renderChildCaption()), Array.from(Array(this.adultChildConstraints.child_max_nbr), (_, i) => i + 1).map(option => (index.h("option", { value: option }, option))))))), index.h("ir-button", { isLoading: irInterceptor_store.interceptor_requests.status === 'pending', icon: "", size: "sm", class: "ml-2", text: axios.locales.entries.Lcz_Check, onClickHanlder: () => this.handleButtonClicked() }))));
  }
  renderChildCaption() {
    const maxAge = this.adultChildConstraints.child_max_age;
    let years = axios.locales.entries.Lcz_Years;
    if (maxAge === 1) {
      years = axios.locales.entries.Lcz_Year;
    }
    return `${axios.locales.entries.Lcz_ChildCaption} < ${this.adultChildConstraints.child_max_age} ${years}`;
  }
  handleButtonClicked() {
    if (this.isEventType('SPLIT_BOOKING') && Object.keys(this.bookedByInfoData).length <= 1) {
      this.toast.emit({
        type: 'error',
        title: axios.locales.entries.Lcz_ChooseBookingNumber,
        description: '',
        position: 'top-right',
      });
    }
    else if (this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING')) {
      const initialToDate = moment.hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date));
      const initialFromDate = moment.hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date));
      const selectedFromDate = moment.hooks(new Date(this.dateRangeData.fromDate));
      const selectedToDate = moment.hooks(new Date(this.dateRangeData.toDate));
      if (selectedToDate.isBefore(initialFromDate) || selectedFromDate.isAfter(initialToDate)) {
        this.toast.emit({
          type: 'error',
          title: `${axios.locales.entries.Lcz_CheckInDateShouldBeMAx.replace('%1', moment.hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date)).format('ddd, DD MMM YYYY')).replace('%2', moment.hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date)).format('ddd, DD MMM YYYY'))}  `,
          description: '',
          position: 'top-right',
        });
        return;
      }
      else if (this.adultChildCount.adult === 0) {
        this.toast.emit({ type: 'error', title: axios.locales.entries.Lcz_PlzSelectNumberOfGuests, description: '', position: 'top-right' });
      }
      else {
        this.buttonClicked.emit({ key: 'check' });
      }
    }
    else if (this.minDate && new Date(this.dateRangeData.fromDate).getTime() > new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date).getTime()) {
      this.toast.emit({
        type: 'error',
        title: `${axios.locales.entries.Lcz_CheckInDateShouldBeMAx.replace('%1', moment.hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date)).format('ddd, DD MMM YYYY')).replace('%2', moment.hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date)).format('ddd, DD MMM YYYY'))}  `,
        description: '',
        position: 'top-right',
      });
    }
    else if (this.adultChildCount.adult === 0) {
      this.toast.emit({ type: 'error', title: axios.locales.entries.Lcz_PlzSelectNumberOfGuests, description: '', position: 'top-right' });
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
    return (index.h(index.Host, null, showSourceNode && this.getSourceNode(), index.h("div", { class: `d-flex flex-column flex-lg-row align-items-lg-center ${showSourceNode ? 'mt-1' : ''}` }, index.h("fieldset", { class: "mt-lg-0  " }, index.h("igl-date-range", { dateLabel: axios.locales.entries.Lcz_Dates, minDate: this.minDate, disabled: this.isEventType('BAR_BOOKING') || this.isEventType('SPLIT_BOOKING'), defaultData: this.bookingDataDefaultDateRange })), !this.isEventType('EDIT_BOOKING') && this.getAdultChildConstraints()), index.h("p", { class: "text-right mt-1 message-label" }, this.message)));
  }
};
IglBookPropertyHeader.style = iglBookPropertyHeaderCss;

const iglBookingOverviewPageCss = ".sc-igl-booking-overview-page-h{display:block}.sc-igl-booking-overview-page-h>*.sc-igl-booking-overview-page{margin:0;padding:auto}.scrollContent.sc-igl-booking-overview-page{height:calc(100% - 79px);overflow:auto;position:relative}";

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
      adultChildCount: this.adultChildCount, splitBookingId: this.showSplitBookingOption, bookingData: this.bookingData, sourceOptions: this.sourceOptions, message: this.message, bookingDataDefaultDateRange: this.bookingData.defaultDateRange, showSplitBookingOption: this.showSplitBookingOption, adultChildConstraints: this.adultChildConstraints, splitBookings: this.getSplitBookings(), propertyId: this.propertyId }), index.h("div", { class: " text-left" }, (_b = (_a = this.bookingData) === null || _a === void 0 ? void 0 : _a.roomsInfo) === null || _b === void 0 ? void 0 : _b.map(roomInfo => {
      console.log(this.selectedRooms);
      return (index.h("igl-booking-rooms", { initialRoomIds: this.initialRoomIds, isBookDisabled: Object.keys(this.bookedByInfoData).length <= 1, key: `room-info-${roomInfo.id}`, currency: this.currency, ratePricingMode: this.ratePricingMode, dateDifference: this.dateRangeData.dateDifference, bookingType: this.bookingData.event_type, roomTypeData: roomInfo, class: "mt-2 mb-1 p-0", roomInfoId: this.selectedRooms.has(`c_${roomInfo.id}`) ? roomInfo.id : null, defaultData: this.selectedRooms.get(`c_${roomInfo.id}`), onDataUpdateEvent: evt => this.roomsDataUpdate.emit(evt.detail) }));
    })), index.h("igl-book-property-footer", { class: 'p-0 mb-1 mt-3', eventType: this.bookingData.event_type, disabled: this.selectedRooms.size === 0 })));
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
    console.log('default data', this.defaultData);
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
      this.dataUpdateEvent.emit({
        key: 'roomRatePlanUpdate',
        changedKey: 'physicalRooms',
        data: this.selectedData,
      });
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
    return (index.h(index.Host, null, index.h("div", { class: "d-flex flex-column m-0 p-0 flex-lg-row align-items-lg-center justify-content-lg-between " }, index.h("div", { class: "rateplan-name-container" }, this.bookingType === 'BAR_BOOKING' ? (index.h(index.Fragment, null, index.h("span", { class: "font-weight-bold\t" }, this.ratePlanData.name.split('/')[0]), index.h("span", null, "/", this.ratePlanData.name.split('/')[1]))) : (index.h("span", null, this.ratePlanData.name)), index.h("ir-tooltip", { message: this.ratePlanData.cancelation + this.ratePlanData.guarantee })), index.h("div", { class: 'd-md-flex justify-content-md-end  align-items-md-center  flex-fill rateplan-container' }, index.h("div", { class: "mt-1 mt-lg-0 flex-fill max-w-300" }, index.h("fieldset", { class: "position-relative" }, index.h("select", { disabled: this.disableForm(), class: "form-control  input-sm", id: v4.v4(), onChange: evt => this.handleDataChange('adult_child_offering', evt) }, this.ratePlanData.variations.map(variation => (index.h("option", { value: variation.adult_child_offering, selected: this.selectedData.adult_child_offering === variation.adult_child_offering }, variation.adult_child_offering)))))), index.h("div", { class: 'm-0 p-0 d-md-flex justify-content-between ml-md-1 ' }, index.h("div", { class: " d-flex mt-1  mt-lg-0 m-0 p-0 rate-total-night-view   " }, index.h("fieldset", { class: "position-relative has-icon-left m-0 p-0 rate-input-container  " }, index.h("div", { class: "input-group-prepend" }, index.h("span", { "data-disabled": this.disableForm(), "data-state": this.isInputFocused ? 'focus' : '', class: "input-group-text new-currency", id: "basic-addon1" }, utils.getCurrencySymbol(this.currency.code))), index.h("input", { onFocus: () => (this.isInputFocused = true), onBlur: () => (this.isInputFocused = false), disabled: this.disableForm(), type: "text", class: "form-control pl-0 input-sm rate-input py-0 m-0 rounded-0 rateInputBorder", value: this.renderRate(), id: v4.v4(), placeholder: axios.locales.entries.Lcz_Rate || 'Rate', onInput: (event) => this.handleInput(event) })), index.h("fieldset", { class: "position-relative m-0 total-nights-container p-0 " }, index.h("select", { disabled: this.disableForm(), class: "form-control input-sm m-0 nightBorder rounded-0  py-0", id: v4.v4(), onChange: evt => this.handleDataChange('rateType', evt) }, this.ratePricingMode.map(data => (index.h("option", { value: data.CODE_NAME, selected: this.selectedData.rateType === +data.CODE_NAME }, data.CODE_VALUE_EN)))))), this.bookingType === 'PLUS_BOOKING' || this.bookingType === 'ADD_ROOM' ? (index.h("div", { class: "flex-lg-fill  mt-lg-0 ml-md-2 m-0 mt-1 p-0" }, index.h("fieldset", { class: "position-relative" }, index.h("select", { disabled: this.selectedData.rate === 0 || this.disableForm(), class: "form-control input-sm", id: v4.v4(), onChange: evt => this.handleDataChange('totalRooms', evt) }, Array.from({ length: this.totalAvailableRooms + 1 }, (_, i) => i).map(i => (index.h("option", { value: i, selected: this.selectedData.totalRooms === i }, i))))))) : null), this.bookingType === 'EDIT_BOOKING' ? (index.h(index.Fragment, null, index.h("div", { class: " m-0 p-0  mt-lg-0  ml-md-1 mt-md-1 d-none d-md-block" }, index.h("fieldset", { class: "position-relative" }, index.h("input", { disabled: this.disableForm(), type: "radio", name: "ratePlanGroup", value: "1", onChange: evt => this.handleDataChange('totalRooms', evt), checked: this.selectedData.totalRooms === 1 }))), index.h("button", { disabled: this.selectedData.rate === -1 || this.disableForm(), type: "button", class: "btn btn-primary booking-btn mt-lg-0 btn-sm ml-md-1  mt-1 d-md-none ", onClick: () => this.bookProperty() }, this.selectedData.totalRooms === 1 ? axios.locales.entries.Lcz_Current : axios.locales.entries.Lcz_Select))) : null, this.bookingType === 'BAR_BOOKING' || this.bookingType === 'SPLIT_BOOKING' ? (index.h("button", { disabled: this.selectedData.rate === -1 || this.disableForm() || (this.bookingType === 'SPLIT_BOOKING' && this.isBookDisabled), type: "button", class: "btn btn-primary booking-btn mt-lg-0 btn-sm ml-md-1  mt-1 ", onClick: () => this.bookProperty() }, axios.locales.entries.Lcz_Book)) : null))));
  }
  static get watchers() { return {
    "ratePlanData": ["ratePlanDataChanged"]
  }; }
};
IglBookingRoomRatePlan.style = iglBookingRoomRatePlanCss;

const iglBookingRoomsCss = ".sc-igl-booking-rooms-h{display:block}";

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
    return (index.h(index.Host, null, isValidBookingType && index.h("div", { class: "font-weight-bold font-medium-1 mb-1" }, this.roomTypeData.name), this.roomTypeData.rateplans.map((ratePlan, index$1) => {
      if (ratePlan.variations !== null) {
        let shouldBeDisabled = this.roomInfoId && this.roomInfoId === this.roomTypeData.id;
        let roomId = -1;
        if (shouldBeDisabled && this.initialRoomIds) {
          roomId = this.initialRoomIds.roomId;
        }
        return (index.h("igl-booking-room-rate-plan", { index: index$1, isBookDisabled: this.isBookDisabled, key: `rate-plan-${ratePlan.id}`, ratePricingMode: this.ratePricingMode, class: isValidBookingType ? '' : '', currency: this.currency, dateDifference: this.dateDifference, ratePlanData: ratePlan, totalAvailableRooms: this.roomsDistributions[index$1], bookingType: this.bookingType, defaultData: (this.defaultData && this.defaultData.get(`p_${ratePlan.id}`)) || null, shouldBeDisabled: shouldBeDisabled, onDataUpdateEvent: evt => this.onRoomDataUpdate(evt, index$1), physicalrooms: this.roomTypeData.physicalrooms, defaultRoomId: roomId, selectedRoom: this.initialRoomIds }));
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

const iglDateRangeCss = ".sc-igl-date-range-h{display:flex;text-align:left;align-items:center}.date-range-input.sc-igl-date-range{margin:0;padding:0;display:flex;flex:1}.iglRangeNights.sc-igl-date-range{margin:0;padding:0}.iglRangePicker[data-state='disabled'].sc-igl-date-range{border:0;padding-left:0;padding-right:0;width:180px;margin-right:0}.iglRangePicker.sc-igl-date-range{margin:0;border:1px solid #379ff2;box-sizing:border-box;width:220px;display:flex;align-items:center}.calendarPickerContainer.sc-igl-date-range{display:flex}";

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
    this.renderAgain = false;
  }
  getStringDateFormat(dt) {
    return dt.getFullYear() + '-' + (dt.getMonth() < 9 ? '0' : '') + (dt.getMonth() + 1) + '-' + (dt.getDate() <= 9 ? '0' : '') + dt.getDate();
  }
  componentWillLoad() {
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
  calculateTotalNights() {
    this.totalNights = Math.floor((this.toDate.getTime() - this.fromDate.getTime()) / 86400000);
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
    return (index.h(index.Host, null, index.h("div", { class: "calendarPickerContainer ml-0 d-flex flex-column flex-lg-row align-items-lg-center " }, index.h("span", { class: "mt-0 mb-1 mb-lg-0 mr-lg-1 text-left" }, this.dateLabel, ":"), index.h("div", { class: 'd-flex align-items-center mr-lg-1' }, index.h("div", { class: "iglRangePicker form-control input-sm ", "data-state": this.disabled ? 'disabled' : 'active' }, index.h("ir-date-picker", { maxDate: this.maxDate, class: 'date-range-input', disabled: this.disabled, fromDate: this.fromDate, toDate: this.toDate, minDate: this.minDate, autoApply: true, onDateChanged: evt => {
        this.handleDateChange(evt);
      } })), this.totalNights ? (index.h("span", { class: "iglRangeNights ml-1" }, "(", this.totalNights + (this.totalNights > 1 ? ` ${axios.locales.entries.Lcz_Nights}` : ` ${axios.locales.entries.Lcz_Night}`), ")")) : ('')))));
  }
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
    return (index.h(index.Host, null, index.h("div", { class: "d-flex flex-wrap" }, index.h("div", { class: "flex-fill text-left p-0" }, index.h("span", { class: "mr-1 font-weight-bold font-medium-1" }, utils.formatDate(this.dateRangeData.fromDateStr), " - ", utils.formatDate(this.dateRangeData.toDateStr)), this.dateRangeData.dateDifference, " ", +this.dateRangeData.dateDifference > 1 ? ` ${axios.locales.entries.Lcz_Nights}` : ` ${axios.locales.entries.Lcz_Night}`), this.guestData.length > 1 && (index.h("div", { class: "mt-1 mt-md-0 text-right" }, axios.locales.entries.Lcz_TotalPrice, " ", index.h("span", { class: "font-weight-bold font-medium-1" }, utils.getCurrencySymbol(this.currency.code) + this.bookingData.TOTAL_PRICE || '$0.00')))), this.guestData.map((roomInfo, index$1) => {
      return (index.h("igl-application-info", { dateDifference: this.dateRangeData.dateDifference, defaultGuestPreference: this.defaultGuestData.bed_preference, defaultGuestRoomId: this.defaultGuestData.PR_ID, currency: this.currency, bedPreferenceType: this.bedPreferenceType, index: index$1, selectedUnits: this.selectedUnits[`c_${roomInfo.roomCategoryId}`], guestInfo: roomInfo, guestRefKey: index$1, bookingType: this.bookingData.event_type, roomsList: roomInfo.physicalRooms, onDataUpdateEvent: event => this.handleEventData(event, 'application-info', index$1) }));
    }), this.isEditOrAddRoomEvent || this.showSplitBookingOption ? null : (index.h("igl-property-booked-by", { propertyId: this.propertyId, countryNodeList: this.countryNodeList, language: this.language, showPaymentDetails: this.showPaymentDetails, defaultData: this.bookedByInfoData, onDataUpdateEvent: event => 
      // this.dataUpdateEvent.emit({
      //   key: "propertyBookedBy",
      //   value: event.detail,
      // })
      this.handleEventData(event, 'propertyBookedBy', 0) })), this.isEditOrAddRoomEvent ? (index.h("div", { class: "d-flex p-0 mb-1 mt-2" }, index.h("div", { class: "flex-fill mr-2" }, index.h("ir-button", { icon: "", text: axios.locales.entries.Lcz_Back, class: "full-width", btn_color: "secondary", btn_styles: "justify-content-center", onClickHanlder: () => this.buttonClicked.emit({ key: 'back' }) })), index.h("div", { class: "flex-fill" }, index.h("ir-button", { isLoading: this.isLoading === 'save', onClickHanlder: () => this.buttonClicked.emit({ key: 'save' }), btn_styles: "full-width align-items-center justify-content-center", text: axios.locales.entries.Lcz_Save })))) : (index.h("div", { class: "d-flex flex-column flex-md-row p-0 mb-1 mt-2 justify-content-md-between align-items-md-center" }, index.h("div", { class: "flex-fill mr-md-1" }, index.h("button", { type: "button", class: "btn btn-secondary full-width", onClick: () => this.buttonClicked.emit({ key: 'back' }) }, index.h("span", { class: 'd-none d-md-inline-flex' }, " <<"), " ", axios.locales.entries.Lcz_Back)), index.h("div", { class: "mt-1 mt-md-0 flex-fill" }, index.h("ir-button", { isLoading: this.isLoading === 'book', btn_styles: "full-width align-items-center justify-content-center", onClickHanlder: () => this.buttonClicked.emit({ key: 'book' }), text: axios.locales.entries.Lcz_Book }))))));
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
    return (index.h(index.Host, null, index.h("div", { class: "text-left mt-3" }, index.h("div", { class: "form-group d-flex flex-column flex-md-row align-items-md-center text-left " }, index.h("label", { class: "p-0 m-0 label-control mr-1 font-weight-bold" }, axios.locales.entries.Lcz_BookedBy), index.h("div", { class: "bookedByEmailContainer mt-1 mt-md-0" }, index.h("ir-autocomplete", { danger_border: this.isButtonPressed && this.bookedByData.email === '', onComboboxValue: this.handleComboboxChange.bind(this), propertyId: this.propertyId, type: "email", value: this.bookedByData.email, required: true, placeholder: axios.locales.entries.Lcz_EmailAddress, onInputCleared: () => this.clearEvent() })))), index.h("div", { class: "bookedDetailsForm text-left mt-2 font-small-3 " }, index.h("div", { class: "d-flex flex-column flex-md-row  justify-content-md-between " }, index.h("div", { class: "p-0 flex-fill " }, index.h("div", { class: "form-group d-flex flex-column flex-md-row align-items-md-center p-0 flex-fill " }, index.h("label", { class: "p-0 m-0 margin3" }, axios.locales.entries.Lcz_FirstName), index.h("div", { class: "p-0 m-0  controlContainer flex-fill  " }, index.h("input", { class: `form-control flex-fill ${this.isButtonPressed && this.bookedByData.firstName === '' && 'border-danger'}`, type: "text", placeholder: axios.locales.entries.Lcz_FirstName, id: v4.v4(), value: this.bookedByData.firstName, onInput: event => this.handleDataChange('firstName', event), required: true }))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, axios.locales.entries.Lcz_LastName), index.h("div", { class: "p-0 m-0  controlContainer flex-fill" }, index.h("input", { class: `form-control ${this.isButtonPressed && this.bookedByData.lastName === '' && 'border-danger'}`, type: "text", placeholder: axios.locales.entries.Lcz_LastName, id: v4.v4(), value: this.bookedByData.lastName, onInput: event => this.handleDataChange('lastName', event) }))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, axios.locales.entries.Lcz_Country), index.h("div", { class: "p-0 m-0  controlContainer flex-fill" }, index.h("select", { class: `form-control input-sm pr-0 ${this.isButtonPressed && this.bookedByData.countryId === '' && 'border-danger'}`, id: v4.v4(), onChange: event => this.handleDataChange('countryId', event) }, index.h("option", { value: "", selected: this.bookedByData.countryId === '' }, axios.locales.entries.Lcz_Select), this.countryNodeList.map(countryNode => (index.h("option", { value: countryNode.id, selected: this.bookedByData.countryId === countryNode.id }, countryNode.name)))))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, axios.locales.entries.Lcz_MobilePhone), index.h("div", { class: "p-0 m-0  d-flex  controlContainer flex-fill" }, index.h("div", { class: " p-0 m-0" }, index.h("select", { class: `form-control input-sm pr-0 ${this.isButtonPressed && this.bookedByData.isdCode === '' && 'border-danger'}`, id: v4.v4(), onChange: event => this.handleDataChange('isdCode', event) }, index.h("option", { value: "", selected: this.bookedByData.isdCode === '' }, axios.locales.entries.Lcz_Isd), this.countryNodeList.map(country => (index.h("option", { value: country.id, selected: this.bookedByData.isdCode === country.id.toString() }, country.phone_prefix))))), index.h("div", { class: "flex-fill p-0 m-0" }, index.h("input", { class: `form-control ${this.isButtonPressed && this.bookedByData.contactNumber === '' && 'border-danger'}`, type: "tel", placeholder: axios.locales.entries.Lcz_ContactNumber, id: v4.v4(), value: this.bookedByData.contactNumber, onInput: event => this.handleNumberInput('contactNumber', event) })))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, axios.locales.entries.Lcz_YourArrivalTime), index.h("div", { class: "p-0 m-0  controlContainer flex-fill" }, index.h("select", { class: `form-control input-sm pr-0 ${this.isButtonPressed && this.bookedByData.selectedArrivalTime.code === '' && 'border-danger'}`, id: v4.v4(), onChange: event => this.handleDataChange('selectedArrivalTime', event) }, this.arrivalTimeList.map(time => (index.h("option", { value: time.CODE_NAME, selected: this.bookedByData.selectedArrivalTime.code === time.CODE_NAME }, time.CODE_VALUE_EN))))))), index.h("div", { class: "p-0 flex-fill  ml-md-3" }, index.h("div", { class: "  p-0 d-flex flex-column flex-md-row align-items-md-center " }, index.h("label", { class: "p-0 m-0 margin3" }, axios.locales.entries.Lcz_AnyMessageForUs), index.h("div", { class: "p-0 m-0  controlContainer flex-fill " }, index.h("textarea", { id: v4.v4(), rows: 4, class: "form-control ", name: "message", value: this.bookedByData.message, onInput: event => this.handleDataChange('message', event) }))), this.showPaymentDetails && (index.h(index.Fragment, null, index.h("div", { class: "form-group mt-md-1  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, axios.locales.entries.Lcz_CardNumber), index.h("div", { class: "p-0 m-0  controlContainer flex-fill" }, index.h("input", { class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4.v4(), value: this.bookedByData.cardNumber, onInput: event => this.handleNumberInput('cardNumber', event) }))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, axios.locales.entries.Lcz_CardHolderName), index.h("div", { class: "p-0 m-0  controlContainer flex-fill" }, index.h("input", { class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4.v4(), value: this.bookedByData.cardHolderName, onInput: event => this.handleDataChange('cardHolderName', event) }))), index.h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, index.h("label", { class: "p-0 m-0 margin3" }, axios.locales.entries.Lcz_ExpiryDate), index.h("div", { class: "p-0 m-0 row  controlContainer flex-fill" }, index.h("div", { class: "p-0 m-0" }, index.h("select", { class: "form-control input-sm pr-0", id: v4.v4(), onChange: event => this.handleDataChange('expiryMonth', event) }, this.expiryMonths.map(month => (index.h("option", { value: month, selected: month === this.bookedByData.expiryMonth }, month))))), index.h("div", { class: "p-0 m-0 ml-1" }, index.h("select", { class: "form-control input-sm pr-0", id: v4.v4(), onChange: event => this.handleDataChange('expiryYear', event) }, this.expiryYears.map((year, index$1) => (index.h("option", { value: year, selected: index$1 === this.bookedByData.expiryYear }, year))))))))), index.h("div", { class: "form-group mt-1 p-0 d-flex flex-row align-items-center" }, index.h("label", { class: "p-0 m-0", htmlFor: 'emailTheGuestId' }, axios.locales.entries.Lcz_EmailTheGuest), index.h("div", { class: "p-0 m-0  controlContainer flex-fill checkBoxContainer" }, index.h("input", { class: "form-control", type: "checkbox", checked: this.bookedByData.emailGuest, id: 'emailTheGuestId', onChange: event => this.handleDataChange('emailGuest', event) }))))))));
  }
};
IglPropertyBookedBy.style = iglPropertyBookedByCss;

const irLoadingScreenCss = ".sc-ir-loading-screen-h{display:fix;height:100vh;width:100vw;z-index:1000;top:0;left:0}.loader.sc-ir-loading-screen{width:1.25rem;height:1.25rem;border:2.5px solid #3f3f3f;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}.backdrop.sc-ir-loading-screen{height:100vh;width:100vw;background:rgba(0, 0, 0, 0.4);position:absolute;top:0;left:0}.loaderContainer.sc-ir-loading-screen{position:absolute;z-index:100001;padding:20px;top:50%;left:50%;transform:translate(-50%, -50%);background:white;display:flex;align-items:center;justify-content:center;gap:20px;border-radius:5px}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const IrLoadingScreen = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.message = '';
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "loaderContainer" }, index.h("span", { class: "loader" }))));
  }
};
IrLoadingScreen.style = irLoadingScreenCss;

exports.igl_application_info = IglApplicationInfo;
exports.igl_book_property_footer = IglBookPropertyFooter;
exports.igl_book_property_header = IglBookPropertyHeader;
exports.igl_booking_overview_page = IglBookingOverviewPage;
exports.igl_booking_room_rate_plan = IglBookingRoomRatePlan;
exports.igl_booking_rooms = IglBookingRooms;
exports.igl_date_range = IglDateRange;
exports.igl_pagetwo = IglPagetwo;
exports.igl_property_booked_by = IglPropertyBookedBy;
exports.ir_loading_screen = IrLoadingScreen;

//# sourceMappingURL=igl-application-info_10.cjs.entry.js.map