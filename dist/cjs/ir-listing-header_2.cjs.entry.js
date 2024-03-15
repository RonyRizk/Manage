'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const booking_listing_service = require('./booking_listing.service-597d5b3c.js');
const locales_store = require('./locales.store-8fed15eb.js');
const payment_service = require('./payment.service-58bfb426.js');
const moment = require('./moment-f96595e5.js');
require('./Token-7fd57fe8.js');
require('./index-797ee4c0.js');

const irListingHeaderCss = ".sc-ir-listing-header-h{display:block;margin:0;padding:0;--ir-date-range-border:#cacfe7;--ir-date-range-width:242px;position:relative}h3.sc-ir-listing-header{margin:0}ir-input-text.sc-ir-listing-header{width:300px}.booking-search-field.sc-ir-listing-header{margin-left:0px;display:flex;align-items:center;gap:14px}.booking-container.sc-ir-listing-header{gap:14px}.filters-container.sc-ir-listing-header{gap:10px;justify-content:space-between}.buttons-container.sc-ir-listing-header{gap:14px;color:#104064}.new-booking-container.sc-ir-listing-header{position:absolute;right:10px;top:5px}.new-booking-btn.sc-ir-listing-header{all:unset;cursor:pointer;color:#104064}.new-booking-btn.sc-ir-listing-header:hover{color:#0b2538}.seperator-container.sc-ir-listing-header{margin-top:10px;justify-content:center !important;gap:14px}.seperator-container.sc-ir-listing-header span.sc-ir-listing-header{display:block;height:1px;background:var(--gray);width:45%;max-width:200px;margin:0}@media (max-width: 575.98px){.sc-ir-listing-header-h{--ir-date-range-width:100%}.flex-fill-sm-none.sc-ir-listing-header{flex:1 1 auto}.flex-fill-sm-none.sc-ir-listing-header label.sc-ir-listing-header{width:100px}.buttons-container.sc-ir-listing-header{justify-content:center !important;align-items:center !important;gap:40px}}@media (min-width: 1200px){.booking-search-field.sc-ir-listing-header{margin-left:40px}}@media (min-width: 1600px){.flex-fill-sm-none.sc-ir-listing-header{flex:0 0 auto}.booking-search-field.sc-ir-listing-header{margin-left:40px}}";

const IrListingHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.bookingListingService = new booking_listing_service.BookingListingService();
    this.propertyId = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.inputValue = '';
  }
  componentWillLoad() {
    this.bookingListingService.setToken(booking_listing_service.booking_listing.token);
  }
  handleDateRangeChange(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    const { start, end } = e.detail;
    booking_listing_service.booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing_service.booking_listing.userSelection), { from: start.format('YYYY-MM-DD'), to: end.format('YYYY-MM-DD') });
  }
  async handleSearchClicked(is_to_export) {
    if (this.inputValue !== '') {
      if (/^-?\d+$/.test(this.inputValue.trim())) {
        booking_listing_service.updateUserSelection('book_nbr', this.inputValue.trim());
      }
      else if (this.inputValue[3] === '-') {
        booking_listing_service.updateUserSelection('book_nbr', this.inputValue.trim());
      }
      else {
        booking_listing_service.updateUserSelection('name', this.inputValue.trim());
      }
    }
    if (this.inputValue === '' && (booking_listing_service.booking_listing.userSelection.book_nbr !== '' || booking_listing_service.booking_listing.userSelection.name !== '')) {
      booking_listing_service.booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing_service.booking_listing.userSelection), { name: '', book_nbr: '' });
    }
    await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({}, booking_listing_service.booking_listing.userSelection), { start_row: 0, end_row: 20, is_to_export }));
    if (booking_listing_service.booking_listing.download_url) {
      const url = booking_listing_service.booking_listing.download_url;
      this.downloadUrlTag.href = url;
      this.downloadUrlTag.download = url;
      this.downloadUrlTag.click();
      booking_listing_service.booking_listing.download_url = null;
    }
  }
  async handleClearUserField() {
    booking_listing_service.initializeUserSelection();
    if (this.inputValue) {
      this.inputValue = '';
    }
    await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({}, booking_listing_service.booking_listing.userSelection), { start_row: 0, end_row: 20, is_to_export: false }));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return (index.h(index.Host, null, index.h("a", { ref: el => (this.downloadUrlTag = el) }, index.h("p", { class: "sr-only" }, "download url")), index.h("section", { class: "d-flex align-items-center " }, index.h("div", { class: "d-flex flex-fill flex-column flex-md-row align-items-md-center booking-container" }, index.h("div", { class: "d-flex mb-1 d-md-none align-items-center justify-content-bettween width-fill" }, index.h("h3", { class: "flex-fill" }, (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_Bookings), index.h("div", null, booking_listing_service.booking_listing.token && (index.h("igl-book-property-container", { withIrToastAndInterceptor: false, propertyid: this.propertyId, language: this.language, title: locales_store.locales.entries.Lcz_CreateNewBooking, baseurl: this.baseurl, ticket: booking_listing_service.booking_listing.token }, index.h("button", { slot: "trigger", class: 'new-booking-btn' }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" }))))))), index.h("h3", { class: "d-none d-md-block" }, (_b = locales_store.locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_Bookings), index.h("form", { onSubmit: e => {
        e.preventDefault();
        console.log(this.inputValue);
        this.handleSearchClicked(false);
      }, class: "booking-search-field width-fill" }, index.h("ir-input-text", { class: 'flex-fill', value: this.inputValue, onTextChange: e => (this.inputValue = e.detail), variant: "icon", placeholder: (_c = locales_store.locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_FindBookNbrorName }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "14", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }))), index.h("h5", { class: "m-0 font-weight-bold d-none d-sm-block" }, (_d = locales_store.locales.entries) === null || _d === void 0 ? void 0 : _d.Lcz_Or))), index.h("div", { class: "d-none d-md-block" }, booking_listing_service.booking_listing.token && (index.h("igl-book-property-container", { withIrToastAndInterceptor: false, propertyid: this.propertyId, language: this.language, title: locales_store.locales.entries.Lcz_CreateNewBooking, baseurl: this.baseurl, ticket: booking_listing_service.booking_listing.token }, index.h("button", { slot: "trigger", class: 'new-booking-btn' }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" }))))))), index.h("section", { class: "d-flex align-items-center justify-evenly seperator-container d-sm-none" }, index.h("span", null), index.h("h5", { class: "m-0 font-weight-bold" }, (_e = locales_store.locales.entries) === null || _e === void 0 ? void 0 : _e.Lcz_Or), index.h("span", null)), index.h("section", { class: "d-flex flex-column align-items-sm-center flex-sm-row flex-sm-wrap filters-container justify-content-lg-start mt-1" }, index.h("ir-select", { onSelectChange: e => booking_listing_service.updateUserSelection('filter_type', e.detail), showFirstOption: false, data: booking_listing_service.booking_listing === null || booking_listing_service.booking_listing === void 0 ? void 0 : booking_listing_service.booking_listing.types.map(t => ({
        value: t.id.toString(),
        text: t.name,
      })), class: "flex-sm-wrap", selectedValue: booking_listing_service.booking_listing.userSelection.filter_type, select_id: "dateTo", LabelAvailable: false }), index.h("igl-date-range", { class: "flex-sm-wrap", minDate: "2000-01-01", withDateDifference: false, defaultData: {
        fromDate: booking_listing_service.booking_listing.userSelection.from,
        toDate: booking_listing_service.booking_listing.userSelection.to,
      } }), index.h("ir-select", { class: "flex-sm-wrap", selectedValue: booking_listing_service.booking_listing.userSelection.booking_status, onSelectChange: e => booking_listing_service.updateUserSelection('booking_status', e.detail), showFirstOption: false, data: booking_listing_service.booking_listing === null || booking_listing_service.booking_listing === void 0 ? void 0 : booking_listing_service.booking_listing.statuses.map(status => ({
        value: status.code,
        text: status.name,
      })), select_id: "booking_status", LabelAvailable: false }), index.h("ir-select", { class: "flex-sm-wrap", selectedValue: booking_listing_service.booking_listing.userSelection.channel, onSelectChange: e => booking_listing_service.updateUserSelection('channel', e.detail), LabelAvailable: false, data: booking_listing_service.booking_listing === null || booking_listing_service.booking_listing === void 0 ? void 0 : booking_listing_service.booking_listing.channels.map(channel => ({
        value: channel.name,
        text: channel.name,
      })), select_id: "channels", firstOption: ((_f = locales_store.locales.entries) === null || _f === void 0 ? void 0 : _f.Lcz_All) + ' ' + ((_g = locales_store.locales.entries) === null || _g === void 0 ? void 0 : _g.Lcz_Channels) }), index.h("div", { class: "d-flex flex-fill align-items-end m-0  buttons-container" }, index.h("ir-icon", { title: (_h = locales_store.locales.entries) === null || _h === void 0 ? void 0 : _h.Lcz_Search, onIconClickHandler: () => this.handleSearchClicked(false) }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }))), index.h("ir-icon", { title: (_j = locales_store.locales.entries) === null || _j === void 0 ? void 0 : _j.Lcz_Erase, onIconClickHandler: () => this.handleClearUserField() }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "22.5", viewBox: "0 0 576 512" }, index.h("path", { fill: "currentColor", d: "M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" }))), index.h("ir-icon", { onIconClickHandler: () => this.handleSearchClicked(true), title: (_k = locales_store.locales.entries) === null || _k === void 0 ? void 0 : _k.Lcz_ExportToExcel }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "15", viewBox: "0 0 384 512" }, index.h("path", { fill: "currentColor", d: "M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z" })))))));
  }
};
IrListingHeader.style = irListingHeaderCss;

