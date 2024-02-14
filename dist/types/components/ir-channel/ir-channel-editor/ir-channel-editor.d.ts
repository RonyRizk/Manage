import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IrChannelEditor {
  selectedTab: string;
  headerTitles: {
    id: string;
    name: string;
    disabled: boolean;
  }[];
  closeSideBar: EventEmitter<null>;
  componentWillLoad(): void;
  handleTabChange(e: CustomEvent): void;
  renderTabScreen(): any;
  enableAllHeaders(): void;
  disableNonFirstTabs(): void;
  render(): any;
}
