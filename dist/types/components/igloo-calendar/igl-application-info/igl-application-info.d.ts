import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IglApplicationInfo {
  guestInfo: {
    [key: string]: any;
  };
  currency: any;
  defaultTexts: any;
  roomsList: {
    [key: string]: any;
  }[];
  guestRefKey: string;
  bedPreferenceType: any[];
  selectedUnits: number[];
  bookingType: string;
  index: number;
  dataUpdateEvent: EventEmitter<{
    [key: string]: any;
  }>;
  filterdRoomList: any[];
  private guestData;
  componentWillLoad(): void;
  handleSelctedUnits(): Promise<void>;
  updateRoomList(): void;
  updateData(): void;
  handleDataChange(key: any, value: any): void;
  handleGuestNameChange(event: any): void;
  render(): any;
}
