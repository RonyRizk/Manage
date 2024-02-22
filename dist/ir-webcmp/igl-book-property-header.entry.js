import { r as registerInstance, a as createEvent, h, e as Host } from './index-b28ea4d3.js';
import { h as hooks } from './moment-7d60e5ef.js';
import { l as locales } from './locales.store-0a8c61f1.js';
import { i as interceptor_requests } from './ir-interceptor.store-c699e607.js';
import './index-e5d38e9f.js';

const iglBookPropertyHeaderCss = ".sc-igl-book-property-header-h{display:block}.row.sc-igl-book-property-header{padding:0 0 0 15px;margin:0}.sourceContainer.sc-igl-book-property-header{max-width:350px}.message-label.sc-igl-book-property-header{font-size:80%}";

const IglBookPropertyHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.splitBookingDropDownChange = createEvent(this, "splitBookingDropDownChange", 7);
    this.sourceDropDownChange = createEvent(this, "sourceDropDownChange", 7);
    this.adultChild = createEvent(this, "adultChild", 7);
    this.checkClicked = createEvent(this, "checkClicked", 7);
    this.buttonClicked = createEvent(this, "buttonClicked", 7);
    this.toast = createEvent(this, "toast", 7);
    this.spiltBookingSelected = createEvent(this, "spiltBookingSelected", 7);
    this.sourceOption = {
      code: '',
      description: '',
      tag: '',
    };
    this.splitBookingId = '';
    this.bookingData = '';
    this.minDate = undefined;
    this.sourceOptions = [];
    this.message = undefined;
    this.bookingDataDefaultDateRange = undefined;
    this.showSplitBookingOption = false;
    this.adultChildConstraints = undefined;
    this.splitBookings = undefined;
    this.adultChildCount = undefined;
    this.dateRangeData = undefined;
    this.bookedByInfoData = undefined;
    this.defaultDaterange = undefined;
    this.propertyId = undefined;
  }
  getSplitBookingList() {
    return (h("fieldset", { class: "form-group  text-left" }, h("label", { class: "h5" }, locales.entries.Lcz_Tobooking, "# "), h("div", { class: "btn-group ml-1" }, h("ir-autocomplete", { value: Object.keys(this.bookedByInfoData).length > 1 ? `${this.bookedByInfoData.bookingNumber} ${this.bookedByInfoData.firstName} ${this.bookedByInfoData.lastName}` : '', from_date: hooks(this.bookingDataDefaultDateRange.fromDate).format('YYYY-MM-DD'), to_date: hooks(this.bookingDataDefaultDateRange.toDate).format('YYYY-MM-DD'), propertyId: this.propertyId, placeholder: locales.entries.Lcz_BookingNumber, onComboboxValue: e => {
        e.stopImmediatePropagation();
        e.stopPropagation;
        this.spiltBookingSelected.emit(e.detail);
      }, isSplitBooking: true }))));
  }
  getSourceNode() {
    return (h("fieldset", { class: "d-flex flex-column text-left flex-lg-row align-items-lg-center" }, h("label", { class: "mr-lg-1" }, locales.entries.Lcz_Source, " "), h("div", { class: "btn-group mt-1 mt-lg-0 sourceContainer" }, h("select", { class: "form-control input-sm", id: "xSmallSelect", onChange: evt => this.sourceDropDownChange.emit(evt.target.value) }, this.sourceOptions.map(option => {
      if (option.type === 'LABEL') {
        return h("optgroup", { label: option.value });
      }
      return (h("option", { value: option.id, selected: this.sourceOption.code === option.id }, option.value));
    })))));
  }
  handleAdultChildChange(key, event) {
    const value = event.target.value;
    let obj = {};
    if (value === '') {
      obj = Object.assign(Object.assign({}, this.adultChildCount), { [key]: 0 });
    }
    else {
      obj = Object.assign(Object.assign({}, this.adultChildCount), { [key]: value });
    }
    this.adultChild.emit(obj);
  }
  getAdultChildConstraints() {
    return (h("div", { class: 'mt-1 mt-lg-0 d-flex flex-column text-left' }, h("label", { class: "mb-1 d-lg-none" }, locales.entries.Lcz_NumberOfGuests, " "), h("div", { class: "form-group my-lg-0 text-left d-flex align-items-center justify-content-between justify-content-sm-start" }, h("fieldset", null, h("div", { class: "btn-group " }, h("select", { class: "form-control input-sm", id: "xAdultSmallSelect", onChange: evt => this.handleAdultChildChange('adult', evt) }, h("option", { value: "" }, locales.entries.Lcz_AdultsCaption), Array.from(Array(this.adultChildConstraints.adult_max_nbr), (_, i) => i + 1).map(option => (h("option", { value: option }, option)))))), this.adultChildConstraints.child_max_nbr > 0 && (h("fieldset", null, h("div", { class: "btn-group ml-1" }, h("select", { class: "form-control input-sm", id: "xChildrenSmallSelect", onChange: evt => this.handleAdultChildChange('child', evt) }, h("option", { value: '' }, this.renderChildCaption()), Array.from(Array(this.adultChildConstraints.child_max_nbr), (_, i) => i + 1).map(option => (h("option", { value: option }, option))))))), h("ir-button", { isLoading: interceptor_requests.status === 'pending', icon: "", size: "sm", class: "ml-2", text: locales.entries.Lcz_Check, onClickHanlder: () => this.handleButtonClicked() }))));
  }
  renderChildCaption() {
    const maxAge = this.adultChildConstraints.child_max_age;
    let years = locales.entries.Lcz_Years;
    if (maxAge === 1) {
      years = locales.entries.Lcz_Year;
    }
    return `${locales.entries.Lcz_ChildCaption} < ${this.adultChildConstraints.child_max_age} ${years}`;
  }
  handleButtonClicked() {
    if (this.isEventType('SPLIT_BOOKING') && Object.keys(this.bookedByInfoData).length <= 1) {
      this.toast.emit({
        type: 'error',
        title: locales.entries.Lcz_ChooseBookingNumber,
        description: '',
        position: 'top-right',
      });
    }
    else if (this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING')) {
      const initialToDate = hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date));
      const initialFromDate = hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date));
      const selectedFromDate = hooks(new Date(this.dateRangeData.fromDate));
      const selectedToDate = hooks(new Date(this.dateRangeData.toDate));
      if (selectedToDate.isBefore(initialFromDate) || selectedFromDate.isAfter(initialToDate)) {
        this.toast.emit({
          type: 'error',
          title: `${locales.entries.Lcz_CheckInDateShouldBeMAx.replace('%1', hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date)).format('ddd, DD MMM YYYY')).replace('%2', hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date)).format('ddd, DD MMM YYYY'))}  `,
          description: '',
          position: 'top-right',
        });
        return;
      }
      else if (this.adultChildCount.adult === 0) {
        this.toast.emit({ type: 'error', title: locales.entries.Lcz_PlzSelectNumberOfGuests, description: '', position: 'top-right' });
      }
      else {
        this.buttonClicked.emit({ key: 'check' });
      }
    }
    else if (this.minDate && new Date(this.dateRangeData.fromDate).getTime() > new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date).getTime()) {
      this.toast.emit({
        type: 'error',
        title: `${locales.entries.Lcz_CheckInDateShouldBeMAx.replace('%1', hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date)).format('ddd, DD MMM YYYY')).replace('%2', hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date)).format('ddd, DD MMM YYYY'))}  `,
        description: '',
        position: 'top-right',
      });
    }
    else if (this.adultChildCount.adult === 0) {
      this.toast.emit({ type: 'error', title: locales.entries.Lcz_PlzSelectNumberOfGuests, description: '', position: 'top-right' });
    }
    else {
      this.buttonClicked.emit({ key: 'check' });
    }
  }
  isEventType(key) {
    return this.bookingData.event_type === key;
  }
  render() {
    const showSourceNode = this.showSplitBookingOption ? this.getSplitBookingList() : this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM') ? false : true;
    return (h(Host, null, showSourceNode && this.getSourceNode(), h("div", { class: `d-flex flex-column flex-lg-row align-items-lg-center ${showSourceNode ? 'mt-1' : ''}` }, h("fieldset", { class: "mt-lg-0  " }, h("igl-date-range", { dateLabel: locales.entries.Lcz_Dates, minDate: this.minDate, disabled: this.isEventType('BAR_BOOKING') || this.isEventType('SPLIT_BOOKING'), defaultData: this.bookingDataDefaultDateRange })), !this.isEventType('EDIT_BOOKING') && this.getAdultChildConstraints()), h("p", { class: "text-right mt-1 message-label" }, this.message)));
  }
};
IglBookPropertyHeader.style = iglBookPropertyHeaderCss;

export { IglBookPropertyHeader as igl_book_property_header };

//# sourceMappingURL=igl-book-property-header.entry.js.map