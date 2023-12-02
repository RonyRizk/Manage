import { EventEmitter } from '../../../../stencil-public-runtime';
import { TAdultChildConstraints, TPropertyButtonsTypes, TSourceOption, TSourceOptions } from '../../../../models/igl-book-property';
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
  splitBookingDropDownChange: EventEmitter<any>;
  sourceDropDownChange: EventEmitter<string>;
  dateRangeSelectChange: EventEmitter<any>;
  adultChild: EventEmitter<any>;
  checkClicked: EventEmitter<any>;
  buttonClicked: EventEmitter<{
    key: TPropertyButtonsTypes;
  }>;
  sourceOption: TSourceOption;
  adultChildCount: {
    adult: number;
    child: number;
  };
  getSplitBookings(): any;
  getSelectedSplitBookingName(bookingId: any): string;
  getSplitBookingList(): any;
  getSourceNode(): any;
  handleAdultChildChange(key: string, event: Event): void;
  getAdultChildConstraints(): any;
  isEventType(key: string): boolean;
  render(): any;
}
