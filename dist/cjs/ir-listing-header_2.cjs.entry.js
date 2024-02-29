'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const booking_listing_service = require('./booking_listing.service-02520346.js');
const locales_store = require('./locales.store-0567c122.js');
const payment_service = require('./payment.service-58bfb426.js');
const moment = require('./moment-f96595e5.js');
require('./Token-7fd57fe8.js');

const irListingHeaderCss = ".sc-ir-listing-header-h{display:block;margin:0;padding:0;--ir-date-range-border:#cacfe7;--ir-date-range-width:242px;position:relative}h3.sc-ir-listing-header{margin:0}ir-input-text.sc-ir-listing-header{width:300px}.booking-search-field.sc-ir-listing-header{margin-left:0px;display:flex;align-items:center;gap:14px}.booking-container.sc-ir-listing-header{gap:14px}.filters-container.sc-ir-listing-header{gap:10px;justify-content:space-between}.buttons-container.sc-ir-listing-header{gap:14px;color:#104064}.new-booking-container.sc-ir-listing-header{position:absolute;right:10px;top:5px}.new-booking-btn.sc-ir-listing-header{all:unset;cursor:pointer;color:#104064}.new-booking-btn.sc-ir-listing-header:hover{color:#0b2538}@media (max-width: 575.98px){.sc-ir-listing-header-h{--ir-date-range-width:360px}.flex-fill-sm-none.sc-ir-listing-header{flex:1 1 auto}}@media (min-width: 1200px){.flex-fill-sm-none.sc-ir-listing-header{flex:0 0 auto}.booking-search-field.sc-ir-listing-header{margin-left:40px}}";

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
  async handleSearchClicked() {
    if (this.inputValue !== '') {
      if (/^-?\d+$/.test(this.inputValue)) {
        booking_listing_service.updateUserSelection('book_nbr', this.inputValue);
      }
      else if (this.inputValue[3] === '-') {
        booking_listing_service.updateUserSelection('book_nbr', this.inputValue);
      }
      else {
        booking_listing_service.updateUserSelection('name', this.inputValue);
      }
    }
    await this.bookingListingService.getExposedBookings(booking_listing_service.booking_listing.userSelection);
    this.inputValue = '';
  }
  render() {
    return (index.h(index.Host, null, index.h("section", { class: "d-flex align-items-center " }, index.h("div", { class: "d-flex flex-fill flex-column flex-md-row align-items-md-center booking-container" }, index.h("div", { class: "d-flex mb-1 d-md-none align-items-center justify-content-bettween width-fill" }, index.h("h3", { class: "flex-fill" }, locales_store.locales.entries.Lcz_Bookings), index.h("div", null, index.h("igl-book-property-container", { propertyid: this.propertyId, language: this.language, baseurl: this.baseurl, ticket: booking_listing_service.booking_listing.token }, index.h("button", { slot: "trigger", class: 'new-booking-btn' }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" })))))), index.h("h3", { class: "d-none d-md-block" }, locales_store.locales.entries.Lcz_Bookings), index.h("div", { class: "booking-search-field" }, index.h("ir-input-text", { value: this.inputValue, onTextChange: e => (this.inputValue = e.detail), variant: "icon", placeholder: "Find booking number/name" }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "14", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }))), index.h("h5", { class: "m-0 font-weight-bold" }, locales_store.locales.entries.Lcz_Or))), index.h("div", { class: "d-none d-md-block" }, index.h("igl-book-property-container", { propertyid: this.propertyId, language: this.language, baseurl: this.baseurl, ticket: booking_listing_service.booking_listing.token }, index.h("button", { slot: "trigger", class: 'new-booking-btn' }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" })))))), index.h("section", { class: "d-flex align-items-center flex-wrap filters-container justify-content-lg-start mt-1" }, index.h("fieldset", { class: "flex-fill-sm-none" }, index.h("label", { htmlFor: "dateTo" }, locales_store.locales.entries.Lcz_DateOf), index.h("ir-select", { onSelectChange: e => booking_listing_service.updateUserSelection('filter_type', e.detail), showFirstOption: false, data: booking_listing_service.booking_listing === null || booking_listing_service.booking_listing === void 0 ? void 0 : booking_listing_service.booking_listing.types.map(t => ({
        value: t.id.toString(),
        text: t.name,
      })), select_id: "dateTo", LabelAvailable: false })), index.h("fieldset", { class: "flex-fill-sm-none" }, index.h("label", { htmlFor: "dates" }, locales_store.locales.entries.Lcz_Dates), index.h("igl-date-range", { minDate: "2000-01-01", withDateDifference: false, defaultData: {
        fromDate: booking_listing_service.booking_listing.userSelection.from,
        toDate: booking_listing_service.booking_listing.userSelection.to,
      } })), index.h("fieldset", { class: "flex-fill-sm-none" }, index.h("label", { htmlFor: "booking_status" }, locales_store.locales.entries.Lcz_BookingStatus), index.h("ir-select", { onSelectChange: e => booking_listing_service.updateUserSelection('booking_status', e.detail), showFirstOption: false, data: booking_listing_service.booking_listing === null || booking_listing_service.booking_listing === void 0 ? void 0 : booking_listing_service.booking_listing.statuses.map(status => ({
        value: status.code,
        text: status.name,
      })), select_id: "booking_status", LabelAvailable: false })), index.h("fieldset", { class: "flex-fill-sm-none" }, index.h("label", { htmlFor: "channels" }, locales_store.locales.entries.Lcz_Channels), index.h("ir-select", { onSelectChange: e => booking_listing_service.updateUserSelection('channel', e.detail), showFirstOption: false, data: booking_listing_service.booking_listing === null || booking_listing_service.booking_listing === void 0 ? void 0 : booking_listing_service.booking_listing.channels.map(channel => ({
        value: channel.name,
        text: channel.name,
      })), select_id: "channels", LabelAvailable: false })), index.h("div", { class: "d-flex align-items-end m-0 mt-2 buttons-container" }, index.h("ir-icon", { title: locales_store.locales.entries.Lcz_Search, onIconClickHandler: () => this.handleSearchClicked() }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }))), index.h("ir-icon", { title: locales_store.locales.entries.Lcz_Erase }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "22.5", viewBox: "0 0 576 512" }, index.h("path", { fill: "currentColor", d: "M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" }))), index.h("ir-icon", { title: locales_store.locales.entries.Lcz_ExportToExcel }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "15", viewBox: "0 0 384 512" }, index.h("path", { fill: "currentColor", d: "M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z" })))))));
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
          this.resetData.emit(null);
          this.closeModal();
        }
        else {
          if (this.deletionStage === 1) {
            this.deletionStage = 2;
          }
        }
      }
    }
    catch (error) {
      console.error(error);
    }
    if (name === 'cancel') {
      if (this.deletionStage === 2) {
        return;
      }
      this.closeModal();
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
    if (this.editBooking.cause === 'payment') {
      return locales_store.locales.entries.Lcz_Confirm;
    }
    else {
      if (this.deletionStage === 1) {
        return locales_store.locales.entries.Lcz_OK;
      }
      return locales_store.locales.entries.Lcz_RecoverAndDelete;
    }
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
      index.h("div", { "data-state": this.isOpen ? 'opened' : 'closed', class: `ir-modal`, tabindex: "-1" }, index.h("div", { class: `ir-alert-content p-2` }, index.h("div", { class: `ir-alert-header align-items-center border-0 py-0 m-0 ` }, index.h("p", { class: "font-weight-bold p-0 my-0 mb-1" }, this.renderTitle()), index.h("ir-icon", { class: "exit-icon", style: { cursor: 'pointer' }, onClick: () => {
          this.closeModal();
        } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "10.5", viewBox: "0 0 384 512" }, index.h("path", { fill: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), index.h("div", { class: "modal-body text-left p-0 mb-2" }, this.editBooking.cause === 'payment' ? (index.h("ir-select", { selectedValue: this.selectedDesignation, onSelectChange: e => (this.selectedDesignation = e.detail), showFirstOption: false, LabelAvailable: false, data: booking_listing_service.booking_listing.settlement_methods.map(m => ({
          value: m.name,
          text: m.name,
        })) })) : null), index.h("div", { class: `ir-alert-footer border-0 d-flex justify-content-end` }, index.h("ir-button", { icon: '', btn_color: 'secondary', btn_block: true, text: this.renderCancelationTitle(), name: 'cancel' }), index.h("ir-button", { icon: '', btn_color: 'primary', btn_block: true, text: this.renderConfirmationTitle(), name: 'confirm' })))),
    ];
  }
};
IrListingModal.style = irListingModalCss;

exports.ir_listing_header = IrListingHeader;
exports.ir_listing_modal = IrListingModal;

//# sourceMappingURL=ir-listing-header_2.cjs.entry.js.map