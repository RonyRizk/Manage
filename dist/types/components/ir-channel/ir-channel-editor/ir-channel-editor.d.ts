import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IrChannelEditor {
  channel_status: 'create' | 'edit' | null;
  ticket: string;
  selectedTab: string;
  isLoading: boolean;
  headerTitles: {
    id: string;
    name: string;
    disabled: boolean;
  }[];
  selectedRoomType: any[];
  saveChannelFinished: EventEmitter<null>;
  closeSideBar: EventEmitter<null>;
  private channelService;
  componentWillLoad(): void;
  handleTabChange(e: CustomEvent): void;
  renderTabScreen(): any;
  enableAllHeaders(): void;
  disableNonFirstTabs(): void;
  saveConnectedChannel(): Promise<void>;
  render(): any;
}
