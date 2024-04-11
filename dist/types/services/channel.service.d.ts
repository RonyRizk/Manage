import { Token } from "../models/Token";
export declare class ChannelService extends Token {
  getExposedChannels(): Promise<any>;
  getExposedConnectedChannels(property_id: number): Promise<void>;
  saveConnectedChannel(id: number, is_remove: boolean): Promise<any>;
}
