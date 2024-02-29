import { Token } from "../models/Token";
import { IUserListingSelection } from "../stores/booking_listing.store";
export declare class BookingListingService extends Token {
  getExposedBookingsCriteria(): Promise<void>;
  getExposedBookings(params: IUserListingSelection): Promise<void>;
}
