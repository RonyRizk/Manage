import { TDueParams, TPickupData } from './types';
export declare class PickupService {
  token: string | null;
  constructor();
  savePickup(params: TPickupData, booking_nbr: string): Promise<void>;
  validateForm(params: TPickupData): {
    error: boolean;
    cause?: keyof TPickupData;
  };
  updateDue(params: TDueParams): number;
  getNumberOfVehicles(): void;
}
