import { IModalCause } from './types';
import { IChannel } from "../../models/calendarData";
export declare class IrChannel {
  el: HTMLElement;
  ticket: string;
  propertyid: number;
  language: string;
  baseurl: string;
  channel_status: 'create' | 'edit' | null;
  modal_cause: IModalCause | null;
  isLoading: boolean;
  private roomService;
  private channelService;
  private irModalRef;
  componentWillLoad(): void;
  handleConfirmClicked(e: CustomEvent): Promise<void>;
  openModal(): void;
  refreshChannels(): Promise<void>;
  initializeApp(): Promise<void>;
  ticketChanged(): Promise<void>;
  handleCancelModal(e: CustomEvent): void;
  handleSidebarClose(e: CustomEvent): void;
  resetSideBar(): void;
  handleSaveChange(e: CustomEvent): Promise<void>;
  handleCheckChange(check: boolean, params: IChannel): Promise<void>;
  render(): any;
}
