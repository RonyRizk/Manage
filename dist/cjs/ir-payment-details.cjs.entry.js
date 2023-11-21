'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7a63c2a9.js');
const functions = require('./functions-8f682f69.js');
require('./moment-f96595e5.js');

const IrPaymentDetails = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.handlePaymentItemChange = index.createEvent(this, "handlePaymentItemChange", 7);
    this.creditCardPressHandler = index.createEvent(this, "creditCardPressHandler", 7);
    this.itemToBeAdded = {
      PAYMENT_DATE: '',
      PAYMENT_AMOUNT: '',
      DESIGNATION: '',
      REFERENCE: '',
      PAYMENT_ID: '',
    };
    this.item = undefined;
    this.newTableRow = false;
    this.collapsedPayment = false;
    this.collapsedGuarantee = false;
    this.flag = false;
    this.confirmModal = false;
    this.toBeDeletedItem = {};
    this.paymentDetailsUrl = "";
    this.paymentExceptionMessage = "";
  }
  _handleSave() {
    var _a;
    // emit the item to be added
    if (this.item.My_Payment == null) {
      this.item.My_Payment = [];
    }
    this.itemToBeAdded.PAYMENT_ID = ((_a = this.item.My_Payment[this.item.My_Payment.length - 1]) === null || _a === void 0 ? void 0 : _a.PAYMENT_ID) + 1 || 1;
    this.item.My_Payment = [...this.item.My_Payment, this.itemToBeAdded];
    console.log(this.item);
    this.handlePaymentItemChange.emit(this.item.My_Payment);
    this.itemToBeAdded = {
      PAYMENT_DATE: '',
      PAYMENT_AMOUNT: '',
      DESIGNATION: '',
      REFERENCE: '',
    };
  }
  handleConfirmModal(e) {
    // Remove the item from the array
    const newPaymentArray = this.item.My_Payment.filter((item) => item.PAYMENT_ID !== e.detail.PAYMENT_ID);
    this.item.My_Payment = newPaymentArray;
    this.confirmModal = !this.confirmModal;
    this.handlePaymentItemChange.emit(this.item.My_Payment);
    this.toBeDeletedItem = {};
  }
  wandler() {
    console.log("Changed");
    this.flag = !this.flag;
  }
  _renderTableRow(item, rowMode = 'normal') {
    return (index.h("div", { class: "row m-0" }, index.h("div", { class: "col-9 p-0" }, index.h("div", { class: "row m-0" }, index.h("div", { class: "col-4  border-right-light p-0 border-bottom-light border-2" }, rowMode === 'normal' ? (index.h("span", { class: "sm-padding-left" }, functions._formatDate(item.PAYMENT_DATE))) : (index.h("input", { class: "border-0 w-100", onChange: event => {
        this.itemToBeAdded.PAYMENT_DATE = event.target.value;
      }, type: "date" }))), index.h("div", { class: "col-4 border-right-light d-flex p-0 justify-content-end border-bottom-light border-2 sm-padding-right" }, rowMode === 'normal' ? (index.h("span", { class: "sm-padding-right" }, "$", item.PAYMENT_AMOUNT)) : (index.h("input", { class: "border-0 w-100", onChange: event => {
        this.itemToBeAdded.PAYMENT_AMOUNT = event.target.value;
      }, type: "number" }))), index.h("div", { class: "col-4 border-right-light p-0 border-bottom-light border-2 sm-padding-left" }, rowMode === 'normal' ? (index.h("span", { class: "sm-padding-left" }, item.DESIGNATION)) : (index.h("input", { class: "border-0 w-100", onChange: event => {
        this.itemToBeAdded.DESIGNATION = event.target.value;
      }, type: "text" }))), index.h("div", { class: "col-12 border-right-light p-0 border-bottom-light border-2 sm-padding-left" }, rowMode === 'normal' ? (index.h("span", { class: "sm-padding-left" }, item.REFERENCE)) : (index.h("input", { class: "border-0 w-100", onKeyPress: event => {
        if (event.key === 'Enter') {
          this.newTableRow = false;
          this._handleSave();
        }
      }, onChange: event => {
        this.itemToBeAdded.REFERENCE = event.target.value;
      }, type: "text" }))))), index.h("div", { class: "col-3 d-flex align-items-center justify-content-between border-right-light border-bottom-light border-2" }, index.h("ir-icon", { icon: "ft-save color-ir-light-blue-hover h5 pointer", onClick: rowMode === 'add'
        ? () => {
          this.newTableRow = false;
          this._handleSave();
        }
        : () => { } }), index.h("ir-icon", { icon: "ft-trash-2 danger h5 pointer", onClick: rowMode === 'add'
        ? () => {
          this.newTableRow = false;
          this.itemToBeAdded = {
            PAYMENT_DATE: '',
            PAYMENT_AMOUNT: '',
            DESIGNATION: '',
            REFERENCE: '',
          };
        }
        : () => {
          this.toBeDeletedItem = item;
          const modal = document.querySelector('.delete-record-modal');
          modal.openModal();
        } }))));
  }
  bookingGuarantee() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    return (index.h("div", null, index.h("div", { class: "d-flex align-items-center" }, index.h("strong", { class: "mr-1" }, "Booking Guarantee"), index.h("ir-icon", { id: "drawer-icon", icon: `${this.collapsedGuarantee ? 'ft-credit-card' : 'ft-credit-card'} h2 color-ir-light-blue-hover`, "data-toggle": "collapse", "data-target": `.guarrantee`, "aria-expanded": "false", "aria-controls": "myCollapse", class: "sm-padding-right pointer", onClick: () => {
        if (!this.item.IS_DIRECT) {
          this.creditCardPressHandler.emit(this.item.BOOK_NBR);
        }
        this.collapsedGuarantee = !this.collapsedGuarantee;
      } })), index.h("div", { class: "collapse guarrantee" }, this.item.IS_DIRECT ? ([
      index.h("div", null, ((_b = (_a = this.item) === null || _a === void 0 ? void 0 : _a.My_Guest) === null || _b === void 0 ? void 0 : _b.CCN) && 'Card:', " ", index.h("span", null, ((_d = (_c = this.item) === null || _c === void 0 ? void 0 : _c.My_Guest) === null || _d === void 0 ? void 0 : _d.CCN) || ''), " ", ((_f = (_e = this.item) === null || _e === void 0 ? void 0 : _e.My_Guest) === null || _f === void 0 ? void 0 : _f.CC_EXP_MONTH) && 'Expiry: ', index.h("span", null, ' ', ((_h = (_g = this.item) === null || _g === void 0 ? void 0 : _g.My_Guest) === null || _h === void 0 ? void 0 : _h.CC_EXP_MONTH) || '', " ", ((_k = (_j = this.item) === null || _j === void 0 ? void 0 : _j.My_Guest) === null || _k === void 0 ? void 0 : _k.CC_EXP_YEAR) && '/' + ((_m = (_l = this.item) === null || _l === void 0 ? void 0 : _l.My_Guest) === null || _m === void 0 ? void 0 : _m.CC_EXP_YEAR))),
      index.h("div", null, ((_p = (_o = this.item) === null || _o === void 0 ? void 0 : _o.My_Guest) === null || _p === void 0 ? void 0 : _p.CHN) && 'Name:', " ", index.h("span", null, ((_r = (_q = this.item) === null || _q === void 0 ? void 0 : _q.My_Guest) === null || _r === void 0 ? void 0 : _r.CHN) || ''), " ", ((_t = (_s = this.item) === null || _s === void 0 ? void 0 : _s.My_Guest) === null || _t === void 0 ? void 0 : _t.CVC) && '- CVC:', ' ', index.h("span", null, " ", ((_u = this.item.My_Guest) === null || _u === void 0 ? void 0 : _u.CVC) || '')),
    ]) : this.paymentDetailsUrl ? (index.h("iframe", { src: this.paymentDetailsUrl, width: "100%", class: 'iframeHeight', frameborder: "0" })) : (index.h("div", { class: "text-center" }, this.paymentExceptionMessage)))));
  }
  _renderDueDate(item) {
    return (index.h("div", { class: "fluid-container" }, index.h("div", { class: "row mb-1" }, index.h("div", { class: "col-xl-3 col-lg-4 col-md-2 col-sm-3 col-4 pr-0" }, functions._formatDate(item.Date)), index.h("div", { class: "col-1 d-flex px-0 justify-content-end" }, functions._formatAmount(item.Amount, this.item.My_Currency.REF)), index.h("div", { class: "col-xl-3 col-lg-4 col-md-3 col-sm-3 col-4" }, item.Description), index.h("span", { class: "ml-1 col-12 font-size-small collapse roomName" }, item.Room))));
  }
  render() {
    var _a, _b;
    if (!this.item) {
      return index.h("div", null);
    }
    return [
      index.h("div", { class: "card" }, index.h("div", { class: "p-1" }, index.h("div", { class: "mb-2 h4" }, "Due Balance: ", index.h("span", { class: "danger font-weight-bold" }, functions._formatAmount(this.item.DUE_AMOUNT, this.item.My_Currency.REF))), (this.item.My_Ac.AC_PAYMENT_OPTION_CODE == '001' || this.item.My_Ac.AC_PAYMENT_OPTION_CODE == '004' || this.item.IS_CHM_SOURCE || this.item.IS_DIRECT) &&
        this.bookingGuarantee(), index.h("div", { class: "mt-2" }, index.h("div", null, index.h("div", { class: "d-flex align-items-center" }, index.h("strong", { class: "mr-1" }, "Payment due dates"), this.item.My_Bsa && this.item.My_Bsa.length > 1 && (index.h("ir-icon", { id: "drawer-icon", icon: `${this.collapsedPayment ? 'ft-eye-off' : 'ft-eye'} h2 color-ir-light-blue-hover`, "data-toggle": "collapse", "data-target": `.roomName`, "aria-expanded": "false", "aria-controls": "myCollapse", class: "sm-padding-right pointer", onClick: () => {
          this.collapsedPayment = !this.collapsedPayment;
        } }))), ((_a = this.item) === null || _a === void 0 ? void 0 : _a.My_DueDates) && ((_b = this.item) === null || _b === void 0 ? void 0 : _b.My_DueDates.map(item => this._renderDueDate(item))))), index.h("div", { class: "mt-2" }, index.h("strong", null, "Payments"), index.h("div", { class: "fluid-container border-top-light border-2 border-left-light font-size-small" }, index.h("div", { class: "row m-0" }, index.h("div", { class: "col-3 font-weight-bold border-right-light border-bottom-light border-2 p-0" }, index.h("span", { class: "sm-padding-left" }, "Date")), index.h("div", { class: "col-3 font-weight-bold border-right-light border-bottom-light border-2 p-0" }, index.h("span", { class: "sm-padding-left" }, "Amount")), index.h("div", { class: "col-3 font-weight-bold border-right-light border-bottom-light border-2 p-0 sm-padding-left" }, index.h("span", { class: "sm-padding-left" }, "Designation")), index.h("div", { class: "col-3 text-center border-right-light p-0 border-bottom-light border-2" }, index.h("ir-icon", { id: "add-payment", icon: "ft-plus font-weight-bold color-ir-light-blue-hover pointer p-0", onClick: () => {
          this.newTableRow = true;
        } }))), this.item.My_Payment && this.item.My_Payment.map((item) => this._renderTableRow(item)), this.newTableRow ? this._renderTableRow(null, 'add') : null)))),
      index.h("ir-modal", { item: this.toBeDeletedItem, class: 'delete-record-modal', modalTitle: "Are you sure you want to delete this payment record?", modalBody: "If deleted it will be permnantly lost!", iconAvailable: true, icon: "ft-alert-triangle danger h1", leftBtnText: "Delete", rightBtnText: "Cancel", leftBtnColor: "danger", rightBtnColor: "primary" }),
    ];
  }
  static get watchers() { return {
    "paymentDetailsUrl": ["wandler"]
  }; }
};

exports.ir_payment_details = IrPaymentDetails;

//# sourceMappingURL=ir-payment-details.cjs.entry.js.map