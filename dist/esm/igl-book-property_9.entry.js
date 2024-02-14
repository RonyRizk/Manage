import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, g as getElement } from './index-795d2df3.js';
import { B as BookingService, t as transformNewBLockedRooms, f as formatName } from './booking.service-bd7e6611.js';
import { d as dateToFormattedString, l as locales, m as getReleaseHoursString, q as formatDate, o as getCurrencySymbol } from './utils-f926fa09.js';
import { E as EventsService } from './events.service-58b8bb36.js';
import { B as BookingService$1 } from './booking.service-9b823e10.js';
import { _ as _formatDate, b as _formatAmount, c as _getDay } from './functions-d7681931.js';
import { h as hooks } from './moment-7d60e5ef.js';
import { a as axios } from './axios-3bd8531e.js';
import { c as calendar_data } from './calendar-data-89cc5afa.js';

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
  getRoomCategoryByRoomId(roomId, bookingData) {
    var _a;
    return (_a = bookingData.roomsInfo) === null || _a === void 0 ? void 0 : _a.find(roomCategory => {
      return roomCategory.physicalrooms.find(room => room.id === +roomId);
    });
  }
  setEditingRoomInfo(bookingData, selectedUnits) {
    const category = this.getRoomCategoryByRoomId(this.getBookingPreferenceRoomId(bookingData), bookingData);
    const room_id = `c_${category.id}`;
    const ratePlanId = `p_${bookingData.RATE_PLAN_ID}`;
    const data = {
      adultCount: bookingData.ADULTS_COUNT,
      rate: bookingData.RATE,
      rateType: bookingData.RATE_TYPE,
      ratePlanId: bookingData.RATE_PLAN_ID,
      roomCategoryId: category.id,
      roomCategoryName: category.name,
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
    registerInstance(this, hostRef);
    this.closeBookingWindow = createEvent(this, "closeBookingWindow", 7);
    this.bookingCreated = createEvent(this, "bookingCreated", 7);
    this.blockedCreated = createEvent(this, "blockedCreated", 7);
    this.resetBookingData = createEvent(this, "resetBookingData", 7);
    this.initialRoomIds = null;
    this.message = '';
    this.showSplitBookingOption = false;
    this.sourceOptions = [];
    this.guestData = [];
    this.bookedByInfoData = {};
    this.blockDatesData = {};
    this.ratePricingMode = [];
    this.selectedUnits = new Map();
    this.bedPreferenceType = [];
    this.bookingService = new BookingService();
    this.bookPropertyService = new IglBookPropertyService();
    this.eventsService = new EventsService();
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
    this.defaultDateRange = { from_date: this.bookingData.FROM_DATE, to_date: this.bookingData.TO_DATE };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    if (!this.bookingData.defaultDateRange) {
      return;
    }
    this.defaultData = this.bookingData;
    this.dateRangeData = Object.assign({}, this.defaultData.defaultDateRange);
    try {
      const setupEntries = await this.fetchSetupEntries();
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
    return await this.bookingService.fetchSetupEntries();
  }
  isGuestDataIncomplete() {
    //|| data.roomId === '' || data.roomId === 0 if the roomId is required
    if (this.guestData.length === 0) {
      return true;
    }
    for (const data of this.guestData) {
      if (data.guestName === '' || data.preference === '' || data.preference === 0) {
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
      isValidProperty(this.bookedByInfoData, 'isdCode', '') ||
      isValidProperty(this.bookedByInfoData, 'contactNumber', '') ||
      isValidProperty(this.bookedByInfoData, 'firstName', '') ||
      isValidProperty(this.bookedByInfoData, 'lastName', '') ||
      isValidProperty(this.bookedByInfoData, 'countryId', -1) ||
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
    this.ratePricingMode = res.ratePricingMode;
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
      this.message = '';
      this.message = data.tax_statement;
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
        this.message = '';
      }
      else if (this.adultChildCount.adult !== 0) {
        this.initializeBookingAvailability(dateToFormattedString(new Date(this.dateRangeData.fromDate)), dateToFormattedString(new Date(this.dateRangeData.toDate)));
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
    return (h(Fragment, null, h("igl-block-dates-view", { fromDate: this.dateRangeData.fromDateStr, toDate: this.dateRangeData.toDateStr, entryDate: this.defaultData.ENTRY_DATE, onDataUpdateEvent: event => this.handleBlockDateUpdate(event) }), h("div", { class: "p-0 mb-1 mt-2 gap-30 d-flex align-items-center justify-content-between" }, h("button", { class: "btn btn-secondary flex-fill", onClick: () => this.closeWindow() }, locales.entries.Lcz_Cancel), h("button", { class: "btn btn-primary flex-fill", onClick: () => this.handleBlockDate() }, locales.entries.Lcz_Blockdates))));
  }
  handleButtonClicked(event) {
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
        this.gotoPage('page_two');
      case 'check':
        this.initializeBookingAvailability(dateToFormattedString(new Date(this.dateRangeData.fromDate)), dateToFormattedString(new Date(this.dateRangeData.toDate)));
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
    const releaseData = getReleaseHoursString(+this.blockDatesData.RELEASE_AFTER_HOURS);
    const result = await this.bookingService.blockUnit(Object.assign({ from_date: dateToFormattedString(this.defaultData.defaultDateRange.fromDate), to_date: dateToFormattedString(this.defaultData.defaultDateRange.toDate), NOTES: this.blockDatesData.OPTIONAL_REASON || '', pr_id: this.defaultData.PR_ID.toString(), STAY_STATUS_CODE: this.blockDatesData.OUT_OF_SERVICE ? '004' : this.blockDatesData.RELEASE_AFTER_HOURS === 0 ? '002' : '003', DESCRIPTION: this.blockDatesData.RELEASE_AFTER_HOURS || '' }, releaseData));
    const blockedUnit = await transformNewBLockedRooms(result);
    this.blockedCreated.emit(blockedUnit);
    this.closeWindow();
  }
  async bookUser(check_in) {
    this.setLoadingState(check_in);
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
      if (['003', '002', '004'].includes(this.defaultData.STATUS_CODE)) {
        this.eventsService.deleteEvent(this.defaultData.POOL);
      }
      if (this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM')) {
        this.bookedByInfoData.message = this.defaultData.NOTES;
      }
      const serviceParams = await this.bookPropertyService.prepareBookUserServiceParams(this, check_in, this.sourceOption);
      await this.bookingService.bookUser(...serviceParams);
      if (this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM')) {
        this.resetBookingData.emit(null);
      }
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
    return (h(Host, null, h("div", { class: "background-overlay", onClick: () => this.closeWindow() }), h("div", { class: 'sideWindow ' + (this.getCurrentPage('page_block_date') ? 'block-date' : '') }, h("div", { class: "card position-sticky mb-0 shadow-none p-0 " }, h("div", { class: "d-flex mt-2 align-items-center justify-content-between  " }, h("h3", { class: "card-title text-left pb-1 font-medium-2 px-2 px-md-3" }, this.getCurrentPage('page_block_date') ? this.defaultData.BLOCK_DATES_TITLE : this.defaultData.TITLE), h("ir-icon", { class: "close close-icon", onIconClickHandler: () => {
        this.closeWindow();
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" }))))), h("div", { class: "px-2 px-md-3" }, this.getCurrentPage('page_one') && (h("igl-booking-overview-page", { initialRoomIds: this.initialRoomIds, defaultDaterange: this.defaultDateRange, class: 'p-0 mb-1', eventType: this.defaultData.event_type, selectedRooms: this.selectedUnits, currency: this.currency, message: this.message, showSplitBookingOption: this.showSplitBookingOption, ratePricingMode: this.ratePricingMode, dateRangeData: this.dateRangeData, bookingData: this.defaultData, adultChildCount: this.adultChildCount, bookedByInfoData: this.bookedByInfoData,
      // bookingDataDefaultDateRange={this.dateRangeData}
      adultChildConstraints: this.adultChildConstraints, onRoomsDataUpdate: evt => {
        this.onRoomDataUpdate(evt);
      }, sourceOptions: this.sourceOptions, propertyId: this.propertyid })), this.getCurrentPage('page_two') && (h("igl-pagetwo", { currency: this.currency, propertyId: this.propertyid, showPaymentDetails: this.showPaymentDetails, selectedGuestData: this.guestData, countryNodeList: this.countryNodeList, isLoading: this.isLoading, selectedRooms: this.selectedUnits, bedPreferenceType: this.bedPreferenceType, dateRangeData: this.dateRangeData, bookingData: this.defaultData, showSplitBookingOption: this.showSplitBookingOption, language: this.language, bookedByInfoData: this.bookedByInfoData, defaultGuestData: this.defaultData, isEditOrAddRoomEvent: this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM'), onDataUpdateEvent: event => this.handlePageTwoDataUpdateEvent(event) })), this.getCurrentPage('page_block_date') ? this.getPageBlockDatesView() : null))));
  }
};
IglBookProperty.style = iglBookPropertyCss;

const iglBookingOverviewPageCss = ".sc-igl-booking-overview-page-h{display:block}.sc-igl-booking-overview-page-h>*.sc-igl-booking-overview-page{margin:0;padding:auto}.scrollContent.sc-igl-booking-overview-page{height:calc(100% - 79px);overflow:auto;position:relative}";

const IglBookingOverviewPage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.roomsDataUpdate = createEvent(this, "roomsDataUpdate", 7);
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
    return (h(Host, null, h("igl-book-property-header", { bookedByInfoData: this.bookedByInfoData, defaultDaterange: this.defaultDaterange, dateRangeData: this.dateRangeData,
      // minDate={this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING') ? this.bookedByInfoData.from_date || this.bookingData.FROM_DATE : undefined}
      adultChildCount: this.adultChildCount, splitBookingId: this.showSplitBookingOption, bookingData: this.bookingData, sourceOptions: this.sourceOptions, message: this.message, bookingDataDefaultDateRange: this.bookingData.defaultDateRange, showSplitBookingOption: this.showSplitBookingOption, adultChildConstraints: this.adultChildConstraints, splitBookings: this.getSplitBookings(), propertyId: this.propertyId }), h("div", { class: " text-left" }, (_b = (_a = this.bookingData) === null || _a === void 0 ? void 0 : _a.roomsInfo) === null || _b === void 0 ? void 0 : _b.map(roomInfo => {
      return (h("igl-booking-rooms", { initialRoomIds: this.initialRoomIds, isBookDisabled: Object.keys(this.bookedByInfoData).length <= 1, key: `room-info-${roomInfo.id}`, currency: this.currency, ratePricingMode: this.ratePricingMode, dateDifference: this.dateRangeData.dateDifference, bookingType: this.bookingData.event_type, roomTypeData: roomInfo, class: "mt-2 mb-1 p-0", roomInfoId: this.selectedRooms.has(`c_${roomInfo.id}`) ? roomInfo.id : null, defaultData: this.selectedRooms.get(`c_${roomInfo.id}`), onDataUpdateEvent: evt => this.roomsDataUpdate.emit(evt.detail) }));
    })), h("igl-book-property-footer", { class: 'p-0 mb-1 mt-3', eventType: this.bookingData.event_type, disabled: this.selectedRooms.size === 0 })));
  }
};
IglBookingOverviewPage.style = iglBookingOverviewPageCss;

const iglPagetwoCss = ".sc-igl-pagetwo-h{display:block}.card-title.sc-igl-pagetwo{border-bottom:1px solid #e4e5ec}.scrollContent.sc-igl-pagetwo{height:calc(100% - 79px);overflow:auto;position:relative}.background-overlay.sc-igl-pagetwo{position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.25)}.formContainer.sc-igl-pagetwo{height:calc(100% - 79px);overflow:auto}.sideWindow.sc-igl-pagetwo{position:absolute;top:0;right:0;height:100%;background-color:#ffffff}.close.sc-igl-pagetwo{float:right;font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:0.5;padding:0;background-color:transparent;border:0;appearance:none}.close-icon.sc-igl-pagetwo{position:absolute;top:18px;right:33px;outline:none}button.sc-igl-pagetwo:not(:disabled),[type='button'].sc-igl-pagetwo:not(:disabled){cursor:pointer}.row.sc-igl-pagetwo{padding:0 0 0 15px;margin:0}";

const IglPagetwo = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataUpdateEvent = createEvent(this, "dataUpdateEvent", 7);
    this.buttonClicked = createEvent(this, "buttonClicked", 7);
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
    return (h(Host, null, h("div", { class: "d-flex flex-wrap" }, h("div", { class: "flex-fill text-left p-0" }, h("span", { class: "mr-1 font-weight-bold font-medium-1" }, formatDate(this.dateRangeData.fromDateStr), " - ", formatDate(this.dateRangeData.toDateStr)), this.dateRangeData.dateDifference, " ", +this.dateRangeData.dateDifference > 1 ? ` ${locales.entries.Lcz_Nights}` : ` ${locales.entries.Lcz_Night}`), this.guestData.length > 1 && (h("div", { class: "mt-1 mt-md-0 text-right" }, locales.entries.Lcz_TotalPrice, " ", h("span", { class: "font-weight-bold font-medium-1" }, getCurrencySymbol(this.currency.code) + this.bookingData.TOTAL_PRICE || '$0.00')))), this.guestData.map((roomInfo, index) => {
      return (h("igl-application-info", { dateDifference: this.dateRangeData.dateDifference, defaultGuestPreference: this.defaultGuestData.bed_preference, defaultGuestRoomId: this.defaultGuestData.PR_ID, currency: this.currency, bedPreferenceType: this.bedPreferenceType, index: index, selectedUnits: this.selectedUnits[`c_${roomInfo.roomCategoryId}`], guestInfo: roomInfo, guestRefKey: index, bookingType: this.bookingData.event_type, roomsList: roomInfo.physicalRooms, onDataUpdateEvent: event => this.handleEventData(event, 'application-info', index) }));
    }), this.isEditOrAddRoomEvent || this.showSplitBookingOption ? null : (h("igl-property-booked-by", { propertyId: this.propertyId, countryNodeList: this.countryNodeList, language: this.language, showPaymentDetails: this.showPaymentDetails, defaultData: this.bookedByInfoData, onDataUpdateEvent: event => 
      // this.dataUpdateEvent.emit({
      //   key: "propertyBookedBy",
      //   value: event.detail,
      // })
      this.handleEventData(event, 'propertyBookedBy', 0) })), this.isEditOrAddRoomEvent ? (h("div", { class: "d-flex p-0 mb-1 mt-2" }, h("div", { class: "flex-fill mr-2" }, h("ir-button", { icon: "", text: locales.entries.Lcz_Back, class: "full-width", btn_color: "secondary", btn_styles: "justify-content-center", onClickHanlder: () => this.buttonClicked.emit({ key: 'back' }) })), h("div", { class: "flex-fill" }, h("ir-button", { isLoading: this.isLoading === 'save', onClickHanlder: () => this.buttonClicked.emit({ key: 'save' }), btn_styles: "full-width align-items-center justify-content-center", text: locales.entries.Lcz_Save })))) : (h("div", { class: "d-flex flex-column flex-md-row p-0 mb-1 mt-2 justify-content-md-between align-items-md-center" }, h("div", { class: "flex-fill mr-md-1" }, h("button", { type: "button", class: "btn btn-secondary full-width", onClick: () => this.buttonClicked.emit({ key: 'back' }) }, h("span", { class: 'd-none d-md-inline-flex' }, " <<"), " ", locales.entries.Lcz_Back)), h("div", { class: "mt-1 mt-md-0 flex-fill" }, h("ir-button", { isLoading: this.isLoading === 'book', btn_styles: "full-width align-items-center justify-content-center", onClickHanlder: () => this.buttonClicked.emit({ key: 'book' }), text: locales.entries.Lcz_Book }))))));
  }
};
IglPagetwo.style = iglPagetwoCss;

const irGuestInfoCss = ".input-group-text.sc-ir-guest-info{min-width:10rem;text-align:left}.mobilePrefixSelect.sc-ir-guest-info{border-right-width:0;border-top-right-radius:0;border-bottom-right-radius:0}.mobilePrefixInput.sc-ir-guest-info{border-top-left-radius:0;border-bottom-left-radius:0}.check-container.sc-ir-guest-info{position:relative;cursor:pointer;font-size:14px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;align-items:center}.check-container.sc-ir-guest-info input.sc-ir-guest-info{position:relative;opacity:0;cursor:pointer;height:0;width:0}.check-container.sc-ir-guest-info .checkmark.sc-ir-guest-info{position:relative;top:0;left:0;height:20px;width:20px;border:1px solid #cacfe7;border-radius:4px;transition:all 0.3s ease}.check-container.sc-ir-guest-info input.sc-ir-guest-info:checked~.checkmark.sc-ir-guest-info{background-color:#1e9ff2;border-color:#1e9ff2}.checkmark.sc-ir-guest-info:after{content:'';position:absolute;display:none}.check-container.sc-ir-guest-info input.sc-ir-guest-info:checked~.checkmark.sc-ir-guest-info:after{display:block}.check-label.sc-ir-guest-info{margin-left:10px !important}.check-container.sc-ir-guest-info .checkmark.sc-ir-guest-info:after{left:6px;top:3px;width:6px;height:10px;border:solid white;border-width:0 2px 2px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.ir-card-header.sc-ir-guest-info{width:100%;border-bottom:1px solid #e4e5ec}.close-icon.sc-ir-guest-info{margin:0}.border-theme.sc-ir-guest-info{border:1px solid #cacfe7}";

const GuestInfo = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.closeSideBar = createEvent(this, "closeSideBar", 7);
    this.bookingService = new BookingService$1();
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
      h("div", { class: "p-0" }, h("div", { class: "position-sticky mb-1 shadow-none p-0" }, h("div", { class: "d-flex align-items-center justify-content-between ir-card-header py-1 p-0" }, h("h3", { class: "card-title text-left font-medium-2 px-1 my-0" }, this.defaultTexts.entries.Lcz_GuestDetails), h("ir-icon", { class: "close close-icon px-1", onIconClickHandler: () => {
          this.closeSideBar.emit(null);
        } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" }))))), h("div", { class: "card-content collapse show" }, h("div", { class: "card-body pt-0 px-1" }, h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_FirstName, name: "firstName", submited: this.submit, value: (_a = this.guest) === null || _a === void 0 ? void 0 : _a.first_name, required: true, onTextChange: e => this.handleInputChange('first_name', e.detail) }), h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_LastName, name: "lastName", submited: this.submit, value: (_b = this.guest) === null || _b === void 0 ? void 0 : _b.last_name, required: true, onTextChange: e => this.handleInputChange('last_name', e.detail) }), h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_Email, name: "email", submited: this.submit, value: (_c = this.guest) === null || _c === void 0 ? void 0 : _c.email, required: true, onTextChange: e => this.handleInputChange('email', e.detail) }), h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_AlternativeEmail, name: "altEmail", value: (_d = this.guest) === null || _d === void 0 ? void 0 : _d.alternative_email, onTextChange: e => this.handleInputChange('alternative_email', e.detail) }), h("ir-select", { selectContainerStyle: "mb-1", required: true, name: "country", submited: this.submit, label: this.defaultTexts.entries.Lcz_Country, selectedValue: (_f = (_e = this.guest.country_id) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : '', data: this.countries.map(item => {
          return {
            value: item.id.toString(),
            text: item.name,
          };
        }), firstOption: '...', onSelectChange: e => this.handleInputChange('country_id', e.detail) }), h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_City, name: "city", value: this.guest.city, onTextChange: e => this.handleInputChange('city', e.detail) }), h("ir-input-text", { placeholder: "", label: this.defaultTexts.entries.Lcz_Address, name: "address", value: this.guest.address, onTextChange: e => this.handleInputChange('address', e.detail) }), h("div", { class: "form-group mr-0" }, h("div", { class: "input-group row m-0 p-0" }, h("div", { class: `input-group-prepend col-3 p-0 text-dark border-none` }, h("label", { class: `input-group-text  border-theme flex-grow-1 text-dark  ` }, this.defaultTexts.entries.Lcz_MobilePhone, '*')), h("select", { class: ` form-control text-md  col-2 py-0 mobilePrefixSelect`, onInput: e => this.handleInputChange('country_id', e.target.value), required: true }, h("option", { value: null }, "..."), this.countries.map(item => (h("option", { selected: this.guest.country_id.toString() === item.id.toString(), value: item.id }, item.phone_prefix)))), h("input", { type: "text", required: true, value: this.guest.mobile, class: 'form-control flex-fill mobilePrefixInput', onInput: e => this.handleInputChange('mobile', e.target.value) }))), h("div", { class: 'p-0 m-0' }, h("label", { class: `check-container m-0 p-0` }, h("input", { class: 'm-0 p-0', type: "checkbox", name: "newsletter", checked: this.guest.subscribe_to_news_letter, onInput: e => this.handleInputChange('subscribe_to_news_letter', e.target.checked) }), h("span", { class: "checkmark m-0 p-0" }), h("span", { class: 'm-0 p-0  check-label' }, this.defaultTexts.entries.Lcz_Newsletter))), h("hr", null), h("ir-button", { isLoading: this.isLoading, btn_disabled: this.isLoading, btn_styles: "d-flex align-items-center justify-content-center", text: this.defaultTexts.entries.Lcz_Save, onClickHanlder: this.editGuest.bind(this), color: "btn-primary" })))),
    ];
  }
};
GuestInfo.style = irGuestInfoCss;

