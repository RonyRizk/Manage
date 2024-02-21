export declare class ChannelService {
  getExposedChannels(): Promise<any>;
  getExposedConnectedChannels(property_id: number): Promise<void>;
  saveConnectedChannel(is_remove: boolean): Promise<any>;
}
