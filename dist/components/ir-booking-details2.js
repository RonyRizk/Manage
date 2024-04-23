import { proxyCustomElement, HTMLElement, createEvent, h, Fragment } from '@stencil/core/internal/client';
import { h as hooks } from './moment.js';
import { _ as _formatDate, a as _formatTime } from './functions.js';
import { a as axios } from './axios.js';
import { B as BookingService } from './booking.service.js';
import { T as Token } from './Token.js';
import { c as calendar_data } from './calendar-data.js';
import { l as locales } from './locales.store.js';
import { d as defineCustomElement$v } from './igl-application-info2.js';
import { d as defineCustomElement$u } from './igl-block-dates-view2.js';
import { d as defineCustomElement$t } from './igl-book-property2.js';
import { d as defineCustomElement$s } from './igl-book-property-footer2.js';
import { d as defineCustomElement$r } from './igl-book-property-header2.js';
import { d as defineCustomElement$q } from './igl-booking-overview-page2.js';
import { d as defineCustomElement$p } from './igl-booking-room-rate-plan2.js';
import { d as defineCustomElement$o } from './igl-booking-rooms2.js';
import { d as defineCustomElement$n } from './igl-date-range2.js';
import { d as defineCustomElement$m } from './igl-pagetwo2.js';
import { d as defineCustomElement$l } from './igl-property-booked-by2.js';
import { d as defineCustomElement$k } from './ir-autocomplete2.js';
import { d as defineCustomElement$j } from './ir-button2.js';
import { d as defineCustomElement$i } from './ir-date-picker2.js';
import { d as defineCustomElement$h } from './ir-date-view2.js';
import { d as defineCustomElement$g } from './ir-dialog2.js';
import { d as defineCustomElement$f } from './ir-guest-info2.js';
import { d as defineCustomElement$e } from './ir-icon2.js';
import { d as defineCustomElement$d } from './ir-input-text2.js';
import { d as defineCustomElement$c } from './ir-interceptor2.js';
import { d as defineCustomElement$b } from './ir-label2.js';
import { d as defineCustomElement$a } from './ir-modal2.js';
import { d as defineCustomElement$9 } from './ir-payment-details2.js';
import { d as defineCustomElement$8 } from './ir-pickup2.js';
import { d as defineCustomElement$7 } from './ir-room2.js';
import { d as defineCustomElement$6 } from './ir-select2.js';
import { d as defineCustomElement$5 } from './ir-sidebar2.js';
import { d as defineCustomElement$4 } from './ir-title2.js';
import { d as defineCustomElement$3 } from './ir-toast2.js';
import { d as defineCustomElement$2 } from './ir-tooltip2.js';
import { d as defineCustomElement$1 } from './ota-label2.js';

