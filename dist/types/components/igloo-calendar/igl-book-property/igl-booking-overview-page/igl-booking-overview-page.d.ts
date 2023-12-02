import { EventEmitter } from '../../../../stencil-public-runtime';
import { TAdultChildConstraints, TSourceOptions } from '../../../../models/igl-book-property';
export declare class IglBookingOverviewPage {
  bookingData: any;
  message: string;
  showSplitBookingOption: boolean;
  eventType: string;
  currency: any;
  adultChildConstraints: TAdultChildConstraints;
  ratePricingMode: any;
  dateRangeData: any;
  selectedRooms: Map<string, Map<string, any>>;
  bookingDataDefaultDateRange: any;
  sourceOptions: TSourceOptions[];
  dateRangeSelect: EventEmitter;
  roomsDataUpdate: EventEmitter;
  getSplitBookings(): any;
  isEventType(event: string): boolean;
  render(): any;
}
