import { EventEmitter } from '../../../stencil-public-runtime';
import { RoomBlockDetails, RoomBookingDetails } from '../../../models/IBooking';
import { IPageTwoDataUpdateProps } from '../../../models/models';
import { TAdultChildConstraints, TPropertyButtonsTypes } from '../../../models/igl-book-property';
export declare class IglBookProperty {
  propertyid: number;
  allowedBookingSources: any;
  language: string;
  countryNodeList: any;
  showPaymentDetails: boolean;
  currency: {
    id: number;
    code: string;
  };
  bookingData: {
    [key: string]: any;
  };
  adultChildConstraints: TAdultChildConstraints;
  adultChildCount: {
    adult: number;
    child: number;
  };
  renderAgain: boolean;
  defaultData: any;
  isLoading: string;
  private message;
  private sourceOption;
  private dateRangeData;
  private page;
  private showSplitBookingOption;
  private sourceOptions;
  private guestData;
  private bookedByInfoData;
  private blockDatesData;
  private ratePricingMode;
  private selectedUnits;
  private bedPreferenceType;
  private bookingService;
  private bookPropertyService;
  private eventsService;
  closeBookingWindow: EventEmitter<{
    [key: string]: any;
  }>;
  bookingCreated: EventEmitter<{
    pool?: string;
    data: RoomBookingDetails[];
  }>;
  blockedCreated: EventEmitter<RoomBlockDetails>;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  componentWillLoad(): Promise<void>;
  fetchSetupEntries(): Promise<import("../../../models/IBooking").ISetupEntries>;
  setSourceOptions(bookingSource: any[]): void;
  setOtherProperties(res: any): void;
  handleAdultChildChange(event: CustomEvent): void;
  initializeBookingAvailability(from_date: string, to_date: string): Promise<void>;
  getRoomCategoryByRoomId(roomId: any): any;
  getSplitBookings(): any;
  closeWindow(): void;
  isEventType(key: string): boolean;
  onDateRangeSelect(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  handleBlockDateUpdate(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  handleGuestInfoUpdate(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  handleBookedByInfoUpdate(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  handleSourceDropDown(event: CustomEvent): void;
  renderPage(): void;
  gotoSplitPageTwo(): void;
  gotoPage(gotoPage: any): void;
  showSplitBooking(): void;
  getPageBlockDatesView(): any;
  handleButtonClicked(event: CustomEvent<{
    key: TPropertyButtonsTypes;
    data?: CustomEvent;
  }>): void;
  handlePageTwoDataUpdateEvent(event: CustomEvent<IPageTwoDataUpdateProps>): void;
  handleBlockDate(): Promise<void>;
  bookUser(check_in: boolean): Promise<void>;
  setLoadingState(assign_units: boolean): void;
  getArrivalTimeForBooking(): string;
  resetLoadingState(): void;
  onRoomDataUpdate(event: CustomEvent): void;
  getCurrentPage(name: string): boolean;
  render(): any;
}
