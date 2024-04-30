import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { B as BookingListingService, u as updateUserSelection, b as booking_listing, o as onBookingListingChange } from './booking_listing.service.js';
import { R as RoomService } from './room.service.js';
import { l as locales } from './locales.store.js';
import { f as formatAmount } from './utils2.js';
import { a as axios } from './axios.js';
import { h as hooks } from './moment.js';
import { a as _formatTime } from './functions.js';
import { d as defineCustomElement$B } from './igl-application-info2.js';
import { d as defineCustomElement$A } from './igl-block-dates-view2.js';
import { d as defineCustomElement$z } from './igl-book-property2.js';
import { d as defineCustomElement$y } from './igl-book-property-container2.js';
import { d as defineCustomElement$x } from './igl-book-property-footer2.js';
import { d as defineCustomElement$w } from './igl-book-property-header2.js';
import { d as defineCustomElement$v } from './igl-booking-overview-page2.js';
import { d as defineCustomElement$u } from './igl-booking-room-rate-plan2.js';
import { d as defineCustomElement$t } from './igl-booking-rooms2.js';
import { d as defineCustomElement$s } from './igl-date-range2.js';
import { d as defineCustomElement$r } from './igl-pagetwo2.js';
import { d as defineCustomElement$q } from './igl-property-booked-by2.js';
import { d as defineCustomElement$p } from './ir-autocomplete2.js';
import { d as defineCustomElement$o } from './ir-booking-details2.js';
import { d as defineCustomElement$n } from './ir-button2.js';
import { d as defineCustomElement$m } from './ir-date-picker2.js';
import { d as defineCustomElement$l } from './ir-date-view2.js';
import { d as defineCustomElement$k } from './ir-dialog2.js';
import { d as defineCustomElement$j } from './ir-guest-info2.js';
import { d as defineCustomElement$i } from './ir-icon2.js';
import { d as defineCustomElement$h } from './ir-input-text2.js';
import { d as defineCustomElement$g } from './ir-interceptor2.js';
import { d as defineCustomElement$f } from './ir-label2.js';
import { d as defineCustomElement$e } from './ir-listing-header2.js';
import { d as defineCustomElement$d } from './ir-listing-modal2.js';
import { d as defineCustomElement$c } from './ir-loading-screen2.js';
import { d as defineCustomElement$b } from './ir-modal2.js';
import { d as defineCustomElement$a } from './ir-payment-details2.js';
import { d as defineCustomElement$9 } from './ir-pickup2.js';
import { d as defineCustomElement$8 } from './ir-room2.js';
import { d as defineCustomElement$7 } from './ir-select2.js';
import { d as defineCustomElement$6 } from './ir-sidebar2.js';
import { d as defineCustomElement$5 } from './ir-title2.js';
import { d as defineCustomElement$4 } from './ir-toast2.js';
import { d as defineCustomElement$3 } from './ir-tooltip2.js';
import { d as defineCustomElement$2 } from './ota-label2.js';

const irBookingListingCss = ".sc-ir-booking-listing-h{display:block;height:100%}.card.sc-ir-booking-listing{overflow-x:auto}.secondary-p.sc-ir-booking-listing{font-size:12px !important}.h-screen.sc-ir-booking-listing{height:100%}.price-span.sc-ir-booking-listing{margin:0;margin-right:5px}.main-container.sc-ir-booking-listing{height:100%;overflow-y:auto}.bg-ir-red.sc-ir-booking-listing{background:#ff4961;height:28px;padding-top:0 !important;padding-bottom:0 !important}.due-btn.sc-ir-booking-listing{border:1px solid #ff4961;color:#ff4961;cursor:pointer;padding:1px 0.25rem !important;font-size:12px !important}.due-btn.sc-ir-booking-listing:hover{background:#ff4961;color:white}.booking_number.sc-ir-booking-listing{all:unset;cursor:pointer}.booking_number.sc-ir-booking-listing:hover{color:#1e9ff2}.in-out.sc-ir-booking-listing{width:150px !important}.buttons-container.sc-ir-booking-listing{gap:10px}td.sc-ir-booking-listing ul.sc-ir-booking-listing{width:max-content !important}td.sc-ir-booking-listing{width:max-content !important}.date-p.sc-ir-booking-listing{width:max-content !important;min-width:100%;text-align:center !important}.booking-label-gap.sc-ir-booking-listing{gap:5px}";

