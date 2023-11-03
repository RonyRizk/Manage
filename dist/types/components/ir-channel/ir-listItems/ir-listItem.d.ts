import { EventEmitter } from '../../../stencil-public-runtime';
import { ChannelManager } from '../../../sample/channel/data';
export declare class IrListItem {
  type: string;
  dropdownData: {
    name: string;
    icon: string;
    children: {
      name: string;
      icon: string;
    }[];
  };
  dropdownDataDisable: {
    name: string;
    icon: string;
    children: {
      name: string;
      icon: string;
    }[];
  };
  listData: ChannelManager[];
  sendDelete: EventEmitter;
  addEventListenerToDropdown(item: any): void;
  openSidebar: EventEmitter;
  createNew: EventEmitter;
  changeStatus: EventEmitter;
  handleCreate(mode: string, item: any): void;
  onPressDelete(item: any): void;
  doAction(event: CustomEvent): void;
  onPressDisable(item: any): void;
  componentDidLoad(): void;
  componentDidUpdate(): void;
  _renderEmptyState(): any;
  _renderItem(): any;
  _confirmDelete(): any;
  _enable_disable(): any;
  render(): any[];
}
