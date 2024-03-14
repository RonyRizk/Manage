import booking_listing from "../../../../../src/stores/booking_listing.store";
import { h } from "@stencil/core";
import locales from "../../../../../src/stores/locales.store";
import { BookingListingService } from "../../../../../src/services/booking_listing.service";
import { PaymentService } from "../../../../../src/services/payment.service";
import moment from "moment";
export class IrListingModal {
  constructor() {
    this.bookingListingsService = new BookingListingService();
    this.paymentService = new PaymentService();
    this.modalTitle = 'Modal Title';
    this.editBooking = undefined;
    this.isOpen = false;
    this.deletionStage = 1;
    this.selectedDesignation = undefined;
    this.loadingBtn = null;
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
  filterBookings() {
    booking_listing.bookings = booking_listing.bookings.filter(booking => booking.booking_nbr !== this.editBooking.booking.booking_nbr);
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
            date: moment().format('YYYY-MM-DD'),
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
    if (this.deletionStage === 2) {
      return locales.entries.Lcz_RecoverAndDelete;
    }
    return locales.entries.Lcz_Confirm;
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
      h("div", { "data-state": this.isOpen ? 'opened' : 'closed', class: `ir-modal`, tabindex: "-1" }, this.isOpen && (h("div", { class: `ir-alert-content p-2` }, h("div", { class: `ir-alert-header align-items-center border-0 py-0 m-0 ` }, h("p", { class: "p-0 my-0 mb-1" }, this.renderTitle()), h("ir-icon", { class: "exit-icon", style: { cursor: 'pointer' }, onClick: () => {
          this.closeModal();
        } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "10.5", viewBox: "0 0 384 512" }, h("path", { fill: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), h("div", { class: "modal-body text-left p-0 mb-2" }, this.editBooking.cause === 'payment' ? (h("ir-select", { selectedValue: this.selectedDesignation, onSelectChange: e => (this.selectedDesignation = e.detail), showFirstOption: false, LabelAvailable: false, data: booking_listing.settlement_methods.map(m => ({
          value: m.name,
          text: m.name,
        })) })) : null), h("div", { class: `ir-alert-footer border-0 d-flex justify-content-end` }, h("ir-button", { isLoading: this.loadingBtn === 'just_delete', icon: '', btn_color: 'secondary', btn_block: true, text: this.renderCancelationTitle(), name: 'cancel' }), h("ir-button", { isLoading: this.loadingBtn === 'recover_and_delete', icon: '', btn_color: 'primary', btn_block: true, text: this.renderConfirmationTitle(), name: 'confirm' }))))),
    ];
  }
  static get is() { return "ir-listing-modal"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-listing-modal.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-listing-modal.css"]
    };
  }
  static get properties() {
    return {
      "modalTitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "modal-title",
        "reflect": false,
        "defaultValue": "'Modal Title'"
      },
      "editBooking": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{ booking: Booking; cause: 'edit' | 'payment' | 'delete' }",
          "resolved": "{ booking: Booking; cause: \"delete\" | \"edit\" | \"payment\"; }",
          "references": {
            "Booking": {
              "location": "import",
              "path": "@/models/booking.dto",
              "id": "src/models/booking.dto.ts::Booking"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "isOpen": {},
      "deletionStage": {},
      "selectedDesignation": {},
      "loadingBtn": {}
    };
  }
  static get events() {
    return [{
        "method": "modalClosed",
        "name": "modalClosed",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }, {
        "method": "resetData",
        "name": "resetData",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "closeModal": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "openModal": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get listeners() {
    return [{
        "name": "clickHanlder",
        "method": "btnClickHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-listing-modal.js.map
