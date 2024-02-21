import { IChannel, IExposedChannel, IMap } from "../models/calendarData";
export interface IChannelSettings {
  hotel_id: string;
  hotel_title: string;
}
export interface IChannelStore {
  channels: IExposedChannel[];
  connected_channels: IChannel[];
  selectedChannel: IExposedChannel | null;
  mappedChannels: IMap[];
  isConnectedToChannel: boolean;
  channel_settings: IChannelSettings | null;
  property_id: number | null;
  channel_id: number;
  is_active: boolean;
}
export declare const channels_data: IChannelStore, onChannelChange: import("@stencil/store/dist/types").OnChangeHandler<IChannelStore>, dispose: () => void;
export declare function setChannelIdAndActiveState(id: number, is_active: boolean): void;
export declare function selectChannel(channel_id: string): void;
export declare function updateChannelSettings(key: keyof IChannelSettings, value: string): void;
export declare function setMappedChannel(): void;
export declare function resetStore(): void;
export declare function addMapping(ir_id: string, fr_id: string, isRoomType: boolean): void;
export declare function testConnection(): boolean;
export declare function saveChannel(): void;
export default channels_data;
