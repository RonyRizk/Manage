import { EventEmitter } from '../../../../stencil-public-runtime';
import { TAdultChildConstraints, TSourceOptions } from '../../../../models/igl-book-property';
export declare class IglBookingOverviewPage {
  bookingData: any;
  propertyId: number;
  message: string;
  showSplitBookingOption: boolean;
  eventType: string;
  currency: any;
  adultChildConstraints: TAdultChildConstraints;
  ratePricingMode: any;
  dateRangeData: any;
  defaultDaterange: {
    from_date: string;
    to_date: string;
  };
  selectedRooms: Map<string, Map<string, any>>;
  adultChildCount: {
    adult: number;
    child: number;
  };
  sourceOptions: TSourceOptions[];
  bookedByInfoData: any;
  initialRoomIds: any;
  roomsDataUpdate: EventEmitter;
  getSplitBookings(): any;
  isEventType(event: string): boolean;
  render(): any;
}