const IrBookingListing$1 = /*@__PURE__*/ proxyCustomElement(class IrBookingListing extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.bookingListingService = new BookingListingService();
    this.roomService = new RoomService();
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
    this.showCost = false;
  }
  componentWillLoad() {
    updateUserSelection('end_row', this.rowCount);
    booking_listing.rowCount = this.rowCount;
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
      this.totalPages = Math.ceil(newTotal / this.rowCount);
    });
    onBookingListingChange('bookings', async (newValue) => {
      this.showCost = newValue.some(booking => booking.financial.gross_cost !== null && booking.financial.gross_cost > 0);
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
      await Promise.all([this.bookingListingService.getExposedBookingsCriteria(this.propertyid), this.roomService.fetchLanguage(this.language, ['_BOOKING_LIST_FRONT'])]);
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
    return `${locales.entries.Lcz_View} ${startItem + 1} - ${endItem} ${locales.entries.Lcz_Of} ${totalCount}`;
  }
  async updateData() {
    const { endItem, startItem } = this.getPaginationBounds();
    await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({}, booking_listing.userSelection), { is_to_export: false, start_row: startItem, end_row: endItem }));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    if (this.isLoading || this.ticket === '') {
      return h("ir-loading-screen", null);
    }
    return (h(Host, null, h("ir-interceptor", null), h("ir-toast", null), h("div", { class: "p-1 main-container" }, h("ir-listing-header", { propertyId: this.propertyid, language: this.language, baseurl: this.baseurl }), h("section", null, h("div", { class: "card p-1 flex-fill m-0 mt-2" }, h("table", { class: "table table-striped table-bordered no-footer dataTable" }, h("thead", null, h("tr", null, h("th", { scope: "col", class: "text-left" }, (_a = locales.entries) === null || _a === void 0 ? void 0 :
      _a.Lcz_Booking, "#"), h("th", { scope: "col" }, (_b = locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_BookedOn), h("th", { scope: "col" }, (_c = locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_GuestSource), h("th", { scope: "col" }, h("span", { class: "price-span" }, (_d = locales.entries) === null || _d === void 0 ? void 0 : _d.Lcz_Price), h("ir-tooltip", { customSlot: true, message: `<span style="width:100%;display:block;">${(_e = locales.entries) === null || _e === void 0 ? void 0 : _e.Lcz_BookingBalance}</span><span>${(_f = locales.entries) === null || _f === void 0 ? void 0 : _f.Lcz_ClickToSettle}</span>` }, h("span", { slot: "tooltip-trigger", class: 'm-0 btn due-btn' }, (_g = locales.entries) === null || _g === void 0 ? void 0 : _g.Lcz_Balance))), this.showCost && (h("th", { scope: "col", class: "services-cell" }, (_h = locales.entries) === null || _h === void 0 ? void 0 : _h.Lcz_Cost)), h("th", { scope: "col", class: "text-left services-cell" }, (_j = locales.entries) === null || _j === void 0 ? void 0 : _j.Lcz_Services), h("th", { scope: "col", class: "in-out" }, (_k = locales.entries) === null || _k === void 0 ? void 0 : _k.Lcz_InOut), h("th", { scope: "col" }, (_l = locales.entries) === null || _l === void 0 ? void 0 : _l.Lcz_Status), h("th", { scope: "col" }, h("p", { class: "sr-only" }, "actions")))), h("tbody", { class: "" }, booking_listing.bookings.length === 0 && (h("tr", null, h("td", { colSpan: 8 }, (_m = locales.entries) === null || _m === void 0 ? void 0 : _m.Lcz_NoDataAvailable))), (_o = booking_listing.bookings) === null || _o === void 0 ? void 0 :
      _o.map(booking => {
        var _a, _b, _c;
        let confirmationBG = this.statusColors[booking.status.code];
        return (h("tr", { key: booking.booking_nbr }, h("td", { class: "text-left" }, h("button", { onClick: () => (this.editBookingItem = { booking, cause: 'edit' }), class: "booking_number" }, booking.booking_nbr)), h("td", null, h("p", { class: "p-0 m-0 date-p" }, hooks(booking.booked_on.date, 'YYYY-MM-DD').format('DD-MMM-YYYY')), h("p", { class: "p-0 m-0 secondary-p" }, _formatTime(booking.booked_on.hour.toString(), booking.booked_on.minute.toString()))), h("td", null, h("div", { class: "h-100 d-flex align-items-center " }, h("img", { class: "mr-2", src: booking.origin.Icon, alt: "logo" }), h("div", { class: "text-left" }, h("p", { class: "p-0 m-0" }, booking.guest.first_name, " ", (_a = booking.guest.last_name) !== null && _a !== void 0 ? _a : '', " ", booking.occupancy.adult_nbr, locales.entries.Lcz_P), h("div", { class: 'd-flex align-items-center booking-label-gap' }, h("p", { class: "p-0 m-0 secondary-p" }, booking.origin.Label), booking.is_in_loyalty_mode && !booking.promo_key && (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", height: 18, width: 18 }, h("title", null, locales.entries.Lcz_LoyaltyDiscountApplied), h("path", { fill: "#fc6c85", d: "M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" }))), booking.promo_key && (h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", height: 18, width: 18 }, h("title", null, locales.entries.Lcz_Coupon + ':' + booking.promo_key), h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" })))), booking.agent && h("p", { class: "m-0 secondary-p" }, locales.entries.Lcz_AgentCode.replace('%1', booking.agent.name))))), h("td", null, h("p", { class: "p-0 m-0" }, formatAmount(booking.currency.code, (_c = (_b = booking.financial) === null || _b === void 0 ? void 0 : _b.gross_total) !== null && _c !== void 0 ? _c : 0)), booking.financial.due_amount > 0 && (h("buuton", { onClick: () => {
            this.editBookingItem = { booking, cause: 'payment' };
            this.openModal();
          }, class: "btn p-0 m-0 due-btn" }, formatAmount(booking.currency.code, booking.financial.due_amount)))), this.showCost && (h("td", null, booking.financial.gross_cost !== null && booking.financial.gross_cost === 0 ? '_' : formatAmount(booking.currency.code, booking.financial.gross_cost))), h("td", null, h("ul", null, booking.rooms.map(room => (h("li", null, room.roomtype.name))))), h("td", null, h("p", { class: "p-0 m-0 date-p" }, hooks(booking.from_date, 'YYYY-MM-DD').format('DD-MMM-YYYY')), h("p", { class: "p-0 m-0 date-p" }, hooks(booking.to_date, 'YYYY-MM-DD').format('DD-MMM-YYYY'))), h("td", null, h("p", { class: `m-0 badge ${confirmationBG}` }, booking.status.description)), h("td", null, h("div", { class: "d-flex justify-content-center align-items-center" }, h("ir-icon", { onIconClickHandler: () => (this.editBookingItem = { booking, cause: 'edit' }) }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, h("path", { fill: "#104064", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" }))), h("ir-icon", { onIconClickHandler: () => {
            this.editBookingItem = { booking, cause: 'delete' };
            this.openModal();
          }, class: "ml-1" }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, h("path", { fill: "#ff4961", d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })))))));
      }))), this.totalPages > 1 && (h("section", { class: 'd-flex flex-column flex-md-row align-items-center justify-content-between' }, h("p", { class: "m-0 mb-1 mb-md-0" }, this.renderItemRange()), h("div", { class: 'd-flex align-items-center buttons-container' }, h("ir-button", { size: "sm", btn_disabled: this.currentPage === 1, onClickHanlder: async () => {
        this.currentPage = 1;
        await this.updateData();
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "14", viewBox: "0 0 512 512" }, h("path", { fill: "white", d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" }))), h("ir-button", { size: "sm", btn_disabled: this.currentPage === 1, onClickHanlder: async () => {
        this.currentPage = this.currentPage - 1;
        console.log(this.currentPage);
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
        console.log(this.currentPage);
        await this.updateData();
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "14", viewBox: "0 0 512 512" }, h("path", { fill: "white", d: "M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" }))))))))), this.editBookingItem && h("ir-listing-modal", { onModalClosed: () => (this.editBookingItem = null) }), h("ir-sidebar", { onIrSidebarToggle: this.handleSideBarToggle.bind(this), open: this.editBookingItem !== null && this.editBookingItem.cause === 'edit', showCloseButton: this.editBookingItem !== null, sidebarStyles: { width: this.editBookingItem ? '80rem' : 'var(--sidebar-width,40rem)', background: '#F2F3F8' } }, ((_p = this.editBookingItem) === null || _p === void 0 ? void 0 : _p.cause) === 'edit' && (h("ir-booking-details", { slot: "sidebar-body", hasPrint: true, hasReceipt: true, is_from_front_desk: true, propertyid: this.propertyid, hasRoomEdit: true, hasRoomDelete: true, bookingNumber: this.editBookingItem.booking.booking_nbr, ticket: this.ticket, baseurl: this.baseurl, language: this.language, hasRoomAdd: true })))));
  }
  get el() { return this; }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
  static get style() { return irBookingListingCss; }
}, [2, "ir-booking-listing", {
    "language": [1],
    "ticket": [1],
    "baseurl": [1],
    "propertyid": [2],
    "rowCount": [2, "row-count"],
    "isLoading": [32],
    "currentPage": [32],
    "totalPages": [32],
    "oldStartValue": [32],
    "editBookingItem": [32],
    "showCost": [32]
  }, [[0, "resetData", "handleResetData"], [0, "resetBookingData", "handleResetStoreData"], [0, "bookingChanged", "handleBookingChanged"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-booking-listing", "igl-application-info", "igl-block-dates-view", "igl-book-property", "igl-book-property-container", "igl-book-property-footer", "igl-book-property-header", "igl-booking-overview-page", "igl-booking-room-rate-plan", "igl-booking-rooms", "igl-date-range", "igl-pagetwo", "igl-property-booked-by", "ir-autocomplete", "ir-booking-details", "ir-button", "ir-date-picker", "ir-date-view", "ir-dialog", "ir-guest-info", "ir-icon", "ir-input-text", "ir-interceptor", "ir-label", "ir-listing-header", "ir-listing-modal", "ir-loading-screen", "ir-modal", "ir-payment-details", "ir-pickup", "ir-room", "ir-select", "ir-sidebar", "ir-title", "ir-toast", "ir-tooltip", "ota-label"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-booking-listing":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrBookingListing$1);
      }
      break;
    case "igl-application-info":
      if (!customElements.get(tagName)) {
        defineCustomElement$B();
      }
      break;
    case "igl-block-dates-view":
      if (!customElements.get(tagName)) {
        defineCustomElement$A();
      }
      break;
    case "igl-book-property":
      if (!customElements.get(tagName)) {
        defineCustomElement$z();
      }
      break;
    case "igl-book-property-container":
      if (!customElements.get(tagName)) {
        defineCustomElement$y();
      }
      break;
    case "igl-book-property-footer":
      if (!customElements.get(tagName)) {
        defineCustomElement$x();
      }
      break;
    case "igl-book-property-header":
      if (!customElements.get(tagName)) {
        defineCustomElement$w();
      }
      break;
    case "igl-booking-overview-page":
      if (!customElements.get(tagName)) {
        defineCustomElement$v();
      }
      break;
    case "igl-booking-room-rate-plan":
      if (!customElements.get(tagName)) {
        defineCustomElement$u();
      }
      break;
    case "igl-booking-rooms":
      if (!customElements.get(tagName)) {
        defineCustomElement$t();
      }
      break;
    case "igl-date-range":
      if (!customElements.get(tagName)) {
        defineCustomElement$s();
      }
      break;
    case "igl-pagetwo":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "igl-property-booked-by":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "ir-autocomplete":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "ir-booking-details":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "ir-date-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "ir-date-view":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "ir-dialog":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "ir-guest-info":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "ir-input-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "ir-interceptor":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "ir-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "ir-listing-header":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "ir-listing-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "ir-loading-screen":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "ir-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "ir-payment-details":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "ir-pickup":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "ir-room":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "ir-sidebar":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-title":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-toast":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-tooltip":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ota-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const IrBookingListing = IrBookingListing$1;
const defineCustomElement = defineCustomElement$1;

export { IrBookingListing, defineCustomElement };

//# sourceMappingURL=ir-booking-listing.js.map