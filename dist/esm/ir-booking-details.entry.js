import { r as registerInstance, c as createEvent, h, g as getElement } from './index-47b77f6c.js';
import { h as hooks } from './moment-7d60e5ef.js';
import { _ as _formatDate, a as _formatTime } from './functions-d7681931.js';
import { B as BookingService, a as axios } from './booking.service-fa951f75.js';

const irBookingDetailsCss = ".confirmed{color:#fff;display:flex;align-items:center}ir-select#update-status{transform:translateY(0.5rem)}.pointer{cursor:pointer}:root{--sidebar-width:50rem}.sm-padding-right{padding-right:0.2rem}.sm-padding-left{padding-left:0.2rem}.sm-padding-top{padding-top:0.2rem}.sm-padding-bottom{padding-bottom:0.2rem}.info-notes{list-style:none;padding-left:0}.light-blue-bg{background-color:#acecff;padding:0rem 0.1rem}.iframeHeight{height:17.5rem}";

const IrBookingDetails = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    this.bookingDetails = null;
    this.setupDataCountries = null;
    this.setupDataCountriesCode = null;
    this.languageAbreviation = '';
    this.language = '';
    this.ticket = '';
    this.bookingNumber = '';
    this.baseurl = '';
    this.dropdownStatuses = [];
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
    this.statusData = [];
    this.tempStatus = null;
    this.bookingData = undefined;
    this.guestData = null;
    this.rerenderFlag = false;
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
  async initializeApp() {
    const result = await this.bookingService.getExoposedBooking(this.bookingNumber, this.language);
    this.guestData = result.guest;
    this.bookingData = result;
    this.rerenderFlag = !this.rerenderFlag;
    console.log(this.bookingData);
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
  handleSidebarToggle() {
    const sidebar = document.querySelector('ir-sidebar#editGuestInfo');
    sidebar.open = false;
  }
  handleEditSidebar() {
    this.openEditSidebar();
  }
  handleFormSubmit(e) {
    const data = e.detail;
    // handle changes in the booking details
    const bookingDetails = this.bookingDetails;
    bookingDetails.My_Guest.FIRST_NAME = data.firstName;
    bookingDetails.My_Guest.LAST_NAME = data.lastName;
    bookingDetails.My_Guest.COUNTRY_ID = data.country;
    bookingDetails.My_Guest.CITY = data.city;
    bookingDetails.My_Guest.ADDRESS = data.address;
    bookingDetails.My_Guest.MOBILE = data.mobile;
    bookingDetails.My_Guest.PHONE_PREFIX = data.prefix;
    bookingDetails.My_Guest.IS_NEWS_LETTER = data.newsletter;
    bookingDetails.My_Guest.My_User.CURRENCY = data.currency;
    bookingDetails.My_Guest.My_User.DISCLOSED_EMAIL = data.altEmail;
    bookingDetails.My_Guest.My_User.PASSWORD = data.password;
    bookingDetails.My_Guest.My_User.EMAIL = data.email;
    this.bookingDetails = bookingDetails;
    console.log('Form submitted with data: ', this.bookingDetails);
    this.rerenderFlag = !this.rerenderFlag;
    // close the sidebar
    const sidebar = document.querySelector('ir-sidebar#editGuestInfo');
    sidebar.open = false;
    this.sendDataToServer.emit(this.bookingDetails);
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
  render() {
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
      h("ir-common", null),
      h("div", { class: "fluid-container pt-1 mr-2 ml-2" }, h("div", { class: "row" }, h("div", { class: "col-lg-7 col-md-12 d-flex justify-content-start align-items-end" }, h("div", { class: "font-size-large sm-padding-right" }, `Booking#${this.bookingNumber}`), h("div", null, "@ ", _formatDate(this.bookingData.booked_on.date), " ", _formatTime(this.bookingData.booked_on.hour.toString(), +' ' + this.bookingData.booked_on.minute.toString()))), h("div", { class: "col-lg-5 col-md-12 d-flex justify-content-end align-items-center" }, h("span", { class: `confirmed btn-sm mr-2 ${confirmationBG}` }, this.bookingData.status.description), h("ir-select", { id: "update-status", size: "sm", "label-available": "false", data: this.statusData, textSize: "sm", class: "sm-padding-right" }), h("ir-button", { icon: "", id: "update-status-btn", size: "sm", text: "Update" }), this.hasReceipt && h("ir-icon", { id: "receipt", icon: "ft-file-text h1 color-ir-dark-blue-hover ml-1 pointer" }), this.hasPrint && h("ir-icon", { id: "print", icon: "ft-printer h1 color-ir-dark-blue-hover ml-1 pointer" }), this.hasDelete && h("ir-icon", { id: "book-delete", icon: "ft-trash-2 h1 danger ml-1 pointer" }), this.hasMenu && h("ir-icon", { id: "menu", icon: "ft-list h1 color-ir-dark-blue-hover ml-1 pointer" })))),
      h("div", { class: "fluid-container m-1" }, h("div", { class: "row m-0" }, h("div", { class: "col-lg-7 col-md-12 pl-0 pr-lg-1 p-0" }, h("div", { class: "card" }, h("div", { class: "p-1" }, this.bookingData.property.name || '', h("ir-label", { label: "Source:", value: this.bookingData.origin.Label, imageSrc: this.bookingData.origin.Icon }), h("ir-label", { label: "Booked by:", value: `${this.bookingData.guest.first_name} ${this.bookingData.guest.last_name}`, iconShown: true }), h("ir-label", { label: "Phone:", value: this.bookingData.guest.mobile }), h("ir-label", { label: "Email:", value: this.bookingData.guest.email }), h("ir-label", { label: "Address:", value: this.bookingData.guest.address }), h("ir-label", { label: "Arrival Time:", value: this.bookingData.arrival.description }), h("ir-label", { label: "Notes:", value: this.bookingData.remark }))), h("div", { class: "font-size-large d-flex justify-content-between align-items-center ml-1 mb-1" }, `${_formatDate(this.bookingData.from_date)} - ${_formatDate(this.bookingData.to_date)} (${this._calculateNights(this.bookingData.from_date, this.bookingData.to_date)} ${this._calculateNights(this.bookingData.from_date, this.bookingData.to_date) > 1 ? 'nights' : 'night'})`, this.hasRoomAdd && h("ir-icon", { id: "room-add", icon: "ft-plus h3 color-ir-dark-blue-hover pointer" })), h("div", { class: "card" }, this.bookingData.rooms.map((room, index) => {
        const mealCodeName = room.rateplan.name;
        const myRoomTypeFoodCat = room.roomtype.name;
        return [
          h("ir-room", { myRoomTypeFoodCat: myRoomTypeFoodCat, mealCodeName: mealCodeName, currency: this.bookingData.currency.code, hasRoomEdit: this.hasRoomEdit, hasRoomDelete: this.hasRoomDelete, hasCheckIn: this.hasCheckIn, hasCheckOut: this.hasCheckOut, item: room }),
          // add separator if not last item with marginHorizontal and alignCenter
          index !== this.bookingData.rooms.length - 1 && h("hr", { class: "mr-2 ml-2 mt-1 mb-1" }),
        ];
      }))))),
      h("ir-sidebar", { side: 'right', id: "editGuestInfo" }, h("ir-guest-info", { data: this.guestData, setupDataCountries: this.setupDataCountries, setupDataCountriesCode: this.setupDataCountriesCode })),
    ];
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"],
    "dropdownStatuses": ["watchDropdownStatuses"]
  }; }
};
IrBookingDetails.style = irBookingDetailsCss;

export { IrBookingDetails as ir_booking_details };

//# sourceMappingURL=ir-booking-details.entry.js.map