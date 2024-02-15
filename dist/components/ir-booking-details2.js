import { proxyCustomElement, HTMLElement, createEvent, h, Fragment } from '@stencil/core/internal/client';
import { h as hooks } from './moment.js';
import { _ as _formatDate, a as _formatTime } from './functions.js';
import { a as axios } from './axios.js';
import { B as BookingService } from './booking.service.js';
import { c as calendar_data } from './calendar-data.js';
import { l as locales } from './locales.store.js';
import { d as defineCustomElement$s } from './igl-application-info2.js';
import { d as defineCustomElement$r } from './igl-block-dates-view2.js';
import { d as defineCustomElement$q } from './igl-book-property2.js';
import { d as defineCustomElement$p } from './igl-book-property-footer2.js';
import { d as defineCustomElement$o } from './igl-book-property-header2.js';
import { d as defineCustomElement$n } from './igl-booking-overview-page2.js';
import { d as defineCustomElement$m } from './igl-booking-room-rate-plan2.js';
import { d as defineCustomElement$l } from './igl-booking-rooms2.js';
import { d as defineCustomElement$k } from './igl-date-range2.js';
import { d as defineCustomElement$j } from './igl-pagetwo2.js';
import { d as defineCustomElement$i } from './igl-property-booked-by2.js';
import { d as defineCustomElement$h } from './ir-autocomplete2.js';
import { d as defineCustomElement$g } from './ir-button2.js';
import { d as defineCustomElement$f } from './ir-date-picker2.js';
import { d as defineCustomElement$e } from './ir-guest-info2.js';
import { d as defineCustomElement$d } from './ir-icon2.js';
import { d as defineCustomElement$c } from './ir-input-text2.js';
import { d as defineCustomElement$b } from './ir-interceptor2.js';
import { d as defineCustomElement$a } from './ir-label2.js';
import { d as defineCustomElement$9 } from './ir-loading-screen2.js';
import { d as defineCustomElement$8 } from './ir-modal2.js';
import { d as defineCustomElement$7 } from './ir-payment-details2.js';
import { d as defineCustomElement$6 } from './ir-pickup2.js';
import { d as defineCustomElement$5 } from './ir-room2.js';
import { d as defineCustomElement$4 } from './ir-select2.js';
import { d as defineCustomElement$3 } from './ir-sidebar2.js';
import { d as defineCustomElement$2 } from './ir-toast2.js';
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
        const results = data.My_Result;
        calendar_data.adultChildConstraints = results.adult_child_constraints;
        calendar_data.allowedBookingSources = results.allowed_booking_sources;
        calendar_data.allowed_payment_methods = results.allowed_booking_methods;
        calendar_data.currency = results.currency;
        calendar_data.is_vacation_rental = results.is_vacation_rental;
        calendar_data.pickup_service = results.pickup_service;
        calendar_data.max_nights = results.max_nights;
        calendar_data.channels = results.channels;
        calendar_data.is_frontdesk_enabled = results.is_frontdesk_enabled;
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
        locales.entries = entries;
        locales.direction = data.My_Result.direction;
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

const irBookingDetailsCss = ".sc-ir-booking-details-h{overflow-x:hidden}.confirmed.sc-ir-booking-details{color:#fff;display:flex;align-items:center}.bg-ir-green.sc-ir-booking-details{background:#629a4c;height:28px;padding-top:0 !important;padding-bottom:0 !important}.h-28.sc-ir-booking-details{height:2rem}.bg-ir-red.sc-ir-booking-details{background:#ff4961;height:28px;padding-top:0 !important;padding-bottom:0 !important}.bg-ir-orange.sc-ir-booking-details{background:#ff9149;height:28px;padding-top:0 !important;padding-bottom:0 !important}.pickup-margin.sc-ir-booking-details{margin-bottom:7px !important}.header-date.sc-ir-booking-details{padding-left:5px !important}.pointer.sc-ir-booking-details{cursor:pointer}.sc-ir-booking-details:root{--sidebar-width:50rem}.sm-padding-right.sc-ir-booking-details{padding-right:0.2rem}.sm-padding-left.sc-ir-booking-details{padding-left:0.2rem}.sm-padding-top.sc-ir-booking-details{padding-top:0.2rem}.sm-padding-bottom.sc-ir-booking-details{padding-bottom:0.2rem}.info-notes.sc-ir-booking-details{list-style:none;padding-left:0}.light-blue-bg.sc-ir-booking-details{background-color:#acecff;padding:0rem 0.1rem}.iframeHeight.sc-ir-booking-details{height:17.5rem}";

