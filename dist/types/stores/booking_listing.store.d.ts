import { IExposedBookingsCriteria } from "../models/IrBookingListing";
import { Booking } from "../models/booking.dto";
export interface IBookingListingStore extends IExposedBookingsCriteria {
  token: string;
  userSelection: IUserListingSelection;
  bookings: Booking[];
}
export interface IUserListingSelection {
  channel: string;
  property_id: number;
  filter_type: number;
  from: string;
  to: string;
  name: string;
  book_nbr: string;
  booking_status: string;
  affiliate_id: 0;
  is_mpo_managed: false;
  is_mpo_used: false;
  is_for_mobile: false;
  is_combined_view: false;
  start_row: number;
  end_row: number;
  total_count: number;
  is_to_export: boolean;
}
export declare const booking_listing: IBookingListingStore, onBookingListingChange: import("@stencil/store/dist/types").OnChangeHandler<IBookingListingStore>;
export declare function initializeUserSelection(): void;
export declare function updateUserSelection(key: keyof IUserListingSelection, value: any): void;
export default booking_listing;
