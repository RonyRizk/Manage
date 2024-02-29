import { BookingListingService } from "../../../../../src/services/booking_listing.service";
import booking_listing, { updateUserSelection } from "../../../../../src/stores/booking_listing.store";
import locales from "../../../../../src/stores/locales.store";
import { Host, h } from "@stencil/core";
export class IrListingHeader {
  constructor() {
    this.bookingListingService = new BookingListingService();
    this.propertyId = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.inputValue = '';
  }
  componentWillLoad() {
    this.bookingListingService.setToken(booking_listing.token);
  }
  handleDateRangeChange(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    const { start, end } = e.detail;
    booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { from: start.format('YYYY-MM-DD'), to: end.format('YYYY-MM-DD') });
  }
  async handleSearchClicked() {
    if (this.inputValue !== '') {
      if (/^-?\d+$/.test(this.inputValue)) {
        updateUserSelection('book_nbr', this.inputValue);
      }
      else if (this.inputValue[3] === '-') {
        updateUserSelection('book_nbr', this.inputValue);
      }
      else {
        updateUserSelection('name', this.inputValue);
      }
    }
    await this.bookingListingService.getExposedBookings(booking_listing.userSelection);
    this.inputValue = '';
  }
  render() {
    return (h(Host, null, h("section", { class: "d-flex align-items-center " }, h("div", { class: "d-flex flex-fill flex-column flex-md-row align-items-md-center booking-container" }, h("div", { class: "d-flex mb-1 d-md-none align-items-center justify-content-bettween width-fill" }, h("h3", { class: "flex-fill" }, locales.entries.Lcz_Bookings), h("div", null, h("igl-book-property-container", { propertyid: this.propertyId, language: this.language, baseurl: this.baseurl, ticket: booking_listing.token }, h("button", { slot: "trigger", class: 'new-booking-btn' }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, h("path", { fill: "currentColor", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" })))))), h("h3", { class: "d-none d-md-block" }, locales.entries.Lcz_Bookings), h("div", { class: "booking-search-field" }, h("ir-input-text", { value: this.inputValue, onTextChange: e => (this.inputValue = e.detail), variant: "icon", placeholder: "Find booking number/name" }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "14", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }))), h("h5", { class: "m-0 font-weight-bold" }, locales.entries.Lcz_Or))), h("div", { class: "d-none d-md-block" }, h("igl-book-property-container", { propertyid: this.propertyId, language: this.language, baseurl: this.baseurl, ticket: booking_listing.token }, h("button", { slot: "trigger", class: 'new-booking-btn' }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, h("path", { fill: "currentColor", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" })))))), h("section", { class: "d-flex align-items-center flex-wrap filters-container justify-content-lg-start mt-1" }, h("fieldset", { class: "flex-fill-sm-none" }, h("label", { htmlFor: "dateTo" }, locales.entries.Lcz_DateOf), h("ir-select", { onSelectChange: e => updateUserSelection('filter_type', e.detail), showFirstOption: false, data: booking_listing === null || booking_listing === void 0 ? void 0 : booking_listing.types.map(t => ({
        value: t.id.toString(),
        text: t.name,
      })), select_id: "dateTo", LabelAvailable: false })), h("fieldset", { class: "flex-fill-sm-none" }, h("label", { htmlFor: "dates" }, locales.entries.Lcz_Dates), h("igl-date-range", { minDate: "2000-01-01", withDateDifference: false, defaultData: {
        fromDate: booking_listing.userSelection.from,
        toDate: booking_listing.userSelection.to,
      } })), h("fieldset", { class: "flex-fill-sm-none" }, h("label", { htmlFor: "booking_status" }, locales.entries.Lcz_BookingStatus), h("ir-select", { onSelectChange: e => updateUserSelection('booking_status', e.detail), showFirstOption: false, data: booking_listing === null || booking_listing === void 0 ? void 0 : booking_listing.statuses.map(status => ({
        value: status.code,
        text: status.name,
      })), select_id: "booking_status", LabelAvailable: false })), h("fieldset", { class: "flex-fill-sm-none" }, h("label", { htmlFor: "channels" }, locales.entries.Lcz_Channels), h("ir-select", { onSelectChange: e => updateUserSelection('channel', e.detail), showFirstOption: false, data: booking_listing === null || booking_listing === void 0 ? void 0 : booking_listing.channels.map(channel => ({
        value: channel.name,
        text: channel.name,
      })), select_id: "channels", LabelAvailable: false })), h("div", { class: "d-flex align-items-end m-0 mt-2 buttons-container" }, h("ir-icon", { title: locales.entries.Lcz_Search, onIconClickHandler: () => this.handleSearchClicked() }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }))), h("ir-icon", { title: locales.entries.Lcz_Erase }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "22.5", viewBox: "0 0 576 512" }, h("path", { fill: "currentColor", d: "M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" }))), h("ir-icon", { title: locales.entries.Lcz_ExportToExcel }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "15", viewBox: "0 0 384 512" }, h("path", { fill: "currentColor", d: "M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z" })))))));
  }
  static get is() { return "ir-listing-header"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-listing-header.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-listing-header.css"]
    };
  }
  static get properties() {
    return {
      "propertyId": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "property-id",
        "reflect": false
      },
      "language": {
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
        "attribute": "language",
        "reflect": false
      },
      "baseurl": {
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
        "attribute": "baseurl",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "inputValue": {}
    };
  }
  static get listeners() {
    return [{
        "name": "dateChanged",
        "method": "handleDateRangeChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-listing-header.js.map
