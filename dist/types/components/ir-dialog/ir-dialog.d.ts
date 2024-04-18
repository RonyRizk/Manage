import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrDialog {
  open: boolean;
  el: HTMLElement;
  private firstFocusableElement;
  private lastFocusableElement;
  isOpen: boolean;
  openChange: EventEmitter<boolean>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  openModal(): Promise<void>;
  closeModal(): Promise<void>;
  handleOpenChange(): void;
  prepareFocusTrap(): void;
  handleKeyDown(ev: KeyboardEvent): void;
  disconnectedCallback(): void;
  render(): any;
}
