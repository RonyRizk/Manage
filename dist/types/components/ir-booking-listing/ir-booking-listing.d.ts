import { Booking } from "../../models/booking.dto";
export declare class IrBookingListing {
  el: HTMLElement;
  language: string;
  ticket: string;
  baseurl: string;
  propertyid: number;
  rowCount: number;
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
  private listingModalTimeout;
  private statusColors;
  componentWillLoad(): void;
  ticketChanged(newValue: string, oldValue: string): Promise<void>;
  initializeApp(): Promise<void>;
  handleSideBarToggle(e: CustomEvent<boolean>): void;
  getPaginationBounds(): {
    startItem: number;
    endItem: number;
    totalCount: number;
  };
  openModal(): void;
  disconnectedCallback(): void;
  handleResetData(e: CustomEvent): Promise<void>;
  handleResetStoreData(e: CustomEvent): Promise<void>;
  handleBookingChanged(e: CustomEvent<Booking>): void;
  renderItemRange(): string;
  updateData(): Promise<void>;
  render(): any;
}