const IrBookingDetails = /*@__PURE__*/ proxyCustomElement(class IrBookingDetails extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.toast = createEvent(this, "toast", 7);
    this.bookingService = new BookingService();
    this.roomService = new RoomService();
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
  _calculateNights(fromDate, toDate) {
    // calculate the difference between the two dates
    const diff = hooks(toDate).diff(hooks(fromDate), 'days');
    // return the difference
    return diff;
  }
  async updateStatus() {
    if (this.tempStatus !== '' && this.tempStatus !== null) {
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
        // await this.resetBookingData();
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
      h(Fragment, null, !this.is_from_front_desk && (h(Fragment, null, h("ir-toast", null), h("ir-interceptor", null)))),
      h("div", { class: "fluid-container p-1" }, h("div", { class: "d-flex flex-column p-0 mx-0 flex-lg-row align-items-md-center justify-content-between mt-1" }, h("div", { class: "m-0 p-0 mb-1 mb-lg-0 mt-md-0  d-flex justify-content-start align-items-end" }, h("p", { class: "font-size-large m-0 p-0" }, `${this.defaultTexts.entries.Lcz_Booking}#${this.bookingNumber}`), h("p", { class: "m-0 p-0 header-date" }, !this.bookingData.is_direct ? this.bookingData.channel_booking_nbr : '', " ", _formatDate(this.bookingData.booked_on.date), " ", _formatTime(this.bookingData.booked_on.hour.toString(), +' ' + this.bookingData.booked_on.minute.toString()))), h("div", { class: "d-flex justify-content-end align-items-center" }, h("span", { class: `confirmed btn-sm m-0 mr-2 ${confirmationBG}` }, this.bookingData.status.description), this.bookingData.allowed_actions.length > 0 && (h(Fragment, null, h("ir-select", { selectContainerStyle: "h-28", selectStyles: "d-flex align-items-center h-28", firstOption: locales.entries.Lcz_Select, id: "update-status", size: "sm", "label-available": "false", data: this.bookingData.allowed_actions.map(b => ({ text: b.description, value: b.code })), textSize: "sm", class: "sm-padding-right m-0" }), h("ir-button", { onClickHanlder: this.updateStatus.bind(this), btn_styles: "h-28", isLoading: this.isUpdateClicked, btn_disabled: this.isUpdateClicked, id: "update-status-btn", size: "sm", text: "Update" }))), this.hasReceipt && (h("ir-icon", { id: "receipt", class: "mx-1" }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", stroke: "#104064", height: "24", width: "19", viewBox: "0 0 384 512" }, h("path", { fill: "#104064", d: "M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z" })))), this.hasPrint && (h("ir-icon", { id: "print", icon: "ft-printer h1 color-ir-dark-blue-hover m-0 ml-1  pointer" }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 512 512" }, h("path", { fill: "#104064", d: "M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" })))), this.hasDelete && h("ir-icon", { id: "book-delete", icon: "ft-trash-2 h1 danger m-0 ml-1 pointer" }), this.hasMenu && h("ir-icon", { id: "menu", icon: "ft-list h1 color-ir-dark-blue-hover m-0 ml-1 pointer" })))),
      h("div", { class: "fluid-container p-1 text-left mx-0" }, h("div", { class: "row m-0" }, h("div", { class: "col-12 p-0 mx-0 pr-lg-1 col-lg-6" }, h("div", { class: "card" }, h("div", { class: "p-1" }, this.bookingData.property.name || '', h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Source}:`, value: this.bookingData.origin.Label, imageSrc: this.bookingData.origin.Icon }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_BookedBy}:`, value: `${this.bookingData.guest.first_name} ${this.bookingData.guest.last_name}`, iconShown: true }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Phone}:`, value: this.bookingData.guest.mobile }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Email}:`, value: this.bookingData.guest.email }), this.bookingData.guest.alternative_email && (h("ir-label", { label: `${this.defaultTexts.entries.Lcz_AlternativeEmail}:`, value: this.bookingData.guest.alternative_email })), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Address}:`, value: this.bookingData.guest.address }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_ArrivalTime}:`, value: this.bookingData.arrival.description }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Note}:`, value: this.bookingData.remark }))), h("p", { class: "font-size-large d-flex justify-content-between align-items-center mb-1" }, `${_formatDate(this.bookingData.from_date)} - ${_formatDate(this.bookingData.to_date)} (${this._calculateNights(this.bookingData.from_date, this.bookingData.to_date)} ${this._calculateNights(this.bookingData.from_date, this.bookingData.to_date) > 1
        ? ` ${this.defaultTexts.entries.Lcz_Nights}`
        : ` ${this.defaultTexts.entries.Lcz_Night}`})`, this.hasRoomAdd && this.bookingData.is_direct && (h("ir-icon", { id: "room-add" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512", slot: "icon" }, h("path", { fill: "#6b6f82", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" }))))), h("div", { class: "card p-0 mx-0" }, this.bookingData.rooms.map((room, index) => {
        const mealCodeName = room.rateplan.name;
        const myRoomTypeFoodCat = room.roomtype.name;
        return [
          h("ir-room", { defaultTexts: this.defaultTexts, legendData: this.calendarData.legendData, roomsInfo: this.calendarData.roomsInfo, myRoomTypeFoodCat: myRoomTypeFoodCat, mealCodeName: mealCodeName, currency: this.bookingData.currency.code, hasRoomEdit: this.hasRoomEdit && this.bookingData.is_direct, hasRoomDelete: this.hasRoomDelete && this.bookingData.is_direct, hasCheckIn: this.hasCheckIn, hasCheckOut: this.hasCheckOut, bookingEvent: this.bookingData, bookingIndex: index, ticket: this.ticket, onDeleteFinished: this.handleDeleteFinish.bind(this) }),
          // add separator if not last item with marginHorizontal and alignCenter
          index !== this.bookingData.rooms.length - 1 && h("hr", { class: "mr-2 ml-2 my-0 p-0" }),
        ];
      })), calendar_data.pickup_service.is_enabled && this.bookingData.is_direct && (h("div", { class: "mb-1" }, h("div", { class: 'd-flex w-100 mb-1 align-items-center justify-content-between' }, h("p", { class: 'font-size-large p-0 m-0 ' }, locales.entries.Lcz_Pickup), h("ir-icon", { class: "pointer ", id: "pickup" }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" })))), this.bookingData.pickup_info && (h("div", { class: 'card' }, h("div", { class: 'p-1' }, h("div", { class: 'd-flex align-items-center py-0 my-0 pickup-margin' }, h("p", { class: 'font-weight-bold mr-1 py-0 my-0' }, locales.entries.Lcz_Date, ": ", h("span", { class: 'font-weight-normal' }, hooks(this.bookingData.pickup_info.date, 'YYYY-MM-DD').format('ddd, DD MM YYYY'))), h("p", { class: 'font-weight-bold flex-fill py-0 my-0' }, locales.entries.Lcz_Time, ":", h("span", { class: 'font-weight-normal' }, " ", `${this.bookingData.pickup_info.hour}:${this.bookingData.pickup_info.minute}`)), h("p", { class: 'font-weight-bold py-0 my-0' }, locales.entries.Lcz_DueUponBooking, ":", ' ', h("span", { class: 'font-weight-normal' }, this.bookingData.pickup_info.currency.symbol, this.bookingData.pickup_info.total))), h("p", { class: 'font-weight-bold py-0 my-0' }, locales.entries.Lcz_FlightDetails, ":", h("span", { class: 'font-weight-normal' }, " ", `${this.bookingData.pickup_info.details}`)), h("p", { class: 'py-0 my-0 pickup-margin' }, `${this.bookingData.pickup_info.selected_option.vehicle.description}`), h("p", { class: 'font-weight-bold py-0 my-0 pickup-margin' }, locales.entries.Lcz_NbrOfVehicles, ":", h("span", { class: 'font-weight-normal' }, " ", `${this.bookingData.pickup_info.nbr_of_units}`)), h("p", { class: 'small py-0 my-0 pickup-margin' }, calendar_data.pickup_service.pickup_instruction.description, calendar_data.pickup_service.pickup_cancelation_prepayment.description))))))), h("div", { class: "col-12 p-0 m-0 pl-lg-1 col-lg-6" }, h("ir-payment-details", { defaultTexts: this.defaultTexts, bookingDetails: this.bookingData })))),
      h("ir-sidebar", { open: this.sidebarState !== null, side: 'right', id: "editGuestInfo", onIrSidebarToggle: e => {
          e.stopImmediatePropagation();
          e.stopPropagation();
          this.sidebarState = null;
        }, showCloseButton: false }, this.sidebarState === 'guest' && (h("ir-guest-info", { booking_nbr: this.bookingNumber, defaultTexts: this.defaultTexts, email: (_a = this.bookingData) === null || _a === void 0 ? void 0 : _a.guest.email, language: this.language, onCloseSideBar: () => (this.sidebarState = null) })), this.sidebarState === 'pickup' && (h("ir-pickup", { defaultPickupData: this.bookingData.pickup_info, bookingNumber: this.bookingData.booking_nbr, numberOfPersons: this.bookingData.occupancy.adult_nbr + this.bookingData.occupancy.children_nbr, onCloseModal: () => (this.sidebarState = null) }))),
      h(Fragment, null, this.bookingItem && (h("igl-book-property", { allowedBookingSources: this.calendarData.allowed_booking_sources, adultChildConstraints: this.calendarData.adult_child_constraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onCloseBookingWindow: () => this.handleCloseBookingWindow() }))),
    ];
  }
  get element() { return this; }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
  static get style() { return irBookingDetailsCss; }
}, [2, "ir-booking-details", {
    "language": [1],
    "ticket": [1],
    "bookingNumber": [1, "booking-number"],
    "baseurl": [1],
    "propertyid": [2],
    "is_from_front_desk": [4],
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
    "sidebarState": [32],
    "isUpdateClicked": [32]
  }, [[0, "iconClickHandler", "handleIconClick"], [0, "editSidebar", "handleEditSidebar"], [0, "selectChange", "handleSelectChange"], [0, "editInitiated", "handleEditInitiated"], [0, "resetBookingData", "handleResetBookingData"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-booking-details", "igl-application-info", "igl-block-dates-view", "igl-book-property", "igl-book-property-footer", "igl-book-property-header", "igl-booking-overview-page", "igl-booking-room-rate-plan", "igl-booking-rooms", "igl-date-range", "igl-pagetwo", "igl-property-booked-by", "ir-autocomplete", "ir-button", "ir-date-picker", "ir-guest-info", "ir-icon", "ir-input-text", "ir-interceptor", "ir-label", "ir-loading-screen", "ir-modal", "ir-payment-details", "ir-pickup", "ir-room", "ir-select", "ir-sidebar", "ir-toast", "ir-tooltip"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-booking-details":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrBookingDetails);
      }
      break;
    case "igl-application-info":
      if (!customElements.get(tagName)) {
        defineCustomElement$s();
      }
      break;
    case "igl-block-dates-view":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "igl-book-property":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "igl-book-property-footer":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "igl-book-property-header":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "igl-booking-overview-page":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "igl-booking-room-rate-plan":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "igl-booking-rooms":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "igl-date-range":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "igl-pagetwo":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "igl-property-booked-by":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "ir-autocomplete":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "ir-date-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "ir-guest-info":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "ir-input-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "ir-interceptor":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "ir-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "ir-loading-screen":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "ir-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "ir-payment-details":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "ir-pickup":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-room":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-sidebar":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-toast":
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