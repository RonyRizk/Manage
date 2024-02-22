import { TDueParams, TPickupData } from './types';
import { IBookingPickupInfo } from "../../../components";
export declare class PickupService {
  savePickup(params: TPickupData, booking_nbr: string, is_remove: boolean): Promise<void>;
  transformDefaultPickupData(data: IBookingPickupInfo): TPickupData;
  getAvailableLocations(message: string): {
    value: number;
    text: string;
  }[];
  validateForm(params: TPickupData): {
    error: boolean;
    cause?: keyof TPickupData;
  };
  getNumberOfVehicles(capacity: number, numberOfPersons: number): number[];
  private getPickUpPersonStatus;
  updateDue(params: TDueParams): number;
}
