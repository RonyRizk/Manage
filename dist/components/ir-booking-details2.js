import { proxyCustomElement, HTMLElement, createEvent, h, Fragment } from '@stencil/core/internal/client';
import { h as hooks } from './moment.js';
import { _ as _formatDate, a as _formatTime } from './functions.js';
import { a as axios } from './axios.js';
import { B as BookingService } from './booking.service.js';
import { s as store, e as addLanguages } from './store.js';
import { d as defineCustomElement$p } from './igl-application-info2.js';
import { d as defineCustomElement$o } from './igl-block-dates-view2.js';
import { d as defineCustomElement$n } from './igl-book-property2.js';
import { d as defineCustomElement$m } from './igl-book-property-footer2.js';
import { d as defineCustomElement$l } from './igl-book-property-header2.js';
import { d as defineCustomElement$k } from './igl-booking-overview-page2.js';
import { d as defineCustomElement$j } from './igl-booking-room-rate-plan2.js';
import { d as defineCustomElement$i } from './igl-booking-rooms2.js';
import { d as defineCustomElement$h } from './igl-date-range2.js';
import { d as defineCustomElement$g } from './igl-pagetwo2.js';
import { d as defineCustomElement$f } from './igl-property-booked-by2.js';
import { d as defineCustomElement$e } from './ir-autocomplete2.js';
import { d as defineCustomElement$d } from './ir-button2.js';
import { d as defineCustomElement$c } from './ir-common2.js';
import { d as defineCustomElement$b } from './ir-date-picker2.js';
import { d as defineCustomElement$a } from './ir-guest-info2.js';
import { d as defineCustomElement$9 } from './ir-icon2.js';
import { d as defineCustomElement$8 } from './ir-input-text2.js';
import { d as defineCustomElement$7 } from './ir-label2.js';
import { d as defineCustomElement$6 } from './ir-modal2.js';
import { d as defineCustomElement$5 } from './ir-payment-details2.js';
import { d as defineCustomElement$4 } from './ir-room2.js';
import { d as defineCustomElement$3 } from './ir-select2.js';
import { d as defineCustomElement$2 } from './ir-sidebar2.js';
import { d as defineCustomElement$1 } from './ir-tooltip2.js';

class RoomService {
  async fetchData(id, language) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Property?Ticket=${token}`, { id, language });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async fetchLanguage(code) {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Language?Ticket=${token}`, { code });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        let entries = this.transformArrayToObject(data.My_Result.entries);
        store.dispatch(addLanguages({ entries, direction: data.My_Result.direction }));
        return { entries, direction: data.My_Result.direction };
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  transformArrayToObject(data) {
    let object = {};
    for (const d of data) {
      object[d.code] = d.description;
    }
    return object;
  }
}

const irBookingDetailsCss = ".confirmed{color:#fff;display:flex;align-items:center}ir-select#update-status{transform:translateY(0.5rem)}.pointer{cursor:pointer}:root{--sidebar-width:50rem}.sm-padding-right{padding-right:0.2rem}.sm-padding-left{padding-left:0.2rem}.sm-padding-top{padding-top:0.2rem}.sm-padding-bottom{padding-bottom:0.2rem}.info-notes{list-style:none;padding-left:0}.light-blue-bg{background-color:#acecff;padding:0rem 0.1rem}.iframeHeight{height:17.5rem}";

