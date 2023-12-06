import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IglBookingRooms {
  roomTypeData: {
    [key: string]: any;
  };
  defaultData: Map<string, any>;
  bookingType: string;
  dateDifference: number;
  ratePricingMode: any[];
  currency: any;
  selectedRooms: number[];
  totalRooms: number;
  roomsDistributions: number[];
  dataUpdateEvent: EventEmitter<{
    [key: string]: any;
  }>;
  private validBookingTypes;
  componentWillLoad(): void;
  private initializeRoomData;
  handleRoomTypeData(): void;
  private calculateInitialDistributions;
  onRoomDataUpdate(event: CustomEvent<{
    [key: string]: any;
  }>, index: number): void;
  private handleTotalRoomsUpdate;
  updateRatePlanTotalRooms(ratePlanIndex: number): void;
  render(): any;
}
