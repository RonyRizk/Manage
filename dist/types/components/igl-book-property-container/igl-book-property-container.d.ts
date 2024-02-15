import { IglBookPropertyPayloadPlusBooking } from "../../models/igl-book-property";
import { EventEmitter } from '../../stencil-public-runtime';
export declare class IglBookPropertyContainer {
  language: string;
  ticket: string;
  baseurl: string;
  propertyid: number;
  from_date: string;
  to_date: string;
  bookingItem: IglBookPropertyPayloadPlusBooking | null;
  showPaymentDetails: any;
  countryNodeList: any;
  calendarData: any;
  resetBookingData: EventEmitter<null>;
  private bookingService;
  private roomService;
  setRoomsData(roomServiceResp: any): void;
  initializeApp(): Promise<void>;
  componentDidLoad(): void;
  ticketChanged(): Promise<void>;
  handleCloseBookingWindow(): void;
  handleTriggerClicked(): void;
  render(): any;
}
