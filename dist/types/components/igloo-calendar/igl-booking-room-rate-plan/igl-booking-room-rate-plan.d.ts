import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IglBookingRoomRatePlan {
  defaultData: {
    [key: string]: any;
  };
  ratePlanData: {
    [key: string]: any;
  };
  totalAvailableRooms: number;
  ratePricingMode: any[];
  currency: any;
  dateDifference: number;
  bookingType: string;
  sourceOption: number;
  dataUpdateEvent: EventEmitter<{
    [key: string]: any;
  }>;
  gotoSplitPageTwoEvent: EventEmitter<{
    [key: string]: any;
  }>;
  selectedData: {
    [key: string]: any;
  };
  plan: {
    [key: string]: any;
  };
  componentWillLoad(): void;
  getSelectedOffering(value: any): any;
  ratePlanDataChanged(): Promise<void>;
  handleRateDaysUpdate(): any;
  handleInput(event: InputEvent): void;
  handleDataChange(key: any, evt: any): void;
  bookProperty(): void;
  render(): any;
}
