import { TPositions, IToast } from './toast';
export declare class IrToast {
  position: TPositions;
  element: HTMLElement;
  toasts: IToast[];
  onToast(event: CustomEvent<IToast>): void;
  showToast(toast: IToast): void;
  render(): any;
}
