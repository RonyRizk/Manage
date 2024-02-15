import { r as registerInstance, c as createEvent, h, H as Host } from './index-795d2df3.js';
import { B as BookingService } from './booking.service-f6c798c3.js';
import { R as RoomService } from './room.service-a551df5a.js';
import { l as locales, a as axios } from './axios-248c334f.js';
import './utils-fd7da1ce.js';
import './moment-7d60e5ef.js';
import './booking-9aaf08ea.js';
import './calendar-data-32548888.js';
import './channel.store-8bfcea95.js';

const iglBookPropertyContainerCss = ".sc-igl-book-property-container-h{display:block;margin:0;padding:0}.book-container.sc-igl-book-property-container{width:min-content;margin:0;padding:0}";

const IglBookPropertyContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.resetBookingData = createEvent(this, "resetBookingData", 7);
    this.bookingService = new BookingService();
    this.roomService = new RoomService();
    this.language = '';
    this.ticket = '';
    this.baseurl = '';
    this.propertyid = undefined;
    this.from_date = undefined;
    this.to_date = undefined;
    this.bookingItem = undefined;
    this.showPaymentDetails = undefined;
    this.countryNodeList = undefined;
    this.calendarData = {};
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
      const [roomResponse, languageTexts, countriesList] = await Promise.all([
        this.roomService.fetchData(this.propertyid, this.language),
        this.roomService.fetchLanguage(this.language),
        this.bookingService.getCountries(this.language),
      ]);
      console.log(languageTexts);
      if (!locales.entries) {
        locales.entries = languageTexts.entries;
        locales.direction = languageTexts.direction;
      }
      this.countryNodeList = countriesList;
      const { allowed_payment_methods: paymentMethods, currency, allowed_booking_sources, adult_child_constraints, calendar_legends } = roomResponse['My_Result'];
      this.calendarData = { currency, allowed_booking_sources, adult_child_constraints, legendData: calendar_legends };
      this.setRoomsData(roomResponse);
      const paymentCodesToShow = ['001', '004'];
      this.showPaymentDetails = paymentMethods.some(method => paymentCodesToShow.includes(method.code));
    }
    catch (error) {
      console.error('Error initializing app:', error);
    }
  }
  componentDidLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  async ticketChanged() {
    sessionStorage.setItem('token', JSON.stringify(this.ticket));
    this.initializeApp();
  }
  handleCloseBookingWindow() {
    this.bookingItem = null;
  }
  handleTriggerClicked() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.bookingItem = {
      FROM_DATE: this.from_date,
      defaultDateRange: {
        fromDate: new Date(),
        fromDateStr: '',
        toDate: tomorrow,
        toDateStr: '',
        dateDifference: 0,
        message: '',
      },
      TO_DATE: this.to_date,
      EMAIL: '',
      event_type: 'PLUS_BOOKING',
      ID: '',
      NAME: '',
      PHONE: '',
      REFERENCE_TYPE: '',
      TITLE: locales.entries.Lcz_NewBooking,
    };
  }
  render() {
    return (h(Host, null, h("ir-toast", null), h("ir-interceptor", null), h("div", { class: "book-container", onClick: this.handleTriggerClicked.bind(this) }, h("slot", { name: "trigger" })), this.bookingItem && (h("igl-book-property", { allowedBookingSources: this.calendarData.allowed_booking_sources, adultChildConstraints: this.calendarData.adult_child_constraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onResetBookingData: (e) => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.resetBookingData.emit(null);
      }, onCloseBookingWindow: () => this.handleCloseBookingWindow() }))));
  }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IglBookPropertyContainer.style = iglBookPropertyContainerCss;

export { IglBookPropertyContainer as igl_book_property_container };

//# sourceMappingURL=igl-book-property-container.entry.js.map