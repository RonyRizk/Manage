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
  dataUpdateEvent: EventEmitter<{
    [key: string]: any;
  }>;
  gotoSplitPageTwoEvent: EventEmitter<{
    [key: string]: any;
  }>;
  selectedData: {
    [key: string]: any;
  };
  private initialRateValue;
  componentWillLoad(): void;
  getSelectedOffering(value: any): any;
  ratePlanDataChanged(): Promise<void>;
  handleRateDaysUpdate(): any;
  handleInput(event: InputEvent): void;
  handleDataChange(key: any, evt: any): void;
  updateOffering(value: any): void;
  updateRate(value: any): void;
  updateGenericData(key: any, value: any): void;
  bookProperty(): void;
  renderRate(): string | number | string[];
  render(): any;
}
