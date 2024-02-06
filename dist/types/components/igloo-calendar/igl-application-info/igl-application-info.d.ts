import { EventEmitter } from '../../../stencil-public-runtime';
import { TPropertyButtonsTypes } from "../../../components";
export declare class IglApplicationInfo {
  guestInfo: {
    [key: string]: any;
  };
  currency: any;
  roomsList: {
    [key: string]: any;
  }[];
  guestRefKey: string;
  bedPreferenceType: any[];
  selectedUnits: number[];
  bookingType: string;
  defaultGuestPreference: number | null;
  index: number;
  defaultGuestRoomId: number;
  dateDifference: number;
  dataUpdateEvent: EventEmitter<{
    [key: string]: any;
  }>;
  filterdRoomList: any[];
  isButtonPressed: boolean;
  guestData: {
    [key: string]: any;
  };
  private userRate;
  componentWillLoad(): void;
  handleSelctedUnits(): Promise<void>;
  updateRoomList(): void;
  updateData(): void;
  handleDataChange(key: any, value: any): void;
  handleGuestNameChange(event: any): void;
  handleButtonClicked(event: CustomEvent<{
    key: TPropertyButtonsTypes;
    data?: CustomEvent;
  }>): void;
  render(): any;
}
