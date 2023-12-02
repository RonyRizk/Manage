import { TPositions, IToast } from './toast';
export declare class IrToast {
  position: TPositions;
  isVisible: boolean;
  isFocused: boolean;
  element: HTMLElement;
  private toastRef;
  private duration;
  private showToastTimeOut;
  private toastBody;
  applyStyles(style: Partial<CSSStyleDeclaration>): void;
  onToast(event: CustomEvent<IToast>): void;
  setToastTimeout(): void;
  clearToastTimeout(): void;
  hideToast(): Promise<void>;
  showToast(): Promise<void>;
  disconnectedCallback(): void;
  renderIcon(): any;
  render(): any;
}
