import { EventEmitter } from '../../../stencil-public-runtime';
import { Booking } from "../../../models/booking.dto";
export declare class IrListingModal {
  modalTitle: string;
  editBooking: {
    booking: Booking;
    cause: 'edit' | 'payment' | 'delete';
  };
  isOpen: boolean;
  deletionStage: number;
  selectedDesignation: string;
  loadingBtn: 'confirm' | 'just_delete' | 'recover_and_delete' | null;
  private bookingListingsService;
  private paymentService;
  componentWillLoad(): void;
  modalClosed: EventEmitter<null>;
  resetData: EventEmitter<string>;
  closeModal(): Promise<void>;
  openModal(): Promise<void>;
  filterBookings(): void;
  btnClickHandler(event: CustomEvent): Promise<void>;
  renderTitle(): string;
  renderConfirmationTitle(): string;
  renderCancelationTitle(): string;
  render(): any[];
}
