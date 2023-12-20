import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IglBookingRoomRatePlan {
  defaultTexts: any;
  defaultData: {
    [key: string]: any;
  };
  ratePlanData: {
    [key: string]: any;
  };
  totalAvailableRooms: number;
  index: number;
  ratePricingMode: any[];
  currency: any;
  dateDifference: number;
  bookingType: string;
  fullyBlocked: boolean;
  isBookDisabled: boolean;
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
  getAvailableRooms(assignable_units: any[]): any[];
  componentWillLoad(): void;
  disableForm(): any;
  getSelectedOffering(value: any): any;
  updateSelectedRatePlan(data: any): void;
  ratePlanDataChanged(newData: any): Promise<void>;
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
