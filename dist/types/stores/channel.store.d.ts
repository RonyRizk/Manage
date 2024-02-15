import { IExposedChannel } from "../models/calendarData";
export interface IChannelStore {
  channels: IExposedChannel[];
  selectedChannel: IExposedChannel | null;
}
export declare const channels_data: IChannelStore, onChannelChange: import("@stencil/store/dist/types").OnChangeHandler<IChannelStore>;
export declare function selectChannel(channel_id: string): void;
export default channels_data;
