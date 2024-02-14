import { EventEmitter } from '../../../stencil-public-runtime';
import { Booking, IDueDate, IPayment } from "../../../models/booking.dto";
import moment from 'moment';
import { ILocale, IToast } from "../../../components";
export declare class IrPaymentDetails {
  bookingDetails: Booking;
  defaultTexts: ILocale;
  newTableRow: boolean;
  collapsedPayment: boolean;
  collapsedGuarantee: boolean;
  flag: boolean;
  confirmModal: boolean;
  toBeDeletedItem: IPayment;
  paymentDetailsUrl: string;
  paymentExceptionMessage: string;
  resetBookingData: EventEmitter<null>;
  toast: EventEmitter<IToast>;
  private itemToBeAdded;
  private paymentService;
  componentWillLoad(): Promise<void>;
  initializeItemToBeAdded(): void;
  _handleSave(): Promise<void>;
  handlePaymentInputChange(key: keyof IPayment, value: any, event?: InputEvent): void;
  handleConfirmModal(e: CustomEvent): Promise<void>;
  handleBookingDetails(): void;
  handleDateChange(e: CustomEvent<{
    start: moment.Moment;
    end: moment.Moment;
  }>): void;
  _renderTableRow(item: IPayment, rowMode?: 'add' | 'normal'): any;
  bookingGuarantee(): any;
  _renderDueDate(item: IDueDate): any;
  render(): any[];
}
