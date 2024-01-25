import { EventEmitter } from '../../../stencil-public-runtime';
import { IPageTwoDataUpdateProps } from '../../../models/models';
import { TPropertyButtonsTypes } from '../../../models/igl-book-property';
export declare class IglPagetwo {
  showPaymentDetails: boolean;
  currency: any;
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
  propertyId: number;
  bedPreferenceType: any;
  selectedRooms: Map<string, Map<string, any>>;
  isLoading: string;
  countryNodeList: any;
  selectedGuestData: any;
  dataUpdateEvent: EventEmitter<IPageTwoDataUpdateProps>;
  buttonClicked: EventEmitter<{
    key: TPropertyButtonsTypes;
    data?: CustomEvent;
  }>;
  selectedBookedByData: any;
  guestData: any;
  selectedUnits: {
    [key: string]: any;
  };
  componentWillLoad(): void;
  initializeGuestData(): void;
  handleOnApplicationInfoDataUpdateEvent(event: CustomEvent, index: number): void;
  handleEventData(event: any, key: string, index: number): void;
  isGuestDataIncomplete(): boolean;
  isButtonDisabled(key: string): boolean;
  render(): any;
}
