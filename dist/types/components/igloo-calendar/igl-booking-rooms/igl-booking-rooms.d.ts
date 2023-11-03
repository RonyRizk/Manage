import { EventEmitter } from "../../../stencil-public-runtime";
export declare class IglBookingRooms {
  roomTypeData: {
    [key: string]: any;
  };
  defaultData: {
    [key: string]: any;
  };
  bookingType: string;
  dateDifference: number;
  ratePricingMode: any[];
  currency: any;
  dataUpdateEvent: EventEmitter<{
    [key: string]: any;
  }>;
  selectedRooms: number[];
  roomsDistributions: number[];
  private validBookingTypes;
  private totalRooms;
  componentWillLoad(): void;
  onRoomDataUpdate(event: CustomEvent<{
    [key: string]: any;
  }>, index: number): void;
  updateRatePlanTotalRooms(ratePlanIndex: number): void;
  render(): any;
}
