'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');
const booking_service = require('./booking.service-97c6d10a2.js');
const room_service = require('./room.service-936658f82.js');
const locales_store = require('./locales.store-e07a3298.js');
const axios = require('./axios-5ba3068e.js');
require('./utils-cfac6d5b.js');
require('./booking-79482cd7.js');
require('./calendar-data-9ed0f0c0.js');
require('./index-d93aa7bb.js');

const iglBookPropertyContainerCss = ".sc-igl-book-property-container-h{display:block;margin:0;padding:0}.book-container.sc-igl-book-property-container{width:min-content;margin:0;padding:0}";

const IglBookPropertyContainer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.bookingService = new booking_service.BookingService();
    this.roomService = new room_service.RoomService();
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
      if (!locales_store.locales.entries) {
        locales_store.locales.entries = languageTexts.entries;
        locales_store.locales.direction = languageTexts.direction;
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
      axios.axios.defaults.baseURL = this.baseurl;
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
      TITLE: locales_store.locales.entries.Lcz_NewBooking,
    };
  }
  render() {
    return (index.h(index.Host, null, index.h("ir-toast", null), index.h("ir-interceptor", null), index.h("div", { class: "book-container", onClick: this.handleTriggerClicked.bind(this) }, index.h("slot", { name: "trigger" })), this.bookingItem && (index.h("igl-book-property", { allowedBookingSources: this.calendarData.allowed_booking_sources, adultChildConstraints: this.calendarData.adult_child_constraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onCloseBookingWindow: () => this.handleCloseBookingWindow() }))));
  }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IglBookPropertyContainer.style = iglBookPropertyContainerCss;

exports.igl_book_property_container = IglBookPropertyContainer;

//# sourceMappingURL=igl-book-property-container.cjs.entry.js.map