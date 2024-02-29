import { Booking } from "../../models/booking.dto";
export declare class IrBookingListing {
  el: HTMLElement;
  language: string;
  ticket: string;
  baseurl: string;
  propertyid: number;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  oldStartValue: number;
  editBookingItem: {
    booking: Booking;
    cause: 'edit' | 'payment' | 'delete';
  } | null;
  private bookingListingService;
  private roomService;
  private listingModal;
  private itemsPerPage;
  componentWillLoad(): void;
  ticketChanged(newValue: string, oldValue: string): Promise<void>;
  initializeApp(): Promise<void>;
  handleSideBarToggle(e: CustomEvent<boolean>): void;
  openModal(): void;
  handleResetData(e: CustomEvent): Promise<void>;
  renderItemRange(): string;
  updateData(): Promise<void>;
  render(): any;
}