const irLabelCss = "*.sc-ir-label{margin:0;padding:0}.sc-ir-label-h{display:flex;margin-bottom:5px}.icon.sc-ir-label{margin-left:3px;padding:0;margin-top:0;display:flex;align-items:center}p.sc-ir-label{margin:0 3px;padding:0}.icon-container.sc-ir-label{margin:0;padding:0}svg.sc-ir-label{margin:0;padding:0}";

const IrLabel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.editSidebar = createEvent(this, "editSidebar", 7);
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
    return (h(Host, null, h("strong", null, this.label), this.imageSrc && h("img", { src: this.imageSrc }), h("p", null, this.value), this.iconShown && (h("div", { class: "icon-container" }, h("ir-icon", { class: "pointer icon", id: "pickup", onIconClickHandler: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.openEditSidebar();
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "15", width: "15", viewBox: "0 0 512 550" }, h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" })))))));
  }
};
IrLabel.style = irLabelCss;

class PaymentService {
  async AddPayment(payment, book_nbr) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.post(`/Do_Payment?Ticket=${token}`, { payment: Object.assign(Object.assign({}, payment), { book_nbr }) });
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
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.post(`/Cancel_Payment?Ticket=${token}`, { id });
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

const irPaymentDetailsCss = ".sm-margin-right.sc-ir-payment-details{margin-right:5px !important;background:#000}.action_icons.sc-ir-payment-details{width:60px}.w-60.sc-ir-payment-details{width:100px;padding:0 5px}.payments-height.sc-ir-payment-details{height:30px}.payment_date.sc-ir-payment-details{width:100px}.iframeHeight.sc-ir-payment-details{height:max-content;height:22.5rem}.designation.sc-ir-payment-details{width:120px}";

const IrPaymentDetails = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.resetBookingData = createEvent(this, "resetBookingData", 7);
    this.toast = createEvent(this, "toast", 7);
    this.paymentService = new PaymentService();
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
      date: hooks().format('YYYY-MM-DD'),
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
          title: '',
          description: 'Select an amount',
          position: 'top-right',
        });
        return;
      }
      // await this.paymentService.AddPayment(this.itemToBeAdded, this.bookingDetails.booking_nbr);
      // this.initializeItemToBeAdded();
      // this.resetBookingData.emit(null);
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
    return (h(Fragment, null, h("tr", null, h("td", { class: 'border payments-height border-light border-bottom-0 text-center' }, rowMode === 'normal' ? (h("span", { class: "sm-padding-left" }, _formatDate(item.date))) : (h("ir-date-picker", { minDate: hooks().add(-2, 'months').startOf('month').format('YYYY-MM-DD'), singleDatePicker: true, autoApply: true, onDateChanged: this.handleDateChange.bind(this) }))), h("td", { class: 'border payments-height border-light border-bottom-0 text-center ' }, rowMode === 'normal' ? (h("span", { class: "sm-padding-right" }, "$", Number(item.amount).toFixed(2))) : (h("input", { class: "border-0  form-control py-0 m-0 w-100", value: this.itemToBeAdded.amount === null ? '' : Number(this.itemToBeAdded.amount).toFixed(2), onInput: event => this.handlePaymentInputChange('amount', +event.target.value, event), type: "text" }))), h("td", { class: 'border payments-height border-light border-bottom-0 text-center' }, rowMode === 'normal' ? (h("span", { class: "sm-padding-left" }, item.designation)) : (h("input", { class: "border-0 w-100 form-control py-0 m-0", onInput: event => this.handlePaymentInputChange('designation', event.target.value), type: "text" }))), h("td", { rowSpan: 2, class: 'border payments-height border-light border-bottom-0 text-center' }, h("ir-icon", { icon: "ft-save color-ir-light-blue-hover h5 pointer sm-margin-right", onClick: rowMode === 'add'
        ? () => {
          this._handleSave();
        }
        : () => { } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "14.25", viewBox: "0 0 448 512" }, h("path", { fill: "#6b6f82", d: "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" }))), h("span", null, " \u00A0"), h("ir-icon", { icon: "ft-trash-2 danger h5 pointer", onClick: rowMode === 'add'
        ? () => {
          this.newTableRow = false;
          this.initializeItemToBeAdded();
        }
        : () => {
          this.toBeDeletedItem = item;
          const modal = document.querySelector('.delete-record-modal');
          modal.openModal();
        } }, h("svg", { slot: "icon", fill: "#ff2441", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "14.25", viewBox: "0 0 448 512" }, h("path", { d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" }))))), h("tr", null, h("td", { colSpan: 3, class: 'border border-light payments-height border-bottom-0 text-center' }, rowMode === 'normal' ? (h("span", { class: "sm-padding-left " }, item.reference)) : (h("input", { class: "border-0 w-100  form-control py-0 m-0", onKeyPress: event => {
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
    return (h("div", null, h("div", { class: "d-flex align-items-center" }, h("strong", { class: "mr-1" }, this.defaultTexts.entries.Lcz_BookingGuarantee), h("ir-icon", { id: "drawer-icon", "data-toggle": "collapse", "data-target": `.guarrantee`, "aria-expanded": "false", "aria-controls": "myCollapse", class: "sm-padding-right pointer", onClick: async () => {
        if (!this.bookingDetails.is_direct && this.bookingDetails.channel_booking_nbr) {
          this.paymentDetailsUrl = await new BookingService$1().getPCICardInfoURL(this.bookingDetails.booking_nbr);
        }
        this.collapsedGuarantee = !this.collapsedGuarantee;
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "22.5", viewBox: "0 0 576 512" }, h("path", { fill: "#104064", d: "M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" })))), h("div", { class: "collapse guarrantee " }, this.bookingDetails.is_direct ? ([
      h("div", null, ((_b = (_a = this.bookingDetails) === null || _a === void 0 ? void 0 : _a.guest) === null || _b === void 0 ? void 0 : _b.cci) && 'Card:', " ", h("span", null, ((_e = (_d = (_c = this.bookingDetails) === null || _c === void 0 ? void 0 : _c.guest) === null || _d === void 0 ? void 0 : _d.cci) === null || _e === void 0 ? void 0 : _e.nbr) || ''), " ", ((_h = (_g = (_f = this.bookingDetails) === null || _f === void 0 ? void 0 : _f.guest) === null || _g === void 0 ? void 0 : _g.cci) === null || _h === void 0 ? void 0 : _h.expiry_month) && 'Expiry: ', h("span", null, ' ', ((_l = (_k = (_j = this.bookingDetails) === null || _j === void 0 ? void 0 : _j.guest) === null || _k === void 0 ? void 0 : _k.cci) === null || _l === void 0 ? void 0 : _l.expiry_month) || '', " ", ((_p = (_o = (_m = this.bookingDetails) === null || _m === void 0 ? void 0 : _m.guest) === null || _o === void 0 ? void 0 : _o.cci) === null || _p === void 0 ? void 0 : _p.expiry_year) && '/' + ((_s = (_r = (_q = this.bookingDetails) === null || _q === void 0 ? void 0 : _q.guest) === null || _r === void 0 ? void 0 : _r.cci) === null || _s === void 0 ? void 0 : _s.expiry_year))),
      h("div", null, ((_u = (_t = this.bookingDetails) === null || _t === void 0 ? void 0 : _t.guest) === null || _u === void 0 ? void 0 : _u.cci.holder_name) && 'Name:', " ", h("span", null, ((_x = (_w = (_v = this.bookingDetails) === null || _v === void 0 ? void 0 : _v.guest) === null || _w === void 0 ? void 0 : _w.cci) === null || _x === void 0 ? void 0 : _x.holder_name) || ''), ' ', ((_0 = (_z = (_y = this.bookingDetails) === null || _y === void 0 ? void 0 : _y.guest) === null || _z === void 0 ? void 0 : _z.cci) === null || _0 === void 0 ? void 0 : _0.cvc) && '- CVC:', " ", h("span", null, " ", ((_3 = (_2 = (_1 = this.bookingDetails) === null || _1 === void 0 ? void 0 : _1.guest) === null || _2 === void 0 ? void 0 : _2.cci) === null || _3 === void 0 ? void 0 : _3.cvc) || '')),
    ]) : this.paymentDetailsUrl ? (h("iframe", { src: this.paymentDetailsUrl, width: "100%", class: "iframeHeight", frameborder: "0", name: "payment" })) : (h("div", { class: "text-center" }, this.paymentExceptionMessage)))));
  }
  _renderDueDate(item) {
    return (h("tr", null, h("td", { class: 'pr-1' }, _formatDate(item.date)), h("td", { class: 'pr-1' }, _formatAmount(item.amount, this.bookingDetails.currency.code)), h("td", { class: 'pr-1' }, item.description), h("td", { class: "collapse font-size-small roomName" }, item.room)));
  }
  render() {
    var _a, _b, _c, _d;
    if (!this.bookingDetails.financial) {
      return null;
    }
    return [
      h("div", { class: "card m-0" }, h("div", { class: "p-1" }, h("div", { class: "mb-2 h4" }, this.defaultTexts.entries.Lcz_DueBalance, ":", ' ', h("span", { class: "danger font-weight-bold" }, _formatAmount(this.bookingDetails.financial.due_amount, this.bookingDetails.currency.code))), this.bookingGuarantee(), h("div", { class: "mt-2" }, h("div", null, ((_b = (_a = this.bookingDetails.financial) === null || _a === void 0 ? void 0 : _a.due_dates) === null || _b === void 0 ? void 0 : _b.length) > 0 && (h(Fragment, null, h("div", { class: "d-flex align-items-center" }, h("strong", { class: "mr-1" }, this.defaultTexts.entries.Lcz_PaymentDueDates), h("ir-icon", { id: "drawer-icon", "data-toggle": "collapse", "data-target": `.roomName`, "aria-expanded": "false", "aria-controls": "myCollapse", class: "sm-padding-right pointer", onClick: () => {
          this.collapsedPayment = !this.collapsedPayment;
        } }, !this.collapsedPayment ? (h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "22.5", viewBox: "0 0 576 512" }, h("path", { fill: "#104064", d: "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" }))) : (h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "25", viewBox: "0 0 640 512", slot: "icon" }, h("path", { fill: "#104064", d: "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" }))))), h("table", null, (_c = this.bookingDetails.financial.due_dates) === null || _c === void 0 ? void 0 : _c.map(item => this._renderDueDate(item))))))), h("div", { class: "mt-2 d-flex  flex-column rounded payment-container" }, h("strong", null, this.defaultTexts.entries.Lcz_Payments), h("table", { class: "mt-1" }, h("thead", null, h("tr", null, h("th", { class: 'border border-light border-bottom-0 text-center payment_date' }, this.defaultTexts.entries.Lcz_Dates), h("th", { class: 'border border-light border-bottom-0 text-center w-60' }, this.defaultTexts.entries.Lcz_Amount), h("th", { class: 'border border-light border-bottom-0 text-center designation' }, this.defaultTexts.entries.Lcz_Designation), h("th", { class: 'border border-light border-bottom-0 text-center action_icons' }, h("span", { class: 'sr-only' }, "payment actions"), h("ir-icon", { id: "add-payment", icon: "font-weight-bold p-0", onClick: () => {
          this.newTableRow = true;
        } }, h("svg", { height: 14, width: 14, slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" }, h("path", { d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" })))))), h("tbody", null, (_d = this.bookingDetails.financial.payments) === null || _d === void 0 ? void 0 :
        _d.map((item) => this._renderTableRow(item)), this.newTableRow ? this._renderTableRow(null, 'add') : null))))),
      h("ir-modal", { item: this.toBeDeletedItem, class: 'delete-record-modal', modalTitle: this.defaultTexts.entries.Lcz_Confirmation, modalBody: "If deleted it will be permnantly lost!", iconAvailable: true, icon: "ft-alert-triangle danger h1", leftBtnText: this.defaultTexts.entries.Lcz_Cancel, rightBtnText: this.defaultTexts.entries.Lcz_Delete, leftBtnColor: "secondary", rightBtnColor: "danger", onConfirmModal: this.handleConfirmModal.bind(this) }),
    ];
  }
  static get watchers() { return {
    "bookingDetails": ["handleBookingDetails"]
  }; }
};
IrPaymentDetails.style = irPaymentDetailsCss;

class PickupService {
  constructor() {
    this.token = JSON.parse(sessionStorage.getItem('token'));
  }
  async savePickup(params, booking_nbr, is_remove) {
    try {
      const splitTime = params.arrival_time.split(':');
      await axios.post(`/Do_Pickup?Ticket=${this.token}`, {
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
    return {
      arrival_date: data.date,
      arrival_time: data.hour + ':' + data.minute,
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
    calendar_data.pickup_service.allowed_options.forEach(option => {
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
    const getCodeDescription = calendar_data.pickup_service.allowed_pricing_models.find(model => model.code === code);
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

const irPickupCss = ".sc-ir-pickup-h{display:block}.card-title.sc-ir-pickup{border-bottom:1px solid #e4e5ec;width:100%}.border-theme.sc-ir-pickup{border:1px solid #cacfe7}";

const IrPickup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.closeModal = createEvent(this, "closeModal", 7);
    this.resetBookingData = createEvent(this, "resetBookingData", 7);
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
      arrival_date: hooks().format('YYYY-MM-DD'),
      selected_option: undefined,
    };
    this.vehicleCapacity = [];
    this.cause = null;
  }
  componentWillLoad() {
    if (this.defaultPickupData) {
      const transformedData = this.pickupService.transformDefaultPickupData(this.defaultPickupData);
      this.vehicleCapacity = this.pickupService.getNumberOfVehicles(transformedData.selected_option.vehicle.capacity, this.numberOfPersons);
      this.allowedOptionsByLocation = calendar_data.pickup_service.allowed_options.filter(option => option.location.id === transformedData.location);
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
      this.allowedOptionsByLocation = calendar_data.pickup_service.allowed_options.filter(option => option.location.id.toString() === value);
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
    if (input) {
      Inputmask('Hh:mm', {
        placeholder: 'HH:mm',
        definitions: {
          H: {
            validator: '[0-1]',
          },
          h: {
            validator: '[0-9]',
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
        oncleared: function () {
          this.updatePickupData('arrival_time', '');
        },
        onincomplete: function () {
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
  handleVehicleTypeChange(e) {
    if (e.detail === '') {
      this.pickupData = Object.assign(Object.assign({}, this.pickupData), { due_upon_booking: '', vehicle_type_code: '' });
      return;
    }
    let locationChoice = calendar_data.pickup_service.allowed_options.find(option => option.location.id === +this.pickupData.location && option.vehicle.code === e.detail);
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
    return (h(Host, { class: 'p-0' }, h("div", { class: "position-sticky mb-0 shadow-none p-0" }, h("div", { class: "d-flex mt-2 align-items-center justify-content-between" }, h("h3", { class: "card-title text-left pb-1 font-medium-2 px-1" }, locales.entries.Lcz_Pickup))), h("section", { class: 'px-1' }, h("ir-select", { selectedValue: this.pickupData.location, selectContainerStyle: "mb-1", onSelectChange: this.handleLocationChange.bind(this), firstOption: locales.entries.Lcz_Pickup_NoThankYou, class: 'm-0 mb-1', LabelAvailable: false, data: this.pickupService.getAvailableLocations(locales.entries.Lcz_Pickup_YesFrom) }), this.pickupData.location > 0 && (h(Fragment, null, h("div", { class: 'd-flex' }, h("div", { class: "form-group  mr-1" }, h("div", { class: "input-group row m-0" }, h("div", { class: `input-group-prepend col-5 p-0 text-dark border-0` }, h("label", { class: `input-group-text  flex-grow-1 text-dark border-theme ` }, locales.entries.Lcz_ArrivalDate)), h("div", { class: "form-control form-control-md col-7 d-flex align-items-center pl-0" }, h("ir-date-picker", { minDate: hooks().format('YYYY-MM-DD'), autoApply: true, format: "ddd, DD M YYYY", singleDatePicker: true, onDateChanged: evt => {
        this.updatePickupData('arrival_date', evt.detail.start.format('YYYY-MM-DD'));
      } })))), h("div", { class: "form-group" }, h("div", { class: "input-group  row m-0" }, h("div", { class: `input-group-prepend col-4 col-sm-3 p-0 text-dark border-0` }, h("label", { htmlFor: "pickup", class: `input-group-text flex-grow-1 text-dark border-theme` }, locales.entries.Lcz_Time)), h("input", { value: this.pickupData.arrival_time, type: "text", id: "pickup-time", class: `form-control col-8 col-sm-4 ${this.cause === 'arrival_time' && 'border-danger'}` })))), h("ir-input-text", { value: this.pickupData.flight_details, label: locales.entries.Lcz_FlightDetails, onTextChange: e => this.updatePickupData('flight_details', e.detail), placeholder: "", inputStyles: this.cause === 'flight_details' ? 'border-danger' : '' }), h("ir-select", { selectContainerStyle: "mb-1", selectStyles: this.cause === 'vehicle_type_code' ? 'border-danger' : '', onSelectChange: this.handleVehicleTypeChange.bind(this), firstOption: locales.entries.Lcz_Select, selectedValue: this.pickupData.vehicle_type_code, class: 'm-0', LabelAvailable: false, data: this.allowedOptionsByLocation.map(option => ({
        text: option.vehicle.description,
        value: option.vehicle.code,
      })) }), h("div", { class: 'd-flex flex-column flex-md-row' }, h("ir-select", { labelBorder: "theme", selectContainerStyle: "mb-1", onSelectChange: this.handleVehicleQuantityChange.bind(this), selectStyles: this.cause === 'number_of_vehicles' ? 'border-danger' : '', selectedValue: this.pickupData.number_of_vehicles, labelWidth: 7, class: 'm-0  mb-md-0 mr-md-1 flex-fill', label: locales.entries.Lcz_NbrOfVehicles, data: this.vehicleCapacity.map(i => ({
        text: i,
        value: i,
      })) }), h("ir-input-text", { labelBorder: "theme", readonly: true, value: this.pickupData.due_upon_booking, labelWidth: 7, label: `${locales.entries.Lcz_DueUponBooking}  ${this.pickupData.currency.symbol}`, placeholder: "", class: "" })))), h("div", { class: 'd-flex flex-column flex-sm-row mt-3' }, h("ir-button", { onClick: () => this.closeModal.emit(null), btn_styles: "justify-content-center", class: `mb-1 mb-sm-0 flex-fill  ${this.defaultPickupData || this.pickupData.location !== -1 ? 'mr-sm-1' : ''}`, icon: "", text: locales.entries.Lcz_Cancel, btn_color: "secondary" }), (this.defaultPickupData || this.pickupData.location !== -1) && (h("ir-button", { btn_styles: "justify-content-center align-items-center", class: 'm-0 flex-fill text-center', icon: "", isLoading: this.isLoading, text: locales.entries.Lcz_Save, btn_color: "primary", onClick: this.savePickup.bind(this) }))))));
  }
  get el() { return getElement(this); }
};
IrPickup.style = irPickupCss;

const irRoomCss = ".light-blue-bg.sc-ir-room{background:#acecff;padding:0.2rem 0.3rem;border-radius:5px}";

const IrRoom = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.deleteFinished = createEvent(this, "deleteFinished", 7);
    this.pressCheckIn = createEvent(this, "pressCheckIn", 7);
    this.pressCheckOut = createEvent(this, "pressCheckOut", 7);
    this.editInitiated = createEvent(this, "editInitiated", 7);
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
      } }, !this.collapsed ? (
    // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#104064" height={20} width={20} slot="icon">
    //   <path
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //     d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    //   />
    //   <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    // </svg>
    h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "22.5", viewBox: "0 0 576 512" }, h("path", { fill: "#104064", d: "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" }))) : (
    // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#104064" height={20} width={20} slot="icon">
    //   <path
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //     d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
    //   />
    // </svg>
    h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "25", viewBox: "0 0 640 512", slot: "icon" }, h("path", { fill: "#104064", d: "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" })))), h("div", { class: "w-100 m-0" }, h("div", { class: "d-flex align-items-end justify-content-between" }, h("div", null, h("strong", null, this.myRoomTypeFoodCat || '', " "), " ", this.mealCodeName, " ", this.item.rateplan.is_non_refundable && ` - ${this.defaultTexts.entries.Lcz_NonRefundable}`, ' '), h("div", { class: "d-flex" }, h("p", { class: "mr-1 p-0 m-0 " }, _formatAmount(this.item.total, this.currency)), this.hasRoomEdit && (h("ir-icon", { id: `roomEdit-${this.item.identifier}`, class: "pointer mr-1", onClick: this.handleEditClick.bind(this) }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16", viewBox: "0 0 512 512" }, h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" })))), this.hasRoomDelete && (h("ir-icon", { onClick: this.handleDeleteClick.bind(this), id: `roomDelete-${this.item.identifier}`, class: "pointer mr-1" }, h("svg", { slot: "icon", fill: "#ff2441", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "14.25", viewBox: "0 0 448 512" }, h("path", { d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })))))), h("div", null, h("span", { class: "mr-1" }, `${this.item.guest.first_name || ''} ${this.item.guest.last_name || ''}`), this.item.rateplan.selected_variation.adult_nbr > 0 && h("span", null, " ", this.item.rateplan.selected_variation.adult_child_offering)), h("div", { class: "d-flex align-items-center" }, h("span", { class: " mr-1" }, _formatDate(this.item.from_date), " - ", _formatDate(this.item.to_date)), this.item.unit && h("span", { class: "light-blue-bg mr-2 " }, this.item.unit.name), this.hasCheckIn && h("ir-button", { id: "checkin", icon: "", class: "mr-1", btn_color: "info", size: "sm", text: "Check in" }), this.hasCheckOut && h("ir-button", { id: "checkout", icon: "", btn_color: "info", size: "sm", text: "Check out" })), h("div", { class: "collapse", id: `roomCollapse-${this.item.identifier.split(' ').join('')}` }, h("div", { class: "d-flex" }, h("div", { class: " sm-padding-top" }, h("strong", { class: "sm-padding-right" }, `${this.defaultTexts.entries.Lcz_Breakdown}:`)), h("div", { class: 'flex-fill' }, h("table", null, this.item.days.length > 0 &&
      this.item.days.map(item => (h("tr", null, h("td", { class: 'pr-2' }, _getDay(item.date)), " ", h("td", null, _formatAmount(item.amount, this.currency)))))))), h("div", { innerHTML: this.item.rateplan.cancelation || '' }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_MealPlan}:`, value: this.mealCodeName }))), h("ir-modal", { onConfirmModal: this.deleteRoom.bind(this), iconAvailable: true, icon: "ft-alert-triangle danger h1", leftBtnText: this.defaultTexts.entries.Lcz_Cancel, rightBtnText: this.defaultTexts.entries.Lcz_Delete, leftBtnColor: "secondary", rightBtnColor: "danger", modalTitle: this.defaultTexts.entries.Lcz_Confirmation, modalBody: `${this.defaultTexts.entries['Lcz_AreYouSureDoYouWantToRemove ']} ${this.item.roomtype.name} ${this.item.unit && this.item.unit.name} ${this.defaultTexts.entries.Lcz_FromThisBooking}` })));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "bookingEvent": ["handleBookingEventChange"]
  }; }
};
IrRoom.style = irRoomCss;

const irSidebarCss = ".backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;cursor:pointer;background:rgba(0, 0, 0, 0.5);z-index:99;transition:all 0.5s;opacity:0;pointer-events:none;transition:all 0.5s}.backdrop.active{opacity:1;pointer-events:all}.sidebar-right{position:fixed;top:0;right:-100%;bottom:0;width:var(--sidebar-width, 40rem);max-width:100%;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);transition:all 0.5s;z-index:100;overflow-y:hidden;color:var(--sidebar-color, #000);background-color:var(--sidebar-backgound, #fff);padding:0.5rem}.sidebar-right.active{right:0;overflow-y:auto}.sidebar-left{position:fixed;top:0;left:-100%;bottom:0;width:var(--sidebar-width, 30rem);max-width:100%;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);transition:all 0.5s;z-index:200;overflow-y:hidden;color:var(--sidebar-color, #000);background:var(--sidebar-backgound, #fff);padding:0.5rem}.sidebar-left.active{left:0;overflow-y:scroll}.close{position:absolute;top:0.5rem;right:1rem;width:1rem;height:1rem;cursor:pointer}";

const IrSidebar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.irSidebarToggle = createEvent(this, "irSidebarToggle", 7);
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
      h("div", { class: `backdrop ${className}`, onClick: () => {
          this.toggleSidebar();
        } }),
      h("div", { ref: el => (this.sidebarRef = el), class: `sidebar-${this.side} ${className}` }, this.showCloseButton && (h("ir-icon", { class: "close", onIconClickHandler: () => {
          this.toggleSidebar();
        } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, h("path", { fill: "#6b6f82", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), h("slot", null)),
    ];
  }
  static get watchers() { return {
    "sidebarStyles": ["handleSidebarStylesChange"]
  }; }
};
IrSidebar.style = irSidebarCss;

export { IglBookProperty as igl_book_property, IglBookingOverviewPage as igl_booking_overview_page, IglPagetwo as igl_pagetwo, GuestInfo as ir_guest_info, IrLabel as ir_label, IrPaymentDetails as ir_payment_details, IrPickup as ir_pickup, IrRoom as ir_room, IrSidebar as ir_sidebar };

//# sourceMappingURL=igl-book-property_9.entry.js.map