class RoomService extends Token {
  async fetchData(id, language) {
    try {
      const token = this.getToken();
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
        calendar_data.roomsInfo = results.roomtypes;
        calendar_data.taxes = results.taxes;
        calendar_data.id = results.id;
        calendar_data.country = results.country;
        calendar_data.name = results.name;
        calendar_data.tax_statement = results.tax_statement;
        calendar_data.is_frontdesk_enabled = results.is_frontdesk_enabled;
        calendar_data.is_pms_enabled = results.is_pms_enabled;
        return data;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async fetchLanguage(code, sections = ['_PMS_FRONT']) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Language?Ticket=${token}`, { code, sections });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        let entries = this.transformArrayToObject(data.My_Result.entries);
        locales.entries = Object.assign(Object.assign({}, locales.entries), entries);
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

const irBookingDetailsCss = ".sc-ir-booking-details-h{overflow-x:hidden;--ir-dialog-max-width:20rem}.confirmed.sc-ir-booking-details{color:#fff;display:flex;align-items:center}.bg-ir-green.sc-ir-booking-details{background:#629a4c;height:28px;padding-top:0 !important;padding-bottom:0 !important}.h-28.sc-ir-booking-details{height:2rem}.mx-01.sc-ir-booking-details{--m:5px;margin-right:var(--m) !important;margin-left:var(--m) !important}.bg-ir-red.sc-ir-booking-details{background:#ff4961;height:28px;padding-top:0 !important;padding-bottom:0 !important}.bg-ir-orange.sc-ir-booking-details{background:#ff9149;height:28px;padding-top:0 !important;padding-bottom:0 !important}.date-margin.sc-ir-booking-details{margin-right:5px}.pickup-margin.sc-ir-booking-details{margin-bottom:7px !important}.header-date.sc-ir-booking-details{padding-left:5px !important}.pointer.sc-ir-booking-details{cursor:pointer}.sc-ir-booking-details:root{--sidebar-width:50rem}.sm-padding-right.sc-ir-booking-details{padding-right:0.2rem}.sm-padding-left.sc-ir-booking-details{padding-left:0.2rem}.sm-padding-top.sc-ir-booking-details{padding-top:0.2rem}.sm-padding-bottom.sc-ir-booking-details{padding-bottom:0.2rem}.info-notes.sc-ir-booking-details{list-style:none;padding-left:0}.light-blue-bg.sc-ir-booking-details{background-color:#acecff;padding:0rem 0.1rem}.iframeHeight.sc-ir-booking-details{height:17.5rem}.btn-outline.sc-ir-booking-details{background:transparent;border:1px solid #104064;color:#104064}.btn-outline.sc-ir-booking-details:hover,.btn-outline.sc-ir-booking-details:active{background:#104064;color:white}.dialog-title.sc-ir-booking-details{width:fit-content}.list-title.sc-ir-booking-details{margin:0;padding:0;font-size:14px;font-weight:bold;width:fit-content}.list-item.sc-ir-booking-details{margin:0;padding:0;font-size:14px;margin-left:5px;width:fit-content}.list-item.green.sc-ir-booking-details{color:#629a4c;font-weight:600}.list-item.red.sc-ir-booking-details{color:#ff4961;font-weight:600}";

const IrBookingDetails = /*@__PURE__*/ proxyCustomElement(class IrBookingDetails extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.toast = createEvent(this, "toast", 7);
    this.bookingChanged = createEvent(this, "bookingChanged", 7);
    this.closeSidebar = createEvent(this, "closeSidebar", 7);
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
    this.hasCloseButton = false;
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
    this.pms_status = undefined;
    this.isPMSLogLoading = false;
  }
  componentDidLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      calendar_data.token = this.ticket;
      this.bookingService.setToken(this.ticket);
      this.roomService.setToken(this.ticket);
      this.initializeApp();
    }
  }
  async ticketChanged() {
    calendar_data.token = this.ticket;
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
      if (!locales.entries) {
        locales.entries = languageTexts.entries;
        locales.direction = languageTexts.direction;
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
      case 'close':
        this.closeSidebar.emit(null);
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
        title: locales.entries.Lcz_SelectStatus,
        position: 'top-right',
      });
    }
  }
  async openPMSLogsDialog() {
    var _a;
    try {
      (_a = this.dialogRef) === null || _a === void 0 ? void 0 : _a.openModal();
      if (!this.pms_status) {
        this.isPMSLogLoading = true;
        this.pms_status = await this.bookingService.fetchPMSLogs(this.bookingData.booking_nbr);
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      if (this.isPMSLogLoading) {
        this.isPMSLogLoading = false;
      }
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
  renderPhoneNumber() {
    const { mobile, country_id } = this.bookingData.guest;
    if (!mobile) {
      return null;
    }
    if (this.bookingData.is_direct) {
      if (country_id) {
        const selectedCountry = this.countryNodeList.find(c => c.id === country_id);
        if (!selectedCountry) {
          throw new Error('Invalid country id');
        }
        return selectedCountry.phone_prefix + ' ' + mobile;
      }
    }
    return mobile;
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
      h("div", { class: "fluid-container p-1" }, h("div", { class: "d-flex flex-column p-0 mx-0 flex-lg-row align-items-md-center justify-content-between mt-1" }, h("div", { class: "m-0 p-0 mb-1 mb-lg-0 mt-md-0  d-flex justify-content-start align-items-center" }, h("p", { class: "font-size-large m-0 p-0" }, `${this.defaultTexts.entries.Lcz_Booking}#${this.bookingNumber}`), h("p", { class: "m-0 p-0 ml-1" }, !this.bookingData.is_direct && (h("span", { class: "mr-1 m-0" }, this.bookingData.channel_booking_nbr, " ")), h("span", { class: "date-margin" }, _formatDate(this.bookingData.booked_on.date)), _formatTime(this.bookingData.booked_on.hour.toString(), this.bookingData.booked_on.minute.toString()))), h("div", { class: "d-flex justify-content-end align-items-center" }, h("span", { class: `confirmed btn-sm m-0 mr-2 ${confirmationBG}` }, this.bookingData.status.description), this.bookingData.allowed_actions.length > 0 && (h(Fragment, null, h("ir-select", { selectContainerStyle: "h-28", selectStyles: "d-flex status-select align-items-center h-28", firstOption: locales.entries.Lcz_Select, id: "update-status", size: "sm", "label-available": "false", data: this.bookingData.allowed_actions.map(b => ({ text: b.description, value: b.code })), textSize: "sm", class: "sm-padding-right m-0 " }), h("ir-button", { onClickHanlder: this.updateStatus.bind(this), btn_styles: "h-28", isLoading: this.isUpdateClicked, btn_disabled: this.isUpdateClicked, id: "update-status-btn", size: "sm", text: "Update" }))), calendar_data.is_pms_enabled && (h("button", { type: "button", class: "btn btn-outline btn-sm ml-1", onClick: this.openPMSLogsDialog.bind(this) }, locales.entries.Lcz_pms)), this.hasReceipt && (h("ir-icon", { id: "receipt", class: "mx-1" }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", stroke: "#104064", height: "24", width: "19", viewBox: "0 0 384 512" }, h("path", { fill: "#104064", d: "M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z" })))), this.hasPrint && (h("ir-icon", { id: "print", icon: "ft-printer h1 color-ir-dark-blue-hover m-0 ml-1  pointer" }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 512 512" }, h("path", { fill: "#104064", d: "M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" })))), this.hasDelete && h("ir-icon", { id: "book-delete", icon: "ft-trash-2 h1 danger m-0 ml-1 pointer" }), this.hasMenu && (h("ir-icon", { id: "menu", class: "m-0 ml-1 pointer" }, h("svg", { slot: "icon", height: 24, width: 24, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, h("path", { fill: "#104064", d: "M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" })))), this.hasCloseButton && (h("ir-icon", { id: "close", class: "m-0 ml-2 pointer ", onIconClickHandler: () => this.closeSidebar.emit(null) }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 24, width: 24 }, h("path", { fill: "#104064", class: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" }))))))),
      h("div", { class: "fluid-container p-1 text-left mx-0" }, h("div", { class: "row m-0" }, h("div", { class: "col-12 p-0 mx-0 pr-lg-1 col-lg-6" }, h("div", { class: "card" }, h("div", { class: "p-1" }, this.bookingData.property.name || '', h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Source}:`, value: this.bookingData.origin.Label, imageSrc: this.bookingData.origin.Icon }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_BookedBy}:`, value: `${this.bookingData.guest.first_name} ${this.bookingData.guest.last_name}`, iconShown: true }), this.bookingData.guest.mobile && h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Phone}:`, value: this.renderPhoneNumber() }), h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Email}:`, value: this.bookingData.guest.email }), this.bookingData.guest.alternative_email && (h("ir-label", { label: `${this.defaultTexts.entries.Lcz_AlternativeEmail}:`, value: this.bookingData.guest.alternative_email })), this.bookingData.guest.address && h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Address}:`, value: this.bookingData.guest.address }), this.bookingData.is_direct && h("ir-label", { label: `${this.defaultTexts.entries.Lcz_ArrivalTime}:`, value: this.bookingData.arrival.description }), this.bookingData.promo_key && h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Coupon}:`, value: this.bookingData.promo_key }), this.bookingData.agent && h("ir-label", { label: `${this.defaultTexts.entries.Lcz_BookingCode}:`, value: this.bookingData.agent.name }), this.bookingData.is_in_loyalty_mode && !this.bookingData.promo_key && (h("div", { class: "d-flex align-items-center" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", height: 18, width: 18 }, h("path", { fill: "#fc6c85", d: "M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" })), h("p", { class: "m-0 p-0 ml-1" }, this.defaultTexts.entries.Lcz_LoyaltyDiscountApplied))), this.bookingData.is_direct ? (h("ir-label", { label: `${this.defaultTexts.entries.Lcz_Note}:`, value: this.bookingData.remark })) : (h("ota-label", { label: `${this.defaultTexts.entries.Lcz_Note}:`, remarks: this.bookingData.ota_notes, maxVisibleItems: (_a = this.bookingData.ota_notes) === null || _a === void 0 ? void 0 : _a.length })))), h("div", { class: "font-size-large d-flex justify-content-between align-items-center mb-1" }, h("ir-date-view", { from_date: this.bookingData.from_date, to_date: this.bookingData.to_date }), this.hasRoomAdd && this.bookingData.is_direct && (h("ir-icon", { id: "room-add" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512", slot: "icon" }, h("path", { fill: "#6b6f82", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" }))))), h("div", { class: "card p-0 mx-0" }, this.bookingData.rooms.map((room, index) => {
        const mealCodeName = room.rateplan.name;
        const myRoomTypeFoodCat = room.roomtype.name;
        return [
          h("ir-room", { defaultTexts: this.defaultTexts, legendData: this.calendarData.legendData, roomsInfo: this.calendarData.roomsInfo, myRoomTypeFoodCat: myRoomTypeFoodCat, mealCodeName: mealCodeName, currency: this.bookingData.currency.code, hasRoomEdit: this.hasRoomEdit && this.bookingData.status.code !== '003' && this.bookingData.is_direct, hasRoomDelete: this.hasRoomDelete && this.bookingData.status.code !== '003' && this.bookingData.is_direct, hasCheckIn: this.hasCheckIn, hasCheckOut: this.hasCheckOut, bookingEvent: this.bookingData, bookingIndex: index, ticket: this.ticket, onDeleteFinished: this.handleDeleteFinish.bind(this) }),
          // add separator if not last item with marginHorizontal and alignCenter
          index !== this.bookingData.rooms.length - 1 && h("hr", { class: "mr-2 ml-2 my-0 p-0" }),
        ];
      })), calendar_data.pickup_service.is_enabled && this.bookingData.is_direct && (h("div", { class: "mb-1" }, h("div", { class: 'd-flex w-100 mb-1 align-items-center justify-content-between' }, h("p", { class: 'font-size-large p-0 m-0 ' }, locales.entries.Lcz_Pickup), h("ir-icon", { class: "pointer ", id: "pickup" }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" })))), this.bookingData.pickup_info && (h("div", { class: 'card' }, h("div", { class: 'p-1' }, h("div", { class: 'd-flex align-items-center py-0 my-0 pickup-margin' }, h("p", { class: 'font-weight-bold mr-1 py-0 my-0' }, locales.entries.Lcz_Date, ": ", h("span", { class: 'font-weight-normal' }, hooks(this.bookingData.pickup_info.date, 'YYYY-MM-DD').format('MMM DD, YYYY'))), h("p", { class: 'font-weight-bold flex-fill py-0 my-0' }, locales.entries.Lcz_Time, ":", h("span", { class: 'font-weight-normal' }, " ", _formatTime(this.bookingData.pickup_info.hour.toString(), this.bookingData.pickup_info.minute.toString()))), h("p", { class: 'font-weight-bold py-0 my-0' }, locales.entries.Lcz_DueUponBooking, ":", ' ', h("span", { class: 'font-weight-normal' }, this.bookingData.pickup_info.currency.symbol, this.bookingData.pickup_info.total))), h("p", { class: 'font-weight-bold py-0 my-0' }, locales.entries.Lcz_FlightDetails, ":", h("span", { class: 'font-weight-normal' }, " ", `${this.bookingData.pickup_info.details}`)), h("p", { class: 'py-0 my-0 pickup-margin' }, `${this.bookingData.pickup_info.selected_option.vehicle.description}`), h("p", { class: 'font-weight-bold py-0 my-0 pickup-margin' }, locales.entries.Lcz_NbrOfVehicles, ":", h("span", { class: 'font-weight-normal' }, " ", `${this.bookingData.pickup_info.nbr_of_units}`)), h("p", { class: 'small py-0 my-0 pickup-margin' }, calendar_data.pickup_service.pickup_instruction.description, calendar_data.pickup_service.pickup_cancelation_prepayment.description))))))), h("div", { class: "col-12 p-0 m-0 pl-lg-1 col-lg-6" }, h("ir-payment-details", { defaultTexts: this.defaultTexts, bookingDetails: this.bookingData })))),
      h("ir-sidebar", { open: this.sidebarState !== null, side: 'right', id: "editGuestInfo", onIrSidebarToggle: e => {
          e.stopImmediatePropagation();
          e.stopPropagation();
          this.sidebarState = null;
        }, showCloseButton: false }, this.sidebarState === 'guest' && (h("ir-guest-info", { slot: "sidebar-body", booking_nbr: this.bookingNumber, defaultTexts: this.defaultTexts, email: (_b = this.bookingData) === null || _b === void 0 ? void 0 : _b.guest.email, language: this.language, onCloseSideBar: () => (this.sidebarState = null) })), this.sidebarState === 'pickup' && (h("ir-pickup", { slot: "sidebar-body", defaultPickupData: this.bookingData.pickup_info, bookingNumber: this.bookingData.booking_nbr, numberOfPersons: this.bookingData.occupancy.adult_nbr + this.bookingData.occupancy.children_nbr, onCloseModal: () => (this.sidebarState = null) }))),
      h(Fragment, null, this.bookingItem && (h("igl-book-property", { allowedBookingSources: this.calendarData.allowed_booking_sources, adultChildConstraints: this.calendarData.adult_child_constraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onCloseBookingWindow: () => this.handleCloseBookingWindow() }))),
      h(Fragment, null, h("ir-dialog", { ref: el => (this.dialogRef = el) }, h("div", { slot: "modal-body", class: "p-1" }, h("h3", { class: " text-left mb-1 dialog-title " }, locales.entries.Lcz_PMS_Logs), !this.isPMSLogLoading && (h(Fragment, null, h("div", { class: "d-flex align-items-center" }, h("p", { class: "list-title" }, locales.entries.Lcz_SentAt), ((_c = this.pms_status) === null || _c === void 0 ? void 0 : _c.sent_date) ? (h("p", { class: "list-item" }, (_d = this.pms_status) === null || _d === void 0 ? void 0 :
        _d.sent_date, " ", _formatTime((_e = this.pms_status) === null || _e === void 0 ? void 0 : _e.sent_hour.toString(), (_f = this.pms_status) === null || _f === void 0 ? void 0 : _f.sent_minute.toString()))) : (h("p", { class: `list-item ${((_g = this.pms_status) === null || _g === void 0 ? void 0 : _g.sent_date) ? 'green' : 'red'}` }, ((_h = this.pms_status) === null || _h === void 0 ? void 0 : _h.is_acknowledged) ? locales.entries.Lcz_YES : locales.entries.Lcz_NO))), h("div", { class: "d-flex align-items-center" }, h("h4", { class: "list-title" }, locales.entries.Lcz_Acknowledged), h("p", { class: `list-item ${((_j = this.pms_status) === null || _j === void 0 ? void 0 : _j.is_acknowledged) ? 'green' : 'red'}` }, ((_k = this.pms_status) === null || _k === void 0 ? void 0 : _k.is_acknowledged) ? locales.entries.Lcz_YES : locales.entries.Lcz_NO))))))),
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
    "hasCloseButton": [4, "has-close-button"],
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
    "isUpdateClicked": [32],
    "pms_status": [32],
    "isPMSLogLoading": [32]
  }, [[0, "iconClickHandler", "handleIconClick"], [0, "editSidebar", "handleEditSidebar"], [0, "selectChange", "handleSelectChange"], [0, "editInitiated", "handleEditInitiated"], [0, "resetBookingData", "handleResetBookingData"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-booking-details", "igl-application-info", "igl-block-dates-view", "igl-book-property", "igl-book-property-footer", "igl-book-property-header", "igl-booking-overview-page", "igl-booking-room-rate-plan", "igl-booking-rooms", "igl-date-range", "igl-pagetwo", "igl-property-booked-by", "ir-autocomplete", "ir-button", "ir-date-picker", "ir-date-view", "ir-dialog", "ir-guest-info", "ir-icon", "ir-input-text", "ir-interceptor", "ir-label", "ir-modal", "ir-payment-details", "ir-pickup", "ir-room", "ir-select", "ir-sidebar", "ir-title", "ir-toast", "ir-tooltip", "ota-label"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-booking-details":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrBookingDetails);
      }
      break;
    case "igl-application-info":
      if (!customElements.get(tagName)) {
        defineCustomElement$v();
      }
      break;
    case "igl-block-dates-view":
      if (!customElements.get(tagName)) {
        defineCustomElement$u();
      }
      break;
    case "igl-book-property":
      if (!customElements.get(tagName)) {
        defineCustomElement$t();
      }
      break;
    case "igl-book-property-footer":
      if (!customElements.get(tagName)) {
        defineCustomElement$s();
      }
      break;
    case "igl-book-property-header":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "igl-booking-overview-page":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "igl-booking-room-rate-plan":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "igl-booking-rooms":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "igl-date-range":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "igl-pagetwo":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "igl-property-booked-by":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "ir-autocomplete":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "ir-date-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "ir-date-view":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "ir-dialog":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "ir-guest-info":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "ir-input-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "ir-interceptor":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "ir-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "ir-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "ir-payment-details":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "ir-pickup":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "ir-room":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-sidebar":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-title":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-toast":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-tooltip":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ota-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrBookingDetails as I, RoomService as R, defineCustomElement as d };

//# sourceMappingURL=ir-booking-details2.js.map