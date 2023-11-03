import { EventEmitter } from "../../../stencil-public-runtime";
import { IPageTwoDataUpdateProps, PageTwoButtonsTypes } from "../../../models/models";
export declare class IglBookProperty {
  propertyid: number;
  language: string;
  countryNodeList: any;
  currency: {
    id: number;
    code: string;
  };
  bookingData: {
    [key: string]: any;
  };
  closeBookingWindow: EventEmitter<{
    [key: string]: any;
  }>;
  sourceOption: {
    code: string;
    description: string;
  };
  splitBookingId: any;
  renderAgain: boolean;
  message: string;
  isLoading: string;
  isConvertedBooking: boolean;
  dateRangeData: {
    [key: string]: any;
  };
  selectedUnits: {
    [key: string]: any;
  };
  private PAGE_ZERO;
  private PAGE_ONE;
  private PAGE_TWO;
  private PAGE_BLOCK_DATES;
  private page;
  private showSplitBookingOption;
  private sourceOptions;
  private selectedRooms;
  private guestData;
  private bookedByInfoData;
  private blockDatesData;
  private ratePricingMode;
  private bedPreferenceType;
  private bookingService;
  private eventsService;
  componentWillLoad(): Promise<void>;
  fetchSetupEntries(): Promise<import("../../../models/IBooking").ISetupEntries>;
  setSourceOptions(bookingSource: any[]): void;
  setOtherProperties(res: any): void;
  setEditingRoomInfo(): void;
  initializeBookingAvailability(from_date: string, to_date: string): Promise<void>;
  getRoomCategoryByRoomId(roomId: any): any;
  getDefaultPage(): string;
  getBookingPreferenceRoomId(): any;
  getSplitBookings(): any;
  isEventType(key: string): boolean;
  closeWindow(): void;
  isEditBooking(): boolean;
  onRoomsDataUpdate(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  getRoomCategoryKey(roomCategoryId: string): string;
  getRatePlanKey(ratePlanId: string): string;
  shouldClearData(key: string | undefined): boolean;
  isEditBookingEvent(key: string | undefined): boolean;
  initializeRoomCategoryIfNeeded(roomCategoryKey: string): void;
  setSelectedRoomData(roomCategoryKey: string, ratePlanKey: string, data: any): void;
  hasSelectedRoomData(roomCategoryKey: string, ratePlanKey: string): boolean;
  cleanupEmptyData(roomCategoryKey: string, ratePlanKey: string): void;
  applyBookingEditToSelectedRoom(roomCategoryKey: string, ratePlanKey: string, data: any): void;
  onDateRangeSelect(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  handleBlockDateUpdate(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  handleSubmit(event: any): void;
  handleGuestInfoUpdate(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  handleBookedByInfoUpdate(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  isActiveSouceOption(srcIndex: any): "" | "active";
  handleSourceDropDown(selectedOption: any): void;
  renderPage(): void;
  gotoSplitPageTwo(): void;
  gotoPage(gotoPage: any): void;
  showSplitBooking(): void;
  getSelectedSplitBookingName(bookingId: any): string;
  isActiveSplitBookingOption(spltIndex: any): "" | "active";
  handleSplitBookingDropDown(evt: any): void;
  isPageZero(): boolean;
  isPageOne(): boolean;
  isPageTwo(): boolean;
  isPageBlockDates(): boolean;
  getSplitBookingList(): any;
  getSourceNode(): any;
  getRoomsListFromCategoryId(categoryId: any): any;
  getPageZeroView(): any;
  getPageOneView(): any;
  getPageBlockDatesView(): any;
  handleButtonClicked(event: CustomEvent<{
    key: PageTwoButtonsTypes;
    data?: CustomEvent;
  }>): void;
  handlePageTwoDataUpdateEvent(event: CustomEvent<IPageTwoDataUpdateProps>): void;
  handleBlockDate(): Promise<void>;
  bookUser(assign_units: boolean): Promise<void>;
  setLoadingState(assign_units: boolean): void;
  getArrivalTimeForBooking(): string;
  resetLoadingState(): void;
  render(): any;
}