const IrBookingDetails = /*@__PURE__*/ proxyCustomElement(class IrBookingDetails extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.sendDataToServer = createEvent(this, "sendDataToServer", 7);
    this.handlePrintClick = createEvent(this, "handlePrintClick", 7);
    this.handleReceiptClick = createEvent(this, "handleReceiptClick", 7);
    this.handleDeleteClick = createEvent(this, "handleDeleteClick", 7);
    this.handleMenuClick = createEvent(this, "handleMenuClick", 7);
    this.handleRoomAdd = createEvent(this, "handleRoomAdd", 7);
    this.handleRoomEdit = createEvent(this, "handleRoomEdit", 7);
    this.handleRoomDelete = createEvent(this, "handleRoomDelete", 7);
    this.handleAddPayment = createEvent(this, "handleAddPayment", 7);
    this.bookingService = new BookingService();
    this.roomService = new RoomService();
    this.bookingDetails = null;
    this.editBookingItem = undefined;
    this.setupDataCountries = null;
    this.setupDataCountriesCode = null;
    this.languageAbreviation = '';
    this.language = '';
    this.ticket = '';
    this.bookingNumber = '';
    this.baseurl = '';
    this.dropdownStatuses = [];
    this.propertyid = undefined;
    this.paymentDetailsUrl = '';
    this.paymentExceptionMessage = '';
    this.statusCodes = [];
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
    this.isSidebarOpen = false;
  }
  componentDidLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  async ticketChanged() {
    sessionStorage.setItem('token', JSON.stringify(this.ticket));
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
      this.defaultTexts = languageTexts;
      console.log(this.defaultTexts);
      this.countryNodeList = countriesList;
      const { allowed_payment_methods: paymentMethods, currency, allowed_booking_sources, adult_child_constraints, calendar_legends } = roomResponse['My_Result'];
      this.calendarData = { currency, allowed_booking_sources, adult_child_constraints, legendData: calendar_legends };
      this.setRoomsData(roomResponse);
      // console.log(this.calendarData);
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
      case 'print':
        this.handlePrintClick.emit();
        return;
      case 'receipt':
        this.handleReceiptClick.emit();
        return;
      case 'book-delete':
        this.handleDeleteClick.emit();
        return;
      case 'menu':
        this.element.querySelector('ir-sidebar').open = true;
        this.handleMenuClick.emit();
        return;
      case 'room-add':
        this.handleRoomAdd.emit();
        return;
      case 'add-payment':
        this.handleAddPayment.emit();
        return;
    }
    const targetID = target.id;
    if (targetID.includes('roomEdit')) {
      const roomID = target.id.split('-')[1];
      this.handleRoomEdit.emit(roomID);
    }
    else if (target.id.includes('roomDelete')) {
      const roomID = target.id.split('-')[1];
      this.handleRoomDelete.emit(roomID);
    }
  }
  handleEditSidebar() {
    this.isSidebarOpen = true;
  }
  handleSelectChange(e) {
    const target = e.target;
    const targetID = target.id;
    switch (targetID) {
      case 'update-status':
        this.tempStatus = e.detail;
        break;
    }
  }
  handleClick(e) {
    const target = e.target;
    const targetID = target.id;
    switch (targetID) {
      case 'update-status-btn':
        this.updateStatus();
        break;
    }
  }
  watchDropdownStatuses(newValue, oldValue) {
    console.log('The new value of dropdownStatuses is: ', newValue);
    console.log('The old value of dropdownStatuses is: ', oldValue);
    // Make the newValue in way that can be handled by the dropdown
    try {
      const _newValue = newValue.map(item => {
        return {
          value: item.CODE_NAME,
          text: this._getBookingStatus(item.CODE_NAME, '_BOOK_STATUS'),
        };
      });
      this.statusData = _newValue;
      console.log('The new value of statusData is: ', this.statusData);
      this.rerenderFlag = !this.rerenderFlag;
    }
    catch (e) {
      console.log('Error in watchDropdownStatuses: ', e);
    }
  }
  openEditSidebar() {
    const sidebar = document.querySelector('ir-sidebar#editGuestInfo');
    sidebar.open = true;
  }
  _calculateNights(fromDate, toDate) {
    // calculate the difference between the two dates
    const diff = hooks(toDate).diff(hooks(fromDate), 'days');
    // return the difference
    return diff;
  }
  _getBookingStatus(statusCode, tableName) {
    // get the status from the statusCode and tableName and also where the language is CODE_VALUE_${language}
    const status = this.statusCodes.find((status) => status.CODE_NAME === statusCode && status.TBL_NAME === tableName);
    const value = status[`CODE_VALUE_${this.languageAbreviation}`];
    // return the status
    return value;
  }
  updateStatus() {
    const bookingDetails = this.bookingDetails;
    bookingDetails.BOOK_STATUS_CODE = this.tempStatus;
    this.bookingDetails = bookingDetails;
    this.rerenderFlag = !this.rerenderFlag;
    this.sendDataToServer.emit(this.bookingDetails);
  }
  handleEditInitiated(e) {
    //console.log(e.detail);
    this.bookingItem = e.detail;
  }
  handleCloseBookingWindow() {
    this.bookingItem = null;
  }
  handleDeleteFinish(e) {
    this.bookingData = Object.assign(Object.assign({}, this.bookingData), { rooms: this.bookingData.rooms.filter(room => room.identifier !== e.detail) });
  }
  async handleResetBookingData(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    try {
      const booking = await this.bookingService.getExposedBooking(this.bookingNumber, this.language);
      this.bookingData = Object.assign({}, booking);
    }
    catch (error) {
      console.log(error);
    }
  }
  render() {
    var _a;
    if (!this.bookingData) {
      return null;
    }
    // let confirmationBG: string = '';
    // switch (this.bookingData.status.code) {
    //   case '001':
    //     confirmationBG = 'bg-ir-orange';
    //     break;
    //   case '002':
    //     confirmationBG = 'bg-ir-green';
    //     break;
    //   case '003':
    //     confirmationBG = 'bg-ir-red';
    //     break;
    //   case '004':
    //     confirmationBG = 'bg-ir-red';
    //     break;
    // }
    return [
      h("ir-common", null),
      h("div", { class: "fluid-container pt-1 mr-2 ml-2" }, h("div", { class: "row" }, h("div", { class: "col-lg-7 col-md-12 d-flex justify-content-start align-items-end" }, h("div", { class: "font-size-large sm-padding-right" }, `${this.defaultTexts.entries.Lcz_Booking}#${this.bookingNumber}`), h("div", null, "@ ", _formatDate(this.bookingData.booked_on.date), " ", _formatTime(this.bookingData.booked_on.hour.toString(), +' ' + this.bookingData.booked_on.minute.toString()))))),
      h("div", { class: "fluid-container m-1 text-left" }, h("div", { class: "row m-0" }, h("div", { class: "col-lg-7 col-md-12 pl-0 pr-lg-1 p-0" }, h("div", { class: "card" }, h("div", { class: "p-1" }, this.bookingData.property.name || '', h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Source}:`, value: this.bookingData.origin.Label, imageSrc: this.bookingData.origin.Icon }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_BookedBy}:`, value: `${this.bookingData.guest.first_name} ${this.bookingData.guest.last_name}`, iconShown: true }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Phone}:`, value: this.bookingData.guest.mobile }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Email}:`, value: this.bookingData.guest.email }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Address}:`, value: this.bookingData.guest.address }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_ArrivalTime}:`, value: this.bookingData.arrival.description }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Note}:`, value: this.bookingData.remark }))), h("div", { class: "font-size-large d-flex justify-content-between align-items-center ml-1 mb-1" }, `${_formatDate(this.bookingData.from_date)} - ${_formatDate(this.bookingData.to_date)} (${this._calculateNights(this.bookingData.from_date, this.bookingData.to_date)} ${this._calculateNights(this.bookingData.from_date, this.bookingData.to_date) > 1
        ? ` ${this.defaultTexts.entries.Lcz_Nights}`
        : ` ${this.defaultTexts.entries.Lcz_Night}`})`, this.hasRoomAdd && h("ir-icon", { id: "room-add", icon: "ft-plus h3 color-ir-dark-blue-hover pointer" })), h("div", { class: "card" }, this.bookingData.rooms.map((room, index) => {
        const mealCodeName = room.rateplan.name;
        const myRoomTypeFoodCat = room.roomtype.name;
        return [
          h("ir-room", { defaultTexts: this.defaultTexts, legendData: this.calendarData.legendData, roomsInfo: this.calendarData.roomsInfo, myRoomTypeFoodCat: myRoomTypeFoodCat, mealCodeName: mealCodeName, currency: this.bookingData.currency.code, hasRoomEdit: this.hasRoomEdit, hasRoomDelete: this.hasRoomDelete, hasCheckIn: this.hasCheckIn, hasCheckOut: this.hasCheckOut, bookingEvent: this.bookingData, bookingIndex: index, ticket: this.ticket, onDeleteFinished: this.handleDeleteFinish.bind(this) }),
          // add separator if not last item with marginHorizontal and alignCenter
          index !== this.bookingData.rooms.length - 1 && h("hr", { class: "mr-2 ml-2 mt-1 mb-1" }),
        ];
      }))), h("div", { class: "col-lg-5 col-md-12 pr-0 pl-0 pl-md-1" }, h("ir-payment-details", { defaultTexts: this.defaultTexts, bookingDetails: this.bookingData, item: this.bookingDetails, paymentExceptionMessage: this.paymentExceptionMessage })))),
      h("ir-sidebar", { open: this.isSidebarOpen, side: 'right', id: "editGuestInfo", onIrSidebarToggle: e => {
          e.stopImmediatePropagation();
          e.stopPropagation();
          this.isSidebarOpen = false;
        } }, h("ir-guest-info", { booking_nbr: this.bookingNumber, defaultTexts: this.defaultTexts, email: (_a = this.bookingData) === null || _a === void 0 ? void 0 : _a.guest.email, setupDataCountries: this.setupDataCountries, setupDataCountriesCode: this.setupDataCountriesCode, language: this.language, onCloseSideBar: () => (this.isSidebarOpen = false) })),
      h(Fragment, null, this.bookingItem && (h("igl-book-property", { allowedBookingSources: this.calendarData.allowed_booking_sources, adultChildConstraints: this.calendarData.adultChildConstraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onCloseBookingWindow: () => this.handleCloseBookingWindow() }))),
    ];
  }
  get element() { return this; }
  static get watchers() { return {
    "ticket": ["ticketChanged"],
    "dropdownStatuses": ["watchDropdownStatuses"]
  }; }
  static get style() { return irBookingDetailsCss; }
}, [0, "ir-booking-details", {
    "bookingDetails": [1544, "booking-details"],
    "editBookingItem": [8, "edit-booking-item"],
    "setupDataCountries": [16],
    "setupDataCountriesCode": [16],
    "languageAbreviation": [1, "language-abreviation"],
    "language": [1],
    "ticket": [1],
    "bookingNumber": [1, "booking-number"],
    "baseurl": [1],
    "dropdownStatuses": [1032, "dropdown-statuses"],
    "propertyid": [2],
    "paymentDetailsUrl": [1, "payment-details-url"],
    "paymentExceptionMessage": [1, "payment-exception-message"],
    "statusCodes": [8, "status-codes"],
    "hasPrint": [4, "has-print"],
    "hasReceipt": [4, "has-receipt"],
    "hasDelete": [4, "has-delete"],
    "hasMenu": [4, "has-menu"],
    "hasRoomEdit": [4, "has-room-edit"],
    "hasRoomDelete": [4, "has-room-delete"],
    "hasRoomAdd": [4, "has-room-add"],
    "hasCheckIn": [4, "has-check-in"],
    "hasCheckOut": [4, "has-check-out"],
    "bookingItem": [32],
    "statusData": [32],
    "tempStatus": [32],
    "showPaymentDetails": [32],
    "bookingData": [32],
    "countryNodeList": [32],
    "calendarData": [32],
    "guestData": [32],
    "defaultTexts": [32],
    "rerenderFlag": [32],
    "isSidebarOpen": [32]
  }, [[0, "iconClickHandler", "handleIconClick"], [0, "editSidebar", "handleEditSidebar"], [0, "selectChange", "handleSelectChange"], [0, "clickHanlder", "handleClick"], [0, "editInitiated", "handleEditInitiated"], [0, "resetBookingData", "handleResetBookingData"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-booking-details", "igl-application-info", "igl-block-dates-view", "igl-book-property", "igl-book-property-footer", "igl-book-property-header", "igl-booking-overview-page", "igl-booking-room-rate-plan", "igl-booking-rooms", "igl-date-range", "igl-pagetwo", "igl-property-booked-by", "ir-autocomplete", "ir-button", "ir-common", "ir-date-picker", "ir-guest-info", "ir-icon", "ir-input-text", "ir-label", "ir-modal", "ir-payment-details", "ir-room", "ir-select", "ir-sidebar", "ir-tooltip"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-booking-details":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrBookingDetails);
      }
      break;
    case "igl-application-info":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "igl-block-dates-view":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "igl-book-property":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "igl-book-property-footer":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "igl-book-property-header":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "igl-booking-overview-page":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "igl-booking-room-rate-plan":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "igl-booking-rooms":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "igl-date-range":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "igl-pagetwo":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "igl-property-booked-by":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "ir-autocomplete":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "ir-common":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "ir-date-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "ir-guest-info":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "ir-input-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "ir-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "ir-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-payment-details":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-room":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-sidebar":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-tooltip":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrBookingDetails as I, RoomService as R, defineCustomElement as d };

//# sourceMappingURL=ir-booking-details2.js.map