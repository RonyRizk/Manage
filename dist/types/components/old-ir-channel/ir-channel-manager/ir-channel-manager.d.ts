import { EventEmitter } from '../../../stencil-public-runtime';
import { ChannelManager, RoomType } from '../../../sample/channel/data';
import { selectOption } from '../../../common/models';
export declare class IrChannelManager {
  hostRoom: RoomType[];
  mapReference: RoomType[];
  allowed_properties: selectOption[];
  allowed_channels: selectOption[];
  allowed_MinStayTypes: selectOption[];
  dropdownData: {
    name: string;
    icon: string;
    children: {
      name: string;
      icon: string;
    }[];
  };
  listData: ChannelManager[];
  loader: boolean;
  mode: string;
  tabs: string[];
  activeTab: string;
  selectedItem: ChannelManager;
  item: ChannelManager;
  anyChanges: boolean;
  fetchApi: EventEmitter<ChannelManager[]>;
  requestApiDelete: EventEmitter;
  requestApiDestinationHierarchy: EventEmitter<string>;
  connectionOffHandler(): void;
  sendToParentHandler(event: CustomEvent): void;
  sendMappingToParentHandler(event: CustomEvent): void;
  _reset(): void;
  openSidebarHandler(): void;
  requestDelete(e: CustomEvent): void;
  changeStatusHandler(event: CustomEvent): void;
  componentDidLoad(): void;
  goNext(): void;
  _onSwitchTab(tab: any): void;
  render(): any[];
}
