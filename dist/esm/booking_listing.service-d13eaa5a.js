import { T as Token, a as axios } from './Token-2955ce2c.js';
import { c as createStore } from './locales.store-15011fa2.js';
import { h as hooks } from './moment-7d60e5ef.js';

const initialState = {
  channels: [],
  settlement_methods: [],
  statuses: [],
  types: [],
  token: '',
  rowCount: 10,
  bookings: [],
  userSelection: {
    from: hooks().add(-7, 'days').format('YYYY-MM-DD'),
    to: hooks().format('YYYY-MM-DD'),
    channel: '',
    property_id: null,
    start_row: 0,
    end_row: 20,
    total_count: 0,
    filter_type: null,
    name: '',
    book_nbr: '',
    booking_status: '',
    affiliate_id: 0,
    is_mpo_managed: false,
    is_mpo_used: false,
    is_for_mobile: false,
    is_combined_view: false,
    is_to_export: false,
  },
  download_url: null,
};
const { state: booking_listing, onChange: onBookingListingChange } = createStore(initialState);
function initializeUserSelection() {
  //booking_listing.channels[0].name
  booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { channel: '', booking_status: booking_listing.statuses[0].code, filter_type: booking_listing.types[0].id, book_nbr: '', name: '', from: hooks().add(-7, 'days').format('YYYY-MM-DD'), to: hooks().format('YYYY-MM-DD'), start_row: 0, end_row: booking_listing.rowCount });
}
function updateUserSelection(key, value) {
  booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { [key]: value });
}

class BookingListingService extends Token {
  async getExposedBookingsCriteria(property_id) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Invalid token');
    }
    const { data } = await axios.post(`/Get_Exposed_Bookings_Criteria?Ticket=${token}`, {
      property_id,
    });
    const result = data.My_Result;
    booking_listing.channels = result.channels;
    booking_listing.settlement_methods = result.settlement_methods;
    booking_listing.statuses = result.statuses;
    booking_listing.types = result.types;
    initializeUserSelection();
  }
  async getExposedBookings(params) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Invalid token');
    }
    const { data } = await axios.post(`/Get_Exposed_Bookings?Ticket=${token}`, params);
    const result = data.My_Result;
    const header = data.My_Params_Get_Exposed_Bookings;
    booking_listing.bookings = [...result];
    booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { total_count: header.total_count });
    booking_listing.download_url = header.exported_data_url;
  }
  async removeExposedBooking(booking_nbr, is_to_revover) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Invalid token');
    }
    await axios.post(`/Remove_Exposed_Booking?Ticket=${token}`, {
      booking_nbr,
      is_to_revover,
    });
  }
}

export { BookingListingService as B, booking_listing as b, initializeUserSelection as i, onBookingListingChange as o, updateUserSelection as u };

//# sourceMappingURL=booking_listing.service-d13eaa5a.js.map