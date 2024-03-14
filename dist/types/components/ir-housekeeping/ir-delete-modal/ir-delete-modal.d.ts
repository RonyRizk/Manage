import { EventEmitter } from '../../../stencil-public-runtime';
import { IHouseKeepers } from "../../../models/housekeeping";
export declare class IrDeleteModal {
  user: IHouseKeepers;
  isOpen: boolean;
  selectedId: string;
  loadingBtn: 'confirm' | null;
  modalClosed: EventEmitter<null>;
  resetData: EventEmitter<string>;
  private housekeepingService;
  componentWillLoad(): void;
  closeModal(): Promise<void>;
  openModal(): Promise<void>;
  btnClickHandler(event: CustomEvent): Promise<void>;
  render(): any[];
}
