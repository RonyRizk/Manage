import { EventEmitter } from "../../../stencil-public-runtime";
import { IPageTwoDataUpdateProps, PageTwoButtonsTypes } from "../../../models/models";
export declare class IglPagetwo {
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
  dataUpdateEvent: EventEmitter<IPageTwoDataUpdateProps>;
  buttonClicked: EventEmitter<{
    key: PageTwoButtonsTypes;
    data?: CustomEvent;
  }>;
  guestData: any;
  selectedUnits: {
    [key: string]: any;
  };
  componentWillLoad(): void;
  initializeGuestData(): void;
  getRoomsListFromCategoryId(categoryId: any): any;
  handleOnApplicationInfoDataUpdateEvent(event: CustomEvent, index: number): void;
  render(): any;
}
