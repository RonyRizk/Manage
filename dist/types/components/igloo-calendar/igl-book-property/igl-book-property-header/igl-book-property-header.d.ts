import { EventEmitter } from '../../../../stencil-public-runtime';
import { TAdultChildConstraints, TPropertyButtonsTypes, TSourceOptions } from '../../../../models/igl-book-property';
export declare class IglBookPropertyHeader {
  splitBookingId: any;
  bookingData: any;
  sourceOptions: TSourceOptions[];
  message: string;
  bookingDataDefaultDateRange: {
    [key: string]: any;
  };
  showSplitBookingOption: boolean;
  adultChildConstraints: TAdultChildConstraints;
  splitBookings: any[];
  adultChildCount: {
    adult: number;
    child: number;
  };
  splitBookingDropDownChange: EventEmitter<any>;
  sourceDropDownChange: EventEmitter<string>;
  adultChild: EventEmitter<any>;
  checkClicked: EventEmitter<any>;
  buttonClicked: EventEmitter<{
    key: TPropertyButtonsTypes;
  }>;
  private sourceOption;
  getSplitBookings(): any;
  getSelectedSplitBookingName(bookingId: any): string;
  getSplitBookingList(): any;
  getSourceNode(): any;
  handleAdultChildChange(key: string, event: Event): void;
  getAdultChildConstraints(): any;
  isEventType(key: string): boolean;
  render(): any;
}