const irListingModalCss = ".backdropModal.sc-ir-listing-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-listing-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-listing-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-listing-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-listing-modal{z-index:1001 !important}.modal-dialog.sc-ir-listing-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-listing-modal{gap:10px}.exit-icon.sc-ir-listing-modal{position:absolute;right:10px;top:5px;margin:0}.ir-modal.sc-ir-listing-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-listing-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";

const IrListingModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.modalClosed = index.createEvent(this, "modalClosed", 7);
    this.resetData = index.createEvent(this, "resetData", 7);
    this.bookingListingsService = new booking_listing_service.BookingListingService();
    this.paymentService = new payment_service.PaymentService();
    this.modalTitle = 'Modal Title';
    this.editBooking = undefined;
    this.isOpen = false;
    this.deletionStage = 1;
    this.selectedDesignation = undefined;
    this.loadingBtn = null;
  }
  componentWillLoad() {
    this.bookingListingsService.setToken(booking_listing_service.booking_listing.token);
    this.paymentService.setToken(booking_listing_service.booking_listing.token);
    this.selectedDesignation = booking_listing_service.booking_listing.settlement_methods[0].name;
  }
  async closeModal() {
    this.isOpen = false;
    this.deletionStage = 1;
    this.selectedDesignation = booking_listing_service.booking_listing.settlement_methods[0].name;
    this.modalClosed.emit(null);
  }
  async openModal() {
    this.isOpen = true;
  }
  filterBookings() {
    booking_listing_service.booking_listing.bookings = booking_listing_service.booking_listing.bookings.filter(booking => booking.booking_nbr !== this.editBooking.booking.booking_nbr);
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
            date: moment.hooks().format('YYYY-MM-DD'),
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
      index.h("div", { "data-state": this.isOpen ? 'opened' : 'closed', class: `ir-modal`, tabindex: "-1" }, this.isOpen && (index.h("div", { class: `ir-alert-content p-2` }, index.h("div", { class: `ir-alert-header align-items-center border-0 py-0 m-0 ` }, index.h("p", { class: "p-0 my-0 mb-1" }, this.renderTitle()), index.h("ir-icon", { class: "exit-icon", style: { cursor: 'pointer' }, onClick: () => {
          this.closeModal();
        } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "10.5", viewBox: "0 0 384 512" }, index.h("path", { fill: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), index.h("div", { class: "modal-body text-left p-0 mb-2" }, this.editBooking.cause === 'payment' ? (index.h("ir-select", { selectedValue: this.selectedDesignation, onSelectChange: e => (this.selectedDesignation = e.detail), showFirstOption: false, LabelAvailable: false, data: booking_listing_service.booking_listing.settlement_methods.map(m => ({
          value: m.name,
          text: m.name,
        })) })) : null), index.h("div", { class: `ir-alert-footer border-0 d-flex justify-content-end` }, index.h("ir-button", { isLoading: this.loadingBtn === 'just_delete', icon: '', btn_color: 'secondary', btn_block: true, text: this.renderCancelationTitle(), name: 'cancel' }), index.h("ir-button", { isLoading: this.loadingBtn === 'recover_and_delete', icon: '', btn_color: 'primary', btn_block: true, text: this.renderConfirmationTitle(), name: 'confirm' }))))),
    ];
  }
};
IrListingModal.style = irListingModalCss;

exports.ir_listing_header = IrListingHeader;
exports.ir_listing_modal = IrListingModal;

//# sourceMappingURL=ir-listing-header_2.cjs.entry.js.map