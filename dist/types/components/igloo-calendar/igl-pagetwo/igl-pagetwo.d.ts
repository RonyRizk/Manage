import { EventEmitter } from '../../../stencil-public-runtime';
import { IPageTwoDataUpdateProps, PageTwoButtonsTypes } from '../../../models/models';
export declare class IglPagetwo {
  showPaymentDetails: boolean;
  isEditOrAddRoomEvent: boolean;
  dateRangeData: {
    [key: string]: any;
  };
  bookingData: {
    [key: string]: any;
  };
  showSplitBookingOption: boolean;
  language: string;
  bookedByInfoData: {
    [key: string]: any;
  };
  bedPreferenceType: any;
  selectedRooms: any;
  isLoading: string;
  countryNodeList: any;
  selectedGuestData: any;
  dataUpdateEvent: EventEmitter<IPageTwoDataUpdateProps>;
  buttonClicked: EventEmitter<{
    key: PageTwoButtonsTypes;
    data?: CustomEvent;
  }>;
  selectedBookedByData: any;
  guestData: any;
  selectedUnits: {
    [key: string]: any;
  };
  componentWillLoad(): void;
  initializeGuestData(): void;
  getRoomsListFromCategoryId(categoryId: any): any;
  handleOnApplicationInfoDataUpdateEvent(event: CustomEvent, index: number): void;
  handleEventData(event: any, key: string, index: number): void;
  isGuestDataIncomplete(): boolean;
  isButtonDisabled(key: string): boolean;
  render(): any;
}
