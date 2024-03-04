import { createStore } from "@stencil/store";
import moment from "moment";
const initialState = {
  channels: [],
  settlement_methods: [],
  statuses: [],
  types: [],
  token: '',
  rowCount: 10,
  bookings: [],
  userSelection: {
    from: moment().add(-7, 'days').format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD'),
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
export const { state: booking_listing, onChange: onBookingListingChange } = createStore(initialState);
export function initializeUserSelection() {
  //booking_listing.channels[0].name
  booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { channel: '', booking_status: booking_listing.statuses[0].code, filter_type: booking_listing.types[0].id, book_nbr: '', name: '', from: moment().add(-7, 'days').format('YYYY-MM-DD'), to: moment().format('YYYY-MM-DD'), start_row: 0, end_row: booking_listing.rowCount });
}
export function updateUserSelection(key, value) {
  booking_listing.userSelection = Object.assign(Object.assign({}, booking_listing.userSelection), { [key]: value });
}
export default booking_listing;
//# sourceMappingURL=booking_listing.store.js.map
