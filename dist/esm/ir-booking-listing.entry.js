import { r as registerInstance, h, H as Host, g as getElement } from './index-2fc15efd.js';
import { B as BookingListingService, b as booking_listing, o as onBookingListingChange, u as updateUserSelection } from './booking_listing.service-2fca2135.js';
import { R as RoomService } from './room.service-53e484d3.js';
import { l as locales } from './locales.store-15011fa2.js';
import { f as formatAmount } from './utils-f153e38d.js';
import { a as axios } from './Token-2955ce2c.js';
import { h as hooks } from './moment-7d60e5ef.js';
import './calendar-data-7d89fa9d.js';

const irBookingListingCss = ".sc-ir-booking-listing-h{display:block;height:100vh}.card.sc-ir-booking-listing{overflow-x:auto}.secondary-p.sc-ir-booking-listing{font-size:12px !important}.h-screen.sc-ir-booking-listing{height:100vh}.main-container.sc-ir-booking-listing{height:100vh;overflow-y:auto}.bg-ir-red.sc-ir-booking-listing{background:#ff4961;height:28px;padding-top:0 !important;padding-bottom:0 !important}.due-btn.sc-ir-booking-listing{border:1px solid #ff4961;color:#ff4961;cursor:pointer;padding:1px 0.25rem !important;font-size:12px !important}.due-btn.sc-ir-booking-listing:hover{background:#ff4961;color:white}.booking_number.sc-ir-booking-listing{all:unset;cursor:pointer}.booking_number.sc-ir-booking-listing:hover{color:#1e9ff2}.in-out.sc-ir-booking-listing{width:150px !important}.buttons-container.sc-ir-booking-listing{gap:10px}";

