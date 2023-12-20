import { EventEmitter } from '../../../../stencil-public-runtime';
import { TAdultChildConstraints, TPropertyButtonsTypes, TSourceOptions } from '../../../../models/igl-book-property';
import { IToast } from '../../../ir-toast/toast';
import { Languages } from '../../../../redux/features/languages';
export declare class IglBookPropertyHeader {
  splitBookingId: any;
  bookingData: any;
  minDate: string;
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
  dateRangeData: any;
  bookedByInfoData: any;
  defaultDaterange: {
    from_date: string;
    to_date: string;
  };
  propertyId: number;
  defaultTexts: Languages;
  splitBookingDropDownChange: EventEmitter<any>;
  sourceDropDownChange: EventEmitter<string>;
  adultChild: EventEmitter<any>;
  checkClicked: EventEmitter<any>;
  buttonClicked: EventEmitter<{
    key: TPropertyButtonsTypes;
  }>;
  toast: EventEmitter<IToast>;
  spiltBookingSelected: EventEmitter<{
    key: string;
    data: unknown;
  }>;
  private sourceOption;
  getSplitBookingList(): any;
  getSourceNode(): any;
  handleAdultChildChange(key: string, event: Event): void;
  getAdultChildConstraints(): any;
  renderChildCaption(): string;
  handleButtonClicked(): void;
  isEventType(key: string): boolean;
  render(): any;
}
