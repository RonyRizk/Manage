import { IModalCause } from './types';
export declare class IrChannel {
  el: HTMLElement;
  ticket: string;
  propertyid: number;
  language: string;
  baseurl: string;
  channel_status: 'create' | 'edit' | null;
  modal_cause: IModalCause | null;
  private roomService;
  private irModalRef;
  componentWillLoad(): void;
  handleConfirmClicked(e: CustomEvent): Promise<void>;
  openModal(): void;
  initializeApp(): Promise<void>;
  ticketChanged(): Promise<void>;
  handleCancelModal(e: CustomEvent): void;
  handleSidebarClose(e: CustomEvent): void;
  resetSideBar(): void;
  handleSaveChange(e: CustomEvent): void;
  render(): any;
}
