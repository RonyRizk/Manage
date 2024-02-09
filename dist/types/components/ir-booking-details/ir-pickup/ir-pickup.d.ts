import { EventEmitter } from '../../../stencil-public-runtime';
import { TPickupData } from './types';
import { IAllowedOptions } from "../../../models/calendarData";
export declare class IrPickup {
  el: HTMLElement;
  defaultPickupData: TPickupData;
  numberOfPersons: number;
  bookingNumber: string;
  isLoading: boolean;
  allowedOptionsByLocation: IAllowedOptions[];
  pickupData: TPickupData;
  vehicleCapacity: number;
  cause: keyof TPickupData | null;
  closeModal: EventEmitter<null>;
  private pickupService;
  handleLocationChange(event: CustomEvent): void;
  initializeInputMask(): void;
  handleVehicleTypeChange(e: CustomEvent): void;
  updatePickupData(key: keyof TPickupData, value: any): void;
  savePickup(): Promise<void>;
  render(): any;
}
