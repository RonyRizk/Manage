import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { B as BookingListingService, b as booking_listing } from './booking_listing.service.js';
import { l as locales } from './locales.store.js';
import { P as PaymentService } from './payment.service.js';
import { h as hooks } from './moment.js';
import { d as defineCustomElement$3 } from './ir-button2.js';
import { d as defineCustomElement$2 } from './ir-icon2.js';
import { d as defineCustomElement$1 } from './ir-select2.js';

const irListingModalCss = ".backdropModal.sc-ir-listing-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-listing-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-listing-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-listing-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-listing-modal{z-index:1001 !important}.modal-dialog.sc-ir-listing-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-listing-modal{gap:10px}.exit-icon.sc-ir-listing-modal{position:absolute;right:10px;top:5px;margin:0}.ir-modal.sc-ir-listing-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-listing-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";

const IrListingModal = /*@__PURE__*/ proxyCustomElement(class IrListingModal extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.modalClosed = createEvent(this, "modalClosed", 7);
    this.resetData = createEvent(this, "resetData", 7);
    this.bookingListingsService = new BookingListingService();
    this.paymentService = new PaymentService();
    this.modalTitle = 'Modal Title';
    this.editBooking = undefined;
    this.isOpen = false;
    this.deletionStage = 1;
    this.selectedDesignation = undefined;
  }
  componentWillLoad() {
    this.bookingListingsService.setToken(booking_listing.token);
    this.paymentService.setToken(booking_listing.token);
    this.selectedDesignation = booking_listing.settlement_methods[0].name;
  }
  async closeModal() {
    this.isOpen = false;
    this.deletionStage = 1;
    this.selectedDesignation = booking_listing.settlement_methods[0].name;
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
            date: hooks().format('YYYY-MM-DD'),
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
      return (_a = locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_MarkBookingAsPaid.replace('%1', this.editBooking.booking.booking_nbr);
    }
    else {
      if (this.deletionStage === 1) {
        return locales.entries.Lcz_SureYouWantToDeleteBookingNbr + ((_b = this.editBooking) === null || _b === void 0 ? void 0 : _b.booking.booking_nbr);
      }
      return locales.entries.Lcz_WantToRecoverAllotment;
    }
  }
  renderConfirmationTitle() {
    if (this.editBooking.cause === 'payment') {
      return locales.entries.Lcz_Confirm;
    }
    else {
      if (this.deletionStage === 1) {
        return locales.entries.Lcz_OK;
      }
      return locales.entries.Lcz_RecoverAndDelete;
    }
  }
  renderCancelationTitle() {
    if (this.deletionStage === 2) {
      return locales.entries.Lcz_JustDelete;
    }
    return locales.entries.Lcz_Cancel;
  }
  render() {
    if (!this.editBooking) {
      return null;
    }
    return [
      h("div", { class: `backdropModal ${this.isOpen ? 'active' : ''}`, onClick: () => {
          if (this.editBooking.cause === 'delete') {
            return;
          }
          this.closeModal();
        } }),
      h("div", { "data-state": this.isOpen ? 'opened' : 'closed', class: `ir-modal`, tabindex: "-1" }, h("div", { class: `ir-alert-content p-2` }, h("div", { class: `ir-alert-header align-items-center border-0 py-0 m-0 ` }, h("p", { class: "font-weight-bold p-0 my-0 mb-1" }, this.renderTitle()), h("ir-icon", { class: "exit-icon", style: { cursor: 'pointer' }, onClick: () => {
          this.closeModal();
        } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "10.5", viewBox: "0 0 384 512" }, h("path", { fill: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), h("div", { class: "modal-body text-left p-0 mb-2" }, this.editBooking.cause === 'payment' ? (h("ir-select", { selectedValue: this.selectedDesignation, onSelectChange: e => (this.selectedDesignation = e.detail), showFirstOption: false, LabelAvailable: false, data: booking_listing.settlement_methods.map(m => ({
          value: m.name,
          text: m.name,
        })) })) : null), h("div", { class: `ir-alert-footer border-0 d-flex justify-content-end` }, h("ir-button", { icon: '', btn_color: 'secondary', btn_block: true, text: this.renderCancelationTitle(), name: 'cancel' }), h("ir-button", { icon: '', btn_color: 'primary', btn_block: true, text: this.renderConfirmationTitle(), name: 'confirm' })))),
    ];
  }
  static get style() { return irListingModalCss; }
}, [2, "ir-listing-modal", {
    "modalTitle": [1, "modal-title"],
    "editBooking": [16],
    "isOpen": [32],
    "deletionStage": [32],
    "selectedDesignation": [32],
    "closeModal": [64],
    "openModal": [64]
  }, [[0, "clickHanlder", "btnClickHandler"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-listing-modal", "ir-button", "ir-icon", "ir-select"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-listing-modal":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrListingModal);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrListingModal as I, defineCustomElement as d };

//# sourceMappingURL=ir-listing-modal2.js.map