const IrBookingListing = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.bookingListingService = new BookingListingService();
    this.roomService = new RoomService();
    this.itemsPerPage = 20;
    this.language = '';
    this.ticket = '';
    this.baseurl = '';
    this.propertyid = undefined;
    this.isLoading = false;
    this.currentPage = 1;
    this.totalPages = 1;
    this.oldStartValue = 0;
    this.editBookingItem = null;
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
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
        this.totalPages = Math.round(newTotal / this.itemsPerPage);
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
    if (e.detail) {
      if (this.editBookingItem) {
        this.editBookingItem = null;
      }
    }
  }
  openModal() {
    if (!this.listingModal) {
      this.listingModal = this.el.querySelector('ir-listing-modal');
    }
    this.listingModal.editBooking = this.editBookingItem;
    this.listingModal.openModal();
  }
  async handleResetData(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({}, booking_listing.userSelection), { is_to_export: false }));
  }
  renderItemRange() {
    const totalCount = booking_listing.userSelection.total_count;
    const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    let endItem = this.currentPage * this.itemsPerPage;
    endItem = endItem > totalCount ? totalCount : endItem;
    booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { start_row: startItem - 1, end_row: endItem });
    return `${locales.entries.Lcz_View} ${startItem} - ${endItem} ${locales.entries.Lcz_Of} ${totalCount}`;
  }
  async updateData() {
    const { total_count } = booking_listing.userSelection;
    let endItem = this.currentPage * this.itemsPerPage;
    endItem = endItem > total_count ? total_count : endItem;
    const startItem = (this.currentPage - 1) * this.itemsPerPage;
    await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({}, booking_listing.userSelection), { is_to_export: false, start_row: startItem, end_row: endItem }));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (this.isLoading) {
      return (h("div", { class: "h-screen bg-white d-flex flex-column align-items-center justify-content-center" }, h("ir-loading-screen", null)));
    }
    return (h(Host, null, h("ir-interceptor", null), h("ir-toast", null), h("div", { class: "p-2 main-container" }, h("ir-listing-header", { propertyId: this.propertyid, language: this.language, baseurl: this.baseurl }), h("section", null, h("div", { class: "card p-1 flex-fill m-0 mt-2" }, h("table", { class: "table table-striped table-bordered no-footer dataTable" }, h("thead", null, h("tr", null, h("th", { scope: "col", class: "text-left" }, (_a = locales.entries) === null || _a === void 0 ? void 0 :
      _a.Lcz_Booking, "#"), h("th", { scope: "col" }, (_b = locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_BookedOn), h("th", { scope: "col" }, (_c = locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_GuestSource), h("th", { scope: "col" }, h("p", { class: 'm-0' }, (_d = locales.entries) === null || _d === void 0 ? void 0 : _d.Lcz_Price), h("p", { class: 'm-0 btn due-btn' }, (_e = locales.entries) === null || _e === void 0 ? void 0 : _e.Lcz_Balance)), h("th", { scope: "col", class: "text-left" }, (_f = locales.entries) === null || _f === void 0 ? void 0 : _f.Lcz_Services), h("th", { scope: "col", class: "in-out" }, (_g = locales.entries) === null || _g === void 0 ? void 0 : _g.Lcz_InOut), h("th", { scope: "col" }, (_h = locales.entries) === null || _h === void 0 ? void 0 : _h.Lcz_Status), h("th", { scope: "col" }, h("p", { class: "sr-only" }, "actions")))), h("tbody", { class: "" }, (_j = booking_listing.bookings) === null || _j === void 0 ? void 0 : _j.map(booking => {
      var _a;
      let confirmationBG = '';
      switch (booking.status.code) {
        case '001':
          confirmationBG = 'badge-warning';
          break;
        case '002':
          confirmationBG = 'badge-success';
          break;
        case '003':
        case '004':
          confirmationBG = 'badge-danger';
          break;
      }
      return (h("tr", { key: booking.booking_nbr }, h("td", { class: "text-left" }, h("div", { class: "h-100 d-flex align-items-center justify-content-between" }, h("button", { onClick: () => (this.editBookingItem = { booking, cause: 'edit' }), class: "booking_number" }, booking.booking_nbr), ' ', h("img", { class: "ml-2", src: booking.origin.Icon, alt: "logo" }))), h("td", null, h("p", { class: "p-0 m-0" }, hooks(booking.booked_on.date, 'YYYY-MM-DD').format('DD-MMM-YYYY')), h("p", { class: "p-0 m-0 secondary-p" }, booking.booked_on.hour, ":", booking.booked_on.minute)), h("td", null, h("p", { class: "p-0 m-0" }, booking.guest.first_name, " ", (_a = booking.guest.last_name) !== null && _a !== void 0 ? _a : '', " ", booking.occupancy.adult_nbr, locales.entries.Lcz_P), h("p", { class: "p-0 m-0 secondary-p" }, booking.origin.Label)), h("td", null, h("p", { class: "p-0 m-0" }, formatAmount(booking.currency.code, booking.financial.gross_total)), booking.financial.due_amount > 0 && (h("buuton", { onClick: () => {
          this.editBookingItem = { booking, cause: 'payment' };
          this.openModal();
        }, class: "btn p-0 m-0 due-btn" }, formatAmount(booking.currency.code, booking.financial.due_amount)))), h("td", null, h("ul", null, booking.rooms.map(room => (h("li", null, room.roomtype.name))))), h("td", null, h("p", { class: "p-0 m-0" }, hooks(booking.from_date, 'YYYY-MM-DD').format('DD-MMM-YYYY')), h("p", { class: "p-0 m-0" }, hooks(booking.to_date, 'YYYY-MM-DD').format('DD-MMM-YYYY'))), h("td", null, h("p", { class: `m-0 badge ${confirmationBG}` }, booking.status.description)), h("td", null, h("div", { class: "d-flex justify-content-center align-items-center" }, h("ir-icon", { onIconClickHandler: () => (this.editBookingItem = { booking, cause: 'edit' }) }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, h("path", { fill: "#104064", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" }))), h("ir-icon", { onIconClickHandler: () => {
          this.editBookingItem = { booking, cause: 'delete' };
          this.openModal();
        }, class: "ml-1" }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, h("path", { fill: "#ff4961", d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })))))));
    }))), this.totalPages > 1 && (h("section", { class: 'd-flex flex-column flex-md-row align-items-center justify-content-between' }, h("p", { class: "m-0 mb-1 mb-md-0" }, this.renderItemRange()), h("div", { class: 'd-flex align-items-center buttons-container' }, h("ir-button", { size: "sm", btn_disabled: this.currentPage === 1, onClickHanlder: async () => {
        this.currentPage = 1;
        await this.updateData();
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "14", viewBox: "0 0 512 512" }, h("path", { fill: "white", d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" }))), h("ir-button", { size: "sm", btn_disabled: this.currentPage === 1, onClickHanlder: async () => {
        this.currentPage = this.currentPage - 1;
        await this.updateData();
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "8.75", viewBox: "0 0 320 512" }, h("path", { fill: "white", d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" }))), h("ir-select", { selectedValue: this.currentPage.toString(), LabelAvailable: false, showFirstOption: false, onSelectChange: async (e) => {
        this.currentPage = +e.detail;
        await this.updateData();
      }, data: Array.from(Array(this.totalPages), (_, i) => i + 1).map(i => ({
        text: i.toString(),
        value: i.toString(),
      })) }), h("ir-button", { size: "sm", btn_disabled: this.currentPage === this.totalPages, onClickHanlder: async () => {
        this.currentPage = this.currentPage + 1;
        await this.updateData();
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "8.75", viewBox: "0 0 320 512" }, h("path", { fill: "white", d: "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" }))), h("ir-button", { size: "sm", btn_disabled: this.currentPage === this.totalPages, onClickHanlder: async () => {
        this.currentPage = this.totalPages;
        await this.updateData();
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "14", viewBox: "0 0 512 512" }, h("path", { fill: "white", d: "M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" }))))))))), h("ir-listing-modal", { onModalClosed: () => (this.editBookingItem = null) }), h("ir-sidebar", { onIrSidebarToggle: this.handleSideBarToggle.bind(this), open: this.editBookingItem !== null && this.editBookingItem.cause === 'edit', showCloseButton: this.editBookingItem !== null, sidebarStyles: { width: this.editBookingItem ? '80rem' : 'var(--sidebar-width,40rem)', background: '#F2F3F8' } }, this.editBookingItem && (h("ir-booking-details", { hasPrint: true, hasReceipt: true, is_from_front_desk: true, propertyid: this.propertyid, hasRoomEdit: true, hasRoomDelete: true, bookingNumber: this.editBookingItem.booking.booking_nbr, ticket: this.ticket, baseurl: this.baseurl, language: this.language, hasRoomAdd: true })))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrBookingListing.style = irBookingListingCss;

export { IrBookingListing as ir_booking_listing };

//# sourceMappingURL=ir-booking-listing.entry.js.map