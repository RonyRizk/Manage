import { r as registerInstance, a as createEvent, h, F as Fragment, g as getElement } from './index-1e7fb42e.js';
import { h as hooks } from './moment-7d60e5ef.js';
import { _ as _formatDate, a as _formatTime } from './functions-d7681931.js';
import { a as axios } from './index-315af25e.js';
import { B as BookingService } from './booking.service-2c8855f6.js';
import { R as RoomService } from './room.service-1ac5f740.js';
import { l as locales } from './locales.store-222d3a77.js';
import { c as calendar_data } from './calendar-data-050614f7.js';
import './utils-39c4fb98.js';
import './booking-8a72e500.js';

const irBookingDetailsCss = ":host{overflow-x:hidden}.confirmed{color:#fff;display:flex;align-items:center}.bg-ir-green{background:#629a4c;height:28px;padding-top:0 !important;padding-bottom:0 !important}.h-28{height:28px}.bg-ir-red{background:#ff4961;height:28px;padding-top:0 !important;padding-bottom:0 !important}.bg-ir-orange{background:#ff9149;height:28px;padding-top:0 !important;padding-bottom:0 !important}.pointer{cursor:pointer}:root{--sidebar-width:50rem}.sm-padding-right{padding-right:0.2rem}.sm-padding-left{padding-left:0.2rem}.sm-padding-top{padding-top:0.2rem}.sm-padding-bottom{padding-bottom:0.2rem}.info-notes{list-style:none;padding-left:0}.light-blue-bg{background-color:#acecff;padding:0rem 0.1rem}.iframeHeight{height:17.5rem}";

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
    this.toast = createEvent(this, "toast", 7);
    this.bookingService = new BookingService();
    this.roomService = new RoomService();
    this.bookingDetails = null;
    this.editBookingItem = undefined;
    this.setupDataCountries = null;
    this.show_header = true;
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
    this.sidebarState = null;
    this.isUpdateClicked = false;
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
      console.log(languageTexts);
      if (!locales.entries) {
        locales.entries = languageTexts.entries;
        locales.direction = languageTexts.direction;
      }
      this.defaultTexts = languageTexts;
      console.log(this.defaultTexts);
      this.countryNodeList = countriesList;
      const { allowed_payment_methods: paymentMethods, currency, allowed_booking_sources, adult_child_constraints, calendar_legends } = roomResponse['My_Result'];
      this.calendarData = { currency, allowed_booking_sources, adult_child_constraints, legendData: calendar_legends };
      console.log(this.calendarData);
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
        this.handleDeleteClick.emit();
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
          TITLE: `${locales.entries.Lcz_AddingUnitToBooking}# ${this.bookingData.booking_nbr}`,
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
    this.sidebarState = 'guest';
  }
  handleSelectChange(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    const target = e.target;
    this.tempStatus = target.selectedValue;
  }
  async handleClick(e) {
    const target = e.target;
    const targetID = target.id;
    switch (targetID) {
      case 'update-status-btn':
        await this.updateStatus();
        await this.resetBookingData();
        break;
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
  async updateStatus() {
    if (this.tempStatus !== 'Select' && this.tempStatus !== null) {
      try {
        this.isUpdateClicked = true;
        await axios.post(`/Change_Exposed_Booking_Status?Ticket=${this.ticket}`, {
          book_nbr: this.bookingNumber,
          status: this.tempStatus,
        });
        this.toast.emit({
          type: 'success',
          description: '',
          title: locales.entries.Lcz_StatusUpdatedSuccessfully,
          position: 'top-right',
        });
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
        title: locales.entries.Lcz_SelectStatus,
        position: 'top-right',
      });
    }
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
  async resetBookingData() {
    try {
      const booking = await this.bookingService.getExposedBooking(this.bookingNumber, this.language);
      this.bookingData = Object.assign({}, booking);
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
      h("div", { class: "fluid-container pt-1 mr-2 ml-2" }, h("div", { class: "row" }, h("div", { class: "col-lg-7 col-md-12 d-flex justify-content-start align-items-end " }, h("div", { class: "font-size-large sm-padding-right " }, `${this.defaultTexts.entries.Lcz_Booking}#${this.bookingNumber}`), h("p", { class: "m-0 p-0" }, "@ ", _formatDate(this.bookingData.booked_on.date), " ", _formatTime(this.bookingData.booked_on.hour.toString(), +' ' + this.bookingData.booked_on.minute.toString()))), h("div", { class: "col-lg-5 col-md-12 mt-1 mt-lg-0 d-flex justify-content-end align-items-center" }, h("span", { class: `confirmed btn-sm m-0 mr-2 ${confirmationBG}` }, this.bookingData.status.description), this.bookingData.allowed_actions.length > 0 && (h(Fragment, null, h("ir-select", { selectContainerStyle: "h-28", selectStyles: "d-flex align-items-center", firstOption: locales.entries.Lcz_Select, id: "update-status", size: "sm", "label-available": "false", data: this.bookingData.allowed_actions.map(b => ({ text: b.description, value: b.code })), textSize: "sm", class: "sm-padding-right m-0" }), h("ir-button", { btn_styles: "h-28", isLoading: this.isUpdateClicked, btn_disabled: this.isUpdateClicked, id: "update-status-btn", size: "sm", text: "Update" }))), this.hasReceipt && h("ir-icon", { id: "receipt", icon: "ft-file-text h1 color-ir-dark-blue-hover m-0 ml-1 pointer" }), this.hasPrint && h("ir-icon", { id: "print", icon: "ft-printer h1 color-ir-dark-blue-hover m-0 ml-1  pointer" }), this.hasDelete && h("ir-icon", { id: "book-delete", icon: "ft-trash-2 h1 danger m-0 ml-1 pointer" }), this.hasMenu && h("ir-icon", { id: "menu", icon: "ft-list h1 color-ir-dark-blue-hover m-0 ml-1 pointer" })))),
      h("div", { class: "fluid-container p-1 text-left mx-0" }, h("div", { class: "row m-0" }, h("div", { class: "col-12 p-0 mx-0 pr-lg-1 col-lg-6" }, h("div", { class: "card" }, h("div", { class: "p-1" }, this.bookingData.property.name || '', h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Source}:`, value: this.bookingData.origin.Label, imageSrc: this.bookingData.origin.Icon }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_BookedBy}:`, value: `${this.bookingData.guest.first_name} ${this.bookingData.guest.last_name}`, iconShown: true }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Phone}:`, value: this.bookingData.guest.mobile }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Email}:`, value: this.bookingData.guest.email }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Address}:`, value: this.bookingData.guest.address }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_ArrivalTime}:`, value: this.bookingData.arrival.description }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Note}:`, value: this.bookingData.remark }))), h("p", { class: "font-size-large d-flex justify-content-between align-items-center ml-1 mb-1" }, `${_formatDate(this.bookingData.from_date)} - ${_formatDate(this.bookingData.to_date)} (${this._calculateNights(this.bookingData.from_date, this.bookingData.to_date)} ${this._calculateNights(this.bookingData.from_date, this.bookingData.to_date) > 1
        ? ` ${this.defaultTexts.entries.Lcz_Nights}`
        : ` ${this.defaultTexts.entries.Lcz_Night}`})`, this.hasRoomAdd && h("ir-icon", { id: "room-add", icon: "ft-plus h3 color-ir-dark-blue-hover pointer" })), h("div", { class: "card p-0 mx-0" }, this.bookingData.rooms.map((room, index) => {
        const mealCodeName = room.rateplan.name;
        const myRoomTypeFoodCat = room.roomtype.name;
        return [
          h("ir-room", { defaultTexts: this.defaultTexts, legendData: this.calendarData.legendData, roomsInfo: this.calendarData.roomsInfo, myRoomTypeFoodCat: myRoomTypeFoodCat, mealCodeName: mealCodeName, currency: this.bookingData.currency.code, hasRoomEdit: this.hasRoomEdit, hasRoomDelete: this.hasRoomDelete, hasCheckIn: this.hasCheckIn, hasCheckOut: this.hasCheckOut, bookingEvent: this.bookingData, bookingIndex: index, ticket: this.ticket, onDeleteFinished: this.handleDeleteFinish.bind(this) }),
          // add separator if not last item with marginHorizontal and alignCenter
          index !== this.bookingData.rooms.length - 1 && h("hr", { class: "mr-2 ml-2 my-0 p-0" }),
        ];
      })), calendar_data.pickup_service.is_enabled && (h("div", { class: "mb-1" }, h("div", { class: 'd-flex w-100 mb-1 align-items-center justify-content-between' }, h("p", { class: 'font-size-large ml-1 p-0 m-0 ' }, locales.entries.Lcz_Pickup), h("ir-icon", { id: "pickup", icon: "ft-edit color-ir-dark-blue-hover h4 pointer" })), this.bookingData.pickup_info && (h("div", { class: 'card' }, h("div", { class: 'p-1' }, h("div", { class: 'd-flex align-items-center' }, h("p", { class: 'font-weight-bold mr-1' }, locales.entries.Lcz_Date, ": ", h("span", { class: 'font-weight-normal' }, hooks(this.bookingData.pickup_info.date, 'YYYY-MM-DD').format('ddd, DD MM YYYY'))), h("p", { class: 'font-weight-bold flex-fill' }, locales.entries.Lcz_Time, ":", h("span", { class: 'font-weight-normal' }, " ", `${this.bookingData.pickup_info.hour}:${this.bookingData.pickup_info.minute}`)), h("p", { class: 'font-weight-bold ' }, locales.entries.Lcz_DueUponBooking, ":", ' ', h("span", { class: 'font-weight-normal' }, this.bookingData.pickup_info.currency.symbol, this.bookingData.pickup_info.total))), h("p", { class: 'font-weight-bold ' }, locales.entries.Lcz_FlightDetails, ":", h("span", { class: 'font-weight-normal' }, " ", `${this.bookingData.pickup_info.details}`)), h("p", { class: '' }, `${this.bookingData.pickup_info.selected_option.vehicle.description}`), h("p", { class: 'font-weight-bold ' }, locales.entries.Lcz_NbrOfVehicles, ":", h("span", { class: 'font-weight-normal' }, " ", `${this.bookingData.pickup_info.nbr_of_units}`)), h("p", { class: 'small' }, calendar_data.pickup_service.pickup_instruction.description, calendar_data.pickup_service.pickup_cancelation_prepayment.description))))))), h("div", { class: "col-12 p-0 m-0 pl-lg-1 col-lg-6" }, h("ir-payment-details", { defaultTexts: this.defaultTexts, bookingDetails: this.bookingData, item: this.bookingDetails, paymentExceptionMessage: this.paymentExceptionMessage })))),
      h("ir-sidebar", { open: this.sidebarState !== null, side: 'right', id: "editGuestInfo", onIrSidebarToggle: e => {
          e.stopImmediatePropagation();
          e.stopPropagation();
          this.sidebarState = null;
        }, showCloseButton: this.sidebarState === 'pickup' ? false : true }, this.sidebarState === 'guest' && (h("ir-guest-info", { booking_nbr: this.bookingNumber, defaultTexts: this.defaultTexts, email: (_a = this.bookingData) === null || _a === void 0 ? void 0 : _a.guest.email, setupDataCountries: this.setupDataCountries, setupDataCountriesCode: this.setupDataCountriesCode, language: this.language, onCloseSideBar: () => (this.sidebarState = null) })), this.sidebarState === 'pickup' && (h("ir-pickup", { defaultPickupData: this.bookingData.pickup_info, bookingNumber: this.bookingData.booking_nbr, numberOfPersons: this.bookingData.occupancy.adult_nbr + this.bookingData.occupancy.children_nbr, onCloseModal: () => (this.sidebarState = null) }))),
      h(Fragment, null, this.bookingItem && (h("igl-book-property", { allowedBookingSources: this.calendarData.allowed_booking_sources, adultChildConstraints: this.calendarData.adult_child_constraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onCloseBookingWindow: () => this.handleCloseBookingWindow() }))),
    ];
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrBookingDetails.style = irBookingDetailsCss;

export { IrBookingDetails as ir_booking_details };

//# sourceMappingURL=ir-booking-details.entry.js.map