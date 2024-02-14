import { EventEmitter } from '../../../stencil-public-runtime';
import { ChannelManager } from '../../../sample/channel/data';
import { selectOption } from '../../../common/models';
export declare class IrGeneralSettings {
  testLoader: boolean;
  mode: string;
  allowed_channels: selectOption[];
  allowed_properties: selectOption[];
  allowed_MinStayTypes: selectOption[];
  connectionStatus: string;
  data: ChannelManager;
  selectedChannel: string;
  connected: boolean;
  sendToParent: EventEmitter;
  connectionOff: EventEmitter;
  watchHandler(newValue: any): void;
  modewatchHandler(newValue: any): void;
  componentDidLoad(): void;
  componentDidUpdate(): void;
  testConnection(): void;
  render(): any[];
}
