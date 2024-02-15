import { IChannel, IExposedChannel, IMap } from "../models/calendarData";
export interface IChannelStore {
  channels: IExposedChannel[];
  connected_channels: IChannel[];
  selectedChannel: IExposedChannel | null;
  mappedChannel: IMap[];
}
export declare const channels_data: IChannelStore, onChannelChange: import("@stencil/store/dist/types").OnChangeHandler<IChannelStore>;
export declare function selectChannel(channel_id: string): void;
export default channels_data;
